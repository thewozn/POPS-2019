package com.pops1819.sid.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Vacations
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="VID", unique=true, nullable=false, precision=10)
    private Long vid;
	
	private String name;
	
	private long maxDays;
	
	public Vacations(Long vid, String name, long maxDays) {
		super();
		this.vid = vid;
		this.name = name;
		this.maxDays = maxDays;
	}
	
	public Vacations( String name, long maxDays) {
		super();
		this.name = name;
		this.maxDays = maxDays;
	}
	
	public Vacations() {
		super();
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

	public long getMaxDays() {
		return maxDays;
	}

	public void setMaxDays(long maxDays) {
		this.maxDays = maxDays;
	}
	
	
	
	
}
