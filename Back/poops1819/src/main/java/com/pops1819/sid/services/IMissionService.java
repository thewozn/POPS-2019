package com.pops1819.sid.services;

import java.util.List;

import com.pops1819.sid.model.MissionRequest;

public interface IMissionService
{
	
	public boolean createMission(MissionRequest missionRequest);
	public MissionRequest updateMission(MissionRequest missionRequest);
	public List<MissionRequest> getMissionBySID(Long sid);
	public List<MissionRequest> getMissionByUID(Long uid);
	public boolean affectUserToMission(Long mid, Long uid);
	public boolean removeUserFromMission(Long mid, Long uid);
	public boolean deleteMission(MissionRequest missionRequest);
}
