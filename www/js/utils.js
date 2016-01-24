function getSymbols(string) {
    var index = 0;
    var length = string.length;
    var output = [];
    for (; index < length - 1; ++index) {
        var charCode = string.charCodeAt(index);
        if (charCode >= 0xD800 && charCode <= 0xDBFF) {
            charCode = string.charCodeAt(index + 1);
            if (charCode >= 0xDC00 && charCode <= 0xDFFF) {
                output.push(string.slice(index, index + 2));
                ++index;
                continue;
            }
        }
        output.push(string.charAt(index));
    }
    output.push(string.charAt(index));
    return output;
}

DictUtils = {};
(function(){
    "use strict";
    /*
    DictUtils.upgrade =  function (view,rev) {
        var tmp = { '_id': $scope.current.toString(), 'annotation': [] };
        var i,j;
        for (i = 0; i < view.length; ++i) {
            tmp['annotation'].push({ 'text': view[i]['text'], 'indices': [] });
            for (j = 0; j < view[i]['indices'].length; ++j)
                if (view[i]['indices'][j])
                    tmp['annotation'][i]['indices'].push(j);
        }
        if (rev)
            tmp['_rev'] = rev;

        return tmp;
    }
    */
    
    /*
    DictUtils.downgrade(model) {
        var tmp = [];
        var i, j;
        for (i = 0; i < model['annotation'].length; ++i) {
            tmp.push({ 'text': model['annotation'][i]['text'], 'indices': [] });
            for (j = 0; j < $scope.sentence.length; ++j)
            {
                tmp[i]['indices'].push(false);
            }
            for (j = 0; j < model['annotation'][i]['indices'].length; ++j)
                tmp[i]['indices'][model['annotation'][i]['indices'][j]] = true;
        }
        return tmp;
    }*/
})();