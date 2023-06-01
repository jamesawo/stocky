package com.jamesaworo.stocky.features.product.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductInteractor;
import com.jamesaworo.stocky.features.product.data.request.ProductRequest;
import com.jamesaworo.stocky.features.product.data.request.ProductSearchRequest;
import com.jamesaworo.stocky.features.product.domain.entity.Product;
import com.jamesaworo.stocky.features.product.domain.entity.ProductBasic;
import com.jamesaworo.stocky.features.product.domain.entity.ProductPrice;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductBasicUsecase;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductPriceUsecase;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

import static com.jamesaworo.stocky.core.params.PageParam.toPageSearchResult;
import static com.jamesaworo.stocky.features.product.data.request.specification.ProductSearchSpecification.productSpecificationBySearchRequest;
import static org.springframework.http.ResponseEntity.ok;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@Interactor
@RequiredArgsConstructor
public class ProductInteractor implements IProductInteractor, Mapper<ProductRequest, Product> {

	private final ModelMapper mapper;
	private final IProductUsecase usecase;
	private final IProductBasicUsecase basicUsecase;
	private final IProductPriceUsecase priceUsecase;

	public ResponseEntity<ProductRequest> save(ProductRequest request) {
		Product model = toModel(request);
		Product product = updatePriceAndBasic(model, model.getPrice(), model.getBasic());
		return ok(this.toRequest(this.usecase.save(product)));
	}

	@Override
	public ResponseEntity<List<ProductSearchRequest>> search(ProductSearchRequest request) {
		return null;
	}

	@Override
	public ResponseEntity<PageSearchResult<List<ProductRequest>>> search(PageSearchRequest<ProductSearchRequest> request) {
		Page<Product> page = this.usecase.findMany(productSpecificationBySearchRequest(request.getSearchRequest()), request.getPage().toPageable());
		List<ProductRequest> requests = page.getContent().stream().map(this::toRequest).collect(Collectors.toList());
		return ok().body(toPageSearchResult(requests, page));

	}

	private Product updatePriceAndBasic(Product model, ProductPrice price, ProductBasic basic) {
		model.setBasic(this.basicUsecase.save(basic));
		model.setPrice(this.priceUsecase.save(price));
		return model;
	}

	public ProductRequest toRequest(Product model) {
		return this.mapper.map(model, ProductRequest.class);
	}

	public Product toModel(ProductRequest request) {
		return this.mapper.map(request, Product.class);
	}


}