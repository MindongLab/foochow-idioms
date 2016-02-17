(function () {
    "use strict";
    angular.module('app').controller('detailsCtrl', ['$q','$scope', '$rootScope', '$location', '$routeParams', '$sce', 'DataService', "KageService", "SERVER_AUDIO_URL", function ($q, $scope, $rootScope, $location, $routeParams,$sce, dataService, kageService, SERVER_AUDIO_URL) {
        
        $scope.highlight = [];
        $scope.highlightAnno = [];
        console.log('detailsCtrl $scope init');
        console.log($routeParams);
        switchToIdiom($routeParams.idiomtext);

        $scope.tagClicked = function (tagName) {
            $rootScope.$emit("switchToTag", {'tag': tagName});
            $rootScope.$emit("toggleSidebar", {'state': true});
        };

        $scope.playButtonClicked = function (filename) {
            var uri = SERVER_AUDIO_URL + filename.replace('.wma', '.mp3'),
                sound = new Howl({
                    urls: [uri]
                }).play();
        };
        //loadIdiom
        function switchToIdiom (text) {
            if (text) {
                dataService.getIdiomByText(text).then(function (r) {
                    $scope.result = r;
                    var glyphs = DictUtils.getChars(r['field_text']); 
                    var i;
                    var list=[];
                    for (i=0; i<glyphs.length; ++i) {
                        list[i]={};
                        list[i]['text']=glyphs[i];
                    }
                    $scope.field_text = list;
                    for (i=0; i<glyphs.length; ++i) {
                        if ((glyphs[i][0]=='{' && glyphs[i][glyphs[i].length-1]=="}")
                            || DictUtils.extendedGlyphs.indexOf(glyphs[i]) != -1) {
                            kageService.getGlyphImage(glyphs[i],200,i).then(function (r) {
                                console.log(r.id);
                                $scope.field_text[r.id]['imgsrc'] = r.data;
                            })
                        }
                    }
                    
                }).catch(function () {
                    console.log('detailsCtrl: view change failed.');
                });
            }
        };
        
        function getGlyphImage(str) {
            
            
        }
        $scope.highOn = function (annoId) {
            var indices = $scope.result['field_annotations'][annoId]['indices'];
            var i;
            for (i=0; i<indices.length; ++i) {
                $scope.highlight[indices[i]]=true;
            }
            $scope.highlightAnno[annoId]=true;
        };
        
        $scope.highOff = function (annoId) {
            var indices = $scope.result['field_annotations'][annoId]['indices'];
            var i;
            for (i=0; i<indices.length; ++i) {
                $scope.highlight[indices[i]]=false;
            }
            $scope.highlightAnno[annoId]=false;
        };

        function showShareCallout() {
            $('.shareCallout').addClass('calloutShow').removeClass("calloutHide");
            var shareTether = new Tether({
                element: '.shareCallout',
                target: '.shareButton',
                attachment: 'top center',
                targetAttachment: 'bottom left',
                constraints: [{
                    to: 'window',
                    pin: true
                }]
            });
            
        }
        
        function hideShareCallout() {
            $('.shareCallout').addClass("calloutHide").removeClass('calloutShow');
        }
        
        $scope.showShare = showShareCallout;
        

        $scope.$on('$destroy', function () {
            hideShareCallout();
            
        });
        
        $scope.initShare = function (){
            $(".ms-Panel").Panel();
        }
    }]);
}());
