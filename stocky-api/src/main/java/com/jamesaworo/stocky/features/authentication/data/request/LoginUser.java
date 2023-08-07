/*
 * @Author: james.junior
 * @Date: 8/6/23 02:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginUser {
    private Long id;
    private String username;
    private String token;
    private String fullName;
    private String email;
    private boolean enabled;
    private List<String> access;
}
