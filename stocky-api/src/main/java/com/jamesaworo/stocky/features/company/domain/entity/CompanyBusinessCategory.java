/*
 * @Author: james.junior
 * @Date: 6/15/23 00:40
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import lombok.*;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.Table.COMPANY_BUSINESS_CATEGORY_TABLE;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = COMPANY_BUSINESS_CATEGORY_TABLE)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyBusinessCategory extends BaseModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	private String title;

	public CompanyBusinessCategory(String title) {
		this.title = title;
	}
}
