/*
 * @Author: james.junior
 * @Date: 7/25/23 09:50
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.sale.data.export.SalesReportExporter;
import com.jamesaworo.stocky.features.sale.data.interactor.contract.ISaleTransactionInteractor;
import com.jamesaworo.stocky.features.sale.data.request.SaleTransactionRequest;
import com.jamesaworo.stocky.features.sale.data.request.specification.SaleTransactionSearchRequest;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import com.jamesaworo.stocky.features.sale.domain.usecase.SaleTransactionUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.core.params.PageParam.toPageSearchResult;
import static com.jamesaworo.stocky.features.sale.data.request.specification.SaleTransactionSearchSpecification.salesSaleTransactionSpecification;
import static java.util.stream.Collectors.toList;
import static org.springframework.http.ResponseEntity.ok;

@Interactor
@RequiredArgsConstructor
public class SaleTransactionInteractorImpl implements ISaleTransactionInteractor, Mapper<SaleTransactionRequest, SaleTransaction> {
    private final SaleTransactionUsecase usecase;
    private final ModelMapper mapper;
    private final SalesReportExporter exporter;


    @Override
    public ResponseEntity<SaleTransactionRequest> save(SaleTransactionRequest request) {
        SaleTransaction model = SaleTransactionRequest.toModel(request);
        SaleTransaction savedTransaction = this.usecase.save(model);
        request.setId(savedTransaction.getId());
        return ok().body(request);
    }


    @Override
    public ResponseEntity<PageSearchResult<List<SaleTransactionRequest>>> findMany(PageSearchRequest<SaleTransactionSearchRequest> request) {
        Page<SaleTransaction> page = this.usecase.findMany(salesSaleTransactionSpecification(request.getSearchRequest()), request.getPage().toPageable());
        List<SaleTransactionRequest> requests = page.getContent().stream().map(this::toRequest).collect(toList());
        return ok().body(toPageSearchResult(requests, page));
    }

    @Override
    public ResponseEntity<List<SaleTransactionRequest>> findMany(SaleTransactionSearchRequest request) {
        List<SaleTransaction> sales = this.usecase.findMany(salesSaleTransactionSpecification(request));
        List<SaleTransactionRequest> salesRequestList = sales.stream().map(this::toRequest).collect(toList());
        return ok().body(salesRequestList);
    }

    @Override
    public ResponseEntity<Optional<SaleTransactionRequest>> findOne(Long id) {
        Optional<SaleTransaction> optional = this.usecase.findOne(id);
        return ok().body(optional.map(this::toRequest));
    }

    @Override
    public ResponseEntity<Optional<byte[]>> getReceiptPdfBytes(String reference, String token) {
        Optional<SaleTransaction> optional = this.usecase.findOne(reference, token);
        return ok().body(optional.map(exporter::export));
    }


    @Override
    public SaleTransactionRequest toRequest(SaleTransaction model) {
        return mapper.map(model, SaleTransactionRequest.class);
    }

    @Override
    public SaleTransaction toModel(SaleTransactionRequest request) {
        return SaleTransactionRequest.toModel(request);
    }
}
