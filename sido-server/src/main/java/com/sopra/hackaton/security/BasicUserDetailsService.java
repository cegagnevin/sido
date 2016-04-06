package com.sopra.hackaton.security;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sopra.hackaton.rest.UserRepository;

/**
 * Created by mvincent on 22/11/2015.
 */
@Service
public class BasicUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws
            UsernameNotFoundException {
    	
    	// dev mode
    	if (username.equals("user")) {
    		return new User("user", "ontheroad", getGrantedAuthorities(username));
    	}
    	
    	com.sopra.hackaton.model.User user = userRepo.findByLogin(username);
        if (user == null) {
            throw new UsernameNotFoundException("Unknown user");
        }
        return new User(user.getLogin(), user.getPassword(), getGrantedAuthorities(username));
    }
    private Collection<? extends GrantedAuthority> getGrantedAuthorities(String username) {
        return Arrays.asList(() -> "ROLE_ADMIN", () -> "ROLE_BASIC");
    }
}
