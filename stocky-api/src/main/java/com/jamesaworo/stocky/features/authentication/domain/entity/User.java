/*
 * @Author: james.junior
 * @Date: 6/18/23 19:27
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.*;

import static com.jamesaworo.stocky.core.constants.Table.AUTH_USER;
import static com.jamesaworo.stocky.core.constants.Table.AUTH_USER_ROLE;
import static org.springframework.util.ObjectUtils.isEmpty;

@Data
@Builder
@Entity
@EqualsAndHashCode(callSuper = false)
@Table(name = AUTH_USER)
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
public class User extends BaseModel {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Username cannot be empty")
    @Column(nullable = false, unique = true, updatable = false)
    private String username;

    /* Todo - Refactor, Name is already present in CompanyEmployee record,
        therefore remove name from user.
     */
    @Deprecated
    private String name;

    @Column(nullable = false)
    private String password;

    private LocalDate expirationDate = LocalDate.now().plusMonths(6);

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = AUTH_USER_ROLE,
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    public boolean isAccountExpired() {
        return this.getExpirationDate().isBefore(LocalDate.now());
    }

    public Set<Permission> getPermissions() {
        Set<Permission> permissions = new HashSet<>();
        if (this.roles != null && !this.roles.isEmpty()) {
            this.roles.forEach(role -> permissions.addAll(role.getPermissions()));
        }
        return permissions;
    }

    public Collection<? extends GrantedAuthority> getGrantedAuthorities() {
        Set<String> permissions = getPermissionsTitleAsSet();
        Collection<SimpleGrantedAuthority> authorities = new HashSet<>();

        permissions.forEach(permissionName -> {
            if (!isEmpty(permissionName)) {
                authorities.add(new SimpleGrantedAuthority(permissionName));
            }
        });

        return authorities;
    }

    public Set<String> getPermissionsTitleAsSet() {
        Set<String> access = new HashSet<>();
        if (!isEmpty(this.id) && !isEmpty(this.getRoles())) {
            this.getRoles().forEach(role -> role.getPermissions().forEach(permission -> access.add(permission.getName())));
        }
        return access;
    }

    public Map<String, String> getPermissionsTitleAsMap() {
        Map<String, String> access = new HashMap<>();
        if (!isEmpty(this.id) && !isEmpty(this.getRoles())) {
            this.getRoles().forEach(r -> r.getPermissions().forEach(p -> access.put(p.getName(), p.getName())));
        }
        return access;
    }

}
