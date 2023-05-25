<script lang="ts">
import * as rma from 'rickmortyapi'

export default {
  props: {
    character: {
      type: Object as () => rma.Character,
      required: true
    }
  },
  data() {
    return {
      episodes: [] as rma.Episode[],
      isEpisodeAccordionOpen: false,
      isLoading: false
    }
  },
  methods: {
    toggleEpisodeAccordion() {
      this.isEpisodeAccordionOpen = !this.isEpisodeAccordionOpen
    }
  },
  async mounted() {
    this.isLoading = true
    Promise.all(
      this.character.episode.map((episode) =>
        fetch(episode)
          .then((r) => r.json())
          .catch(() => {
            console.error(`oh no something went wrong fetching ${episode}`)
          })
      )
    ).then((episodes: rma.Episode[]) => {
      this.isLoading = false
      this.episodes = episodes
    })
  }
}
</script>

<template>
  <div>
    <div class="loading" v-if="isLoading">⌛</div>
    <div v-else>
      <div class="character-profile">
        <img :src="character.image" class="character-picture" />
        <table>
          <tr>
            <th>Name</th>
            <td>
              {{ character.name }}
            </td>
          </tr>
          <tr>
            <th>Status</th>
            <td>
              {{ character.status }}
            </td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>
              {{ character.gender }}
            </td>
          </tr>
          <tr>
            <th>Origin</th>
            <td>
              {{ character.origin.name }}
            </td>
          </tr>
          <tr>
            <th>Location</th>
            <td>
              {{ character.location.name }}
            </td>
          </tr>
        </table>
      </div>
      <div class="character-episodes-toggle" @click.stop="toggleEpisodeAccordion()">
        <em>{{ isEpisodeAccordionOpen ? 'Hide' : 'Show' }} episodes</em>
      </div>
      <Transition>
        <ol class="character-episodes" v-if="isEpisodeAccordionOpen">
          <li v-for="episode in episodes" :key="episode.id">
            {{ episode.episode }}: {{ episode.name }}
          </li>
        </ol>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
@keyframes loading-spinner {
  to {
    transform: rotate(360deg);
  }
}
.loading {
  font-size: 64px;
  animation: loading-spinner 1s linear infinite;
}

.character-profile {
  display: block;
}

.character-picture {
  max-width: 30%;
}

.character-episodes-toggle {
  cursor: pointer;
}

.character-episodes {
  overflow-y: scroll;
  max-height: 50vh;
}

th {
  text-align: left;
}

ol {
  list-style-type: none;
  padding: 0;
}

.v-enter-active,
.v-leave-active {
  transition: max-height 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  max-height: 0;
}
</style>
