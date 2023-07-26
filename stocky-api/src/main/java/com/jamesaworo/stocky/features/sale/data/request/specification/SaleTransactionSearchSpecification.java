/*
 * @Author: james.junior
 * @Date: 6/1/23 09:33
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.request.specification;

import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;


@Component
public class SaleTransactionSearchSpecification {

    private static Root<SaleTransaction> mainRoot;


    public static Specification<SaleTransaction> salesSaleTransactionSpecification(SaleTransactionSearchRequest request) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            mainRoot = root;
            List<Predicate> predicates = new ArrayList<>();

            return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
        };
    }


    public static Specification<SaleTransaction> SaleTransactionSpecification(final String searchTerm) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            mainRoot = root;
            List<Predicate> predicates = new ArrayList<>();
            return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
        };
    }

}
