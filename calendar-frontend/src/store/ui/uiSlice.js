import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
       isDateModalOpen: false
    },
    reducers: { //*Los reducers
        onOpenDateModal: ( state ) => {
          state.isDateModalOpen = true;
       },
       onCloseDateModal: ( state ) => {
        state.isDateModalOpen = false;
     },
    }
});

//*las acciones que tienen el mismo nombre que los reducers pero no son el mismo
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;