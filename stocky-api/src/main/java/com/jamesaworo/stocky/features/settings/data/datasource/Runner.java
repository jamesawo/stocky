package com.jamesaworo.stocky.features.settings.data.datasource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * @author Aworo James
 * @since 4/21/23
 */

@Component
public class Runner implements CommandLineRunner {
    @Autowired
    private Seeder seeder;

    @Override
    public void run(String... args) throws Exception {
        seeder.run();
    }
}