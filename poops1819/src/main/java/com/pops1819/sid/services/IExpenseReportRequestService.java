package com.pops1819.sid.services;

import com.pops1819.sid.model.ExpenseReportLineRequest;
import com.pops1819.sid.model.ExpenseReportRequest;

public interface IExpenseReportRequestService
{
	public boolean createExpenseReportForUsers();
	public ExpenseReportRequest getLatestExpenseReport(Long uid);
	public boolean addExpenseReportLineRepository(Long uid, ExpenseReportLineRequest expenseReportLineRequest);
}
