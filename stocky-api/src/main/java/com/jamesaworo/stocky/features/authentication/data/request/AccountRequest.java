/*
 * @Author: james.junior
 * @Date: 8/24/23 18:19
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AccountRequest {
    private Long id;
    private Long employeeId;
    private Long userId;
    private String name;
    private String phone;
    private String username;
    private String password;
    private Collection<RoleRequest> roles;
    private Boolean isActiveStatus;
    private String expiryDate;
}
