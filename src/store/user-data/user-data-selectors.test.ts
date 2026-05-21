import { NameSpace } from '../../const';
import { getUserData } from './user-data-selectors';
import { makeFakeUserData } from '../../utils/mocks';

describe('UserProcess selectors', () => {
  const mockFakeUserData = makeFakeUserData();
  const state = {
    [NameSpace.DataUser]: {
      userData: mockFakeUserData,
    }
  };

  it('should return userData from state', () => {
    const { userData } = state[NameSpace.DataUser];
    const result = getUserData(state);
    expect(result).toEqual(userData);
  });

  it('should return userData as null', () => {
    const userData = null;
    const expectedState = {userData};

    const result = getUserData({ [NameSpace.DataUser]: expectedState });
    expect(result).toEqual(userData);
  });

});
