var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomRsvrInfo';

var ElementgetConferenceRoomRsvrInfo = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomRsvrInfoParameter: {
      type: "TypegetConferenceRoomRsvrInfoParameter",
      wsdlDefinition: {
        name: "getConferenceRoomRsvrInfoParameter",
        type: "impl:getConferenceRoomRsvrInfoParameter"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomRsvrInfo;
Modeler.register(ElementgetConferenceRoomRsvrInfo, "ElementgetConferenceRoomRsvrInfo");
