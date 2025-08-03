package com.vms.entities;

import com.vms.entities.enums.FuelType;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "variant")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Variant extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(name = "variant_name", nullable = false, length = 20)
    private String name;

    @Column(name = "variant_description", nullable = false, length = 255)
    private String description;

    @Column(name = "seating_capacity")
    private Integer seatingCapacity;

    @Enumerated(EnumType.STRING)
    @Column(name = "fuel_type", length = 20)
    private FuelType fuelType;

    private String x1;
    private String x2;

    @OneToMany(mappedBy = "variant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Vehicle> vehicles;
}