var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomInfoResponse';

var ElementgetConferenceRoomInfoResponse = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomInfoReturn: {
      type: "TypegetConferenceRoomInfoReturn",
      wsdlDefinition: {
        name: "getConferenceRoomInfoReturn",
        type: "impl:getConferenceRoomInfoReturn"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomInfoResponse;
Modeler.register(ElementgetConferenceRoomInfoResponse, "ElementgetConferenceRoomInfoResponse");
