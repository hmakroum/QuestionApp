/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { QuestionTestModule } from '../../../test.module';
import { ReponseDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/reponse/reponse-delete-dialog.component';
import { ReponseService } from '../../../../../../main/webapp/app/entities/reponse/reponse.service';

describe('Component Tests', () => {

    describe('Reponse Management Delete Component', () => {
        let comp: ReponseDeleteDialogComponent;
        let fixture: ComponentFixture<ReponseDeleteDialogComponent>;
        let service: ReponseService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QuestionTestModule],
                declarations: [ReponseDeleteDialogComponent],
                providers: [
                    ReponseService
                ]
            })
            .overrideTemplate(ReponseDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReponseDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReponseService);
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
