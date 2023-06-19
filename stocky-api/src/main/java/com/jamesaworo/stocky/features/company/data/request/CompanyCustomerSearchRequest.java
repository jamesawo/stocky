/*
 * @Author: james.junior
 * @Date: 6/18/23 14:29
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.core.params.DateRangeParam;
import com.jamesaworo.stocky.features.company.domain.enums.CustomerTagEnum;
import com.jamesaworo.stocky.features.product.data.request.ProductCategoryRequest;
import com.jamesaworo.stocky.features.product.data.request.ProductRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompanyCustomerSearchRequest {
	private String customerFullName;
	private String customerPhoneNumber;
	private String customerEmail;
	private DateRangeParam dateRangeParam;
	private CustomerTagEnum customerTag;
	private ProductCategoryRequest productCategoryRequest;
	private ProductRequest productRequest;
	private String promotion;
	private String registeredBy;
	private Boolean isActiveStatus;
}
