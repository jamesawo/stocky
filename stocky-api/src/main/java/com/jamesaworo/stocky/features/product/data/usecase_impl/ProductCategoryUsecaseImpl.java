package com.jamesaworo.stocky.features.product.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.product.data.repository.ProductCategoryRepository;
import com.jamesaworo.stocky.features.product.domain.entity.ProductCategory;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductCategoryUsecase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.ObjectUtils;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CONFLICT;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@Usecase
@RequiredArgsConstructor
@Slf4j
public class ProductCategoryUsecaseImpl implements IProductCategoryUsecase {
    public static final String DUPLICATE = "CATEGORY WITH SAME TITLE ALREADY EXIST";
    private final ProductCategoryRepository repository;

    @Override
    public Optional<ProductCategory> findOne(Long id) {
        return this.repository.findById(id);
    }

    @Override
    public List<ProductCategory> findAll() {
        return this.repository.findAll();
    }

    @Override
    public Optional<ProductCategory> save(ProductCategory category) {
        this.throwIfDuplicateEntry(category);
        return Optional.of(this.repository.save(category));
    }

    @Override
    public Optional<Boolean> remove(Long id) {
        Optional<ProductCategory> optionalProductCategory = this.findOne(id);
        return this.removeProductCategoryIfPresentAndHasNoProduct(optionalProductCategory);
    }

    private void throwIfDuplicateEntry(ProductCategory category) {
        if (ObjectUtils.isEmpty(category.getId())) {
            Optional<ProductCategory> optional = this.isDuplicateCategoryName(category.getTitle());
            if (optional.isPresent()) {
                throw new ResponseStatusException(CONFLICT, DUPLICATE);
            }
        }
    }

    private Optional<ProductCategory> isDuplicateCategoryName(String title) {
        return this.repository.findByTitle(title);
    }

    private Optional<Boolean> removeProductCategoryIfPresentAndHasNoProduct(Optional<ProductCategory> optionalProductCategory) {
        if (optionalProductCategory.isPresent()) {
            int size = optionalProductCategory.get().getProducts().size();
            if (size > 0) return Optional.of(Boolean.FALSE);
            return Optional.of(this.delete(optionalProductCategory.get()));
        }
        return Optional.of(Boolean.FALSE);
    }

    private boolean delete(ProductCategory category) {
        try {
            this.repository.delete(category);
            return Boolean.TRUE;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return Boolean.FALSE;
        }
    }

}