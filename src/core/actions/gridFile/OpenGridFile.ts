import { GridFileSchema } from './GridFileSchema';
import { Sheet } from '../../gridDB/Sheet';
import { localFiles } from '../../gridDB/localFiles';

const readFileAsync = async (file: File) => {
  // takes a File object and returns it as a string
  return new Promise<string>((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result?.toString() || '');
    };

    reader.onerror = reject;

    reader.readAsText(file, 'UTF-8');
  });
};

const openFileMenuAsync = async () => {
  // opens a input file menu for a single .grid file
  // once a file is selected, the File object is returned
  return new Promise<File>((resolve, reject) => {
    const elem = window.document.createElement('input');
    elem.type = 'file';
    elem.accept = '.grid';
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);

    elem.onchange = () => {
      if (elem && elem.files?.length) {
        const fileToLoad = elem.files[0];
        resolve(fileToLoad);
      } else {
        reject();
      }
    };
  });
};

export const openGridFile = async (sheet: Sheet) => {
  // take file input selection from user
  const fileToLoad = await openFileMenuAsync();
  const result = await readFileAsync(fileToLoad);

  // parse file
  const gridFileJSON = JSON.parse(result) as GridFileSchema;
  sheet.populate(gridFileJSON);
  localFiles.loadedExternalFile(fileToLoad.name, gridFileJSON);
};

export const openLocalGridFile = async (filename: string, sheet: Sheet) => {
  const data = await localFiles.loadLocal(filename);
  if (data) {
    sheet.populate(data);
  }
}
