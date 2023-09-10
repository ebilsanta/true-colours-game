package com.truecoloursgame.controller;

import com.truecoloursgame.entity.Question;
import com.truecoloursgame.repository.QuestionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping(path="/question")
public class QuestionController {
    @Autowired
    private  QuestionRepository questionRepository;

    @PostMapping(path="/add")
    public @ResponseBody Question addNewQuestion(@RequestBody String question) {
        Question q = new Question();
        log.info("Create question request: {}", question);
        q.setQuestion(question);
        return questionRepository.save(q);
    }
}
