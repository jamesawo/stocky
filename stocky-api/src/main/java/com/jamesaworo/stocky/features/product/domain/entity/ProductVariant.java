package com.jamesaworo.stocky.features.product.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import com.jamesaworo.stocky.features.product.domain.enums.ProductVariantType;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static com.jamesaworo.stocky.core.constants.Table.PRODUCT_VARIATIONS;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = PRODUCT_VARIATIONS)
@Data
public class ProductVariant extends BaseModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true)
	@NotNull(message = "Variant type cannot be null")
	private ProductVariantType variantType;

	private String variantValue;


}