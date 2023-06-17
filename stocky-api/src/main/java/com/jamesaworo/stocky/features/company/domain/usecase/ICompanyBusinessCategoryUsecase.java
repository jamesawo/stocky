/*
 * @Author: james.junior
 * @Date: 6/15/23 00:44
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.domain.usecase;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyBusinessCategory;

import java.util.List;
import java.util.Optional;

public interface ICompanyBusinessCategoryUsecase {
	List<CompanyBusinessCategory> getAll();

	Optional<CompanyBusinessCategory> getOne(Long id);

}
