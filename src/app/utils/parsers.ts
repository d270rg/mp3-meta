//Primitive types
interface ListEntry {
  [key: string]: {
    value: number | string | string[] | number[];
    parseTo: string; //'hex'|'bytes'|'bits'|'syncedNumber'|'string'
  };
}
//--Main headers schema--
interface SchemaEntry {
  size: number; //size in bytes
  data: {
    [title: string]: number;
  };
}
//-parsed-
interface parsedSchemaEntry {
  size: number; //size in bytes
  headPosition: number;
  data: {
    [title: string]: number | string[];
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
  type: string; //'terminated' | 'defined' | 'textfield' | 'table';
  terminator?: string; //for 'terminated'
  size?: number; //for 'defined'
  //for 'table'
  rowSize?: number;
  headerBytes?: number;
  //for 'list'
  structure?: {
    [key: string]: {
      size: number;
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
type parsedFrameTagSubdivision =
  | string
  | string[]
  | number
  | number[]
  | ListEntry;
interface parsedTag {
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
        let parsedFrames = this.frameParse(
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
      parsedResult.data[key] = this.bin2Base2(
        this.rangeParse(
          buffer,
          headPosition,
          headPosition + tableStructure.data[key]
        )
      );
      headPosition += tableStructure.data[key];
    });
    //<string>Size field required for size calculation
    let ID3v2HeaderSize = 10;
    parsedResult.size =
      this.calcTagSize(<string[]>parsedResult.data['Size']) - ID3v2HeaderSize;
    parsedResult.headPosition = headPosition;
    return parsedResult;
  }
  private frameParse(
    buffer: ArrayBuffer,
    frames: SchemaFrameEntry,
    start: number,
    end: number
  ): parsedSchemaFrameEntry {
    let headPosition = start;
    let parsedResult: parsedSchemaFrameEntry = {};

    //Iteration over frames, limited by overall frame section size
    while (headPosition < end) {
      let parsedTag: parsedTag = {
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
          switch (frameSchema.data[subdivision].type) {
            case 'defined': {
              parsedTag.data[subdivision] = this.bin2Hex(
                this.rangeParse(
                  buffer,
                  headPosition,
                  headPosition + <number>frameSchema.data[subdivision].size
                )
              );
              console.log(
                'defined result',
                'of subdivision',
                subdivision,
                ':',
                parsedTag.data[subdivision]
              );
              headPosition += <number>frameSchema.data[subdivision].size;
              innerHeadPosition -= <number>frameSchema.data[subdivision].size;
              return;
            }
            case 'terminated': {
              let terminatedTextInBytes = this.readUntilHexSymbol(
                buffer,
                headPosition
              );
              let terminatedText = this.bin2String(terminatedTextInBytes);
              parsedTag.data[subdivision] = terminatedText;
              console.log(
                'terminated text result',
                'of subdivision',
                subdivision,
                ':',
                parsedTag.data[subdivision]
              );
              headPosition += terminatedTextInBytes.length;
              innerHeadPosition -= terminatedTextInBytes.length;
              return;
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

              headPosition += <number>frameSchema.data[subdivision].headerBytes;
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
              parsedTag.data[subdivision] = this.bin2Hex(
                this.rangeParse(buffer, headPosition, headPosition + tableSize)
              );

              innerHeadPosition -= tableSize;
              headPosition += tableSize;

              console.log(
                'table result',
                'of subdivision',
                subdivision,
                ':',
                parsedTag.data[subdivision]
              );
              return;
            }

            //Always last - countdown to the end of InnerHeadPosition
            case 'list': {
              while (innerHeadPosition > 0) {
                let parsedStructure: ListEntry = {};
                Object.keys(frameSchema.data[subdivision].structure!).forEach(
                  (structureEntry) => {
                    let value = this.rangeParse(
                      buffer,
                      headPosition,
                      headPosition +
                        frameSchema.data[subdivision].structure![structureEntry]
                          .size
                    );
                    parsedStructure[structureEntry].parseTo =
                      frameSchema.data[subdivision].structure![
                        structureEntry
                      ].parseTo;
                    switch (parsedStructure[structureEntry].parseTo) {
                      case 'hex': {
                        parsedStructure[structureEntry].value =
                          this.bin2Hex(value);
                        return;
                      }
                      case 'bytes': {
                        parsedStructure[structureEntry].value = value;
                        return;
                      }
                      case 'bits': {
                        parsedStructure[structureEntry].value =
                          this.bin2Base2(value);
                        return;
                      }
                      case 'syncedNumber': {
                        parsedStructure[structureEntry].value =
                          this.calcTagSize(this.bin2Base2(value));
                        return;
                      }
                      case 'string': {
                        parsedStructure[structureEntry].value =
                          this.bin2String(value);
                        return;
                      }
                      default: {
                        parsedStructure[structureEntry].value = value;
                      }
                    }
                  }
                );
                console.log('parsedStructure', parsedStructure);
                parsedTag.data[subdivision] = parsedStructure;
              }
              return;
            }
            case 'textfield': {
              parsedTag.data[subdivision] = this.bin2String(
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
                parsedTag.data[subdivision]
              );
              return;
            }
          }
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
    console.log('final parsed result', parsedResult);
    return parsedResult;
  }

  //Util methods
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
  private bin2Base2(array: Array<number>): Array<string> {
    return Array.from(array, function (byte) {
      let base2value = byte.toString(2);
      //fill rest space with 0 for consistent formatting
      return '0'.repeat(8 - base2value.length).concat(base2value);
    });
  }
  private bin2Hex(byteArray: Array<number>): Array<string> {
    return Array.from(byteArray, function (byte) {
      return ('0' + (byte & 0xff).toString(16)).slice(-2);
    });
  }
  private bin2String(array: Array<number>) {
    var result = '';
    for (var i = 0; i < array.length; i++) {
      result += String.fromCharCode(array[i]);
    }
    return result;
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
