package com.jamesaworo.stocky.features.product.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductCategoryInteractor;
import com.jamesaworo.stocky.features.product.data.pojo.ProductCategoryRequest;
import com.jamesaworo.stocky.features.product.domain.entity.ProductCategory;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductCategoryUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.jamesaworo.stocky.core.constants.Exception.RECORD_NOT_FOUND;
import static com.jamesaworo.stocky.core.constants.Exception.REQUIRED_ID;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.ResponseEntity.notFound;
import static org.springframework.http.ResponseEntity.ok;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@Interactor
@RequiredArgsConstructor
public class ProductCategoryInteractor implements IProductCategoryInteractor, Mapper<ProductCategoryRequest, ProductCategory> {

    public static final String REQUIRE_CATEGORY_ID = "Product category ID is required";
    private final IProductCategoryUsecase usecase;
    private final ModelMapper mapper;

    public ResponseEntity<ProductCategoryRequest> find(Long id) {
        Optional<ProductCategory> optional = this.usecase.findOne(id);
        return optional.map(category -> ok(toRequest(category))).orElse(notFound().build());
    }


    public ResponseEntity<List<ProductCategoryRequest>> findMany() {
        List<ProductCategory> all = this.usecase.findAll();
        List<ProductCategoryRequest> collect = all.stream().map(this::toRequest).collect(Collectors.toList());
        return ok().body(collect);
    }


    public ResponseEntity<Optional<ProductCategoryRequest>> save(ProductCategoryRequest request) {
        Optional<ProductCategory> category = this.usecase.save(toModel(request));
        return ok().body(category.map(this::toRequest));
    }

    public ResponseEntity<Optional<ProductCategoryRequest>> update(ProductCategoryRequest request) {
        this.throwIfRequestNotValid(request);
        return this.save(request);
    }

    private void throwIfRequestNotValid(ProductCategoryRequest request) {
        if (ObjectUtils.isEmpty(request.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, REQUIRED_ID);
        }

        if (!this.find(request.getId()).getStatusCode().is2xxSuccessful()) {
            throw new ResponseStatusException(NOT_FOUND, RECORD_NOT_FOUND);
        }
    }


    public ProductCategoryRequest toRequest(ProductCategory model) {
        return mapper.map(model, ProductCategoryRequest.class);
    }


    public ProductCategory toModel(ProductCategoryRequest request) {
        return mapper.map(request, ProductCategory.class);
    }
}