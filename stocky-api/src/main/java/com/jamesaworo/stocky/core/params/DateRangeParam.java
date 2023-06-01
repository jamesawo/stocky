/*
 * @Author: james.junior
 * @Date: 6/1/23 11:14
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.params;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DateRangeParam {
	private LocalDate startDate;
	private LocalDate endDate;
}
