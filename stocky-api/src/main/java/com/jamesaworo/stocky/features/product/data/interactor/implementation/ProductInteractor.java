package com.jamesaworo.stocky.features.product.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductBasicInteractor;
import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductInteractor;
import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductPriceInteractor;
import com.jamesaworo.stocky.features.product.data.request.ProductRequest;
import com.jamesaworo.stocky.features.product.data.request.ProductSearchRequest;
import com.jamesaworo.stocky.features.product.domain.entity.Product;
import com.jamesaworo.stocky.features.product.domain.entity.ProductBasic;
import com.jamesaworo.stocky.features.product.domain.entity.ProductPrice;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

import static com.jamesaworo.stocky.core.params.PageParam.toPageSearchResult;
import static com.jamesaworo.stocky.features.product.data.request.specification.ProductSearchSpecification.productSpecification;
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
	private final IProductBasicInteractor basicInteractor;
	private final IProductPriceInteractor priceInteractor;

	@Transactional
	public ResponseEntity<ProductRequest> save(ProductRequest request) {
		ProductBasic basic = this.basicInteractor.save(request.getBasic());
		ProductPrice price = this.priceInteractor.save(request.getPrice());
		Product newProduct = this.createNewProduct(basic, price);
		request.setId(newProduct.getId());
		return ok().body(request);
	}

	private Product createNewProduct(ProductBasic basic, ProductPrice price) {
		try {
			Product product = Product.builder().basic(basic).price(price).build();
			return this.usecase.save(product);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
	}

	@Override
	public ResponseEntity<PageSearchResult<List<ProductRequest>>> search(PageSearchRequest<ProductSearchRequest> request) {
		Page<Product> page = this.usecase.findMany(productSpecification(request.getSearchRequest()), request.getPage().toPageable());
		List<ProductRequest> requests = page.getContent().stream().map(this::toRequest).collect(Collectors.toList());
		return ok().body(toPageSearchResult(requests, page));
	}

	public ProductRequest toRequest(Product model) {
		return this.mapper.map(model, ProductRequest.class);
	}

	public Product toModel(ProductRequest request) {
		return this.mapper.map(request, Product.class);
	}


}