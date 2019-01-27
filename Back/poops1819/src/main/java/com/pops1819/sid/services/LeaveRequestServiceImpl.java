package com.pops1819.sid.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pops1819.sid.mappers.ControllerMapper;
import com.pops1819.sid.model.LeaveRequest;
import com.pops1819.sid.repository.IHolidayRequestRepository;
import com.pops1819.sid.repository.ITypeOfLeaveRepository;
import com.pops1819.sid.repository.IUserRepository;

@Service
public class LeaveRequestServiceImpl implements LeaveRequestService {

	public static final long MILLIS_PER_DAY = 24 * 3600 * 1000;

	@Autowired
	private ITypeOfLeaveRepository typeOfLeaveRepository;

	@Autowired
	private IUserRepository userRepository;

	@Autowired
	private IHolidayRequestRepository holidayRequestRepository;

	@Autowired
	private ControllerMapper mapper;

	@Override
	public LeaveRequest addLeaveRequest(LeaveRequest leaveRequest) {
		return null;
	}

	@Override
	public LeaveRequest modifyLeaveRequest(LeaveRequest leaveRequest) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public LeaveRequest removeLeaveRequest(LeaveRequest leaveRequest) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<LeaveRequest> getLeaveRequestList(Long uid) {
		
		return null;
	}


}
