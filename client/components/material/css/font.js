const FONT_TYPES = {
  DISPLAY_4: 0,
  DISPLAY_3: 1,
  DISPLAY_2: 2,
  DISPLAY_1: 3,
  HEADLINE: 4,
  TITLE: 5,
  SUBHEAD_2: 6,
  SUBHEAD_1: 7,
  BODY_2: 8,
  BODY_1: 9,
  CAPTION: 10,
  LABEL: 11,
  MENU: 12,
  BUTTON: 13,
};

const FONTS = {};
FONTS[FONT_TYPES.DISPLAY_4] = {
  size: 112,
  weight: 100,
};
FONTS[FONT_TYPES.DISPLAY_3] = {
  size: 56,
  weight: 300,
};
FONTS[FONT_TYPES.DISPLAY_2] = {
  size: 45,
  weight: 300,
};
FONTS[FONT_TYPES.DISPLAY_1] = {
  size: 34,
  weight: 300,
};
FONTS[FONT_TYPES.HEADLINE] = {
  size: 24,
  weight: 300,
};
FONTS[FONT_TYPES.TITLE] = {
  size: 20,
  weight: 400,
};
FONTS[FONT_TYPES.SUBHEAD_2] = {
  size: 15,
  weight: 400,
};
FONTS[FONT_TYPES.SUBHEAD_1] = {
  size: 15,
  weight: 300,
};
FONTS[FONT_TYPES.BODY_2] = {
  size: 13,
  weight: 400,
};
FONTS[FONT_TYPES.BODY_1] = {
  size: 13,
  weight: 300,
};
FONTS[FONT_TYPES.CAPTION] = {
  size: 12,
  weight: 300,
};
FONTS[FONT_TYPES.LABEL] = {
  size: 12,
  weight: 300,
};
FONTS[FONT_TYPES.MENU] = {
  size: 13,
  weight: 400,
};
FONTS[FONT_TYPES.BUTTON] = {
  size: 14,
  weight: 400,
};

const measureText = (txt, fontType) => {
  const element = document.createElement('canvas');
  const context = element.getContext("2d");
  context.font = `${FONTS[fontType].size}px Roboto`;
  return context.measureText(txt).width;
}

export default { FONT_TYPES, measureText };
