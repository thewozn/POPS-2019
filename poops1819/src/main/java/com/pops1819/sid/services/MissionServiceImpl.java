package com.pops1819.sid.services;

import java.util.ArrayList;
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
	public MissionRequest createMission(MissionRequest missionRequest) {
		Mission newMission = mapper.getMission(missionRequest);
		com.pops1819.sid.entities.Service service = serviceRepository.findBySid(missionRequest.getSid());
		
		if(service == null  || newMission == null)
			return null;
		newMission.setService(service);
		return mapper.getMissionRequest(missionRepository.save(newMission));
		
	}

	/*
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
	*/
	
	@Override
	public MissionRequest updateMission(MissionRequest missionRequest) {
		
		Mission missionToUpdate = missionRepository.findByMid(missionRequest.getMid());
		com.pops1819.sid.entities.Service service = serviceRepository.findBySid(missionRequest.getSid());
		if(service == null  || missionToUpdate == null)
			return null;
		
		Mission newMission =  mapper.getMission(missionRequest);

		
		missionToUpdate.setTitle(newMission.getTitle());
		missionToUpdate.setDescription(newMission.getDescription());
		missionToUpdate.setStatus(newMission.getStatus());
		missionToUpdate.setStartDate(newMission.getStartDate());
		missionToUpdate.setEndDate(newMission.getEndDate());		
		
		
		missionToUpdate.setService(service);
		missionRepository.save(missionToUpdate);

		return mapper.getMissionRequest(missionToUpdate);
	}



	@Override
	public List<MissionRequest> getMissionBySID(Long sid) {
		com.pops1819.sid.entities.Service service = serviceRepository.findBySid(sid);
		if(service == null)
			return null;
		
		List<Mission> lmission = missionRepository.findAll();
		List<Mission> toreturn = new ArrayList<>();
		for (Mission m : lmission) {
			for (User u : m.getUsers()) {
				if(u.getService().getSid() == sid && !(toreturn.contains(m))) {
					toreturn.add(m);
				}
			}
			
			for (User u : m.getRefusedUsers()) {
				if(u.getService().getSid() == sid && !(toreturn.contains(m))) {
					toreturn.add(m);
				}
			}
			
			for (User u : m.getRequestedUsers()) {
				if(u.getService().getSid() == sid && !(toreturn.contains(m))) {
					toreturn.add(m);
				}
			}
			
			if (m.getService().getSid() == sid && !(toreturn.contains(m))) {
				toreturn.add(m);
			}
		}
		
		return mapper.getMissionRequestList(toreturn);
		// return mapper.getMissionRequestList(missionRepository.findByService(service));
		
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

	@Transactional
	@Override
	public boolean removeUserFromMission(Long mid, Long uid) {
		User user = userRepository.findByUid(uid);
		Mission mission = missionRepository.findByMid(mid);
		
		if(user == null || mission ==null)
			return false;
		
		mission.removeUser(user);
		mission.removeRequestUser(user);
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
	
	@Override
	public MissionRequest getMissionByMID(Long mid) {		
		if(!missionRepository.existsById(mid)) {
			return null;
		}
		return mapper.getMissionRequest(missionRepository.findByMid(mid));
	}
}
