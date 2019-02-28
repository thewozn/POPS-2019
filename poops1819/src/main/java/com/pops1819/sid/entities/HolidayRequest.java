package com.pops1819.sid.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class HolidayRequest
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

	private Date startDate;
	
	private Date endDate;
	
	@ManyToOne
	@JoinColumn(name="VID")
	private Vacations vacations;
	
	private boolean start;
	
	private boolean end;
	
	private String status;
	
	public HolidayRequest() {
		super();
	}



	public HolidayRequest(Long did, User user, Date requestDate, Date traitmentDate, Date startDate, Date endDate,
			Vacations vacations, boolean start, boolean end, String status) {
		super();
		this.did = did;
		this.user = user;
		this.requestDate = requestDate;
		this.traitmentDate = traitmentDate;
		this.startDate = startDate;
		this.endDate = endDate;
		this.vacations = vacations;
		this.start = start;
		this.end = end;
		this.status = status;
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

	public Vacations getVacations() {
		return vacations;
	}

	public void setVacations(Vacations vacations) {
		this.vacations = vacations;
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
