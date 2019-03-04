package com.pops1819.sid.model;

import java.sql.Date;

public class ExpenseReportLineRequest
{
	private Long lndfid;

	private Long did;

	private Long mid;
	
	private Date publishingDate;
	private boolean advance;
	private String typeLine;
	private double amount;
	private String textDetails;
	private String state;
	private String refusalReason;
	
	public ExpenseReportLineRequest() {
		super();
	}
	
	public ExpenseReportLineRequest(Long lndfid, Long did, Long mid, Date publishingDate, boolean advance,
			String typeLine, double amount, String textDetails, String state, String refusalReason) {
		super();
		this.lndfid = lndfid;
		this.did = did;
		this.mid = mid;
		this.publishingDate = publishingDate;
		this.advance = advance;
		this.typeLine = typeLine;
		this.amount = amount;
		this.textDetails = textDetails;
		this.state = state;
		this.refusalReason = refusalReason;
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
	public String getTypeLine() {
		return typeLine;
	}
	public void setTypeLine(String typeLine) {
		this.typeLine = typeLine;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getTextDetails() {
		return textDetails;
	}
	public void setTextDetails(String textDetails) {
		this.textDetails = textDetails;
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
	
	
	
	
	
}
