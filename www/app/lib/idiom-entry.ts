// Data model 一个熟语词条

import {CharArray, IdiomAnnotation, IdiomTag} from "./";

export class IdiomEntry {
    textHans: CharArray = new CharArray("");  // 简体
    textHant: CharArray = new CharArray("");  // 繁体
    audioFile: string;
    notes: string;
    metaphor: string;
    private _tags: Array<IdiomTag> = new Array<IdiomTag>();
    private _annotations: Array<IdiomAnnotation> = new Array<IdiomAnnotation>();

    private _id: string = undefined;
    get id(): string {
        return this._id;
    }
    set id(value: string) {
        this._id = value;
    }

    get length(): number {  // 詞條的長度 (按漢字數目, IDS組字字串視爲一個字)
        return this.textHans.length;
    }
    
    constructor () {

    }
    
    addAnnotation(anno : IdiomAnnotation) {
        this._annotations.push(anno);
    }
    
    addTag(t : IdiomTag) {
        this._tags.push(t);
    }
    
    get tags() {
        return this._tags;
    }

    get annotations() : Array<IdiomAnnotation> {
        return this._annotations.sort((a,b) => {
            if (a.firstHighlightedPosition < b.firstHighlightedPosition) {
                return -1;
            } else if (a.firstHighlightedPosition > b.firstHighlightedPosition) {
                return 1;
            } else {
                // =
                if (a.lastHighlightedPosition < b.lastHighlightedPosition) {
                    return -1;
                } else if (a.lastHighlightedPosition > b.lastHighlightedPosition) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
        // ensure the annotations are sorted
    }
    
    setTextUsingString(str: string) {
        this.textHans.text = str;
    }
}