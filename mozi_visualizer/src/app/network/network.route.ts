import { Routes } from "@angular/router";
import { NetworkComponent } from "./network/network.component";

export const NETWORK_ROUTES: Routes = [
    { path: 'network',
        children: [
            { path: '', component: NetworkComponent },
        ]
     }
    // { path: '', component: NetworkComponent }
];