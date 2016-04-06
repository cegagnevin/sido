package com.sopra.hackaton.model;

import org.springframework.data.annotation.Id;
import lombok.Getter;
import lombok.Setter;

public class AccessCode {
	
	@Getter @Setter
	@Id
	private String id;
	
	@Getter @Setter
	private String place;
	
	@Getter @Setter
	private String code;
	
	
	
}
