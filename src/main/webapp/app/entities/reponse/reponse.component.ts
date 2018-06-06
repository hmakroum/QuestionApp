import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Reponse } from './reponse.model';
import { ReponseService } from './reponse.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-reponse',
    templateUrl: './reponse.component.html'
})
export class ReponseComponent implements OnInit, OnDestroy {
reponses: Reponse[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private reponseService: ReponseService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.reponseService.query().subscribe(
            (res: HttpResponse<Reponse[]>) => {
                this.reponses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInReponses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Reponse) {
        return item.id;
    }
    registerChangeInReponses() {
        this.eventSubscriber = this.eventManager.subscribe('reponseListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
