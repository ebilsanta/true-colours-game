package com.truecoloursgame.controller;

import com.truecoloursgame.entity.Question;
import com.truecoloursgame.repository.QuestionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping(path="/questions")
public class QuestionController {
    @Autowired
    private  QuestionRepository questionRepository;

    @GetMapping("/")
    public @ResponseBody List<Question> getAllQuestions() {
        return (List<Question>) questionRepository.findAll();
    }

    @GetMapping("/random")
    public @ResponseBody List<Question> getRandomQuestions() {
        return (List<Question>) questionRepository.getRandomQuestions();
    }

    @PostMapping(path="/")
    public @ResponseBody Question addNewQuestion(@RequestBody Question question) {
        log.info("Create question request: {}", question);
        return questionRepository.save(question);
    }

}
