package com.pops1819.sid.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pops1819.sid.entities.ExpenseReportRequest;

public interface IExpenseReportRequestRepository extends JpaRepository<ExpenseReportRequest, Long> {

}
