package com.pops1819.sid.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pops1819.sid.entities.TypeOfLeave;

public interface ITypeOfLeaveRepository extends JpaRepository<TypeOfLeave, Long>{

	public TypeOfLeave findByTcid(Long tcid);

    @Query("SELECT t FROM TypeOfLeave t WHERE t.user.uid = ?1 AND t.vacations.vid = ?2")
	public TypeOfLeave findByUidAndVid(Long uid, Long vid);

    @Query("SELECT t FROM TypeOfLeave t WHERE t.user.uid = ?1")
	public List<TypeOfLeave> findByUid(Long uid);
	

}
