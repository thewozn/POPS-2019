package com.pops1819.sid.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.pops1819.sid.exception.AuthenticationFailedException;
import com.pops1819.sid.exception.EntityNotCreatedException;
import com.pops1819.sid.exception.EntityNotFoundException;
import com.pops1819.sid.exception.InvalidRequestException;
import com.pops1819.sid.exception.NotImplementedException;
import com.pops1819.sid.exception.NotUpdateEntityException;
import com.pops1819.sid.exception.UnauthorizedModificationException;
import com.pops1819.sid.model.ApiError;

@ControllerAdvice
public class GlobalExceptionController extends ResponseEntityExceptionHandler {

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<ApiError> handleResourceNotFoundException(EntityNotFoundException e, WebRequest request) {
		ApiError error = new ApiError(e);
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(NotImplementedException.class)
	public ResponseEntity<ApiError> handleResourceNotImplementedException(NotImplementedException e,
			WebRequest request) {
		ApiError error = new ApiError(e);
		return new ResponseEntity<>(error, HttpStatus.NOT_IMPLEMENTED);
	}

	@ExceptionHandler(UnauthorizedModificationException.class)
	public ResponseEntity<ApiError> handleResourceUnauthorizedModificationException(UnauthorizedModificationException e,
			WebRequest request) {
		ApiError error = new ApiError(e);
		return new ResponseEntity<ApiError>(error, HttpStatus.UNAUTHORIZED);

	}

	@ExceptionHandler(InvalidRequestException.class)
	public ResponseEntity<ApiError> handleResourceInvalidRequestException(InvalidRequestException e,
			WebRequest request) {
		ApiError error = new ApiError(e);
		return new ResponseEntity<ApiError>(error, HttpStatus.UNAUTHORIZED);
	}
	
	@ExceptionHandler(NotUpdateEntityException.class)
	public ResponseEntity<ApiError> handleResourceUpdateEntityException(NotUpdateEntityException e,
			WebRequest request) {
		ApiError error = new ApiError(e);
		return new ResponseEntity<ApiError>(error, HttpStatus.FORBIDDEN);
	}
	
	@ExceptionHandler(AuthenticationFailedException.class)
	public ResponseEntity<ApiError> handleResourceAuthentifacationFailedException(AuthenticationFailedException e,
			WebRequest request) {
		ApiError error = new ApiError(e);
		return new ResponseEntity<ApiError>(error, HttpStatus.NOT_ACCEPTABLE);
	}
	
	@ExceptionHandler(EntityNotCreatedException.class)
	public ResponseEntity<ApiError> handleResourceEntityNotCreatedException(EntityNotCreatedException e,
			WebRequest request) {
		ApiError error = new ApiError(e);
		return new ResponseEntity<ApiError>(error, HttpStatus.NOT_ACCEPTABLE);
	}
	
}
