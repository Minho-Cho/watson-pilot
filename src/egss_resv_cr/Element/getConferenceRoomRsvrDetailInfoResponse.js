var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomRsvrDetailInfoResponse';

var ElementgetConferenceRoomRsvrDetailInfoResponse = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomRsvrDetailInfoReturn: {
      type: "TypegetConferenceRoomRsvrDetailInfoReturn",
      wsdlDefinition: {
        name: "getConferenceRoomRsvrDetailInfoReturn",
        type: "impl:getConferenceRoomRsvrDetailInfoReturn"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomRsvrDetailInfoResponse;
Modeler.register(ElementgetConferenceRoomRsvrDetailInfoResponse, "ElementgetConferenceRoomRsvrDetailInfoResponse");
