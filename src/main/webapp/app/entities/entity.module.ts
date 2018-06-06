import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { QuestionQuestionModule } from './question/question.module';
import { QuestionDefaultResponseModule } from './default-response/default-response.module';
import { QuestionReponseModule } from './reponse/reponse.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        QuestionQuestionModule,
        QuestionDefaultResponseModule,
        QuestionReponseModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuestionEntityModule {}
