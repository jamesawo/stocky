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
    @Value("${server.port}")
    private String serverPort;
    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String ddlAuto;
    @Value("${jwt.expiration}")
    private String jwtExpiration;
    @Value("${jwt.issuer}")
    private String jwtIssuer;
    @Value("${stocky.system.password}")
    private String systemP;
    @Value("${stocky.system.username}")
    private String systemU;


    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public void run(String... strings) throws Exception {
        logger.info("dataSourceUsername {}", dataSourceUsername);
        logger.info("dataSourcePassword {}", dataSourcePassword);
        logger.info("dataSourceUrl: {}", dataSourceUrl);
        logger.info("serverPort: {}", serverPort);
        logger.info("ddlAuto: {}", ddlAuto);
        logger.info("jwtExpiration: {}", jwtExpiration);
        logger.info("jwtIssuer: {}", jwtIssuer);
        logger.info("systemP: {}", systemP);
        logger.info("systemU: {}", systemU);
    }

}
