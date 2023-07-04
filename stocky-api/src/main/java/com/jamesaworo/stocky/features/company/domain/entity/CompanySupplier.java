/*
 * @Author: james.junior
 * @Date: 6/18/23 12:32
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import com.jamesaworo.stocky.features.product.domain.entity.ProductCategory;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

import static com.jamesaworo.stocky.core.constants.Table.COMPANY_SUPPLIER;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = COMPANY_SUPPLIER)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanySupplier extends BaseModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String supplierBusinessName;
	private String supplierFirstName;
	private String supplierLastName;
	private String supplierEmailAddress;
	private String supplierPhone;
	private String supplierOfficeAddress;

	@OneToMany
	@JoinTable
	private Set<ProductCategory> categories;

	public CompanySupplier(Long id) {
		this.id = id;
	}
}
