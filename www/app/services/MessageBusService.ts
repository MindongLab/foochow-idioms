'use strict';

declare function keys(any);

function MessageBusService() {
    var subscribers = {};
    var counter = 0;

    function subscribe(func) {
        ++counter;
        subscribers[counter] = func;
        return counter;
    }

    function unsubscribe(id) {
        delete subscribers[id];
    }

    function publish(msg) {
        let s = keys(subscribers);
        for (let i = 0; i < s.length; ++i) {
            subscribers[s[i]](msg);
        }
    }

    return {
        subscribe: subscribe.bind(this),
    };
};

module.exports = MessageBusService;