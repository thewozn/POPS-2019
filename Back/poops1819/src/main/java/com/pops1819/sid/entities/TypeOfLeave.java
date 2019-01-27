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

	@Column(name = "TYPE", nullable = false, length = 64)
	private String type;
	private long remainingBalance;
	private long maxDays;

	@ManyToOne
	@JoinColumn(name = "UID")
	private User user;

	@OneToMany(mappedBy = "typeOfLeave", fetch = FetchType.LAZY)
	private List<HolidayRequest> holidayRequest = new ArrayList<>();

	public TypeOfLeave(Long tcid, String type, long remainingBalance, long maxDays, User user,
			List<HolidayRequest> holidayRequest) {
		super();
		this.tcid = tcid;
		this.type = type;
		this.remainingBalance = remainingBalance;
		this.maxDays = maxDays;
		this.user = user;
		this.holidayRequest = holidayRequest;
	}

	public TypeOfLeave(String type, long remainingBalance, long maxDays, User user) {
		super();
		this.type = type;
		this.remainingBalance = remainingBalance;
		this.maxDays = maxDays;
		this.user = user;
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public long getRemainingBalance() {
		return remainingBalance;
	}

	public void setRemainingBalance(long remainingBalance) {
		this.remainingBalance = remainingBalance;
	}

	public long getMaxDays() {
		return maxDays;
	}

	public void setMaxDays(long maxDays) {
		this.maxDays = maxDays;
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
