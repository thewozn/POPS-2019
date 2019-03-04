package com.pops1819.sid.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class ExpenseReportRequest
{
	private Long did;
	
	private Long uid;

	private Date requestDate;

	private Date traitmentDate;
	
	private String status;
		
	public ExpenseReportRequest() {
		super();
	}

	public ExpenseReportRequest(Long did, Long uid, Date requestDate, Date traitmentDate, String status,
			List<ExpenseReportLineRequest> expenseReportLineRequest) {
		super();
		this.did = did;
		this.uid = uid;
		this.requestDate = requestDate;
		this.traitmentDate = traitmentDate;
		this.status = status;
		this.expenseReportLineRequest = expenseReportLineRequest;
	}

	private List<ExpenseReportLineRequest> expenseReportLineRequest = new ArrayList<>();

	public Long getDid() {
		return did;
	}

	public void setDid(Long did) {
		this.did = did;
	}

	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<ExpenseReportLineRequest> getExpenseReportLineRequest() {
		return expenseReportLineRequest;
	}

	public void setExpenseReportLineRequest(List<ExpenseReportLineRequest> expenseReportLineRequest) {
		this.expenseReportLineRequest = expenseReportLineRequest;
	}
	
	
}
