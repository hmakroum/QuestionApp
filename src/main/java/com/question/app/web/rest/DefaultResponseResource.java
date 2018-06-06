package com.question.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.question.app.domain.DefaultResponse;

import com.question.app.repository.DefaultResponseRepository;
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
 * REST controller for managing DefaultResponse.
 */
@RestController
@RequestMapping("/api")
public class DefaultResponseResource {

    private final Logger log = LoggerFactory.getLogger(DefaultResponseResource.class);

    private static final String ENTITY_NAME = "defaultResponse";

    private final DefaultResponseRepository defaultResponseRepository;

    public DefaultResponseResource(DefaultResponseRepository defaultResponseRepository) {
        this.defaultResponseRepository = defaultResponseRepository;
    }

    /**
     * POST  /default-responses : Create a new defaultResponse.
     *
     * @param defaultResponse the defaultResponse to create
     * @return the ResponseEntity with status 201 (Created) and with body the new defaultResponse, or with status 400 (Bad Request) if the defaultResponse has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/default-responses")
    @Timed
    public ResponseEntity<DefaultResponse> createDefaultResponse(@RequestBody DefaultResponse defaultResponse) throws URISyntaxException {
        log.debug("REST request to save DefaultResponse : {}", defaultResponse);
        if (defaultResponse.getId() != null) {
            throw new BadRequestAlertException("A new defaultResponse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DefaultResponse result = defaultResponseRepository.save(defaultResponse);
        return ResponseEntity.created(new URI("/api/default-responses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /default-responses : Updates an existing defaultResponse.
     *
     * @param defaultResponse the defaultResponse to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated defaultResponse,
     * or with status 400 (Bad Request) if the defaultResponse is not valid,
     * or with status 500 (Internal Server Error) if the defaultResponse couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/default-responses")
    @Timed
    public ResponseEntity<DefaultResponse> updateDefaultResponse(@RequestBody DefaultResponse defaultResponse) throws URISyntaxException {
        log.debug("REST request to update DefaultResponse : {}", defaultResponse);
        if (defaultResponse.getId() == null) {
            return createDefaultResponse(defaultResponse);
        }
        DefaultResponse result = defaultResponseRepository.save(defaultResponse);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, defaultResponse.getId().toString()))
            .body(result);
    }

    /**
     * GET  /default-responses : get all the defaultResponses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of defaultResponses in body
     */
    @GetMapping("/default-responses")
    @Timed
    public List<DefaultResponse> getAllDefaultResponses() {
        log.debug("REST request to get all DefaultResponses");
        return defaultResponseRepository.findAll();
        }

    /**
     * GET  /default-responses/:id : get the "id" defaultResponse.
     *
     * @param id the id of the defaultResponse to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the defaultResponse, or with status 404 (Not Found)
     */
    @GetMapping("/default-responses/{id}")
    @Timed
    public ResponseEntity<DefaultResponse> getDefaultResponse(@PathVariable Long id) {
        log.debug("REST request to get DefaultResponse : {}", id);
        DefaultResponse defaultResponse = defaultResponseRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(defaultResponse));
    }

    /**
     * DELETE  /default-responses/:id : delete the "id" defaultResponse.
     *
     * @param id the id of the defaultResponse to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/default-responses/{id}")
    @Timed
    public ResponseEntity<Void> deleteDefaultResponse(@PathVariable Long id) {
        log.debug("REST request to delete DefaultResponse : {}", id);
        defaultResponseRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
