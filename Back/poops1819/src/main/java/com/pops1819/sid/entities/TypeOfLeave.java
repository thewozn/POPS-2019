package com.pops1819.sid.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class TypeOfLeave {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TCID", unique = true, nullable = false, precision = 10)
	private Long tcid;

	@Column(name = "REMAINING_BALANCE", nullable = false, length = 64)
	private Double remainingBalance;
	
	@ManyToOne
	@JoinColumn(name = "VID")
	private Vacations vacations;
	
	@ManyToOne
	@JoinColumn(name = "UID")
	private User user;

	@OneToMany(mappedBy = "typeOfLeave", fetch = FetchType.LAZY)
	private List<HolidayRequest> holidayRequest = new ArrayList<>();

	public TypeOfLeave(Double remainingBalance, Vacations vacations, User user) {
		super();
		this.remainingBalance = remainingBalance;
		this.vacations = vacations;
		this.user = user;
	}
	
	public TypeOfLeave(Double remainingBalance, Vacations vacations, User user,
			List<HolidayRequest> holidayRequest) {
		super();
		this.remainingBalance = remainingBalance;
		this.vacations = vacations;
		this.user = user;
		this.holidayRequest = holidayRequest;
	}
	
	public TypeOfLeave(Long tcid, Double remainingBalance, Vacations vacations, User user,
			List<HolidayRequest> holidayRequest) {
		super();
		this.tcid = tcid;
		this.remainingBalance = remainingBalance;
		this.vacations = vacations;
		this.user = user;
		this.holidayRequest = holidayRequest;
	}
	
	public TypeOfLeave(Long tcid, Double remainingBalance, Vacations vacations, User user) {
		super();
		this.tcid = tcid;
		this.remainingBalance = remainingBalance;
		this.vacations = vacations;
		this.user = user;
	}
	
	

	public TypeOfLeave(Long tcid, Double remainingBalance, List<HolidayRequest> holidayRequest) {
		super();
		this.tcid = tcid;
		this.remainingBalance = remainingBalance;
		this.holidayRequest = holidayRequest;
	}



	public TypeOfLeave() {
		super();
	}

	public Long getTcid() {
		return tcid;
	}

	public void setTcid(Long tcid) {
		this.tcid = tcid;
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

	public List<HolidayRequest> getHolidayRequest() {
		return holidayRequest;
	}

	public void setHolidayRequest(List<HolidayRequest> holidayRequest) {
		this.holidayRequest = holidayRequest;
	}

}
