package com.pops1819.sid.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pops1819.sid.entities.Balance;

public interface IBalanceRepository extends JpaRepository<Balance, Long>{

	public Balance findByBid(Long bid);

    @Query("SELECT t FROM Balance t WHERE t.user.uid = ?1 AND t.vacations.vid = ?2")
	public Balance findByUidAndVid(Long uid, Long vid);

    @Query("SELECT t FROM Balance t WHERE t.user.uid = ?1")
	public List<Balance> findByUid(Long uid);
	

}
