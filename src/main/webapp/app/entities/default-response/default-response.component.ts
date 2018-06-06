import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DefaultResponse } from './default-response.model';
import { DefaultResponseService } from './default-response.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-default-response',
    templateUrl: './default-response.component.html'
})
export class DefaultResponseComponent implements OnInit, OnDestroy {
defaultResponses: DefaultResponse[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private defaultResponseService: DefaultResponseService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.defaultResponseService.query().subscribe(
            (res: HttpResponse<DefaultResponse[]>) => {
                this.defaultResponses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDefaultResponses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DefaultResponse) {
        return item.id;
    }
    registerChangeInDefaultResponses() {
        this.eventSubscriber = this.eventManager.subscribe('defaultResponseListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
