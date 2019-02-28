package com.pops1819.sid.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pops1819.sid.entities.ExpenseReportLine;

public interface IExpenseReportLineRepository extends JpaRepository<ExpenseReportLine, Long>
{

}
