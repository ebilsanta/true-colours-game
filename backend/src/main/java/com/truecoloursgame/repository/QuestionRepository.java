package com.truecoloursgame.repository;

import com.truecoloursgame.entity.Question;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface QuestionRepository extends CrudRepository<Question, Integer> {
    @Query(nativeQuery = true, value = """
            SELECT * FROM question
            ORDER BY RAND()
            LIMIT 15;""")
    List<Question> getRandomQuestions();
}
