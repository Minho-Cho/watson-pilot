var Modeler = require("../Modeler.js");
var className = 'TypegetConferenceRoomRsvrDetailInfoParameter';

var TypegetConferenceRoomRsvrDetailInfoParameter = function(json, parentObj) {
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
    }
	}, parentObj, json);
};

module.exports = TypegetConferenceRoomRsvrDetailInfoParameter;
Modeler.register(TypegetConferenceRoomRsvrDetailInfoParameter, "TypegetConferenceRoomRsvrDetailInfoParameter");
