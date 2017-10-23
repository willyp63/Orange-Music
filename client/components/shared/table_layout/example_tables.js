const TABLE_TYPES = {
  COWS: 0,
  HORSES: 1,
};

let TABLES = {};
TABLES[TABLE_TYPES.COWS] = {
  label: 'Cows',
  listSchema: COWS_LIST_SCHEMA,
  galleryComponent: CowGalleryComponent,
};
TABLES[TABLE_TYPES.HORSES] = {
  label: 'Horses',
  listSchema: HORSES_LIST_SCHEMA,
  galleryComponent: HorseGalleryComponent,
};
