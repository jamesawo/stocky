/*
 * @Author: james.junior
 * @Date: 5/21/23 21:25
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.product.data.repository.ProductUnitOfMeasureRepository;
import com.jamesaworo.stocky.features.product.domain.entity.ProductUnitOfMeasure;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductUnitOfMeasureUsecase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static java.util.Optional.of;
import static org.springframework.http.HttpStatus.CONFLICT;

@Usecase
@RequiredArgsConstructor
@Slf4j
public class ProductUnitOfMeasureUsecaseImpl implements IProductUnitOfMeasureUsecase {
    private static final String DUPLICATE_RECORD = "DUPLICATE RECORD, SIMILAR TYPE AND UNIT EXIST";
    private final ProductUnitOfMeasureRepository repository;


    public List<ProductUnitOfMeasure> findAll() {
        return this.repository.findAll();
    }

    public Optional<ProductUnitOfMeasure> save(ProductUnitOfMeasure unitOfMeasure) {
        this.throwIfDuplicateExist(unitOfMeasure);
        return of(this.repository.save(unitOfMeasure));
    }

    public Optional<Boolean> remove(Long id) {
        Optional<ProductUnitOfMeasure> optional = this.findOne(id);
        return this.removeIfPresentAndHasNoProduct(optional);
    }

    public Optional<ProductUnitOfMeasure> findOne(Long id) {
        return this.repository.findById(id);
    }

    @Override
    public Optional<ProductUnitOfMeasure> findOne(String name) {
        return this.repository.findByTitleEqualsIgnoreCase(name);
    }

    private void throwIfDuplicateExist(ProductUnitOfMeasure unitOfMeasure) {
        Optional<ProductUnitOfMeasure> optional = this.repository.findByTitleEqualsIgnoreCaseAndUnitEqualsIgnoreCase(
                unitOfMeasure.getTitle(),
                unitOfMeasure.getUnit()
        );

        optional.ifPresent(e -> {
            throw new ResponseStatusException(CONFLICT, DUPLICATE_RECORD);
        });
    }

    private Optional<Boolean> removeIfPresentAndHasNoProduct(Optional<ProductUnitOfMeasure> optional) {
        return optional.map(this::removeIfNoProducts).orElse(of(Boolean.FALSE));
    }

    private Optional<Boolean> removeIfNoProducts(ProductUnitOfMeasure unitOfMeasure) {
        if (unitOfMeasure.getProducts().size() > 0) {
            return of(Boolean.FALSE);
        }
        return this.delete(unitOfMeasure);
    }

    private Optional<Boolean> delete(ProductUnitOfMeasure unit) {
        try {
            this.repository.delete(unit);
            return Optional.of(Boolean.TRUE);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return Optional.of(Boolean.FALSE);
        }
    }
}
