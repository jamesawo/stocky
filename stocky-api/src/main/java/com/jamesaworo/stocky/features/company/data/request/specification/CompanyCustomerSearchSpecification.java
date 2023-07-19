/*
 * @Author: james.junior
 * @Date: 6/1/23 09:33
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.request.specification;

import com.jamesaworo.stocky.features.company.data.request.CompanyCustomerSearchRequest;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyCustomer;
import com.jamesaworo.stocky.features.company.domain.enums.CustomerTagEnum;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

import static com.jamesaworo.stocky.core.predicates.SearchPredicates.activeRecordPredicate;
import static com.jamesaworo.stocky.core.predicates.SearchPredicates.dateRangeParamPredicates;
import static org.springframework.util.ObjectUtils.isEmpty;
import static org.springframework.util.StringUtils.hasText;

@Component
public class CompanyCustomerSearchSpecification {

    private static Root<CompanyCustomer> mainRoot;

    public static Specification<CompanyCustomer> companyCustomerSpecification(String term) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            mainRoot = root;
            List<Predicate> predicates = new ArrayList<>();
            if (!isEmpty(term) && hasText(term)) {
                predicates.addAll(nameEmailPhoneOrAddressPredicates(criteriaBuilder, term));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
        };
    }


    public static Specification<CompanyCustomer> companyCustomerSpecification(CompanyCustomerSearchRequest request) {
        return (root, criteriaQuery, criteriaBuilder) -> {

            mainRoot = root;
            List<Predicate> predicates = new ArrayList<>();

            // customer full name
            if (!isEmpty(request) && !isEmpty(request.getCustomerFullName())) {
                predicates.addAll(fullNamePredicates(criteriaBuilder, request.getCustomerFullName()));
            }

            // customer phone
            if (!isEmpty(request) && !isEmpty(request.getCustomerPhoneNumber())) {
                predicates.add(phoneNumberPredicate(criteriaBuilder, request.getCustomerPhoneNumber()));
            }

            // customer email
            if (!isEmpty(request) && !isEmpty(request.getCustomerEmail())) {
                predicates.add(emailPredicate(criteriaBuilder, request.getCustomerEmail()));
            }

            // date range
            if (!isEmpty(request.getDateRangeParam())) {
                predicates.addAll(dateRangeParamPredicates(criteriaBuilder, request.getDateRangeParam(), mainRoot));
            }

            // customer tag
            if (!isEmpty(request) && !isEmpty(request.getCustomerTag())) {
                predicates.add(customerTagPredicate(criteriaBuilder, request.getCustomerTag()));
            }


            // is active record
            if (!isEmpty(request.getIsActiveStatus())) {
                predicates.addAll(activeRecordPredicate(criteriaBuilder, request.getIsActiveStatus(), mainRoot));
            }

            // registered by
            if (!isEmpty(request) && !isEmpty(request.getRegisteredBy())) {
                predicates.add(registeredByPredicate(criteriaBuilder, request.getRegisteredBy()));
            }


			/* todo:: add searchPredicates for the following
				ProductCategoryRequest productCategoryRequest -> search all customers who have purchased product from this category
				ProductRequest productRequest -> search all customers who have purchased this product
				String promotion -> search all customers who have used this promotion
			*/
            return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
        };
    }

    private static List<Predicate> nameEmailPhoneOrAddressPredicates(CriteriaBuilder criteriaBuilder, String term) {
        List<Predicate> predicates = new ArrayList<>();

        Predicate firstNamePredicate = customerFirstNamePredicate(criteriaBuilder, term);
        Predicate lastNamePredicate = lastNamePredicate(criteriaBuilder, term);
        Predicate emailPredicate = emailPredicate(criteriaBuilder, term);
        Predicate phonePredicate = phoneNumberPredicate(criteriaBuilder, term);
        Predicate addressPredicate = addressPredicate(criteriaBuilder, term);

        predicates.add(criteriaBuilder.or(
                firstNamePredicate, lastNamePredicate, emailPredicate, phonePredicate, addressPredicate
        ));
        return predicates;
    }

    private static List<Predicate> fullNamePredicates(CriteriaBuilder criteriaBuilder, String fullName) {
        List<Predicate> predicates = new ArrayList<>();
        Predicate firstNamePredicate = customerFirstNamePredicate(criteriaBuilder, fullName);
        Predicate lastNamePredicate = lastNamePredicate(criteriaBuilder, fullName);
        predicates.add(criteriaBuilder.or(firstNamePredicate, lastNamePredicate));
        return predicates;
    }

    private static Predicate customerFirstNamePredicate(CriteriaBuilder criteriaBuilder, String name) {
        return criteriaBuilder.like(criteriaBuilder.lower(mainRoot.get("customerFirstName")), "%" + name.toLowerCase() + "%");
    }

    private static Predicate lastNamePredicate(CriteriaBuilder criteriaBuilder, String name) {
        return criteriaBuilder.like(criteriaBuilder.lower(mainRoot.get("customerLastName")), "%" + name.toLowerCase() + "%");
    }

    private static Predicate phoneNumberPredicate(CriteriaBuilder criteriaBuilder, String search) {
        return criteriaBuilder.like(criteriaBuilder.lower(mainRoot.get("customerPhone")), "%" + search.toLowerCase() + "%");
    }

    private static Predicate emailPredicate(CriteriaBuilder criteriaBuilder, String search) {
        return criteriaBuilder.like(criteriaBuilder.lower(mainRoot.get("customerEmail")), "%" + search.toLowerCase() + "%");
    }

    private static Predicate addressPredicate(CriteriaBuilder criteriaBuilder, String search) {
        return criteriaBuilder.like(criteriaBuilder.lower(mainRoot.get("customerAddress")), "%" + search.toLowerCase() + "%");
    }

    private static Predicate customerTagPredicate(CriteriaBuilder criteriaBuilder, CustomerTagEnum tagEnum) {
        return criteriaBuilder.equal(mainRoot.get("customerTag"), tagEnum);
    }

    private static Predicate registeredByPredicate(CriteriaBuilder criteriaBuilder, String username) {
        return criteriaBuilder.equal(mainRoot.get("registeredBy"), username);
    }

}
