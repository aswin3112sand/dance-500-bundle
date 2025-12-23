package com.example.danceplatform;

import org.springframework.boot.SpringApplication;
import com.example.danceplatform.config.AppProperties;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class DancePlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(DancePlatformApplication.class, args);
    }
}
