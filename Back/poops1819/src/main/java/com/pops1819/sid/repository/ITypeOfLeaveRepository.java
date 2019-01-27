package com.pops1819.sid.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pops1819.sid.entities.TypeOfLeave;
import com.pops1819.sid.entities.User;

public interface ITypeOfLeaveRepository extends JpaRepository<TypeOfLeave, Long>{

	public TypeOfLeave findByTcid(Long tcid);

}
