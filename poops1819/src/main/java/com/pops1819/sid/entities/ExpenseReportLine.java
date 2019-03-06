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
	@JoinColumn(name = "did")
	private ExpenseReport expenseReport;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "MID")
	private Mission mission;
	private String typeOfExpense;
	private String reasonOfRefund;
	private Date dateOfOperation;
	private double amount;
	private String additionalDetail;
	private String state;
	private boolean advance;
	private String refusalReason;
	private Date publishingDate;

	public ExpenseReportLine() {
		super();
	}

	public ExpenseReportLine(Long lndfid, ExpenseReport expenseReport, Mission mission, String typeOfExpense,
			String reasonOfRefund, Date dateOfOperation, double amount, String additionalDetail, String state,
			boolean advance, String refusalReason, Date publishingDate) {
		super();
		this.lndfid = lndfid;
		this.expenseReport = expenseReport;
		this.mission = mission;
		this.typeOfExpense = typeOfExpense;
		this.reasonOfRefund = reasonOfRefund;
		this.dateOfOperation = dateOfOperation;
		this.amount = amount;
		this.additionalDetail = additionalDetail;
		this.state = state;
		this.advance = advance;
		this.refusalReason = refusalReason;
		this.publishingDate = publishingDate;
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



	@Override
	public String toString() {
		return "ExpenseReportLine [lndfid=" + lndfid + ", expenseReport=" + expenseReport + ", typeOfExpense="
				+ typeOfExpense + ", reasonOfRefund=" + reasonOfRefund + ", dateOfOperation=" + dateOfOperation
				+ ", amount=" + amount + ", additionalDetail=" + additionalDetail + ", state=" + state + ", advance="
				+ advance + ", refusalReason=" + refusalReason + ", publishingDate=" + publishingDate + "]";
	}

	
	
	
	
}
