/**
  * Generates and returns a random string.
  *
  * @returns {string} Text - The auto generated ID.
  * @memberof Modal
  */
export default function makeId() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i += 1) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
