package com.question.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.question.app.domain.Reponse;

import com.question.app.repository.ReponseRepository;
import com.question.app.web.rest.errors.BadRequestAlertException;
import com.question.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Reponse.
 */
@RestController
@RequestMapping("/api")
public class ReponseResource {

    private final Logger log = LoggerFactory.getLogger(ReponseResource.class);

    private static final String ENTITY_NAME = "reponse";

    private final ReponseRepository reponseRepository;

    public ReponseResource(ReponseRepository reponseRepository) {
        this.reponseRepository = reponseRepository;
    }

    /**
     * POST  /reponses : Create a new reponse.
     *
     * @param reponse the reponse to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reponse, or with status 400 (Bad Request) if the reponse has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/reponses")
    @Timed
    public ResponseEntity<Reponse> createReponse(@RequestBody Reponse reponse) throws URISyntaxException {
        log.debug("REST request to save Reponse : {}", reponse);
        if (reponse.getId() != null) {
            throw new BadRequestAlertException("A new reponse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Reponse result = reponseRepository.save(reponse);
        return ResponseEntity.created(new URI("/api/reponses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /reponses : Updates an existing reponse.
     *
     * @param reponse the reponse to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reponse,
     * or with status 400 (Bad Request) if the reponse is not valid,
     * or with status 500 (Internal Server Error) if the reponse couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/reponses")
    @Timed
    public ResponseEntity<Reponse> updateReponse(@RequestBody Reponse reponse) throws URISyntaxException {
        log.debug("REST request to update Reponse : {}", reponse);
        if (reponse.getId() == null) {
            return createReponse(reponse);
        }
        Reponse result = reponseRepository.save(reponse);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reponse.getId().toString()))
            .body(result);
    }

    /**
     * GET  /reponses : get all the reponses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of reponses in body
     */
    @GetMapping("/reponses")
    @Timed
    public List<Reponse> getAllReponses() {
        log.debug("REST request to get all Reponses");
        return reponseRepository.findAll();
        }

    /**
     * GET  /reponses/:id : get the "id" reponse.
     *
     * @param id the id of the reponse to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reponse, or with status 404 (Not Found)
     */
    @GetMapping("/reponses/{id}")
    @Timed
    public ResponseEntity<Reponse> getReponse(@PathVariable Long id) {
        log.debug("REST request to get Reponse : {}", id);
        Reponse reponse = reponseRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(reponse));
    }

    /**
     * DELETE  /reponses/:id : delete the "id" reponse.
     *
     * @param id the id of the reponse to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/reponses/{id}")
    @Timed
    public ResponseEntity<Void> deleteReponse(@PathVariable Long id) {
        log.debug("REST request to delete Reponse : {}", id);
        reponseRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
