/*
 * @Author: james.junior
 * @Date: 6/12/23 14:24
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

import static com.jamesaworo.stocky.core.constants.Table.COMPANY_EXPENSES;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = COMPANY_EXPENSES)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyExpenses extends BaseModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn
	private CompanyExpensesCategory category;

	private Double amount;

	private LocalDate date; //date or transaction date is not the same as created_at

	private String comment;

	private String fileId;
}
