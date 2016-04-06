package com.sopra.hackaton.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.sopra.hackaton.security.BasicUserDetailsService;
import com.sopra.hackaton.security.TokenProcessingFilter;

/**
 * Created by mvincent on 22/11/2015.
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
public class GlobalSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private BasicUserDetailsService userDetailsService;
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        TokenProcessingFilter filter = new TokenProcessingFilter();
        filter.setUserService(userDetailsService);
    	
        http
        // CSRF
        .csrf().disable()
        .addFilter(filter)
        // Authentication mechanism
        .httpBasic().and()
        // Permission
        .authorizeRequests()
        .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
        .antMatchers(HttpMethod.POST, "/session/create").fullyAuthenticated()
        .anyRequest().authenticated();
    }
}
