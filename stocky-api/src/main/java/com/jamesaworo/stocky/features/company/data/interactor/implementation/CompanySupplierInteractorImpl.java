/*
 * @Author: james.junior
 * @Date: 6/18/23 14:19
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.company.data.interactor.contract.ICompanySupplierInteractor;
import com.jamesaworo.stocky.features.company.data.request.CompanySupplierRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanySupplierSearchRequest;
import com.jamesaworo.stocky.features.company.domain.entity.CompanySupplier;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanySupplierUsecase;
import com.jamesaworo.stocky.features.product.domain.entity.ProductCategory;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductCategoryUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static com.jamesaworo.stocky.core.params.PageParam.toPageSearchResult;
import static com.jamesaworo.stocky.features.company.data.request.specification.CompanySupplierSearchSpecification.companySupplierSpecification;
import static org.springframework.http.ResponseEntity.ok;

@Interactor
@RequiredArgsConstructor
public class CompanySupplierInteractorImpl implements ICompanySupplierInteractor, Mapper<CompanySupplierRequest, CompanySupplier> {
	private final ICompanySupplierUsecase usecase;
	private final IProductCategoryUsecase productCategoryUsecase;
	private final ModelMapper modelMapper;


	@Override
	public ResponseEntity<List<CompanySupplierRequest>> search(String term) {
		Set<CompanySupplier> suppliers = new HashSet<>(this.usecase.findMany(companySupplierSpecification(term)));
		return ok().body(suppliers.stream().map(this::toRequest).collect(Collectors.toList()));
	}

	@Override
	public ResponseEntity<PageSearchResult<List<CompanySupplierRequest>>> search(PageSearchRequest<CompanySupplierSearchRequest> request) {
		Page<CompanySupplier> page = this.usecase.findMany(companySupplierSpecification(request.getSearchRequest()), request.getPage().toPageable());
		Set<CompanySupplier> suppliers = new HashSet<>(page.getContent());
		List<CompanySupplierRequest> requests = suppliers.stream().map(this::toRequest).collect(Collectors.toList());
		return ok().body(toPageSearchResult(requests, page));
	}

	@Override
	public ResponseEntity<CompanySupplierRequest> save(CompanySupplierRequest request) {
		CompanySupplier companySupplier = setSupplierCategories(request);
		CompanySupplier supplier = this.usecase.save(companySupplier);
		return ok().body(toRequest(supplier));
	}

	private CompanySupplier setSupplierCategories(CompanySupplierRequest request) {
		Set<ProductCategory> categories = new HashSet<>();
		request.getCategories().forEach(categoryRequest -> {
			Optional<ProductCategory> optional = this.productCategoryUsecase.findOne(categoryRequest.getId());
			optional.ifPresent(categories::add);
		});
		request.setCategories(null);
		CompanySupplier companySupplier = toModel(request);
		companySupplier.setCategories(categories);
		return companySupplier;
	}


	@Override
	public ResponseEntity<Optional<Boolean>> update(CompanySupplierRequest request) {
		CompanySupplier supplier = setSupplierCategories(request);
		Optional<Boolean> optionalBoolean = this.usecase.update(supplier);
		return ok().body(optionalBoolean);
	}

	@Override
	public ResponseEntity<Optional<Boolean>> toggleActiveStatus(Long id) {
		Optional<Boolean> optional = this.usecase.toggleActiveStatus(id);
		return ok().body(optional);
	}

	@Override
	public CompanySupplierRequest toRequest(CompanySupplier model) {
		return this.modelMapper.map(model, CompanySupplierRequest.class);
	}

	@Override
	public CompanySupplier toModel(CompanySupplierRequest request) {
		return this.modelMapper.map(request, CompanySupplier.class);
	}

}
