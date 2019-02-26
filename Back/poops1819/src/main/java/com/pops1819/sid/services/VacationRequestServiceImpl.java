package com.pops1819.sid.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pops1819.sid.entities.HolidayRequest;
import com.pops1819.sid.entities.Balance;
import com.pops1819.sid.entities.User;
import com.pops1819.sid.entities.Vacations;
import com.pops1819.sid.mappers.ControllerMapper;
import com.pops1819.sid.model.VacationRequest;
import com.pops1819.sid.repository.IBalanceRepository;
import com.pops1819.sid.repository.IHolidayRequestRepository;
import com.pops1819.sid.repository.IServiceRepository;
import com.pops1819.sid.repository.IUserRepository;
import com.pops1819.sid.repository.IVacationRepository;
import com.pops1819.sid.services.UserServiceImpl.USER_STATUS;

@Service
public class VacationRequestServiceImpl implements VacationRequestService {

	public static final long MILLIS_PER_DAY = 24 * 3600 * 1000;

	public static enum VACATION_REQUEST_STATUS {
		Brouillon, EnCoursValidation1, EnCoursValidation2, Valide, Refuse, Annule;
		
		@Override
		public String toString()
		{
			switch (this.ordinal()) {
			case 0:
				return "Brouillon";
			case 1:
				return "En cours de validation 1";
			case 2:
				return "En cours de validation 2";
			case 3:
				return "validée";
			case 4:
				return "refusée";
			case 5:
				return "Annulée";
			default:
				return null;
			}
		}
	}

	@Autowired
	private IBalanceRepository balanceRepository;

	@Autowired
	private IUserRepository userRepository;

	@Autowired
	private IHolidayRequestRepository holidayRequestRepository;

	@Autowired
	private ControllerMapper mapper;
	
	@Autowired
	private IServiceRepository serviceRepository;

	@Autowired
	private IServiceRepository serviceRepository;

	@Autowired
	private IVacationRepository vacationRepository;

	@Override
	public VacationRequest createVacationRequest(VacationRequest vacationRequest) {
		HolidayRequest newHolidayRequest = mapper.getHolidayRequest(vacationRequest);
		User user = userRepository.findByUid(vacationRequest.getUid());
		Balance balance = balanceRepository.findByUidAndVid(vacationRequest.getUid(), vacationRequest.getVid());
		Vacations vacations = vacationRepository.findByVid(vacationRequest.getVid());

		if (user == null || balance == null || vacations == null) {
			return null;
		}

		if (!isTheRequestValid(newHolidayRequest.getStartDate(), newHolidayRequest.getEndDate(), vacationRequest,
				balance.getRemainingBalance())) {
			System.out.println("la difference entre les date n'est pas valide");
			return null;
		}

		if (vacationRequest.getStatus() == null
				|| (!vacationRequest.getStatus().equals(VACATION_REQUEST_STATUS.EnCoursValidation1.toString())))
			newHolidayRequest.setStatus(VACATION_REQUEST_STATUS.Brouillon.toString());

		newHolidayRequest.setVacations(vacations);
		newHolidayRequest.setRequestDate(new Date());
		newHolidayRequest.setTraitmentDate(new Date());
		newHolidayRequest.setUser(user);

		holidayRequestRepository.save(newHolidayRequest);
		return mapper.getVacationRequest(newHolidayRequest);
	}
	
