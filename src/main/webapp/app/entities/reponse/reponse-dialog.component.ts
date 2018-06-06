import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Reponse } from './reponse.model';
import { ReponsePopupService } from './reponse-popup.service';
import { ReponseService } from './reponse.service';
import { Question, QuestionService } from '../question';

@Component({
    selector: 'jhi-reponse-dialog',
    templateUrl: './reponse-dialog.component.html'
})
export class ReponseDialogComponent implements OnInit {

    reponse: Reponse;
    isSaving: boolean;

    questions: Question[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private reponseService: ReponseService,
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
        if (this.reponse.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reponseService.update(this.reponse));
        } else {
            this.subscribeToSaveResponse(
                this.reponseService.create(this.reponse));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Reponse>>) {
        result.subscribe((res: HttpResponse<Reponse>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Reponse) {
        this.eventManager.broadcast({ name: 'reponseListModification', content: 'OK'});
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
    selector: 'jhi-reponse-popup',
    template: ''
})
export class ReponsePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reponsePopupService: ReponsePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reponsePopupService
                    .open(ReponseDialogComponent as Component, params['id']);
            } else {
                this.reponsePopupService
                    .open(ReponseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
