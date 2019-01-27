package com.pops1819.sid.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.pops1819.sid.exception.EntityNotFoundException;
import com.pops1819.sid.exception.InvalidRequestException;
import com.pops1819.sid.exception.NotImplementedException;
import com.pops1819.sid.model.VacationRequest;
import com.pops1819.sid.services.VacationRequestServiceImpl;

@RestController
public class VacationRestController {

	@Autowired
	private VacationRequestServiceImpl vacationRequestServiceImpl;

	@RequestMapping(value = "/addVacationRequest", method = RequestMethod.POST)
	public ResponseEntity<VacationRequest> addVacationRequest(@RequestBody VacationRequest vacationRequest) {
		VacationRequest returnValue = vacationRequestServiceImpl.addVacationRequest(vacationRequest);
		if (returnValue == null)
			throw new InvalidRequestException("La demande n'est pas valide\r\n"
					+ "- vérifiez que la différence entre les deux date sont supérieur a 0.\r\n"
					+ "- votre solde est est supérieur ou égal au jour que vous avez demandé");
		return new ResponseEntity<>(returnValue, HttpStatus.CREATED);
	}

	public VacationRequest modifyVacationRequest(VacationRequest vacationRequest) {
		throw new NotImplementedException("Not implemented");
	}

	@RequestMapping(value = "/removeVacationRequest/{did}/{uid}", method = RequestMethod.DELETE)
	public ResponseEntity<VacationRequest> removeVacationRequest(@PathVariable Long did,@PathVariable Long uid) {
		if(!vacationRequestServiceImpl.removeVacationRequest(did, uid))
			throw new EntityNotFoundException("Entity not found");
		return new ResponseEntity<VacationRequest>(HttpStatus.OK);
	}

	@RequestMapping(value = "/getVacationRequestList/{uid}", method = RequestMethod.GET)
	public ResponseEntity<List<VacationRequest>> getVacationRequestList(@PathVariable Long uid) {
		List<VacationRequest> returnValue = vacationRequestServiceImpl.getVacationRequestList(uid);
		if(returnValue == null)
			throw new InvalidRequestException("The user does not exist");
		return new ResponseEntity<List<VacationRequest>>(returnValue, HttpStatus.OK);
	}

}
