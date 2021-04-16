import * as fs from 'fs';
import * as parse from 'csv-parse';

const processFile = async (filename: string): Promise<string[][]> => {
    const records: string[][] = []
    const parser = fs
        .createReadStream(filename)
        .pipe(parse({
            delimiter: '|'
        }));
    for await (const record of parser) {
      // Work with each record
      records.push(record)
    }
    return records
}

export {
    processFile
}