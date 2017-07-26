var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomFloorInfoResponse';

var ElementgetConferenceRoomFloorInfoResponse = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomFloorInfoReturn: {
      type: "TypegetConferenceRoomFloorInfoReturn",
      wsdlDefinition: {
        name: "getConferenceRoomFloorInfoReturn",
        type: "impl:getConferenceRoomFloorInfoReturn"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomFloorInfoResponse;
Modeler.register(ElementgetConferenceRoomFloorInfoResponse, "ElementgetConferenceRoomFloorInfoResponse");
