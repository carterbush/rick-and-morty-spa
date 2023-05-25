<script lang="ts">
import * as rma from 'rickmortyapi'
import CardItem from './CardItem.vue'
import DialogModal from './DialogModal.vue'
import CharacterDetails from './CharacterDetails.vue'
import debounce from '../utilities/debounce'

export default {
  data() {
    return {
      nameFilter: '',
      characters: [] as rma.Character[],
      selectedCharacter: null as rma.Character | null,
      page: 1,
      maxPages: 1
    }
  },
  components: { CardItem, DialogModal, CharacterDetails },
  methods: {
    // This is debounced in created()
    searchForCharacters() {},
    handleModalClose() {
      this.selectedCharacter = null
    },
    async selectCharacter(id: number) {
      // Make a request for a specific character and store the result
      const characterResponse = await rma.getCharacter(id)
      if (characterResponse.status === 200) {
        this.selectedCharacter = characterResponse.data
      } else {
        console.error(
          `Oh no, an error fetching character with id = ${id}: ${characterResponse.statusMessage}`
        )
      }
    }
  },
  created() {
    // This doesn't seem like the best way of doing debouncing, but most resources seemed to suggest something similar.
    this.searchForCharacters = debounce<void>(async () => {
      // Create the filters object
      const filters = {
        ...(this.nameFilter && { name: this.nameFilter }),
        page: this.page
      }

      // Request characters and store to state if successful
      const charactersResponse = await rma.getCharacters(filters)
      if (charactersResponse.status === 200) {
        this.characters = charactersResponse.data.results || []
        this.maxPages = charactersResponse.data.info?.pages || 1
      } else {
        console.error(
          `Oh no, an error fetching the characters: ${charactersResponse.statusMessage}`
        )
      }
    })
  },
  async mounted() {
    this.searchForCharacters()
  },
  watch: {
    nameFilter() {
      // Reset current page when the name filter is changed
      this.page = 1
      this.searchForCharacters()
    },
    page() {
      this.searchForCharacters()
    }
  }
}
</script>

<template>
  <div class="character-list-wrapper">
    <input
      class="character-name-filter"
      v-model="nameFilter"
      placeholder="Search for character by name"
    />
    <ol class="character-list">
      <li
        v-for="character in characters"
        :key="character.id"
        @click="selectCharacter(character.id)"
      >
        <CardItem :title="character.name"
          ><img :src="character.image" class="character-portrait"
        /></CardItem>
      </li>
    </ol>
    <DialogModal @modal-close="handleModalClose()" :isOpen="selectedCharacter !== null">
      <CharacterDetails :character="selectedCharacter!" />
    </DialogModal>
    <div class="pagination-controls">
      <button @click="page > 1 && page--">Prev page</button>
      <div>Page {{ page }}</div>
      <button @click="page < maxPages && page++">Next page</button>
    </div>
  </div>
</template>

<style scoped>
.character-list-wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.character-name-filter {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid grey;
}

.character-list {
  list-style-type: none;
  padding: 0;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.character-list > li {
  cursor: pointer;
  margin: 8px;
  width: 130px;
}

.character-portrait {
  width: 100%;
  height: auto;
}

.pagination-controls {
  display: flex;
  justify-content: space-evenly;
  padding: 8px;
}

.pagination-controls > button {
  cursor: pointer;
  border: none;
  background: none;
}
</style>
