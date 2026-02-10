
const fs = require('fs');
const readline = require('readline');

async function checkDuplicates(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineNumber = 0;
  // Simple stack to track indentation level -> keys found at this level
  // This is a heuristic parser, assuming standard formatting (4 spaces or 2 spaces)
  // It won't work for minified JSON or weird formatting, but es.json/pt.json are formatted.
  
  const stack = [{ indent: -1, keys: new Set() }];

  for await (const line of rl) {
    lineNumber++;
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Detect key
    const match = line.match(/^(\s*)"([^"]+)":/);
    if (match) {
      const indent = match[1].length;
      const key = match[2];

      // Adjust stack based on indentation
      while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }
      
      if (stack.length === 0 || stack[stack.length - 1].indent < indent) {
        stack.push({ indent: indent, keys: new Set() });
      }

      const currentContext = stack[stack.length - 1];
      
      if (currentContext.indent === indent) {
        if (currentContext.keys.has(key)) {
          console.log(`Duplicate key "${key}" found at line ${lineNumber}. Previous occurrence at this level.`);
        } else {
          currentContext.keys.add(key);
        }
      }
    }
  }
}

checkDuplicates('messages/pt.json');
