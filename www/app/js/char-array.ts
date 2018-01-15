var DictUtils = require('./utils');

export class CharArray {
    private _text : Array<string> = new Array<string>();
    set text(str: string) {
        this._text = DictUtils.getChars(str);
    }

    get length() : number {
        return this._text.length;
    }

    get(i: number) : string {
        if (i > 0 && i<this.length) {
            return this._text[i];            
        } else {
            throw new ReferenceError();
        }
    }

    renderByCanvas(i : number): boolean {
        if (i >= 0 && i<this.length) {
            var thisChar = this._text[i];
            return (thisChar[0]=='{' && thisChar[thisChar.length-1]=="}") || DictUtils.extendedGlyphs.indexOf(thisChar) != -1;
        }
        
    }

    toString() : string {
        var tmp : string = '';
        for (let item in this._text) {
            tmp = tmp + this._text[item];
        }
        return tmp;
    }

    get asArray() : Array<string> {
        return this._text;
    }

    constructor (str : string) {
        this.text = str;
    }
}