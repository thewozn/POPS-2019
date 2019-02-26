package com.pops1819.sid.model;

import java.util.Date;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class VacationRequest {

	@JsonProperty("did")
	private Long did;
	
	@JsonProperty(required = true, value ="uid")
	@NotNull
	private Long uid;
	
	@JsonProperty(required = true, value ="vid")
	@NotNull
	private Long vid;

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

	@JsonProperty(required = true, value ="status")
	@NotNull
	private String status;

	
	public VacationRequest() {
		super();
	}
	

	@JsonCreator
	public VacationRequest(Long did, @NotNull Long uid, @NotNull Long vid, @NotNull Date startDate,
			@NotNull Date endDate, @NotNull boolean start, @NotNull boolean end, Date requestDate, Date traitmentDate,
			String status) {
		super();
		this.did = did;
		this.uid = uid;
		this.vid = vid;
		this.startDate = startDate;
		this.endDate = endDate;
		this.start = start;
		this.end = end;
		this.requestDate = requestDate;
		this.traitmentDate = traitmentDate;
		this.status = status;
	}




	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}

	public Long getVid() {
		return vid;
	}

	public void setVid(Long vid) {
		this.vid = vid;
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




	public Long getDid() {
		return did;
	}
 



	public void setDid(Long did) {
		this.did = did;
	}

	
	
}
