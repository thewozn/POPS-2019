package com.pops1819.sid.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pops1819.sid.entities.Vacations;

public interface IVacationRepository extends JpaRepository<Vacations, Long>{

	public Vacations findByName(String name);

	public Vacations findByVid(Long vid);

}
