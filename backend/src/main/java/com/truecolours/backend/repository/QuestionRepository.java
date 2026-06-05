package com.truecolours.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.truecolours.backend.entity.Question;

public interface QuestionRepository extends CrudRepository<Question, Integer> {
    @Query(nativeQuery = true, value = """
            SELECT * FROM question
            ORDER BY RAND();""")
    List<Question> getRandomQuestions();

    @Query(nativeQuery = true, value = """
            SELECT * FROM question
            WHERE tag = :tag
            ORDER BY RAND();""")
    List<Question> getRandomQuestionsByTag(@Param("tag") String tag);
}
