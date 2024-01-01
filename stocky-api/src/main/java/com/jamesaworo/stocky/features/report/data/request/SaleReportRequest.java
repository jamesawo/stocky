/*
 * @Author: james.junior
 * @Date: 12/31/23 4:21 PM
 *
 * @Project: stocky
 */

package com.jamesaworo.stocky.features.report.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.features.report.data.enums.SaleReportType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SaleReportRequest {
    private SaleReportType reportType;
    private LocalDate endDate;
    private LocalDate startDate;
}
