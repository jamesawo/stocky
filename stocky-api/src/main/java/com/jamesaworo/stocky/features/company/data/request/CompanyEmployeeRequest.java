/*
 * @Author: james.junior
 * @Date: 6/18/23 13:41
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.features.authentication.data.request.UserRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompanyEmployeeRequest {
    private Long id;
    private CompanyEmployeePersonalDetailRequest personalDetail;
    private CompanyEmployeeNokDetailRequest nokDetail;
    private UserRequest accountDetail;
    private String createdAt;
    private Boolean isActiveStatus;

}
