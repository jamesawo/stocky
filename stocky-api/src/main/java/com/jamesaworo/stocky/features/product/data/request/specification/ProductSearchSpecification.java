/*
 * @Author: james.junior
 * @Date: 6/1/23 09:33
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.request.specification;

import com.jamesaworo.stocky.core.params.MinMaxAmountParam;
import com.jamesaworo.stocky.features.product.data.request.ProductCategoryRequest;
import com.jamesaworo.stocky.features.product.data.request.ProductSearchRequest;
import com.jamesaworo.stocky.features.product.data.request.ProductStatusRequest;
import com.jamesaworo.stocky.features.product.data.request.ProductTaxRequest;
import com.jamesaworo.stocky.features.product.domain.entity.*;
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
public class ProductSearchSpecification {

    private static Root<Product> mainRoot;


    public static Specification<Product> salesProductSpecification(ProductSearchRequest request) {
        return (root, criteriaQuery, criteriaBuilder) -> {

            mainRoot = root;
            List<Predicate> predicates = new ArrayList<>();
            if (!isEmpty(request.getProductOrBrandName())) {
                addProductOrBrandNamePredicate(predicates, request.getProductOrBrandName(), criteriaBuilder);
            }

            if (!isEmpty(request.getCategories()) && !request.getCategories().isEmpty()) {
                predicates.add(joinOnProductCategories(criteriaBuilder, request.getCategories()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
        };
    }

    public static Specification<Product> productSpecification(final String searchTerm) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            mainRoot = root;
            List<Predicate> predicates = new ArrayList<>();
            addProductOrBrandNamePredicate(predicates, searchTerm, criteriaBuilder);
            return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
        };
    }

    public static Specification<Product> productSpecification(ProductSearchRequest request) {
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
                predicates.addAll(dateRangeParamPredicates(criteriaBuilder, request.getDateRangeParam(), mainRoot));
            }

            // selling price range
            if (!isEmpty(request) && !isEmpty(request.getSellingPriceParam())) {
                predicates.addAll(joinOnProductSellingPricePredicate(criteriaBuilder, request.getSellingPriceParam()));
            }

            // cost price range
            if (!isEmpty(request) && !isEmpty(request.getCostPriceParam())) {
                predicates.addAll(joinOnProductCostPricePredicate(criteriaBuilder, request.getCostPriceParam()));
            }

            // product category
            if (!isEmpty(request) && !isEmpty(request.getCategory()) && !isEmpty(request.getCategory().getId())) {
                predicates.add(joinOnBasicProductCategory(criteriaBuilder, request.getCategory()));
            }

            // product status
            if (!isEmpty(request.getStatus()) && !isEmpty(request.getStatus().getId())) {
                predicates.add(joinOnBasicProductStatus(criteriaBuilder, request.getStatus()));
            }

            // taxes
            if (!isEmpty(request.getTaxes()) && request.getTaxes().size() > 0) {
                predicates.add(joinOnProductTaxes(criteriaBuilder, request.getTaxes()));
            }

            // is service
//            if (!isEmpty(request.getIsService())) {
//                predicates.addAll(joinOnBasicIsServicePredicate(criteriaBuilder, request.getIsService()));
//            }

            // is active
            if (!isEmpty(request.getIsActive())) {
                predicates.addAll(joinOnBasicIsActivePredicate(criteriaBuilder, request.getIsActive()));
            }


            return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
        };
    }

    private static Join<Product, ProductBasic> basicJoin(Root<Product> root) {
        return root.join("basic");
    }

    private static Join<Product, ProductPrice> priceJoin(Root<Product> root) {
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

    private static List<Predicate> joinOnProductSellingPricePredicate(CriteriaBuilder criteriaBuilder, MinMaxAmountParam param) {
        Join<Product, ProductPrice> priceJoin = priceJoin(mainRoot);

        List<Predicate> predicates = new ArrayList<>();
        if (!isEmpty(param.getMinAmount())) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(priceJoin.get("sellingPrice"), param.getMinAmount()));
        }

        if (!isEmpty(param.getMaxAmount())) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(priceJoin.get("sellingPrice"), param.getMaxAmount()));
        }

        return predicates;
    }

    private static List<Predicate> joinOnProductCostPricePredicate(CriteriaBuilder criteriaBuilder, MinMaxAmountParam param) {
        Join<Product, ProductPrice> priceJoin = priceJoin(mainRoot);

        List<Predicate> predicates = new ArrayList<>();
        if (!isEmpty(param.getMinAmount())) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(priceJoin.get("costPrice"), param.getMinAmount()));
        }

        if (!isEmpty(param.getMaxAmount())) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(priceJoin.get("costPrice"), param.getMaxAmount()));
        }

        return predicates;
    }

    private static Predicate joinOnProductCategories(CriteriaBuilder criteriaBuilder, List<ProductCategoryRequest> categories) {
        Join<Product, ProductBasic> basicJoin = mainRoot.join("basic");
        Join<ProductBasic, ProductCategory> categoryJoin = basicJoin.join("productCategory");

        List<Long> ids = categories.stream().map(ProductCategoryRequest::getId).collect(Collectors.toList());
        return categoryJoin.get("id").in(ids);
    }

    private static Predicate joinOnBasicProductCategory(CriteriaBuilder criteriaBuilder, ProductCategoryRequest request) {
        Join<Product, ProductBasic> basicJoin = basicJoin(mainRoot);
        Join<Object, Object> join = basicJoin.join("productCategory");

        return criteriaBuilder.equal(join.get("id"), request.getId());
    }

    private static Predicate joinOnBasicProductStatus(CriteriaBuilder criteriaBuilder, ProductStatusRequest request) {
        Join<Product, ProductBasic> basicJoin = basicJoin(mainRoot);
        Join<Object, Object> join = basicJoin.join("status");

        return criteriaBuilder.equal(join.get("id"), request.getId());
    }

    private static List<Predicate> joinOnBasicIsServicePredicate(CriteriaBuilder criteriaBuilder, Boolean isService) {
        List<Predicate> predicates = new ArrayList<>();
        Join<Product, ProductBasic> join = basicJoin(mainRoot);
        if (isService) {
            predicates.add(criteriaBuilder.isTrue(join.get("isService").as(Boolean.class)));
        }
        if (!isService) {
            predicates.add(criteriaBuilder.isFalse(join.get("isService").as(Boolean.class)));
        }

        return predicates;
    }

    private static List<Predicate> joinOnBasicIsActivePredicate(CriteriaBuilder criteriaBuilder, Boolean isService) {
        List<Predicate> predicates = new ArrayList<>();
        Join<Product, ProductBasic> join = basicJoin(mainRoot);
        if (isService) {
            predicates.add(criteriaBuilder.isTrue(join.get("isActive").as(Boolean.class)));
        }
        if (!isService) {
            predicates.add(criteriaBuilder.isFalse(join.get("isActive").as(Boolean.class)));
        }

        return predicates;
    }

    private static Predicate joinOnProductTaxes(CriteriaBuilder criteriaBuilder, List<ProductTaxRequest> taxes) {
        Join<Product, ProductPrice> priceJoin = mainRoot.join("basic");
        Join<ProductPrice, ProductTax> taxJoin = priceJoin.join("taxes");

        List<Long> taxIds = taxes.stream().map(ProductTaxRequest::getId).collect(Collectors.toList());
        return taxJoin.get("id").in(taxIds);
    }
}
