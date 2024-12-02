import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ListItem } from '../api/getListData';

type State = {
  cards: ListItem[];
  visibleCards: ListItem[];
  deletedCards: ListItem[];
  expandedCards: number[];
  showDeleted: boolean;
};

type Actions = {
  setVisibleCards: (cards: ListItem[]) => void;
  deleteCard: (id: number) => void;
  toggleExpand: (id: number) => void;
  revealDeleted: () => void;
  revertCard: (id: number) => void;
  toggleShowDeleted: () => void;
};

export const useCardStore = create(
  persist<State & Actions>(
    (set) => ({
      cards: [],
      visibleCards: [],
      deletedCards: [],
      expandedCards: [],
      showDeleted: false,

      toggleShowDeleted: () =>
        set((state) => ({
          showDeleted: !state.showDeleted,
        })),

      setVisibleCards: (cards) => set(() => ({ visibleCards: cards })),

      deleteCard: (id) =>
        set((state) => {
          const deletedCard = state.cards.find((card) => card.id === id);
          return {
            deletedCards: deletedCard
              ? [...state.deletedCards, deletedCard]
              : state.deletedCards,
            visibleCards: state.visibleCards.filter((card) => card.id !== id),
            expandedCards: state.expandedCards.filter(
              (cardId) => cardId !== id
            ),
          };
        }),

      toggleExpand: (id) =>
        set((state) => ({
          expandedCards: state.expandedCards.includes(id)
            ? state.expandedCards.filter((cardId) => cardId !== id)
            : [...state.expandedCards, id],
        })),

      revealDeleted: () =>
        set((state) => ({
          visibleCards: [...state.visibleCards, ...state.deletedCards],
          deletedCards: [],
        })),

      revertCard: (id) =>
        set((state) => {
          const revertedCard = state.deletedCards.find(
            (card) => card.id === id
          );
          return {
            visibleCards: revertedCard
              ? [...state.visibleCards, revertedCard]
              : state.visibleCards,
            deletedCards: state.deletedCards.filter((card) => card.id !== id),
          };
        }),
    }),
    {
      name: 'card-store',
      partialize: (state) => ({
        ...state,
        deletedCards: state.deletedCards,
        expandedCards: state.expandedCards,
      }),
    }
  )
);

// I moved the file to the store folder because I like keeping my code organized, and it's common to create multiple stores in Zustand for different functionalities.
