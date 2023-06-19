/*
 * @Author: james.junior
 * @Date: 6/18/23 22:55
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.domain.usecase;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyEmployeeNokDetail;

import java.util.Optional;

public interface ICompanyEmployeeNokDetailUsecase {

	CompanyEmployeeNokDetail save(CompanyEmployeeNokDetail detail);

	Optional<CompanyEmployeeNokDetail> findOne(Long id);

}
