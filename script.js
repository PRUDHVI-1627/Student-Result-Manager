const students = {};

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach((t, i) => {
    t.classList.toggle('active', ['add', 'view', 'result'][i] === tab);
  });
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  if (tab === 'view') renderList();
}

function showToast(id, msg, type) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.className = 'toast ' + type + ' show';
  setTimeout(() => el.classList.remove('show'), 2800);
}

function addStudent() {
  const name = document.getElementById('inp-name').value.trim();
  const raw = document.getElementById('inp-marks').value.trim();

  if (!name) {
    showToast('add-toast', 'Please enter a student name.', 'error');
    return;
  }
  if (raw === '' || isNaN(+raw) || +raw < 0 || +raw > 100) {
    showToast('add-toast', 'Enter a valid mark between 0 and 100.', 'error');
    return;
  }

  const isUpdate = students[name] !== undefined;
  students[name] = parseInt(raw);

  document.getElementById('inp-name').value = '';
  document.getElementById('inp-marks').value = '';

  showToast(
    'add-toast',
    isUpdate ? name + ' marks updated.' : name + ' added successfully.',
    'success'
  );
}

function renderList() {
  const ul = document.getElementById('student-list');
  const empty = document.getElementById('empty-msg');
  const keys = Object.keys(students);

  document.getElementById('count-label').textContent =
    keys.length + ' student' + (keys.length !== 1 ? 's' : '') + ' enrolled';

  if (!keys.length) {
    empty.style.display = 'block';
    ul.querySelectorAll('.student-row').forEach(r => r.remove());
    return;
  }

  empty.style.display = 'none';
  ul.querySelectorAll('.student-row').forEach(r => r.remove());

  keys.sort().forEach(name => {
    const m = students[name];
    const pass = m >= 40;
    const li = document.createElement('li');
    li.className = 'student-row';
    li.innerHTML =
      '<span class="s-name">' + name + '</span>' +
      '<span class="s-marks">' + m + ' / 100</span>' +
      '<span class="badge ' + (pass ? 'pass' : 'fail') + '">' + (pass ? 'pass' : 'fail') + '</span>';
    ul.appendChild(li);
  });
}

function checkResult() {
  const name = document.getElementById('inp-search').value.trim();
  const box = document.getElementById('result-box');
  box.classList.remove('show');

  if (!name) {
    showToast('result-toast', 'Please enter a name to search.', 'error');
    return;
  }
  if (students[name] === undefined) {
    showToast('result-toast', '"' + name + '" not found in records.', 'error');
    return;
  }

  const m = students[name];
  const pass = m >= 40;
  document.getElementById('result-name').textContent = name;
  document.getElementById('result-verdict').textContent = pass ? 'Pass' : 'Fail';
  document.getElementById('result-verdict').className = 'result-verdict ' + (pass ? 'pass' : 'fail');
  document.getElementById('result-marks').textContent = 'Marks: ' + m + ' / 100  ·  Passing mark: 40';
  box.classList.add('show');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('inp-marks').addEventListener('keydown', e => {
    if (e.key === 'Enter') addStudent();
  });
  document.getElementById('inp-search').addEventListener('keydown', e => {
    if (e.key === 'Enter') checkResult();
  });
});