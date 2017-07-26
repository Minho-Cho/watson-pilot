var Modeler = require("../Modeler.js");
var className = 'ElementupdateConferenceRoomStatus';

var ElementupdateConferenceRoomStatus = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  updateConferenceRoomStatusParameter: {
      type: "TypeupdateConferenceRoomStatusParameter",
      wsdlDefinition: {
        name: "updateConferenceRoomStatusParameter",
        type: "impl:updateConferenceRoomStatusParameter"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementupdateConferenceRoomStatus;
Modeler.register(ElementupdateConferenceRoomStatus, "ElementupdateConferenceRoomStatus");
