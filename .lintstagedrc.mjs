export default {
  "*.{js,ts,tsx,json,html,md}": "prettier --write",
  "*.{js,ts,tsx}": "eslint --quiet",
  "*.{ts,tsx}": "tsc-files --noEmit",
};
