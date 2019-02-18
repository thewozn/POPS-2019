package com.pops1819.sid.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pops1819.sid.entities.Service;
import com.pops1819.sid.entities.User;

public interface IServiceRepository extends JpaRepository<Service, Long> {
	public Service findBySid(Long sid);
	public Service findByHeadOfService(Long headOfService);
	public boolean existsByName(String email);
	public boolean existsBySid(Long sid);


}
