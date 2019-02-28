package com.pops1819.sid;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.pops1819.sid.entities.Balance;
import com.pops1819.sid.entities.User;
import com.pops1819.sid.entities.Vacations;
import com.pops1819.sid.repository.IBalanceRepository;
import com.pops1819.sid.repository.IServiceRepository;
import com.pops1819.sid.repository.IUserRepository;
import com.pops1819.sid.repository.IVacationRepository;
/**
 * @author aboubakr
 *
 */
@EnableAutoConfiguration
@SpringBootApplication
@EntityScan("com.pops1819.sid.entities")
@EnableJpaRepositories("com.pops1819.sid.repository")
@ComponentScan(basePackages = {"com.pops1819.sid"}) 
public class Poops1819Application {

	public static void main(String[] args) {
		SpringApplication.run(Poops1819Application.class, args);
	}
	
	@Bean
	CommandLineRunner start(IVacationRepository vacationRepository, IUserRepository userRepository, IServiceRepository serviceRepository, IBalanceRepository balanceRepository)
	{
		return args->
		{
			
			if(userRepository.findByEmail("aboubakr.oudghiri@gmail.com") == null)
			{
				
				Vacations rtt = new Vacations(1L, "RTT", 365.);
				Vacations congesPayes = new Vacations(2L, "Congés payés", 30.);
				
				vacationRepository.save(rtt);
				vacationRepository.save(congesPayes);
				
				User headOfAccountingService = new User( 1L,
														"HeadOfService",
														"OUDGHIRI",
														"Aboubakr",
														new Date(1995-1900, 04, 9),
														"aboubakr.oudghiri@gmail.com",
														"2 rue vernier",
														"94100",
														"Saint Maur",
														"France",
														"mymdp",
														"./imgs/aboubakr_oudghiri.jpg"
														) ;
				User headOfHumanResourceService = new User(2L,
														"HeadOfService",
														"HAMOU-MAMAR",
														"Mourad",
														new Date(1995-1900, 02, 16),
														"mourad.hamou-mamar@gmail.com",
														"34 rue de verdun",
														"37300",
														"Joué-Lès-Tours",
														"France",
														"92ppbqay",
														"./imgs/mourad_hamou-mamr.jpg"
														);
				User headManagementService = new User(3L,
														"HeadOfService",
														"ROCHE",
														"Adam",
														new Date(1995-1900, 02, 16),
														"adam.roche@gmail.com",
														"10 rue de la paix",
														"75002",
														"Paris",
														"France",
														"0G8lKJ34",
														"./imgs/adam_roche.jpg"
														) ;
			
				
	
				com.pops1819.sid.entities.Service accountingService = new com.pops1819.sid.entities.Service(1L, headOfAccountingService, "Accounting");
				com.pops1819.sid.entities.Service humanResourceService = new com.pops1819.sid.entities.Service(2L, headOfHumanResourceService, "HumanResource");
				com.pops1819.sid.entities.Service ManagementService = new com.pops1819.sid.entities.Service(3L, headManagementService, "Management");

				
				userRepository.save(headOfAccountingService);
				userRepository.save(headOfHumanResourceService);
				userRepository.save(headManagementService);

				serviceRepository.save(accountingService);
				serviceRepository.save(humanResourceService);
				serviceRepository.save(ManagementService);

				headOfAccountingService.setService(accountingService);
				headOfHumanResourceService.setService(humanResourceService);
				headManagementService.setService(ManagementService);
				
				userRepository.save(headOfAccountingService);
				userRepository.save(headOfHumanResourceService);
				userRepository.save(headManagementService);

				
				
				balanceRepository.save(new Balance(rtt.getMaxDays(), rtt, headOfAccountingService));
				balanceRepository.save(new Balance(congesPayes.getMaxDays(), congesPayes, headOfAccountingService));

				
				balanceRepository.save(new Balance(rtt.getMaxDays(), rtt, headOfHumanResourceService));
				balanceRepository.save(new Balance(congesPayes.getMaxDays(), congesPayes, headOfHumanResourceService));
				
				balanceRepository.save(new Balance(rtt.getMaxDays(), rtt, headManagementService));
				balanceRepository.save(new Balance(congesPayes.getMaxDays(), congesPayes, headManagementService));

			}
			
		
		};
		
	}

}

