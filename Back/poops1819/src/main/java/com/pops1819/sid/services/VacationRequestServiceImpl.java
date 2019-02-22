package com.pops1819.sid.services;

import java.util.ArrayList;
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
import com.pops1819.sid.repository.IServiceRepository;
import com.pops1819.sid.repository.ITypeOfLeaveRepository;
import com.pops1819.sid.repository.IUserRepository;
import com.pops1819.sid.services.UserServiceImpl.USER_STATUS;

@Service
public class VacationRequestServiceImpl implements VacationRequestService {

	public static final long MILLIS_PER_DAY = 24 * 3600 * 1000;

	public static enum VACATION_REQUEST_STATUS 
	{
		Brouillon,
		EnCoursValidation1,
		EnCoursValidation2,
		Valide,
		Refuse,
		annule
	}
	
	@Autowired
	private ITypeOfLeaveRepository typeOfLeaveRepository;

	@Autowired
	private IUserRepository userRepository;

	@Autowired
	private IHolidayRequestRepository holidayRequestRepository;

	@Autowired
	private ControllerMapper mapper;
	
	@Autowired
	private IServiceRepository serviceRepository;

	@Override
	public VacationRequest createVacationRequest(VacationRequest vacationRequest) {
		HolidayRequest newHolidayRequest = mapper.getHolidayRequest(vacationRequest);
		User user = userRepository.findByUid(vacationRequest.getUid());		
		TypeOfLeave typeOfLeave = typeOfLeaveRepository.findByUidAndVid(vacationRequest.getUid(), vacationRequest.getVid());

		if (user == null || typeOfLeave == null) {
			return null;
		}
		
		if (!isTheRequestValid(newHolidayRequest.getStartDate(), newHolidayRequest.getEndDate(), vacationRequest,
				typeOfLeave.getRemainingBalance())) {
			System.out.println("la difference entre les date n'est pas valide");
			return null;
		}
		
		if(vacationRequest.getStatus() == null 
				|| (!vacationRequest.getStatus().equals(VACATION_REQUEST_STATUS.EnCoursValidation1.name())))
				newHolidayRequest.setStatus(VACATION_REQUEST_STATUS.Brouillon.name());
			
		newHolidayRequest.setTypeOfLeave(typeOfLeave);
		newHolidayRequest.setRequestDate(new Date());
		newHolidayRequest.setTraitmentDate(new Date());
		newHolidayRequest.setUser(user);

		holidayRequestRepository.save(newHolidayRequest);
		return mapper.getVacationRequest(newHolidayRequest);
	}
	
