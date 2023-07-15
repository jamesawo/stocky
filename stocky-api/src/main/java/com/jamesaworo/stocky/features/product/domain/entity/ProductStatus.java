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

import static com.jamesaworo.stocky.core.constants.Table.PRODUCT_STATUS;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = PRODUCT_STATUS)
@Data
public class ProductStatus extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;

    @OneToMany(mappedBy = "status", fetch = FetchType.LAZY)
    private List<ProductBasic> productBasics;

    public ProductStatus(Long id) {
        this.id = id;
    }

    public ProductStatus() {
    }
}
