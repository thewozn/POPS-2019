package com.pops1819.sid.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pops1819.sid.repository.IUserRepository;

@Component
public class BalanceTask {
	
	@Autowired
	private IUserRepository userRepository;

	//	À 15h30 le 15 de chaque mois:
	//	0 30 9 15 * ? 
//	@Scheduled(cron ="0,30 * * * * *")
	public void cronJob()
	{
//		List<User> users = userRepository.findAll();
//		System.out.println(users.toString());
		System.out.println("OK");
	}
}
