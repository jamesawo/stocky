/*
 * @Author: james.junior
 * @Date: 6/16/23 23:16
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import com.jamesaworo.stocky.features.company.domain.enums.CompanyLocationType;
import lombok.*;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.Table.COMPANY_LOCATION;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = COMPANY_LOCATION)
@Getter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyLocation extends BaseModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true, nullable = false)
	private String title;
	private String description;
	private CompanyLocationType type;
}
