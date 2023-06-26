/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.features.company.domain.entity.CompanySupplier;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanySupplierUsecase;
import com.jamesaworo.stocky.features.product.domain.entity.Product;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductUsecase;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockExpensesInteractor;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockItemInteractor;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockPriceInteractor;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockSettlementInteractor;
import com.jamesaworo.stocky.features.stock.data.request.StockItemRequest;
import com.jamesaworo.stocky.features.stock.domain.entity.StockItem;
import com.jamesaworo.stocky.features.stock.domain.entity.StockPrice;
import com.jamesaworo.stocky.features.stock.domain.entity.StockSettlement;
import com.jamesaworo.stocky.features.stock.domain.usecase.IStockItemUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.util.ObjectUtils;

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
	public List<StockItem> saveMany(List<StockItemRequest> requests) {
		List<StockItem> itemsList = new ArrayList<>();
		requests.forEach(stockItemRequest -> itemsList.add(getStockItem(stockItemRequest)));
		return this.usecase.saveMany(itemsList);
	}

	@Override
	public StockItem save(StockItem item) {
		return this.usecase.save(item);
	}

	@Override
	public StockItemRequest toRequest(StockItem model) {
		return this.mapper.map(model, StockItemRequest.class);
	}

	@Override
	public StockItem toModel(StockItemRequest request) {
		return this.mapper.map(request, StockItem.class);
	}

	private StockItem getStockItem(StockItemRequest request) {
		StockItem model = this.toModel(request);
		this.setItemSettlement(model, request);
		this.setItemProduct(model, request);
		this.setItemSupplier(model, request);
		this.setItemPrice(model, request);
		this.setItemExpenses(model, request);
		return this.usecase.save(model);
	}

	private void setItemExpenses(StockItem model, StockItemRequest request) {
		if (!request.getExpenses().isEmpty()) {
			model.setExpenses(this.expensesInteractor.save(request.getExpenses()));
		}
	}

	private void setItemSettlement(StockItem model, StockItemRequest request) {
		if (!ObjectUtils.isEmpty(request.getSettlement())) {
			StockSettlement settlement = this.settlementInteractor.save(request.getSettlement());
			model.setSettlement(settlement);
		}
	}

	private void setItemProduct(StockItem model, StockItemRequest request) {
		Optional<Product> optionalProduct = this.productUsecase.findById(request.getProduct().getId());
		model.setProduct(optionalProduct.get());
	}

	private void setItemSupplier(StockItem model, StockItemRequest request) {
		Optional<CompanySupplier> optionalCompanySupplier = this.supplierUsecase.findOne(request.getSupplier().getId());
		model.setSupplier(optionalCompanySupplier.get());
	}

	private void setItemPrice(StockItem model, StockItemRequest request) {
		if (!ObjectUtils.isEmpty(request.getStockPrice())) {
			StockPrice price = this.stockPriceInteractor.save(request.getStockPrice());
			model.setStockPrice(price);
		}
	}

}
