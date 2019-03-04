package com.pops1819.sid.exception;

public class EntityNotFoundException extends RuntimeException{

	/*
	 * default constructor for creating the exception with a custom message
	 * 
	 */
	public EntityNotFoundException(String message) {
		super(message);
	}
	
}
