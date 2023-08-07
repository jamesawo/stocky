/*
 * @Author: james.junior
 * @Date: 8/7/23 13:08
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.domain.enums;

import lombok.Data;

@Data
public class AppModuleRoute {
    private String text;
    private String permission;
    private String route;

    public AppModuleRoute(String text, String permission, String route) {
        this.text = text;
        this.permission = permission;
        this.route = route;
    }
}
