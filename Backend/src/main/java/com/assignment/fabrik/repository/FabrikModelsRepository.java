package com.assignment.fabrik.repository;

import com.assignment.fabrik.entity.FileDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FabrikModelsRepository extends JpaRepository<FileDB, String> {
}
