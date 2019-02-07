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
import com.pops1819.sid.model.ServiceRequest;
import com.pops1819.sid.services.ServiceServiceImpl;

@RestController
@CrossOrigin(origins="*", allowedHeaders="*")
public class ServiceRestController {
	@Autowired
	private ServiceServiceImpl serviceImpl;

	@RequestMapping(value = "/services", method = RequestMethod.POST)
	public ResponseEntity<Void> saveService(@RequestBody ServiceRequest serviceRequest) {
		if(serviceImpl.saveService(serviceRequest) == null)
			throw new InvalidRequestException("- Check that the user exists\r\n" + 
					"- check that the user is not a manager of another department");
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@RequestMapping(value = "/services", method = RequestMethod.GET)
	public ResponseEntity<List<ServiceRequest>> getUserList() {
		return new ResponseEntity<>(serviceImpl.getServiceList(), HttpStatus.OK);
	}

	@RequestMapping(value = "/assignUserToHeadOfService/{uid}/{sid}", method = RequestMethod.GET)
	public ResponseEntity<Void> assignUserToHeadOfService(@PathVariable Long uid, @PathVariable Long sid) {
		ServiceRequest serviceRequest = serviceImpl.assignUserToHeadOfService(uid, sid);
		if(serviceRequest == null)
			throw new EntityNotFoundException("check that the IDs are well informed.");
		if(serviceRequest.getHeadOfService() != uid)
			return new ResponseEntity<Void>(HttpStatus.NOT_MODIFIED);
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}

}
