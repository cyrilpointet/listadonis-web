import { defineStore } from 'pinia';
import { ApiConsumer } from '@/services/ApiConsumer';

interface User {
  id: number;
  email: string;
}

type UserRootState = {
  user: User | null;
};

export const useUserStore = defineStore({
  id: 'user',
  state: () =>
    ({
      user: null
    } as UserRootState),
  getters: {
    isLogged: (state) => state.user !== null
  },
  actions: {
    async refreshUser() {
      const data = (await ApiConsumer.get('user')) as {
        user: User;
        token: string;
      };
      this.user = data.user;
      ApiConsumer.setToken(data.token);
    },
    async autoLogin() {
      if (this.user) return;
      try {
        const token = localStorage.getItem('token');
        if (token) {
          ApiConsumer.setToken(token);
          const data = (await ApiConsumer.get('')) as {
            user: User;
          };
          this.user = data.user;
        } else {
          throw new Error('no token');
        }
      } catch (e) {
        this.user = null;
        ApiConsumer.removeToken();
        console.log('coin');
        throw e;
      }
    },
    async login(email: string, password: string) {
      const data = (await ApiConsumer.post('login', {
        email,
        password
      })) as { user: User; token: string };
      this.user = data.user;
      ApiConsumer.setToken(data.token);
    },
    async register(email: string, password: string) {
      const data = (await ApiConsumer.post('register', {
        email,
        password
      })) as { user: User; token: string };
      this.user = data.user;
      ApiConsumer.setToken(data.token);
    },
    async logout() {
      this.user = null;
      ApiConsumer.removeToken();
    }
  }
});
