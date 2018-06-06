import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReponseComponent } from './reponse.component';
import { ReponseDetailComponent } from './reponse-detail.component';
import { ReponsePopupComponent } from './reponse-dialog.component';
import { ReponseDeletePopupComponent } from './reponse-delete-dialog.component';

export const reponseRoute: Routes = [
    {
        path: 'reponse',
        component: ReponseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'questionApp.reponse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'reponse/:id',
        component: ReponseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'questionApp.reponse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reponsePopupRoute: Routes = [
    {
        path: 'reponse-new',
        component: ReponsePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'questionApp.reponse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reponse/:id/edit',
        component: ReponsePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'questionApp.reponse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reponse/:id/delete',
        component: ReponseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'questionApp.reponse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
