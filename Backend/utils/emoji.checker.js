function contains_emoji(text) {
  if (typeof text !== "string") return false;

  const emoji_regex = /\p{Extended_Pictographic}/u;
  return emoji_regex.test(text);
}

module.exports = { contains_emoji };
