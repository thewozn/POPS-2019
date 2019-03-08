package com.pops1819.sid.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pops1819.sid.entities.ExpenseReport;
import com.pops1819.sid.entities.ExpenseReportLine;
import com.pops1819.sid.entities.Mission;
import com.pops1819.sid.entities.User;
import com.pops1819.sid.mappers.ControllerMapper;
import com.pops1819.sid.model.ExpenseReportLineRequest;
import com.pops1819.sid.model.ExpenseReportRequest;
import com.pops1819.sid.repository.IExpenseReportLineRepository;
import com.pops1819.sid.repository.IExpenseReportRepository;
import com.pops1819.sid.repository.IMissionRepository;
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
	private IMissionRepository missionRepository;
	
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
	public boolean updateExpenseReport(ExpenseReportRequest expenseReportRequest) {
		ExpenseReport toupdate = expenseReportRepository.findByDid(expenseReportRequest.getDid());
		User user = userRepository.findByUid(expenseReportRequest.getUid());
		if(user == null  || toupdate == null)
			return false;
		
		ExpenseReport newExpenseReport = mapper.getExpenseReport(expenseReportRequest);
		
		toupdate.setRequestDate(newExpenseReport.getRequestDate());
		toupdate.setStatus(newExpenseReport.getStatus());
		toupdate.setTraitmentDate(newExpenseReport.getTraitmentDate());
		toupdate.setUser(user);
		toupdate.setExpenseReportLines(newExpenseReport.getExpenseReportLines());
		
		expenseReportRepository.save(toupdate);
		
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
	public ExpenseReportRequest getExpenseReportByDid(Long did) {
		if(!expenseReportRepository.existsByDid(did)) {
			return null;
		}
		return mapper.getExpenseReportRequest(expenseReportRepository.findByDid(did));
		
	}
	
	@Override
	public List<ExpenseReportRequest> getExpenseReportByUID(Long uid) {
		User user = userRepository.findByUid(uid);
		return mapper.getExpenseReportRequestList(expenseReportRepository.findByUser(user));
	}

	@Override
	public boolean addExpenseReportLineRequest(ExpenseReportLineRequest expenseReportLineRequest) {
		ExpenseReport expenseReport = expenseReportRepository.findByDid(expenseReportLineRequest.getDid());
		ExpenseReportLine expenseReportLine = mapper.getExpenseReportLine(expenseReportLineRequest);
		Mission mission = missionRepository.findByMid(expenseReportLineRequest.getMid());
		if(mission == null || expenseReport == null || expenseReportLine == null)
			return false;
		expenseReportLine.setExpenseReport(expenseReport);
		expenseReportLine.setMission(mission);
		expenseReportLine.setExpenseReport(expenseReport);
		expenseReportLineRepository.save(expenseReportLine);
		
		return true;
	}

	@Override
	public boolean updateExpenseReportLineRequest(ExpenseReportLineRequest expenseReportLineRequest)
	{
		if(!expenseReportLineRepository.existsByLndfid(expenseReportLineRequest.getLndfid()))
			return false;
		ExpenseReport expenseReport = expenseReportRepository.findByDid(expenseReportLineRequest.getDid());
		ExpenseReportLine expenseReportLine = mapper.getExpenseReportLine(expenseReportLineRequest);
		Mission mission = missionRepository.findByMid(expenseReportLineRequest.getMid());
		if(mission == null || expenseReport == null || expenseReportLine == null)
			return false;
		
		expenseReportLine.setExpenseReport(expenseReport);
		expenseReportLine.setMission(mission);
		expenseReportLine.setExpenseReport(expenseReport);
		expenseReportLineRepository.save(expenseReportLine);
		
		return true;
	}

	@Transactional
	@Override
	public boolean removeExpenseReportLineRequest(Long lndfid) {
		//ExpenseReportLine expenseReportLine = expenseReportLineRepository.findByLndfid(lndfid);
		if(!expenseReportLineRepository.existsByLndfid(lndfid))
			return false;
		
		expenseReportLineRepository.deleteByLndfid(lndfid);
		return true;
	}
	
	
	@Override
	public List<ExpenseReportRequest> getExpenseReportList() {
		return mapper.getExpenseReportRequestList(expenseReportRepository.findAll());
	}

	
}
