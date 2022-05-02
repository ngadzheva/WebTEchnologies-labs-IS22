import * as fs from 'fs';

const read = (filename: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (error, data) => {
      let result: string;

      if (error) {
        result = 'Error reading file';
        reject(result);
        return;
      }

      result = data ? data.toString() : '';
      resolve(result);
    });
  });
};

export const readFile = async (filename: string): Promise<string> => {
  return await read(filename);
}

const write = (filename: string, data: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, (error) => {
      let result: string;

      if (error) {
        result = 'Error writing file';
        reject(result);
        return;
      }
      
      result = 'Successfully written file';
      resolve(result);
    });
  });
};

export const writeFile = async (filename: string, data: string): Promise<void> => {
  await write(filename, data);
}


// {
//   read: read,
//   write: write
// }