package com.pops1819.sid.model;

import java.util.Date;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class LeaveRequest {

	@JsonProperty("uid")
	@NotNull
	private Long uid;
	
	@JsonProperty(required = true, value ="tcid")
	@NotNull
	private Long tcid;

	@JsonProperty(required = true, value ="startDate")
	@NotNull
	private Date startDate;

	@JsonProperty(required = true, value ="endDate")
	@NotNull
	private Date endDate;

	@JsonProperty(required = true, value ="start")
	@NotNull
	private boolean start;

	@JsonProperty(required = true, value ="end")
	@NotNull
	private boolean end;

	private Date requestDate;

	private Date traitmentDate;

	private String status;

	@JsonCreator
	public LeaveRequest(@NotNull Long uid, @NotNull Long tcid, @NotNull Date startDate, @NotNull Date endDate,
			@NotNull boolean start, @NotNull boolean end, Date requestDate, Date traitmentDate, String status) {
		super();
		this.uid = uid;
		this.tcid = tcid;
		this.startDate = startDate;
		this.endDate = endDate;
		this.start = start;
		this.end = end;
		this.requestDate = requestDate;
		this.traitmentDate = traitmentDate;
		this.status = status;
	}

	public LeaveRequest() {
		super();
	}

	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public boolean isStart() {
		return start;
	}

	public void setStart(boolean start) {
		this.start = start;
	}

	public boolean isEnd() {
		return end;
	}

	public void setEnd(boolean end) {
		this.end = end;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getTcid() {
		return tcid;
	}

	public void setTcid(Long tcid) {
		this.tcid = tcid;
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
