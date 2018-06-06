/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { QuestionTestModule } from '../../../test.module';
import { ReponseComponent } from '../../../../../../main/webapp/app/entities/reponse/reponse.component';
import { ReponseService } from '../../../../../../main/webapp/app/entities/reponse/reponse.service';
import { Reponse } from '../../../../../../main/webapp/app/entities/reponse/reponse.model';

describe('Component Tests', () => {

    describe('Reponse Management Component', () => {
        let comp: ReponseComponent;
        let fixture: ComponentFixture<ReponseComponent>;
        let service: ReponseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QuestionTestModule],
                declarations: [ReponseComponent],
                providers: [
                    ReponseService
                ]
            })
            .overrideTemplate(ReponseComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReponseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReponseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Reponse(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.reponses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
