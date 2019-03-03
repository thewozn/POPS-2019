package com.pops1819.sid.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pops1819.sid.entities.ExpenseReport;

public interface IExpenseReportRepository extends JpaRepository<ExpenseReport, Long> {

}
