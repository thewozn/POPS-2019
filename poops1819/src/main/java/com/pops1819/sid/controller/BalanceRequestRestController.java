package com.pops1819.sid.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.pops1819.sid.model.BalanceRequest;
import com.pops1819.sid.services.BalanceRequestServiceImpl;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BalanceRequestRestController
{
	@Autowired
	private BalanceRequestServiceImpl balanceRequestServiceImpl;

	@RequestMapping(value = "/getBalanceRestControllerListByUID/{uid}", method = RequestMethod.GET)
	public List<BalanceRequest> getBalanceRequestListByUID(@PathVariable Long uid) {
		return balanceRequestServiceImpl.getBalanceRequestListByUID(uid);
	}
	
	
}
