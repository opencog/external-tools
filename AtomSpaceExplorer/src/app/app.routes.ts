import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthRoutes } from './core/auth/auth.routes';
import { MainContainer } from './shared/ui/main-container.component';
import { AuthService } from './core/auth/services/auth.service';
import { UrlConnectComponent } from './connect/url-connect/url-connect.component';
import { VisualizerComponent } from 'ng2-atomspace-visualizer';

export const APP_ROUTES: Routes = [
    { path: '',
        component: MainContainer,
        children: [
            {path: 'fetch', component: UrlConnectComponent},
            {path: 'cog-visualizer', component: VisualizerComponent}
        ]
    }
    // { path: '**',    component: _404PageComponent },/
];
