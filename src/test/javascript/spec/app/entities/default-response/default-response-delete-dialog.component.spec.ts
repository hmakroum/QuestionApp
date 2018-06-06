/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { QuestionTestModule } from '../../../test.module';
import { DefaultResponseDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/default-response/default-response-delete-dialog.component';
import { DefaultResponseService } from '../../../../../../main/webapp/app/entities/default-response/default-response.service';

describe('Component Tests', () => {

    describe('DefaultResponse Management Delete Component', () => {
        let comp: DefaultResponseDeleteDialogComponent;
        let fixture: ComponentFixture<DefaultResponseDeleteDialogComponent>;
        let service: DefaultResponseService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QuestionTestModule],
                declarations: [DefaultResponseDeleteDialogComponent],
                providers: [
                    DefaultResponseService
                ]
            })
            .overrideTemplate(DefaultResponseDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DefaultResponseDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefaultResponseService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
