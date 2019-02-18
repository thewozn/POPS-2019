package com.pops1819.sid.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pops1819.sid.entities.TypeOfLeave;
import com.pops1819.sid.entities.User;
import com.pops1819.sid.entities.Vacations;
import com.pops1819.sid.mappers.ControllerMapper;
import com.pops1819.sid.model.UserRequest;
import com.pops1819.sid.repository.IServiceRepository;
import com.pops1819.sid.repository.ITypeOfLeaveRepository;
import com.pops1819.sid.repository.IUserRepository;
import com.pops1819.sid.repository.IVacationRepository;

@Service
public class UserServiceImpl implements UserService {

	private static String SALT = "RX065DW";
	
	public static enum USER_STATUS {
		HeadOfService,
		Collaborator,
		Administrator;			
	};

	
	
	@Autowired
	private IUserRepository userRepository;
	@Autowired
	private IServiceRepository serviceRepository;
	@Autowired
	private IVacationRepository vacationRepository;
	@Autowired
	private ControllerMapper mapper;
	@Autowired
	private ITypeOfLeaveRepository typeOfLeaveRepository;
	
//	MessageDigest
	@Override
	public User createUser(UserRequest user) {
		if (userRepository.existsByEmail(user.getEmail()))
			return null;
		User newUser = mapper.getUser(user);
		if (user.getSid() != null) {
			com.pops1819.sid.entities.Service service = serviceRepository.findBySid(user.getSid());
			if (service != null)
				newUser.setService(service);
			else
				return null;
		}
		List<Vacations> vacations = vacationRepository.findAll();
		List<TypeOfLeave> typeOfLeaves = new ArrayList<TypeOfLeave>();
		if(newUser.getStatus() == null)
			newUser.setStatus(USER_STATUS.Collaborator.name());
		if(!newUser.getStatus().equals(USER_STATUS.Collaborator.name()))
			return null;
		
		vacations.forEach(e -> typeOfLeaves.add(new TypeOfLeave(e.getMaxDays(), e, newUser)));
		userRepository.save(newUser);
		typeOfLeaveRepository.saveAll(typeOfLeaves);
		return newUser;
	}
	
	@Override
	public UserRequest getUserByEmail(String email)
	{
		if(userRepository.existsByEmail(email))
			return mapper.getUserRequet(userRepository.findByEmail(email));
		return null;
	}
	

	@Override
	public List<UserRequest> getUserList() {
		return mapper.getUserRequetList(userRepository.findAll());
	}

	@Override
	public UserRequest findUserById(Long uid) {
		return mapper.getUserRequet(userRepository.findByUid(uid));
	}

	/**
	 * Les utilisateurs qui n'ont pas de service
	 */
	@Override
	public List<UserRequest> getUnassignedUserList() {
		return mapper.getUserRequetList(userRepository.findByServiceIsNull());
	}

	@Override
	public List<UserRequest> getAssignedUserList() {
		return mapper.getUserRequetList(userRepository.findByServiceIsNotNull());
	}

	@Override
	public List<UserRequest> getUserListByService(Long sid) {
		if (!serviceRepository.existsById(sid))
			return null;
		return mapper.getUserRequetList(userRepository.findByService(serviceRepository.getOne(sid)));
	}

	@Override
	public boolean assignUserToService(Long uid, Long sid) {
		User user = userRepository.findByUid(uid);
		com.pops1819.sid.entities.Service service = serviceRepository.findBySid(sid);
		if (user == null || service == null)
			return false;

		if (user.getMyService() != null)
			if (user.getMyService().getSid() != service.getSid()) {
				return false;
			}

		user.setService(service);
		userRepository.save(user);
		return true;
	}

	public boolean updateUser(UserRequest userRequest) {

		User userUpdated = mapper.getUser(userRequest);
		User user = userRepository.findByUid(userRequest.getUid());

		if (user == null || userUpdated == null)
			return false;
		com.pops1819.sid.entities.Service service = null;
		if (userRequest.getSid() != null) {
			service = serviceRepository.findBySid(userRequest.getSid());
			if (service == null)
				return false;
		}

		if (user.getMyService() != null)
			return false;

		userUpdated.setService(service);

		if (userUpdated.getStatus().toLowerCase().equals("headofservice")) {
			if (user.getStatus() != null)
				if (user.getStatus().toLowerCase().equals("headofservice"))
					return false;
			User lastHeadOfService = service.getHeadOfService();
			lastHeadOfService.setMyService(null);
			lastHeadOfService.setStatus("Collaborator");
			userUpdated.setService(service);
			userUpdated.setMyService(service);
			service.setHeadOfService(userUpdated);
			System.out.println("tout est bon");
			userRepository.save(lastHeadOfService);
		} else if (userUpdated.getStatus().toLowerCase().equals("collaborator")) {
			userUpdated.setStatus("Collaborator");
			userUpdated.setService(service);

		} else {
			return false;
		}

		serviceRepository.save(service);
		userRepository.save(userUpdated);

		return true;
	}

	@Override
	public UserRequest authentication(String email, String password) {
		return mapper.getUserRequet(userRepository.findByEmailAndPassword(email, password));
	}


	
	
	
	

//	@Override
//	public boolean updateUser(UserRequest userRequest) {
//		User user = userRepository.findByUid(userRequest.getUid());
//		User userUpdated = mapper.getUser(userRequest);
//
//		if(user == null)
//			return false;
//
//		com.pops1819.sid.entities.Service service = serviceRepository.findBySid(userRequest.getSid());
//		if (service == null)
//			return false;
//
//		if(user.getService() != null)
//		{
//			if(user.getService().getSid() != userRequest.getSid())
//			{
//				if (user.getMyService() != null)
//				{
//					if (user.getMyService().getSid() != service.getSid()) 
//						return false;
//				}
//				if(user.getStatus().toLowerCase().equals("headOfService"))
//				{
//					User lastHeadOfService = service.getHeadOfService();
//					service.setHeadOfService(user);
//					if(lastHeadOfService != null)
//						lastHeadOfService.setMyService(null);
//					lastHeadOfService.setStatus("Collaborateur");
//					userRepository.save(lastHeadOfService);
//					userUpdated.setService(service);
//					serviceRepository.save(service);
//				}
//				
//			}
//		}
//		
//
//		userUpdated.setService(service);
//		
//		userRepository.save(userUpdated);
//
//		return true;
//	}

}
