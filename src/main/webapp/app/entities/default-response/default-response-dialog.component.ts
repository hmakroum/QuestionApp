import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DefaultResponse } from './default-response.model';
import { DefaultResponsePopupService } from './default-response-popup.service';
import { DefaultResponseService } from './default-response.service';
import { Question, QuestionService } from '../question';

@Component({
    selector: 'jhi-default-response-dialog',
    templateUrl: './default-response-dialog.component.html'
})
export class DefaultResponseDialogComponent implements OnInit {

    defaultResponse: DefaultResponse;
    isSaving: boolean;

    questions: Question[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private defaultResponseService: DefaultResponseService,
        private questionService: QuestionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.questionService.query()
            .subscribe((res: HttpResponse<Question[]>) => { this.questions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.defaultResponse.id !== undefined) {
            this.subscribeToSaveResponse(
                this.defaultResponseService.update(this.defaultResponse));
        } else {
            this.subscribeToSaveResponse(
                this.defaultResponseService.create(this.defaultResponse));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DefaultResponse>>) {
        result.subscribe((res: HttpResponse<DefaultResponse>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DefaultResponse) {
        this.eventManager.broadcast({ name: 'defaultResponseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackQuestionById(index: number, item: Question) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-default-response-popup',
    template: ''
})
export class DefaultResponsePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private defaultResponsePopupService: DefaultResponsePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.defaultResponsePopupService
                    .open(DefaultResponseDialogComponent as Component, params['id']);
            } else {
                this.defaultResponsePopupService
                    .open(DefaultResponseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
