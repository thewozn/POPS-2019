package com.pops1819.sid.model;

import java.sql.Date;

public class ExpenseReportLineRequest
{
	private Long lndfid;
	private Long did;
	private Long mid;
	private Date publishingDate;
	private boolean advance;
	private double amount;
	private String state;
	private String refusalReason;
	private String typeOfExpense;
	private String reasonOfRefund;
	private Date dateOfOperation;
	private String additionalDetail;
	
	public ExpenseReportLineRequest() {
		super();
	}
	
	public ExpenseReportLineRequest(Long lndfid, Long did, Long mid, Date publishingDate, boolean advance,
			double amount, String state, String refusalReason, String typeOfExpense, String reasonOfRefund,
			Date dateOfOperation, String additionalDetail) {
		super();
		this.lndfid = lndfid;
		this.did = did;
		this.mid = mid;
		this.publishingDate = publishingDate;
		this.advance = advance;
		this.amount = amount;
		this.state = state;
		this.refusalReason = refusalReason;
		this.typeOfExpense = typeOfExpense;
		this.reasonOfRefund = reasonOfRefund;
		this.dateOfOperation = dateOfOperation;
		this.additionalDetail = additionalDetail;
	}

	public Long getLndfid() {
		return lndfid;
	}
	public void setLndfid(Long lndfid) {
		this.lndfid = lndfid;
	}
	public Long getDid() {
		return did;
	}
	public void setDid(Long did) {
		this.did = did;
	}

	public Long getMid() {
		return mid;
	}

	public void setMid(Long mid) {
		this.mid = mid;
	}

	public Date getPublishingDate() {
		return publishingDate;
	}
	public void setPublishingDate(Date publishingDate) {
		this.publishingDate = publishingDate;
	}
	public boolean isAdvance() {
		return advance;
	}
	public void setAdvance(boolean advance) {
		this.advance = advance;
	}

	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getRefusalReason() {
		return refusalReason;
	}
	public void setRefusalReason(String refusalReason) {
		this.refusalReason = refusalReason;
	}

	public String getTypeOfExpense() {
		return typeOfExpense;
	}

	public void setTypeOfExpense(String typeOfExpense) {
		this.typeOfExpense = typeOfExpense;
	}

	public String getReasonOfRefund() {
		return reasonOfRefund;
	}

	public void setReasonOfRefund(String reasonOfRefund) {
		this.reasonOfRefund = reasonOfRefund;
	}

	public Date getDateOfOperation() {
		return dateOfOperation;
	}

	public void setDateOfOperation(Date dateOfOperation) {
		this.dateOfOperation = dateOfOperation;
	}

	public String getAdditionalDetail() {
		return additionalDetail;
	}

	public void setAdditionalDetail(String additionalDetail) {
		this.additionalDetail = additionalDetail;
	}


	
	
	
}
