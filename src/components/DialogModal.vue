<script lang="ts">
export default {
  props: {
    isOpen: Boolean
  },
  emits: ['modal-close'],
  methods: {
    onModalClose() {
      this.$emit('modal-close')
    }
  }
}
</script>

<template>
  <Transition>
    <div class="dialog-wrapper" v-if="isOpen" @click="onModalClose()">
      <div class="dialog" @click.stop="">
        <div class="dialog-actions"><button @click="onModalClose()">X</button></div>
        <div class="dialog-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;

  background-color: rgba(0, 0, 0, 0.75);

  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  background-color: var(--color-background-soft);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

.dialog-actions {
  padding: 0 8px;
  height: 32px;
  align-self: flex-end;

  button {
    cursor: pointer;
    background-color: unset;
    color: var(--color-text);
    border: unset;
  }
}

.dialog-content {
  padding: 0 32px 32px 32px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
