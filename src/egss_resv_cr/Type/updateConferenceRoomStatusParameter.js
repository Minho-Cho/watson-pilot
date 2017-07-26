var Modeler = require("../Modeler.js");
var className = 'TypeupdateConferenceRoomStatusParameter';

var TypeupdateConferenceRoomStatusParameter = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  MR_REQST_NO: {
      type: "string",
      wsdlDefinition: {
        name: "MR_REQST_NO",
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
    BTN_STS_CD: {
      type: "string",
      wsdlDefinition: {
        name: "BTN_STS_CD",
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
    TB_PWD: {
      type: "string",
      wsdlDefinition: {
        name: "TB_PWD",
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

module.exports = TypeupdateConferenceRoomStatusParameter;
Modeler.register(TypeupdateConferenceRoomStatusParameter, "TypeupdateConferenceRoomStatusParameter");
