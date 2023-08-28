package com.truecoloursgame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EnableJpaRepositories("com.truecoloursgame.repository")
public class TrueColoursGameApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrueColoursGameApplication.class, args);
	}

}
