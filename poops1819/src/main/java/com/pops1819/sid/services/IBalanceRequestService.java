package com.pops1819.sid.services;

import java.util.List;

import com.pops1819.sid.model.BalanceRequest;

public interface IBalanceRequestService 
{
	public List<BalanceRequest> getBalanceRequestListByUID(Long uid);
}
