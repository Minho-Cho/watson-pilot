var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomServerTime';

var ElementgetConferenceRoomServerTime = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomServerTimeParameter: {
      type: "TypegetConferenceRoomServerTimeParameter",
      wsdlDefinition: {
        name: "getConferenceRoomServerTimeParameter",
        type: "impl:getConferenceRoomServerTimeParameter"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomServerTime;
Modeler.register(ElementgetConferenceRoomServerTime, "ElementgetConferenceRoomServerTime");
