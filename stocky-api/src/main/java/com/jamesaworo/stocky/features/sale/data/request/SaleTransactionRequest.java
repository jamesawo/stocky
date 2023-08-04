/*
 * @Author: james.junior
 * @Date: 7/24/23 21:21
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.core.request.CommonRequest;
import com.jamesaworo.stocky.core.utils.Util;
import com.jamesaworo.stocky.features.company.data.request.CompanyCustomerRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanyEmployeeRequest;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyCustomer;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyPaymentOption;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalTime;
import java.util.List;

import static com.jamesaworo.stocky.core.constants.Global.SALES_TRANSACTION_ENDPOINT;
import static com.jamesaworo.stocky.core.utils.Util.parseToLocalDate;
import static java.lang.String.format;
import static org.springframework.util.ObjectUtils.isEmpty;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SaleTransactionRequest {
    private Long id;
    private String reference;
    private String serial;
    private String time;
    private String date;
    private CompanyCustomerRequest customer;
    private CompanyEmployeeRequest employee;
    private SaleTransactionAmountRequest amount;
    private SaleTransactionInstallmentRequest installment;
    private List<SaleTransactionItemRequest> items;
    private String other;
    private String receiptUrl;
    private CommonRequest paymentOption;


    public static SaleTransaction toModel(SaleTransactionRequest request) {
        SaleTransaction transaction = new SaleTransaction();
        transaction.setId(request.getId());
        transaction.setDate(!isEmpty(request.getDate()) ? parseToLocalDate(request.getDate()) : null);
        transaction.setTime(!isEmpty(request.getTime()) ? LocalTime.parse(request.getTime()) : null);
        transaction.setReference(request.getReference());
        transaction.setSerial(request.getSerial());

        /*todo:: set user making this transaction*/

        if (!isEmpty(request.getCustomer())) {
            transaction.setCustomer(new CompanyCustomer(request.getCustomer().getId()));
        } else {
            transaction.setCustomer(null);
        }

        if (!isEmpty(request.getPaymentOption()) && !isEmpty(request.getPaymentOption().getId())) {
            transaction.setPaymentOption(new CompanyPaymentOption(request.getPaymentOption().getId()));
        }

        transaction.setAmount(SaleTransactionAmountRequest.toModel(request.getAmount()));
        transaction.setInstallment(SaleTransactionInstallmentRequest.toModel(request.getInstallment()));
        transaction.setOther(request.getOther());

        return transaction;
    }

    public static SaleTransactionRequest toRequest(SaleTransaction transaction) {
        ModelMapper mapper = new ModelMapper();
        SaleTransactionRequest request = mapper.map(transaction, SaleTransactionRequest.class);
        request.setTime(Util.formatTime(transaction.getTime()));
        request.setDate(Util.formatDate(transaction.getDate()));
        request.setReceiptUrl(receiptUrl(transaction.getSerial()));
        return request;
    }

    public static String receiptUrl(String serial) {
        String serverUri = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
        String base = serverUri + SALES_TRANSACTION_ENDPOINT;
        return format("%s/search-receipt?serial=%s", base, serial);
    }
}
