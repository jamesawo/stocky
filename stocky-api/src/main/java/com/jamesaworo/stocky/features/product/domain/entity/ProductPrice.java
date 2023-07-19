/*
 * @Author: james.junior
 * @Date: 5/29/23 17:49
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import lombok.*;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.Table.PRODUCT_PRICE;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = PRODUCT_PRICE)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductPrice extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double markup;
    private Double costPrice;
    private Double sellingPrice;
    private Double discount;

    @OneToOne(mappedBy = "price", fetch = FetchType.LAZY)
    private Product product;
}
