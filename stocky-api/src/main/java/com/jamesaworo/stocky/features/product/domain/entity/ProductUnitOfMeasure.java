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

import static com.jamesaworo.stocky.core.constants.Table.PRODUCT_UNIT_OF_MEASURE;

@Entity
@Table(name = PRODUCT_UNIT_OF_MEASURE)
@Data
public class ProductUnitOfMeasure {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String unit;

	@OneToMany(mappedBy = "unitOfMeasure", fetch = FetchType.LAZY)
	private List<Product> products;
}
