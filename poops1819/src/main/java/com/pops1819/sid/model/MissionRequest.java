package com.pops1819.sid.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class MissionRequest {
	@JsonProperty("mid")
	private Long mid;

	@JsonProperty(required = true, value = "sid")
	@NotNull
	private Long sid;

	@JsonProperty(required = true, value = "title")
	@NotNull
	private String title;

	@JsonProperty(required = true, value = "status")
	@NotNull
	private String status;

	@JsonProperty(required = true, value = "description")
	@NotNull
	private String description;

	@JsonProperty(required = true, value = "startDate")
	@NotNull
	private Date startDate;

	@JsonProperty(required = true, value = "endDate")
	@NotNull
	private Date endDate;
	
	@JsonProperty(required = true, value = "usersRequested")
	private List<UserRequest> usersRequested = new ArrayList<UserRequest>();
	
	@JsonProperty(required = true, value = "users")
	private List<UserRequest> users = new ArrayList<UserRequest>();
	
	@JsonProperty(required = true, value = "usersRefused")
	private List<UserRequest> usersRefused = new ArrayList<UserRequest>();

	public MissionRequest(Long mid, @NotNull Long sid, @NotNull String title, @NotNull String status,
			@NotNull String description, @NotNull Date startDate, @NotNull Date endDate) {
		super();
		this.mid = mid;
		this.sid = sid;
		this.title = title;
		this.status = status;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
	}

	public MissionRequest() {
		super();
	}

	@JsonCreator
	public MissionRequest(@NotNull Long sid, @NotNull String title, @NotNull String status, @NotNull String description,
			@NotNull Date startDate, @NotNull Date endDate) {
		super();
		this.sid = sid;
		this.title = title;
		this.status = status;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	
	


	public MissionRequest(Long mid, @NotNull Long sid, @NotNull String title, @NotNull String status,
			@NotNull String description, @NotNull Date startDate, @NotNull Date endDate,
			List<UserRequest> usersRequested, List<UserRequest> users, List<UserRequest> usersRefused) {
		super();
		this.mid = mid;
		this.sid = sid;
		this.title = title;
		this.status = status;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
		this.usersRequested = usersRequested;
		this.users = users;
		this.usersRefused = usersRefused;
	}

	public Long getMid() {
		return mid;
	}

	public void setMid(Long mid) {
		this.mid = mid;
	}

	public Long getSid() {
		return sid;
	}

	public void setSid(Long sid) {
		this.sid = sid;
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
	
	public List<UserRequest> getUsersRequested() {
		return usersRequested;
	}

	public void setUsersRequested(List<UserRequest> usersRequested) {
		this.usersRequested = usersRequested;
	}

	public List<UserRequest> getUsers() {
		return users;
	}

	public void setUsers(List<UserRequest> users) {
		this.users = users;
	}
	
	public List<UserRequest> getUsersRefused() {
		return usersRefused;
	}

	public void setUsersRefused(List<UserRequest> usersRefused) {
		this.usersRefused = usersRefused;
	}

	@Override
	public String toString() {
		return "MissionRequest [mid=" + mid + ", sid=" + sid + ", title=" + title + ", status=" + status
				+ ", description=" + description + ", startDate=" + startDate + ", endDate=" + endDate + "]";
	}

}
