/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import com.jamesaworo.stocky.features.stock.domain.enums.StockStatus;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

import static com.jamesaworo.stocky.core.constants.Table.STOCK;
import static com.jamesaworo.stocky.core.constants.Table.STOCK_GROUPED_EXPENSES;


@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = STOCK)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Stock extends BaseModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String code;
	private Boolean isGroupedExpenses;
	private Boolean isGroupedSettlement;
	private LocalDate recordDate;
	private LocalDate openDate;
	private LocalDate closedDate;
	private StockStatus status;

	@OneToOne
	private StockSettlement settlement;

	@OneToMany
	@JoinTable(name = STOCK_GROUPED_EXPENSES)
	private List<StockExpenses> expenses;

	@OneToMany
	private List<StockItem> stockItems;


}
