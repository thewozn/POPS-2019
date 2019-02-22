package com.pops1819.sid.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pops1819.sid.entities.TypeOfLeave;
import com.pops1819.sid.entities.Vacations;
import com.pops1819.sid.repository.ITypeOfLeaveRepository;
import com.pops1819.sid.repository.IVacationRepository;

@Service
public class VacationServiceImpl implements VacationService {

	@Autowired
	private IVacationRepository vacationRepository;
	@Autowired
	private ITypeOfLeaveRepository typeOfLeaveRepository;

	
	@Override
	public Vacations addVacation(String name, Double maxDays) {
		Vacations vacation = vacationRepository.findByName(name);
		if (vacation != null)
			return vacation;
		return vacationRepository.save(new Vacations(name, maxDays));
	}

	@Override
	public List<Vacations> getVacationListByUID(Long uid)
	{
		List<TypeOfLeave> typeOfLeave = typeOfLeaveRepository.findByUid(uid);
		if(typeOfLeave == null)
			return null;
		List<Vacations> returnValue = new ArrayList<Vacations>();
		typeOfLeave.forEach(v -> returnValue.add(new Vacations(v.getVacations().getVid(), v.getVacations().getName(), v.getRemainingBalance())));
		return vacationRepository.findAll();
	}
	

}
