// Author: Jakub Smejkal for HARDWARIO s.r.o.
module.exports = function(RED) {
    function setRelay(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', function(msg) {
            if(config.rel == "power-module") {
                msg.topic = "node/" + config.module + "/relay/-/state/set";
                msg.payload = config.mode == "on" ? true : false;
            } else {
                msg.topic = "node/" + config.module + "/relay/0:0/";

                if(config.mode == "pulse") {
                    msg.topic += "pulse/set";

                } else {
                    msg.topic += "state/set";
                    msg.payload = config.mode == "on" ? true : false;
                }
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("relay", setRelay);
}