package com.example;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserteamRepository extends JpaRepository<Userteam, Long> {
    List<Userteam> findByUserId(Long userId);
}
