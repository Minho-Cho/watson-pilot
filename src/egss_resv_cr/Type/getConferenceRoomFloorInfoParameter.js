var Modeler = require("../Modeler.js");
var className = 'TypegetConferenceRoomFloorInfoParameter';

var TypegetConferenceRoomFloorInfoParameter = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  MR_GBN: {
      type: "string",
      wsdlDefinition: {
        name: "MR_GBN",
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
    COMP_ID: {
      type: "string",
      wsdlDefinition: {
        name: "COMP_ID",
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
    BLDNG_ID: {
      type: "string",
      wsdlDefinition: {
        name: "BLDNG_ID",
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

module.exports = TypegetConferenceRoomFloorInfoParameter;
Modeler.register(TypegetConferenceRoomFloorInfoParameter, "TypegetConferenceRoomFloorInfoParameter");
