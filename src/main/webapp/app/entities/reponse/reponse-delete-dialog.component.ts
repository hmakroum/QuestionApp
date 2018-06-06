import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Reponse } from './reponse.model';
import { ReponsePopupService } from './reponse-popup.service';
import { ReponseService } from './reponse.service';

@Component({
    selector: 'jhi-reponse-delete-dialog',
    templateUrl: './reponse-delete-dialog.component.html'
})
export class ReponseDeleteDialogComponent {

    reponse: Reponse;

    constructor(
        private reponseService: ReponseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reponseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'reponseListModification',
                content: 'Deleted an reponse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reponse-delete-popup',
    template: ''
})
export class ReponseDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reponsePopupService: ReponsePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.reponsePopupService
                .open(ReponseDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
