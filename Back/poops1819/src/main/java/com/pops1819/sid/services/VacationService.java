package com.pops1819.sid.services;

import com.pops1819.sid.entities.Vacations;

public interface VacationService 
{
	public Vacations addVacation(String name, Long maxDays);
}
