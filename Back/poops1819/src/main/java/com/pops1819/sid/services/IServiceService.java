package com.pops1819.sid.services;

import java.util.List;

import com.pops1819.sid.model.ServiceRequest;

public interface IServiceService
{
	public com.pops1819.sid.entities.Service createService(ServiceRequest service);
	public boolean updateService(ServiceRequest serviceRequest);
	public ServiceRequest assignUserToHeadOfService(Long uid, Long sid);
	public List<ServiceRequest> getServiceList();
}
