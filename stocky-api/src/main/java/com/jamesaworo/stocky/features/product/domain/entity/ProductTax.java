/*
 * @Author: james.junior
 * @Date: 5/21/23 21:07
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.domain.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

import static com.jamesaworo.stocky.core.constants.Table.PRODUCT_TAX;

@Entity
@Table(name = PRODUCT_TAX)
@Data
public class ProductTax {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String description;
	private double percent;

	@OneToMany(mappedBy = "status", fetch = FetchType.LAZY)
	private List<Product> products;
}
