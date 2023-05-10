export const truncate = function (
  fullStr: string,
  strLen: number,
  separator: string
) {
  if (!fullStr) return "";
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || "...";

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return (
    fullStr.slice(0, frontChars) +
    separator +
    fullStr.slice(fullStr.length - backChars)
  );
};
