import * as fs from 'fs';

export const read = (filename: string): Promise<string> => {
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

export const write = (filename: string, data: string): Promise<string> => {
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


// {
//   read: read,
//   write: write
// }