	@Override
	public VacationRequest updateVacationRequest(VacationRequest vacationRequest) {
		HolidayRequest newHolidayRequest = mapper.getHolidayRequest(vacationRequest);
		HolidayRequest holidayRequest = holidayRequestRepository.findByDid(vacationRequest.getDid());
		Balance balance = balanceRepository.findByUidAndVid(vacationRequest.getUid(), vacationRequest.getVid());
		Vacations vacations = vacationRepository.findByVid(vacationRequest.getVid());

		if (holidayRequest == null || balance == null || vacations == null) {
			return null;
		}
		if (!isTheRequestValid(vacationRequest.getStartDate(), vacationRequest.getEndDate(), vacationRequest,
				balance.getRemainingBalance())) {
			System.out.println("isTheRequestValid Issue - Temporal time constraints not respected ");
			return null;
		}

		if (holidayRequest.getUser() == null) {
			System.out.println("The user entered does not exist");
			return null;
		}

		if (holidayRequest.getStatus().equals(VACATION_REQUEST_STATUS.EnCoursValidation1.toString())
				|| holidayRequest.getStatus().equals(VACATION_REQUEST_STATUS.EnCoursValidation2.toString())
				|| holidayRequest.getStatus().equals(VACATION_REQUEST_STATUS.Valide.toString())) {
			System.out.println(
					"You cannot update the status of a Validate Request or a request already submit for the validation process");
			return null;
		}

		newHolidayRequest.setEndDate((holidayRequest.getEndDate()));
		newHolidayRequest.setRequestDate((holidayRequest.getRequestDate()));
		newHolidayRequest.setTraitmentDate((holidayRequest.getTraitmentDate()));
		newHolidayRequest.setVacations(vacations);
		newHolidayRequest.setUser(holidayRequest.getUser());

		holidayRequestRepository.save(newHolidayRequest);
		return mapper.getVacationRequest(newHolidayRequest);
	}

	@Override
	public boolean removeVacationRequest(Long did, Long uid) {
		User user = userRepository.findByUid(uid);
		if (user == null)
			return false;

		HolidayRequest holidayRequest = holidayRequestRepository.findByDidAndUser(did, user);
		if (holidayRequest == null)
			return false;

		holidayRequestRepository.delete(holidayRequest);
		return true;
	}

	@Override
	public boolean cancelVacationRequest(Long did, Long uid) {

		HolidayRequest holidayRequest = holidayRequestRepository.findByDid(did);
		User applicantForLeave = userRepository.findByUid(uid);

		if (applicantForLeave == null)
			return false;

		if (holidayRequest == null) {
			System.out.println("HolidayRequest is NULL");
			return false;
		}

		/*
		 * long msDiff = holidayRequest.getEndDate().getTime() -
		 * holidayRequest.getStartDate().getTime(); double daysDiff = Math.round(msDiff
		 * / ((double) MILLIS_PER_DAY)); double s = holidayRequest.isStart() ? 0.5 : 0;
		 * double e = holidayRequest.isEnd() ? -0.5 : 0; daysDiff = daysDiff - s - e;
		 * 
		 * TypeOfLeave typeofleave = holidayRequest.getTypeOfLeave();
		 * typeofleave.setRemainingBalance(typeofleave.getRemainingBalance()+(daysDiff))
		 * ; holidayRequest.setTypeOfLeave(typeofleave);
		 * 
		 */

		holidayRequest.setStatus(VACATION_REQUEST_STATUS.Annule.toString());
		holidayRequestRepository.save(holidayRequest);

		return true;
	}

