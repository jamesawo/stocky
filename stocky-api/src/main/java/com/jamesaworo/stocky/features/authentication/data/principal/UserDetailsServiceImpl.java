/*
 * @Author: james.junior
 * @Date: 10/3/22 10:15 AM
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.data.principal;

import com.jamesaworo.stocky.features.authentication.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component()
public class UserDetailsServiceImpl implements UserDetailsService {

    private static final String NO_USER_FOUND = "No user found ";

    @Autowired
    private UserRepository usecase;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<com.jamesaworo.stocky.features.authentication.domain.entity.User> optional = this.usecase
                .findByUsernameEqualsIgnoreCase(username);
        return optional.map(UserPrincipalImpl::new)
                .orElseThrow(() -> new UsernameNotFoundException(NO_USER_FOUND + username));
    }

}
