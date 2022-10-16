package com.assignment.fabrik.service;

import com.assignment.fabrik.entity.FileDB;
import com.assignment.fabrik.repository.FabrikModelsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Stream;

@Service
public class FileStorageService {

    @Autowired
    private FabrikModelsRepository fabrikModelsRepository;

    public FileDB store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        FileDB fileDB  = new FileDB(fileName, file.getContentType(), file.getBytes());

        return fabrikModelsRepository.save(fileDB);
    }

    public FileDB getFile(String id) {
        return fabrikModelsRepository.findById(id).get();
    }

    public void deleteAllModels() {
        fabrikModelsRepository.deleteAll();
    }

    public Stream<FileDB> getAllFiles() {
        return fabrikModelsRepository.findAll().stream();
    }
}
