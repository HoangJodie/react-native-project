import { resetFilters, setPriceUnit, setSearchTerm, productFilterReducer } from '../slice';
import type { ProductFiltersState } from '../slice';
import type { PriceUnit } from '../type';

const initialState: ProductFiltersState = {
    searchTerm: '',
    priceUnit: undefined,
};

describe('productFilterReducer', () => {
    it('sets search term', () => {
        const result = productFilterReducer(initialState, setSearchTerm('shoes'));
        expect(result.searchTerm).toBe('shoes');
        expect(result.priceUnit).toBeUndefined();
    });

    it('sets price unit', () => {
        const priceUnit: PriceUnit = 'dollar';
        const result = productFilterReducer(initialState, setPriceUnit(priceUnit));
        expect(result.priceUnit).toBe(priceUnit);
    });

    it('resets to initial state', () => {
        const preloaded: ProductFiltersState = { searchTerm: 'abc', priceUnit: 'euro' };
        const result = productFilterReducer(preloaded, resetFilters());
        expect(result).toEqual(initialState);
    });
});
