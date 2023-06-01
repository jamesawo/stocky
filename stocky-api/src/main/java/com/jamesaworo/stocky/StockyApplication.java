package com.jamesaworo.stocky;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class StockyApplication {

	public static void main(String[] args) {
		SpringApplication.run(StockyApplication.class, args);
	}

}
