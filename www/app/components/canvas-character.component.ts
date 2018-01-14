'use strict';

// 用於顯示非Unicode或Unicode擴展區漢字的元件

function CanvasCharacterController($scope, KageService) {
    var ctrl = this;

    ctrl.altText = "";  // 用於 accessibility 的隱藏文字 (方便複製文本和 screen reader)
    ctrl.imgBase64Url = ""; 

    function updateText() {
        var requestedText = (ctrl.ids != '') ? ctrl.ids : ctrl.char;
        ctrl.altText = requestedText;
        console.log("[canvas-character] requesting IDS "+requestedText);
        ctrl.style = {
            'height': ctrl.size,
            'width': ctrl.size, 
            'background': 'url("'+ctrl.imgBase64Url+'")',
            'background-size': 'contain',
            'display': 'inline-block',
            'vertical-align': -5
        };
        KageService.getGlyphImage(requestedText, 200, 1).subscribe(
            (r)=> {
                console.log('got it:',r);
                ctrl.imgBase64Url = r.data;
                ctrl.style['background'] = 'url("'+ctrl.imgBase64Url+'")';
            }
        );
    }
    ctrl.$onChanges = () => {
        updateText();
    };  
    ctrl.$onInit = () => {
        updateText();
    };

}

CanvasCharacterController.$inject = ['$scope', 'KageService'];

var CanvasCharacter = {
    template: require('./canvas-character.component.html'),
    bindings: {
        char: '@', // character to be displayed
        ids:  '@', // ids to be displayed (`ids` is prioritised over `char`)
        size: '@'  // size of the character image (=height=width)
    },
    controller: CanvasCharacterController
}

module.exports = CanvasCharacter;