package com.pops1819.sid;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.pops1819.sid.services.VacationService;

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
	CommandLineRunner start(VacationService vacationService )
	{
		return args->
		{
			vacationService.addVacation("RTT", 365L);
			vacationService.addVacation("Congè payé", 30L);

		};
		
	}

}

