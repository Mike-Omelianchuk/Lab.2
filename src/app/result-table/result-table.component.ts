import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ResultInterface } from './types/result.interface';

import { dpllService } from './services/dpll.service';

import { SharedDataService } from '../shared/services/sharedData.service';


@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrl: './result-table.component.css',
  standalone: true,
  imports: [ CommonModule ],
  providers: [dpllService],
})
export class ResultTableComponent implements OnInit {
  columns: Array<keyof ResultInterface> = ['i', 'x0', 'x1', 'x2', 'f1', 'f2'];
  resultSource: ResultInterface[] = [];

  errorMessage = '';

  x0 = 0;
  h = 0.01;
  iMax = 100;
  fun = (x: number) => { return x*x*(x*x - 4) + 6 };

    constructor(
    private dpllService: dpllService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.sharedDataService.currentData$.subscribe(
      data => {
        if (data.fun && data.x0 && data.h) {
          this.fun = data.fun;
          this.x0 = data.x0;
          this.h = data.h;
          this.errorMessage = "";

          let result = this.dpllService.dpllAlgorithm(data.x0, data.h, this.iMax, data.fun);

          if (typeof result === 'string') {
            this.errorMessage = result;
          } else {
            this.resultSource = result;
          }
        }
        else {
          this.resultSource = [];
          this.errorMessage = "Введені не вірні дані";
        }
      }
    )
  }
}
