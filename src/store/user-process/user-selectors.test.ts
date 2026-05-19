import { NameSpace, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus, getAuthCheckedStatus, getUserData } from './user-selectors';
import { makeFakeUserData } from '../../utils/mocks';

describe('UserProcess selectors', () => {
    const mockFakeUserData = makeFakeUserData();
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockFakeUserData,
    }
  };

  it('should return authorizationStatus from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('should return true from state', () => {
    // const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthCheckedStatus(state);
    expect(result).toEqual(true);
  });

  it('should return userData from state', () => {
    const { userData } = state[NameSpace.User];
    const result = getUserData(state);
    expect(result).toBe(userData);
  });
});
