package com.jamesaworo.stocky.features.product.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.core.constants.enums.Template;
import com.jamesaworo.stocky.core.utils.FileUtil;
import com.jamesaworo.stocky.features.product.data.repository.ProductCategoryRepository;
import com.jamesaworo.stocky.features.product.domain.entity.ProductCategory;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductCategoryUsecase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static java.util.Optional.of;
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


    public Optional<ProductCategory> findOne(Long id) {
        return this.repository.findById(id);
    }


    public List<ProductCategory> findAll() {
        return this.repository.findAll();
    }


    public Optional<ProductCategory> save(ProductCategory category) {
        this.throwIfDuplicateEntry(category);
        return of(this.repository.save(category));
    }


    public Optional<Boolean> remove(Long id) {
        Optional<ProductCategory> optionalProductCategory = this.findOne(id);
        return this.removeProductCategoryIfPresentAndHasNoProduct(optionalProductCategory);
    }

    public List<ProductCategory> search(String term) {
        return this.repository.findAllByTitleContainsIgnoreCase(term);
    }

    @Override
    public Boolean toggleStatus(boolean status, Long id) {
        int count = this.repository.updateIsActiveStatus(status, id);
        return count == 1;
    }

    @Override
    public Resource downloadTemplate(Template template) {
        return FileUtil.findResource(template);
    }

    @Override
    public ResponseEntity<Map<String, Object>> uploadTemplate(MultipartFile input) {
        return null;
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
        return optionalProductCategory.map(this::deleteIfHasNoProducts);
    }

    private boolean deleteIfHasNoProducts(ProductCategory category) {
        if (category.getProducts().size() > 0) {
            return Boolean.FALSE;
        }

        this.repository.delete(category);
        return Boolean.TRUE;
    }

}