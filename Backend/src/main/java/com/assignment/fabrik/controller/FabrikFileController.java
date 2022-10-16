package com.assignment.fabrik.controller;

import com.assignment.fabrik.entity.FileDB;
import com.assignment.fabrik.entity.FileResponse;
import com.assignment.fabrik.message.ResponseFile;
import com.assignment.fabrik.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@CrossOrigin("*")
public class FabrikFileController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/uploadModel")
    public ResponseEntity<FileResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            String fileName = file.getOriginalFilename();

            if(fileName == null || !fileName.contains(".")) throw new IllegalArgumentException();

            String contentType = fileName.substring(fileName.lastIndexOf("."));

            if (!contentType.equals(".glb")) return ResponseEntity
                    .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                    .body(new FileResponse("Only gltf models within 2MB size supported!!"));

            FileDB storedFile = fileStorageService.store(file);

            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/files/")
                    .path(storedFile.getId())
                    .toUriString();

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(
                    new FileResponse(storedFile.getId(), storedFile.getFileName(), fileDownloadUri, message)
            );

        } catch (Exception ex) {
            ex.printStackTrace();

            if(ex instanceof IllegalStateException) {
                message = "Invalid file name!";
                return ResponseEntity.badRequest().body(new FileResponse(message));
            }
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new FileResponse(message));
        }
    }

    @GetMapping("/files")
    public ResponseEntity<List<ResponseFile>> getListFiles() {
        List<ResponseFile> files = fileStorageService.getAllFiles().map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/files/")
                    .path(dbFile.getId())
                    .toUriString();

            return new ResponseFile(
                    dbFile.getFileName(),
                    fileDownloadUri,
                    dbFile.getFileType(),
                    dbFile.getData().length);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        FileDB fileDB = fileStorageService.getFile(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getFileName() + "\"")
                .body(fileDB.getData());
    }

    @DeleteMapping("/delete_models")
    public ResponseEntity<String> deleteAllModels() {
        try {
            fileStorageService.deleteAllModels();
            return ResponseEntity.ok().body("Success");
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.badRequest().body("Bad request");
    }
}
