package com.pops1819.sid.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pops1819.sid.entities.ExpenseReport;
import com.pops1819.sid.entities.User;

public interface IExpenseReportRepository extends JpaRepository<ExpenseReport, Long> {

//    @Query("SELECT e FROM ExpenseReport e WHERE e.user.uid = ?1 ORDER BY e.requestDate DESC")
	public ExpenseReport findFirstByUserOrderByRequestDateDesc(User user);

	public ExpenseReport findByDid(Long did);
}
