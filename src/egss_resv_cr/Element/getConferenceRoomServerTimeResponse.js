var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomServerTimeResponse';

var ElementgetConferenceRoomServerTimeResponse = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomServerTimeReturn: {
      type: "TypegetConferenceRoomServerTimeReturn",
      wsdlDefinition: {
        name: "getConferenceRoomServerTimeReturn",
        type: "impl:getConferenceRoomServerTimeReturn"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomServerTimeResponse;
Modeler.register(ElementgetConferenceRoomServerTimeResponse, "ElementgetConferenceRoomServerTimeResponse");
