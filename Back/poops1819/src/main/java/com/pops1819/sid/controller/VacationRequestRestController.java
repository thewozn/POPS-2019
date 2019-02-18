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

import com.pops1819.sid.exception.EntityNotFoundException;
import com.pops1819.sid.exception.InvalidRequestException;
import com.pops1819.sid.exception.NotImplementedException;
import com.pops1819.sid.model.VacationRequest;
import com.pops1819.sid.services.VacationRequestServiceImpl;

import net.bytebuddy.implementation.bytecode.Throw;

@RestController
@CrossOrigin(origins="*",allowedHeaders="*")
public class VacationRequestRestController {

	@Autowired
	private VacationRequestServiceImpl vacationRequestServiceImpl;

	@RequestMapping(value = "/approveVacationRequest/{did}/{uid}", method = RequestMethod.PATCH)
	public ResponseEntity<Void> approveVacationRequest(@PathVariable Long did, @PathVariable Long uid) {
		System.out.println("[approveVacationRequest] = {"+did+"} / {"+uid+"}");
		if(!vacationRequestServiceImpl.approveVacationRequest(did, uid))
			throw new InvalidRequestException("vous ne pouvez pas changer le statut de la demande\r\n");
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/refuseVacationRequest/{did}/{uid}", method = RequestMethod.PATCH)
	public ResponseEntity<VacationRequest> refuseVacationRequest(@PathVariable Long did, @PathVariable Long uid) {
		if(!vacationRequestServiceImpl.refuseVacationRequest(did, uid))
			throw new InvalidRequestException("vous ne pouvez pas changer le statut de la demande\r\n");
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/cancelVacationRequest/{did}/{uid}", method = RequestMethod.PATCH)
	public ResponseEntity<Void> cancelVacationRequest(@PathVariable Long did, @PathVariable Long uid) {
		throw new NotImplementedException("");
	}

	@RequestMapping(value = "/createVacationRequest", method = RequestMethod.POST)
	public ResponseEntity<Void> createVacationRequest(@RequestBody VacationRequest vacationRequest) {
		System.out.println(vacationRequest.toString());
		VacationRequest returnValue = vacationRequestServiceImpl.createVacationRequest(vacationRequest);
		if (returnValue == null)
			throw new InvalidRequestException("La demande n'est pas valide\r\n"
					+ "- vérifiez que la différence entre les deux date sont supérieur a 0.\r\n"
					+ "- votre solde est est supérieur ou égal au jour que vous avez demandé");
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	public VacationRequest updateVacationRequest(VacationRequest vacationRequest) {
		throw new NotImplementedException("Not implemented");
	}

	@RequestMapping(value = "/removeVacationRequest/{did}/{uid}", method = RequestMethod.DELETE)
	public ResponseEntity<VacationRequest> removeVacationRequest(@PathVariable Long did,@PathVariable Long uid) {
		if(!vacationRequestServiceImpl.removeVacationRequest(did, uid))
			throw new EntityNotFoundException("Entity not found");
		return new ResponseEntity<VacationRequest>(HttpStatus.OK);
	}

	@RequestMapping(value = "/getVacationRequestListByUID/{uid}", method = RequestMethod.GET)
	public ResponseEntity<List<VacationRequest>> getVacationRequestListByUID(@PathVariable Long uid) {
		List<VacationRequest> returnValue = vacationRequestServiceImpl.getVacationRequestListByUID(uid);
		if(returnValue == null)
			throw new InvalidRequestException("The user does not exist");
		return new ResponseEntity<List<VacationRequest>>(returnValue, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getVacationRequestListBySID/{sid}", method = RequestMethod.GET)
	public ResponseEntity<List<VacationRequest>> getVacationRequestListBySID(@PathVariable Long sid)
	{
		return new ResponseEntity<List<VacationRequest>>(vacationRequestServiceImpl.getVacationRequestListBySID(sid),HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getVacationRequestListByStatus/{status}", method = RequestMethod.GET)
	public ResponseEntity<List<VacationRequest>> getVacationRequestListByStatus(@PathVariable String status)
	{
		return new ResponseEntity<List<VacationRequest>>(vacationRequestServiceImpl.getVacationRequestListByStatus(status),HttpStatus.OK);
	}
	
	
}
