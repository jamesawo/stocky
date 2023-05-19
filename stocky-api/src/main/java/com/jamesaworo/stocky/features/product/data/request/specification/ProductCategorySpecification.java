package com.jamesaworo.stocky.features.product.data.request.specification;

import com.jamesaworo.stocky.features.product.domain.entity.ProductCategory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Aworo James
 * @since 5/19/23
 */
@Component
public class ProductCategorySpecification {

    public static Specification<ProductCategory> byTitle(final String term) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
        };
    }
}