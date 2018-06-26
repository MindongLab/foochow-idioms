import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';
import { IdiomEntry, IdiomTag, IdiomAnnotation } from "../lib";
import { CharArray } from '../lib/char-array';

@Injectable()
export class IdiomDataService {

    private URL: string = "http://fiapi.radiumz.org:2052/api"
    constructor(private http: Http) {
    }

    getAllIdioms(): Observable<object> {
        return this.http.get(this.URL+'/all/')
            .map((res: Response) => res.json())
            .catch((err, caught) => {
                console.log('IdiomDataService: Error in getAllIdioms');
                return Observable.of(err);
            });
    }


    getAllIdioms2(): Observable<Array<IdiomEntry>> {
        return this.getAllIdioms()
            .map((res: Array<string>) =>
                res.map(element => new CharArray(element)))
            .catch((err, caught) => {
                console.log('IdiomDataService: Error in getAllIdioms2');
                return Observable.of(err);
            });
    }

    getIdiomsByTag(tagName: string): Observable<object> {
        return this.http.get(this.URL+'/tag/'+tagName)
            .map((res: Response) => res.json())
            .catch((err, caught) => {
                console.log('IdiomDataService: Error in getIdiomsByTag');
                return Observable.of(err);
            });
    }


    getIdiomsByTag2(tagName: string): Observable<Array<CharArray>> {
        return this.getIdiomsByTag(tagName)
            .map((res: Array<string>) =>
                res.map(element => new CharArray(element)))
            .catch((err, caught) => {
                console.log('IdiomDataService: Error in getIdiomsByTag2');
                return Observable.of(err);
            });
    }

    getIdiomByText(text: string): Observable<object> {
        return this.http.get(this.URL + '/sentence/' + text)
            .map((res: Response) => res.json())
            .catch((err, caught) => {
                console.log('IdiomDataService: Error in getIdiomByText');
                return Observable.of(err);
            });
    }

    getIdiomByText2(text:string): Observable<IdiomEntry> {
        return this.getIdiomByText(text)
            .map((r:object) => this.jsonToIdiomEntry(r))
            .catch((err, caught) => {
                console.log('IdiomDataService: Error in getIdiomByText2')
                return Observable.of(err);
            })
    }

    glyphCache = {};
    getGlyph(ids: string): Observable<object> {
        if (this.glyphCache[ids] !== undefined) {
            return this.glyphCache[ids];
        }
        const obs = this.http.get(this.URL+'/glyph/'+ids)
            .map((res: Response) => {
                let json = res.json();
                return json;
            })
            .catch((err, caught) => {
                console.log('IdiomDataService: Error in getGlyph');
                return Observable.of(err);
            }).share(); // avoids multiple HTTP requests
                        // https://blog.novanet.no/angular-pitfall-multiple-http-requests-with-rxjs-and-observable-async/
        this.glyphCache[ids] = obs;
        return obs;
    }

    getAllTags(): Observable<object> {
        return this.http.get(this.URL+'/tags/')
            .map((res: Response) => res.json())
            .catch((err, caught) => {
                console.log('IdiomDataService: Error in getAllTags');
                return Observable.of(err);
            });
    }


    private jsonToIdiomEntry(obj: any) {
        var entry = new IdiomEntry();
        entry.setTextUsingString(obj.field_text);
        entry.id = obj._id;
        entry.notes = obj.field_notes || "";
        entry.metaphor = obj.field_metaphor || "";
        for (let anno of obj.field_annotations) {
            var newA = new IdiomAnnotation();
            newA.parseObject(anno);
            entry.addAnnotation(newA);
        };
        for (let tag of obj.field_tags) {
            var newT  = new IdiomTag(tag);
            entry.addTag(newT);
        }
        entry.audioFile = obj.field_audio;

        return entry;
    }
}
