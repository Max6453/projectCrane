<template>
  <Folder :items="items" :size="3" color="#27FF64" class="my-folder-class top-100 left-170 absolute" />
</template>

<script setup lang="ts">
  import Folder from "@/components/folder.vue";
import type { _RouterLinkI, RouterLinkProps } from "vue-router";

  const items = ["note"];
</script>