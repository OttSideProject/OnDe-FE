import { create } from 'zustand';

type ModalType = 'search' | 'filter';

type ModalStore = {
  activeModal: ModalType | null;
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,
  openModal: (modalType) => set({ activeModal: modalType }),
  closeModal: () => set({ activeModal: null }),
}));
