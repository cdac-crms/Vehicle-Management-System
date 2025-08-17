package com.vms.init;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.vms.dao.UserDao;
import com.vms.entities.User;
import com.vms.entities.enums.UserRole;

import jakarta.annotation.PostConstruct;

@Component
public class DataInitializer {

    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserDao userDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void init() {
        long count = userDao.count();
        if (count == 0) {
            User admin = new User();
            admin.setCreatedOn(LocalDateTime.now());
            admin.setContactNo("9999988888");
            admin.setEmail("admin@gmail.com");
            admin.setFirstName("admin");
            admin.setLastName("admin");
            admin.setPassword(passwordEncoder.encode("admin123")); 
            admin.setStatus(true);
            admin.setUserRole(UserRole.ADMIN);
            userDao.save(admin);
            System.out.println("Default admin user created.");
        }
    }
}

