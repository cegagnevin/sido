package com.sopra.hackaton.model;

import org.springframework.data.annotation.Id;
import lombok.Getter;
import lombok.Setter;

public class Memo {
	
	@Getter @Setter
	@Id
	private String id;
	
	@Getter @Setter
	private String title;
	
	@Getter @Setter
	private String description;
	
	@Getter @Setter
	private String author;
	
	@Getter @Setter
	private String date;
	
}
