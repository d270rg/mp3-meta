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
      USER: {
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
          Text: {
            type: 'textfield',
          },
        },
      },
      OWNE: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          PricePaid: {
            type: 'terminated',
            terminator: '00',
          },
          DateOfPurchase: {
            type: 'defined',
            parseTo: 'date',
            size: 8,
          },
          Seller: {
            type: 'textfield',
          },
        },
      },
      ENCR: {
        data: {
          OwnerID: {
            type: 'terminated',
            terminator: '00',
          },
          MethodSymbol: {
            type: 'defined',
            parseTo: 'string',
            size: 1,
          },
          EncryptionData: {
            type: 'bytefield',
          },
        },
      },
      GRID: {
        data: {
          OwnerID: {
            type: 'terminated',
            terminator: '00',
          },
          GroupSymbol: {
            type: 'defined',
            parseTo: 'string',
            size: 1,
          },
          GroupDependentData: {
            type: 'bytefield',
          },
        },
      },
      PRIV: {
        data: {
          OwnerID: {
            type: 'terminated',
            terminator: '00',
          },
          PrivateData: {
            type: 'bytefield',
          },
        },
      },
      //Experimental frames
      ASPI: {
        data: {
          IndexedDataStart: {
            type: 'defined',
            parseTo: 'number',
            size: 4,
          },
          IndexedDataLength: {
            type: 'defined',
            parseTo: 'number',
            size: 4,
          },
          NumberOfIndexPoints: {
            type: 'defined',
            parseTo: 'number',
            size: 2,
          },
          BitsPerIndexPoint: {
            type: 'defined',
            parseTo: 'number',
            size: 1,
          },
          FI: {
            type: 'bitList',
            refStructure: {
              Fraction: {
                sizeRef: 'BitsPerIndexPoint',
              },
            },
          },
        },
      },
      SEEK: {
        data: {
          MinOffsetToNextTag: {
            type: 'defined',
            parseTo: 'number',
            size: 4,
          },
        },
      },
      COMR: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          PriceString: {
            type: 'terminated',
            terminator: '00',
          },
          ValidUntil: {
            type: 'defined',
            parseTo: 'date',
            size: 8,
          },
          ContactURL: {
            type: 'terminated',
            terminator: '00',
          },
          ReceivedAs: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          NameOfSeller: {
            type: 'terminated',
            terminator: '00',
          },
          Description: {
            type: 'terminated',
            terminator: '00',
          },
          PictureMimeType: {
            type: 'terminated',
            terminator: '00',
          },
          SellerLogo: {
            type: 'bytefield',
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
                parseTo: 'syncedNumber',
              },
              MinutesStart: {
                size: 1,
                parseTo: 'syncedNumber',
              },
              SecondsStart: {
                size: 1,
                parseTo: 'syncedNumber',
              },
              FramesStart: {
                size: 1,
                parseTo: 'syncedNumber',
              },
              MinutesEnd: {
                size: 1,
                parseTo: 'syncedNumber',
              },
              SecondsEnd: {
                size: 1,
                parseTo: 'syncedNumber',
              },
              FramesEnd: {
                size: 1,
                parseTo: 'syncedNumber',
              },
              ReservedZeros: {
                size: 1,
                parseTo: 'hex',
              },
            },
          },
          LeadOut: {
            type: 'defined',
            parseTo: 'hex',
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
                parseTo: 'hex',
              },
              Timestamp: {
                size: 4,
                parseTo: 'number', //Sync?
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
          BitsForByteDeviation: {
            type: 'defined',
            parseTo: 'number',
            size: 1,
          },
          BitsForMsDeviation: {
            type: 'defined',
            parseTo: 'number',
            size: 1,
          },
          RefList: {
            type: 'bitList',
            refStructure: {
              DeviationInBytes: {
                sizeRef: 'BitsForByteDeviation',
              },
              DeviationInMs: {
                sizeRef: 'BitsForMsDeviation',
              },
            },
          },
        },
      },
      USLT: {
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
          TimeStampFormat: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          ContentType: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          ContentDescriptor: {
            type: 'terminated',
            terminator: '00',
          },
          Lyrics: {
            type: 'textfield',
          },
        },
      },
      SYLT: {
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
          TimeStampFormat: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          ContentType: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          ContentDescriptor: {
            type: 'terminated',
            terminator: '00',
          },
          SyncLyrics: {
            type: 'terminatedTextfield',
            dividerSize: 2,
          },
        },
      },
      SYTC: {
        data: {
          Timestamp: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          TempoData: {
            type: 'bytefield',
          },
        },
      },
      RVA2: {
        data: {
          Identification: {
            type: 'terminated',
            terminator: '00',
          },
          Channels: {
            type: 'list',
            structure: {
              TypeOfChannel: {
                size: 1,
                parseTo: 'hex',
              },
              VolumeAdjustment: {
                size: 2,
                parseTo: 'hex',
              },
              PeakBits: {
                size: 1,
                parseTo: 'number',
              },
              PeakInfo: {
                sizeRef: { ref: 'PeakBits', refInRoundedBits: true },
                parseTo: 'number',
              },
            },
          },
        },
      },
      EQU2: {
        data: {
          InterpolationMethod: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Identification: {
            type: 'terminated',
            terminator: '00',
          },
          AdjustmentPoints: {
            type: 'list',
            structure: {
              Frequency: {
                size: 2,
                parseTo: 'number',
              },
              VolumeAdjustment: {
                size: 2,
                parseTo: 'number',
              },
            },
          },
        },
      },
      RVRB: {
        data: {
          RevLeftMs: {
            type: 'defined',
            parseTo: 'number',
            size: 2,
          },
          RevRightMs: {
            type: 'defined',
            parseTo: 'number',
            size: 2,
          },
          RevBouncesLeft: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          RevBouncesRight: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          RevFeedbackLtoL: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          RevFeedbackLtoR: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          RevFeedbackRtoR: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          RevFeedbackRtoL: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          PremixLtoR: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          PremixRtoL: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
        },
      },
      APIC: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          MIME: {
            type: 'terminated',
            terminator: '00',
          },
          PictureType: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Description: {
            type: 'terminated',
            terminator: '00',
          },
          PictureData: {
            type: 'bytefield',
          },
        },
      },
      GEOB: {
        data: {
          TextEncoding: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          MIME: {
            type: 'terminated',
            terminator: '00',
          },
          Filename: {
            type: 'terminated',
            terminator: '00',
          },
          Description: {
            type: 'terminated',
            terminator: '00',
          },
          EncapsulatedObject: {
            type: 'bytefield',
          },
        },
      },
      PCNT: {
        data: {
          Counter: {
            type: 'bytefield',
          },
        },
      },
      POPM: {
        data: {
          Email: {
            type: 'terminated',
            terminator: '00',
          },
          Rating: {
            type: 'defined',
            parseTo: 'number',
            size: 1,
          },
          Counter: {
            type: 'bitfield',
          },
        },
      },
      RBUF: {
        data: {
          bufferSize: {
            type: 'defined',
            parseTo: 'number',
            size: 1,
          },
          InfoFlag: {
            type: 'defined',
            parseTo: 'bits',
            size: 1,
          },
          Offset: {
            type: 'defined',
            parseTo: 'number',
            size: 4,
          },
        },
      },
      AENC: {
        data: {
          OwnerID: {
            type: 'terminated',
            terminator: '00',
          },
          PreviewStart: {
            type: 'defined',
            parseTo: 'number',
            size: 2,
          },
          PreviewLength: {
            type: 'defined',
            parseTo: 'number',
            size: 2,
          },
          EncryptionInfo: {
            type: 'bitfield',
          },
        },
      },
      LINK: {
        data: {
          FrameID: {
            type: 'defined',
            parseTo: 'string',
            size: 4,
          },
          URL: {
            type: 'terminated',
            terminator: '00',
          },
          ID: {
            type: 'textfield',
          },
        },
      },
      POSS: {
        data: {
          TimeStampFormat: {
            type: 'defined',
            parseTo: 'hex',
            size: 1,
          },
          Position: {
            type: 'defined',
            parseTo: 'number',
            size: 4, //Sync?
          },
        },
      },
    },
  },
};
