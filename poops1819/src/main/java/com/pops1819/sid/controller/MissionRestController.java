package com.pops1819.sid.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.pops1819.sid.exception.EntityNotCreatedException;
import com.pops1819.sid.exception.EntityNotFoundException;
import com.pops1819.sid.exception.NotUpdateEntityException;
import com.pops1819.sid.model.MissionRequest;
import com.pops1819.sid.services.MissionServiceImpl;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MissionRestController {
	@Autowired
	private MissionServiceImpl missionServiceImpl;

	@RequestMapping(value = "/createMission", method = RequestMethod.POST)
	public ResponseEntity<MissionRequest> createMission(@RequestBody MissionRequest missionRequest) {
		System.out.println(missionRequest.toString());
		MissionRequest newM = missionServiceImpl.createMission(missionRequest);
		if (newM == null)
			throw new EntityNotCreatedException("");
		return new ResponseEntity<>(newM, HttpStatus.OK);
	}

	
	@RequestMapping(value = "/updateMission", method = RequestMethod.PATCH)
	public ResponseEntity<MissionRequest> updateMission(@RequestBody MissionRequest missionRequest)
	{
		MissionRequest returnValue = missionServiceImpl.updateMission(missionRequest);
		if(returnValue == null)
			throw new NotUpdateEntityException("");
		return new ResponseEntity<MissionRequest>(returnValue, HttpStatus.OK);
	}

	@RequestMapping(value = "/getMissionBySID/{sid}", method = RequestMethod.GET)
	public ResponseEntity<List<MissionRequest>> getMissionBySID(@PathVariable Long sid) {
		List<MissionRequest> returnValue = missionServiceImpl.getMissionBySID(sid);
		if(returnValue == null)
			throw new EntityNotFoundException("");
		return new ResponseEntity<>(returnValue, HttpStatus.OK);
	}

	@RequestMapping(value = "/getMissionByUID/{uid}", method = RequestMethod.GET)
	public ResponseEntity<List<MissionRequest>> getMissionByUID(@PathVariable Long uid) {
		List<MissionRequest> returnValue = missionServiceImpl.getMissionByUID(uid);
		if(returnValue == null)
			throw new EntityNotFoundException("");
		return new ResponseEntity<>(returnValue, HttpStatus.OK);	
	}

	@RequestMapping(value = "/affectUserToMission/{mid}/{uid}", method = RequestMethod.POST)
	public ResponseEntity<Void> affectUserToMission(@PathVariable Long mid, @PathVariable Long uid) {
		if (!missionServiceImpl.affectUserToMission(mid, uid))
			throw new NotUpdateEntityException("");
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@RequestMapping(value = "/removeUserFromMission/{mid}/{uid}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> removeUserFromMission(@PathVariable Long mid, @PathVariable Long uid) {
		if (!missionServiceImpl.removeUserFromMission(mid, uid))
			throw new NotUpdateEntityException("");
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/deleteMission/{mid}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteMission(@PathVariable Long mid) {
		if(!missionServiceImpl.deleteMission(mid))
			throw new NotUpdateEntityException("");
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@RequestMapping(value = "/acceptUserRequestedForMission/{mid}/{uid}", method = RequestMethod.PATCH)
	public ResponseEntity<Void> acceptUserRequestedForMission(@PathVariable Long uid, @PathVariable Long mid) {
		if(!missionServiceImpl.acceptUserRequestedForMission(uid, mid))
			throw new NotUpdateEntityException("");
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@RequestMapping(value = "/refuseUserRequestedForMission/{mid}/{uid}", method = RequestMethod.PATCH)
	public ResponseEntity<Void> refuseUserRequestedForMission(@PathVariable Long uid, @PathVariable Long mid) {
		if(!missionServiceImpl.refuseUserRequestedForMission(uid, mid))
			throw new NotUpdateEntityException("");
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getMissionByOverSID/{sid}", method = RequestMethod.GET)
	public ResponseEntity<List<MissionRequest>> getMissionByOverSID(@PathVariable Long sid) {
		return new ResponseEntity<List<MissionRequest>>(missionServiceImpl.getMissionByOverSID(sid),HttpStatus.OK);
	}

	
	

}
