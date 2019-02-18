package com.pops1819.sid.services;

import java.util.List;

import com.pops1819.sid.entities.Vacations;

public interface VacationService 
{
	public Vacations addVacation(String name, Double maxDays);
	public List<Vacations> getVacationListByUID(Long uid);
}
