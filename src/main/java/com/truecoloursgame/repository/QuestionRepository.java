package com.truecoloursgame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public class QuestionRepository extends JpaRepository<Question, Integer> {
    

}