	@Override
	public boolean refuseVacationRequest(Long did, Long uid) {

		User userValidator = userRepository.findByUid(uid);
		if (userValidator == null)
			return false;

		HolidayRequest holidayRequest = holidayRequestRepository.findByDid(did);
		if (holidayRequest == null)
			return false;

		User applicantForLeave = holidayRequest.getUser();
		if (applicantForLeave == null) {
			System.out.println("applicantForLeave = null");
			return false;
		}

		if (userValidator.getUid() == applicantForLeave.getUid())
			return false;

		if (applicantForLeave.getService() == null || userValidator.getService() == null) {
			return false;
		}

		// ----

		if (holidayRequest.getStatus().equals(VACATION_REQUEST_STATUS.EnCoursValidation1.toString())) {
			if (!userValidator.getStatus().equals(USER_STATUS.HeadOfService.toString()))
				return false;
			if (applicantForLeave.getService().getName().equals("Management")) {
				if (!userValidator.getService().getName().equals("HumanResource"))
					return false;
			} else if (applicantForLeave.getStatus().equals(USER_STATUS.HeadOfService.toString())) {
				if (!userValidator.getService().getName().equals("Management"))
					return false;
			} else if (applicantForLeave.getStatus().equals(USER_STATUS.Collaborator.toString())) {
				if (applicantForLeave.getService().getSid() != userValidator.getService().getSid())
					return false;
			} else {
				return false;
			}

			holidayRequest.setStatus(VACATION_REQUEST_STATUS.EnCoursValidation2.toString());
		} else if (holidayRequest.getStatus().equals(VACATION_REQUEST_STATUS.EnCoursValidation2.toString())) {
			if (applicantForLeave.getService().getName().equals("Management")) {
				if (!userValidator.getStatus().equals(USER_STATUS.HeadOfService.toString())
						|| !userValidator.getService().getName().equals("HumanResource"))
					return false;

			} else if (applicantForLeave.getService().getName().equals("HumanResource")) {
				if (applicantForLeave.getStatus().equals(USER_STATUS.HeadOfService.toString())) {
					if (!userValidator.getService().getName().equals("Management"))
						return false;
				} else {
					if (!userValidator.getStatus().equals(USER_STATUS.HeadOfService.toString())
							|| !userValidator.getService().getName().equals("HumanResource"))
						return false;
				}
			} else if (!userValidator.getService().getName().equals("HumanResource")) {
				return false;
			}
		} else {
			return false;
		}

		// --

		holidayRequest.setStatus(VACATION_REQUEST_STATUS.Refuse.toString());
		holidayRequestRepository.save(holidayRequest);

		return true;
	}

	@Override
	public boolean approveVacationRequest(Long did, Long uid) {
		User userValidator = userRepository.findByUid(uid);
		if (userValidator == null)
			return false;

		HolidayRequest holidayRequest = holidayRequestRepository.findByDid(did);

		if (holidayRequest == null)
			return false;

		User applicantForLeave = holidayRequest.getUser();

		if (applicantForLeave == null) {
			System.out.println("applicantForLeave = null");
			return false;
		}

		if (userValidator.getUid() == applicantForLeave.getUid())
			return false;

		if (applicantForLeave.getService() == null || userValidator.getService() == null) {
			return false;
		}
		if (holidayRequest.getStatus().equals(VACATION_REQUEST_STATUS.EnCoursValidation1.toString())) {
			if (!userValidator.getStatus().equals(USER_STATUS.HeadOfService.toString()))
				return false;
			if (applicantForLeave.getService().getName().equals("Management")) {
				if (!userValidator.getService().getName().equals("HumanResource"))
					return false;
			} else if (applicantForLeave.getStatus().equals(USER_STATUS.HeadOfService.toString())) {
				if (!userValidator.getService().getName().equals("Management"))
					return false;
			} else if (applicantForLeave.getStatus().equals(USER_STATUS.Collaborator.toString())) {
				if (applicantForLeave.getService().getSid() != userValidator.getService().getSid())
					return false;
			} else {
				return false;
			}

			holidayRequest.setStatus(VACATION_REQUEST_STATUS.EnCoursValidation2.toString());
		} else if (holidayRequest.getStatus().equals(VACATION_REQUEST_STATUS.EnCoursValidation2.toString())) {
			if (applicantForLeave.getService().getName().equals("Management")) {
				if (!userValidator.getStatus().equals(USER_STATUS.HeadOfService.toString())
						|| !userValidator.getService().getName().equals("HumanResource"))
					return false;

			} else if (applicantForLeave.getService().getName().equals("HumanResource")) {
				if (applicantForLeave.getStatus().equals(USER_STATUS.HeadOfService.toString())) {
					if (!userValidator.getService().getName().equals("Management"))
						return false;
				} else {
					if (!userValidator.getStatus().equals(USER_STATUS.HeadOfService.toString())
							|| !userValidator.getService().getName().equals("HumanResource"))
						return false;
				}
			} else if (!userValidator.getService().getName().equals("HumanResource")) {
				return false;
			}

			holidayRequest.setStatus(VACATION_REQUEST_STATUS.Valide.toString());
			Balance balance = balanceRepository.findByUidAndVid(uid, holidayRequest.getVacations().getVid());
			double newRemainingBalance = balance.getRemainingBalance() - getNumberOfDaysTaken(holidayRequest);
			System.out.println(newRemainingBalance);
			if (newRemainingBalance < 0)
				return false;
			balance.setRemainingBalance(newRemainingBalance);
			balanceRepository.save(balance);
		} else {
			return false;
		}

		holidayRequestRepository.save(holidayRequest);

		return true;

	}

