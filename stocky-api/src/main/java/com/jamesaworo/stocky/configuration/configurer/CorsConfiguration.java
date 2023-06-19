package com.jamesaworo.stocky.configuration.configurer;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author Aworo James
 * @since 5/13/23
 */
@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**")
		        .allowedOrigins("http://localhost:4200")
		        .allowedMethods("GET", "POST", "PUT", "DELETE")
		        .allowedHeaders("*")
		        .allowCredentials(false)
		        .maxAge(3600);
	}
}