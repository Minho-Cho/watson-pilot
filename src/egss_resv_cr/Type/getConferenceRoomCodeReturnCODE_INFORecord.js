var Modeler = require("../Modeler.js");
var className = 'TypegetConferenceRoomCodeReturnCODE_INFORecord';

var TypegetConferenceRoomCodeReturnCODE_INFORecord = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
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
    },
    CODE_KOR_NM: {
      type: "string",
      wsdlDefinition: {
        name: "CODE_KOR_NM",
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
    CODE_ENG_NM: {
      type: "string",
      wsdlDefinition: {
        name: "CODE_ENG_NM",
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

module.exports = TypegetConferenceRoomCodeReturnCODE_INFORecord;
Modeler.register(TypegetConferenceRoomCodeReturnCODE_INFORecord, "TypegetConferenceRoomCodeReturnCODE_INFORecord");
