//package com.vms.utils;
//
//import java.io.IOException;
//import java.util.Map;
//
//import org.springframework.stereotype.Component;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.cloudinary.Cloudinary;
//import com.cloudinary.utils.ObjectUtils;
//
//import lombok.AllArgsConstructor;
//import lombok.RequiredArgsConstructor;
//
//@Component
//@AllArgsConstructor
//public class CloudinaryUtil {
//
//    private final Cloudinary cloudinary;
//
//    public String uploadImage(MultipartFile file) {
//        try {
//            Map<?, ?> uploadResult = cloudinary.uploader()
//                    .upload(file.getBytes(), ObjectUtils.asMap("folder", "vehicle_rental"));
//            return uploadResult.get("secure_url").toString();
//        } catch (IOException e) {
//            throw new RuntimeException("Failed to upload image to Cloudinary", e);
//        }
//    }
//}
