/*
 * @Author: james.junior
 * @Date: 6/26/23 18:25
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StockPriceRequest {
	private Long id;
	private Double costPrice;
	private Double markupPercent;
	private Double sellingPrice;
	private Double expensesAmount;
	private String createdAt;
	private Boolean isActiveStatus;

}
