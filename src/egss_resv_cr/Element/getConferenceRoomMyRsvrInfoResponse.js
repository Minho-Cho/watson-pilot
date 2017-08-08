var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomMyRsvrInfoResponse';

var ElementgetConferenceRoomMyRsvrInfoResponse = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomMyRsvrInfoReturn: {
      type: "TypegetConferenceRoomMyRsvrInfoReturn",
      wsdlDefinition: {
        name: "getConferenceRoomMyRsvrInfoReturn",
        type: "impl:getConferenceRoomMyRsvrInfoReturn"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomMyRsvrInfoResponse;
Modeler.register(ElementgetConferenceRoomMyRsvrInfoResponse, "ElementgetConferenceRoomMyRsvrInfoResponse");
