package com.jamesaworo.stocky.features.product.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.core.constants.enums.Template;
import com.jamesaworo.stocky.core.utils.FileUtil;
import com.jamesaworo.stocky.features.product.data.repository.ProductCategoryRepository;
import com.jamesaworo.stocky.features.product.domain.entity.ProductCategory;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductCategoryUsecase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.*;

import static java.util.Optional.of;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.util.ObjectUtils.isEmpty;

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

    @Override
    public Optional<ProductCategory> findOne(String name) {
        return this.repository.findByTitle(name);
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
    public Map<String, String> uploadTemplate(MultipartFile input) {
        Map<String, String> result = new HashMap<>();

        try {
            XSSFWorkbook workbook = new XSSFWorkbook(input.getInputStream());
            Sheet sheet = workbook.getSheetAt(1);
            List<ProductCategory> categoryList = new ArrayList<>();
            Iterator<Row> iterator = sheet.rowIterator();
            for (int index = 0; index < sheet.getPhysicalNumberOfRows(); index++) {
                if (index > 0) {
                    XSSFRow row = (XSSFRow) sheet.getRow(index);
                    if (FileUtil.isEmptyRow(row)) continue;

                    String title = row.getCell(0).getStringCellValue().trim();
                    String description = "";
                    String parent = "";
                    if (row.getCell(1) != null && row.getCell(1).getStringCellValue() != null) {
                        description = row.getCell(1).getStringCellValue();
                    }
                    if (row.getCell(2) != null && row.getCell(2).getStringCellValue() != null) {
                        parent = row.getCell(2).getStringCellValue();
                    }

                    if (this.findOne(title).isEmpty()) {
                        ProductCategory category = new ProductCategory();
                        category.setTitle(title);
                        category.setDescription(description);
                        if (!isEmpty(parent)) this.findOne(parent).ifPresent(category::setParent);
                        categoryList.add(this.repository.save(category));
                    }

                }
            }
            workbook.close();
            result.put("Total Upload ", String.valueOf(categoryList.size()));
            return result;
        } catch (IOException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    private void throwIfDuplicateEntry(ProductCategory category) {
        if (isEmpty(category.getId())) {
            Optional<ProductCategory> optional = this.isDuplicateCategoryName(category.getTitle());
            if (optional.isPresent()) {
                throw new ResponseStatusException(CONFLICT, DUPLICATE);
            }
        }
    }

    private Optional<ProductCategory> isDuplicateCategoryName(String title) {
        return this.repository.findByTitle(title);
    }

    private Optional<Boolean> removeProductCategoryIfPresentAndHasNoProduct(
            Optional<ProductCategory> optionalProductCategory
    ) {
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
