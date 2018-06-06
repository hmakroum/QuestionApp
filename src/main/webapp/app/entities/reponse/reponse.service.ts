import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Reponse } from './reponse.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Reponse>;

@Injectable()
export class ReponseService {

    private resourceUrl =  SERVER_API_URL + 'api/reponses';

    constructor(private http: HttpClient) { }

    create(reponse: Reponse): Observable<EntityResponseType> {
        const copy = this.convert(reponse);
        return this.http.post<Reponse>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(reponse: Reponse): Observable<EntityResponseType> {
        const copy = this.convert(reponse);
        return this.http.put<Reponse>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Reponse>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Reponse[]>> {
        const options = createRequestOption(req);
        return this.http.get<Reponse[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Reponse[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Reponse = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Reponse[]>): HttpResponse<Reponse[]> {
        const jsonResponse: Reponse[] = res.body;
        const body: Reponse[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Reponse.
     */
    private convertItemFromServer(reponse: Reponse): Reponse {
        const copy: Reponse = Object.assign({}, reponse);
        return copy;
    }

    /**
     * Convert a Reponse to a JSON which can be sent to the server.
     */
    private convert(reponse: Reponse): Reponse {
        const copy: Reponse = Object.assign({}, reponse);
        return copy;
    }
}
