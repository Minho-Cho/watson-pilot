var Modeler = require("../Modeler.js");
var className = 'TypegetConferenceRoomFloorInfoReturn';

var TypegetConferenceRoomFloorInfoReturn = function(json, parentObj) {
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
    FLOOR_INFO: {
      type: "TypegetConferenceRoomFloorInfoReturnFLOOR_INFORecord",
      wsdlDefinition: {
        name: "FLOOR_INFO",
        minOccurs: "0",
        maxOccurs: "unbounded",
        type: "impl:getConferenceRoomFloorInfoReturnFLOOR_INFORecord"
      },
      mask: Modeler.GET | Modeler.SET | Modeler.ARRAY,
      required: false
    }
	}, parentObj, json);
};

module.exports = TypegetConferenceRoomFloorInfoReturn;
Modeler.register(TypegetConferenceRoomFloorInfoReturn, "TypegetConferenceRoomFloorInfoReturn");
