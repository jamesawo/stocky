/*
 * @Author: james.junior
 * @Date: 6/1/23 11:14
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.params;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DateRangeParam {
    private LocalDate startDate;
    private LocalDate endDate;
}
