import { Image } from '../../../types';
import { serverDomain } from '../../const/const';

export const server = async (endpoint: string, limit = 10, offset = 0): Promise<Image[]> => {
    const url = `${serverDomain}/${endpoint}?limit=${limit}&offset=${offset}`;
    const res = JSON.parse(localStorage.getItem(url)) || (await fetch(url).then((res) => res.json()));

    if (!localStorage.getItem(url)) {
        localStorage.setItem(url, JSON.stringify(res));
    }

    return res;
};
