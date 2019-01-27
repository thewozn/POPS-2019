package com.pops1819.sid.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pops1819.sid.entities.Vacations;
import com.pops1819.sid.repository.IVacationRepository;

@Service
public class VacationServiceImpl implements VacationService {

	@Autowired
	private IVacationRepository vacationRepository;

	@Override
	public Vacations addVacation(String name, Long maxDays) {
		Vacations vacation = vacationRepository.findByName(name);
		if (vacation != null)
			return vacation;
		return vacationRepository.save(new Vacations(name, maxDays));
	}

}
