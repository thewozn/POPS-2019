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

	@Override
	public User saveUser(UserRequest user) {
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
		vacations.forEach(e -> typeOfLeaves.add(new TypeOfLeave(e.getName(), e.getMaxDays(), e.getMaxDays(), newUser)));		
		userRepository.save(newUser);
		typeOfLeaveRepository.saveAll(typeOfLeaves);
		return newUser;
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
				System.out.println("La merda");
				return false;
			}

		user.setService(service);
		userRepository.save(user);
		return true;
	}
	
	@Override
	public UserRequest findUserByEmail(String email) {
		return mapper.getUserRequet(userRepository.findByEmail(email));
	}

}
