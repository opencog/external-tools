/**
 * Created by tsadik on 6/15/17.
 */

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    'name': 'truncate'
})

export class TruncatePipe implements PipeTransform{
    transform(item: any, arg): any {
        if (item != undefined &&  arg != undefined) {
            let length = arg.toString();
            return item.length > length ? item.substr(0,length) + " ..." : item;
        }

        console.log(item);
        console.log(arg);

    }

}