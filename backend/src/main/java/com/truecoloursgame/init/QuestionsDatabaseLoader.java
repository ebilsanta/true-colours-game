package com.truecoloursgame.init;

import com.truecoloursgame.entity.Question;
import com.truecoloursgame.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class QuestionsDatabaseLoader implements CommandLineRunner {

    @Autowired
    private QuestionRepository questionRepository;

    private final String[] questions = {
        "Who is the best dancer?",
        "Who is the most adventurous?",
        "Who is the most likely to become a millionaire?",
        "Who would make the best detective?",
        "Who is the most likely to survive a zombie apocalypse?",
        "Who has the most unusual hobby?",
        "Who is the biggest foodie?",
        "Who is the most likely to start a dance party in public?",
        "Who is the most tech-savvy?",
        "Who is the most likely to become a famous actor/actress?",
        "Who is the most creative thinker?",
        "Who has the most impressive book collection?",
        "Who would win in a karaoke contest?",
        "Who is the most likely to become a world traveler?",
        "Who is the most knowledgeable about pop culture?",
        "Who would be the best stand-up comedian?",
        "Who is the most likely to survive in the wilderness?",
        "Who is the best at keeping secrets?",
        "Who is the most stylish?",
        "Who would make the best superhero?"
    };

    @Override
    public void run(String... args) throws Exception {
        if (questionRepository.count() == 0) {
            for (String questionStr: questions) {
                questionRepository.save(new Question(questionStr));
            }
        }
    }
}

