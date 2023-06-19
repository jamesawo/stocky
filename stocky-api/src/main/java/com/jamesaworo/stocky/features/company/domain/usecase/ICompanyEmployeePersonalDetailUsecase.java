/*
 * @Author: james.junior
 * @Date: 6/18/23 22:55
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.domain.usecase;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyEmployeePersonalDetail;

import java.util.Optional;

public interface ICompanyEmployeePersonalDetailUsecase {

	CompanyEmployeePersonalDetail save(CompanyEmployeePersonalDetail detail);

	Optional<CompanyEmployeePersonalDetail> findOne(Long id);


}
