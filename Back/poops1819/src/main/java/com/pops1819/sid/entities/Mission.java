package com.pops1819.sid.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Mission implements Serializable{

	@Id
	private Long mid;
	
	@OneToOne(mappedBy = "mission", fetch = FetchType.EAGER)
	private ExpenseReportLine expenseReportLine;
	
	@ManyToMany(cascade = {
	        CascadeType.PERSIST,
	        CascadeType.MERGE
	    })
	@JoinTable(name = "user_mission",
	        joinColumns = @JoinColumn(name = "MID"),
	        inverseJoinColumns = @JoinColumn(name = "UID")
	    )
	private List<User> users = new ArrayList<>();
	
	@ManyToOne
	@JoinColumn(name = "SID")
	private Service service;
	
	private String title;
	
	private String status;
	
	private String description;
	
	public Mission() {
		super();
	}
	
	public Mission(Long mid, ExpenseReportLine expenseReportLine, List<User> users, Service service, String title,
			String status, String description) {
		super();
		this.mid = mid;
		this.expenseReportLine = expenseReportLine;
		this.users = users;
		this.service = service;
		this.title = title;
		this.status = status;
		this.description = description;
	}

	public Long getMid() {
		return mid;
	}

	public void setMid(Long mid) {
		this.mid = mid;
	}

	public ExpenseReportLine getExpenseReportLine() {
		return expenseReportLine;
	}

	public void setExpenseReportLine(ExpenseReportLine expenseReportLine) {
		this.expenseReportLine = expenseReportLine;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
	
	
	
}
