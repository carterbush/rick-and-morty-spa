<script setup lang="ts">
import CharacterList from '../components/CharacterList.vue'
</script>

<template>
  <main>
    <header><h1>In and out, 15 minute Vue adventure</h1></header>
    <CharacterList />
  </main>
</template>

<style>
header {
  text-align: center;
  font-family: 'Get Schwifty';
  -webkit-text-stroke: 1px #fff765;
  color: #08bae3;
  font-size: 32px;
}

@media (max-width: 700px) {
  header {
    font-size: 16px;
  }
}
</style>
