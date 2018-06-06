import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DefaultResponse } from './default-response.model';
import { DefaultResponseService } from './default-response.service';

@Injectable()
export class DefaultResponsePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private defaultResponseService: DefaultResponseService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.defaultResponseService.find(id)
                    .subscribe((defaultResponseResponse: HttpResponse<DefaultResponse>) => {
                        const defaultResponse: DefaultResponse = defaultResponseResponse.body;
                        this.ngbModalRef = this.defaultResponseModalRef(component, defaultResponse);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.defaultResponseModalRef(component, new DefaultResponse());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    defaultResponseModalRef(component: Component, defaultResponse: DefaultResponse): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.defaultResponse = defaultResponse;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
