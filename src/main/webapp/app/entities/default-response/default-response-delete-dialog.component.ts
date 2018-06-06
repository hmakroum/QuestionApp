import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DefaultResponse } from './default-response.model';
import { DefaultResponsePopupService } from './default-response-popup.service';
import { DefaultResponseService } from './default-response.service';

@Component({
    selector: 'jhi-default-response-delete-dialog',
    templateUrl: './default-response-delete-dialog.component.html'
})
export class DefaultResponseDeleteDialogComponent {

    defaultResponse: DefaultResponse;

    constructor(
        private defaultResponseService: DefaultResponseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.defaultResponseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'defaultResponseListModification',
                content: 'Deleted an defaultResponse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-default-response-delete-popup',
    template: ''
})
export class DefaultResponseDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private defaultResponsePopupService: DefaultResponsePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.defaultResponsePopupService
                .open(DefaultResponseDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
