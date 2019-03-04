package com.pops1819.sid.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pops1819.sid.entities.ExpenseReport;
import com.pops1819.sid.entities.User;
import com.pops1819.sid.mappers.ControllerMapper;
import com.pops1819.sid.model.ExpenseReportLineRequest;
import com.pops1819.sid.model.ExpenseReportRequest;
import com.pops1819.sid.repository.IExpenseReportLineRepository;
import com.pops1819.sid.repository.IExpenseReportRepository;
import com.pops1819.sid.repository.IUserRepository;

@Service
public class ExpenseReportRequestServiceImpl implements IExpenseReportRequestService {
	@Autowired
	private IExpenseReportRepository expenseReportRepository;
	@Autowired
	private IUserRepository userRepository;
	@Autowired
	private IExpenseReportLineRepository expenseReportLineRepository;
	
	@Autowired
	private ControllerMapper mapper;

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

	@Override
	public ExpenseReportRequest getLatestExpenseReport(Long uid) {
		User user = userRepository.findByUid(uid);
		if(user == null)
			return null;
		ExpenseReport expenseReport = expenseReportRepository.findFirstByUserOrderByRequestDateDesc(user);
		System.out.println(expenseReport.toString());
		return mapper.getExpenseReportRequest(expenseReport);
	}

	@Override
	public boolean addExpenseReportLineRepository(Long uid, ExpenseReportLineRequest expenseReportLineRequest) {
		User user = userRepository.findByUid(uid);
		if(user == null)
			return false;
		
		
		
		return true;
	}
	

	


}
