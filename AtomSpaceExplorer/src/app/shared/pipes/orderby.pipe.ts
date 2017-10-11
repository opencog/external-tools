import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "orderBy"
})

export class OrderByPipe implements PipeTransform {
   transform(value, sortBy: string,order:boolean): any[] {
       if (value != undefined) {
           value.sort((a, b) => {
               let orderBy = sortBy;

               if (a[orderBy] < b[orderBy]) {
                   return order?-1:1;
               } else if (a[orderBy] > b[orderBy]) {
                   return order?1:-1;
               }
                return 0;
            });
       }

       return value;
  }
}
