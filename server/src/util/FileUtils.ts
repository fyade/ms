import * as fs from 'node:fs';
import * as path from 'node:path';
import { splitStrByLine } from './RegularUtils';

/**
 * 获取某文件夹下的所有文件（包括子文件夹）
 * @param directoryPath
 */
export async function getAllFiles(directoryPath: string) {
  const ret: string[] = [];
  await _(directoryPath);
  return ret;

  async function _(directoryPath: string) {
    const files: string[] = fs.readdirSync(directoryPath);
    if (files.length > 0) {
      for (const path of files) {
        if (path.includes('.')) {
          ret.push(`${directoryPath}/${path}`);
        } else {
          await _(`${directoryPath}/${path}`);
        }
      }
    }
  }
}

const dirIfExist = new Map<string, boolean>();

/**
 * 保存文件
 * @param directoryPath
 * @param fileName
 * @param fileBuffer
 * @param a
 */
export function saveFile(directoryPath: string, fileName: string, fileBuffer,
                         {
                           a = '',
                         }: {
                           a?: string
                         } = {},
) {
  if (!dirIfExist.get(directoryPath)) {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }
    dirIfExist.set(directoryPath, true);
  }
  let uploadPath = directoryPath;
  if (a) {
    const strings = splitStrByLine(a);
    for (const string of strings) {
      uploadPath += `/${string}/`;
      if (!dirIfExist.get(uploadPath)) {
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath);
        }
        dirIfExist.set(uploadPath, true);
      }
    }
  }
  const filePath = path.join(uploadPath, fileName);
  fs.writeFileSync(filePath, fileBuffer);
}
