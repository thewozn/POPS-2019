package com.pops1819.sid.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pops1819.sid.entities.Balance;
import com.pops1819.sid.mappers.ControllerMapper;
import com.pops1819.sid.model.BalanceRequest;
import com.pops1819.sid.repository.IBalanceRepository;

@Service
public class BalanceRequestServiceImpl implements IBalanceRequestService{

	@Autowired
	private IBalanceRepository balanceRepository;
	
	@Autowired
	private ControllerMapper mapper;
	
	@Override
	public List<BalanceRequest> getBalanceRequestListByUID(Long uid) {
		List<Balance> balanceList = balanceRepository.findByUid(uid);
		if(balanceList == null)
			return null;
					
		return mapper.getBalanceRequestList(balanceList);
	}

}
