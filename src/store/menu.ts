import { create } from 'zustand'

// The menu's tab, search words and gluten-free filter
type MenuState = {
  category: string
  query: string
  glutenFreeOnly: boolean
  setCategory: (id: string) => void
  setQuery: (query: string) => void
  toggleGlutenFree: () => void
}

export const useMenu = create<MenuState>()((set) => ({
  category: 'cakes',
  query: '',
  glutenFreeOnly: false,
  setCategory: (id) => set({ category: id, query: '' }),
  setQuery: (query) => set({ query }),
  toggleGlutenFree: () => set((s) => ({ glutenFreeOnly: !s.glutenFreeOnly })),
}))
