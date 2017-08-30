import {Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {NETWORK_ROUTES} from "./network/network.route";
import {AuthRoutes} from "./core/auth/auth.routes";
import {MainContainer} from "./shared/ui/main-container.component";
import {AuthService} from "./core/auth/services/auth.service";
import { UrlConnectComponent } from "./connect/url-connect/url-connect.component";


export const APP_ROUTES: Routes = [
    ...AuthRoutes,
    { path: '',
        canActivate: [ AuthService ],
        component: MainContainer,
        children: [
            ... NETWORK_ROUTES,
            {path: '', component: UrlConnectComponent}
        ]
    }

    // { path: '**',    component: _404PageComponent },/
];
