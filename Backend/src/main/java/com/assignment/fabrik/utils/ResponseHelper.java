package com.assignment.fabrik.utils;

import com.assignment.fabrik.message.ResponseMessage;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseHelper {
    
    @NonNull
    public static ResponseEntity response(HttpStatus status, String message) {
        return ResponseEntity
                .status(status)
                .body(new ResponseMessage(message));
    }
}
