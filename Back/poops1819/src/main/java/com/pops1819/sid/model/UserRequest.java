package com.pops1819.sid.model;

import java.util.Date;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserRequest {

	@JsonProperty("uid")
	private Long uid;
	
	@JsonProperty( value = "status")
	@NotNull
	private String status;

	@JsonProperty(value ="sid")
	private Long sid;

	@JsonProperty( value ="lastName")
	@NotNull
	private String lastName;

	@JsonProperty( value ="firstName")
	@NotNull
	private String firstName;

	@JsonProperty( value ="dateN")
	@NotNull
	private Date dateN;

	@JsonProperty( value ="email")
	@NotNull
	private String email;

	@JsonProperty( value ="address")
	@NotNull
	private String address;

	@JsonProperty(value ="cp")
	@NotNull
	private String cp;

	@JsonProperty( value ="city")
	@NotNull
	private String city;

	@JsonProperty(value ="country")
	@NotNull
	private String country;

	@JsonProperty( value ="password")
	@NotNull
	private String password;

	@JsonProperty( value ="picturePath")
	@NotNull
	private String picturePath;

	@JsonProperty("alive")
	private boolean alive;
    
//	@JsonCreator
	public UserRequest(Long uid, @NotNull String status, Long sid, @NotNull String lastName, @NotNull String firstName,
			@NotNull Date dateN, @NotNull String email, @NotNull String address, @NotNull String cp,
			@NotNull String city, @NotNull String country, @NotNull String password, @NotNull String picturePath,
			boolean alive) {
		super();
		this.uid = uid;
		this.status = status;
		this.sid = sid;
		this.lastName = lastName;
		this.firstName = firstName;
		this.dateN = dateN;
		this.email = email;
		this.address = address;
		this.cp = cp;
		this.city = city;
		this.country = country;
		this.password = password;
		this.picturePath = picturePath;
		this.alive = alive;
	}
	
	public UserRequest(@NotNull String status, Long sid, @NotNull String lastName, @NotNull String firstName,
			@NotNull Date dateN, @NotNull String email, @NotNull String address, @NotNull String cp,
			@NotNull String city, @NotNull String country, @NotNull String password, @NotNull String picturePath,
			boolean alive) {
		super();
		this.status = status;
		this.sid = sid;
		this.lastName = lastName;
		this.firstName = firstName;
		this.dateN = dateN;
		this.email = email;
		this.address = address;
		this.cp = cp;
		this.city = city;
		this.country = country;
		this.password = password;
		this.picturePath = picturePath;
		this.alive = alive;
	}
	

	public UserRequest() {
		super();
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getSid() {
		return sid;
	}

	public void setSid(Long sid) {
		this.sid = sid;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public Date getDateN() {
		return dateN;
	}

	public void setDateN(Date dateN) {
		this.dateN = dateN;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCp() {
		return cp;
	}

	public void setCp(String cp) {
		this.cp = cp;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPicturePath() {
		return picturePath;
	}

	public void setPicturePath(String picturePath) {
		this.picturePath = picturePath;
	}

	public boolean isAlive() {
		return alive;
	}

	public void setAlive(boolean alive) {
		this.alive = alive;
	}
	
	

	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}

	@Override
	public String toString() {
		return "UserRequest [status=" + status + ", sid=" + sid + ", lastName=" + lastName + ", firstName=" + firstName
				+ ", dateN=" + dateN + ", email=" + email + ", address=" + address + ", cp=" + cp + ", city=" + city
				+ ", country=" + country + ", password=" + password + ", picturePath=" + picturePath + ", alive="
				+ alive + "]";
	}
}
