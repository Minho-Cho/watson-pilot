var Modeler = require("../Modeler.js");
var className = 'TypegetConferenceRoomCodeReturn';

var TypegetConferenceRoomCodeReturn = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  E_RETVAL: {
      type: "string",
      wsdlDefinition: {
        name: "E_RETVAL",
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
    E_RETMSG: {
      type: "string",
      wsdlDefinition: {
        name: "E_RETMSG",
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
    CODE_INFO: {
      type: "TypegetConferenceRoomCodeReturnCODE_INFORecord",
      wsdlDefinition: {
        name: "CODE_INFO",
        minOccurs: "0",
        maxOccurs: "unbounded",
        type: "impl:getConferenceRoomCodeReturnCODE_INFORecord"
      },
      mask: Modeler.GET | Modeler.SET | Modeler.ARRAY,
      required: false
    }
	}, parentObj, json);
};

module.exports = TypegetConferenceRoomCodeReturn;
Modeler.register(TypegetConferenceRoomCodeReturn, "TypegetConferenceRoomCodeReturn");
