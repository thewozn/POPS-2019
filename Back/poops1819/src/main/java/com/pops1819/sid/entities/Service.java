package com.pops1819.sid.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Service implements Serializable
{
	@Id
	@JsonIgnore
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SID", unique = true, nullable = false, precision = 10)
	private Long sid;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "UID")
	private User headOfService;

	@OneToMany(mappedBy = "service")
	@JsonIgnore
	private List<User> users = new ArrayList<>();

	@OneToMany(mappedBy = "service")
	private List<Mission> missions = new ArrayList<>();
	
	@Column(name = "name", nullable = false, length = 64)
	private String name;


	public Long getSid() {
		return sid;
	}

	public void setSid(Long sid) {
		this.sid = sid;
	}

	@JsonIgnore
	public User getHeadOfService() {
		return headOfService;
	}

	public void setHeadOfService(User headOfService) {
		this.headOfService = headOfService;
	}

	@JsonIgnore
	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Mission> getMissions() {
		return missions;
	}

	public void setMissions(List<Mission> missions) {
		this.missions = missions;
	}

	@Override
	public String toString() {
		return "Service [sid=" + sid + ", headOfService=" + headOfService + ", users=" + users + ", missions="
				+ missions + ", name=" + name + "]";
	}
	
	
	
	

}
