import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface MenuState {
	isOpen: Boolean;
	isUserOpen: Boolean;
}

const initialState: MenuState = {
	isOpen: false,
	isUserOpen: false,
};

export const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		toggleMenu(state, action) {
			if (state.isOpen) state.isOpen = false;
			else {
				state.isUserOpen = false;
				state.isOpen = true;
			}
		},

		toggleUserMenu(state, action) {
			if (state.isUserOpen) state.isUserOpen = false;
			else {
				state.isOpen = false;
				state.isUserOpen = true;
			}
		},
	},
});

export const selectMenu = (state: RootState) => state.menu;
export const { toggleMenu, toggleUserMenu } = menuSlice.actions;
export default menuSlice.reducer;
