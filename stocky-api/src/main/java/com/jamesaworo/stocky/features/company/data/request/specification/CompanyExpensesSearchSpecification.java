/*
 * @Author: james.junior
 * @Date: 6/1/23 09:33
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.request.specification;

import com.jamesaworo.stocky.core.params.MinMaxAmountParam;
import com.jamesaworo.stocky.features.company.data.request.CompanyExpensesCategoryRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanyExpensesSearchRequest;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyExpenses;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyExpensesCategory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

import static com.jamesaworo.stocky.core.predicates.SearchPredicates.activeRecordPredicate;
import static com.jamesaworo.stocky.core.predicates.SearchPredicates.dateRangeParamPredicates;
import static org.springframework.util.ObjectUtils.isEmpty;

@Component
public class CompanyExpensesSearchSpecification {

	private static Root<CompanyExpenses> mainRoot;

	public static Specification<CompanyExpenses> companyExpensesSpecification(CompanyExpensesSearchRequest request) {
		return (root, criteriaQuery, criteriaBuilder) -> {
			mainRoot = root;
			List<Predicate> predicates = new ArrayList<>();

			// expenses category
			if (!isEmpty(request) && !isEmpty(request.getCategory()) && !isEmpty(request.getCategory().getId())) {
				predicates.add(joinOnExpensesCategory(criteriaBuilder, request.getCategory()));
			}

			// registered by
			if (!isEmpty(request) && !isEmpty(request.getRegisteredBy())) {
				predicates.add(registeredByPredicate(criteriaBuilder, request.getRegisteredBy()));
			}

			// approved by
			if (!isEmpty(request) && !isEmpty(request.getApprovedBy())) {
				predicates.add(approvedByPredicate(criteriaBuilder, request.getApprovedBy()));
			}

			// amount range
			if (!isEmpty(request) && !isEmpty(request.getAmountRange())) {
				predicates.addAll(amountRangePredicates(criteriaBuilder, request.getAmountRange()));
			}

			// date range
			if (!isEmpty(request.getDateRangeParam())) {
				predicates.addAll(dateRangeParamPredicates(criteriaBuilder, request.getDateRangeParam(), mainRoot));
			}

			// is active record
			if (!isEmpty(request.getIsActiveStatus())) {
				predicates.addAll(activeRecordPredicate(criteriaBuilder, request.getIsActiveStatus(), mainRoot));
			}

			return criteriaBuilder.and(predicates.toArray(new Predicate[] { }));
		};
	}

	private static Predicate registeredByPredicate(CriteriaBuilder criteriaBuilder, String username) {
		return criteriaBuilder.equal(mainRoot.get("registeredBy"), username);
	}

	private static Predicate approvedByPredicate(CriteriaBuilder criteriaBuilder, String username) {
		return criteriaBuilder.equal(mainRoot.get("approvedBy"), username);
	}

	private static Predicate joinOnExpensesCategory(CriteriaBuilder criteriaBuilder, CompanyExpensesCategoryRequest request) {
		Join<CompanyExpenses, CompanyExpensesCategory> join = mainRoot.join("category");
		return criteriaBuilder.equal(join.get("id"), request.getId());
	}

	private static List<Predicate> amountRangePredicates(CriteriaBuilder criteriaBuilder, MinMaxAmountParam amountParam) {
		List<Predicate> predicates = new ArrayList<>();
		if (amountParam.getIsRange()) {
			if (!isEmpty(amountParam.getMinAmount()) && amountParam.getMinAmount().intValue() > 0) {
				predicates.add(criteriaBuilder.greaterThanOrEqualTo(mainRoot.get("amount"), amountParam.getMinAmount()));
			}

			if (!isEmpty(amountParam.getMaxAmount()) && amountParam.getMaxAmount().intValue() > 0) {
				predicates.add(criteriaBuilder.lessThanOrEqualTo(mainRoot.get("amount"), amountParam.getMaxAmount()));
			}
		}
		else {
			predicates.add(criteriaBuilder.equal(mainRoot.get("amount"), amountParam.getFixedAmount()));
		}

		return predicates;
	}


}
