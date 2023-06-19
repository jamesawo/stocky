/*
 * @Author: james.junior
 * @Date: 6/1/23 09:33
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.request.specification;

import com.jamesaworo.stocky.core.predicates.SearchPredicates;
import com.jamesaworo.stocky.features.company.data.request.CompanySupplierSearchRequest;
import com.jamesaworo.stocky.features.company.domain.entity.CompanySupplier;
import com.jamesaworo.stocky.features.product.data.request.ProductCategoryRequest;
import com.jamesaworo.stocky.features.product.domain.entity.ProductCategory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.jamesaworo.stocky.core.predicates.SearchPredicates.dateRangeParamPredicates;
import static org.springframework.util.ObjectUtils.isEmpty;

@Component
public class CompanySupplierSearchSpecification {

	private static Root<CompanySupplier> mainRoot;

	public static Specification<CompanySupplier> companySupplierSpecification(String searchTerm) {
		return (root, criteriaQuery, criteriaBuilder) -> {
			mainRoot = root;
			List<Predicate> predicates = new ArrayList<>(searchSupplierDetail(criteriaBuilder, searchTerm));
			return criteriaBuilder.and(predicates.toArray(new Predicate[] { }));
		};
	}

	public static Specification<CompanySupplier> companySupplierSpecification(CompanySupplierSearchRequest request) {
		return (root, criteriaQuery, criteriaBuilder) -> {
			mainRoot = root;
			List<Predicate> predicates = new ArrayList<>();


			// full name
			if (!isEmpty(request) && !isEmpty(request.getSupplierFullName())) {
				predicates.add(searchFullNamePredicate(criteriaBuilder, request.getSupplierFullName()));
			}

			// phone
			if (!isEmpty(request) && !isEmpty(request.getSupplierPhoneNumber())) {
				predicates.add(supplierPhonePredicate(criteriaBuilder, request.getSupplierPhoneNumber()));
			}

			// email
			if (!isEmpty(request) && !isEmpty(request.getSupplierEmail())) {
				predicates.add(supplierEmailPredicate(criteriaBuilder, request.getSupplierEmail()));
			}

			// date range
			if (!isEmpty(request) && !isEmpty(request.getDateRangeParam())) {
				predicates.addAll(dateRangeParamPredicates(criteriaBuilder, request.getDateRangeParam(), mainRoot));
			}

			// active status
			if (!isEmpty(request) && !isEmpty(request.getIsActiveStatus())) {
				predicates.addAll(SearchPredicates.activeRecordPredicate(criteriaBuilder, request.getIsActiveStatus(), mainRoot));
			}

			// product categories
			if (!isEmpty(request) && !isEmpty(request.getCategories())) {
				predicates.add(joinOnProductCategoryPredicate(criteriaBuilder, request.getCategories()));
			}


			return criteriaBuilder.and(predicates.toArray(new Predicate[] { }));
		};
	}
	
	private static List<Predicate> searchSupplierDetail(CriteriaBuilder criteriaBuilder, String searchTerm) {
		List<Predicate> predicates = new ArrayList<>();
		Predicate businessNamePredicate = supplierBusinessNamePredicate(criteriaBuilder, searchTerm);
		Predicate firstNamePredicate = supplierFirstNamePredicate(criteriaBuilder, searchTerm);
		Predicate lastNamePredicate = supplierLastNamePredicate(criteriaBuilder, searchTerm);
		Predicate emailPredicate = supplierEmailPredicate(criteriaBuilder, searchTerm);
		Predicate phonePredicate = supplierPhonePredicate(criteriaBuilder, searchTerm);
		Predicate addressPredicate = supplierAddressPredicate(criteriaBuilder, searchTerm);
		predicates.add(criteriaBuilder.or(
				businessNamePredicate, firstNamePredicate,
				lastNamePredicate, emailPredicate, phonePredicate, addressPredicate
		));
		return predicates;
	}

	private static Predicate searchFullNamePredicate(CriteriaBuilder criteriaBuilder, String searchTerm) {
		Predicate businessNamePredicate = supplierBusinessNamePredicate(criteriaBuilder, searchTerm);
		Predicate firstNamePredicate = supplierFirstNamePredicate(criteriaBuilder, searchTerm);
		Predicate lastNamePredicate = supplierLastNamePredicate(criteriaBuilder, searchTerm);
		return criteriaBuilder.or(businessNamePredicate, firstNamePredicate, lastNamePredicate);
	}

	private static Predicate supplierBusinessNamePredicate(CriteriaBuilder criteriaBuilder, String name) {
		return criteriaBuilder.like(criteriaBuilder.lower(mainRoot.get("supplierBusinessName")), "%" + name.toLowerCase() + "%");
	}

	private static Predicate supplierFirstNamePredicate(CriteriaBuilder criteriaBuilder, String name) {
		return criteriaBuilder.like(criteriaBuilder.lower(mainRoot.get("supplierFirstName")), "%" + name.toLowerCase() + "%");
	}

	private static Predicate supplierLastNamePredicate(CriteriaBuilder criteriaBuilder, String name) {
		return criteriaBuilder.like(criteriaBuilder.lower(mainRoot.get("supplierLastName")), "%" + name.toLowerCase() + "%");
	}

	private static Predicate supplierEmailPredicate(CriteriaBuilder criteriaBuilder, String name) {
		return criteriaBuilder.like(criteriaBuilder.lower(mainRoot.get("supplierEmailAddress")), "%" + name.toLowerCase() + "%");
	}

	private static Predicate supplierPhonePredicate(CriteriaBuilder criteriaBuilder, String name) {
		return criteriaBuilder.like(criteriaBuilder.lower(mainRoot.get("supplierPhone")), "%" + name.toLowerCase() + "%");
	}

	private static Predicate supplierAddressPredicate(CriteriaBuilder criteriaBuilder, String term) {
		return criteriaBuilder.like(criteriaBuilder.lower(mainRoot.get("supplierOfficeAddress")), "%" + term.toLowerCase() + "%");
	}

	private static Predicate joinOnProductCategoryPredicate(CriteriaBuilder criteriaBuilder, List<ProductCategoryRequest> list) {
		Join<CompanySupplier, ProductCategory> categoryJoin = mainRoot.join("categories");
		List<Long> ids = list.stream().map(ProductCategoryRequest::getId).collect(Collectors.toList());
		return categoryJoin.get("id").in(ids);
	}


}
