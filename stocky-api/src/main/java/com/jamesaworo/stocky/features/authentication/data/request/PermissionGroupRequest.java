/*
 * @Author: james.junior
 * @Date: 6/13/23 17:44
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.features.authentication.domain.enums.AppModuleEnum;
import lombok.Data;

import java.util.List;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PermissionGroupRequest {
    private AppModuleEnum module;
    private List<PermissionRequest> permissions;

    public PermissionGroupRequest(
            AppModuleEnum module, List<PermissionRequest> permissions
    ) {
        this.module = module;
        this.permissions = permissions;
    }
}

