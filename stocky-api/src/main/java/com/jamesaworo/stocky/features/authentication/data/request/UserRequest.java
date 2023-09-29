/*
 * @Author: james.junior
 * @Date: 6/18/23 19:27
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserRequest {
    private Long id;
    private String username;
    private String password;
    private LocalDate expirationDate;
    private Collection<RoleRequest> roles;
    private Boolean isActiveStatus;
    private String name;
}
