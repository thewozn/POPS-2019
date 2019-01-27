package com.pops1819.sid.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pops1819.sid.entities.HolidayRequest;
import com.pops1819.sid.entities.TypeOfLeave;
import com.pops1819.sid.entities.User;
import com.pops1819.sid.mappers.ControllerMapper;
import com.pops1819.sid.model.VacationRequest;
import com.pops1819.sid.repository.IHolidayRequestRepository;
import com.pops1819.sid.repository.ITypeOfLeaveRepository;
import com.pops1819.sid.repository.IUserRepository;

@Service
public class VacationRequestServiceImpl implements VacationRequestService {

	public static final long MILLIS_PER_DAY = 24 * 3600 * 1000;

	@Autowired
	private ITypeOfLeaveRepository typeOfLeaveRepository;

	@Autowired
	private IUserRepository userRepository;

	@Autowired
	private IHolidayRequestRepository holidayRequestRepository;

	@Autowired
	private ControllerMapper mapper;

	@Override
	public VacationRequest addVacationRequest(VacationRequest vacationRequest) {
		HolidayRequest newHolidayRequest = mapper.getHolidayRequest(vacationRequest);
		User user = userRepository.findByUid(vacationRequest.getUid());
		TypeOfLeave typeOfLeave = typeOfLeaveRepository.findByTcid(vacationRequest.getTcid());

		if (user == null || typeOfLeave == null) {
			System.out.println("it's null");
			return null;
		}

		if (typeOfLeave.getUser().getUid() != user.getUid()) {
			System.out.println("le congé n'est pas le bon");
			return null;
		}

		if (!isTheRequestValid(newHolidayRequest.getStartDate(), newHolidayRequest.getEndDate(),
				typeOfLeave.getRemainingBalance())) {
			System.out.println("la difference entre les date n'est pas valide");
			return null;
		}

		newHolidayRequest.setTypeOfLeave(typeOfLeave);
		newHolidayRequest.setRequestDate(new Date());
		newHolidayRequest.setTraitmentDate(new Date());
		newHolidayRequest.setUser(user);

		holidayRequestRepository.save(newHolidayRequest);
		return mapper.getVacationRequest(newHolidayRequest);
	}

	@Override
	public VacationRequest modifyVacationRequest(VacationRequest vacationRequest) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean removeVacationRequest(Long did, Long uid) {
		User user = userRepository.findByUid(uid);
		if(user == null)
			return false;
		
		HolidayRequest holidayRequest = holidayRequestRepository.findByDidAndUser(did, user);
		if(holidayRequest == null)
			return false;
		
		holidayRequestRepository.delete(holidayRequest);
		return true;
	}

	@Override
	public List<VacationRequest> getVacationRequestList(Long uid) {
		if(!userRepository.existsById(uid))
			return null;
		return mapper.getVacationRequestList(holidayRequestRepository.findByUser(userRepository.findByUid(uid)));
	}

	private boolean isTheRequestValid(Date start, Date end, long remainingBalance) {
		long msDiff = end.getTime() - start.getTime();
		long daysDiff = Math.round(msDiff / ((double) MILLIS_PER_DAY));

		if (daysDiff < 0)
			return false;

		if (remainingBalance < daysDiff)
			return false;

		return true;
	}

}
