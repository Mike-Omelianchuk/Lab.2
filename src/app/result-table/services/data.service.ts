import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";


interface argumentInterface {
    h?: number;
    x0?: number;
    fun?: (x:number) => number;
}


@Injectable()
export class DataService { 
    private data = new BehaviorSubject<argumentInterface>({});
    currentData = this.data.asObservable();

    setData(data: argumentInterface) {
        this.data.next(data);
    }
}