package com.pops1819.sid.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pops1819.sid.entities.Mission;
import com.pops1819.sid.entities.Service;
import com.pops1819.sid.entities.User;

public interface IMissionRepository extends JpaRepository<Mission, Long>{

	Mission findByMid(Long mid);
	
	
	List<Mission> findByService(Service sid);


	void deleteByMid(Long mid);


	

}
