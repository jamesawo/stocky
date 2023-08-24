/*
 * @Author: james.junior
 * @Date: 6/18/23 12:32
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.util.ObjectUtils;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompanyEmployeePersonalDetailRequest {
    private Long id;
    private String employeeFirstName;
    private String employeeLastName;
    private String employeeEmail;
    private String employeePhone;
    private String employeeAddress;
    private String employeeDateOfBirth;

    public String getFullName() {
        String firstName = ObjectUtils.isEmpty(this.employeeFirstName) ? "" : this.employeeFirstName;
        String lastName = ObjectUtils.isEmpty(this.employeeLastName) ? "" : this.employeeLastName;
        return String.format("%s %s", firstName, lastName);
    }
}
