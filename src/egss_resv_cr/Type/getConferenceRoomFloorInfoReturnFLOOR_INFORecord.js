var Modeler = require("../Modeler.js");
var className = 'TypegetConferenceRoomFloorInfoReturnFLOOR_INFORecord';

var TypegetConferenceRoomFloorInfoReturnFLOOR_INFORecord = function(json, parentObj) {
  parentObj = parentObj || this;
	
	
	// Class property definitions here:
	Modeler.extend(className, {
	  FLOR_LOC: {
      type: "string",
      wsdlDefinition: {
        name: "FLOR_LOC",
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

module.exports = TypegetConferenceRoomFloorInfoReturnFLOOR_INFORecord;
Modeler.register(TypegetConferenceRoomFloorInfoReturnFLOOR_INFORecord, "TypegetConferenceRoomFloorInfoReturnFLOOR_INFORecord");
