package com.sopra.hackaton.model;

import org.springframework.data.annotation.Id;
import lombok.Getter;
import lombok.Setter;

public class Customer {
	
	@Getter @Setter
	@Id
	private String id;
	
	@Getter @Setter
	private String name;
	
}
