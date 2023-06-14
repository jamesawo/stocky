/*
 * @Author: james.junior
 * @Date: 6/12/23 14:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.repository;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyExpensesCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyExpensesCategoryRepository extends JpaRepository<CompanyExpensesCategory, Long> {
}
