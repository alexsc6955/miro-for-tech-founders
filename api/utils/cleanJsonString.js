module.exports = function cleanJsonString(jsonString) {
  // remve everything before the first {
  const firstBracket = jsonString.indexOf("{");
  const cleaned = jsonString.slice(firstBracket);

  // remove everything after the last 
  const lastBracket = cleaned.lastIndexOf("}");
  const cleanedAgain = cleaned.slice(0, lastBracket + 1);

  // remove all new lines
  const cleanedJson = cleanedAgain.replace(/\n/g, "");
  return cleanedJson;
}