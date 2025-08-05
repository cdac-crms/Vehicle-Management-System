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
		
		//System.out.println("Hello running");
	}

	/*
	 * Configure ModelMapper as spring bean - so thar SC will manage it's life cycle
	 * + provide it as the depcy
	 */
	@Bean // method level annotation - to tell SC , following method
	// rets an object - which has to be managed as a spring bean
	// manages - life cycle +
	public ModelMapper modelMapper() {
		System.out.println("in model mapper creation");
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration()
				/*
				 * To tell ModelMapper to map only those props whose names match in src n dest.
				 * objects
				 */
				.setMatchingStrategy(MatchingStrategies.STRICT)
				/*
				 * To tell ModelMapper not to transfer nulls from src -> dest
				 */
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
