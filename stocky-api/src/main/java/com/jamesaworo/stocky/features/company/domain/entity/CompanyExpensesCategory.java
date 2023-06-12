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
import java.util.List;

import static com.jamesaworo.stocky.core.constants.Table.COMPANY_EXPENSES_CATEGORY;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = COMPANY_EXPENSES_CATEGORY)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyExpensesCategory extends BaseModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String title;
	private String description;

	@OneToMany(mappedBy = "category")
	private List<CompanyExpenses> expenses;

	public CompanyExpensesCategory(String title, String description) {
		this.title = title;
		this.description = description;
	}
}
