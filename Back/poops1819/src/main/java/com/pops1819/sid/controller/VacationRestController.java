package com.pops1819.sid.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.pops1819.sid.entities.Vacations;
import com.pops1819.sid.services.VacationServiceImpl;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class VacationRestController {

	@Autowired
	private VacationServiceImpl vacationServiceImpl;

	public Vacations addVacation(String name, Double maxDays) {
		return vacationServiceImpl.addVacation(name, maxDays);
	}

	@RequestMapping(value = "/getVacationList/{uid}", method = RequestMethod.GET)
	public List<Vacations> getVacationList(@PathVariable Long uid) {
		return vacationServiceImpl.getVacationListByUID(uid);
	}

}
