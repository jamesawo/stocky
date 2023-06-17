/*
 * @Author: james.junior
 * @Date: 6/1/23 11:14
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.params;

import lombok.Data;

@Data
public class MinMaxAmountParam {
	private Double minAmount;
	private Double maxAmount;
	private Double fixedAmount;
	private Boolean isRange;
}
