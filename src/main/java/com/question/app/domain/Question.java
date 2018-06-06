package com.question.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.question.app.domain.enumeration.QuestionSubject;

import com.question.app.domain.enumeration.QuestionType;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "question_subject")
    private QuestionSubject questionSubject;

    @Column(name = "question")
    private String question;

    @Enumerated(EnumType.STRING)
    @Column(name = "question_type")
    private QuestionType questionType;

    @OneToMany(mappedBy = "question")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DefaultResponse> defaultResponses = new HashSet<>();

    @OneToMany(mappedBy = "question")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reponse> reponses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public QuestionSubject getQuestionSubject() {
        return questionSubject;
    }

    public Question questionSubject(QuestionSubject questionSubject) {
        this.questionSubject = questionSubject;
        return this;
    }

    public void setQuestionSubject(QuestionSubject questionSubject) {
        this.questionSubject = questionSubject;
    }

    public String getQuestion() {
        return question;
    }

    public Question question(String question) {
        this.question = question;
        return this;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public QuestionType getQuestionType() {
        return questionType;
    }

    public Question questionType(QuestionType questionType) {
        this.questionType = questionType;
        return this;
    }

    public void setQuestionType(QuestionType questionType) {
        this.questionType = questionType;
    }

    public Set<DefaultResponse> getDefaultResponses() {
        return defaultResponses;
    }

    public Question defaultResponses(Set<DefaultResponse> defaultResponses) {
        this.defaultResponses = defaultResponses;
        return this;
    }

    public Question addDefaultResponses(DefaultResponse defaultResponse) {
        this.defaultResponses.add(defaultResponse);
        defaultResponse.setQuestion(this);
        return this;
    }

    public Question removeDefaultResponses(DefaultResponse defaultResponse) {
        this.defaultResponses.remove(defaultResponse);
        defaultResponse.setQuestion(null);
        return this;
    }

    public void setDefaultResponses(Set<DefaultResponse> defaultResponses) {
        this.defaultResponses = defaultResponses;
    }

    public Set<Reponse> getReponses() {
        return reponses;
    }

    public Question reponses(Set<Reponse> reponses) {
        this.reponses = reponses;
        return this;
    }

    public Question addReponses(Reponse reponse) {
        this.reponses.add(reponse);
        reponse.setQuestion(this);
        return this;
    }

    public Question removeReponses(Reponse reponse) {
        this.reponses.remove(reponse);
        reponse.setQuestion(null);
        return this;
    }

    public void setReponses(Set<Reponse> reponses) {
        this.reponses = reponses;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Question question = (Question) o;
        if (question.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), question.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", questionSubject='" + getQuestionSubject() + "'" +
            ", question='" + getQuestion() + "'" +
            ", questionType='" + getQuestionType() + "'" +
            "}";
    }
}
