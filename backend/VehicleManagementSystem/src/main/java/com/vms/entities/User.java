package com.vms.entities;

import com.vms.entities.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "user_id"))
public class User extends BaseEntity {

    @Column(name = "first_name", length = 20, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 30, nullable = false)
    private String lastName;

    @Column(length = 30, unique = true, nullable = false)
    private String email;

    @Column(name = "contact_no")
    private String contactNo;

    @Column(length = 255, nullable = false)
    private String password;

    @Transient
    private String confirmPassword;

    @Column
    private boolean status = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role", length = 30)
    private UserRole userRole = UserRole.CUSTOMER;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private DrivingLicense drivingLicense;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HelpSupport> helpRequests;
}
