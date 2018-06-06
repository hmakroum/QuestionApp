/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { QuestionTestModule } from '../../../test.module';
import { DefaultResponseDialogComponent } from '../../../../../../main/webapp/app/entities/default-response/default-response-dialog.component';
import { DefaultResponseService } from '../../../../../../main/webapp/app/entities/default-response/default-response.service';
import { DefaultResponse } from '../../../../../../main/webapp/app/entities/default-response/default-response.model';
import { QuestionService } from '../../../../../../main/webapp/app/entities/question';

describe('Component Tests', () => {

    describe('DefaultResponse Management Dialog Component', () => {
        let comp: DefaultResponseDialogComponent;
        let fixture: ComponentFixture<DefaultResponseDialogComponent>;
        let service: DefaultResponseService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QuestionTestModule],
                declarations: [DefaultResponseDialogComponent],
                providers: [
                    QuestionService,
                    DefaultResponseService
                ]
            })
            .overrideTemplate(DefaultResponseDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DefaultResponseDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefaultResponseService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DefaultResponse(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.defaultResponse = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'defaultResponseListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DefaultResponse();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.defaultResponse = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'defaultResponseListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
