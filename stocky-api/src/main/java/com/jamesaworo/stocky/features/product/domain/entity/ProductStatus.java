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

import static com.jamesaworo.stocky.core.constants.Table.PRODUCT_STATUS;

@Entity
@Table(name = PRODUCT_STATUS)
@Data
public class ProductStatus {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String description;

	@OneToMany(mappedBy = "status", fetch = FetchType.LAZY)
	private List<Product> products;
}
