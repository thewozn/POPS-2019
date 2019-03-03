package com.pops1819.sid.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.stereotype.Component;

import com.pops1819.sid.entities.Balance;
import com.pops1819.sid.entities.ExpenseReport;
import com.pops1819.sid.entities.ExpenseReportLine;
import com.pops1819.sid.entities.HolidayRequest;
import com.pops1819.sid.entities.Mission;
import com.pops1819.sid.entities.Service;
import com.pops1819.sid.entities.User;
import com.pops1819.sid.model.BalanceRequest;
import com.pops1819.sid.model.ExpenseReportLineRequest;
import com.pops1819.sid.model.ExpenseReportRequest;
import com.pops1819.sid.model.MissionRequest;
import com.pops1819.sid.model.ServiceRequest;
import com.pops1819.sid.model.UserRequest;
import com.pops1819.sid.model.VacationRequest;
/**
 * @author aboubakr
 *
 */
@Component
@Mapper(componentModel = "spring")
public interface ControllerMapper {

	/*
	 * Mapping User to UserRequest. argument = (source) return = (target)
	 * Ex: @Mapping(source="firstName" , target="prenom") UserRequest
	 * getUserRequet(User user);
	 */
	@Mappings({ @Mapping(source = "user.uid", target = "uid"),
		@Mapping(source = "user.service.sid", target = "sid")})
	UserRequest getUserRequet(User user);

	List<UserRequest> getUserRequetList(List<User> userList);

	/*
	 * Mapping userRequest to User.
	 */

	User getUser(UserRequest userRequest);

	List<User> getUserList(List<UserRequest> userRequestList);

	/*
	 * Mapping Service to ServiceRequest.
	 */

	@Mappings({ @Mapping(source = "service.headOfService.uid", target = "headOfService") })
	ServiceRequest getServiceRequest(Service service);

	List<ServiceRequest> getServiceRequestList(List<Service> serviceList);

	/*
	 * Mapping ServiceRequest to Service
	 * 
	 */

	@Mappings({ @Mapping(source = "headOfService", target = "headOfService.uid") })
	Service getService(ServiceRequest serviceRequest);

	List<Service> getService(List<ServiceRequest> serviceRequest);

	
	
	/*
	 * Mapping HolidayRequest to LeaveRequest
	 * 
	 */
	
//	@Mappings({ @Mapping(source = "holidayRequest.user.uid", target = "uid"),
//				@Mapping(source = "holidayRequest.typeOfLeave.tcid", target = "tcid")
//		})
////	LeaveRequest getLeaveRquest(HolidayRequest holidayRequest);

//	List<LeaveRequest> getLeaveRequestList(List<HolidayRequest> holidayRequestList);

	/*
	 * Mapping LeaveRequest to HolidayRequest
	 * 
	 */

//	HolidayRequest getHolidayRequest(LeaveRequest leaveRequest);

//	List<HolidayRequest> getHolidayRequestList(List<LeaveRequest> leaveRequest);
	
	
	/*
	 * Mapping HolidayRequest to LeaveRequest
	 * 
	 */
	
	@Mappings({ @Mapping(source = "holidayRequest.did", target = "did"),
				@Mapping(source = "holidayRequest.user.uid", target = "uid"),
				@Mapping(source = "holidayRequest.vacations.vid", target = "vid")
		})
	VacationRequest getVacationRequest(HolidayRequest holidayRequest);

	List<VacationRequest> getVacationRequestList(List<HolidayRequest> holidayRequestList);

	/*
	 * Mapping LeaveRequest to HolidayRequest
	 * 
	 */

	HolidayRequest getHolidayRequest(VacationRequest vacationRequest);

	List<HolidayRequest> getHolidayRequestList(List<VacationRequest> vacationRequest);
	
	
	
	@Mappings({ @Mapping(source = "mission.mid", target = "mid"),
		@Mapping(source = "mission.service.sid", target = "sid"),
		@Mapping(source = "mission.requestedUsers", target = "usersRequested")})
	MissionRequest getMissionRequest(Mission mission);

	List<MissionRequest> getMissionRequestList(List<Mission> missionList);

	/*
	 * Mapping MissionRequest to Mission.
	 */

	Mission getMission(MissionRequest missionRequest);

	List<User> getMissionList(List<MissionRequest> missionRequestList);
	
	
	
	@Mappings({ @Mapping(source = "balance.bid", target = "bid"),
		@Mapping(source = "balance.user.uid", target = "uid"),
		@Mapping(source = "balance.vacations.name", target = "name")})
	BalanceRequest getBalanceRequest(Balance balance);
	List<BalanceRequest> getBalanceRequestList(List<Balance> balanceList);
	
	Balance getBalance(BalanceRequest balanceRequest);
	List<Balance> getBalanceList(List<BalanceRequest> balanceRequestList);
	
	
	@Mappings({ @Mapping(source = "expenseReport.did", target = "did"),
		@Mapping(source = "expenseReport.user.uid", target = "uid")})
	ExpenseReportRequest getExpenseReportRequest(ExpenseReport expenseReport);
	List<ExpenseReportRequest> getExpenseReportRequestList(List<ExpenseReport> expenseReportList);
	
	ExpenseReport getExpenseReport(ExpenseReportRequest expenseReportRequest);
	List<ExpenseReport> getExpenseReportList(List<ExpenseReportRequest> expenseReportRequestList);
	
	
	@Mappings({ @Mapping(source = "expenseReportLine.lndfid", target = "lndfid"),
		@Mapping(source = "expenseReportLine.expenseReport.did", target = "did"),
		@Mapping(source = "expenseReportLine.mission.title", target = "missionTitle")})
	ExpenseReportLineRequest getExpenseReportLineRequest(ExpenseReportLine expenseReportLine);
	List<ExpenseReportLineRequest> getExpenseReportLineRequestList(List<ExpenseReportLine> expenseReportLineList);

	ExpenseReportLine getExpenseReportLine(ExpenseReportLineRequest expenseReportLineRequest);
	List<ExpenseReportLine> getExpenseReportLineList(List<ExpenseReportLineRequest> expenseReportLineRequestList);
}

