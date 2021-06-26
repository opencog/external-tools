/**
 * Created by kal on 3/24/17.
 */

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    'name': 'search'
})

export class SearchPipe implements PipeTransform{
    transform(items: any[], args): any {
        if (items != undefined) {
            let filter = args[0].toLowerCase();
            let filterBy = args[1];
            return items.filter((item) => item[filterBy].toLowerCase().indexOf(filter) != -1);
        }
    }

}