import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QuestionSharedModule } from '../../shared';
import {
    ReponseService,
    ReponsePopupService,
    ReponseComponent,
    ReponseDetailComponent,
    ReponseDialogComponent,
    ReponsePopupComponent,
    ReponseDeletePopupComponent,
    ReponseDeleteDialogComponent,
    reponseRoute,
    reponsePopupRoute,
} from './';

const ENTITY_STATES = [
    ...reponseRoute,
    ...reponsePopupRoute,
];

@NgModule({
    imports: [
        QuestionSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReponseComponent,
        ReponseDetailComponent,
        ReponseDialogComponent,
        ReponseDeleteDialogComponent,
        ReponsePopupComponent,
        ReponseDeletePopupComponent,
    ],
    entryComponents: [
        ReponseComponent,
        ReponseDialogComponent,
        ReponsePopupComponent,
        ReponseDeleteDialogComponent,
        ReponseDeletePopupComponent,
    ],
    providers: [
        ReponseService,
        ReponsePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuestionReponseModule {}
