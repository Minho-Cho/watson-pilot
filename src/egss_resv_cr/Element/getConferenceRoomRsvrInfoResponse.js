var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomRsvrInfoResponse';

var ElementgetConferenceRoomRsvrInfoResponse = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomRsvrInfoReturn: {
      type: "TypegetConferenceRoomRsvrInfoReturn",
      wsdlDefinition: {
        name: "getConferenceRoomRsvrInfoReturn",
        type: "impl:getConferenceRoomRsvrInfoReturn"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomRsvrInfoResponse;
Modeler.register(ElementgetConferenceRoomRsvrInfoResponse, "ElementgetConferenceRoomRsvrInfoResponse");
