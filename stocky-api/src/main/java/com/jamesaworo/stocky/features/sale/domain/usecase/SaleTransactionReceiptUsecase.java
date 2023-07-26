/*
 * @Author: james.junior
 * @Date: 7/25/23 13:42
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.domain.usecase;

import java.util.Optional;

public interface SaleTransactionReceiptUsecase {
    Optional<String> generateReceiptUrl(Long saleTransactionId);
}
