var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomInfoDetailResponse';

var ElementgetConferenceRoomInfoDetailResponse = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomInfoDetailReturn: {
      type: "TypegetConferenceRoomInfoDetailReturn",
      wsdlDefinition: {
        name: "getConferenceRoomInfoDetailReturn",
        type: "impl:getConferenceRoomInfoDetailReturn"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomInfoDetailResponse;
Modeler.register(ElementgetConferenceRoomInfoDetailResponse, "ElementgetConferenceRoomInfoDetailResponse");
