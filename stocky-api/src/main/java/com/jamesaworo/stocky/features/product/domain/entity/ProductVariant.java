package com.jamesaworo.stocky.features.product.domain.entity;

import com.jamesaworo.stocky.features.product.domain.enums.ProductVariantType;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

import static com.jamesaworo.stocky.core.constants.Table.PRODUCT_VARIATIONS;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@Entity
@Table(name = PRODUCT_VARIATIONS)
@Data
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    @NotNull(message = "Variant type cannot be null")
    private ProductVariantType variantType;

    private String variantValue;

    @ManyToMany(mappedBy = "variants")
    private List<Product> products;

}