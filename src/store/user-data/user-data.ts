import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {UserDataType} from '../../types/state';
import {fetchUserDataAction} from '../api-actions';
import { UserData } from '../../types/user-data';

const initialState: UserDataType = {
  userData: null,
};

export const dataUser = createSlice({
  name: NameSpace.DataUser,
  initialState,
  reducers: {
    dropUserData: (state) => {
      state.userData = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserDataAction.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.userData = action.payload;
      });

  }
});

export const {dropUserData} = dataUser.actions;
