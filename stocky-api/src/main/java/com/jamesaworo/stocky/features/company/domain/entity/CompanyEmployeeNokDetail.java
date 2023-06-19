/*
 * @Author: james.junior
 * @Date: 6/18/23 12:32
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import lombok.*;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.Table.COMPANY_EMPLOYEE_NOK_DETAIL;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = COMPANY_EMPLOYEE_NOK_DETAIL)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyEmployeeNokDetail extends BaseModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nokFullName;
	private String nokAddress;
	private String nokEmail;
	private String nokPhone;
	private String nokRelationship;

}
