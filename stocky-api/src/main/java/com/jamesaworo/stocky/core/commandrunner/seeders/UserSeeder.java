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
import static com.jamesaworo.stocky.core.utils.Util.isProduction;

@Component
@RequiredArgsConstructor
public class UserSeeder {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;

    @Value(value = "${stocky.system.password}")
    private String systemPassword;

    @Value(value = "${stocky.system.username}")
    private String systemUsername;

    @Value(value = "${spring.profiles.active")
    private String profiles;

    public void run() {
        this.seedUser();
    }


    private void seedUser() {
        if (this.systemUsername != null) {
            String username = this.systemUsername;
            LocalDate date = isProduction(this.profiles) ? LocalDate.MAX : LocalDate.now().plusMonths(12);

            if (this.userRepository.findByUsernameEqualsIgnoreCase(username).isEmpty()) {
                User user = new User();
                user.setUsername(username);
                user.setPassword(encoder.encode(systemPassword));
                user.setName(username.toUpperCase());
                user.setExpirationDate(date);
                this.roleRepository.findByNameEqualsIgnoreCase(DEFAULT_SYS_ROLE).ifPresent(role -> user.setRoles(Set.of(role)));
                this.userRepository.save(user);
                System.out.println("----- seed user -----");
            }
        } else {
            System.out.println("no username provided in environment properties");
        }

    }
}
