package com.vms;

import java.util.HashMap;
import java.util.Map;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.cloudinary.Cloudinary;

@SpringBootApplication // includes @Configuration
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
		
	}

	
	@Bean 
	public ModelMapper modelMapper() {
		System.out.println("in model mapper creation");
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration()
				
				.setMatchingStrategy(MatchingStrategies.STRICT)
				
				.setPropertyCondition(Conditions.isNotNull());// use case - PUT
		return mapper;

	}
	
	
	@Bean
	public Cloudinary getCloudinary()
	{
		Map config = new HashMap();
		config.put("cloud_name", "dklmsewsu");
		config.put("api_key", "771414175948684");
		config.put("api_secret", "AEPVNRsumqv9KvGhFEPT_Aq57D0");
		config.put("secure", true);
		
		return new Cloudinary(config);
	}

}
