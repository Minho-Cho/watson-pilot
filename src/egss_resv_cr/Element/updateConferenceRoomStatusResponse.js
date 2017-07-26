var Modeler = require("../Modeler.js");
var className = 'ElementupdateConferenceRoomStatusResponse';

var ElementupdateConferenceRoomStatusResponse = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  updateConferenceRoomStatusReturn: {
      type: "TypeupdateConferenceRoomStatusReturn",
      wsdlDefinition: {
        name: "updateConferenceRoomStatusReturn",
        type: "impl:updateConferenceRoomStatusReturn"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementupdateConferenceRoomStatusResponse;
Modeler.register(ElementupdateConferenceRoomStatusResponse, "ElementupdateConferenceRoomStatusResponse");
