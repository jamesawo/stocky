package com.jamesaworo.stocky.features.product.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.Table.PRODUCT;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = PRODUCT)
@Getter
@Data
public class Product extends BaseModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	private ProductBasic basic;

	@OneToOne
	private ProductPrice price;
	

}