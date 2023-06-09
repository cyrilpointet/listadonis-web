import { defineStore } from 'pinia';
import { ApiConsumer } from '@/services/ApiConsumer';

interface User {
  id: number;
  email: string;
  bands: UserBand[];
}

interface Post {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
}

interface Band {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  users: Omit<User, 'bands'>;
  posts: Post[];
}

export type UserBand = Omit<Band, 'users' | 'posts'>;

type UserRootState = {
  user: User | null;
  band: Band | null;
  message: string | null;
};

export const useUserStore = defineStore({
  id: 'user',
  state: () =>
    ({
      user: null,
      band: null,
      message: null
    } as UserRootState),
  getters: {
    isLogged: (state) => state.user !== null
  },
  actions: {
    // Message ----------------------------------------------
    setMessage(message: string) {
      this.message = message;
      setTimeout(() => {
        this.message = null;
      }, 3000);
    },
    // User -------------------------------------------------
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

    // Band -------------------------------------------------
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
    },

    // Members -------------------------------------------------
    async addMember(email: string) {
      if (!this.band || !this.user) return;
      const resp = (await ApiConsumer.post(`band/${this.band.id}/addMember`, {
        email
      })) as { band: Band };
      this.band = resp.band;
    },
    async removeMember(memberId: number) {
      if (!this.band || !this.user) return;
      const resp = (await ApiConsumer.post(`band/${this.band.id}/removeMember`, {
        memberId
      })) as { band: Band };
      if (memberId === this.user.id) {
        const bands = this.user.bands.filter((elem) => {
          return elem.id !== this.band.id;
        });
        this.user.bands = bands;
        this.band = null;
      } else {
        this.band = resp.band;
      }
    },

    // Posts -------------------------------------------------------
    async addPost(title: string) {
      if (!this.band) return;
      const resp = (await ApiConsumer.post(`band/${this.band.id}`, {
        title
      })) as { post: Post };
      const posts = this.band.posts;
      posts.push(resp.post);
      this.band.posts = posts;
    },
    async removePost(postId: number) {
      if (!this.band) return;
      await ApiConsumer.delete(`band/${this.band.id}/${postId}`);
      const posts = this.band.posts;
      this.band.posts = posts.filter((elem) => elem.id !== postId);
    }
  }
});
