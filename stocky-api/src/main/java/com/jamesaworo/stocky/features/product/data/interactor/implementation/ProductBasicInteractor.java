/*
 * @Author: james.junior
 * @Date: 6/1/23 19:47
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductBasicInteractor;
import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductTaxInteractor;
import com.jamesaworo.stocky.features.product.data.request.ProductBasicRequest;
import com.jamesaworo.stocky.features.product.domain.entity.ProductBasic;
import com.jamesaworo.stocky.features.product.domain.entity.ProductTax;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductBasicUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;

import java.util.List;

@Interactor
@RequiredArgsConstructor
public class ProductBasicInteractor implements IProductBasicInteractor, Mapper<ProductBasicRequest, ProductBasic> {
    private final IProductBasicUsecase basicUsecase;
    private final IProductTaxInteractor taxInteractor;
    private final ModelMapper mapper;


    @Override
    public ProductBasic save(ProductBasicRequest request) {
        List<ProductTax> taxes = getTaxModels(request);
        ProductBasic model = this.toModel(request);
        model.setTaxes(taxes);
        return this.basicUsecase.save(model);
    }

    @Override
    public ProductBasic update(ProductBasic basic) {
        return this.basicUsecase.save(basic);
    }

    public ProductBasic update(ProductBasicRequest request) {
        ProductBasic model = this.toModel(request);
        return this.update(model);
    }

    private List<ProductTax> getTaxModels(ProductBasicRequest request) {
        List<ProductTax> taxList = taxInteractor.mapRequestListToModelList(request.getTaxes());
        request.setTaxes(null);
        return taxList;
    }

    @Override
    public ProductBasicRequest toRequest(ProductBasic model) {
        return this.mapper.map(model, ProductBasicRequest.class);
    }

    @Override
    public ProductBasic toModel(ProductBasicRequest request) {
        return this.mapper.map(request, ProductBasic.class);
    }
}
