/*
 * @Author: james.junior
 * @Date: 6/12/23 14:34
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.domain.usecase;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyExpensesCategory;

import java.util.List;
import java.util.Optional;

public interface ICompanyExpensesCategoryUsecase {

	CompanyExpensesCategory save(CompanyExpensesCategory category);

	List<CompanyExpensesCategory> findAll();

	Optional<CompanyExpensesCategory> findOne(Long id);
}
