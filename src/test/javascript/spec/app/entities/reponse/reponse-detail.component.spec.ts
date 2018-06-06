/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { QuestionTestModule } from '../../../test.module';
import { ReponseDetailComponent } from '../../../../../../main/webapp/app/entities/reponse/reponse-detail.component';
import { ReponseService } from '../../../../../../main/webapp/app/entities/reponse/reponse.service';
import { Reponse } from '../../../../../../main/webapp/app/entities/reponse/reponse.model';

describe('Component Tests', () => {

    describe('Reponse Management Detail Component', () => {
        let comp: ReponseDetailComponent;
        let fixture: ComponentFixture<ReponseDetailComponent>;
        let service: ReponseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QuestionTestModule],
                declarations: [ReponseDetailComponent],
                providers: [
                    ReponseService
                ]
            })
            .overrideTemplate(ReponseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReponseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReponseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Reponse(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.reponse).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
