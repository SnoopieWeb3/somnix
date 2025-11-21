interface Token {
  type: string;
  content: string;
}

function tokenize(code: string, language: string): Token[] {
  const tokens: Token[] = [];
  
  // Keywords and patterns for different languages
  const patterns = {
    javascript: {
      keyword: /\b(const|let|var|function|return|import|from|new|async|await|export|default|if|else|for|while)\b/g,
      string: /(["'`])(?:(?=(\\?))\2.)*?\1/g,
      comment: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      number: /\b\d+\.?\d*\b/g,
      function: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g,
      operator: /[+\-*/%=<>!&|^~?:]/g,
      punctuation: /[{}[\]();,.]/g,
    },
    python: {
      keyword: /\b(import|from|def|class|return|if|else|elif|for|while|in|is|not|and|or|with|as|try|except|finally|raise|pass|break|continue|True|False|None)\b/g,
      string: /(["'])(?:(?=(\\?))\2.)*?\1/g,
      comment: /#.*$/gm,
      number: /\b\d+\.?\d*\b/g,
      function: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
      operator: /[+\-*/%=<>!&|^~]/g,
      punctuation: /[{}[\]();,.]/g,
    },
    typescript: {
      keyword: /\b(interface|type|const|let|var|function|return|import|from|new|async|await|export|default|if|else|for|while|extends|implements|public|private|protected)\b/g,
      string: /(["'`])(?:(?=(\\?))\2.)*?\1/g,
      comment: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      number: /\b\d+\.?\d*\b/g,
      function: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g,
      operator: /[+\-*/%=<>!&|^~?:]/g,
      punctuation: /[{}[\]();,.]/g,
    },
  };

  const langPatterns = patterns[language.toLowerCase() as keyof typeof patterns] || patterns.javascript;
  
  let remaining = code;
  const lines = code.split('\n');
  
  return lines.map((line, lineIndex) => ({
    type: 'line',
    content: line,
  }));
}

interface SyntaxHighlighterProps {
  code: string;
  language: string;
}

export function SyntaxHighlighter({ code, language }: SyntaxHighlighterProps) {
  const highlightLine = (line: string) => {
    let result = [];
    let lastIndex = 0;
    
    const patterns = [
      { 
        regex: /(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$)/g, 
        className: 'text-slate-500 italic' 
      },
      { 
        regex: /(["'`])(?:(?=(\\?))\2.)*?\1/g, 
        className: 'text-emerald-400' 
      },
      { 
        regex: /\b(const|let|var|function|return|import|from|new|async|await|export|default|if|else|for|while|interface|type|class|def|True|False|None|extends|implements)\b/g, 
        className: 'text-purple-400' 
      },
      { 
        regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, 
        className: 'text-blue-400',
        captureGroup: 1
      },
      { 
        regex: /\b\d+\.?\d*\b/g, 
        className: 'text-orange-400' 
      },
      { 
        regex: /\b(string|number|boolean|any|void|Date|Array|object)\b/g, 
        className: 'text-cyan-400' 
      },
    ];

    // Create a combined regex to find all matches
    const allMatches: Array<{ index: number; length: number; className: string; text: string }> = [];
    
    patterns.forEach(pattern => {
      let match;
      const regex = new RegExp(pattern.regex);
      while ((match = regex.exec(line)) !== null) {
        const text = pattern.captureGroup ? match[pattern.captureGroup] : match[0];
        const index = pattern.captureGroup ? match.index : match.index;
        allMatches.push({
          index,
          length: match[0].length,
          className: pattern.className,
          text: match[0],
        });
      }
    });

    // Sort matches by index
    allMatches.sort((a, b) => a.index - b.index);

    // Remove overlapping matches
    const nonOverlapping = allMatches.filter((match, i) => {
      if (i === 0) return true;
      return match.index >= allMatches[i - 1].index + allMatches[i - 1].length;
    });

    // Build the highlighted line
    nonOverlapping.forEach((match, i) => {
      if (match.index > lastIndex) {
        result.push(
          <span key={`text-${i}`} className="text-slate-300">
            {line.slice(lastIndex, match.index)}
          </span>
        );
      }
      result.push(
        <span key={`match-${i}`} className={match.className}>
          {match.text}
        </span>
      );
      lastIndex = match.index + match.length;
    });

    if (lastIndex < line.length) {
      result.push(
        <span key="text-end" className="text-slate-300">
          {line.slice(lastIndex)}
        </span>
      );
    }

    return <>{result}</>;
  };

  return (
    <pre className="text-sm leading-relaxed">
      {code.split('\n').map((line, i) => (
        <div key={i} className="table-row">
          <span className="table-cell pr-4 text-right text-slate-600 select-none">
            {i + 1}
          </span>
          <span className="table-cell">
            {line.length > 0 ? highlightLine(line) : <span className="text-slate-300"> </span>}
          </span>
        </div>
      ))}
    </pre>
  );
}
