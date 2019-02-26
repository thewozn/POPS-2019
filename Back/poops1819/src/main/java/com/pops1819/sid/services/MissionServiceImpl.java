package com.pops1819.sid.services;

import java.util.List;

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
		
		if(mission.getUsers().contains(user))
			return false;

		mission.addUser(user);
		
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
	public boolean deleteMission(MissionRequest missionRequest) {
		Mission mission = missionRepository.findByMid(missionRequest.getMid());

		if(mission == null)
			return false;
		
		mission.removeAllUsers();
		
		missionRepository.deleteByMid(mission.getMid());
		
		return true;
	}

	
	
}