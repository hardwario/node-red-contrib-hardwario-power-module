module.exports = function(RED) {
    function setLEDStrip(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var wait = true;
        var hasColor = true;

        node.on('input', function(msg) {
            msg.topic = "node/" + config.module + "/led-strip/-/effect/set";
            switch(config.mode){
                case "color":
                    msg.topic = "node/" + config.module + "/led-strip/-/color/set";
                    msg.payload = "\"" + config.color + "\"";
                    node.send(msg);
                    return;
                case "rainbow":
                case "rainbow-cycle":
                case "theater-chase-rainbow":
                    hasColor = false;
                    break;
                case "test":
                    hasColor = false;
                    wait = false;
                    break;
            }

            if(wait && !hasColor) {
                msg.payload ='{ "type":"' + config.mode + '", "wait":' +  config.wait + ' }';

            }

            else if(wait && hasColor) {
                msg.payload = JSON.parse('{ "type":"' + config.mode + '", "wait":' + config.wait + ', "color":"' + config.color + '"}');
            }
            else {
                msg.payload = JSON.parse('{ "type":"' + config.mode + '"}');
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("led-strip", setLEDStrip);
}