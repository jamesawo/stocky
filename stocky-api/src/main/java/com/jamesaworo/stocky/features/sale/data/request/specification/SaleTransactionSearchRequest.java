/*
 * @Author: james.junior
 * @Date: 7/24/23 21:21
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.request.specification;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.core.params.DateRangeParam;
import com.jamesaworo.stocky.features.company.data.request.CompanyCustomerRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanyEmployeeRequest;
import com.jamesaworo.stocky.features.sale.data.request.SaleTransactionInstallmentRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SaleTransactionSearchRequest {
    private Long id;
    private String reference;
    private String serial;
    private LocalTime time;
    private LocalDate date;
    private CompanyCustomerRequest customer;
    private CompanyEmployeeRequest employee;
    private SaleTransactionInstallmentRequest installment;
    private DateRangeParam dateRange;

}
