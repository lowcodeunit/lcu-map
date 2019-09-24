import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'substring'})
export class SubString implements PipeTransform {
  transform(value: string): string {
    let newStr: string = "";
    if(value.length > 35){
        newStr = value.substr(0,30);
        newStr+="..."
        // console.log("newStr",newStr)
        return newStr;
    }
    else{
        return value;
    }
  }
}