//Primitive types
enum dynamicFormat {
  Hex = 'hex',
  Bytes = 'bytes',
  Bits = 'bits',
  Number = 'number',
  SyncedNumber = 'syncedNumber',
  String = 'string',
  FilteredString = 'filteredString',
  Dynamic = 'dynamic',
}
enum subdivisionsFormat {
  Defined = 'defined',
  Terminated = 'terminated',
  Textfield = 'textfield',
  Table = 'table',
  List = 'list',
}
type parsedValue = number | string | string[] | number[] | ListEntry;
interface ListEntry {
  [key: string]: {
    value: parsedValue;
    parseTo: string;
  };
}
//--Main headers schema--
interface SchemaEntry {
  size: number; //size in bytes
  data: {
    [title: string]: {
      parseTo: string;
      size: number;
    };
  };
}
//-parsed-
interface parsedSchemaEntry {
  size: number; //size in bytes
  headPosition: number;
  data: {
    [title: string]: {
      format: string;
      payload: parsedValue;
    };
  };
}
//--
//----

//--Frames schema--
interface frameTagHeader {
  marker: number;
  size: number;
  flags: number;
}
interface frameTagSubdivision {
  type: string;
  parseTo?: string; //for 'defined'
  terminator?: string; //for 'terminated'
  size?: number; //for 'defined'
  //for 'table'
  rowSize?: number;
  headerBytes?: number;
  //for 'list'
  structure?: {
    [key: string]: {
      size: number | string;
      sizeInBits: boolean;
      parseTo: string;
    };
  };
}
interface SchemaFrameEntry {
  header: frameTagHeader;
  tags: {
    [tagName: string]: {
      data: {
        [tagSubdivision: string]: frameTagSubdivision;
      };
    };
  };
}
//-Parsed-
interface parsedFrameTagHeader {
  marker: string;
  size: number;
  flags: string[];
}
interface parsedFrameTagSubdivision {
  format: string;
  payload: parsedValue;
}
interface parsedTag {
  findAt: number;
  header: parsedFrameTagHeader;
  data: {
    [tagSubdivision: string]: parsedFrameTagSubdivision;
  };
}
interface parsedSchemaFrameEntry {
  [tagName: string]: parsedTag;
}
//--
//----

//--General buffer format--
interface Schema {
  table: SchemaEntry;
  frames: SchemaFrameEntry;
}
//-Parsed-
interface parsedSchema {
  headerTable?: parsedSchemaEntry;
  frames?: parsedSchemaFrameEntry;
}
//--
//----

export class ByteParser {
  constructor() {}

