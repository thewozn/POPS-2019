package com.pops1819.sid.model;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ServiceRequest
{
	@JsonProperty("sid")
	private Long sid;
	
	@JsonProperty(required = true, value ="headOfService")
	@NotNull
	private Long headOfService;
	
	@JsonProperty(required = true, value ="name")
	@NotNull
	private String name;
	
	public ServiceRequest() {
		super();
	}
	
	@JsonCreator
	public ServiceRequest(Long sid, @NotNull Long headOfService, @NotNull String name) {
		super();
		this.sid = sid;
		this.headOfService = headOfService;
		this.name = name;
	}

	public Long getHeadOfService() {
		return headOfService;
	}

	public void setHeadOfService(Long headOfService) {
		this.headOfService = headOfService;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getSid() {
		return sid;
	}

	public void setSid(Long sid) {
		this.sid = sid;
	}

	@Override
	public String toString() {
		return "ServiceRequest [sid=" + sid + ", headOfService=" + headOfService + ", name=" + name + "]";
	}
	
	
	
}
