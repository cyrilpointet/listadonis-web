import { defineStore } from 'pinia';
import { ApiConsumer } from '@/services/ApiConsumer';

interface User {
  id: number;
  email: string;
  bands: UserBand[];
}

interface Band {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  users: Omit<User, 'bands'>;
}

export type UserBand = Omit<Band, 'users'>;

type UserRootState = {
  user: User | null;
  band: Band | null;
};

export const useUserStore = defineStore({
  id: 'user',
  state: () =>
    ({
      user: null,
      band: null
    } as UserRootState),
  getters: {
    isLogged: (state) => state.user !== null
  },
  actions: {
    async refreshUser() {
      const data = (await ApiConsumer.get('/')) as {
        user: User;
      };
      this.user = data.user;
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
    },

    async createBand(name: string) {
      const resp = (await ApiConsumer.post('band', { name })) as { band: UserBand };
      this.user?.bands.push(resp.band);
    },
    async getBand(id: number) {
      const resp = (await ApiConsumer.get(`band/${id}`)) as { band: Band };
      this.band = resp.band;
    },
    async updateBand(name: string) {
      if (!this.band || !this.user) return;
      const resp = (await ApiConsumer.put(`band/${this.band.id}`, { name })) as { band: Band };
      this.band = resp.band;
      const bands = this.user.bands.filter((elem) => {
        return elem.id !== resp.band.id;
      });
      bands.push({
        id: resp.band.id,
        name: resp.band.name,
        created_at: resp.band.created_at,
        updated_at: resp.band.updated_at
      });
      this.user.bands = bands;
    },
    async deleteBand() {
      if (!this.band || !this.user) return;
      await ApiConsumer.delete(`band/${this.band.id}`);
      const bands = this.user.bands.filter((elem) => {
        return elem.id !== this.band.id;
      });
      this.user.bands = bands;
      this.band = null;
    },
    resetBand() {
      this.band = null;
    }
  }
});
