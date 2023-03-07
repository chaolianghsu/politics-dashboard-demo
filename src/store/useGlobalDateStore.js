import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useGlobalDateStore = create(
  persist(
    (set) => (
      {
        startDate: new Date(),
        endDate: new Date(),
        update: ({ startDate, endDate }) => set({
          startDate,
          endDate,
        }),
      }
    ),
    {
      name: 'globalDate',
    },
  ),
)

export default useGlobalDateStore
