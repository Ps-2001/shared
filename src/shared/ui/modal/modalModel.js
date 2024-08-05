// modalModel.js
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
    state: () => ({
        isVisible: false,
        data: [],
    }),
    actions: {
        show() {
            this.isVisible = true;
        },
        hide() {
            this.isVisible = false;
        },
        setData() {
            this.data
        }
    },
    getters: {
        isLoading: (state) => state.isVisible,
        isData: (state) => state.data,
    },
})
