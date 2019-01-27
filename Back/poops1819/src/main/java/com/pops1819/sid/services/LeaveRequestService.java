package com.pops1819.sid.services;

import java.util.List;

import com.pops1819.sid.model.LeaveRequest;

public interface LeaveRequestService {
	
	public LeaveRequest addLeaveRequest(LeaveRequest leaveRequest);
	public LeaveRequest modifyLeaveRequest(LeaveRequest leaveRequest);
	public LeaveRequest removeLeaveRequest(LeaveRequest leaveRequest);
	public List<LeaveRequest> getLeaveRequestList(Long uid);
}
