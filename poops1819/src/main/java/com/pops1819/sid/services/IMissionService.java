package com.pops1819.sid.services;

import java.util.List;
import java.util.Set;

import com.pops1819.sid.model.MissionRequest;

public interface IMissionService
{
	public boolean createMission(MissionRequest missionRequest);
	public MissionRequest updateMission(MissionRequest missionRequest);
	public List<MissionRequest> getMissionBySID(Long sid);
	public List<MissionRequest> getMissionByOverSID(Long sid);
	public List<MissionRequest> getMissionByUID(Long uid);
	public boolean affectUserToMission(Long mid, Long uid);
	public boolean acceptUserRequestedForMission(Long uid, Long mid);
	public boolean refuseUserRequestedForMission(Long uid, Long mid);
	public boolean removeUserFromMission(Long mid, Long uid);
	public boolean deleteMission(MissionRequest missionRequest);
}
