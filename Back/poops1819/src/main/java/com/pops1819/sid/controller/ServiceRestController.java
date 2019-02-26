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

import com.pops1819.sid.exception.EntityNotFoundException;
import com.pops1819.sid.exception.InvalidRequestException;
import com.pops1819.sid.exception.NotUpdateEntityException;
import com.pops1819.sid.model.ServiceRequest;
import com.pops1819.sid.model.UserRequest;
import com.pops1819.sid.services.ServiceServiceImpl;

@RestController
@CrossOrigin(origins="*",allowedHeaders="*")
public class ServiceRestController {
	@Autowired
	private ServiceServiceImpl serviceImpl;

	@RequestMapping(value = "/createService", method = RequestMethod.POST)
	public ResponseEntity<Void> createService(@RequestBody ServiceRequest serviceRequest) {
		if(serviceImpl.createService(serviceRequest) == null)
			throw new InvalidRequestException("createService Issue - PLEASE CHECK that the user|service exists"
					+ "ONLY a Collaborator who is not in charge of a Department can be designed as a HeadOfService\r\n" + 
					"PLEASE CHECK that the service name is not already taken");
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@RequestMapping(value = "/updateService", method = RequestMethod.PATCH)
	public ResponseEntity<Void> updateService(@RequestBody ServiceRequest serviceRequest)
	{	
			if(!serviceImpl.updateService(serviceRequest))
				throw new NotUpdateEntityException("udpateServie Issue - PLEASE CHECK that the service exists");
			return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getServiceList", method = RequestMethod.GET)
	public ResponseEntity<List<ServiceRequest>> getServiceList() {
		return new ResponseEntity<>(serviceImpl.getServiceList(), HttpStatus.OK);
	}
	
	@RequestMapping(value="/getServiceBySID/{sid}", method=RequestMethod.GET)
	public ResponseEntity<ServiceRequest> getServiceBySID(@PathVariable Long sid) {
		ServiceRequest serviceRequest = serviceImpl.getServiceBySID(sid);
		if(serviceRequest ==null)
			throw new EntityNotFoundException("getServiceBySID/{sid} Issue - PLESE CHECK the sid");
		return new ResponseEntity<>(serviceRequest, HttpStatus.OK);
	}
	

	@RequestMapping(value = "/assignUserToHeadOfService/{uid}/{sid}", method = RequestMethod.PATCH)
	public ResponseEntity<Void> assignUserToHeadOfService(@PathVariable Long uid, @PathVariable Long sid) {
		ServiceRequest serviceRequest = serviceImpl.assignUserToHeadOfService(uid, sid);
		if(serviceRequest == null)
			throw new EntityNotFoundException("assignUserToHeadOfService/{uid}/{sid} - PLEASE CHECK check uid/sid");
		if(serviceRequest.getHeadOfService() != uid)
			return new ResponseEntity<Void>(HttpStatus.NOT_MODIFIED);
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}

}
