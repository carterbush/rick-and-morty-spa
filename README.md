## Things that have been done
- Animation
  - Character modal fades in
  - Episode list expands / collapses
  - Loading spinner when opening character modal (disable cache & throttle speed in browser dev tools to see it for longer)
- Responsive design
- API integration
  - Pagination for characters
  - Debounced character search
  - Individual character retrieval
  - Episode retrieval
- Text respects device theme preferences

## Some of many things that have not been done:

- ~~😱 Any loading states~~ Now there are some on the character modals (but not when changing pages or searching)
- ⚠️ Error handling
- ~~⚽ Request debouncing for the search bar~~
- 🧪 UI/Unit testing
- ♿ Any thought about accessibility
- 📕 Pagination buttons should be disabled if there is only one page, or you are on the first/last pages
- 🥍Search/Pagination don't stick to the top/bottom
- 🐘 Character modal can be janky when viewing on a small device with a lot of episodes

## Development

```
npm install
```

```
npm run dev
```
