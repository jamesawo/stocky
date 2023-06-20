/*
 * @Author: james.junior
 * @Date: 6/17/23 16:09
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
public class CompanyExpensesRequest {
	private Long id;
	private CompanyExpensesCategoryRequest category;
	private Double amount;
	private String recordDate;
	private String comment;
	private String uploads;
	private Boolean isActiveStatus;
	private Boolean isRecentlyUpdated;
	private Boolean isPendingApproval;
	private String registeredBy;
	private String approvedBy;
	private String createdAt;
}
