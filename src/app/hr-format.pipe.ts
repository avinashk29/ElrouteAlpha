import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hrFormat'
  // pure: false
})
export class HrFormatPipe implements PipeTransform {

  transform(value: string): string {
    if(value){
    if(Number(value.substring(0,2))>=12){
      value  = (Number(value.substring(0,2))-12)+value.substring(2,5);
      
      value = value+' PM'
      
    }
    else {
     value =value+' AM'
      
    }
  
    return value;
  }
  }
}

