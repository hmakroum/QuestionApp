package com.question.app.web.rest;

import com.question.app.QuestionApp;

import com.question.app.domain.Reponse;
import com.question.app.repository.ReponseRepository;
import com.question.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.question.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ReponseResource REST controller.
 *
 * @see ReponseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = QuestionApp.class)
public class ReponseResourceIntTest {

    private static final String DEFAULT_REPONSE = "AAAAAAAAAA";
    private static final String UPDATED_REPONSE = "BBBBBBBBBB";

    @Autowired
    private ReponseRepository reponseRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReponseMockMvc;

    private Reponse reponse;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReponseResource reponseResource = new ReponseResource(reponseRepository);
        this.restReponseMockMvc = MockMvcBuilders.standaloneSetup(reponseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reponse createEntity(EntityManager em) {
        Reponse reponse = new Reponse()
            .reponse(DEFAULT_REPONSE);
        return reponse;
    }

    @Before
    public void initTest() {
        reponse = createEntity(em);
    }

    @Test
    @Transactional
    public void createReponse() throws Exception {
        int databaseSizeBeforeCreate = reponseRepository.findAll().size();

        // Create the Reponse
        restReponseMockMvc.perform(post("/api/reponses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponse)))
            .andExpect(status().isCreated());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeCreate + 1);
        Reponse testReponse = reponseList.get(reponseList.size() - 1);
        assertThat(testReponse.getReponse()).isEqualTo(DEFAULT_REPONSE);
    }

    @Test
    @Transactional
    public void createReponseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reponseRepository.findAll().size();

        // Create the Reponse with an existing ID
        reponse.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReponseMockMvc.perform(post("/api/reponses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponse)))
            .andExpect(status().isBadRequest());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReponses() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        // Get all the reponseList
        restReponseMockMvc.perform(get("/api/reponses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reponse.getId().intValue())))
            .andExpect(jsonPath("$.[*].reponse").value(hasItem(DEFAULT_REPONSE.toString())));
    }

    @Test
    @Transactional
    public void getReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        // Get the reponse
        restReponseMockMvc.perform(get("/api/reponses/{id}", reponse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reponse.getId().intValue()))
            .andExpect(jsonPath("$.reponse").value(DEFAULT_REPONSE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReponse() throws Exception {
        // Get the reponse
        restReponseMockMvc.perform(get("/api/reponses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);
        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();

        // Update the reponse
        Reponse updatedReponse = reponseRepository.findOne(reponse.getId());
        // Disconnect from session so that the updates on updatedReponse are not directly saved in db
        em.detach(updatedReponse);
        updatedReponse
            .reponse(UPDATED_REPONSE);

        restReponseMockMvc.perform(put("/api/reponses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReponse)))
            .andExpect(status().isOk());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeUpdate);
        Reponse testReponse = reponseList.get(reponseList.size() - 1);
        assertThat(testReponse.getReponse()).isEqualTo(UPDATED_REPONSE);
    }

    @Test
    @Transactional
    public void updateNonExistingReponse() throws Exception {
        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();

        // Create the Reponse

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReponseMockMvc.perform(put("/api/reponses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponse)))
            .andExpect(status().isCreated());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);
        int databaseSizeBeforeDelete = reponseRepository.findAll().size();

        // Get the reponse
        restReponseMockMvc.perform(delete("/api/reponses/{id}", reponse.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reponse.class);
        Reponse reponse1 = new Reponse();
        reponse1.setId(1L);
        Reponse reponse2 = new Reponse();
        reponse2.setId(reponse1.getId());
        assertThat(reponse1).isEqualTo(reponse2);
        reponse2.setId(2L);
        assertThat(reponse1).isNotEqualTo(reponse2);
        reponse1.setId(null);
        assertThat(reponse1).isNotEqualTo(reponse2);
    }
}
