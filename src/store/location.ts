import { create } from 'zustand'
import type { StoreId } from '../data/shop'

// Which of the two shops the visitor is looking at.
// The menu, prices and "Order" buttons all follow this choice.
type LocationState = {
  storeId: StoreId
  setStore: (id: StoreId) => void
}

export const useLocation = create<LocationState>()((set) => ({
  storeId: 'fm423',
  setStore: (id) => set({ storeId: id }),
}))
