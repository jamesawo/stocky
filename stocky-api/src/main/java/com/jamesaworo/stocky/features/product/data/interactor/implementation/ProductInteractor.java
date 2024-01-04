package com.jamesaworo.stocky.features.product.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.constants.enums.Template;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductBasicInteractor;
import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductInteractor;
import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductPriceInteractor;
import com.jamesaworo.stocky.features.product.data.request.*;
import com.jamesaworo.stocky.features.product.domain.entity.*;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductUsecase;
import com.jamesaworo.stocky.features.stock.data.request.StockPriceRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.ReportConstant.UNEXPECTED_FILE_TYPE;
import static com.jamesaworo.stocky.core.constants.enums.FileType.EXCEL;
import static com.jamesaworo.stocky.core.params.PageParam.toPageSearchResult;
import static com.jamesaworo.stocky.core.utils.FileUtil.isFileType;
import static com.jamesaworo.stocky.core.utils.FileUtil.writeProductScrapContentToFile;
import static com.jamesaworo.stocky.features.product.data.request.specification.ProductSearchSpecification.productSpecification;
import static com.jamesaworo.stocky.features.product.data.request.specification.ProductSearchSpecification.salesProductSpecification;
import static java.lang.String.format;
import static java.util.stream.Collectors.toList;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.ObjectUtils.isEmpty;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@Interactor
@RequiredArgsConstructor
public class ProductInteractor implements IProductInteractor, Mapper<ProductRequest, Product> {

    private final ModelMapper mapper;
    private final IProductUsecase productUsecase;
    private final IProductBasicInteractor basicInteractor;
    private final IProductPriceInteractor priceInteractor;

    @Override
    public ResponseEntity<ProductRequest> save(ProductRequest request) {
        if (isEmpty(request.getId())) {
            return this.create(request);
        } else {
            return this.update(request);
        }
    }

    @Transactional
    public ResponseEntity<ProductRequest> create(ProductRequest request) {
        ProductBasic basic = this.basicInteractor.save(request.getBasic());
        ProductPrice price = this.priceInteractor.save(request.getPrice());
        this.createNewProduct(basic, price, request);
        return ok().body(request);
    }

    private ResponseEntity<ProductRequest> update(ProductRequest request) {
        Optional<Product> optionalProduct = this.productUsecase.findById(request.getId());
        optionalProduct.map(product -> {
            this.updateBasicDetails(product.getBasic(), request.getBasic());
            this.updatePriceDetails(product.getPrice(), request.getPrice());
            request.setCreatedAt(product.getCreatedAt().toLocalDate().toString());
            return product;
        });

        return ok().body(request);
    }

    private void updateBasicDetails(ProductBasic model, ProductBasicRequest request) {
        model.setProductName(request.getProductName());
        model.setSku(request.getSku());
        model.setBarcode(request.getBarcode());
        model.setBrandName(request.getBrandName());
        model.setDescription(request.getDescription());
        model.setIsActive(request.getIsActive());
        model.setUseQuantity(request.getUseQuantity());
        model.setIsService(request.getIsService());
        model.setMinAgeLimit(request.getMinAgeLimit());
        model.setLowStockPoint(request.getLowStockPoint());
        model.setQuantity(model.getQuantity());
        model.setProductCategory(new ProductCategory(request.getProductCategory().getId()));
        model.setUnitOfMeasure(request.getUnitOfMeasure().toModel());
        model.setStatus(request.getStatus().toModel());
        model.setTaxes(request.getTaxes().stream().map(ProductTaxRequest::toModel).collect(toList()));
        request.setQuantity(model.getQuantity());
        this.basicInteractor.update(model);
    }

    private void updatePriceDetails(ProductPrice model, ProductPriceRequest request) {
        model.setMarkup(request.getMarkup());
        model.setCostPrice(request.getCostPrice());
        model.setSellingPrice(request.getSellingPrice());
        this.priceInteractor.update(model);
    }

