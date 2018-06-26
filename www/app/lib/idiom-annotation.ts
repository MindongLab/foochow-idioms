export class IdiomAnnotation {
    highlightedRegion: Array<number> = new Array<number>();
    text: string = undefined; //Array<string> = new Array<string>();
    explanation: string; // Will be displayed as <text>: <explanation>

    get firstHighlightedPosition(): number {
        if (this.highlightedRegion.length > 0) {
            return this.highlightedRegion[0];
        } else {
            throw new Error("Empty annotation");
        }
    }

    get lastHighlightedPosition(): number {
        if (this.highlightedRegion.length > 0) {
            return this.highlightedRegion[this.highlightedRegion.length - 1];
        } else {
            throw new Error("Empty annotation");
        }  
    }

    parseObject(json1: object) {
        for (let i of json1['indices']) {
            this.highlightedRegion.push(i);
        }
        this.text = json1['text'];
        this.explanation = json1['explanation'];
    }
}