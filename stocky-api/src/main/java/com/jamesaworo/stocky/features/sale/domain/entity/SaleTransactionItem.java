/*
 * @Author: james.junior
 * @Date: 7/24/23 19:54
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.domain.entity;

import com.jamesaworo.stocky.features.product.domain.entity.Product;
import lombok.*;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.Table.SALES_TRANSACTION_ITEM;

@Entity
@Table(name = SALES_TRANSACTION_ITEM)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SaleTransactionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Product product;

    private Integer quantity;

    private Double price;

    private Double grandTotal;

    private Double discount;

    private Double tax;

    private Double subTotal;

    @ManyToOne(fetch = FetchType.LAZY)
    private SaleTransaction transaction;
}
