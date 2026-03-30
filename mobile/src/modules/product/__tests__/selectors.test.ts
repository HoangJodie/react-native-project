import { selectPriceUnit, selectSearchTerm } from '../slice';
import type { RootState } from '../../../app/root-reducer';

describe('product selectors', () => {
    const state = {
        productFilters: {
            searchTerm: 'laptop',
            priceUnit: 'dollar',
        },
    } as RootState;

    it('selects search term', () => {
        expect(selectSearchTerm(state)).toBe('laptop');
    });

    it('selects price unit', () => {
        expect(selectPriceUnit(state)).toBe('dollar');
    });
});
