package com.vms.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "company")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company extends BaseEntity {

    @Column(name = "company_name", nullable = false, unique = true, length = 100)
    private String name;

    @Column(name = "company_description", length = 255)
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    private String x1;
    private String x2;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Variant> variants;
}