	@Override
	public List<VacationRequest> getVacationRequestListByUID(Long uid) {
		if (!userRepository.existsById(uid))
			return null;
		return mapper.getVacationRequestList(holidayRequestRepository.findByUser(userRepository.findByUid(uid)));
	}
	@Override
	public List<VacationRequest> getVacationRequestListByStatus(String status) {
		return mapper.getVacationRequestList(holidayRequestRepository.findByStatus(status));
	}

	@Override
	public List<VacationRequest> getVacationRequestListBySID(Long sid) {
		if (!serviceRepository.existsBySid(sid))
			return null;
		com.pops1819.sid.entities.Service service = serviceRepository.findBySid(sid);
		List<VacationRequest> returnValue = new ArrayList<>();
		List<User> users = userRepository.findByService(service);
		users.forEach(u -> returnValue.addAll(mapper.getVacationRequestList(u.getHolidayRequests())));
		return returnValue;
	}

	private boolean isTheRequestValid(Date start, Date end, VacationRequest vacationRequest ,Double remainingBalance) {
		//Ajouter demande de congés doit se faire 7 jours avant au minimum
		long dateDuJour = new Date().getTime();
		
		if(dateDuJour - start.getTime() > 0 )
			return false;
		
		long msDiff = end.getTime() - start.getTime();
		//Permet de prendre congés minimum une semaine avant
		long msDiff2 = start.getTime() - dateDuJour;
		
		double daysDiff = Math.round(msDiff / ((double) MILLIS_PER_DAY));
		double daysDiff2 = Math.round(msDiff2 / ((double) MILLIS_PER_DAY));
		
		double s = vacationRequest.isStart() ? 0.5 : 0;
		double e = vacationRequest.isEnd() ? -0.5 : 0;
		
		if(daysDiff == 0 
				&& ((vacationRequest.isStart() && vacationRequest.isEnd()) ||
						(!vacationRequest.isStart() && !vacationRequest.isEnd())
					)
		)
			return false;
		
		daysDiff = daysDiff - s - e;
		daysDiff2 = daysDiff2 - s - e;
		
		System.out.println(daysDiff2);
		
		if(daysDiff2 < 7) {
			System.out.println("PLEASE CHECK  - Holidays must be taken at least 7 days before the start date");
			return false;
		}
		
		if (daysDiff < 0)
			return false;

		if (remainingBalance < daysDiff)
			return false;

		return true;
	}

	// a deplacer dans la classe holiday request
	private double getNumberOfDaysTaken(HolidayRequest holidayRequest) {
		long msDiff = holidayRequest.getEndDate().getTime() - holidayRequest.getStartDate().getTime();
		double daysDiff = Math.round(msDiff / ((double) MILLIS_PER_DAY));
		double s = holidayRequest.isStart() ? 0.5 : 0;
		double e = holidayRequest.isEnd() ? -0.5 : 0;

		daysDiff = daysDiff - s - e;
		System.out.println("Difference entre les deux date est :" + daysDiff);
		return daysDiff;
	}
	
	@Override 
	public List<VacationRequest> getVacationRequestAll(){
		return mapper.getVacationRequestList(holidayRequestRepository.findAll());
	}


}
