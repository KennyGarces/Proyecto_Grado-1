import { immer } from 'zustand/middleware/immer'
import { create } from '@/app/hooks/store-creator'
import { UserActions, UserState } from '@/app/lib/definitions'

const initialState: UserState = {
  user: null,
}

export const useUser = create<UserState & UserActions>()(
  immer(set => ({
    ...initialState,
    setUser: user => {
      set(state => {
        state.user = user
      })
    },
    clearUser: () => {
      set(() => initialState)
    },
  }))
)
