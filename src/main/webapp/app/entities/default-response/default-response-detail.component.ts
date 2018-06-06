import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DefaultResponse } from './default-response.model';
import { DefaultResponseService } from './default-response.service';

@Component({
    selector: 'jhi-default-response-detail',
    templateUrl: './default-response-detail.component.html'
})
export class DefaultResponseDetailComponent implements OnInit, OnDestroy {

    defaultResponse: DefaultResponse;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private defaultResponseService: DefaultResponseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDefaultResponses();
    }

    load(id) {
        this.defaultResponseService.find(id)
            .subscribe((defaultResponseResponse: HttpResponse<DefaultResponse>) => {
                this.defaultResponse = defaultResponseResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDefaultResponses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'defaultResponseListModification',
            (response) => this.load(this.defaultResponse.id)
        );
    }
}
