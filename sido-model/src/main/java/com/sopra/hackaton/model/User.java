package com.sopra.hackaton.model;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

public class User {

	@Id @Getter @Setter
	private String id;
	
	@Getter @Setter
	private String login;
	
	@Getter @Setter
	private String password;
}
