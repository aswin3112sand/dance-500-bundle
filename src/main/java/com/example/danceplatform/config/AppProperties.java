package com.example.danceplatform.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private Jwt jwt = new Jwt();
    private Cors cors = new Cors();
    private Storage storage = new Storage();
    private Razorpay razorpay = new Razorpay();

    @Data
    public static class Jwt {
        private String secret;
        private long expirationMs;
        private String cookieName = "ASDANCE_TOKEN";
        private boolean cookieSecure = false;
    }

    @Data
    public static class Cors {
        private String allowedOrigins;
    }

    @Data
    public static class Storage {
        private String uploadDir;
    }

    @Data
    public static class Razorpay {
        private String keyId;
        private String keySecret;
    }
}
