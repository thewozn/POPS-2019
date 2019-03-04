package com.pops1819.sid.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.pops1819.sid.services.ExpenseReportRequestServiceImpl;

@Component
public class ExpenseReportTask
{
	@Autowired
	private ExpenseReportRequestServiceImpl expenseReportRequestServiceImpl;
	
//	@Transactional
//	@Scheduled(cron ="0,30 * * * * *")
	public void cronJob()
	{
		expenseReportRequestServiceImpl.createExpenseReportForUsers();
		System.out.println("OK");
	}}
