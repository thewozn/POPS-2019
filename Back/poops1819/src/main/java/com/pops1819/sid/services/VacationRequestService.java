package com.pops1819.sid.services;

import java.util.List;

import com.pops1819.sid.model.LeaveRequest;
import com.pops1819.sid.model.VacationRequest;

public interface VacationRequestService {

	public VacationRequest createVacationRequest(VacationRequest vacationRequest);
	public VacationRequest updateVacationRequest(VacationRequest vacationRequest);
	public boolean approveVacationRequest(Long did, Long uid);
	public boolean refuseVacationRequest(Long did, Long uid);
	public boolean cancelVacationRequest(Long did, Long uid);
	public boolean removeVacationRequest(Long did, Long uid);
	public List<VacationRequest> getVacationRequestListByUID(Long uid);
	public List<VacationRequest> getVacationRequestListBySID(Long sid);
	public List<VacationRequest> getVacationRequestListByStatus(String status);

}
