
package com.vms.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vms.entities.Payment;

public interface PaymentDao extends JpaRepository<Payment, Long> {
}
