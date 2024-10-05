import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

interface argumentInterface {
    fun?: (x:number) => number;
    x0?: number;
    h?: number;
}

@Injectable()
export class SharedDataService {
    
    private data = new ReplaySubject<argumentInterface>(1);
    currentData$ = this.data.asObservable();

    setData(data: argumentInterface) {
        this.data.next(data);
    }
}