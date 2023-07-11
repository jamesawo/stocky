/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import com.jamesaworo.stocky.features.company.domain.entity.CompanySupplier;
import com.jamesaworo.stocky.features.product.domain.entity.Product;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

import static com.jamesaworo.stocky.core.constants.Table.STOCK_ITEM;
import static com.jamesaworo.stocky.core.constants.Table.STOCK_ITEM_EXPENSES;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = STOCK_ITEM)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StockItem extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate recordedDate;
    private Integer productQuantity;
    private Integer productQuantitySold;
    private String other;

    @OneToOne
    private CompanySupplier supplier;

    @OneToOne
    private Product product;

    @OneToOne
    private StockSettlement settlement;

    @OneToOne
    private StockPrice stockPrice;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Stock stock;

    @OneToMany
    @JoinTable(
            name = STOCK_ITEM_EXPENSES,
            joinColumns = @JoinColumn(name = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "expenses_id")
    )
    private List<StockExpenses> expenses;

}
