package com.pops1819.sid.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User implements Serializable
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="UID", unique=true, nullable=false, precision=10)
    private Long uid;
	
	@OneToOne(mappedBy = "headOfService", fetch = FetchType.EAGER)
	private Service myService;
	
	@OneToMany(mappedBy = "user")
	private List<TypeOfLeave> typeOfLeaves = new ArrayList<>();
	
	@ManyToOne
	@JoinColumn(name = "SID")
	private Service service;
	
	@ManyToMany(mappedBy = "users")
    private List<Mission> missions = new ArrayList<>();
	
	@JsonIgnore
	@OneToMany(mappedBy="user", fetch=FetchType.LAZY)
	private List<ExpenseReportRequest> expenseReportRequests = new ArrayList<>();
 
	@JsonIgnore
	@OneToMany(mappedBy="user", fetch=FetchType.LAZY)
	private List<HolidayRequest> holidayRequests = new ArrayList<>();
 
    @Column(name="STATUS", length=16)
    private String status;
    
    @Column(name="LAST_NAME", nullable=false, length=50)
    private String lastName;
    
    @Column(name="FIRST_NAME", nullable=false, length=50)
    private String firstName;
    
    @Column(name="DATE_N", nullable=false)
    private Date dateN;
    
    @Column(name="EMAIL", unique=true, nullable=false, length=64)
    private String email;
    
    @Column(name="ADDRESS", nullable=false, length=64)
    private String address;
    
    @Column(name="CP", nullable=false, length=5)
    private String cp;
    
    @Column(name="CITY", nullable=false, length=32)
    private String city;
    
    @Column(name="COUNTRY", nullable=false, length=64)
    private String country;
    
    @Column(name="PASSWORD")
    private String password;
    
    @Column(name="PICTURE_PATH", nullable=false, length=128)
    private String picturePath;
    
    @Column(name="ALIVE", length=3)
    private boolean alive = true;

	public User(Long uid, Service myService, List<TypeOfLeave> typeOfLeaves, Service service, List<Mission> missions,
			List<ExpenseReportRequest> expenseReportRequests, List<HolidayRequest> holidayRequests, String status,
			String lastName, String firstName, Date dateN, String email, String address, String cp, String city,
			String country, String password, String picturePath, boolean alive) {
		super();
		this.uid = uid;
		this.myService = myService;
		this.typeOfLeaves = typeOfLeaves;
		this.service = service;
		this.missions = missions;
		this.expenseReportRequests = expenseReportRequests;
		this.holidayRequests = holidayRequests;
		this.status = status;
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


	public User(Long uid,String status, String lastName, String firstName, Date dateN, String email, String address, String cp,
			String city, String country, String password, String picturePath) {
		super();
		this.status = status;
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
	}
	
    
	public User() {
		super();
	}

    
    
	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}


	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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

	@JsonIgnore
	public List<TypeOfLeave> getTypeOfLeaves() {
		return typeOfLeaves;
	}
	
	@JsonIgnore
	public void setTypeOfLeaves(List<TypeOfLeave> typeOfLeaves) {
		this.typeOfLeaves = typeOfLeaves;
	}

	@JsonIgnore
	public List<Mission> getMissions() {
		return missions;
	}

	@JsonIgnore
	public void setMissions(List<Mission> missions) {
		this.missions = missions;
	}

	
	public Service getMyService() {
		return myService;
	}
	
	public void setMyService(Service myService) {
		this.myService = myService;
	}


	public List<ExpenseReportRequest> getExpenseReportRequests() {
		return expenseReportRequests;
	}


	public void setExpenseReportRequests(List<ExpenseReportRequest> expenseReportRequests) {
		this.expenseReportRequests = expenseReportRequests;
	}


	public List<HolidayRequest> getHolidayRequests() {
		return holidayRequests;
	}


	public void setHolidayRequests(List<HolidayRequest> holidayRequests) {
		this.holidayRequests = holidayRequests;
	}


	@Override
	public String toString() {
		return "User [uid=" + uid + ", myService=" + myService + ", typeOfLeaves=" + typeOfLeaves + ", service="
				+ service + ", missions=" + missions + ", expenseReportRequests=" + expenseReportRequests
				+ ", holidayRequests=" + holidayRequests + ", status=" + status + ", lastName=" + lastName
				+ ", firstName=" + firstName + ", dateN=" + dateN + ", email=" + email + ", address=" + address
				+ ", cp=" + cp + ", city=" + city + ", country=" + country + ", password=" + password + ", picturePath="
				+ picturePath + ", alive=" + alive + "]";
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((uid == null) ? 0 : uid.hashCode());
		return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (uid == null) {
			if (other.uid != null)
				return false;
		} else if (!uid.equals(other.uid))
			return false;
		return true;
	}
	
	
	
		
 	
}
