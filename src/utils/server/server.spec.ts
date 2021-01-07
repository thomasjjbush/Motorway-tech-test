import { server } from './server';

global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue(':D') });

describe('server', () => {
    const getItemSpy = jest.spyOn(window.localStorage.__proto__, 'getItem');
    const setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should invoke fetch with correct defaulted arguments', async () => {
        await server('endpoint');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:5000/endpoint?limit=10&offset=0');
    });

    it('should invoke fetch with correct provided arguments', async () => {
        await server('endpoint', 30, 60);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:5000/endpoint?limit=30&offset=60');
    });

    it('should store value in localStorage and return value from fetch ', async () => {
        expect(await server('endpoint', 30, 60)).toBe(':D');
        expect(setItemSpy).toHaveBeenCalledTimes(1);
        expect(setItemSpy).toHaveBeenCalledWith('http://localhost:5000/endpoint?limit=30&offset=60', '":D"');
    });

    it('should use existing response from local storage if it exists and not re set', async () => {
        getItemSpy.mockReturnValue(JSON.stringify({ savedResponse: true }));

        expect(await server('endpoint')).toEqual({ savedResponse: true });
        expect(setItemSpy).not.toHaveBeenCalled();
        expect(fetch).not.toHaveBeenCalled();
    });
});
