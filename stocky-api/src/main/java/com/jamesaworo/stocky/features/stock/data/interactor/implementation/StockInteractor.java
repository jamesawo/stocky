/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.core.utils.Util;
import com.jamesaworo.stocky.features.product.domain.entity.Product;
import com.jamesaworo.stocky.features.product.domain.entity.ProductBasic;
import com.jamesaworo.stocky.features.product.domain.entity.ProductPrice;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductBasicUsecase;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductPriceUsecase;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockExpensesInteractor;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockInteractor;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockItemInteractor;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockSettlementInteractor;
import com.jamesaworo.stocky.features.stock.data.request.StockItemRequest;
import com.jamesaworo.stocky.features.stock.data.request.StockRequest;
import com.jamesaworo.stocky.features.stock.data.request.StockSearchRequest;
import com.jamesaworo.stocky.features.stock.domain.entity.Stock;
import com.jamesaworo.stocky.features.stock.domain.entity.StockItem;
import com.jamesaworo.stocky.features.stock.domain.entity.StockPrice;
import com.jamesaworo.stocky.features.stock.domain.usecase.IStockUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static com.jamesaworo.stocky.features.stock.domain.enums.StockStatus.REGISTERED;
import static org.springframework.http.ResponseEntity.ok;

@Interactor
@RequiredArgsConstructor
public class StockInteractor implements IStockInteractor {

	private final ModelMapper mapper;
	private final IStockUsecase usecase;
	private final IStockSettlementInteractor settlementInteractor;
	private final IStockExpensesInteractor expensesInteractor;
	private final IStockItemInteractor itemInteractor;
	private final IProductPriceUsecase productPriceUsecase;
	private final IProductBasicUsecase productBasicUsecase;

	private List<StockItem> updateNewStockItems(Stock newStock, List<StockItemRequest> items) {
		List<StockItem> stockItems = new ArrayList<>();
		if (items != null && !items.isEmpty()) {
			for (StockItemRequest request : items) {
				StockItem stockItem = itemInteractor.mapToSavedModel(request, newStock);
				stockItems.add(stockItem);
			}
		}
		newStock.setStockItems(stockItems);
		this.usecase.save(newStock);
		return stockItems;
	}

	private Stock createNewStock(StockRequest request) {
		Stock stock = new Stock();
		stock.setIsGroupedExpenses(request.getIsGroupedExpenses());
		stock.setIsGroupedSettlement(request.getIsGroupedSettlement());
		stock.setRecordDate(Util.convertStringToLocalDate(request.getRecordDate()));
		stock.setStatus(REGISTERED);
		stock.setSettlement(this.settlementInteractor.save(request.getSettlement()));
		stock.setExpenses(this.expensesInteractor.saveMany(request.getExpenses()));
		return this.usecase.save(stock);

	}

	private void updateProductPriceAndIncrementProductQuantity(List<StockItem> items) {
		if (items != null && !items.isEmpty()) {
			for (StockItem item : items) {
				Product product = item.getProduct();

				this.updateProductPrice(product, item);
				this.updateProductQuantity(product, item);
			}
		}
	}

	private void updateProductPrice(Product product, StockItem item) {
		StockPrice stockPrice = item.getStockPrice();

		ProductPrice price = product.getPrice();

		price.setMarkup(stockPrice.getMarkupPercent());
		price.setSellingPrice(stockPrice.getSellingPrice());
		price.setCostPrice(stockPrice.getCostPrice());
		this.productPriceUsecase.save(price);
	}

	private void updateProductQuantity(Product product, StockItem item) {
		ProductBasic basic = product.getBasic();
		basic.setQuantity(item.getProductQuantity());
		this.productBasicUsecase.save(basic);
	}

	@Override
	@Transactional
	public ResponseEntity<Boolean> save(StockRequest request) {
		try {
			Stock newStock = this.createNewStock(request);
			List<StockItem> stockItems = this.updateNewStockItems(newStock, request.getStockItems());
			this.updateProductPriceAndIncrementProductQuantity(stockItems);
			return ok().body(Boolean.TRUE);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
	}

	/*
	Stock stock = this.setStockModelsAndUpdate(request);
	this.setStockItems(stock, request);
	this.updateProductPriceAfterSavingStock(stockItems);
	 */

	/*
	private Stock setStockModelsAndUpdate(StockRequest request) {
		Stock model = new Stock();
		this.setStockDetails(model, request);
		this.setStockSettlementIfIsGroupedSettlement(model, request);

		Stock saveStocked = this.saveStock(model);

		this.setStockExpensesIfIsGroupedExpenses(saveStocked, request);
		return saveStocked;
	}
	*/

	/*
	private Stock saveStock(Stock stock) {
		return this.usecase.save(stock);
	}
	*/

	/*
	private void setStockDetails(Stock model, StockRequest request) {
		model.setIsGroupedExpenses(request.getIsGroupedExpenses());
		model.setIsGroupedSettlement(request.getIsGroupedSettlement());
		model.setRecordDate(LocalDate.now());
		model.setStatus(REGISTERED);

	}
	 */

	/*
	private void setStockSettlementIfIsGroupedSettlement(Stock model, StockRequest request) {
		if (request.getIsGroupedSettlement()) {
			model.setSettlement(this.settlementInteractor.save(request.getSettlement()));
		}
	}
	*/

	/*
	private void setStockExpensesIfIsGroupedExpenses(Stock model, StockRequest request) {
		if (request.getIsGroupedExpenses()) {
			List<StockExpenses> expenses = this.expensesInteractor.saveMany(request.getExpenses());
			model.setExpenses(expenses);
			this.usecase.save(model);
		}
	}
	*/

	/*
	private List<StockItem> setStockItems(Stock stock, StockRequest request) {
		List<StockItem> stockItems = this.itemInteractor.saveMany(request.getStockItems(), stock);
		stock.setStockItems(stockItems);
		this.saveStock(stock);
		return stockItems;
	}
	*/

	/*
	private void updateProductPriceAfterSavingStock(List<StockItem> stockItems) {

		if (stockItems != null && stockItems.size() > 0) {
			for (StockItem stockItem : stockItems) {
				ProductPrice productPrice = this.mapProductPriceFromStockItem(stockItem.getStockPrice());
				this.productPriceUsecase.updateProductPrice(stockItem.getProduct(), productPrice);
			}
		}

	}
	*/

	/*
	private ProductPrice mapProductPriceFromStockItem(StockPrice stockPrice) {
		ProductPrice price = new ProductPrice();
		price.setSellingPrice(stockPrice.getSellingPrice());
		price.setCostPrice(stockPrice.getCostPrice());
		price.setMarkup(stockPrice.getMarkupPercent());
		return price;
	}
	*/

	@Override
	public ResponseEntity<PageSearchResult<List<StockRequest>>> search(PageSearchRequest<StockSearchRequest> request) {
		return null;
	}

	@Override
	public ResponseEntity<List<StockRequest>> search(String term) {
		return null;
	}

	@Override
	public StockRequest toRequest(Stock model) {
		return this.mapper.map(model, StockRequest.class);
	}

	@Override
	public Stock toModel(StockRequest request) {
		return this.mapper.map(request, Stock.class);
	}

}

