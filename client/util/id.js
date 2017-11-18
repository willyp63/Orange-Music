/// Consts used for creating fake ids.
const FAKE_ID_PREFIX = 'FAKE_ID_';
const FAKE_ID_LENGTH = 16;
const FAKE_ID_POSSIBLE_CHARS =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

/// Returns a rendomly generated fake id of the form 'FAKE_ID_123abc....'.
const makeFakeId = () => {
  let id = '';
  for (let i = 0; i < FAKE_ID_LENGTH; i++) {
    const j = Math.floor(Math.random() * FAKE_ID_POSSIBLE_CHARS.length);
    id += FAKE_ID_POSSIBLE_CHARS[j];
  }
  return FAKE_ID_PREFIX + id;
}

module.exports = {
	FAKE_ID_PREFIX,
	FAKE_ID_LENGTH,
	FAKE_ID_POSSIBLE_CHARS,
	makeFakeId,
};
