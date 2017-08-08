var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomMyRsvrInfo';

var ElementgetConferenceRoomMyRsvrInfo = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomMyRsvrInfoParameter: {
      type: "TypegetConferenceRoomMyRsvrInfoParameter",
      wsdlDefinition: {
        name: "getConferenceRoomMyRsvrInfoParameter",
        type: "impl:getConferenceRoomMyRsvrInfoParameter"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomMyRsvrInfo;
Modeler.register(ElementgetConferenceRoomMyRsvrInfo, "ElementgetConferenceRoomMyRsvrInfo");
