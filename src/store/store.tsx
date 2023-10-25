import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const initialState = {
  menu: {},
};
const useMenuStore = create<any>()(
  devtools(
    persist(
      (set,get) => ({
        ...initialState,

        updateMenu: (menu: any) => {
          const existingMenuData =get().menu
          set(() => ({
            menu: {...existingMenuData ,...menu},
          }));
        },
      }),
      { name: 'columnStore' }
    )
  )
);
export default useMenuStore;
