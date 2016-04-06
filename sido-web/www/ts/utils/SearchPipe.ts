/**
 * Created by jaucagne on 18/01/2016.
 */
import {Pipe,PipeTransform} from "angular2/core";

@Pipe({
    name: "search"
})
export class SearchPipe implements PipeTransform
{
    transform(value: any,args: any[]): any
    {
        if(value && value != "")
        {
            return value.filter((item) => item.startsWith(args[0]));
        }
        return;
    }
};