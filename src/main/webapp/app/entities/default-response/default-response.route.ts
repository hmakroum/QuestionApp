import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DefaultResponseComponent } from './default-response.component';
import { DefaultResponseDetailComponent } from './default-response-detail.component';
import { DefaultResponsePopupComponent } from './default-response-dialog.component';
import { DefaultResponseDeletePopupComponent } from './default-response-delete-dialog.component';

export const defaultResponseRoute: Routes = [
    {
        path: 'default-response',
        component: DefaultResponseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'questionApp.defaultResponse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'default-response/:id',
        component: DefaultResponseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'questionApp.defaultResponse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const defaultResponsePopupRoute: Routes = [
    {
        path: 'default-response-new',
        component: DefaultResponsePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'questionApp.defaultResponse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'default-response/:id/edit',
        component: DefaultResponsePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'questionApp.defaultResponse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'default-response/:id/delete',
        component: DefaultResponseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'questionApp.defaultResponse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
