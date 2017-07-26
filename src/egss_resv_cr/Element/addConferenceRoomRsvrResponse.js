var Modeler = require("../Modeler.js");
var className = 'ElementaddConferenceRoomRsvrResponse';

var ElementaddConferenceRoomRsvrResponse = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  addConferenceRoomRsvrReturn: {
      type: "TypeaddConferenceRoomRsvrReturn",
      wsdlDefinition: {
        name: "addConferenceRoomRsvrReturn",
        type: "impl:addConferenceRoomRsvrReturn"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementaddConferenceRoomRsvrResponse;
Modeler.register(ElementaddConferenceRoomRsvrResponse, "ElementaddConferenceRoomRsvrResponse");
