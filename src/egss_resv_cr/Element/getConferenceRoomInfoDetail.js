var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomInfoDetail';

var ElementgetConferenceRoomInfoDetail = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomInfoDetailParameter: {
      type: "TypegetConferenceRoomInfoDetailParameter",
      wsdlDefinition: {
        name: "getConferenceRoomInfoDetailParameter",
        type: "impl:getConferenceRoomInfoDetailParameter"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomInfoDetail;
Modeler.register(ElementgetConferenceRoomInfoDetail, "ElementgetConferenceRoomInfoDetail");