	@Override
	public VacationRequest updateVacationRequest(VacationRequest vacationRequest) {
		HolidayRequest holidayRequest = holidayRequestRepository.findByDid(vacationRequest.getDid());
		User user = userRepository.findByUid(vacationRequest.getUid());		
		TypeOfLeave typeOfLeave = typeOfLeaveRepository.findByUidAndVid(vacationRequest.getUid(), vacationRequest.getVid());

		if (user == null || typeOfLeave == null || holidayRequest == null) {
			return null;
		}
		
		if (!isTheRequestValid(holidayRequest.getStartDate(), holidayRequest.getEndDate(), vacationRequest,
				typeOfLeave.getRemainingBalance())) {
			System.out.println("la difference entre les date n'est pas valide");
			return null;
		}
		
		if(vacationRequest.getStatus() == null 
				|| (!vacationRequest.getStatus().equals(VACATION_REQUEST_STATUS.EnCoursValidation1.name())))
			holidayRequest.setStatus(VACATION_REQUEST_STATUS.Brouillon.name());
		
		holidayRequest.setTypeOfLeave(typeOfLeave);
		holidayRequest.setRequestDate(new Date());
		holidayRequest.setTraitmentDate(new Date());
		holidayRequest.setUser(user);
		
		holidayRequestRepository.save(holidayRequest);
		return mapper.getVacationRequest(holidayRequest);
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
	public boolean cancelVacationRequest(Long did, Long uid) {
		
		return false;
	}
	
	@Override
	public boolean refuseVacationRequest(Long did, Long uid) {
		User userValidator = userRepository.findByUid(uid);
		if(userValidator == null)
			return false;
		
		HolidayRequest holidayRequest = holidayRequestRepository.findByDid(did);
		
		if(holidayRequest == null)
			return false;
		
		User applicantForLeave = holidayRequest.getUser();
		
		if(applicantForLeave == null)
		{
			System.out.println("applicantForLeave = null");
			return false;
		}
		
		if(userValidator.getUid() == applicantForLeave.getUid())
			return false;

		if(applicantForLeave.getService() == null || userValidator.getService() == null)
		{
			return false;
		}
		
		if(holidayRequest.getStatus().equals(VACATION_REQUEST_STATUS.EnCoursValidation1.name()))
		{
			if(!userValidator.getStatus().equals(USER_STATUS.HeadOfService.name()))
				return false;
			if(applicantForLeave.getService().getName().equals("Management"))
			{
				if(!userValidator.getService().getName().equals("HumanResource"))
					return false;
			}else if(applicantForLeave.getStatus().equals(USER_STATUS.HeadOfService.name()))
			{
				if(!userValidator.getService().getName().equals("Management")) 
					return false;
			}else if(applicantForLeave.getStatus().equals(USER_STATUS.Collaborator.name()))
			{
				if(applicantForLeave.getService().getSid() != userValidator.getService().getSid())
					return false;
			}else
			{
				return false;
			}
		}else if(holidayRequest.getStatus().equals(VACATION_REQUEST_STATUS.EnCoursValidation2.name()))
		{
			if(!userValidator.getService().getName().equals("HumanResource"))
				return false;
		}else
		{
			return false;
		}
		
		holidayRequest.setStatus(VACATION_REQUEST_STATUS.Refuse.name());
		holidayRequestRepository.save(holidayRequest);

		return false;
	}


	
	@Override
	public boolean approveVacationRequest(Long did, Long uid) {
		User userValidator = userRepository.findByUid(uid);
		if(userValidator == null)
			return false;
		
		HolidayRequest holidayRequest = holidayRequestRepository.findByDid(did);
				
		if(holidayRequest == null)
			return false;
		
		User applicantForLeave = holidayRequest.getUser();
		
		if(applicantForLeave == null)
		{
			System.out.println("applicantForLeave = null");
			return false;
		}
		
		if(userValidator.getUid() == applicantForLeave.getUid())
			return false;

		if(applicantForLeave.getService() == null || userValidator.getService() == null)
		{
			return false;
		}
		if(holidayRequest.getStatus().equals(VACATION_REQUEST_STATUS.EnCoursValidation1.name()))
		{
			if(!userValidator.getStatus().equals(USER_STATUS.HeadOfService.name()))
				return false;
			if(applicantForLeave.getService().getName().equals("Management"))
			{
				if(!userValidator.getService().getName().equals("HumanResource"))
					return false;
			}else if(applicantForLeave.getStatus().equals(USER_STATUS.HeadOfService.name()))
			{
				if(!userValidator.getService().getName().equals("Management")) 
					return false;
			}else if(applicantForLeave.getStatus().equals(USER_STATUS.Collaborator.name()))
			{
				if(applicantForLeave.getService().getSid() != userValidator.getService().getSid())
					return false;
			}else
			{
				return false;
			}
			
			holidayRequest.setStatus(VACATION_REQUEST_STATUS.EnCoursValidation2.name());
		}else if(holidayRequest.getStatus().equals(VACATION_REQUEST_STATUS.EnCoursValidation2.name()))
		{
			if(applicantForLeave.getService().getName().equals("Management"))
			{
				if(!userValidator.getStatus().equals(USER_STATUS.HeadOfService.name())
						|| !userValidator.getService().getName().equals("HumanResource"))
					return false;
				
			}else if(applicantForLeave.getService().getName().equals("HumanResource"))
			{
				if(applicantForLeave.getStatus().equals(USER_STATUS.HeadOfService.name()))
				{
					if(!userValidator.getService().getName().equals("Management"))
						return false;
				}else{
					if(!userValidator.getStatus().equals(USER_STATUS.HeadOfService.name())
							||  !userValidator.getService().getName().equals("HumanResource"))
						return false;
				}
			} else if(!userValidator.getService().getName().equals("HumanResource"))
			{
				return false;
			}
			
			holidayRequest.setStatus(VACATION_REQUEST_STATUS.Valide.name());
			TypeOfLeave typeOfLeave = holidayRequest.getTypeOfLeave();
			double newRemainingBalance = typeOfLeave.getRemainingBalance() - getNumberOfDaysTaken(holidayRequest);
			System.out.println(newRemainingBalance);
			if(newRemainingBalance < 0)
				return false;
			typeOfLeave.setRemainingBalance(newRemainingBalance);
			typeOfLeaveRepository.save(typeOfLeave);
		}else
		{
			return false;
		}
		
		holidayRequestRepository.save(holidayRequest);
				
		return true;
		
	}

	@Override
	public List<VacationRequest> getVacationRequestListByUID(Long uid) {
		if(!userRepository.existsById(uid))
			return null;
		return mapper.getVacationRequestList(holidayRequestRepository.findByUser(userRepository.findByUid(uid)));
	}
	
	@Override
	public List<VacationRequest> getVacationRequestListByStatus(String status) {
		return mapper.getVacationRequestList(holidayRequestRepository.findByStatus(status));
	}
	
	@Override
	public List<VacationRequest> getVacationRequestListBySID(Long sid)
	{
		if(!serviceRepository.existsBySid(sid))
			return null;
		com.pops1819.sid.entities.Service service = serviceRepository.findBySid(sid);
		List<VacationRequest> returnValue = new ArrayList<>();
		List<User> users = userRepository.findByService(service);		
		users.forEach(u-> returnValue.addAll(mapper.getVacationRequestList(u.getHolidayRequests())));
		return returnValue;
	}
	
	private boolean isTheRequestValid(Date start, Date end, VacationRequest vacationRequest ,Double remainingBalance) {
		
		if(new Date().getTime() - start.getTime() > 0 )
			return false;
		long msDiff = end.getTime() - start.getTime();
		double daysDiff = Math.round(msDiff / ((double) MILLIS_PER_DAY));
		double s = vacationRequest.isStart() ? 0.5 : 0;
		double e = vacationRequest.isEnd() ? -0.5 : 0;

		if(daysDiff == 0 
				&& ((vacationRequest.isStart() && vacationRequest.isEnd()) ||
						(!vacationRequest.isStart() && !vacationRequest.isEnd())
					)
		)
			return false;
			
		daysDiff = daysDiff - s - e;
				
		if (daysDiff < 0)
			return false;

		if (remainingBalance < daysDiff)
			return false;

		return true;
	}
	
	// a deplacer dans la classe holiday request
	private double getNumberOfDaysTaken(HolidayRequest holidayRequest) {
		long msDiff = holidayRequest.getEndDate().getTime() -  holidayRequest.getStartDate().getTime();
		double daysDiff = Math.round(msDiff / ((double) MILLIS_PER_DAY));
		double s = holidayRequest.isStart() ? 0.5 : 0;
		double e = holidayRequest.isEnd() ? -0.5 : 0;

		daysDiff = daysDiff - s - e;
		System.out.println("Difference entre les deux date est :" + daysDiff);
		return daysDiff;
	}

}
