package com.assignment.fabrik.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
@AllArgsConstructor
public class FileResponse {

    private String id;

    private String fileName;

    private String downloadUrl;

    private String message;

    public FileResponse(String id, String fileName, String downloadUrl) {
        this.id = id;
        this.fileName = fileName;
        this.downloadUrl = downloadUrl;
    }

    public FileResponse(String message) {
        this.message = message;
    }
}
