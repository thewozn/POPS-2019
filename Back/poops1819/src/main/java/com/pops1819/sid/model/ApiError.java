package com.pops1819.sid.model;

import java.util.UUID;

import org.springframework.http.HttpStatus;

import com.pops1819.sid.exception.AuthenticationFailedException;
import com.pops1819.sid.exception.EntityNotCreatedException;
import com.pops1819.sid.exception.EntityNotFoundException;
import com.pops1819.sid.exception.InvalidRequestException;
import com.pops1819.sid.exception.NotImplementedException;
import com.pops1819.sid.exception.NotUpdateEntityException;
import com.pops1819.sid.exception.UnauthorizedModificationException;

public class ApiError {

	private final static String UNKNOWN_ERROR = "UNKNOWN_ERROR";

	private String errorCode = null;
	private String debugId = null;
	private String message = null;
	private String informationLink = null;

	
	public ApiError(String errorCode, String debugId, String message, String informationLink) {
		this.errorCode = errorCode;
		this.debugId = debugId;
		this.message = message;
		this.informationLink = informationLink;
	}

	public ApiError(EntityNotFoundException e) {
		this.errorCode = HttpStatus.NOT_FOUND.toString();
		this.debugId = UUID.randomUUID().toString();
		this.message = e.getMessage();
		this.informationLink = informationLink;
	}

	public ApiError(NotImplementedException e) {
		this.errorCode = HttpStatus.NOT_IMPLEMENTED.toString();
		this.debugId = UUID.randomUUID().toString();
		this.message = e.getMessage();
		this.informationLink = informationLink;
	}
	
	public ApiError(AuthenticationFailedException e)
	{
		this(HttpStatus.NOT_ACCEPTABLE.toString(), UUID.randomUUID().toString(), e.getMessage(), null);
	}

	public ApiError(InvalidRequestException e) {
		this(HttpStatus.NOT_MODIFIED.toString(), UUID.randomUUID().toString(), e.getMessage(), null);
	}
	
	public ApiError(NotUpdateEntityException e)
	{
		this(HttpStatus.FORBIDDEN.toString(), UUID.randomUUID().toString(), e.getMessage(), null);
	}
	
	public ApiError(UnauthorizedModificationException e)
	{
		this(HttpStatus.UNAUTHORIZED.toString(), UUID.randomUUID().toString(), e.getMessage(), null);
	}

	public ApiError(EntityNotCreatedException e)
	{
		this(HttpStatus.BAD_REQUEST.toString(), UUID.randomUUID().toString(), e.getMessage(), null);
	}
	
	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getDebugId() {
		return debugId;
	}

	public void setDebugId(String debugId) {
		this.debugId = debugId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getInformationLink() {
		return informationLink;
	}

	public void setInformationLink(String informationLink) {
		this.informationLink = informationLink;
	}

}
