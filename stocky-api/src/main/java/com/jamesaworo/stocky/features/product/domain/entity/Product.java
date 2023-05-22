package com.jamesaworo.stocky.features.product.domain.entity;

import lombok.Getter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

import static com.jamesaworo.stocky.core.constants.Table.PREFIX;
import static com.jamesaworo.stocky.core.constants.Table.PRODUCT;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@Entity
@Table(name = PRODUCT)
@Getter
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title", nullable = false)
	@NotNull
	private String title;
	private String description;
	private String sku;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private ProductCategory category;

	@Column(name = "unit_cost")
	private Double unitCost;

	@Column(name = "selling_price")
	private Double sellingPrice;

	@Column(name = "status")
	private Boolean status;

	@ManyToMany
	@JoinTable(
			name = PREFIX + "PRODUCT_VARIANT",
			joinColumns = @JoinColumn(name = "product_id"),
			inverseJoinColumns = @JoinColumn(name = "product_variation_id")
	)
	private Set<ProductVariant> variants;

	@ManyToOne
	private ProductUnitOfMeasure unitOfMeasure;

}