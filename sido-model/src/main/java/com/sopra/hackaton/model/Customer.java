package com.sopra.hackaton.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import lombok.Getter;
import lombok.Setter;

public class Customer {
	
	@Getter @Setter
	@Id
	private String id;
	
	@Getter @Setter
	private String name;
	
	@Getter @Setter
	private String latitude;
	
	@Getter @Setter
	private String longitude;
	
	@Getter @Setter
	private String address;
	
	@Getter @Setter
	private String openingHours;
	
	@Getter @Setter
	private String closingHours;
	
	@Getter @Setter
	//@DBRef
	private List<AccessCode> accessCodes;
	
	@Getter @Setter
	//@DBRef
	private List<Memo> memos;
	
	@Getter @Setter
	private String order;
}