    private void createNewProduct(ProductBasic basic, ProductPrice price, ProductRequest request) {
        try {
            Product product = Product.builder().basic(basic).price(price).build();
            Product savedProduct = this.productUsecase.save(product);

            request.setId(savedProduct.getId());
            request.setCreatedAt(savedProduct.getCreatedAt().toString());
            request.setIsActiveStatus(savedProduct.getIsActiveStatus());

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    @Override
    public ResponseEntity<PageSearchResult<List<ProductRequest>>> search(PageSearchRequest<ProductSearchRequest> request) {
        Page<Product> page = this.productUsecase.findMany(productSpecification(request.getSearchRequest()), request.getPage().toPageable());
        List<ProductRequest> requests = page.getContent().stream().map(this::toRequest).collect(toList());
        return ok().body(toPageSearchResult(requests, page));
    }

    @Override
    public ResponseEntity<List<ProductRequest>> search(String term) {
        if (term.isEmpty()) {
            return ok().body(new ArrayList<>());
        }
        List<Product> list = this.productUsecase.findMany(productSpecification(term));
        List<ProductRequest> requests = list.stream().map(this::toRequest).collect(toList());
        return ok().body(requests);
    }

    @Override
    public ResponseEntity<Optional<ProductRequest>> setPrice(Long productId, StockPriceRequest stockPriceRequest) {
        Optional<Product> optionalProduct = this.productUsecase.findById(productId);

        Optional<ProductRequest> optionalProductRequest = optionalProduct.map(product -> {
            ProductPrice price = product.getPrice();

            price.setSellingPrice(stockPriceRequest.getSellingPrice());
            price.setCostPrice(stockPriceRequest.getCostPrice());
            price.setMarkup(stockPriceRequest.getMarkupPercent());

            ProductPrice updatedPrice = this.priceInteractor.update(price);
            product.setPrice(updatedPrice);
            return toRequest(product);
        });
        return ok().body(optionalProductRequest);
    }

    @Override
    public ResponseEntity<Optional<ProductRequest>> setQuantity(Long productId, Integer quantity) {
        Optional<Product> optionalProduct = this.productUsecase.findById(productId);
        Optional<ProductRequest> optionalProductRequest = optionalProduct.map(product -> {
            ProductBasic basic = product.getBasic();
            basic.setQuantity(quantity);
            ProductBasic updatedBasic = this.basicInteractor.update(basic);
            product.setBasic(updatedBasic);
            return toRequest(product);
        });
        return ok().body(optionalProductRequest);
    }

    @Override
    public ResponseEntity<PageSearchResult<List<ProductRequest>>> searchSalesProduct(PageSearchRequest<ProductSearchRequest> request) {
        Page<Product> page = this.productUsecase.findMany(salesProductSpecification(request.getSearchRequest()), request.getPage().toPageable());
        List<ProductRequest> requests = page.getContent().stream().map(this::toRequest).collect(toList());
        return ok().body(toPageSearchResult(requests, page));
    }

    private ProductRequest mapToProductRequest(Product product) {
        ProductRequest request = this.toRequest(product);
        ProductUnitOfMeasureRequest unitOfMeasureRequest = new ProductUnitOfMeasureRequest();
        ProductUnitOfMeasure unitOfMeasure = product.getBasic().getUnitOfMeasure();
        unitOfMeasureRequest.setId(unitOfMeasure.getId());
        unitOfMeasureRequest.setTitle(unitOfMeasure.getTitle());
        unitOfMeasureRequest.setUnit(unitOfMeasure.getUnit());
        request.getBasic().setUnitOfMeasure(unitOfMeasureRequest);
        return request;
    }

    @Override
    public ResponseEntity<Boolean> setDiscount(ProductDiscountRequest request) {
        Optional<Product> optionalProduct = this.productUsecase.findById(request.getProductId());

        Boolean res = optionalProduct.map(
                product -> this.priceInteractor.applyDiscount(
                        product.getPrice(), request)).orElse(Boolean.FALSE);

        return ok().body(res);
    }

    @Override
    public ResponseEntity<?> uploadTemplate(MultipartFile file) {
        if (!isFileType(file, EXCEL)) {
            throw new ResponseStatusException(BAD_REQUEST, format(UNEXPECTED_FILE_TYPE, EXCEL.extension()));
        }

        Map<String, String> map = this.productUsecase.uploadTemplate(file);

        byte[] content = writeProductScrapContentToFile(map);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=scrap_file.txt");
        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(content.length)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(content);

    }


    @Override
    public ResponseEntity<Resource> downloadTemplate() throws IOException {
        Resource resource = this.productUsecase.downloadTemplate(Template.PRODUCT_UPLOAD);
        Path path = resource.getFile().toPath();
        return ok().header(HttpHeaders.CONTENT_TYPE, Files.probeContentType(path))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    public ProductRequest toRequest(Product model) {
        return this.mapper.map(model, ProductRequest.class);
    }

    public Product toModel(ProductRequest request) {
        return this.mapper.map(request, Product.class);
    }
}
