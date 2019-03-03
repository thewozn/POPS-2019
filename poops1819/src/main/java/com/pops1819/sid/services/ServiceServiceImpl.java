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
	public com.pops1819.sid.entities.Service createService(ServiceRequest serviceRequest)
	{
		com.pops1819.sid.entities.Service newService = mapper.getService(serviceRequest);
		
		if(serviceRepository.existsByName(newService.getName()))
			return null;
		
		User user = userRepository.findByUid(serviceRequest.getHeadOfService());
		if(user == null) 
			return null;
		if(user.getMyService() != null)
			return null;
		
		user.setStatus("HeadOfService");
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
			lastHeadOfService.setStatus("Collaborator");
			user.setService(service);
			user.setStatus("HeadOfService");
			userRepository.save(lastHeadOfService);
			userRepository.save(user);
			serviceRepository.save(service);	
		}		
		return mapper.getServiceRequest(service);
	}


	@Override
	public boolean updateService(ServiceRequest serviceRequest) {
		
		com.pops1819.sid.entities.Service service = serviceRepository.findBySid(serviceRequest.getSid());
		if(service == null)
			return false;
		
		if(!service.getName().toLowerCase().equals(serviceRequest.getName().toLowerCase()))
		{
			if(serviceRepository.existsByName(serviceRequest.getName()))
				return false;
		}
		
		if(service.getHeadOfService() == null)
			return false;
		
		if(serviceRequest.getHeadOfService().intValue() != service.getHeadOfService().getUid())
		{
			User user = userRepository.findByUid(serviceRequest.getHeadOfService());
			if(user == null)
			{
				// l'utilisateur n'existe pas
				return false;
			}
			// on vérifie que l'utlisateur n'est pas chef de service
			if(user.getMyService() != null) 
				return false;
			user.setService(service);
			user.setStatus("HeadOfService");
			userRepository.save(user);
			
			User lastHeadOfService = userRepository.findByUid(service.getHeadOfService().getUid());
			lastHeadOfService.setStatus("Collaborator");
			lastHeadOfService.setMyService(null);
		}
		
		com.pops1819.sid.entities.Service serviceUpdated = mapper.getService(serviceRequest);
		serviceRepository.save(serviceUpdated);
		return true;
	}

	public ServiceRequest getServiceBySID(Long sid)
	{
		return mapper.getServiceRequest(serviceRepository.findBySid(sid));
	}

	
}
