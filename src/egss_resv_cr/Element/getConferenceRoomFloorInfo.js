var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomFloorInfo';

var ElementgetConferenceRoomFloorInfo = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomFloorInfoParameter: {
      type: "TypegetConferenceRoomFloorInfoParameter",
      wsdlDefinition: {
        name: "getConferenceRoomFloorInfoParameter",
        type: "impl:getConferenceRoomFloorInfoParameter"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomFloorInfo;
Modeler.register(ElementgetConferenceRoomFloorInfo, "ElementgetConferenceRoomFloorInfo");
