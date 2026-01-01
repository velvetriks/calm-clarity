let mood = "";

openDB();

function setMood(m) {
  mood = m;
  document.getElementById("moodStatus").textContent = "Mood: " + m;
}

function saveEntry() {
  const now = new Date();

  addEntry({
    date: now.toISOString().slice(0,10),
    time: now.toTimeString().slice(0,5),
    system: system.value,
    focus: focus.value,
    problem: problem.value,
    decision: decision.value,
    risk: risk.value,
    mood
  });

  document.getElementById("status").textContent = "✔ Saved locally (iCloud synced)";
}

async function exportData() {
  const entries = await getAllEntries();
  const blob = new Blob(
    [JSON.stringify({ entries }, null, 2)],
    { type: "application/json" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "calm_clarity_backup.json";
  a.click();
}

async function importData(e) {
  const file = e.target.files[0];
  if (!file) return;

  const text = await file.text();
  const json = JSON.parse(text);

  if (!json.entries) return;

  clearAllEntries();
  json.entries.forEach(addEntry);

  document.getElementById("status").textContent = "✔ Imported successfully";
}