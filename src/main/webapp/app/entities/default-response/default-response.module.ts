import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QuestionSharedModule } from '../../shared';
import {
    DefaultResponseService,
    DefaultResponsePopupService,
    DefaultResponseComponent,
    DefaultResponseDetailComponent,
    DefaultResponseDialogComponent,
    DefaultResponsePopupComponent,
    DefaultResponseDeletePopupComponent,
    DefaultResponseDeleteDialogComponent,
    defaultResponseRoute,
    defaultResponsePopupRoute,
} from './';

const ENTITY_STATES = [
    ...defaultResponseRoute,
    ...defaultResponsePopupRoute,
];

@NgModule({
    imports: [
        QuestionSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DefaultResponseComponent,
        DefaultResponseDetailComponent,
        DefaultResponseDialogComponent,
        DefaultResponseDeleteDialogComponent,
        DefaultResponsePopupComponent,
        DefaultResponseDeletePopupComponent,
    ],
    entryComponents: [
        DefaultResponseComponent,
        DefaultResponseDialogComponent,
        DefaultResponsePopupComponent,
        DefaultResponseDeleteDialogComponent,
        DefaultResponseDeletePopupComponent,
    ],
    providers: [
        DefaultResponseService,
        DefaultResponsePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuestionDefaultResponseModule {}
