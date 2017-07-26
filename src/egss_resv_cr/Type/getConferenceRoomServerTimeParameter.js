var Modeler = require("../Modeler.js");
var className = 'TypegetConferenceRoomServerTimeParameter';

var TypegetConferenceRoomServerTimeParameter = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  undefined: {
      type: "string",
      wsdlDefinition: {
        type: "xsd:string"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = TypegetConferenceRoomServerTimeParameter;
Modeler.register(TypegetConferenceRoomServerTimeParameter, "TypegetConferenceRoomServerTimeParameter");
