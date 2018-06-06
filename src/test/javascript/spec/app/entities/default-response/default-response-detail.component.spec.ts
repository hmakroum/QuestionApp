/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { QuestionTestModule } from '../../../test.module';
import { DefaultResponseDetailComponent } from '../../../../../../main/webapp/app/entities/default-response/default-response-detail.component';
import { DefaultResponseService } from '../../../../../../main/webapp/app/entities/default-response/default-response.service';
import { DefaultResponse } from '../../../../../../main/webapp/app/entities/default-response/default-response.model';

describe('Component Tests', () => {

    describe('DefaultResponse Management Detail Component', () => {
        let comp: DefaultResponseDetailComponent;
        let fixture: ComponentFixture<DefaultResponseDetailComponent>;
        let service: DefaultResponseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QuestionTestModule],
                declarations: [DefaultResponseDetailComponent],
                providers: [
                    DefaultResponseService
                ]
            })
            .overrideTemplate(DefaultResponseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DefaultResponseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefaultResponseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DefaultResponse(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.defaultResponse).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