  //Parsers
  public Parse(arrayBuffer: ArrayBuffer, schema: Schema): parsedSchema {
    switch (this.checkType(arrayBuffer)) {
      case 'v1': {
        console.log('V1 detected');
        return {};
      }
      case 'v2': {
        console.log('V2 detected');
        let parsedTable = this.tableParse(arrayBuffer, schema.table, 0);
        console.log(parsedTable);
        let parsedFrames = this.frameSearchParse(
          arrayBuffer,
          schema.frames,
          parsedTable.headPosition,
          parsedTable.headPosition + parsedTable.size
        );
        console.log(parsedFrames);
        return {
          headerTable: parsedTable,
          frames: parsedFrames,
        };
      }
      default: {
        console.log('Cannot parse');
        return {};
      }
    }
  }
  private tableParse(
    buffer: ArrayBuffer,
    tableStructure: SchemaEntry,
    start: number
  ): parsedSchemaEntry {
    let parsedResult: parsedSchemaEntry = {
      size: 0,
      headPosition: start,
      data: {},
    };
    let headPosition = start;
    Object.keys(tableStructure.data).forEach((key) => {
      let parsedTableEntry = {
        format: 'Bytes',
        payload: <parsedValue>'',
      };
      parsedTableEntry.format = <dynamicFormat>tableStructure.data[key].parseTo;
      parsedTableEntry.payload = this.dynamicConvert(
        this.rangeParse(
          buffer,
          headPosition,
          headPosition + tableStructure.data[key].size
        ),
        tableStructure.data[key].parseTo
      );
      parsedResult.data[key] = parsedTableEntry;
      headPosition += tableStructure.data[key].size;
    });
    //<string>Size field required for size calculation
    let ID3v2HeaderSize = 10;
    parsedResult.size =
      <number>parsedResult.data['Size'].payload - ID3v2HeaderSize;
    parsedResult.headPosition = headPosition;
    return parsedResult;
  }
  private frameSearchParse(
    buffer: ArrayBuffer,
    frames: SchemaFrameEntry,
    start: number,
    end: number
  ): parsedSchemaFrameEntry {
    //Alternative frame parser; More reliable, but much slower
    let framesPiece = this.rangeParse(buffer, start, end);
    let textFramesPiece = this.bin2String(framesPiece);
    console.log(textFramesPiece);
    let parsedResult: parsedSchemaFrameEntry = {};
    Object.keys(frames.tags).forEach((frameType) => {
      let tagPos = textFramesPiece.indexOf(frameType);
      if (tagPos !== -1) {
        console.log('tag', frameType, 'found at', start + tagPos);
        let headPosition = start + tagPos;
        let parsedTag: parsedTag = {
          findAt: start + tagPos,
          header: {
            marker: '',
            size: 0,
            flags: [],
          },
          data: {},
        };
        parsedTag.header.marker = this.bin2String(
          this.rangeParse(
            buffer,
            headPosition,
            headPosition + frames.header.marker
          )
        );
        headPosition += frames.header.marker;
        console.log('Frame marker', parsedTag.header.marker);

        parsedTag.header.size = this.calcTagSize(
          this.bin2Base2(
            this.rangeParse(
              buffer,
              headPosition,
              headPosition + frames.header.size
            )
          )
        );
        headPosition += frames.header.size;

        parsedTag.header.flags = [
          ...this.bin2Base2(
            this.rangeParse(
              buffer,
              headPosition,
              headPosition + frames.header.flags
            )
          ),
        ];
        headPosition += frames.header.flags;

        let innerHeadPosition = parsedTag.header.size; //As we now know frame size, we can countdown it
        let frameSchema = frames.tags[parsedTag.header.marker];
        if (frameSchema) {
          Object.keys(frameSchema.data).forEach((subdivision) => {
            let parsedTableEntry = {
              format: 'Bytes',
              payload: <parsedValue>'',
            }; //Initially filled with default values
            switch (frameSchema.data[subdivision].type) {
              case 'defined': {
                parsedTableEntry.format =
                  frameSchema.data[subdivision].parseTo!;
                parsedTableEntry.payload = this.dynamicConvert(
                  this.rangeParse(
                    buffer,
                    headPosition,
                    headPosition + <number>frameSchema.data[subdivision].size
                  ),
                  frameSchema.data[subdivision].parseTo!
                );
                console.log(
                  'defined result',
                  'of subdivision',
                  subdivision,
                  ':',
                  parsedTableEntry
                );
                headPosition += <number>frameSchema.data[subdivision].size;
                innerHeadPosition -= <number>frameSchema.data[subdivision].size;
                break;
              }
              case 'terminated': {
                let terminatedTextInBytes = this.readUntilHexSymbol(
                  buffer,
                  headPosition
                );
                let terminatedText = this.bin2FilteredString(
                  terminatedTextInBytes
                );
                parsedTableEntry.format = dynamicFormat.String;
                parsedTableEntry.payload = terminatedText;
                console.log(
                  'terminated text result',
                  'of subdivision',
                  subdivision,
                  ':',
                  parsedTableEntry
                );
                headPosition += terminatedTextInBytes.length;
                innerHeadPosition -= terminatedTextInBytes.length;
                break;
              }
              case 'table': {
                let headerBytes = this.bin2Base2(
                  this.rangeParse(
                    buffer,
                    headPosition,
                    headPosition +
                      <number>frameSchema.data[subdivision].headerBytes
                  )
                );

                headPosition += <number>(
                  frameSchema.data[subdivision].headerBytes
                );
                innerHeadPosition -= <number>(
                  frameSchema.data[subdivision].headerBytes
                );

                console.log('table header bytes', headerBytes);
                let tableFlags = headerBytes[0];
                headerBytes.shift();
                let tableSize = this.calcTagSize(headerBytes);
                console.log(
                  'calculated table header',
                  tableFlags,
                  'size',
                  tableSize
                );
                parsedTableEntry.format = dynamicFormat.Dynamic;
                parsedTableEntry.payload = this.bin2Hex(
                  this.rangeParse(
                    buffer,
                    headPosition,
                    headPosition + tableSize
                  )
                );

                innerHeadPosition -= tableSize;
                headPosition += tableSize;

                console.log(
                  'table result',
                  'of subdivision',
                  subdivision,
                  ':',
                  parsedTableEntry
                );
                break;
              }

              //Always last - countdown to the end of InnerHeadPosition
              case 'list': {
                while (innerHeadPosition > 0) {
                  let parsedStructure: ListEntry = {};
                  Object.keys(frameSchema.data[subdivision].structure!).forEach(
                    (structureEntry) => {
                      let value: number[] = [];
                      switch (
                        typeof frameSchema.data[subdivision].structure![
                          structureEntry
                        ].size
                      ) {
                        case 'string': {
                          if (
                            (<string>(
                              frameSchema.data[subdivision].structure![
                                structureEntry
                              ].size
                            )).charAt(0) === '%'
                          ) {
                            let sizeReference = (<string>(
                              frameSchema.data[subdivision].structure![
                                structureEntry
                              ].size
                            )).substring(1);
                            let sizeValue =
                              parsedTag.data[sizeReference].payload;
                            let sizeFormat =
                              parsedTag.data[sizeReference].format;
                            if (sizeValue && sizeFormat) {
                              if (sizeFormat === dynamicFormat.Number) {
                                value = this.rangeParse(
                                  buffer,
                                  headPosition,
                                  headPosition + <number>sizeValue
                                );
                                headPosition += <number>sizeValue;
                                innerHeadPosition -= <number>sizeValue;
                                console.log(
                                  'Got referenced size value',
                                  value,
                                  'by reference:',
                                  sizeReference
                                );
                              } else {
                                console.log('Referenced size is not a number');
                                break;
                              }
                            } else {
                              console.log(
                                'Referenced size undefined or not parsed yet'
                              );
                              break;
                            }
                          } else {
                            console.log(
                              'Incorrect size placeholder identifier, skipping'
                            );
                            break;
                          }
                          break;
                        }
                        case 'number': {
                          value = this.rangeParse(
                            buffer,
                            headPosition,
                            headPosition +
                              <number>(
                                frameSchema.data[subdivision].structure![
                                  structureEntry
                                ].size
                              )
                          );
                          innerHeadPosition -= <number>(
                            frameSchema.data[subdivision].structure![
                              structureEntry
                            ].size
                          );
                          headPosition += <number>(
                            frameSchema.data[subdivision].structure![
                              structureEntry
                            ].size
                          );
                          break;
                        }
                        default: {
                          console.log(
                            'Incorrect list structure size reference format, skipping tag with binary dump'
                          );
                          value = this.rangeParse(
                            buffer,
                            headPosition,
                            headPosition + innerHeadPosition
                          );
                          headPosition += innerHeadPosition;
                          innerHeadPosition = 0;
                          break;
                        }
                      }
                      parsedStructure[structureEntry].parseTo =
                        frameSchema.data[subdivision].structure![
                          structureEntry
                        ].parseTo;
                      parsedStructure[structureEntry].value =
                        this.dynamicConvert(
                          value,
                          parsedStructure[structureEntry].parseTo
                        );
                    }
                  );
                  console.log('parsedStructure', parsedStructure);
                  parsedTableEntry.format = dynamicFormat.Dynamic;
                  parsedTableEntry.payload = parsedStructure;
                }
                break;
              }
              case 'textfield': {
                parsedTableEntry.format = dynamicFormat.String;
                parsedTableEntry.payload = this.bin2FilteredString(
                  this.rangeParse(
                    buffer,
                    headPosition,
                    headPosition + innerHeadPosition
                  )
                );
                headPosition += innerHeadPosition;
                console.log(
                  'textfield result',
                  'of subdivision',
                  subdivision,
                  ':',
                  parsedTableEntry
                );
                break;
              }
            }
            parsedTag.data[subdivision] = parsedTableEntry;
          });
          parsedResult[parsedTag.header.marker] = parsedTag;
        } else {
          console.log(
            'Schema named',
            parsedTag.header.marker,
            'not recognized:',
            frameSchema,
            'from',
            frames.tags
          );
        }
      }
    });
    return parsedResult;
  }

