/*
 * @Author: james.junior
 * @Date: 6/16/23 23:16
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import lombok.*;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.Table.COMPANY_PAYMENT_OPTION;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = COMPANY_PAYMENT_OPTION)
@Getter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyPaymentOption extends BaseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String title;
    private String description;

    public CompanyPaymentOption(Long id) {
        this.id = id;
    }
}
