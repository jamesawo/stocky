/*
 * @Author: james.junior
 * @Date: 8/7/23 00:45
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.commandrunner.seeders;

import com.jamesaworo.stocky.features.authentication.data.repository.RoleRepository;
import com.jamesaworo.stocky.features.authentication.data.repository.UserRepository;
import com.jamesaworo.stocky.features.authentication.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Set;

import static com.jamesaworo.stocky.core.constants.Setting.DEFAULT_SYS_ROLE;
import static com.jamesaworo.stocky.core.constants.Setting.DEFAULT_SYS_USER;

@Component
@RequiredArgsConstructor
public class UserSeeder {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;

    @Value(value = "${stocky.system.password}")
    private String systemPassword;

    public void run() {
        this.seedUser();
    }


    private void seedUser() {
        if (this.userRepository.findByUsernameEqualsIgnoreCase(DEFAULT_SYS_USER).isEmpty()) {
            User user = new User();
            user.setUsername(DEFAULT_SYS_USER);
            user.setPassword(encoder.encode(systemPassword));
            user.setName(DEFAULT_SYS_USER.toUpperCase());
            user.setExpirationDate(LocalDate.now().plusMonths(120));
            this.roleRepository.findByNameEqualsIgnoreCase(DEFAULT_SYS_ROLE).ifPresent(role -> user.setRoles(Set.of(role)));
            this.userRepository.save(user);
            System.out.println("----- seed user -----");
        }

    }
}
