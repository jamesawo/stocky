/*
 * @Author: james.junior
 * @Date: 8/7/23 11:51
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.features.authentication.domain.enums.AppModuleRoute;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.springframework.util.ObjectUtils.isEmpty;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Menu {
    private String key;
    private String text;
    private boolean group;
    private String link;
    private MenuIcon icon;
    private boolean disabled;
    private boolean hide;
    private String[] acl;
    private List<Menu> children = new ArrayList<>();

    public Menu(String text, boolean group) {
        this.text = text;
        this.group = group;
    }


    private static Menu parent(String text, MenuIcon icon) {
        Menu menuItem = new Menu();
        menuItem.text = text;
        menuItem.group = true;
        menuItem.icon = icon;
        return menuItem;
    }

    private static Menu child(String text, String link) {
        Menu menuItem = new Menu();
        menuItem.text = text;
        menuItem.link = link;
        return menuItem;
    }

    public static Menu parentWithChildren(
            String parentText,
            String parentIconValue,
            Map<String, String> permissions,
            List<AppModuleRoute> pages
    ) {
        Menu parent = parent(parentText, new MenuIcon("icon", parentIconValue));
        if (pages != null && pages.size() > 0) {
            pages.forEach(route -> {
                if (!isEmpty(permissions) && permissions.containsKey(route.getPermission())) {
                    Menu.appendChild(parent, child(route.getText(), route.getRoute()));
                }
            });
        }
        return parent;
    }

    public static void appendChild(Menu parent, Menu child) {
        List<Menu> children = parent.children;
        if (children != null && children.size() > 0) {
            parent.children.add(child);
        } else {
            parent.children = new ArrayList<>();
            parent.children.add(child);
        }
    }

}
