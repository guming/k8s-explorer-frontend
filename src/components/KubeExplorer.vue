<script setup>
import { QuestionMarkCircleIcon } from "@heroicons/vue/24/outline";
import { onMounted,computed } from "vue";

import { useDarkModeStore } from '@/stores/darkMode.js'
import { gradientBgDark } from '@/colors.js'

import {
  useAllExplorerStore,
  useKubeWatchStore,
  useRelatedExplorerStore,
  useQuickExplorerStore,
  useWatchedExplorerStore,
  useKubeGraphStore,
} from "../stores";

import KubeExplorerContextItem from "./KubeExplorerContextItem.vue";
import KubeExplorerDropdownMenu from "./KubeExplorerDropdownMenu.vue";
import KubeExplorerExpandableItem from "./KubeExplorerExpandableItem.vue";
import KubeExplorerFilter from "./KubeExplorerFilter.vue";
import SimpleLoader from "./base/SimpleLoader.vue";

const allExlorerStore = useAllExplorerStore();
const relatedExplorerStore = useRelatedExplorerStore();
const quickExplorerStore = useQuickExplorerStore();
const watchedExplorerStore = useWatchedExplorerStore();
const kubeWatchStore = useKubeWatchStore();
const kubeGraphStore = useKubeGraphStore();
kubeGraphStore.upsertView(false);
const stores = [
  allExlorerStore,
  relatedExplorerStore,
  quickExplorerStore,
  watchedExplorerStore,
];

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "f") {
      e.preventDefault();
      e.stopPropagation();

      stores.forEach((store) => {
        if (store.isTreeOpen) {
          store.setFilterExpr("");
        }
      });
    }

    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();

      stores.forEach((store) => {
        if (store.isTreeOpen) {
          store.clearFilterExpr();
        }
      });
    }
  });
});

const colorClass = computed(() => {
  if (useDarkModeStore().isEnabled) {
    return gradientBgDark
  }

  return ''
})
</script>

