var Modeler = require("../Modeler.js");
var className = 'TypegetValidConferenceRoomUserParameter';

var TypegetValidConferenceRoomUserParameter = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  EMP_ID: {
      type: "string",
      wsdlDefinition: {
        name: "EMP_ID",
        nillable: "true",
        "xsd:simpleType": {
          "xsd:restriction": {
            base: "xsd:string",
            "xsd:minLength": {
              value: "0"
            },
            "xsd:maxLength": {
              value: "128"
            }
          }
        },
        type: "xsd:string"
      },
      mask: Modeler.GET | Modeler.SET,
      required: false
    }
	}, parentObj, json);
};

module.exports = TypegetValidConferenceRoomUserParameter;
Modeler.register(TypegetValidConferenceRoomUserParameter, "TypegetValidConferenceRoomUserParameter");
