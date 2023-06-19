/*
 * @Author: james.junior
 * @Date: 6/18/23 14:29
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.core.params.DateRangeParam;
import com.jamesaworo.stocky.features.product.data.request.ProductCategoryRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompanySupplierSearchRequest {
	private String supplierFullName;
	private String supplierPhoneNumber;
	private String supplierEmail;
	private DateRangeParam dateRangeParam;
	private List<ProductCategoryRequest> categories;
	private LocalDate createdAt;
	private String registeredBy;
	private Boolean isActiveStatus;
}
