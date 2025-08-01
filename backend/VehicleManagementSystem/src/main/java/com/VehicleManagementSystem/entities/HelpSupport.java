package com.VehicleManagementSystem.entities;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "help_support")
@AttributeOverride(name = "id", column = @Column(name = "helpsupport_id"))

public class HelpSupport extends BaseEntity {

	    @Column(nullable = false)
	    private String name;

	    @Column(nullable = false)
	    private String email;

	    @Column(name = "concern_type", nullable = false)
	    private String concernType;

	    @Column(columnDefinition = "TEXT", nullable = false)
	    private String message;
	    
	    @Column
		private boolean status = true;
	    
	    @ManyToOne(fetch = FetchType.LAZY, optional = false)
	    @JoinColumn(name = "user_id", nullable = false)
	    private User user; // Foreign key association
	
	
}
