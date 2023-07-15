/*
 * @Author: james.junior
 * @Date: 5/21/23 21:07
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.Table.PRODUCT_TAX;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = PRODUCT_TAX)
@Data
public class ProductTax extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private double percent;


    public ProductTax(Long id) {
        this.id = id;
    }

    public ProductTax() {
    }
}
