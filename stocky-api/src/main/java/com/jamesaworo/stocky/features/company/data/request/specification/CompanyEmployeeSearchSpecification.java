/*
 * @Author: james.junior
 * @Date: 6/1/23 09:33
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.request.specification;

import com.jamesaworo.stocky.core.predicates.SearchPredicates;
import com.jamesaworo.stocky.features.authentication.data.request.RoleRequest;
import com.jamesaworo.stocky.features.authentication.domain.entity.Role;
import com.jamesaworo.stocky.features.authentication.domain.entity.User;
import com.jamesaworo.stocky.features.company.data.request.CompanyEmployeeSearchRequest;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyEmployee;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyEmployeePersonalDetail;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.jamesaworo.stocky.core.predicates.SearchPredicates.activeRecordPredicate;
import static com.jamesaworo.stocky.core.predicates.SearchPredicates.dateRangeParamPredicates;
import static org.springframework.util.ObjectUtils.isEmpty;

@Component
public class CompanyEmployeeSearchSpecification {

    private static Root<CompanyEmployee> mainRoot;

    public static Specification<CompanyEmployee> companyEmployeeSpecification(CompanyEmployeeSearchRequest request) {

        return (root, criteriaQuery, criteriaBuilder) -> {

            mainRoot = root;
            List<Predicate> predicates = new ArrayList<>();

            // full name
            if (!isEmpty(request) && !isEmpty(request.getEmployeeFullName())) {
                predicates.addAll(fullNamePredicates(criteriaBuilder, request.getEmployeeFullName()));
            }

            //  phone
            if (!isEmpty(request) && !isEmpty(request.getEmployeePhoneNumber())) {
                predicates.add(phoneNumberPredicate(criteriaBuilder, request.getEmployeePhoneNumber()));
            }

            //  email
            if (!isEmpty(request) && !isEmpty(request.getEmployeeEmail())) {
                predicates.add(emailPredicate(criteriaBuilder, request.getEmployeeEmail()));
            }

            // date range
            if (!isEmpty(request) && !isEmpty(request.getDateRangeParam())) {
                predicates.addAll(dateRangeParamPredicates(criteriaBuilder, request.getDateRangeParam(), mainRoot));
            }

            // role
            if (!isEmpty(request) && !isEmpty(request.getRoles())) {
                predicates.add(joinOnRolePredicate(criteriaBuilder, request.getRoles()));
            }

            // registered by
            {
                if (!isEmpty(request) && !isEmpty(request.getRegisteredBy())) {
                    predicates.add(SearchPredicates.createdByPredicate(criteriaBuilder, request.getRegisteredBy(), mainRoot));
                }
            }

            // is active record
            if (!isEmpty(request.getIsActiveStatus())) {
                predicates.addAll(activeRecordPredicate(criteriaBuilder, request.getIsActiveStatus(), mainRoot));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
        };
    }


    private static Predicate joinOnRolePredicate(CriteriaBuilder criteriaBuilder, List<RoleRequest> roles) {
        Join<CompanyEmployee, User> userJoin = mainRoot.join("accountDetail");
        Join<User, Role> roleJoin = userJoin.join("roles");

        List<Long> rolesId = roles.stream().map(RoleRequest::getId).collect(Collectors.toList());
        return roleJoin.get("id").in(rolesId);
    }

    private static List<Predicate> fullNamePredicates(CriteriaBuilder criteriaBuilder, String fullName) {
        List<Predicate> predicates = new ArrayList<>();
        Predicate firstNamePredicate = firstNamePredicate(criteriaBuilder, fullName);
        Predicate lastNamePredicate = lastNamePredicate(criteriaBuilder, fullName);
        predicates.add(criteriaBuilder.or(firstNamePredicate, lastNamePredicate));
        return predicates;
    }

    private static Predicate firstNamePredicate(CriteriaBuilder criteriaBuilder, String name) {
        Join<CompanyEmployee, CompanyEmployeePersonalDetail> join = mainRoot.join("personalDetail");
        return criteriaBuilder.like(criteriaBuilder.lower(join.get("employeeFirstName")), "%" + name.toLowerCase() + "%");
    }

    private static Predicate lastNamePredicate(CriteriaBuilder criteriaBuilder, String name) {
        Join<CompanyEmployee, CompanyEmployeePersonalDetail> join = mainRoot.join("personalDetail");
        return criteriaBuilder.like(criteriaBuilder.lower(join.get("employeeLastName")), "%" + name.toLowerCase() + "%");
    }

    private static Predicate phoneNumberPredicate(CriteriaBuilder criteriaBuilder, String search) {
        Join<CompanyEmployee, CompanyEmployeePersonalDetail> join = mainRoot.join("personalDetail");
        return criteriaBuilder.like(criteriaBuilder.lower(join.get("employeePhone")), "%" + search + "%");
    }

    private static Predicate emailPredicate(CriteriaBuilder criteriaBuilder, String search) {
        Join<CompanyEmployee, CompanyEmployeePersonalDetail> join = mainRoot.join("personalDetail");
        return criteriaBuilder.like(criteriaBuilder.lower(join.get("employeeEmail")), "%" + search + "%");
    }


}
