/*
 * @Author: james.junior
 * @Date: 6/18/23 13:41
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.features.product.data.request.ProductCategoryRequest;
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
public class CompanySupplierRequest {
	private Long id;
	private String supplierBusinessName;
	private String supplierFirstName;
	private String supplierLastName;
	private String supplierEmailAddress;
	private String supplierPhone;
	private String supplierOfficeAddress;
	private List<ProductCategoryRequest> categories;
	private String createdAt;
	private Boolean isActiveStatus;
}
