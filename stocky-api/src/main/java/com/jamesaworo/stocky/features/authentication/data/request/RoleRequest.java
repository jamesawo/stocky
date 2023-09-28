/*
 * @Author: james.junior
 * @Date: 6/13/23 11:24
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.features.authentication.domain.entity.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoleRequest {
    private Long id;
    @NotNull(message = "name cannot be null")
    @NotEmpty(message = "name cannot be empty")
    private String name;
    private String description;
    private List<PermissionRequest> permissions;
    private String createdAt;
    private Boolean isActiveStatus;

    public static RoleRequest toPartialRequest(Role role) {
        RoleRequest request = new RoleRequest();
        request.setId(role.getId());
        request.setName(role.getName());
        request.setDescription(role.getDescription());
        return request;
    }

}
