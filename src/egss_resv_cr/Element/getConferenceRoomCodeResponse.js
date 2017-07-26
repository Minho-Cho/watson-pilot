var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomCodeResponse';

var ElementgetConferenceRoomCodeResponse = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomCodeReturn: {
      type: "TypegetConferenceRoomCodeReturn",
      wsdlDefinition: {
        name: "getConferenceRoomCodeReturn",
        type: "impl:getConferenceRoomCodeReturn"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomCodeResponse;
Modeler.register(ElementgetConferenceRoomCodeResponse, "ElementgetConferenceRoomCodeResponse");
