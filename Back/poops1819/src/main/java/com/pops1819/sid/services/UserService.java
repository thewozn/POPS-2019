package com.pops1819.sid.services;

import java.util.List;

import com.pops1819.sid.entities.User;
import com.pops1819.sid.model.UserRequest;

public interface UserService 
{
	public User saveUser(UserRequest user);
	public List<UserRequest> getUserList();
	public UserRequest findUserById(Long uid);
	public boolean assignUserToService(Long uid, Long sid);
	public List<UserRequest> getUnassignedUserList();
	public List<UserRequest> getAssignedUserList();
	public List<UserRequest> getUserListByService(Long sid);
}
