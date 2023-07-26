/*
 * @Author: james.junior
 * @Date: 6/18/23 12:32
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import com.jamesaworo.stocky.features.company.domain.enums.CustomerTagEnum;
import lombok.*;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.Table.COMPANY_CUSTOMER;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = COMPANY_CUSTOMER)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyCustomer extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String customerFirstName;
    private String customerLastName;
    @Column(unique = true)
    private String customerEmail;

    @Column(unique = true)
    private String customerPhone;
    private String customerAddress;
    private CustomerTagEnum customerTag;

    public CompanyCustomer(Long id) {
        this.id = id;
    }
}
