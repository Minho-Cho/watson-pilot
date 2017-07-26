var Modeler = require("../Modeler.js");
var className = 'ElementaddConferenceRoomRsvr';

var ElementaddConferenceRoomRsvr = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  addConferenceRoomRsvrParameter: {
      type: "TypeaddConferenceRoomRsvrParameter",
      wsdlDefinition: {
        name: "addConferenceRoomRsvrParameter",
        type: "impl:addConferenceRoomRsvrParameter"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementaddConferenceRoomRsvr;
Modeler.register(ElementaddConferenceRoomRsvr, "ElementaddConferenceRoomRsvr");
