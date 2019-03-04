package com.pops1819.sid.services;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pops1819.sid.entities.Mission;
import com.pops1819.sid.entities.User;
import com.pops1819.sid.mappers.ControllerMapper;
import com.pops1819.sid.model.MissionRequest;
import com.pops1819.sid.repository.IMissionRepository;
import com.pops1819.sid.repository.IServiceRepository;
import com.pops1819.sid.repository.IUserRepository;

@Service
public class MissionServiceImpl implements IMissionService
{
	@Autowired
	private IUserRepository userRepository;
	
	@Autowired
	private IServiceRepository serviceRepository;
	
	@Autowired
	private IMissionRepository missionRepository;

	@Autowired
	private ControllerMapper mapper;

	@Override
	public boolean createMission(MissionRequest missionRequest) {
		Mission newMission = mapper.getMission(missionRequest);
		com.pops1819.sid.entities.Service service = serviceRepository.findBySid(missionRequest.getSid());
		
		if(service == null  || newMission == null)
			return false;
		newMission.setService(service);
		missionRepository.save(newMission);
		return true;
	}

	@Override
	public MissionRequest updateMission(MissionRequest missionRequest) {
		
		Mission missionToUpdate = missionRepository.findByMid(missionRequest.getMid());
		com.pops1819.sid.entities.Service service = serviceRepository.findBySid(missionRequest.getSid());
		if(service == null  || missionToUpdate == null)
			return null;
		
		missionToUpdate = mapper.getMission(missionRequest);
		missionToUpdate.setService(service);
		missionRepository.save(missionToUpdate);

		return mapper.getMissionRequest(missionToUpdate);
	}

	@Override
	public List<MissionRequest> getMissionBySID(Long sid) {
		com.pops1819.sid.entities.Service service = serviceRepository.findBySid(sid);
		if(service == null)
			return null;
		return mapper.getMissionRequestList(missionRepository.findByService(service));
		
	}

	@Override
	public List<MissionRequest> getMissionByUID(Long uid) {
		User user = userRepository.findByUid(uid);
		if(user == null)
			return null;
		
		return mapper.getMissionRequestList(user.getMissions());
	}

	@Override
	public boolean affectUserToMission(Long mid, Long uid) {
		User user = userRepository.findByUid(uid);
		Mission mission = missionRepository.findByMid(mid);
		
		if(user == null || mission == null)
			return false;
		
		if(user.getService() == null)
			 return false;
		
		if(mission.getUsers().contains(user) || mission.getRequestedUsers().contains(user))
			return false;
		
		
		if(user.getService().equals(mission.getService()))
		{
			mission.addUser(user);
		}else
		{
			mission.addRequestUser(user);
		}
		
		userRepository.save(user);
		missionRepository.save(mission);
		
		return true;
	}

	@Override
	public boolean removeUserFromMission(Long mid, Long uid) {
		User user = userRepository.findByUid(uid);
		Mission mission = missionRepository.findByMid(mid);
		
		if(user == null || mission ==null)
			return false;
		
		mission.removeUser(user);
		
		userRepository.save(user);
		missionRepository.save(mission);
		return true;
	}

    @Transactional
	@Override
	public boolean deleteMission(Long mid) {
		Mission mission = missionRepository.findByMid(mid);

		if(mission == null)
			return false;
		
		mission.removeAllUsers();
		
		missionRepository.deleteByMid(mission.getMid());
		
		return true;
	}

	@Override
	public boolean acceptUserRequestedForMission(Long uid, Long mid) {
		User user = userRepository.findByUid(uid);
		Mission mission = missionRepository.findByMid(mid);
		
		if(user == null || mission ==null)
			return false;
		
		if(!mission.getRequestedUsers().contains(user))
			return false;
		
		if(mission.getUsers().contains(user))
			return false;
		
		mission.removeRequestUser(user);
		mission.addUser(user);
		
		userRepository.save(user);
		missionRepository.save(mission);		
		return true;
	}

	@Override
	public boolean refuseUserRequestedForMission(Long uid, Long mid) {
		User user = userRepository.findByUid(uid);
		Mission mission = missionRepository.findByMid(mid);
		
		if(user == null || mission ==null)
			return false;
		
		if(!mission.getRequestedUsers().contains(user))
			return false;
		
		mission.removeRequestUser(user);
		mission.addRefusedUser(user);
		
		userRepository.save(user);
		missionRepository.save(mission);		
		return true;
	}

	//TODO
	@Override
	public List<MissionRequest> getMissionByOverSID(Long sid) {
		com.pops1819.sid.entities.Service service = serviceRepository.findBySid(sid);
		if(service == null)
			return null;
		
		HashSet<Mission> returnValue = new HashSet<>();

		List<User> users = service.getUsers();
		
		users.forEach(u-> returnValue.addAll(u.getMissionsRequest()));
		return mapper.getMissionRequestList(returnValue.stream().collect(Collectors.toList()));	
	}
	
	
}
