var Modeler = require("../Modeler.js");
var className = 'ElementgetValidConferenceRoomUserResponse';

var ElementgetValidConferenceRoomUserResponse = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getValidConferenceRoomUserReturn: {
      type: "TypegetValidConferenceRoomUserReturn",
      wsdlDefinition: {
        name: "getValidConferenceRoomUserReturn",
        type: "impl:getValidConferenceRoomUserReturn"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetValidConferenceRoomUserResponse;
Modeler.register(ElementgetValidConferenceRoomUserResponse, "ElementgetValidConferenceRoomUserResponse");
