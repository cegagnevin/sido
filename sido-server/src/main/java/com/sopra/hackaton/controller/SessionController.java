package com.sopra.hackaton.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sopra.hackaton.security.SecurityUtils;

/**
 * Created by mvincent on 08/01/2016.
 */
@RestController
@RequestMapping("/session")
public class SessionController {

    @Autowired
    private UserDetailsService uds;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public String initSession(@RequestBody String username) {
        return SecurityUtils.createToken(uds.loadUserByUsername(username));
    }
    
    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public boolean checkSession(@RequestBody String token) {
        String username = SecurityUtils.getUserNameFromToken(token);
        return SecurityUtils.validateToken(token, uds.loadUserByUsername(username));
    }
}
