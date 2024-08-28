import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const CWD = process.cwd();
const getFile = async (image: string) => {
  try {
    const result = await readFile(join(CWD, "local-s3", image));

    return result;
  } catch (err) {
    return null;
  }
};

const saveFile = async (file: File) => {
  try {
    const path = `image-${Date.now()}-${file.name}.${file.type}`;
    await writeFile(join(CWD, "local-s3", path), file.stream());
    return path;
  } catch (err) {
    return null;
  }
};

export const ImageService = {
  getFile,
  saveFile,
};
