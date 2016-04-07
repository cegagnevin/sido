package com.sopra.hackaton.model;

import java.util.List;

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
	
	@Getter @Setter
	private String surname;
	
	@Getter @Setter
	private String forename;
	
	@Getter @Setter
	private List<Round> rounds;
	
}
