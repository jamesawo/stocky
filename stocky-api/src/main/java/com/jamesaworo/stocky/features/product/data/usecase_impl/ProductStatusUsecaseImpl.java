/*
 * @Author: james.junior
 * @Date: 5/21/23 21:25
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.product.data.repository.ProductStatusRepository;
import com.jamesaworo.stocky.features.product.domain.entity.ProductStatus;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductStatusUsecase;
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
public class ProductStatusUsecaseImpl implements IProductStatusUsecase {
    private static final String DUPLICATE_RECORD = "DUPLICATE RECORD, SIMILAR RECORD EXIST";
    private final ProductStatusRepository repository;


    public List<ProductStatus> findAll() {
        return this.repository.findAll();
    }


    public Optional<ProductStatus> save(ProductStatus model) {
        this.throwIfDuplicateExist(model);
        return of(this.repository.save(model));
    }


    public Optional<Boolean> remove(Long id) {
        Optional<ProductStatus> optional = this.findOne(id);
        return this.removeIfPresentAndHasNoProduct(optional);
    }


    public Optional<ProductStatus> findOne(Long id) {
        return this.repository.findById(id);
    }

    @Override
    public Optional<ProductStatus> findOne(String name) {
        return this.repository.findByTitleEqualsIgnoreCase(name);
    }

    private void throwIfDuplicateExist(ProductStatus model) {
        Optional<ProductStatus> optional = this.repository.findByTitleEqualsIgnoreCase(
                model.getTitle()
        );

        optional.ifPresent(e -> {
            throw new ResponseStatusException(CONFLICT, DUPLICATE_RECORD);
        });
    }

    private Optional<Boolean> removeIfPresentAndHasNoProduct(Optional<ProductStatus> optional) {
        return optional.map(this::removeIfNoProducts).orElse(of(Boolean.FALSE));
    }

    private Optional<Boolean> removeIfNoProducts(ProductStatus model) {
        // todo:: implement soft delete
		/*
		if (model.getProducts().size() > 0) {
			return of(Boolean.FALSE);
		}
		 */
        return this.delete(model);
    }

    private Optional<Boolean> delete(ProductStatus model) {
        try {
            this.repository.delete(model);
            return Optional.of(Boolean.TRUE);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return Optional.of(Boolean.FALSE);
        }
    }
}
