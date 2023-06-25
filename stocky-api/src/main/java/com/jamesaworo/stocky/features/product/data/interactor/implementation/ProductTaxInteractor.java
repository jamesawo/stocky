/*
 * @Author: james.junior
 * @Date: 5/22/23 00:37
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductTaxInteractor;
import com.jamesaworo.stocky.features.product.data.request.ProductTaxRequest;
import com.jamesaworo.stocky.features.product.domain.entity.ProductTax;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductTaxUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.jamesaworo.stocky.core.constants.Exception.RECORD_NOT_FOUND;
import static com.jamesaworo.stocky.core.constants.Exception.REQUIRED_ID;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.ResponseEntity.ok;

@Interactor
@RequiredArgsConstructor
public class ProductTaxInteractor implements IProductTaxInteractor, Mapper<ProductTaxRequest, ProductTax> {

	private final IProductTaxUsecase usecase;
	private final ModelMapper mapper;

	@Override
	public ResponseEntity<List<ProductTaxRequest>> findAll() {
		List<ProductTax> modelList = usecase.findAll();
		List<ProductTaxRequest> requestList = modelList.stream().map(this::toRequest).collect(Collectors.toList());
		return ok(requestList);
	}

	@Override
	public ResponseEntity<Optional<ProductTaxRequest>> save(ProductTaxRequest request) {
		Optional<ProductTax> save = this.usecase.save(toModel(request));
		return ok(save.map(this::toRequest));
	}

	@Override
	public ResponseEntity<Optional<Boolean>> remove(Long id) {
		return ok(this.usecase.remove(id));
	}

	@Override
	public ResponseEntity<Optional<ProductTaxRequest>> find(Long id) {
		Optional<ProductTax> optional = this.usecase.findOne(id);
		return ok(optional.map(this::toRequest));
	}

	@Override
	public ResponseEntity<Optional<ProductTaxRequest>> update(ProductTaxRequest request) {
		this.throwIfRequestNotValid(request);
		return this.save(request);
	}

	@Override
	public ResponseEntity<Optional<Boolean>> toggleActiveStatus(Long id) {
		Optional<ProductTax> optional = this.usecase.findOne(id);
		return ok().body(optional.map(value -> this.usecase.toggleStatus(!value.getIsActiveStatus(), value.getId())));
	}

	@Override
	public List<ProductTax> mapRequestListToModelList(List<ProductTaxRequest> requests) {
		List<ProductTax> productTaxes = new ArrayList<>();
		requests.forEach(productTaxRequest -> {
			Optional<ProductTax> optional = this.usecase.findOne(productTaxRequest.getId());
			optional.ifPresent(productTaxes::add);
		});
		return productTaxes;
	}

	@Override
	public ProductTax toModel(ProductTaxRequest request) {
		return this.mapper.map(request, ProductTax.class);
	}

	@Override
	public ProductTaxRequest toRequest(ProductTax model) {
		return this.mapper.map(model, ProductTaxRequest.class);
	}

	private void throwIfRequestNotValid(ProductTaxRequest request) {
		if (ObjectUtils.isEmpty(request.getId())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, REQUIRED_ID);
		}

		if (!this.find(request.getId()).getStatusCode().is2xxSuccessful()) {
			throw new ResponseStatusException(NOT_FOUND, RECORD_NOT_FOUND);
		}
	}
}
