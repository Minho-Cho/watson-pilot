var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomInfo';

var ElementgetConferenceRoomInfo = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomInfoParameter: {
      type: "TypegetConferenceRoomInfoParameter",
      wsdlDefinition: {
        name: "getConferenceRoomInfoParameter",
        type: "impl:getConferenceRoomInfoParameter"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomInfo;
Modeler.register(ElementgetConferenceRoomInfo, "ElementgetConferenceRoomInfo");
