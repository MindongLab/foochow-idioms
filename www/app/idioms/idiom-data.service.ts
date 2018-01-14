import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

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

    getIdiomsByTag(tagName: string): Observable<object> {
        return this.http.get(this.URL+'/tag/'+tagName)
            .map((res: Response) => res.json())
            .catch((err, caught) => {
                console.log('IdiomDataService: Error in getIdiomsByTag');
                return Observable.of(err);
            });
    }

    getIdiomByText(text: string): Observable<object> {
        return this.http.get(this.URL + '/sentence/' + text)
            .map((res: Response) => res.json())
            .catch((err, caught) => {
                console.log('IdiomDataService: Error in getIdiomsByText');
                return Observable.of(err);
            });
    }

    getGlyph(ids: string): Observable<object> {
        return this.http.get(this.URL+'/glyph/'+ids)
            .map((res: Response) => res.json())
            .catch((err, caught) => {
                console.log('IdiomDataService: Error in getGlyph');
                return Observable.of(err);
            });
    }

    getAllTags(): Observable<object> {
        return this.http.get(this.URL+'/tags/')
            .map((res: Response) => res.json())
            .catch((err, caught) => {
                console.log('IdiomDataService: Error in getAllTags');
                return Observable.of(err);
            });
    }
}

export interface IdiomEntry {
    Text: string,
    Notes: string,
    Annotations: AnnotationEntry[],
    AudioFile: string,
    Source: object
}

export interface AnnotationEntry {
    Text: string,
    Explanation: string,
    Indices: number[]
}