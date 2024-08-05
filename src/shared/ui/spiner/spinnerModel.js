// spinnerModel.js
import { defineStore } from 'pinia'

export const useSpinnerStore = defineStore('spinner', {
    state: () => ({
        isVisible: false,
    }),
    actions: {
        show() {
            this.isVisible = true;
        },
        hide() {
            this.isVisible = false;
        },
    },
    getters: {
        isLoading: (state) => state.isVisible,
    },
})
