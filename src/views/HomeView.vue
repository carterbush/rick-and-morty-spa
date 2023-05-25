<script setup lang="ts">
import CharacterList from '../components/CharacterList.vue'
</script>

<template>
  <main>
    <header>
      <h1>In and out</h1>
      <h1>20 minute Vue adventure</h1>
    </header>
    <CharacterList />
  </main>
</template>

<style lang="scss">
header {
  display: flex;
  justify-content: center;
  flex-direction: column;

  h1 {
    color: #08bae3;

    font-size: 32px;
    font-family: 'Get Schwifty';

    text-align: center;
    text-shadow: 0 0 16px #fff765;
    -webkit-text-stroke: 1px black;

    &:last-child {
      margin-left: 0.25em;
    }
  }

  @media (min-width: 800px) {
    flex-direction: row;

    h1 {
      font-size: 48px;
    }
  }
}
</style>
