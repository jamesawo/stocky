/*
 * @Author: james.junior
 * @Date: 6/1/23 09:33
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.request.specification;

import com.jamesaworo.stocky.core.params.DateRangeParam;
import com.jamesaworo.stocky.features.company.data.request.CompanyCustomerRequest;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyCustomer;
import com.jamesaworo.stocky.features.report.data.request.SaleReportRequest;
import com.jamesaworo.stocky.features.sale.data.request.SaleTransactionInstallmentRequest;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionInstallment;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

import static com.jamesaworo.stocky.core.predicates.SearchPredicates.*;
import static com.jamesaworo.stocky.core.utils.Util.parseToLocalDate;
import static org.springframework.util.ObjectUtils.isEmpty;


@Component
public class SaleTransactionSearchSpecification {

    private static Root<SaleTransaction> mainRoot;


    public static Specification<SaleTransaction> salesSaleTransactionSpecification(SaleTransactionSearchRequest request) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            mainRoot = root;
            List<Predicate> predicates = new ArrayList<>();

            // id
            if (!isEmpty(request) && !isEmpty(request.getId())) {
                predicates.add(criteriaBuilder.equal(root.get("id"), request.getId()));
                return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
            }

            // reference and serial
            if (!isEmpty(request) && !isEmpty(request.getReference()) && !isEmpty(request.getSerial())) {
                referenceAndSerialPredicate(predicates, request, criteriaBuilder);
                return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
            }

            // serial
            if (!isEmpty(request) && !isEmpty(request.getSerial())) {
                predicates.add(serialPredicate(criteriaBuilder, request.getSerial()));
            }

            // single date
            if (!isEmpty(request) && !isEmpty(request.getDate())) {
                predicates.add(createdAtPredicate(criteriaBuilder, parseToLocalDate(request.getDate()), mainRoot));
            }

            // customer
            if (!isEmpty(request) && !isEmpty(request.getCustomer()) && !isEmpty(request.getCustomer().getId())) {
                predicates.add(joinOnCustomerPredicate(criteriaBuilder, request.getCustomer()));
            }

            // user
            if (!isEmpty(request) && !isEmpty(request.getUser()) && !isEmpty(request.getUser().getUsername())) {
                predicates.add(createdByPredicate(criteriaBuilder, request.getUser().getUsername(), mainRoot));
            }

            // installment payment
            if (!isEmpty(request) && !isEmpty(request.getInstallment())) {
                predicates.add(joinOnInstallmentPredicate(criteriaBuilder, request.getInstallment()));
            }

            // date range
            if (!isEmpty(request) && !isEmpty(request.getDateRange())) {
                predicates.addAll(dateRangeParamPredicates(criteriaBuilder, request.getDateRange(), mainRoot));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
        };
    }


    public static Specification<SaleTransaction> salesReportSpecification(SaleReportRequest request) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            mainRoot = root;
            List<Predicate> predicates = new ArrayList<>();

            // date range
            if (!isEmpty(request) && !isEmpty(request.getStartDate()) && !isEmpty(request.getEndDate())) {
                predicates.addAll(dateRangeParamPredicates(
                        criteriaBuilder,
                        new DateRangeParam(request.getStartDate(), request.getEndDate()),
                        mainRoot)
                );
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
        };
    }

    private static void referenceAndSerialPredicate(List<Predicate> predicates, SaleTransactionSearchRequest request, CriteriaBuilder criteriaBuilder) {
        Predicate productNamePredicate = referencePredicate(criteriaBuilder, request.getReference());
        Predicate brandNamePredicate = serialPredicate(criteriaBuilder, request.getSerial());

        predicates.add(criteriaBuilder.and(productNamePredicate, brandNamePredicate));
    }

    private static Predicate referencePredicate(CriteriaBuilder criteriaBuilder, String reference) {
        return criteriaBuilder.like(criteriaBuilder.lower(mainRoot.get("reference")), "%" + reference.toLowerCase() + "%");
    }

    private static Predicate serialPredicate(CriteriaBuilder criteriaBuilder, String serial) {
        return criteriaBuilder.like(criteriaBuilder.lower(mainRoot.get("serial")), "%" + serial.toLowerCase() + "%");
    }

    private static Predicate joinOnCustomerPredicate(CriteriaBuilder criteriaBuilder, CompanyCustomerRequest customer) {
        Join<SaleTransaction, CompanyCustomer> customerJoin = mainRoot.join("customer");
        return criteriaBuilder.equal(customerJoin.get("id"), customer.getId());
    }

    private static Predicate joinOnInstallmentPredicate(CriteriaBuilder criteriaBuilder, SaleTransactionInstallmentRequest request) {
        Join<SaleTransaction, SaleTransactionInstallment> installmentJoin = mainRoot.join("installment");
        return criteriaBuilder.equal(installmentJoin.get("id"), request.getId());
    }

}
