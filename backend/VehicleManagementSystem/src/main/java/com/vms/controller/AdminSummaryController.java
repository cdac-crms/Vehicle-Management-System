package com.vms.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vms.dao.CompanyDao;
import com.vms.dao.VariantDao;
import com.vms.dao.VehicleDao;

@RestController
@RequestMapping("/admin")
public class AdminSummaryController {

    private final VehicleDao vehicleDao;
    private final VariantDao variantDao;
    private final CompanyDao companyDao;

    public AdminSummaryController(VehicleDao vehicleDao,
                                  VariantDao variantDao,
                                  CompanyDao companyDao) {
        this.vehicleDao = vehicleDao;
        this.variantDao = variantDao;
        this.companyDao = companyDao;
    }

    @GetMapping("/getSummary")
    public ResponseEntity<Map<String, Long>> getSummary() {
        long vehicleCount = vehicleDao.count();
        long variantCount = variantDao.count();
        long companyCount = companyDao.count();

        Map<String, Long> summary = new HashMap();
        summary.put("vehicles", vehicleCount);
        summary.put("variants", variantCount);
        summary.put("companies", companyCount);

        return ResponseEntity.ok(summary);
    }
}
