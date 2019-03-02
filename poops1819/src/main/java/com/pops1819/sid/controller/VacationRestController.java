package com.pops1819.sid.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.pops1819.sid.entities.Vacations;
import com.pops1819.sid.exception.InvalidRequestException;
import com.pops1819.sid.model.VacationRequest;
import com.pops1819.sid.services.VacationServiceImpl;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class VacationRestController {

	@Autowired
	private VacationServiceImpl vacationServiceImpl;

	public Vacations addVacation(String name, Double maxDays) {
		return vacationServiceImpl.addVacation(name, maxDays);
	}

	@RequestMapping(value = "/getVacationListByUID/{uid}", method = RequestMethod.GET)
	public List<Vacations> getVacationListByUID
	(@PathVariable Long uid) {
		return vacationServiceImpl.getVacationListByUID(uid);
	}
	
	//NEW
	@RequestMapping(value = "/getVacationListAll", method = RequestMethod.GET)
	public ResponseEntity<List<Vacations>> getVacationListAll() {
		return new ResponseEntity<List<Vacations>>(vacationServiceImpl.getVacationListAll(), HttpStatus.OK);
	}
	

}
