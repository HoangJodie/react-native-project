import { paramsSerializer } from '../platform/paramsSerializer';

describe('paramsSerializer', () => {
    it('serializes primitives and arrays and skips empty/undefined', () => {
        const qs = paramsSerializer({
            q: 'hello world',
            page: 2,
            empty: '',
            skip: undefined,
            tags: ['a', 'b'],
        });

        expect(qs).toBe('q=hello%20world&page=2&tags=a&tags=b');
    });

    it('returns empty string for empty object', () => {
        expect(paramsSerializer({})).toBe('');
    });

    it('serializes booleans correctly', () => {
        const qs = paramsSerializer({ active: true, featured: false });
        expect(qs).toBe('active=true&featured=false');
    });
});
