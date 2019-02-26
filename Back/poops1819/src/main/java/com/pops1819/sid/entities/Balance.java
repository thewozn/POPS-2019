package com.pops1819.sid.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Balance {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "BID", unique = true, nullable = false, precision = 10)
	private Long bid;

	@Column(name = "REMAINING_BALANCE", nullable = false, length = 64)
	private Double remainingBalance;
	
	@ManyToOne
	@JoinColumn(name = "VID")
	private Vacations vacations;
	
	@ManyToOne
	@JoinColumn(name = "UID")
	private User user;

	public Balance(Double remainingBalance, Vacations vacations, User user) {
		super();
		this.remainingBalance = remainingBalance;
		this.vacations = vacations;
		this.user = user;
	}

	public Balance(Long bid, Double remainingBalance, Vacations vacations, User user) {
		super();
		this.bid = bid;
		this.remainingBalance = remainingBalance;
		this.vacations = vacations;
		this.user = user;
	}
	
	public Balance() {
		super();
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

	public Vacations getVacations() {
		return vacations;
	}

	public void setVacations(Vacations vacations) {
		this.vacations = vacations;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}


}
