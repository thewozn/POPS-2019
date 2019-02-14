package com.pops1819.sid.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.pops1819.sid.exception.InvalidRequestException;
import com.pops1819.sid.exception.NotImplementedException;
import com.pops1819.sid.model.LeaveRequest;
import com.pops1819.sid.services.LeaveRequestServiceImpl;

@RestController
public class LeaveRestController {

	@Autowired
	private LeaveRequestServiceImpl leaveRequestServiceImpl;
	
	@RequestMapping(value = "/modifyLeaveRequest", method = RequestMethod.POST)
	public LeaveRequest modifyLeaveRequest(LeaveRequest leaveRequest) {
		throw new NotImplementedException("Not implemented");
	}

	@RequestMapping(value = "/leaveRequest", method = RequestMethod.POST)
	public LeaveRequest leaveRequest(LeaveRequest leaveRequest) {
		throw new NotImplementedException("Not implemented");
	}

	@RequestMapping(value = "/getLeaveRequestList", method = RequestMethod.POST)
	public List<LeaveRequest> getLeaveRequestList(Long uid) {
		throw new NotImplementedException("Not implemented");
	}

	@RequestMapping(value = "/addLeaveRequest", method = RequestMethod.POST)
	public ResponseEntity<LeaveRequest> addLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
		throw new NotImplementedException("Not implemented");

	}

	
}
