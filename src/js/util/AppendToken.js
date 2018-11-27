export function appendTrelloKeyToken() {
  const key = process.env.REACT_APP_TRELLO_API_KEY;
  const token = process.env.REACT_APP_TRELLO_TOKEN;

  return `key=${key}&token=${token}`;
}
