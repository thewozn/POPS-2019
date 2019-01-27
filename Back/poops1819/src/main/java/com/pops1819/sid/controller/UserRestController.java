package com.pops1819.sid.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.pops1819.sid.exception.EntityNotFoundException;
import com.pops1819.sid.exception.NotImplementedException;
import com.pops1819.sid.model.UserRequest;
import com.pops1819.sid.services.UserServiceImpl;

@RestController
public class UserRestController 
{
	@Autowired
	private UserServiceImpl userServiceImpl;
 
	@RequestMapping(value = "/users", method = RequestMethod.POST)
	public ResponseEntity<Void> saveUser(@RequestBody UserRequest user) {
		if(userServiceImpl.saveUser(user) == null)
			throw new EntityNotFoundException("check that the service exists!");
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/users", method=RequestMethod.GET)
	public ResponseEntity<List<UserRequest>> getUserList() {
		return new ResponseEntity<>(userServiceImpl.getUserList(),HttpStatus.OK);
	}
	
	@RequestMapping(value="/users/{uid}", method=RequestMethod.GET)
	public ResponseEntity<UserRequest> findUserById(@PathVariable Long uid) {
		UserRequest user = userServiceImpl.findUserById(uid);
		if(user==null)
			throw new EntityNotFoundException("user not exist with uid : "+uid);
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

	@RequestMapping(value="/userListByService/{sid}", method=RequestMethod.GET)
	public ResponseEntity<List<UserRequest>> getUserListByService(@PathVariable int sid)
	{
		List<UserRequest> users = userServiceImpl.getUserListByService(new Long(sid));
		if(users == null)
			throw new EntityNotFoundException("service not exist with sid :"+sid);
		return new ResponseEntity<>(users, HttpStatus.OK);
	}
	
	@RequestMapping(value="/assignUserToService/{uid}/{sid}", method=RequestMethod.GET)
	public ResponseEntity<Void> assignUserToService(@PathVariable Long uid, @PathVariable Long sid)
	{
		if(userServiceImpl.assignUserToService(uid, sid))
			return new ResponseEntity<Void>(HttpStatus.OK);
		throw new EntityNotFoundException("check that the IDs are well informed,\r\n" + 
										"That the employee is not a head of another department");
	}
	

	@RequestMapping(value="/Test", method=RequestMethod.GET)
	public ResponseEntity<List<UserRequest>> getTest()
	{
		throw new NotImplementedException("Not implemented");
	}
	
}

