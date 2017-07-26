var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomCode';

var ElementgetConferenceRoomCode = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomCodeParameter: {
      type: "TypegetConferenceRoomCodeParameter",
      wsdlDefinition: {
        name: "getConferenceRoomCodeParameter",
        type: "impl:getConferenceRoomCodeParameter"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomCode;
Modeler.register(ElementgetConferenceRoomCode, "ElementgetConferenceRoomCode");
