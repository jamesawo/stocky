/*
 * @Author: james.junior
 * @Date: 6/12/23 14:34
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.request;

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
public class CompanyExpensesCategoryRequest {
	private Long id;
	private String title;
	private String description;
	private Boolean isActiveStatus;
}
