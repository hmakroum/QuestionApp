import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Reponse } from './reponse.model';
import { ReponseService } from './reponse.service';

@Component({
    selector: 'jhi-reponse-detail',
    templateUrl: './reponse-detail.component.html'
})
export class ReponseDetailComponent implements OnInit, OnDestroy {

    reponse: Reponse;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private reponseService: ReponseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReponses();
    }

    load(id) {
        this.reponseService.find(id)
            .subscribe((reponseResponse: HttpResponse<Reponse>) => {
                this.reponse = reponseResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReponses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'reponseListModification',
            (response) => this.load(this.reponse.id)
        );
    }
}
