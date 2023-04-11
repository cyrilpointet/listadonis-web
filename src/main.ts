import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { plugin, defaultConfig } from '@formkit/vue';
import { generateClasses } from '@formkit/themes';
import { fr } from '@formkit/i18n';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(
  plugin,
  defaultConfig({
    theme: 'genesis',
    locales: { fr },
    locale: 'fr',
    config: {
      classes: generateClasses({
        global: {
          wrapper: '!max-w-full'
        },
        'family:button': {
          input: '!bg-primary'
        },
        form: {
          messages: 'hidden'
        }
      })
    }
  })
);

app.mount('#app');
