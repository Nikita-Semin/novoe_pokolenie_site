document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("chaptersMenu").scrollIntoView({ behavior: "smooth" });
});
// эффект рассвета
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = scrollTop / docHeight;
  const mix = (a, b) => Math.round(a + (b - a) * progress);
  const from1 = [249, 250, 251], to1 = [254, 243, 199];
  const from2 = [224, 242, 254], to2 = [252, 211, 77];
  const bg1 = `rgb(${mix(from1[0], to1[0])},${mix(from1[1], to1[1])},${mix(from1[2], to1[2])})`;
  const bg2 = `rgb(${mix(from2[0], to2[0])},${mix(from2[1], to2[1])},${mix(from2[2], to2[2])})`;
  document.body.style.background = `linear-gradient(to bottom, ${bg1}, ${bg2})`;
});
// загрузка списка глав
fetch('chapters_manifest.json')
  .then(r => r.json())
  .then(chapters => {
    const menu = document.getElementById('chaptersMenu');
    chapters.forEach(ch => {
      const btn = document.createElement('button');
      btn.textContent = ch;
      btn.addEventListener('click', () => loadChapter(ch));
      menu.appendChild(btn);
    });
  });
// загрузка главы
function loadChapter(chapter) {
  const path = 'chapters/' + chapter.replaceAll(' ', '_').replaceAll('.', '') + '.html';
  fetch(path).then(r => r.text()).then(html => {
    const book = document.getElementById('bookContent');
    book.innerHTML = html;
    book.scrollIntoView({ behavior: 'smooth' });
  });
}