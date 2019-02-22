package com.pops1819.sid.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.UniqueConstraint;

@Entity
public class Mission implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="MID", unique=true, nullable=false, precision=10)
	private Long mid;
	
	@OneToOne(mappedBy = "mission", fetch = FetchType.EAGER)
	private ExpenseReportLine expenseReportLine;
	
	@ManyToMany(cascade = {
	        CascadeType.PERSIST,
	        CascadeType.MERGE
	    })
	@JoinTable(name = "user_mission",
	        joinColumns = @JoinColumn(name = "MID"),
	        inverseJoinColumns = @JoinColumn(name = "UID"),
            uniqueConstraints=@UniqueConstraint(columnNames={"MID","UID"}))

	private List<User> users = new ArrayList<>();
	
	@ManyToOne
	@JoinColumn(name = "SID")
	private Service service;
	
	private String title;
	
	private String status;
	
	private String description;
	
	private Date startDate;
	
	private Date endDate;
	
	public Mission() {
		super();
	}
	

	public Mission(Long mid, ExpenseReportLine expenseReportLine, List<User> users, Service service, String title,
			String status, String description, Date startDate, Date endDate) {
		super();
		this.mid = mid;
		this.expenseReportLine = expenseReportLine;
		this.users = users;
		this.service = service;
		this.title = title;
		this.status = status;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
	}

	public void addUser(User user)
	{
		users.add(user);
		user.getMissions().add(this);
	}
	
	public void removeUser(User user)
	{
		users.remove(user);
		user.getMissions().remove(this);
	}
	
	public void removeAllUsers()
	{
		for (User user : users) {
			if(user.getMissions()!= null)
				user.getMissions().remove(this);

		}
		users.clear();
	}
	
	public Date getStartDate() {
		return startDate;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Mission)) return false;
        return mid != null && mid.equals(((Mission) o).mid);
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



	public Long getMid() {
		return mid;
	}

	public void setMid(Long mid) {
		this.mid = mid;
	}

	public ExpenseReportLine getExpenseReportLine() {
		return expenseReportLine;
	}

	public void setExpenseReportLine(ExpenseReportLine expenseReportLine) {
		this.expenseReportLine = expenseReportLine;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	@Override
	public String toString() {
		return "Mission [mid=" + mid + ", expenseReportLine=" + expenseReportLine + ", users=" + users + ", service="
				+ service + ", title=" + title + ", status=" + status + ", description=" + description + ", startDate="
				+ startDate + ", endDate=" + endDate + "]";
	}
	
	
	
	
	
	
}
