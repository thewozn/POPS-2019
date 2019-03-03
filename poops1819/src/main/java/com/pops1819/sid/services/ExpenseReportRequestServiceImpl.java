package com.pops1819.sid.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pops1819.sid.entities.ExpenseReport;
import com.pops1819.sid.entities.User;
import com.pops1819.sid.repository.IExpenseReportRepository;
import com.pops1819.sid.repository.IUserRepository;

@Service
public class ExpenseReportRequestServiceImpl implements IExpenseReportRequestService {
	@Autowired
	private IExpenseReportRepository expenseReportRepository;
	@Autowired
	private IUserRepository userRepository;

	@Override
	public boolean createExpenseReportForUsers() {
		List<User> userList = userRepository.findAll();
//		update les derniers notes de frais
		List<ExpenseReport> expenseReportList = new ArrayList<ExpenseReport>(); 
		userList.forEach(u -> expenseReportList.add(new ExpenseReport(u, new Date(), new Date(), "En Cours")));
		System.out.println(expenseReportList.size());
		expenseReportRepository.saveAll(expenseReportList);
		return true;
	}

	

//	@Override
//	public ExpenseReportRequest addExpenseReportLine(ExpenseReportLineRequest expenseReportLineRequest) {
//		// TODO Auto-generated method stub
//		return null;
//	}

}
