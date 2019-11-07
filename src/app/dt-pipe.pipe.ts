import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dtPipe'
})
export class DtPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    //return null;
    var hours = 0
    var timePassed = []
    let today:Date = new Date();
    let todayWithoutTime:Date = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    let inputValueDate:Date = new Date(value.getFullYear(), value.getMonth(), value.getDate())

    let differenceInSeconds:number = (+todayWithoutTime - +inputValueDate) * 0.001;

    let days:number = differenceInSeconds/86400

    if(days < 1){
      days = 0;
    }
    // if(differenceInSeconds%86400 > 0){
    //   hours = differenceInSeconds%86400
    // }

    // if(hours){
    //   timePassed.push(days)
    //   timePassed.push(hours)
    //   timePassed.forEach(function(item){
    //     return item
    //   })
    // }

    return days;
  }

}
