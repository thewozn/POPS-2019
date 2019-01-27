package com.pops1819.sid.services;

import java.util.List;

import com.pops1819.sid.model.LeaveRequest;
import com.pops1819.sid.model.VacationRequest;

public interface VacationRequestService {

	public VacationRequest addVacationRequest(VacationRequest vacationRequest);
	public VacationRequest modifyVacationRequest(VacationRequest vacationRequest);
	public boolean removeVacationRequest(Long did, Long uid);
	public List<VacationRequest> getVacationRequestList(Long uid);
}
