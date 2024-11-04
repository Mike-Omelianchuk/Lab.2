import { Injectable } from "@angular/core";

import { ResultInterface } from "../types/result.interface";
import { ErrorMessages } from "../../shared/enums/error-mesages";


@Injectable()
export class dpllService {

    resultTable: ResultInterface[] = [];

    dpllAlgorithm(x: number | undefined = 0, h: number | undefined = 0, iMax: number, 
                    fun: ((x: number) => number) | undefined = (x) => 0): ResultInterface[] | string {
        this.resultTable = [];
        let x0 = x;
        
        let x1 = x0 - h;
        let x2 = x0 + h;
        let x3;
        let f0 = fun(x0);
        let f1 = fun(x1);
        let f2 = fun(x2);
        let f3;

//#region First Step
        let a:number = 0, b:number = 0;
        if (f1 > f0 && f2 > f0) {
            a = x1;
            b = x2;
        }
        else if (f1 < f0 && f2 < f0) {
            return ErrorMessages.nonUnimodalFunction;
        }
        
        if (f1 <= f2) {
            h = -h;
        }
        else {
            x1 = x2;
            f1 = f2;
        }
//#endregion
        
        for(let i = 1; i < iMax; i++) {
            
            h = 2 * h;
            x2 = x1 + h;
            f2 = fun(x2);
            this.resultTable.push({i, x0, x1, x2, f1, f2});
            if (f2 <= f1) {
                x0 = x1;
                x1 = x2;
                f1 = f2;
            }
            else {
                x3 = x2 - h/2
                f3 = fun(x3);
                if (f1 > f3) {
                    a = x1;
                    b = x2;
                }
                else {
                    a = x0;
                    b = x3;
                }
                
                if (a > b) {
                    a = b
                }
                return this.resultTable;
            }
        }

        return ErrorMessages.startPointToFar;
    }
}