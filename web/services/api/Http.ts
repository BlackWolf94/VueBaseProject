/**
 * @author Dmytro Zataidukh
 * @created_at 11/14/19
 */

import axios, {AxiosRequestConfig} from 'axios';

const server = process.env.SERVER || 'localhost';
const port = process.env.PORT || '3000';

const url = (path: string) => process.env.NODE_ENV === 'production' ? `${server}/api/${path}` : `${server}:${port}/api/${path}`;

export default class Http {
    public static async post<T, D = any>(path: string, data: D = null, token?: string): Promise<T> {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: token ? `Bearer ${token}` : null,
            },
        };

        try {
            return (await axios.post<T>(`http://${url(path)}`, data, config)).data;
        } catch ({status, message, code, ...other}) {
            throw {status, message, code};
        }
    }

    public static async get<T, D = any>(path: string, data: D = null, token?: string): Promise<T> {
        const config: AxiosRequestConfig = {
            params: data,
            headers: {
                Authorization: token ? `Bearer ${token}` : null,
            },
        };

        try {
            return (await axios.get<T>(`http://${url(path)}`, config)).data;
        } catch ({status, message, code, ...other}) {
            throw {status, message, code};
        }
    }
}
