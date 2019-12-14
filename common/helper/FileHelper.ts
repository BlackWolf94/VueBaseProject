import * as fs from 'fs';
import { dirname, resolve } from 'path';
import rimraf from 'rimraf';
import normalize from 'memory-fs/lib/normalize';

export class FileHelper {

    static readFile(fileName: string, options: string = 'utf8', fileSystem: any = fs): Promise<string> {
        fileName = normalize(fileName);
        return new Promise<string>((resolve) => {
            if (!fileSystem.existsSync(fileName)) {
                resolve(null);
                return;
            }

            fileSystem.readFile(fileName, options, (error: any, contents: string) => {
                if (error) {
                    resolve(null);
                    return;
                }
                resolve(contents);
            });
        });
    }

    static createDir(dirName: string, fileSystem: any = fs): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (fileSystem.existsSync(dirName)) {
                resolve(true);
                return;
            }

            fileSystem.mkdir(dirName, { recursive: true }, (err: any) => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        });
    }

    static writeFile(fileName: string, content: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            await this.createDir(dirname(fileName));
            fs.writeFile(fileName, content, 'utf8', (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(true);
            });
        });
    }

    static removeFile(fileName: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (!fs.existsSync(fileName)) {
                resolve(true);
                return;
            }

            fs.unlink(fileName, (error) => {
                if (error) {
                    resolve(false);
                }
                resolve(true);
            });
        });
    }

    static readDir(folder: string): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            fs.readdir(folder, (error, files) => {
                if (error) {
                    resolve([]);
                }
                resolve(files);
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
        return new Promise((resolve) => {
            rimraf(folder, resolve);
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
