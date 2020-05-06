import { Component, Input } from "@angular/core";
import { NumberSymbol } from "@angular/common/src/i18n/locale_data_api";
import { HighlightRegion } from "../lib";
import { DictUtil } from "../utils/DictUtil";

@Component({
    selector: 'idiom-main-display',
    template: require('./idiom-main-display.component.html'),
})
export class IdiomMainDisplayComponent {
    @Input() text: string[];
    @Input() highlighted: HighlightRegion[] = [];
    @Input() size: number = 42;
    private DictUtil = new DictUtil();
    constructor() {

    }

    private isHighlighted(pos: number): boolean {
        for (let i = 0; i < this.highlighted.length; ++i) {
            if (this.highlighted[i].isHighlighted(pos)) {
                return true;
            }
        }
        return false;
    }

    private charIsCanvasChar(c: string): boolean {
        if ((c[0] == '{' && c[c.length - 1] == '}') || (this.DictUtil.extendedGlyphs.indexOf(c) != -1))
            return true
        else
            return false;
    }
}
