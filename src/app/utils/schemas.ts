export const ID3v2_4 = {
  table: {
    size: 10,
    data: {
      Marker: {
        parseTo: 'filteredString',
        size: 3,
      },
      Version: {
        parseTo: 'number',
        size: 1,
      },
      Subversion: {
        parseTo: 'number',
        size: 1,
      },
      Tag: {
        parseTo: 'bits',
        size: 1,
      },
      Size: {
        parseTo: 'syncedNumber',
        size: 4,
      },
    },
  },
  frames: {
    header: {
      marker: 4,
      size: 4,
      flags: 2,
    },
    tags: {
      UFID: {
        data: {
          OwnerID: {
            type: 'terminated',
            terminator: '00',
          },
          Identifier: {
            type: 'textfield',
          },
        },
      },
      TIT1: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TIT2: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TIT3: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TALB: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TOAL: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TRCK: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TPOS: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TSST: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TSRC: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TPE1: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TPE2: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TPE3: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TPE4: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TOPE: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TEXT: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TOLY: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TCOM: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TMCL: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TIPL: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TENC: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TBPM: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TLEN: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TKEY: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TLAN: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TCON: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TFLT: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TMED: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TMOO: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TCOP: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TPRO: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TPUB: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TOWN: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TRSN: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TRSO: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TOFN: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TDLY: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TDEN: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TDOR: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TDRC: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TDRL: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TDTG: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TSSE: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TSOA: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TSOP: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TSOT: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TYER: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Information: {
            type: 'textfield',
          },
        },
      },
      TXXX: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Description: {
            type: 'terminated',
            terminator: '00',
          },
          Value: {
            type: 'textfield',
          },
        },
      },
      WCOM: {
        data: {
          Url: {
            type: 'textfield',
          },
        },
      },
      WCOP: {
        data: {
          Url: {
            type: 'textfield',
          },
        },
      },
      WOAF: {
        data: {
          Url: {
            type: 'textfield',
          },
        },
      },
      WOAR: {
        data: {
          Url: {
            type: 'textfield',
          },
        },
      },
      WOAS: {
        data: {
          Url: {
            type: 'textfield',
          },
        },
      },
      WORS: {
        data: {
          Url: {
            type: 'textfield',
          },
        },
      },
      WPAY: {
        data: {
          Url: {
            type: 'textfield',
          },
        },
      },
      WPUB: {
        data: {
          Url: {
            type: 'textfield',
          },
        },
      },
      WXXX: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Description: {
            type: 'terminated',
            terminator: '00',
          },
          Value: {
            type: 'textfield',
          },
        },
      },
      MCDI: {
        data: {
          TOC: {
            type: 'table',
            headerBytes: 4,
            rowSize: 8,
            structure: {
              TrackNumber: {
                size: 1,
                sizeInBits: false,
                parseTo: 'syncedNumber',
              },
              MinutesStart: {
                size: 1,
                sizeInBits: false,
                parseTo: 'syncedNumber',
              },
              SecondsStart: {
                size: 1,
                sizeInBits: false,
                parseTo: 'syncedNumber',
              },
              FramesStart: {
                size: 1,
                sizeInBits: false,
                parseTo: 'syncedNumber',
              },
              MinutesEnd: {
                size: 1,
                sizeInBits: false,
                parseTo: 'syncedNumber',
              },
              SecondsEnd: {
                size: 1,
                sizeInBits: false,
                parseTo: 'syncedNumber',
              },
              FramesEnd: {
                size: 1,
                sizeInBits: false,
                parseTo: 'syncedNumber',
              },
              ReservedZeros: {
                size: 1,
                sizeInBits: false,
                parseTo: 'hex',
              },
            },
          },
          LeadOut: {
            type: 'defined',
            size: 8,
          },
        },
      },
      ETCO: {
        data: {
          TimeStampFormat: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Timestamps: {
            type: 'list',
            structure: {
              EventType: {
                size: 1,
                sizeInBits: false,
                parseTo: 'hex',
              },
              Timestamp: {
                size: 4,
                sizeInBits: false,
                parseTo: 'number',
              },
            },
          },
        },
      },
      COMM: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Language: {
            type: 'defined',
            parseTo: 'filteredString',
            size: 3,
          },
          ShortDescription: {
            type: 'terminated',
            terminator: '00',
          },
          Text: {
            type: 'textfield',
          },
        },
      },
      MLLT: {
        data: {
          MPEGFramesBetweenReference: {
            type: 'defined',
            parseTo: 'number',
            size: 2,
          },
          BytesBetweenReference: {
            type: 'defined',
            parseTo: 'number',
            size: 3,
          },
          MsBetweenReference: {
            type: 'defined',
            parseTo: 'number',
            size: 3,
          },
          BitsForBytesDeviation: {
            type: 'defined',
            parseTo: 'number',
            size: 1,
          },
          BitsForMsDeviation: {
            type: 'defined',
            parseTo: 'number',
            size: 1,
          },
          DeviationList: {
            type: 'list',
            structure: {
              DeviationInBytes: {
                size: '%BitsForBytesDeviation',
                sizeInBits: true,
                parseTo: 'number',
              },
              DeviationInMs: {
                size: '%BitsForMsDeviation',
                sizeInBits: true,
                parseTo: 'number',
              },
            },
          },
        },
      },
    },
  },
};
