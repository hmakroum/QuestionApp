package com.question.app.repository;

import com.question.app.domain.DefaultResponse;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DefaultResponse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefaultResponseRepository extends JpaRepository<DefaultResponse, Long> {

}
