import * as fs from 'fs';
import { dirname, resolve } from 'path';
import rimraf from 'rimraf';
import normalize from 'memory-fs/lib/normalize';

export class FileHelper {

    static readFile(fileName: string, options: string = 'utf8', fileSystem: any = fs): Promise<string> {
        fileName = normalize(fileName);
        return new Promise<string>((res) => {
            if (!fileSystem.existsSync(fileName)) {
                res(null);
                return;
            }

            fileSystem.readFile(fileName, options, (error: any, contents: string) => {
                if (error) {
                    res(null);
                    return;
                }
                res(contents);
            });
        });
    }

    static createDir(dirName: string, fileSystem: any = fs): Promise<boolean> {
        return new Promise<boolean>((res) => {
            if (fileSystem.existsSync(dirName)) {
                res(true);
                return;
            }

            fileSystem.mkdir(dirName, { recursive: true }, (err: any) => {
                if (err) {
                    res(false);
                    return;
                }
                res(true);
            });
        });
    }

    static writeFile(fileName: string, content: string): Promise<boolean> {
        return new Promise<boolean>(async (res, reject) => {
            await this.createDir(dirname(fileName));
            fs.writeFile(fileName, content, 'utf8', (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                res(true);
            });
        });
    }

    static removeFile(fileName: string): Promise<boolean> {
        return new Promise<boolean>((res) => {
            if (!fs.existsSync(fileName)) {
                res(true);
                return;
            }

            fs.unlink(fileName, (error) => {
                if (error) {
                    res(false);
                }
                res(true);
            });
        });
    }

    static readDir(folder: string): Promise<string[]> {
        return new Promise<string[]>((res, reject) => {
            fs.readdir(folder, (error, files) => {
                if (error) {
                    res([]);
                }
                res(files);
            });
        });
    }

    static async scanDir(entry: string ): Promise<string[]> {
        const files: string[] = [];
        const folders = await this.readDir(entry);
        for (const idx in folders) {
            const folder = resolve(process.cwd(), entry, folders[idx]);
            files.push(...await(this.isDir(folder) ?  this.scanDir(folder) : [folder]) );
        }
        return files;
    }

    static removeDir(folder: string): Promise<any> {
        return new Promise((res) => {
            rimraf(folder, res);
        });
    }

    static isDir(path: string): boolean {
        const inf = fs.lstatSync(path);
        return inf.isDirectory();
    }

    static fileInfo(path: string): boolean {
        const inf = fs.lstatSync(path);
        return inf.isDirectory();
    }
}
