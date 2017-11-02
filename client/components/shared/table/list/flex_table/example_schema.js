const SCHEMA = Object.freeze({
  image: {
    label: MockImageCell,
    width: 0,
    component: ImageCell
  },
  name: {
    label: 'Title',
    width: 50,
    component: TextCell
  },
  'artist.name': {
    label: 'Artist',
    width: 50,
    component: TextCell
  },
  '@actions': {
    label: MockActionsCell,
    width: 0,
    component: ActionsCell
  }
});
