package com.pops1819.sid.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pops1819.sid.entities.Service;
import com.pops1819.sid.entities.User;

public interface IUserRepository extends JpaRepository<User, Long> {
	public User findByUid(Long uid);

	public List<User> findByService(Service service);

	public List<User> findByServiceIsNull();

	public List<User> findByServiceIsNotNull();

	public boolean existsByEmail(String email);

	public User findByEmail(String email);

	public User findByEmailAndPassword(String email, String password);

}
