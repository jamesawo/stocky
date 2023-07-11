/*
 * @Author: james.junior
 * @Date: 6/26/23 18:25
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.features.stock.domain.enums.StockStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StockRequest {
    private Long id;
    private String createdAt;
    private Boolean isActiveStatus;
    private String code;
    private Boolean isGroupedExpenses;
    private Boolean isGroupedSettlement;
    private String recordDate;
    private String openDate;
    private String closedDate;
    private StockStatus status;
    private StockSettlementRequest settlement;
    private Set<StockExpensesRequest> expenses;
    private Set<StockItemRequest> stockItems;
}
