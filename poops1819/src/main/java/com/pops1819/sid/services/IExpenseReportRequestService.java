package com.pops1819.sid.services;

import java.util.List;

import com.pops1819.sid.model.ExpenseReportLineRequest;
import com.pops1819.sid.model.ExpenseReportRequest;

public interface IExpenseReportRequestService
{
	public boolean createExpenseReportForUsers();
	public ExpenseReportRequest getLatestExpenseReport(Long uid);
	public boolean addExpenseReportLineRequest(ExpenseReportLineRequest expenseReportLineRequest);
	public boolean updateExpenseReportLineRequest(ExpenseReportLineRequest expenseReportLineRequest);
	public boolean removeExpenseReportLineRequest(Long lndfid);
	public List<ExpenseReportRequest> getExpenseReportByUID(Long uid);
	public ExpenseReportRequest getExpenseReportByDid(Long did);
	public List<ExpenseReportRequest> getExpenseReportList();
	public boolean updateExpenseReport(ExpenseReportRequest expenseReportRequest);
}
