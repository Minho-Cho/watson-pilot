var Modeler = require("../Modeler.js");
var className = 'TypegetConferenceRoomCodeParameter';

var TypegetConferenceRoomCodeParameter = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  TYPE: {
      type: "string",
      wsdlDefinition: {
        name: "TYPE",
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
    },
    CODE: {
      type: "string",
      wsdlDefinition: {
        name: "CODE",
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

module.exports = TypegetConferenceRoomCodeParameter;
Modeler.register(TypegetConferenceRoomCodeParameter, "TypegetConferenceRoomCodeParameter");
