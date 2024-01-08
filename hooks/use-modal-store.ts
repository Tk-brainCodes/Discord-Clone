import { Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "CreateServer"
  | "invite"
  | "editServer"
  | "manageMembers";

interface ModalData {
  server?: Server;
}

//state props
interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

//modal state
export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
