import { join } from 'path';
import * as fs2 from 'fs';
import { splitStrByLine } from './RegularUtils';

const fs = require('fs').promises;
const path = require('path');

/**
 * 获取某文件夹下的所有文件（包括子文件夹）
 * @param directoryPath
 */
export async function getAllFiles(directoryPath: string) {
  const ret: string[] = [];
  await _(directoryPath);
  return ret;

  async function _(directoryPath: string) {
    const files: string[] = await fs.readdir(directoryPath);
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
    if (!fs2.existsSync(directoryPath)) {
      fs2.mkdirSync(directoryPath);
    }
    dirIfExist.set(directoryPath, true);
  }
  let uploadPath = directoryPath;
  if (a) {
    const strings = splitStrByLine(a);
    for (const string of strings) {
      uploadPath += `/${string}/`;
      if (!dirIfExist.get(uploadPath)) {
        if (!fs2.existsSync(uploadPath)) {
          fs2.mkdirSync(uploadPath);
        }
        dirIfExist.set(uploadPath, true);
      }
    }
  }
  const filePath = join(uploadPath, fileName);
  fs2.writeFileSync(filePath, fileBuffer);
}
