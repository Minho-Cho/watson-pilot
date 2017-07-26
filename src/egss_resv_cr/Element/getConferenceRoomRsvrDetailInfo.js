var Modeler = require("../Modeler.js");
var className = 'ElementgetConferenceRoomRsvrDetailInfo';

var ElementgetConferenceRoomRsvrDetailInfo = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getConferenceRoomRsvrDetailInfoParameter: {
      type: "TypegetConferenceRoomRsvrDetailInfoParameter",
      wsdlDefinition: {
        name: "getConferenceRoomRsvrDetailInfoParameter",
        type: "impl:getConferenceRoomRsvrDetailInfoParameter"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetConferenceRoomRsvrDetailInfo;
Modeler.register(ElementgetConferenceRoomRsvrDetailInfo, "ElementgetConferenceRoomRsvrDetailInfo");
