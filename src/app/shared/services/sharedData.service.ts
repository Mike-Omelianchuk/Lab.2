import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedDataService {
    
    private data = new BehaviorSubject(0);
    currentData$ = this.data.asObservable();

    setData(data: number) {
        this.data.next(data);
    }
}