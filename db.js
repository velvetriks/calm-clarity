let db;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("calm-clarity-db", 1);

    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("entries")) {
        db.createObjectStore("entries", {
          keyPath: "id",
          autoIncrement: true
        });
      }
    };

    req.onsuccess = e => {
      db = e.target.result;
      resolve();
    };

    req.onerror = () => reject("DB failed");
  });
}

function addEntry(entry) {
  const tx = db.transaction("entries", "readwrite");
  tx.objectStore("entries").add(entry);
}

function getAllEntries() {
  return new Promise(resolve => {
    const tx = db.transaction("entries", "readonly");
    const req = tx.objectStore("entries").getAll();
    req.onsuccess = () => resolve(req.result);
  });
}

function clearAllEntries() {
  const tx = db.transaction("entries", "readwrite");
  tx.objectStore("entries").clear();
}