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
import java.util.List;

import static com.jamesaworo.stocky.core.constants.Table.PRODUCT_BASIC;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = PRODUCT_BASIC)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductBasic extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ProductCategory productCategory;

    @ManyToOne
    private ProductUnitOfMeasure unitOfMeasure;

    @ManyToOne
    private ProductStatus status;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn()
    private List<ProductTax> taxes;

    @Column(nullable = false)
    private String productName;

    @Column(unique = true)
    private String sku;

    @Column(unique = true)
    private String barcode;

    private String brandName;
    private String description;
    private Boolean isActive;
    private Boolean useQuantity;
    private Boolean isService;
    private Integer minAgeLimit;
    private Integer lowStockPoint;
    @Column(columnDefinition = "integer default 0")
    private Integer quantity = 0;

    public String title() {
        return String.format("%s %s", this.productName, this.brandName);
    }
}
