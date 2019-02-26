package com.pops1819.sid.exception;

public class AuthenticationFailedException extends RuntimeException{

	public AuthenticationFailedException(String message) {
		super(message);
	}
}
