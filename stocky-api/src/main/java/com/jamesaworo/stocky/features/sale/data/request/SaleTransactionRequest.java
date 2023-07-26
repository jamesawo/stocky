/*
 * @Author: james.junior
 * @Date: 7/24/23 21:21
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.features.company.data.request.CompanyCustomerRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanyEmployeeRequest;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyCustomer;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalTime;
import java.util.List;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;
import static com.jamesaworo.stocky.core.constants.Global.SALES_TRANSACTION_ENDPOINT;
import static com.jamesaworo.stocky.core.utils.Util.parseToLocalDate;
import static java.util.stream.Collectors.toList;
import static org.springframework.util.ObjectUtils.isEmpty;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SaleTransactionRequest {
    private Long id;
    private String reference;
    private String token;
    private String time;
    private String date;
    private CompanyCustomerRequest customer;
    private CompanyEmployeeRequest employee;
    private SaleTransactionAmountRequest amount;
    private SaleTransactionInstallmentRequest installment;
    private List<SaleTransactionItemRequest> items;
    private String other;
    private String receiptUrl;


    public static SaleTransaction toModel(SaleTransactionRequest request) {
        SaleTransaction transaction = new SaleTransaction();
        transaction.setId(request.getId());
        transaction.setDate(!isEmpty(request.getDate()) ? parseToLocalDate(request.getDate()) : null);
        transaction.setTime(!isEmpty(request.getTime()) ? LocalTime.parse(request.getTime()) : null);
        transaction.setReference(request.getReference());
        transaction.setToken(request.getToken());
        /*transaction.setEmployee(new CompanyEmployee(request.getEmployee().getId()));*/
        transaction.setCustomer(new CompanyCustomer(request.getCustomer().getId()));
        transaction.setAmount(SaleTransactionAmountRequest.toModel(request.getAmount()));
        transaction.setInstallment(SaleTransactionInstallmentRequest.toModel(request.getInstallment()));
        transaction.setItems(request.getItems().stream().map(SaleTransactionItemRequest::toModel).collect(toList()));
        transaction.setOther(request.getOther());
        return transaction;
    }

    public static String receiptUrl(String reference, String token) {
        String serverUri = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
        String base = serverUri + API_PREFIX + SALES_TRANSACTION_ENDPOINT;
        return String.format("%s/pdf-receipt?ref=%s&token=%s", base, reference, token);
    }
}
