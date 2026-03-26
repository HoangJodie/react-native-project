import { ThunkAction } from 'redux-thunk';
import { RootState } from './root-reducer';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, any>;

