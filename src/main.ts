import App from '@/App.vue';
import { router } from '@/router';
import { store } from '@/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import { start } from './services/data-provider';

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');

start(true);
