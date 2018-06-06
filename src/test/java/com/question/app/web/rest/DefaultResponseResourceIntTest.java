package com.question.app.web.rest;

import com.question.app.QuestionApp;

import com.question.app.domain.DefaultResponse;
import com.question.app.repository.DefaultResponseRepository;
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
 * Test class for the DefaultResponseResource REST controller.
 *
 * @see DefaultResponseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = QuestionApp.class)
public class DefaultResponseResourceIntTest {

    private static final String DEFAULT_REPONSE = "AAAAAAAAAA";
    private static final String UPDATED_REPONSE = "BBBBBBBBBB";

    @Autowired
    private DefaultResponseRepository defaultResponseRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDefaultResponseMockMvc;

    private DefaultResponse defaultResponse;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DefaultResponseResource defaultResponseResource = new DefaultResponseResource(defaultResponseRepository);
        this.restDefaultResponseMockMvc = MockMvcBuilders.standaloneSetup(defaultResponseResource)
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
    public static DefaultResponse createEntity(EntityManager em) {
        DefaultResponse defaultResponse = new DefaultResponse()
            .reponse(DEFAULT_REPONSE);
        return defaultResponse;
    }

    @Before
    public void initTest() {
        defaultResponse = createEntity(em);
    }

    @Test
    @Transactional
    public void createDefaultResponse() throws Exception {
        int databaseSizeBeforeCreate = defaultResponseRepository.findAll().size();

        // Create the DefaultResponse
        restDefaultResponseMockMvc.perform(post("/api/default-responses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(defaultResponse)))
            .andExpect(status().isCreated());

        // Validate the DefaultResponse in the database
        List<DefaultResponse> defaultResponseList = defaultResponseRepository.findAll();
        assertThat(defaultResponseList).hasSize(databaseSizeBeforeCreate + 1);
        DefaultResponse testDefaultResponse = defaultResponseList.get(defaultResponseList.size() - 1);
        assertThat(testDefaultResponse.getReponse()).isEqualTo(DEFAULT_REPONSE);
    }

    @Test
    @Transactional
    public void createDefaultResponseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = defaultResponseRepository.findAll().size();

        // Create the DefaultResponse with an existing ID
        defaultResponse.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDefaultResponseMockMvc.perform(post("/api/default-responses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(defaultResponse)))
            .andExpect(status().isBadRequest());

        // Validate the DefaultResponse in the database
        List<DefaultResponse> defaultResponseList = defaultResponseRepository.findAll();
        assertThat(defaultResponseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDefaultResponses() throws Exception {
        // Initialize the database
        defaultResponseRepository.saveAndFlush(defaultResponse);

        // Get all the defaultResponseList
        restDefaultResponseMockMvc.perform(get("/api/default-responses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(defaultResponse.getId().intValue())))
            .andExpect(jsonPath("$.[*].reponse").value(hasItem(DEFAULT_REPONSE.toString())));
    }

    @Test
    @Transactional
    public void getDefaultResponse() throws Exception {
        // Initialize the database
        defaultResponseRepository.saveAndFlush(defaultResponse);

        // Get the defaultResponse
        restDefaultResponseMockMvc.perform(get("/api/default-responses/{id}", defaultResponse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(defaultResponse.getId().intValue()))
            .andExpect(jsonPath("$.reponse").value(DEFAULT_REPONSE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDefaultResponse() throws Exception {
        // Get the defaultResponse
        restDefaultResponseMockMvc.perform(get("/api/default-responses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDefaultResponse() throws Exception {
        // Initialize the database
        defaultResponseRepository.saveAndFlush(defaultResponse);
        int databaseSizeBeforeUpdate = defaultResponseRepository.findAll().size();

        // Update the defaultResponse
        DefaultResponse updatedDefaultResponse = defaultResponseRepository.findOne(defaultResponse.getId());
        // Disconnect from session so that the updates on updatedDefaultResponse are not directly saved in db
        em.detach(updatedDefaultResponse);
        updatedDefaultResponse
            .reponse(UPDATED_REPONSE);

        restDefaultResponseMockMvc.perform(put("/api/default-responses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDefaultResponse)))
            .andExpect(status().isOk());

        // Validate the DefaultResponse in the database
        List<DefaultResponse> defaultResponseList = defaultResponseRepository.findAll();
        assertThat(defaultResponseList).hasSize(databaseSizeBeforeUpdate);
        DefaultResponse testDefaultResponse = defaultResponseList.get(defaultResponseList.size() - 1);
        assertThat(testDefaultResponse.getReponse()).isEqualTo(UPDATED_REPONSE);
    }

    @Test
    @Transactional
    public void updateNonExistingDefaultResponse() throws Exception {
        int databaseSizeBeforeUpdate = defaultResponseRepository.findAll().size();

        // Create the DefaultResponse

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDefaultResponseMockMvc.perform(put("/api/default-responses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(defaultResponse)))
            .andExpect(status().isCreated());

        // Validate the DefaultResponse in the database
        List<DefaultResponse> defaultResponseList = defaultResponseRepository.findAll();
        assertThat(defaultResponseList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDefaultResponse() throws Exception {
        // Initialize the database
        defaultResponseRepository.saveAndFlush(defaultResponse);
        int databaseSizeBeforeDelete = defaultResponseRepository.findAll().size();

        // Get the defaultResponse
        restDefaultResponseMockMvc.perform(delete("/api/default-responses/{id}", defaultResponse.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DefaultResponse> defaultResponseList = defaultResponseRepository.findAll();
        assertThat(defaultResponseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DefaultResponse.class);
        DefaultResponse defaultResponse1 = new DefaultResponse();
        defaultResponse1.setId(1L);
        DefaultResponse defaultResponse2 = new DefaultResponse();
        defaultResponse2.setId(defaultResponse1.getId());
        assertThat(defaultResponse1).isEqualTo(defaultResponse2);
        defaultResponse2.setId(2L);
        assertThat(defaultResponse1).isNotEqualTo(defaultResponse2);
        defaultResponse1.setId(null);
        assertThat(defaultResponse1).isNotEqualTo(defaultResponse2);
    }
}
