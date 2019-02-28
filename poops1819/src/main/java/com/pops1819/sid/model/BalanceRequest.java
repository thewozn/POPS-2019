/**
 * 
 */
package com.pops1819.sid.model;

public class BalanceRequest 
{
	private Long bid;
	private Double remainingBalance;
	private String name;
	private Long uid;
	
	public BalanceRequest() {
		super();
	}

	public BalanceRequest(Long bid, Double remainingBalance, String name, Long uid) {
		super();
		this.bid = bid;
		this.remainingBalance = remainingBalance;
		this.name = name;
		this.uid = uid;
	}

	public Long getBid() {
		return bid;
	}

	public void setBid(Long bid) {
		this.bid = bid;
	}

	public Double getRemainingBalance() {
		return remainingBalance;
	}

	public void setRemainingBalance(Double remainingBalance) {
		this.remainingBalance = remainingBalance;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}
	
	
	
	
}
