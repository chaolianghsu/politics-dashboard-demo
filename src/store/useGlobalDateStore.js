import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { addDays } from 'date-fns'

const useGlobalDateStore = create(
  persist(
    (set) => (
      {
        startDate: addDays(new Date(), -1),
        endDate: addDays(new Date(), -1),
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
