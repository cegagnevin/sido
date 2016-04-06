package com.sopra.hackaton.model;

import org.springframework.data.annotation.Id;
import lombok.Getter;
import lombok.Setter;

public class PoI {
	
	@Getter @Setter
	@Id
	private String id;
	
	@Getter @Setter
	private String name;
	
	@Getter @Setter
	private String type;
	
	@Getter @Setter
	private String reference;
	
	@Getter @Setter
	private String latitude;
	
	@Getter @Setter
	private String longitude;
	
}
