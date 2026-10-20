import Script from "next/script";

export default function MathJaxLoader() {
  return (
    <>
      <Script
        id="mathjax-config"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `window.MathJax = { tex: { inlineMath: [['$', '$'], ['\\(', '\\)']], displayMath: [['$$', '$$'], ['\\[', '\\]']], processEscapes: true, packages: { '[+]': ['ams', 'color', 'base'] } }, chtml: { fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2' }, startup: { typeset: false }, options: { skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'] } };`,
        }}
      />
      <Script
        id="mathjax-core"
        strategy="lazyOnload"
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
      />
    </>
  );
}
