<script setup>
import { useKubeGraphStore } from "../stores";
// eslint-disable-next-line vue/no-export-in-script-setup
const kubeGraphStore = useKubeGraphStore();
kubeGraphStore.upsertView(false);
  </script>

<template>
  <div class="menu-container">
    <nav class="p-4">
      <div class="font-semibold mb-4 text-xl">
       Ops Form
      </div>
      <ul>
        <li>
          <a
            href="#"
            class="hover:underline"
            @click="toggle"
          >Home</a>
        </li>
        <li>
          <a
            href="#"
            class="hover:underline"
          >About</a>
        </li>
        <li>
          <a
            href="#"
            class="hover:underline"
          >Services</a>
        </li>
        <li>
          <a
            href="#"
            class="hover:underline"
          >Contact</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

  <style scoped>
  .menu-container {
    max-width: 200px;
    margin: 0 auto;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 8px;
  }
  </style>
