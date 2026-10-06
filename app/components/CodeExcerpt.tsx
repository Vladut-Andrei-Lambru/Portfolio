import type { CodeExample } from "@/lib/code-examples";

// Render tokens as text nodes: project code never becomes executable HTML.
function highlight(code: string) {
  const tokens = code.split(/(\/\/[^\n]*|"(?:\\.|[^"\\])*"|\b(?:if|else|for|foreach|return|true|false|null|void|int|float|bool|var|new|out|private|public)\b|\b\d+(?:\.\d+)?f?\b)/g);
  return tokens.map((token, index) => {
    if (!token) return null;
    const kind = token.startsWith("//") ? "comment"
      : token.startsWith('"') ? "string"
      : /^\d/.test(token) ? "number"
      : /^(if|else|for|foreach|return|true|false|null|void|int|float|bool|var|new|out|private|public)$/.test(token) ? "keyword" : undefined;
    return kind ? <span className={`code-${kind}`} key={index}>{token}</span> : token;
  });
}

export default function CodeExcerpt({ example }: { example: CodeExample }) {
  return (
    <article className="code-example">
      <div className="code-example-heading">
        <h3>{example.title}</h3>
        <a href={example.source} target="_blank" rel="noreferrer">View source ↗</a>
      </div>
      <p>{example.explanation}</p>
      <pre tabIndex={0} aria-label={`${example.title}, C# code`}><code>{highlight(example.code)}</code></pre>
    </article>
  );
}
