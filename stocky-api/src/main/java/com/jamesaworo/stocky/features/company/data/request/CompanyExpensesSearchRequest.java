package com.jamesaworo.stocky.features.company.data.request;

import com.jamesaworo.stocky.core.params.DateRangeParam;
import com.jamesaworo.stocky.core.params.MinMaxAmountParam;
import lombok.Data;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@Data
public class CompanyExpensesSearchRequest {
	private Long id;
	private CompanyExpensesCategoryRequest category;
	private String registeredBy;
	private String approvedBy;
	private MinMaxAmountParam amountRange;
	private DateRangeParam dateRangeParam;
	private Boolean isActiveStatus;

}