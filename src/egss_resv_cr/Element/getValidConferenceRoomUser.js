var Modeler = require("../Modeler.js");
var className = 'ElementgetValidConferenceRoomUser';

var ElementgetValidConferenceRoomUser = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  getValidConferenceRoomUserParameter: {
      type: "TypegetValidConferenceRoomUserParameter",
      wsdlDefinition: {
        name: "getValidConferenceRoomUserParameter",
        type: "impl:getValidConferenceRoomUserParameter"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = ElementgetValidConferenceRoomUser;
Modeler.register(ElementgetValidConferenceRoomUser, "ElementgetValidConferenceRoomUser");
