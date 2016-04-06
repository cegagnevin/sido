package com.sopra.hackaton;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

import com.sopra.hackaton.config.GlobalSecurityConfiguration;

public class ServletInitializer extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(GlobalSecurityConfiguration.class, BackendApplication.class);
	}

}
