import { makeFakeUserData } from '../../utils/mocks';
import { dataUser, dropUserData } from './user-data';
import { fetchUserDataAction } from '../api-actions';

describe('ReviewsData Slice', () => {

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      userData: null,
    };

    const result = dataUser.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      userData: null,
    };

    const result = dataUser.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  //reviews
  it('should set "userData"', () => {
    const mockUserData = makeFakeUserData();
    const expectedState = {
      userData: mockUserData,
    };

    const result = dataUser.reducer(
      undefined, 
      fetchUserDataAction.fulfilled(
        mockUserData, '',undefined
      ));

    expect(result).toEqual(expectedState);
  });

  it('should drop userData', () => {
    const mockUserData = makeFakeUserData();
    const initialState = {
      userData: mockUserData,
    };

    const expectedState = {
      userData: null,
    };

    const result = dataUser.reducer(initialState, dropUserData);

    expect(result).toEqual(expectedState);
  });
  
})