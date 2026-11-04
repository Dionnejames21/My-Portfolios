import fs from 'fs';

async function run() {
  const res = await fetch("https://abdullah.ghllabs.com/");
  const html = await res.text();
  fs.writeFileSync('page.html', html);
  console.log("Saved page.html, size:", html.length);
}
run();
