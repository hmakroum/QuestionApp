/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { QuestionTestModule } from '../../../test.module';
import { DefaultResponseComponent } from '../../../../../../main/webapp/app/entities/default-response/default-response.component';
import { DefaultResponseService } from '../../../../../../main/webapp/app/entities/default-response/default-response.service';
import { DefaultResponse } from '../../../../../../main/webapp/app/entities/default-response/default-response.model';

describe('Component Tests', () => {

    describe('DefaultResponse Management Component', () => {
        let comp: DefaultResponseComponent;
        let fixture: ComponentFixture<DefaultResponseComponent>;
        let service: DefaultResponseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QuestionTestModule],
                declarations: [DefaultResponseComponent],
                providers: [
                    DefaultResponseService
                ]
            })
            .overrideTemplate(DefaultResponseComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DefaultResponseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefaultResponseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DefaultResponse(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.defaultResponses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
