import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NavigationEventsService {
    private toggleSidebarSource = new Subject<any>();

    toggleSidebar$ = this.toggleSidebarSource.asObservable();

    toggleSidebar(state?: boolean) {
        this.toggleSidebarSource.next(state);
    }
}