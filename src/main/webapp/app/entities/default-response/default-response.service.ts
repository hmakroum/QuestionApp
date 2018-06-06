import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DefaultResponse } from './default-response.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DefaultResponse>;

@Injectable()
export class DefaultResponseService {

    private resourceUrl =  SERVER_API_URL + 'api/default-responses';

    constructor(private http: HttpClient) { }

    create(defaultResponse: DefaultResponse): Observable<EntityResponseType> {
        const copy = this.convert(defaultResponse);
        return this.http.post<DefaultResponse>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(defaultResponse: DefaultResponse): Observable<EntityResponseType> {
        const copy = this.convert(defaultResponse);
        return this.http.put<DefaultResponse>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DefaultResponse>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DefaultResponse[]>> {
        const options = createRequestOption(req);
        return this.http.get<DefaultResponse[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DefaultResponse[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DefaultResponse = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DefaultResponse[]>): HttpResponse<DefaultResponse[]> {
        const jsonResponse: DefaultResponse[] = res.body;
        const body: DefaultResponse[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DefaultResponse.
     */
    private convertItemFromServer(defaultResponse: DefaultResponse): DefaultResponse {
        const copy: DefaultResponse = Object.assign({}, defaultResponse);
        return copy;
    }

    /**
     * Convert a DefaultResponse to a JSON which can be sent to the server.
     */
    private convert(defaultResponse: DefaultResponse): DefaultResponse {
        const copy: DefaultResponse = Object.assign({}, defaultResponse);
        return copy;
    }
}
