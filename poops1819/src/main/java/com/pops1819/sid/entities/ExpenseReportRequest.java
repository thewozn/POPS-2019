package com.pops1819.sid.entities;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity
//@DiscriminatorValue("DN")
public class ExpenseReportRequest
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long did;
	
	@ManyToOne
	@JoinColumn(name = "UID")
	private User user;

	@Column(name = "REQUEST_DATE", nullable = false)
	private Date requestDate;

	@Column(name = "TRAITMENT_DATE", nullable = false)
	private Date traitmentDate;
	
	private String status;

	@OneToMany(mappedBy = "expenseReportRequest")
	private List<ExpenseReportLine> expenseReportLines = new ArrayList<>();
	
	public ExpenseReportRequest()
	{
		super();
	}
	
	
	public ExpenseReportRequest(Long did, User user, Date requestDate, Date traitmentDate, String status,
			List<ExpenseReportLine> expenseReportLines) {
		super();
		this.did = did;
		this.user = user;
		this.requestDate = requestDate;
		this.traitmentDate = traitmentDate;
		this.status = status;
		this.expenseReportLines = expenseReportLines;
	}



	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public ExpenseReportRequest(String status, List<ExpenseReportLine> expenseReportLines) {
		super();
		this.status = status;
		this.expenseReportLines = expenseReportLines;
	}

	public List<ExpenseReportLine> getExpenseReportLines() {
		return expenseReportLines;
	}

	public void setExpenseReportLines(List<ExpenseReportLine> expenseReportLines) {
		this.expenseReportLines = expenseReportLines;
	}


	public Long getDid() {
		return did;
	}


	public void setDid(Long did) {
		this.did = did;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public Date getRequestDate() {
		return requestDate;
	}


	public void setRequestDate(Date requestDate) {
		this.requestDate = requestDate;
	}


	public Date getTraitmentDate() {
		return traitmentDate;
	}


	public void setTraitmentDate(Date traitmentDate) {
		this.traitmentDate = traitmentDate;
	}
	
	
	
	
	
	
	
	
	
}