  //Util methods
  public filterString(string: string): string {
    return string.replace(/[^\x20-\x7E]/g, '');
  }
  public calcTagSize(sizeBytes: string[]): number {
    //Calculates ID3v2 tag size by 4 size bytes
    let cuttedBytes = sizeBytes.map((sizeByte) => {
      return sizeByte.substring(1);
    }); //cut 1 bit which is always 0
    let result = '';
    cuttedBytes.forEach((cuttedByte) => {
      result = result.concat(cuttedByte);
    });
    console.log('Tag size', result, 'in dec: ', parseInt(result, 2));
    return parseInt(result, 2);
  }
  public checkType(buffer: ArrayBuffer): 'v1' | 'v2' | 'none' {
    //Checking for tag placements
    let v1Tag = this.rangeParse(
      buffer,
      buffer.byteLength - 128,
      buffer.byteLength - 126
    );
    let v2Tag = this.rangeParse(buffer, 0, 3);

    console.log('type', v1Tag, v2Tag);

    if (this.bin2String(v1Tag) === 'TAG') {
      return 'v1';
    }
    if (this.bin2String(v2Tag) === 'ID3') {
      return 'v2';
    }
    return 'none';
  }

  //Util converters
  private dynamicConvert(
    uint8Array: number[],
    parseTo: string
  ): Array<string> | Array<number> | string | number {
    switch (parseTo) {
      case dynamicFormat.Hex: {
        return this.bin2Hex(uint8Array);
      }
      case dynamicFormat.Bytes: {
        return uint8Array;
      }
      case dynamicFormat.Bits: {
        return this.bin2Base2(uint8Array);
      }
      case dynamicFormat.SyncedNumber: {
        return this.calcTagSize(this.bin2Base2(uint8Array));
      }
      case dynamicFormat.String: {
        return this.bin2String(uint8Array);
      }
      case dynamicFormat.FilteredString: {
        return this.bin2FilteredString(uint8Array);
      }
      case dynamicFormat.Number: {
        return this.bin2Number(uint8Array);
      }
      default: {
        console.log('Unknown dynamic parse format requested', parseTo);
        return uint8Array;
      }
    }
  }
  private bin2Base2(uint8Arr: Array<number>): Array<string> {
    return Array.from(uint8Arr, function (byte) {
      let base2value = byte.toString(2);
      //fill rest space with 0 for consistent formatting
      return '0'.repeat(8 - base2value.length).concat(base2value);
    });
  }
  private bin2Hex(uint8Arr: Array<number>): Array<string> {
    return Array.from(uint8Arr, function (byte) {
      return ('0' + (byte & 0xff).toString(16)).slice(-2);
    });
  }
  private bin2String(uint8Arr: Array<number>) {
    var result = '';
    for (var i = 0; i < uint8Arr.length; i++) {
      result += String.fromCharCode(uint8Arr[i]);
    }
    return result;
  }
  private bin2FilteredString(uint8Arr: Array<number>) {
    return this.filterString(this.bin2String(uint8Arr));
  }
  private bin2Number(uint8Arr: Array<number>) {
    let result = '';
    let bits = this.bin2Base2(uint8Arr);
    console.log('bin2Number:', bits);
    for (let i = 0; i < bits.length; i++) {
      result = result.concat(bits[i]);
    }
    console.log('result', result);
    return parseInt(result, 2);
  }
  //Data readers
  private getContents(
    buffer: ArrayBuffer,
    start: number,
    end: number
  ): number[] {
    let resultArr = [];
    let dataView = new DataView(buffer);
    for (let i = start; i < end; i++) {
      resultArr.push(dataView.getUint8(i));
    }
    return resultArr;
  }
  private rangeParse(
    buffer: ArrayBuffer,
    start: number,
    end: number
  ): number[] {
    return this.getContents(buffer, start, end);
  }
  private readUntilHexSymbol(buffer: ArrayBuffer, start: number): number[] {
    let resultArr: number[] = [];
    let dataView = new DataView(buffer);
    let counter = start;
    while (true) {
      let byte = dataView.getUint8(counter);
      let hexByte = ('0' + (byte & 0xff).toString(16)).slice(-2);
      if (hexByte.valueOf() == '00'.valueOf()) {
        console.log('returning terminated string', resultArr);
        return resultArr;
      } else {
        resultArr.push(byte);
      }
      counter++;
    }
  }
}
