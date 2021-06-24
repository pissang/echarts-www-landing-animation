import { createI18n } from 'vue-i18n';

import App from './App.vue';
import { createApp } from 'vue';

// @ts-ignore
const locale: string = window.ECHARTS_WEBSITE_LANGUAGE;

if (typeof locale === 'undefined') {
  // console.error("Can't find environment variable ECHARTS_WEBSITE_LANGUAGE");
}

const i18n = createI18n({
  locale,
  messages: {}
});

const app = createApp(App);
app.use(i18n);

app.mount('#index-viewport');
