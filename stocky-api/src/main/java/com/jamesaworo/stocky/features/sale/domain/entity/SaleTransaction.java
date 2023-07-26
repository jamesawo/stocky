/*
 * @Author: james.junior
 * @Date: 7/24/23 19:54
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyCustomer;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyEmployee;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static com.jamesaworo.stocky.core.constants.Table.SALES_TRANSACTION;
import static com.jamesaworo.stocky.core.constants.Table.SALES_TRANSACTION_AND_ITEMS;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = SALES_TRANSACTION)
@TypeDef(name = "json", typeClass = JsonType.class)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SaleTransaction extends BaseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reference;

    private String token;

    private LocalTime time;

    private LocalDate date;

    @OneToOne
    private CompanyCustomer customer;

    @OneToOne
    private CompanyEmployee employee;

    @OneToOne
    private SaleTransactionAmount amount;

    @OneToOne
    private SaleTransactionInstallment installment;

    @OneToMany()
    @JoinTable(name = SALES_TRANSACTION_AND_ITEMS,
            joinColumns = @JoinColumn(name = "SALE_TRANSACTION_ID"),
            inverseJoinColumns = @JoinColumn(name = "SALES_TRANSACTION_ITEM_ID")
    )
    private List<SaleTransactionItem> items;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private String other;


}
