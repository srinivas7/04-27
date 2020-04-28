import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'addSpace'
  })
  export class AddSpacePipe implements PipeTransform {
    transform(value: string): string {
        var str="";
        for(var i=0; i<value.length; i++){
            if(value[i] == '|'){
                str = str+ ' ';
            } else {
                str = str+ value[i];
            }
        }
      return str;
    }
  }
