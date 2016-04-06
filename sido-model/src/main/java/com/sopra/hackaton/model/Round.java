package com.sopra.hackaton.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import lombok.Getter;
import lombok.Setter;

public class Round {

	@Getter @Setter
	@Id
	private String id;
	
	@Getter @Setter
	private String name;
	
	@DBRef
	@Getter @Setter
	private List<PoI> PoIs;
	
	@DBRef
	@Getter @Setter
	private List<Customer> customers;
}
