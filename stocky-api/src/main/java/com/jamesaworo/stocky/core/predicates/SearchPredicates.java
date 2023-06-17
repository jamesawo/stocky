/*
 * @Author: james.junior
 * @Date: 6/17/23 22:19
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.predicates;

import com.jamesaworo.stocky.core.params.DateRangeParam;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.util.ObjectUtils.isEmpty;

public class SearchPredicates {
	public static <T> List<Predicate> dateRangeParamPredicates(
			CriteriaBuilder criteriaBuilder,
			DateRangeParam param,
			Root<T> mainRoot
	) {
		List<Predicate> predicates = new ArrayList<>();

		if (!isEmpty(param.getEndDate())) {
			predicates.add(criteriaBuilder.lessThanOrEqualTo(mainRoot.get("createdAt"), param.getEndDate().atStartOfDay()));
		}

		if (!isEmpty(param.getStartDate())) {
			predicates.add(criteriaBuilder.greaterThanOrEqualTo(mainRoot.get("createdAt"), param.getStartDate().atStartOfDay()));
		}

		return predicates;
	}
}
