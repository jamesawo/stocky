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
	/*
		recordDate is the date the money was spent,
		it's not the same as the date the record was created on the system,
		that will be createdAt
	 */
	private LocalDate recordDate;
	private String comment;
	private String uploads;
	private Boolean isPendingApproval;

	private Boolean isRecentlyUpdated;
	//todo: refactor approvedBy and registeredBy to a user object &
	// remember to update CompanyExpensesSearchSpecification too
	private String approvedBy;
	private String registeredBy;

}
