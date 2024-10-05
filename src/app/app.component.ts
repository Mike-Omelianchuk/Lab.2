import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { ResultTableComponent } from "./result-table/result-table.component";
import { SharedDataService } from './shared/services/sharedData.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    ResultTableComponent, 
    FormsModule, CommonModule],
  providers: [SharedDataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  functionInput: string = '';
  x0 = 2;
  h = 0.001;
  errorMessage = '';  

  constructor(
    private sharedDataService: SharedDataService,
  ) { }

  onSubmit() {
    // Convert string to a function
    let fun = this.convertStringToFunction(this.functionInput);
   
    this.errorMessage = '';

    this.sharedDataService.setData(this.x0);
  }

  convertStringToFunction(funcString: string): (x: number) => number {
    try {
      // using fuction construction to creat math function of the right type form a string
      const func = new Function('x', `return ${funcString}`);

      //testing new function
      func(0);

      return func as (x: number) => number;
      
    } catch (e) {
      throw new Error('Функція введена не вірно, перевірте поле вводу');
    }
  }
}
