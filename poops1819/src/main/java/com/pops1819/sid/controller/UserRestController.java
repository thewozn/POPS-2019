package com.pops1819.sid.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.pops1819.sid.exception.AuthenticationFailedException;
import com.pops1819.sid.exception.EntityNotFoundException;
import com.pops1819.sid.exception.NotImplementedException;
import com.pops1819.sid.exception.NotUpdateEntityException;
import com.pops1819.sid.model.UserRequest;
import com.pops1819.sid.services.UserServiceImpl;

@RestController
@CrossOrigin(origins="*",allowedHeaders="*")
public class UserRestController 
{
	@Autowired
	private UserServiceImpl userServiceImpl;
 
	@RequestMapping(value = "/authentication/{email}/{password}", method = RequestMethod.GET)
	public ResponseEntity<UserRequest> authentication(@PathVariable String email, @PathVariable String password)
	{
		UserRequest userRequest = userServiceImpl.authentication(email, password);
		if(userRequest == null)
			throw new AuthenticationFailedException("authentification Issue - PLEASE CHECK the email and the password.");
		return new ResponseEntity<UserRequest>(userRequest, HttpStatus.ACCEPTED);
	}
	
	
	@RequestMapping(value = "/createUser", method = RequestMethod.POST)
	public ResponseEntity<Void> createUser(@RequestBody UserRequest user) {
		System.out.println("CreateUser");
		System.out.println(user.toString());
		if(userServiceImpl.createUser(user) == null)
			throw new EntityNotFoundException("createUser Issue - PLEASE CHECK that the service exists - that the email does not already exist for another user."
					+ "The status must be Collaborator - PLEASE VERIFY the date format");
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/updateUser", method = RequestMethod.PATCH)
	public ResponseEntity<Void> updateUser(@RequestBody UserRequest userRequest)
	{	
		System.out.println("UpdateUser");
		System.out.println(userRequest.toString());
		if(!userServiceImpl.updateUser(userRequest))
			throw new NotUpdateEntityException("updateUser Issue - PLEASE CHECK that you are not changing the department of a HeadOfService, "
					+ "ONLY a Collaborator who is not in charge of a Department can have his sid changed");
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/mailTest/{email}", method = RequestMethod.GET)
	public ResponseEntity<UserRequest> getUserByEmail(@PathVariable String email)
	{	
		System.out.println("[getUserByEmail]");
		UserRequest returnValue = userServiceImpl.getUserByEmail(email);
		if(returnValue == null)
			throw new NotUpdateEntityException("mailTest Issue - PLEASE CHECK the email");
		System.out.println(returnValue.toString());
		return new ResponseEntity<>(returnValue, HttpStatus.OK);
	}
	
	@RequestMapping(value="/getUserListByService/{sid}", method=RequestMethod.GET)
	public ResponseEntity<List<UserRequest>> getUserListByService(@PathVariable int sid)
	{
		List<UserRequest> users = userServiceImpl.getUserListByService(new Long(sid));
		if(users == null)
			throw new EntityNotFoundException("getUserListByService/sid Issue - PLEASE CHECK the sid ");
		return new ResponseEntity<>(users, HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/getUserList", method=RequestMethod.GET)
	public ResponseEntity<List<UserRequest>> getUserList() {
		return new ResponseEntity<>(userServiceImpl.getUserList(),HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/getUser/{uid}", method=RequestMethod.GET)
	public ResponseEntity<UserRequest> findUserById(@PathVariable Long uid) {
		UserRequest user = userServiceImpl.findUserById(uid);
		if(user==null)
			throw new EntityNotFoundException("/getUser/{uid} Issue - PLEASE CHECK the uid \r\n");
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@RequestMapping(value="/unassignedUserList", method=RequestMethod.GET)
	public ResponseEntity<List<UserRequest>> getUnassignedUserList()
	{
		return new ResponseEntity<>(userServiceImpl.getUnassignedUserList(),HttpStatus.OK);
	}
		
	@RequestMapping(value="/assignedUserList", method=RequestMethod.GET)
	public ResponseEntity<List<UserRequest>> getAssignedUserList()
	{
		return new ResponseEntity<>(userServiceImpl.getAssignedUserList(),HttpStatus.OK);
	}

	
	@RequestMapping(value="/assignUserToService/{uid}/{sid}", method=RequestMethod.PATCH)
	public ResponseEntity<Void> assignUserToService(@PathVariable Long uid, @PathVariable Long sid)
	{
		if(userServiceImpl.assignUserToService(uid, sid))
			return new ResponseEntity<Void>(HttpStatus.OK);
		throw new EntityNotFoundException("assignUsertoService Issue - PLEASE CHECK the sid/uid - ONLY a Collaborator who is not in charge of a Department can have his sid changed\r\n");
	}	

	@RequestMapping(value="/Test", method=RequestMethod.GET)
	public ResponseEntity<List<UserRequest>> getTest()
	{
		throw new NotImplementedException("Not implemented");
	}
	
}

