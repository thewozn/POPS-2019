package com.pops1819.sid.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pops1819.sid.entities.HolidayRequest;
import com.pops1819.sid.entities.Service;
import com.pops1819.sid.entities.User;
/**
 * @author aboubakr
 *
 */
public interface IHolidayRequestRepository extends JpaRepository<HolidayRequest, Long> {

	public List<HolidayRequest> findByUser(User user);
	public HolidayRequest findByDidAndUser(Long did, User user);
	public HolidayRequest findByDid(Long did);
	public List<HolidayRequest> findByStatus(String status);

}
