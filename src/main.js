import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'

import './css/main.css'
import './main.css'
import BiXdm from "./api/BiXdm";
import HttpClient from "./api/HttpClient";
// import Stream from "./api/Stream";
import KubeContextsResource from "./api/resources/KubeContextsResource";
import KubeObjectsResource from "./api/resources/KubeObjectsResource";
import KubeResourcesResource from "./api/resources/KubeResourcesResource";

const host = `${window.location.host}`;
const protocol = `${window.location.protocol}`;
const wsProtocol = protocol === "https:" ? "wss:" : "ws:";
const httpClient = new HttpClient(`${protocol}//${host}/api/`);

// Init Pinia
const pinia = createPinia()

// Create Vue app
createApp(App).use(router).use(pinia).
use(() => ({
  biXdm: new BiXdm(),
  resKubeContexts: new KubeContextsResource(httpClient),
  resKubeObjects: new KubeObjectsResource(httpClient),
  resKubeResources: new KubeResourcesResource(httpClient),
  // streamProvider: () => new Stream(`${wsProtocol}//${host}/api/stream/v1/`),
})).mount('#app')

// Init main store
const mainStore = useMainStore(pinia)

// Fetch sample data
mainStore.fetchSampleClients()
mainStore.fetchSampleHistory()

// Default title tag
const defaultDocumentTitle = 'Admin Vue 3 Tailwind'

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})
