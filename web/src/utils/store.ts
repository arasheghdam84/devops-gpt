import { create } from "zustand";
import { UserType } from "../features/constants";
import { Message } from "../features/model";

interface DevOpsStore {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;

  messages: Message[];
  addMessage: (user: UserType, content: string, id: string) => void;

  resetMessages: () => void;
}

const initialState: Pick<DevOpsStore, "isOpen" | "messages"> = {
  isOpen: false,
  messages: [],
};

const useGptStore = create<DevOpsStore>((set) => ({
  ...initialState,
  setIsOpen: (bool) => set({ isOpen: bool }),
  addMessage: (user, content, id) =>
    set((state) => ({
      messages: [...state.messages, { user, content, id }],
    })),
  resetMessages: () => set({ messages: [] }),
}));

export default useGptStore;