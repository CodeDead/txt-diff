/**
 * Compute a line-based diff between two texts using a longest common
 * subsequence (LCS) dynamic programming approach. Identical texts and
 * common leading/trailing lines are short-circuited so that time and
 * memory stay proportional to the size of the actual difference.
 * @param textA The original text
 * @param textB The modified text
 * @returns {Array<{type: 'added' | 'removed' | 'unchanged', line: string}>} The ordered diff operations
 */
export const diffLines = (textA, textB) => {
  // Fast path: identical texts produce only unchanged operations
  if (textA === textB) {
    const lines = textA.split('\n');
    if (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();
    return lines.map((line) => ({ type: 'unchanged', line }));
  }

  const a = textA.split('\n');
  const b = textB.split('\n');

  // Strip a single trailing empty line caused by a trailing newline character
  if (a.length > 0 && a[a.length - 1] === '') a.pop();
  if (b.length > 0 && b[b.length - 1] === '') b.pop();

  // Trim common leading and trailing lines so the LCS table only spans
  // the lines that actually differ
  let start = 0;
  while (start < a.length && start < b.length && a[start] === b[start]) {
    start += 1;
  }
  let endA = a.length;
  let endB = b.length;
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA -= 1;
    endB -= 1;
  }

  const midA = a.slice(start, endA);
  const midB = b.slice(start, endB);
  const rows = midA.length;
  const cols = midB.length;

  // table[i][j] = length of the LCS of midA[i..] and midB[j..]
  const table = Array.from({ length: rows + 1 }, () =>
    new Array(cols + 1).fill(0),
  );
  for (let i = rows - 1; i >= 0; i -= 1) {
    for (let j = cols - 1; j >= 0; j -= 1) {
      table[i][j] =
        midA[i] === midB[j]
          ? table[i + 1][j + 1] + 1
          : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }

  const result = [];
  for (let i = 0; i < start; i += 1) {
    result.push({ type: 'unchanged', line: a[i] });
  }

  // Backtrack through the table to build the ordered list of operations
  let i = 0;
  let j = 0;
  while (i < rows && j < cols) {
    if (midA[i] === midB[j]) {
      result.push({ type: 'unchanged', line: midA[i] });
      i += 1;
      j += 1;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      result.push({ type: 'removed', line: midA[i] });
      i += 1;
    } else {
      result.push({ type: 'added', line: midB[j] });
      j += 1;
    }
  }
  while (i < rows) {
    result.push({ type: 'removed', line: midA[i] });
    i += 1;
  }
  while (j < cols) {
    result.push({ type: 'added', line: midB[j] });
    j += 1;
  }

  for (let k = endA; k < a.length; k += 1) {
    result.push({ type: 'unchanged', line: a[k] });
  }

  return result;
};
