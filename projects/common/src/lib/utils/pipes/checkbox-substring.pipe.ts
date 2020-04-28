import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'checkboxsubstring'})
export class CheckBoxSubString implements PipeTransform {
  transform(value: string): string {
    let newStr: string = "";
    if(value.length > 30){
        newStr = value.substr(0,27);
        newStr+="..."
        // console.log("newStr",newStr)
        return newStr;
    }
    else{
        return value;
    }
  }
}