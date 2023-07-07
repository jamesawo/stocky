/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.interactor.implementation;

import com.jamesaworo.stocky.configuration.converter.LocalDateStringConverter;
import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.features.company.domain.entity.CompanySupplier;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanySupplierUsecase;
import com.jamesaworo.stocky.features.product.domain.entity.Product;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductUsecase;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockExpensesInteractor;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockItemInteractor;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockPriceInteractor;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockSettlementInteractor;
import com.jamesaworo.stocky.features.stock.data.request.StockExpensesRequest;
import com.jamesaworo.stocky.features.stock.data.request.StockItemRequest;
import com.jamesaworo.stocky.features.stock.data.request.StockPriceRequest;
import com.jamesaworo.stocky.features.stock.data.request.StockSettlementRequest;
import com.jamesaworo.stocky.features.stock.domain.entity.*;
import com.jamesaworo.stocky.features.stock.domain.usecase.IStockItemUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.util.ObjectUtils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Interactor
@RequiredArgsConstructor
public class StockItemInteractor implements IStockItemInteractor {
	private final IStockItemUsecase usecase;
	private final ModelMapper mapper;
	private final IProductUsecase productUsecase;
	private final ICompanySupplierUsecase supplierUsecase;
	private final IStockPriceInteractor stockPriceInteractor;
	private final IStockSettlementInteractor settlementInteractor;
	private final IStockExpensesInteractor expensesInteractor;


	@Override
	public List<StockItem> saveMany(List<StockItemRequest> requests, Stock stock) {
		List<StockItem> itemsList = new ArrayList<>();
		if (requests != null && !requests.isEmpty()) {
			for (StockItemRequest stockItemRequest : requests) {
				StockItem stockItem = this.mapStockItemRequestToModelAndSave(stockItemRequest, stock);
				itemsList.add(this.usecase.save(stockItem));
			}
		}
		return itemsList;
	}

	private StockItem mapStockItemRequestToModelAndSave(StockItemRequest request, Stock stock) {
		StockItem model = new StockItem();
		model.setStock(stock);
		this.setStockItemBasicDetails(model, request);
		this.setItemSupplier(model, request);
		this.setItemProduct(model, request);
		this.setItemSettlement(model, request);
		this.setItemPrice(model, request);

		StockItem item = this.usecase.save(model);
		this.setItemExpenses(item, request);

		return item;
	}

	@Override
	public StockItem save(StockItem item) {
		return this.usecase.save(item);
	}

	private void setStockItemBasicDetails(StockItem model, StockItemRequest request) {
		model.setRecordedDate(LocalDate.now());
		model.setProductQuantity(request.getProductQuantity());
		model.setProductQuantitySold(0);
	}

	private void setItemSupplier(StockItem model, StockItemRequest request) {
		Optional<CompanySupplier> optionalSupplier = this.supplierUsecase.findOne(request.getSupplier().getId());
		optionalSupplier.ifPresent(model::setSupplier);
	}

	private void setItemProduct(StockItem model, StockItemRequest request) {
		Optional<Product> optionalProduct = this.productUsecase.findById(request.getProduct().getId());
		optionalProduct.ifPresent(model::setProduct);
	}

	private void setItemExpenses(StockItem model, StockItemRequest request) {
		if (!request.getExpenses().isEmpty()) {
			List<StockExpenses> expenses = this.expensesInteractor.saveMany(request.getExpenses());
			model.setExpenses(expenses);
			this.save(model);
		}
	}

	private void setItemSettlement(StockItem model, StockItemRequest request) {
		if (!ObjectUtils.isEmpty(request.getSettlement())) {
			StockSettlement settlement = this.settlementInteractor.save(request.getSettlement());
			model.setSettlement(settlement);
		}
	}

	private void setItemPrice(StockItem model, StockItemRequest request) {
		if (request != null && request.getPrice() != null) {
			StockPrice price = this.stockPriceInteractor.save(request.getPrice());
			model.setStockPrice(price);
		}
	}

	@Override
	public StockItemRequest toRequest(StockItem model) {
		return this.mapper.map(model, StockItemRequest.class);
	}

	@Override
	public StockItem toModel(StockItemRequest request) {
		return this.mapper.map(request, StockItem.class);
	}

	@Override
	public StockItem mapToSavedModel(StockItemRequest request, Stock stock) {
		StockItem stockItem = new StockItem();

		stockItem.setRecordedDate(this.convertStringToLocalDate(request.getRecordedDate()));
		stockItem.setProductQuantity(request.getProductQuantity());
		stockItem.setProductQuantitySold(request.getProductQuantitySold());

		//  new CompanySupplier(request.getSupplier().getId())
		//  new Product()
		//  this.setItemSupplier(stockItem, request);
		//	this.setItemProduct(stockItem, request);

		stockItem.setSupplier(this.supplierUsecase.findOne(request.getSupplier().getId()).get());
		stockItem.setProduct(this.productUsecase.findById(request.getProduct().getId()).get());

		var savedExpenses = this.createExpenses(request.getExpenses());
		stockItem.setExpenses(savedExpenses);

		var settlement = this.createSettlement(request.getSettlement());
		stockItem.setSettlement(settlement);

		var stockPrice = this.createStockPrice(request.getPrice());
		stockItem.setStockPrice(stockPrice);

		stockItem.setStock(stock);
		return this.save(stockItem);
	}

	private LocalDate convertStringToLocalDate(String stringDate) {
		LocalDateStringConverter localDateStringConverter = new LocalDateStringConverter();
		return localDateStringConverter.convert(stringDate);
	}

	private List<StockExpenses> createExpenses(List<StockExpensesRequest> expenses) {
		return this.expensesInteractor.saveMany(expenses);
	}

	private StockSettlement createSettlement(StockSettlementRequest settlement) {
		return this.settlementInteractor.save(settlement);
	}

	private StockPrice createStockPrice(StockPriceRequest price) {
		return this.stockPriceInteractor.save(price);
	}


}
