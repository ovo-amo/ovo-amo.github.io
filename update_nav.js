const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/tmthy/OneDrive/Desktop/ovo-amo.github.io';
const files = [
  'index.html',
  'ross/index.html',
  'timotree/index.html',
  'latin/index.html',
  'primes/index.html',
  'primes/2025/index.html',
  'primes/2026/index.html',
  'primes/jmm2026/index.html',
  'math/old/simp/index.html',
  '404.html'
];

for (const f of files) {
  const fullPath = path.join(dir, f);
  if (!fs.existsSync(fullPath)) {
      console.log('File not found: ' + f);
      continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');

  // Find the relative path to assets
  const scriptRegex = /<script\s+src=\"([^\"]*?)assets\/js\/menubar\.js\"/i;
  const match = content.match(scriptRegex);
  let relativePrefix = match ? match[1] : '';
  
  // If no menubar.js, we can guess relative prefix based on depth, but all these should have it (except 404/math perhaps)
  if (!match) {
      const depth = f.split('/').length - 1;
      relativePrefix = depth === 0 ? '' : '../'.repeat(depth);
  }

  // Replace hardcoded nav with dynamic-nav
  content = content.replace(/<nav class=\"site-nav\">[\s\S]*?<\/nav>/, '<nav class=\"site-nav\">\n                <ul id=\"dynamic-nav\"></ul>\n            </nav>');

  // In index.html, we remove the existing script block for the nav and replace it
  if (f === 'index.html') {
    content = content.replace(/<!-- Scripts -->[\s\S]*?<script>[\s\S]*?<\/script>/, '<!-- Scripts -->\n\t<script src=\"assets/js/nav.js\"></script>');
  } else {
    // Check if nav.js is already included
    if (!content.includes('nav.js')) {
      content = content.replace(/<\/body>/, `    <!-- Scripts -->\n    <script src=\"${relativePrefix}assets/js/nav.js\"></script>\n</body>`);
    }
  }

  fs.writeFileSync(fullPath, content);
  console.log('Updated ' + f);
}
