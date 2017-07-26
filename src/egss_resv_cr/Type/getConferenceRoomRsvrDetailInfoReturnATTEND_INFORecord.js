var Modeler = require("../Modeler.js");
var className = 'TypegetConferenceRoomRsvrDetailInfoReturnATTEND_INFORecord';

var TypegetConferenceRoomRsvrDetailInfoReturnATTEND_INFORecord = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  ATTND_ID: {
      type: "string",
      wsdlDefinition: {
        name: "ATTND_ID",
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
    ATTND_DESC: {
      type: "string",
      wsdlDefinition: {
        name: "ATTND_DESC",
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
    ATTND_KOR_NM: {
      type: "string",
      wsdlDefinition: {
        name: "ATTND_KOR_NM",
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
    ATTND_ENG_NM: {
      type: "string",
      wsdlDefinition: {
        name: "ATTND_ENG_NM",
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
    ATTND_DEPT_KOR_NM: {
      type: "string",
      wsdlDefinition: {
        name: "ATTND_DEPT_KOR_NM",
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
    ATTND_DEPT_ENG_NM: {
      type: "string",
      wsdlDefinition: {
        name: "ATTND_DEPT_ENG_NM",
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

module.exports = TypegetConferenceRoomRsvrDetailInfoReturnATTEND_INFORecord;
Modeler.register(TypegetConferenceRoomRsvrDetailInfoReturnATTEND_INFORecord, "TypegetConferenceRoomRsvrDetailInfoReturnATTEND_INFORecord");
