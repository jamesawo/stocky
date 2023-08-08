/*
 * @Author: james.junior
 * @Date: 8/5/23 20:50
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.configuration.configurer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class BeanConfigurer {

    @Bean
    public AuditorAware<String> auditorAware() {
        return new AuditorAwareImpl();
    }

}
