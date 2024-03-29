package com.pops1819.sid.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Vacations
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="VID", unique=true, nullable=false, precision=10)
    private Long vid;
	
	private String name;
	
	private Double maxDays;
	
	@JsonIgnore
	@OneToMany(mappedBy = "vacations", fetch = FetchType.LAZY)
	private List<HolidayRequest> holidayRequest = new ArrayList<>();

	@JsonIgnore
	@OneToMany(mappedBy = "vacations")
	private List<Balance> vacations = new ArrayList<>();
	
	public Vacations(Long vid, String name, Double maxDays) {
		super();
		this.vid = vid;
		this.name = name;
		this.maxDays = maxDays;
	}
	
	public Vacations( String name, Double maxDays) {
		super();
		this.name = name;
		this.maxDays = maxDays;
	}
	
	public Vacations() {
		super();
	}

	public List<Balance> getVacations() {
		return vacations;
	}

	public void setVacations(List<Balance> vacations) {
		this.vacations = vacations;
	}

	public Long getVid() {
		return vid;
	}

	public void setVid(Long vid) {
		this.vid = vid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getMaxDays() {
		return maxDays;
	}

	public void setMaxDays(Double maxDays) {
		this.maxDays = maxDays;
	}

	@JsonIgnore
	public List<HolidayRequest> getHolidayRequest() {
		return holidayRequest;
	}

	public void setHolidayRequest(List<HolidayRequest> holidayRequest) {
		this.holidayRequest = holidayRequest;
	}
	
	
	
	
}
