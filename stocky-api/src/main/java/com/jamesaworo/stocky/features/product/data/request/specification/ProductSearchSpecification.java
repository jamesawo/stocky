/*
 * @Author: james.junior
 * @Date: 6/1/23 09:33
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.request.specification;

import com.jamesaworo.stocky.core.params.DateRangeParam;
import com.jamesaworo.stocky.features.product.data.request.ProductSearchRequest;
import com.jamesaworo.stocky.features.product.domain.entity.Product;
import com.jamesaworo.stocky.features.product.domain.entity.ProductBasic;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.util.ObjectUtils.isEmpty;


@Component
public class ProductSearchSpecification {

	private static Root<Product> mainRoot;

	public static Specification<Product> byCriteria(final String searchTerm) {
		return (root, criteriaQuery, criteriaBuilder) -> {
			mainRoot = root;
			List<Predicate> predicates = new ArrayList<>();
			addProductOrBrandNamePredicate(predicates, searchTerm, criteriaBuilder);
			return criteriaBuilder.and(predicates.toArray(new Predicate[] { }));
		};
	}

	public static Specification<Product> productSpecificationBySearchRequest(ProductSearchRequest request) {
		return (root, criteriaQuery, criteriaBuilder) -> {
			mainRoot = root;
			List<Predicate> predicates = new ArrayList<>();

			// product name
			if (!isEmpty(request) && !isEmpty(request.getProductName())) {
				predicates.add(joinOnProductNamePredicate(criteriaBuilder, request.getProductName()));
			}

			// brand name
			if (!isEmpty(request) && !isEmpty(request.getBrandName())) {
				predicates.add(joinOnBrandNamePredicate(criteriaBuilder, request.getBrandName()));
			}
			// sku
			if (!isEmpty(request) && !isEmpty(request.getSku())) {
				predicates.add(joinOnBasicPredicate(criteriaBuilder, request.getSku(), "sku"));
			}

			// date range
			if (!isEmpty(request.getDateRangeParam())) {
				predicates.addAll(dateRangeParamPredicate(criteriaBuilder, request.getDateRangeParam()));
			}


			return criteriaBuilder.and(predicates.toArray(new Predicate[] { }));
		};
	}

	private static Join<Product, ProductBasic> basicJoin(Root<Product> root) {
		return root.join("basic");
	}

	private static Join<Product, ProductBasic> priceJoin(Root<Product> root) {
		return root.join("price");
	}


	private static Predicate joinOnProductNamePredicate(CriteriaBuilder criteriaBuilder, String searchTerm) {
		Join<Product, ProductBasic> basicJoin = basicJoin(mainRoot);
		return criteriaBuilder.like(criteriaBuilder.lower(basicJoin.get("productName")), "%" + searchTerm.toLowerCase() + "%");
	}

	private static Predicate joinOnBrandNamePredicate(CriteriaBuilder criteriaBuilder, String searchTerm) {
		Join<Product, ProductBasic> basicJoin = basicJoin(mainRoot);
		return criteriaBuilder.like(criteriaBuilder.lower(basicJoin.get("brandName")), "%" + searchTerm.toLowerCase() + "%");
	}


	private static Predicate joinOnBasicPredicate(CriteriaBuilder criteriaBuilder, String searchTerm, String columnName) {
		Join<Product, ProductBasic> basicJoin = basicJoin(mainRoot);
		return criteriaBuilder.like(criteriaBuilder.lower(basicJoin.get(columnName)), "%" + searchTerm.toLowerCase() + "%");
	}

	private static void addProductOrBrandNamePredicate(
			List<Predicate> predicates, String searchTerm,
			CriteriaBuilder criteriaBuilder
	) {

		Predicate productNamePredicate = joinOnProductNamePredicate(criteriaBuilder, searchTerm);
		Predicate brandNamePredicate = joinOnBrandNamePredicate(criteriaBuilder, searchTerm);
		predicates.add(criteriaBuilder.or(productNamePredicate, brandNamePredicate));
	}

	private static List<Predicate> dateRangeParamPredicate(CriteriaBuilder criteriaBuilder, DateRangeParam param) {
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
