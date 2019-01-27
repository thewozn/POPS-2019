package com.pops1819.sid.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pops1819.sid.entities.User;
import com.pops1819.sid.mappers.ControllerMapper;
import com.pops1819.sid.model.ServiceRequest;
import com.pops1819.sid.repository.IServiceRepository;
import com.pops1819.sid.repository.IUserRepository;

@Service
public class ServiceServiceImpl implements IServiceService
{
	@Autowired
	private IUserRepository userRepository;
	@Autowired
	private IServiceRepository serviceRepository;
	@Autowired
	private ControllerMapper mapper;

	@Override
	public com.pops1819.sid.entities.Service saveService(ServiceRequest serviceRequest)
	{
		com.pops1819.sid.entities.Service newService = mapper.getService(serviceRequest);
		User user = userRepository.findByUid(serviceRequest.getHeadOfService());
		if(user == null) 
			return null;
		if(user.getMyService() != null)
			return null;
		
		user.setService(newService);
		
		return serviceRepository.save(newService);
	}

	@Override
	public List<ServiceRequest> getServiceList() {
		return mapper.getServiceRequestList(serviceRepository.findAll());
	}

	@Override
	public ServiceRequest assignUserToHeadOfService(Long uid, Long sid) {
		User user = userRepository.findByUid(uid);
		com.pops1819.sid.entities.Service service = serviceRepository.findBySid(sid);
		if(user == null || service == null)
			return null;
		if(user.getMyService() == null)
		{
			User lastHeadOfService = service.getHeadOfService();
			service.setHeadOfService(user);
			if(lastHeadOfService != null)
				lastHeadOfService.setMyService(null);
			user.setService(service);
			userRepository.save(user);
			serviceRepository.save(service);	
		}		
		return mapper.getServiceRequest(service);
	}
	
	
}
