/*
 * @Author: james.junior
 * @Date: 7/24/23 19:54
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.domain.entity;

import lombok.*;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.Table.SALES_TRANSACTION_AMOUNT;

@Entity
@Table(name = SALES_TRANSACTION_AMOUNT)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SaleTransactionAmount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double grandTotal;

    private Double discountTotal;

    private Double taxTotal;

    private Double subTotal;
    
    @OneToOne(mappedBy = "amount", optional = false)
    private SaleTransaction transaction;

}
