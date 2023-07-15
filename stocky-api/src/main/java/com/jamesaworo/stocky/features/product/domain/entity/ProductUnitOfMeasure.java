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
import java.util.List;

import static com.jamesaworo.stocky.core.constants.Table.PRODUCT_UNIT_OF_MEASURE;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = PRODUCT_UNIT_OF_MEASURE)
@Data
public class ProductUnitOfMeasure extends BaseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String unit;

    @OneToMany(mappedBy = "unitOfMeasure", fetch = FetchType.LAZY)
    private List<ProductBasic> products;

    public ProductUnitOfMeasure() {
    }

    public ProductUnitOfMeasure(Long id) {
        this.id = id;
    }
}
