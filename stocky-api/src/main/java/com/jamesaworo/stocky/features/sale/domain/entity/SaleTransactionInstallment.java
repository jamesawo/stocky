/*
 * @Author: james.junior
 * @Date: 7/24/23 19:54
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.domain.entity;

import com.jamesaworo.stocky.features.sale.domain.enums.SaleTransactionInstallmentType;
import lombok.*;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.Table.SALES_TRANSACTION_INSTALLMENT;

@Entity
@Table(name = SALES_TRANSACTION_INSTALLMENT)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SaleTransactionInstallment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private SaleTransactionInstallmentType installmentType;

    @OneToOne(mappedBy = "installment", optional = false)
    private SaleTransaction transaction;

}
