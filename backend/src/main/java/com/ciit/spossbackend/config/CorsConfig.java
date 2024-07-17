package com.ciit.spossbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration class for CORS (Cross-Origin Resource Sharing) configuration.
 */

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    /**
     * Configure CORS mappings.
     * 
     * @param registry The CORS registry to configure.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://sposs-67a96.web.app") // Allow requests from reactjs deployment on firebase
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS"); // Allow specified HTTP methods
    }
}
