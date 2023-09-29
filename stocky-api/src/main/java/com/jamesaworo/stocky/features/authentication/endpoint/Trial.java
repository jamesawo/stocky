/*
 * @Author: james.junior
 * @Date: 9/29/23 01:43
 *
 * @Project: stocky
 */

package com.jamesaworo.stocky.features.authentication.endpoint;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Trial implements CommandLineRunner {
    @Value("${spring.datasource.username}")
    private String dataSourceUsername;

    @Value("${spring.datasource.password}")
    private String dataSourcePassword;

    @Value("${spring.datasource.url}")
    private String dataSourceUrl;


    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public void run(String... strings) throws Exception {
        logger.info("Foo from System.getenv(): {}", System.getenv("spring.datasource.username"));
        logger.info("Foo from System.getenv(): {}", System.getenv("server.port"));
        logger.info("Foo from System.getenv(): {}", System.getenv("spring.jpa.hibernate.ddl-auto"));
        logger.info("Foo from System.getenv(): {}", System.getenv("jwt.expiration"));
        logger.info("Foo from System.getenv(): {}", System.getenv("jwt.issuer"));
        logger.info("Foo from System.getenv(): {}", System.getenv("stocky.system.password"));
        logger.info("Foo from System.getenv(): {}", System.getenv("stocky.system.username"));
        logger.info("Username {}", dataSourceUsername);
        logger.info("Password {}", dataSourcePassword);
        logger.info("Foo from @Value: {}", dataSourceUrl);
    }

}
