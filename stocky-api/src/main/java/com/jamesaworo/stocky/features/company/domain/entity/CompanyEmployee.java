/*
 * @Author: james.junior
 * @Date: 6/18/23 12:32
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import com.jamesaworo.stocky.features.authentication.domain.entity.User;
import lombok.*;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.Table.COMPANY_EMPLOYEE;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = COMPANY_EMPLOYEE)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyEmployee extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private CompanyEmployeePersonalDetail personalDetail;

    @OneToOne
    private CompanyEmployeeNokDetail nokDetail;

    @OneToOne
    private User accountDetail;

    public CompanyEmployee(Long id) {
        this.id = id;
    }
}
