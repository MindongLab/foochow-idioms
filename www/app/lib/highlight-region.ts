
export class HighlightRegion {
    startPosition: number;
    endPosition: number;
    isHighlighted = (pos: number) : boolean => 
        (this.startPosition<= pos && pos <= this.endPosition);
    constructor(s: number, p: number) {
        this.startPosition = s;
        this.endPosition = p;
    }
}