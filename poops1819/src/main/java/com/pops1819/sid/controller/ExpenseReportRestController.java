package com.pops1819.sid.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.pops1819.sid.model.ExpenseReportLineRequest;
import com.pops1819.sid.model.ExpenseReportRequest;
import com.pops1819.sid.services.ExpenseReportRequestServiceImpl;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ExpenseReportRestController
{
	@Autowired
	private ExpenseReportRequestServiceImpl expenseReportRequestServiceImpl;

	@RequestMapping(value = "/addExpenseReportLineRequest", method = RequestMethod.POST)
	public boolean addExpenseReportLineRepository(@RequestBody ExpenseReportLineRequest expenseReportLineRequest) {
		return expenseReportRequestServiceImpl.addExpenseReportLineRequest(expenseReportLineRequest);
	}

	@RequestMapping(value = "/getLatestExpenseReport/{uid}", method = RequestMethod.GET)
	public ExpenseReportRequest getLatestExpenseReport(@PathVariable Long uid) {
		return expenseReportRequestServiceImpl.getLatestExpenseReport(uid);
	}
	
	
	
	
}
