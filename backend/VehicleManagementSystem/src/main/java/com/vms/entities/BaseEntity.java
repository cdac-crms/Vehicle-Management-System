package com.vms.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@MappedSuperclass
@Getter
@Setter
@ToString
public class BaseEntity {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;
		
		@CreationTimestamp
		@Column(name="created_on")
		private LocalDateTime createdOn;
}
