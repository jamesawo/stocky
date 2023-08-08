/*
 * @Author: james.junior
 * @Date: 8/5/23 04:16
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.configuration.configurer;

import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

import static java.util.Optional.ofNullable;
import static org.springframework.security.core.context.SecurityContextHolder.getContext;

public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        String username = getContext().getAuthentication() != null ? getContext().getAuthentication().getName() : "";
        return ofNullable(username).filter(s -> !s.isEmpty());
    }

}
