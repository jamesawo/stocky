/*
 * @Author: james.junior
 * @Date: 6/26/23 18:25
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.features.company.data.request.CompanySupplierRequest;
import com.jamesaworo.stocky.features.product.data.request.ProductRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StockItemRequest {
	private Long id;
	private String recordedDate;
	private Integer productQuantity;
	private Integer productQuantitySold;
	private String other;
	private CompanySupplierRequest supplier;
	private ProductRequest product;
	private List<StockExpensesRequest> expenses;
	private StockSettlementRequest settlement;
	private StockPriceRequest price;
	private String createdAt;
	private Boolean isActiveStatus;
}
