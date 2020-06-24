package com.example;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginuserRepository extends JpaRepository<Loginuser, Long> {
    Loginuser findByUserName(String userName);
}
