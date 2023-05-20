<script lang="ts">
export default {
  props: {
    title: String
  }
}
</script>

<template>
  <div class="card-item">
    <div>
      <slot></slot>
    </div>
    <div class="card-title">
      <h4>{{ title }}</h4>
    </div>
  </div>
</template>

<style>
.card-item {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.card-title {
  text-align: center;
}
</style>
