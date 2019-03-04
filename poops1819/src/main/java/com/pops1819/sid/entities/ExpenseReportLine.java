package com.pops1819.sid.entities;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class ExpenseReportLine
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LNDFID", unique = true, nullable = false, precision = 10)
	private Long lndfid;
	
	@ManyToOne
	@JoinColumn(name = "NDFID")
	private ExpenseReport expenseReport;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "MID")
	private Mission mission;
	
	private Date publishingDate;
	private boolean advance;
	private String typeLine;
	private double amount;
	private String textDetails;
	private String state;
	private String refusalReason;
	
	public ExpenseReportLine() {
		super();
	}

	public ExpenseReportLine(Long lndfid, ExpenseReport expenseReport, Mission mission,
			Date publishingDate, boolean advance, String typeLine, double amount, String textDetails, String state,
			String refusalReason) {
		super();
		this.lndfid = lndfid;
		this.expenseReport = expenseReport;
		this.mission = mission;
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

	public ExpenseReport getExpenseReport() {
		return expenseReport;
	}

	public void setExpenseReport(ExpenseReport expenseReport) {
		this.expenseReport = expenseReport;
	}

	public Mission getMission() {
		return mission;
	}

	public void setMission(Mission mission) {
		this.mission = mission;
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
