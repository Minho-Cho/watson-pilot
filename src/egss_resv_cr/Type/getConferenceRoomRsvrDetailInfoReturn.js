var Modeler = require("../Modeler.js");
var className = 'TypegetConferenceRoomRsvrDetailInfoReturn';

var TypegetConferenceRoomRsvrDetailInfoReturn = function(json, parentObj) {
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
    MR_REG_NO: {
      type: "string",
      wsdlDefinition: {
        name: "MR_REG_NO",
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
    RSVR_FR_DD: {
      type: "string",
      wsdlDefinition: {
        name: "RSVR_FR_DD",
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
    RSVR_FR_HH: {
      type: "string",
      wsdlDefinition: {
        name: "RSVR_FR_HH",
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
    RSVR_FR_MI: {
      type: "string",
      wsdlDefinition: {
        name: "RSVR_FR_MI",
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
    RSVR_TO_DD: {
      type: "string",
      wsdlDefinition: {
        name: "RSVR_TO_DD",
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
    RSVR_TO_HH: {
      type: "string",
      wsdlDefinition: {
        name: "RSVR_TO_HH",
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
    RSVR_TO_MI: {
      type: "string",
      wsdlDefinition: {
        name: "RSVR_TO_MI",
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
    RSVR_FR_DD_DASH: {
      type: "string",
      wsdlDefinition: {
        name: "RSVR_FR_DD_DASH",
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
    RSVR_TO_DD_DASH: {
      type: "string",
      wsdlDefinition: {
        name: "RSVR_TO_DD_DASH",
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
    RSVR_FR_TO_HH: {
      type: "string",
      wsdlDefinition: {
        name: "RSVR_FR_TO_HH",
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
    MEET_TITLE: {
      type: "string",
      wsdlDefinition: {
        name: "MEET_TITLE",
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
    PROC_STS_CD: {
      type: "string",
      wsdlDefinition: {
        name: "PROC_STS_CD",
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
    RSVR_ID: {
      type: "string",
      wsdlDefinition: {
        name: "RSVR_ID",
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
    RSVR_DE: {
      type: "string",
      wsdlDefinition: {
        name: "RSVR_DE",
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
    MT_START_DT: {
      type: "string",
      wsdlDefinition: {
        name: "MT_START_DT",
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
    MT_END_DT: {
      type: "string",
      wsdlDefinition: {
        name: "MT_END_DT",
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
    BTN_USE_YN: {
      type: "string",
      wsdlDefinition: {
        name: "BTN_USE_YN",
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
    MNGR_ID: {
      type: "string",
      wsdlDefinition: {
        name: "MNGR_ID",
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
    MNGR_PROC_DT: {
      type: "string",
      wsdlDefinition: {
        name: "MNGR_PROC_DT",
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
    MNGR_DESC: {
      type: "string",
      wsdlDefinition: {
        name: "MNGR_DESC",
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
    COMP_NM: {
      type: "string",
      wsdlDefinition: {
        name: "COMP_NM",
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
    BLDNG_NM: {
      type: "string",
      wsdlDefinition: {
        name: "BLDNG_NM",
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
    },
    MR_NM: {
      type: "string",
      wsdlDefinition: {
        name: "MR_NM",
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
    RSVR_TYPE: {
      type: "string",
      wsdlDefinition: {
        name: "RSVR_TYPE",
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
    RSVR_TYPE_NM: {
      type: "string",
      wsdlDefinition: {
        name: "RSVR_TYPE_NM",
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
    BTN_LIVE_GBN: {
      type: "string",
      wsdlDefinition: {
        name: "BTN_LIVE_GBN",
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
    RSVR_NM: {
      type: "string",
      wsdlDefinition: {
        name: "RSVR_NM",
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
    RSVR_DEPT_NM: {
      type: "string",
      wsdlDefinition: {
        name: "RSVR_DEPT_NM",
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
    ATTEND_INFO: {
      type: "TypegetConferenceRoomRsvrDetailInfoReturnATTEND_INFORecord",
      wsdlDefinition: {
        name: "ATTEND_INFO",
        minOccurs: "0",
        maxOccurs: "unbounded",
        type: "impl:getConferenceRoomRsvrDetailInfoReturnATTEND_INFORecord"
      },
      mask: Modeler.GET | Modeler.SET | Modeler.ARRAY,
      required: false
    }
	}, parentObj, json);
};

module.exports = TypegetConferenceRoomRsvrDetailInfoReturn;
Modeler.register(TypegetConferenceRoomRsvrDetailInfoReturn, "TypegetConferenceRoomRsvrDetailInfoReturn");
