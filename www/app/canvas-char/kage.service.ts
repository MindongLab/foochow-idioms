import { Injectable } from "@angular/core";
import { IdiomDataService } from "../idioms/idiom-data.service";
import { Observable } from "rxjs/Observable";

// workaround for global variables
declare var Kage: any;
declare var Polygons: any;

@Injectable()
export class KageService {
    cache = {};
    constructor (private dataService: IdiomDataService) {

    }

    private drawKage(arr, canvas) : void {
        var ctx = canvas.getContext("2d");

        var kage = new Kage();
        kage.kUseCurve = false;
        var polygons = new Polygons();

        for (var i=0; i <arr.length; ++i) {
            kage.kBuhin.push(arr[i]["name"],arr[i]["code"]);
        }
        kage.makeGlyph(polygons, "target");

        ctx.fillStyle = "rgb(0, 0, 0)";

        for(var i = 0; i < polygons.array.length; i++){
            ctx.beginPath();
            ctx.moveTo(polygons.array[i].array[0].x, polygons.array[i].array[0].y);
            for(var j = 1; j < polygons.array[i].array.length; j++){
                ctx.lineTo(polygons.array[i].array[j].x, polygons.array[i].array[j].y);
            }
            ctx.closePath();
            ctx.fill();
        }
    }

    getKage(ids, canvas): Observable<any> {
        if (this.cache[ids] !== undefined) {
            return Observable.of(this.cache[ids]).map((r) => {
                this.drawKage(r["field_kanjivg"], canvas);
                return canvas;
            });
        } else {
            return this.dataService.getGlyph(ids).map((r) => {
                this.cache[ids] = r;
                this.drawKage(r["field_kanjivg"], canvas);
                return canvas;
            });
        }
        //@todo: error handling
    }

    
    getGlyphImage(str, size, id) : Observable<object> {
        var can = document.createElement('canvas');
        can.height = size;
        can.width = size;
        return this.getKage(str, can).map(function (can) {
            return {id:id, data: can.toDataURL()};
        });
        //@todo: error handling
    }


}