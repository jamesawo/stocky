/*
 * @Author: james.junior
 * @Date: 7/24/23 19:54
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionInstallment;
import com.jamesaworo.stocky.features.sale.domain.enums.SaleTransactionInstallmentType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SaleTransactionInstallmentRequest {
    private Long id;
    private SaleTransactionInstallmentType installmentType;

    public static SaleTransactionInstallment toModel(SaleTransactionInstallmentRequest request) {
        SaleTransactionInstallment installment = new SaleTransactionInstallment();
        installment.setId(request.getId());
        installment.setInstallmentType(request.getInstallmentType());
        return installment;

    }
}
