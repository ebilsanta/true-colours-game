package com.truecolours.backend.init;

import com.truecolours.backend.entity.Question;
import com.truecolours.backend.repository.QuestionRepository;
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
            "Who would make the best superhero?",
            "Who is the most likely to become a famous author?",
            "Who has the best taste in music?",
            "Who is the most environmentally conscious?",
            "Who is the most likely to win a reality TV show?",
            "Who is the most organized?",
            "Who is the most compassionate?",
            "Who would excel in a competitive cooking show?",
            "Who has the best sense of direction?",
            "Who is the most likely to become a successful entrepreneur?",
            "Who would throw the most extravagant birthday party?",
            "Who is the most charitable?",
            "Who is the most artistic?",
            "Who is the most likely to adopt a dozen pets?",
            "Who has the most infectious laugh?",
            "Who is the most diplomatic?",
            "Who would excel in a game of strategy?",
            "Who has the best fashion sense?",
            "Who is the most likely to perform at an open mic night?",
            "Who is the most tech-averse?",
            "Who is the most adventurous eater?",
            "Who is the most likely to organize a surprise party?",
            "Who is the most resourceful in a crisis?",
            "Who is the most likely to become a world-record holder?",
            "Who has the best sense of humor?",
            "Who is the most likely to become a professional athlete?",
            "Who is the most skilled at DIY projects?",
            "Who is the most likely to become a famous musician?",
            "Who is the most knowledgeable about history?",
            "Who would be the best travel companion for an around-the-world trip?",
            "Who is the most likely to start their own charity?"
    };


    @Override
    public void run(String... args) throws Exception {
        if (questionRepository.count() == 0) {
            for (String questionStr: questions) {
                Question question = new Question();
                question.setQuestion(questionStr);
                questionRepository.save(question);
            }
        }
    }
}


