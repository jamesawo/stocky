/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import lombok.*;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.Table.STOCK_EXPENSES;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = STOCK_EXPENSES)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StockExpenses extends BaseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private Double amount;

    public StockExpenses(Long id) {
        this.id = id;
    }
}
