package com.sopra.hackaton.config;

import java.util.List;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sopra.hackaton.model.AccessCode;
import com.sopra.hackaton.model.Customer;
import com.sopra.hackaton.model.Domain;
import com.sopra.hackaton.model.Memo;
import com.sopra.hackaton.model.PoI;
import com.sopra.hackaton.model.Round;
import com.sopra.hackaton.model.User;

/**
 * Created by mvincent on 06/01/2016.
 */
@EnableAutoConfiguration
@Configuration
public class RestConfiguration implements RepositoryRestConfigurer {

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		config.exposeIdsFor(PoI.class, Round.class, Customer.class, Domain.class, Memo.class, User.class, AccessCode.class);
	}

	@Override
	public void configureConversionService(ConfigurableConversionService conversionService) {
		// noop
	}

	@Override
	public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener validatingListener) {
		// noop
	}

	@Override
	public void configureExceptionHandlerExceptionResolver(ExceptionHandlerExceptionResolver exceptionResolver) {
		// noop
	}

	@Override
	public void configureHttpMessageConverters(List<HttpMessageConverter<?>> messageConverters) {
		// noop
	}

	@Override
	public void configureJacksonObjectMapper(ObjectMapper objectMapper) {
		// noop
	}
}