<template>
  <div class="flex flex-col">
    <KubeExplorerExpandableItem
      :toggle="() => { quickExplorerStore.toggleTree(); quickExplorerStore.isTreeOpen && allExlorerStore.closeTree(); }"
      :is-open="quickExplorerStore.isTreeOpen"
      :scrollable="true"
      class="min-h-[1.8rem]"
      :class="[quickExplorerStore.isTreeOpen ? 'grow-1' : '']"
    >
      <template #title>
        <div class="flex flex-col w-full">
          <div class="flex items-center">
            <span class="font-blod text-sm uppercase" >Quick access</span>
            <div
              class="tooltip tooltip-info tooltip-right z-[60]"
              data-tip="Use this section to access the most commonly used Kubernetes objects. Handy for quickly finding all your Deployments, Pods, Services, and the like."
            >
              <QuestionMarkCircleIcon
                class="h-4 ml-1 stroke-[2.5px] stroke-info w-4"
              />
            </div>

            <KubeExplorerDropdownMenu
              v-if="quickExplorerStore.isTreeOpen"
              class="-mr-[1rem] ml-auto"
              :store="quickExplorerStore"
            />
          </div>
        </div>
      </template>

      <template #subtitle>
        <KubeExplorerFilter
          v-if="quickExplorerStore.isTreeOpen && quickExplorerStore.filterExpr !== null"
          :store="quickExplorerStore"
          class="w-full"
        />
      </template>

      <div class="pl-[0.4rem]">
        <SimpleLoader
          loading-class="ml-3"
          error-class="ml-3"
          :load="() => quickExplorerStore.loadContexts()"
        >
          <div
            v-if="quickExplorerStore.contexts().length === 0"
            class="select-none"
          >
            No contexts found
          </div>
          <ul v-else>
            <li
              v-for="ctx in quickExplorerStore.contexts()"
              :key="ctx.name"
            >
              <KubeExplorerContextItem
                :context="ctx"
                :store="quickExplorerStore"
              />
            </li>
          </ul>
        </SimpleLoader>
      </div>
    </KubeExplorerExpandableItem>

    <KubeExplorerExpandableItem
      :toggle="() => { allExlorerStore.toggleTree(); allExlorerStore.isTreeOpen && quickExplorerStore.closeTree(); }"
      :is-open="allExlorerStore.isTreeOpen"
      :scrollable="true"
      class="border-neutral-content border-t min-h-[1.8rem]"
      :class="[allExlorerStore.isTreeOpen ? 'grow-1' : '']"
    >
      <template #title>
        <span class="font-bold text-sm uppercase">All objects</span>
        <div
          class="tooltip tooltip-info tooltip-right z-[60]"
          data-tip="Use this section to find all Kubernetes objects grouped by the API group and Resource kind. You gotta be a bit of a Kubernetes expert to use this section effectively."
        >
          <QuestionMarkCircleIcon
            class="h-4 ml-1 stroke-[2.5px] stroke-info w-4"
          />
        </div>

        <KubeExplorerDropdownMenu
          v-if="allExlorerStore.isTreeOpen"
          class="-mr-[1rem] ml-auto"
          :store="allExlorerStore"
        />
      </template>

      <template #subtitle>
        <KubeExplorerFilter
          v-if="allExlorerStore.isTreeOpen && allExlorerStore.filterExpr !== null"
          :store="allExlorerStore"
          class="w-full"
        />
      </template>

      <div class="pl-[0.4rem]">
        <SimpleLoader
          loading-class="ml-3"
          error-class="ml-3"
          :load="() => allExlorerStore.loadContexts()"
        >
          <div
            v-if="allExlorerStore.contexts().length === 0"
            class="select-none"
          >
            No contexts found
          </div>
          <ul
            v-else
          >
            <li
              v-for="ctx in allExlorerStore.contexts()"
              :key="ctx.name"
            >
              <KubeExplorerContextItem
                :context="ctx"
                :store="allExlorerStore"
              />
            </li>
          </ul>
        </SimpleLoader>
      </div>
    </KubeExplorerExpandableItem>

    <KubeExplorerExpandableItem
      :toggle="() => relatedExplorerStore.toggleTree()"
      :is-open="relatedExplorerStore.isTreeOpen"
      :scrollable="true"
      class="border-neutral-content border-t"
      :class="[relatedExplorerStore.isTreeOpen ? 'min-h-[200px]' : 'min-h-[1.8rem]']"
    >
      <template #title>
        <span class="font-bold text-sm uppercase">Related objects</span>
        <div
          class="tooltip tooltip-info tooltip-right z-[60]"
          data-tip="Use this section to see objects that are one way or another related to the currently selected object. Handy for getting a quick glance at the application topology."
        >
          <QuestionMarkCircleIcon
            class="h-4 ml-1 stroke-[2.5px] stroke-info w-4"
          />
        </div>

        <KubeExplorerDropdownMenu
          v-if="relatedExplorerStore.isTreeOpen"
          class="-mr-[1rem] ml-auto"
          :store="relatedExplorerStore"
        />
      </template>

      <template #subtitle>
        <KubeExplorerFilter
          v-if="relatedExplorerStore.isTreeOpen && relatedExplorerStore.filterExpr !== null"
          :store="relatedExplorerStore"
          class="w-full"
        />
      </template>

      <div
        v-if="!relatedExplorerStore.target"
        class="mb-4 p-2 select-none text-neutral-content"
      >
        Objects with a <i>relationship</i> to the currently selected object will appear here.
        Try picking an object in the Explorer tree above.
      </div>

      <SimpleLoader
        v-else
        :key="relatedExplorerStore.target.ident"
        loading-class="ml-3"
        error-class="ml-3"
        :load="() => relatedExplorerStore.loadContexts()"
      >
        <div
          v-if="relatedExplorerStore.contexts().length === 0"
          class="select-none"
        >
          No related objects found
        </div>
        <ul v-else>
          <li
            v-for="ctx in relatedExplorerStore.contexts()"
            :key="ctx.name"
          >
            <KubeExplorerContextItem
              :context="ctx"
              :store="relatedExplorerStore"
            />
          </li>
        </ul>
      </SimpleLoader>
    </KubeExplorerExpandableItem>

    <KubeExplorerExpandableItem
      :toggle="() => watchedExplorerStore.toggleTree()"
      :is-open="watchedExplorerStore.isTreeOpen"
      :scrollable="true"
      class="border-neutral-content border-t"
      :class="[watchedExplorerStore.isTreeOpen ? 'min-h-[200px]' : 'min-h-[1.8rem]']"
    >
      <template #title>
        <span class="font-bold text-sm uppercase">Watched objects</span>
        <div
          class="tooltip tooltip-info tooltip-right z-[60]"
          data-tip="Use this section to see all currently watched objects. Handy for keeping an eye on objects that you are interested in."
        >
          <QuestionMarkCircleIcon
            class="h-4 ml-1 stroke-[2.5px] stroke-info w-4"
          />
        </div>

        <KubeExplorerDropdownMenu
          v-if="watchedExplorerStore.isTreeOpen"
          class="-mr-[1rem] ml-auto"
          :store="watchedExplorerStore"
        />
      </template>

      <template #subtitle>
        <KubeExplorerFilter
          v-if="watchedExplorerStore.isTreeOpen && watchedExplorerStore.filterExpr !== null"
          :store="watchedExplorerStore"
          class="w-full"
        />
      </template>

      <div
        v-if="kubeWatchStore.isEmpty"
        class="mb-4 p-2 select-none text-neutral-content"
      >
        Objects explicitly chosen to be <i>watched</i> will appear here. Try clicking
        on the "Watch" icons in the Explorer tree above.
      </div>

      <SimpleLoader
        v-else
        loading-class="ml-3"
        error-class="ml-3"
        :load="() => watchedExplorerStore.loadContexts()"
      >
        <ul>
          <li
            v-for="ctx in watchedExplorerStore.contexts()"
            :key="ctx.name"
          >
            <KubeExplorerContextItem
              :context="ctx"
              :store="watchedExplorerStore"
            />
          </li>
        </ul>
      </SimpleLoader>
    </KubeExplorerExpandableItem>
  </div>
</template>

<!-- <style scoped>
* {
  font-family: -apple-system, "system-ui", sans-serif;
  line-height: 24px;

  @apply text-primary-content;
}
</style> -->
