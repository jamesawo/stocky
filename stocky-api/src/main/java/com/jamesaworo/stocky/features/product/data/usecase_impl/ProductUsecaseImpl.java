package com.jamesaworo.stocky.features.product.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.core.constants.Setting;
import com.jamesaworo.stocky.core.constants.enums.Template;
import com.jamesaworo.stocky.core.utils.FileUtil;
import com.jamesaworo.stocky.features.product.data.repository.ProductRepository;
import com.jamesaworo.stocky.features.product.domain.entity.Product;
import com.jamesaworo.stocky.features.product.domain.entity.ProductBasic;
import com.jamesaworo.stocky.features.product.domain.entity.ProductPrice;
import com.jamesaworo.stocky.features.product.domain.enums.ProductQuantityUpdateType;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductBasicUsecase;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductPriceUsecase;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductUsecase;
import com.jamesaworo.stocky.features.settings.domain.entity.SettingStock;
import com.jamesaworo.stocky.features.settings.domain.usecase.ISettingUsecase;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.jamesaworo.stocky.features.product.domain.enums.ProductQuantityUpdateType.DECREMENT;
import static com.jamesaworo.stocky.features.product.domain.enums.ProductQuantityUpdateType.INCREMENT;
import static org.springframework.util.ObjectUtils.isEmpty;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@Usecase
@RequiredArgsConstructor
public class ProductUsecaseImpl implements IProductUsecase {

    private final ProductRepository repository;
    private final IProductBasicUsecase basicUsecase;
    private final IProductPriceUsecase priceUsecase;

    private final ISettingUsecase<SettingStock> settingUsecase;


    @Override
    public Optional<Product> findById(Long id) {
        return this.repository.findById(id);
    }

    @Override
    public Product save(Product product) {
        return this.repository.save(product);
    }

    @Override
    public Page<Product> findMany(Specification<Product> specification, Pageable pageable) {
        return this.repository.findAll(specification, pageable);
    }

    @Override
    public List<Product> findMany(Specification<Product> specification) {
        return this.repository.findAll(specification);
    }

    @Override
    public void updateProductQuantity(Product product, Integer quantity) {
        updateQuantity(product, quantity, INCREMENT);
    }

    @Override
    public void tryUpdateProductPrice(Product product, ProductPrice productPrice) {
        Optional<Product> optionalProduct = this.findById(product.getId());
        optionalProduct.map(existingProduct -> {
            ProductPrice existingProductPrice = existingProduct.getPrice();
            existingProductPrice.setCostPrice(productPrice.getCostPrice());
            existingProductPrice.setSellingPrice(productPrice.getSellingPrice());
            existingProductPrice.setMarkup(productPrice.getMarkup());

            ProductPrice saved = this.priceUsecase.save(existingProductPrice);
            return !isEmpty(saved);
        });
    }

    @Override
    public void deductProductQuantityAfterSales(Product product, Integer deductBy) {
        Optional<Product> optionalProduct = this.findById(product.getId());
        optionalProduct.ifPresent(exitingProduct -> {
            if (exitingProduct.getBasic().getQuantity() >= deductBy) {
                updateQuantity(exitingProduct, deductBy, DECREMENT);
            }
        });
    }

    private void updateQuantity(Product product, Integer quantity, ProductQuantityUpdateType productQuantityUpdateType) {
        Optional<SettingStock> optionalSetting = this.settingUsecase.get(Setting.SETTING_STOCK_ENABLE_STOCK);
        optionalSetting.ifPresent(setting -> {
            Optional<Product> optionalProduct = this.findById(product.getId());
            optionalProduct.ifPresent(existingProduct -> {
                ProductBasic basic = existingProduct.getBasic();
                this.basicUsecase.updateProductQuantity(basic.getId(), quantity, productQuantityUpdateType);
            });
        });
    }

    @Override
    public Resource downloadTemplate(Template template) {
        return FileUtil.findResource(template);
    }

    @Override
    public ResponseEntity<Map<String, Object>> uploadTemplate(MultipartFile input) {
        return null;
    }
}