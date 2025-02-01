// // Ersetze die URL durch die URL deiner Cloud Function
// const analyticsUrl = "https://analytics-yi34fule4q-uc.a.run.app";




// // Funktion zum Anzeigen der Daten
// function displayAnalyticsData(data) {
//   const container = document.getElementById("analyticsData");
//     if (!container) {
//     console.error("Container für Analytics-Daten nicht gefunden.");
//     return;
//     }
//   // Beispielhafte Darstellung: Wir nehmen an, dass die Daten eine Liste von Zeilen enthalten.
//   let html = "<ul>";

//   // Überprüfe, ob Berichte und Zeilen vorhanden sind
//   if (data.reports && data.reports[0] && data.reports[0].data.rows) {
//     data.reports[0].data.rows.forEach((row) => {
//       // Annahme: row.dimensions[0] enthält das Datum,
//       // row.metrics[0].values[0] die Seitenaufrufe.
//       const datum = row.dimensions[0];
//       const seitenaufrufe = row.metrics[0].values[0];
//       html += `<li>Datum: ${datum} – Seitenaufrufe: ${seitenaufrufe}</li>`;
//     });
//   } else {
//     html += "<li>Keine Daten verfügbar.</li>";
//   }
//   html += "</ul>";

//   container.innerHTML = html;
// }

// // Daten von der Cloud Function abrufen
// fetch(analyticsUrl)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Netzwerkantwort war nicht ok");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log("Empfangene Analytics-Daten:", data);
//     displayAnalyticsData(data);
//   })
//   .catch((error) => {
//     console.error("Fehler beim Abrufen der Analytics-Daten:", error);
//     document.getElementById("analyticsData").textContent =
//       "Fehler beim Laden der Analytics-Daten.";
//   });

// // Ersetze die URL durch die URL deiner Cloud Function
// const analyticsUrl = "https://analytics-yi34fule4q-uc.a.run.app";

// /**
//  * Ruft Analytics-Daten von der Cloud Function ab.
//  * @param {string} url - Die URL der Cloud Function.
//  * @returns {Promise<Object>} - Das abgerufene JSON-Objekt.
//  */
// async function fetchAnalyticsData(url) {
//     const response = await fetch(url);
//     if (!response.ok) {
//         throw new Error("Netzwerkantwort war nicht ok");
//     }
//     return response.json();
// }

// /**
//  * Verarbeitet das empfangene Analytics-JSON.
//  * Hier passt du die Verarbeitung an die Struktur deiner API-Antwort an.
//  * @param {Object} data - Die rohen Analytics-Daten.
//  * @returns {Array} - Ein Array von Objekten, z. B. [{ date: "2025-01-25", count: "42" }, ...].
//  */
// function processAnalyticsData(data) {
//     // Beispiel: Wir gehen davon aus, dass die Daten folgendermaßen aufgebaut sind:
//     // data.rows: Array von Zeilen, jede Zeile hat:
//     //   - row.dimensionValues[0].value als Datum
//     //   - row.metricValues[0].value als Klick- oder Seitenaufruf-Zähler
//     if (data.rows && data.rows.length > 0) {
//         return data.rows.map(row => ({
//             date: row.dimensionValues && row.dimensionValues[0]
//                 ? row.dimensionValues[0].value
//                 : "Unbekannt",
//             count: row.metricValues && row.metricValues[0]
//                 ? row.metricValues[0].value
//                 : "0"
//         }));
//     }
//     return [];
// }

// /**
//  * Zeigt die verarbeiteten Analytics-Daten im Container an.
//  * @param {Array} dataArray - Das Array der verarbeiteten Daten.
//  */
// function displayAnalyticsData(dataArray) {
//     const container = document.getElementById("analyticsData");
//     if (!container) {
//         console.error("Container für Analytics-Daten nicht gefunden.");
//         return;
//     }

//     let html = "<ul>";
//     if (dataArray.length > 0) {
//         dataArray.forEach(item => {
//             html += `<li>Datum: ${item.date} – Klicks/Seitenaufrufe: ${item.count}</li>`;
//         });
//     } else {
//         html += "<li>Keine Daten verfügbar.</li>";
//     }
//     html += "</ul>";
//     container.innerHTML = html;
// }

// /**
//  * Behandelt Fehler beim Abrufen der Analytics-Daten.
//  * @param {Error} error - Der Fehler, der aufgetreten ist.
//  */
// function handleAnalyticsError(error) {
//     console.error("Fehler beim Abrufen der Analytics-Daten:", error);
//     const container = document.getElementById("analyticsData");
//     if (container) {
//         container.textContent = "Fehler beim Laden der Analytics-Daten.";
//     }
// }

// /**
//  * Hauptfunktion, die alle Schritte zusammenführt:
//  * Daten abrufen, verarbeiten und anzeigen.
//  */
// async function initAnalytics() {
//     try {
//         const data = await fetchAnalyticsData(analyticsUrl);
//         console.log("Empfangene Analytics-Daten:", data);
//         const processedData = processAnalyticsData(data);
//         displayAnalyticsData(processedData);
//     } catch (error) {
//         handleAnalyticsError(error);
//     }
// }

// // Starte die Analytics-Abfrage, wenn das DOM vollständig geladen ist.
// document.addEventListener("DOMContentLoaded", initAnalytics);

// // URL deiner Cloud Function (welche den GA4 Report liefert)
// const analyticsUrl = "https://analytics-yi34fule4q-uc.a.run.app";

// /**
//  * Ruft Analytics-Daten von der Cloud Function ab.
//  * @param {string} url - Die URL der Cloud Function.
//  * @returns {Promise<Object>} - Das abgerufene JSON-Objekt.
//  */
// async function fetchAnalyticsData(url) {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error("Netzwerkantwort war nicht ok");
//   }
//   return response.json();
// }

// /**
//  * Verarbeitet das empfangene Analytics-JSON.
//  * Hier passt du die Verarbeitung an die Struktur deiner API-Antwort an.
//  * @param {Object} data - Die rohen Analytics-Daten.
//  * @returns {Array} - Ein Array von Objekten, z. B. [{ date: "2025-01-25", count: "42" }, ...].
//  */
// function processAnalyticsData(data) {
//   // Beispiel: Wir gehen davon aus, dass data.rows ein Array von Zeilen ist,
//   // wobei jede Zeile ein Objekt enthält:
//   //   - row.dimensionValues[0].value als Datum,
//   //   - row.metricValues[0].value als Zähler (z. B. Seitenaufrufe).
//   if (data.rows && data.rows.length > 0) {
//     return data.rows.map(row => ({
//       date: row.dimensionValues && row.dimensionValues[0]
//         ? row.dimensionValues[0].value
//         : "Unbekannt",
//       count: row.metricValues && row.metricValues[0]
//         ? row.metricValues[0].value
//         : "0"
//     }));
//   }
//   return [];
// }

// /**
//  * Zeigt die verarbeiteten Analytics-Daten im Container an.
//  * @param {Array} dataArray - Das Array der verarbeiteten Daten.
//  */
// function displayAnalyticsData(dataArray) {
//   const container = document.getElementById("analyticsData");
//   if (!container) {
//     console.error("Container für Analytics-Daten nicht gefunden.");
//     return;
//   }

//   let html = "<ul>";
//   if (dataArray.length > 0) {
//     dataArray.forEach(item => {
//       html += `<li>Datum: ${item.date} – Klicks/Seitenaufrufe: ${item.count}</li>`;
//     });
//   } else {
//     html += "<li>Keine Daten verfügbar.</li>";
//   }
//   html += "</ul>";
//   container.innerHTML = html;
// }

// /**
//  * Behandelt Fehler beim Abrufen der Analytics-Daten.
//  * @param {Error} error - Der aufgetretene Fehler.
//  */
// function handleAnalyticsError(error) {
//   console.error("Fehler beim Abrufen der Analytics-Daten:", error);
//   const container = document.getElementById("analyticsData");
//   if (container) {
//     container.textContent = "Fehler beim Laden der Analytics-Daten.";
//   }
// }

// /**
//  * Hauptfunktion für den regulären Report (z. B. Gesamtzahlen).
//  */
// async function initAnalytics() {
//   try {
//     const data = await fetchAnalyticsData(analyticsUrl);
//     console.log("Empfangene Analytics-Daten:", data);
//     const processedData = processAnalyticsData(data);
//     displayAnalyticsData(processedData);
//   } catch (error) {
//     handleAnalyticsError(error);
//   }
// }

// /* --- Funktionalität für Test-Events --- */

// /**
//  * Extrahiert aus den abgerufenen Daten die Test-Event-Daten.
//  * Wir gehen davon aus, dass eine Zeile den Test-Event enthält,
//  * d.h. row.dimensionValues[0].value === "test_click".
//  * @param {Object} data - Das Analytics-JSON.
//  * @returns {Object|null} - Ein Objekt wie { eventName: "test_click", count: "42" } oder null, wenn nicht gefunden.
//  */
// function processTestAnalyticsData(data) {
//   if (data.rows && data.rows.length > 0) {
//     // Suchen nach einer Zeile, bei der das Test-Event ausgelöst wurde.
//     const testRow = data.rows.find(row => {
//       return row.dimensionValues &&
//              row.dimensionValues[0] &&
//              row.dimensionValues[0].value === "test_click";
//     });
//     if (testRow && testRow.metricValues && testRow.metricValues[0]) {
//       return {
//         eventName: "test_click",
//         count: testRow.metricValues[0].value
//       };
//     }
//   }
//   return null;
// }

// /**
//  * Zeigt die Test-Event-Daten in einem separaten Container an.
//  * @param {Object|null} testData - Das verarbeitete Test-Event-Objekt.
//  */
// function displayTestAnalyticsData(testData) {
//   const container = document.getElementById("analyticsTestData");
//   if (!container) {
//     console.error("Container für Test Analytics-Daten nicht gefunden.");
//     return;
//   }
//   if (testData) {
//     container.textContent = `Test-Event 'test_click' wurde ${testData.count} mal ausgelöst.`;
//   } else {
//     container.textContent = "Keine Test-Daten verfügbar.";
//   }
// }

// /**
//  * Initialisiert den Test-Event-Report.
//  * Diese Funktion ruft denselben Report ab und extrahiert speziell die Test-Event-Daten.
//  */
// async function initTestAnalytics() {
//   try {
//     const data = await fetchAnalyticsData(analyticsUrl);
//     console.log("Empfangene Test Analytics-Daten:", data);
//     const testData = processTestAnalyticsData(data);
//     displayTestAnalyticsData(testData);
//   } catch (error) {
//     console.error("Fehler beim Abrufen der Test Analytics-Daten:", error);
//     const container = document.getElementById("analyticsTestData");
//     if (container) {
//       container.textContent = "Fehler beim Laden der Test Analytics-Daten.";
//     }
//   }
// }

// /**
//  * Exportiere die Funktion zum Abrufen der Test-Daten als globale Funktion,
//  * damit sie z. B. von Alpine.js oder direkt im HTML-Attribut aufgerufen werden kann.
//  */
// window.initTestAnalytics = initTestAnalytics;

// // Starte den regulären Report, wenn das DOM vollständig geladen ist.
// document.addEventListener("DOMContentLoaded", initAnalytics);


// // URL deiner Cloud Function (welche den GA4 Report liefert)
// const analyticsUrl = "https://analytics-yi34fule4q-uc.a.run.app";

// /**
//  * Ruft Analytics-Daten von der Cloud Function ab.
//  * @param {string} url - Die URL der Cloud Function.
//  * @returns {Promise<Object>} - Das abgerufene JSON-Objekt.
//  */
// async function fetchAnalyticsData(url) {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error("Netzwerkantwort war nicht ok");
//   }
//   return response.json();
// }

// /**
//  * Verarbeitet das empfangene Analytics-JSON.
//  * Hier passt du die Verarbeitung an die Struktur deiner API-Antwort an.
//  * @param {Object} data - Die rohen Analytics-Daten.
//  * @returns {Array} - Ein Array von Objekten, z. B. [{ date: "2025-01-25", count: "42" }, ...].
//  */
// function processAnalyticsData(data) {
//   // Beispiel: Wir gehen davon aus, dass data.rows ein Array von Zeilen ist,
//   // wobei jede Zeile ein Objekt enthält:
//   //   - row.dimensionValues[0].value als Datum,
//   //   - row.metricValues[0].value als Zähler (z. B. Seitenaufrufe).
//   if (data.rows && data.rows.length > 0) {
//     return data.rows.map(row => ({
//       date: row.dimensionValues && row.dimensionValues[0]
//         ? row.dimensionValues[0].value
//         : "Unbekannt",
//       count: row.metricValues && row.metricValues[0]
//         ? row.metricValues[0].value
//         : "0"
//     }));
//   }
//   return [];
// }

// /**
//  * Zeigt die verarbeiteten Analytics-Daten im Container an.
//  * @param {Array} dataArray - Das Array der verarbeiteten Daten.
//  */
// function displayAnalyticsData(dataArray) {
//   const container = document.getElementById("analyticsData");
//   if (!container) {
//     console.error("Container für Analytics-Daten nicht gefunden.");
//     return;
//   }
  
//   let html = "<ul>";
//   if (dataArray.length > 0) {
//     dataArray.forEach(item => {
//       html += `<li>Datum: ${item.date} – Klicks/Seitenaufrufe: ${item.count}</li>`;
//     });
//   } else {
//     html += "<li>Keine Daten verfügbar.</li>";
//   }
//   html += "</ul>";
//   container.innerHTML = html;
// }

// /**
//  * Behandelt Fehler beim Abrufen der Analytics-Daten.
//  * @param {Error} error - Der aufgetretene Fehler.
//  */
// function handleAnalyticsError(error) {
//   console.error("Fehler beim Abrufen der Analytics-Daten:", error);
//   const container = document.getElementById("analyticsData");
//   if (container) {
//     container.textContent = "Fehler beim Laden der Analytics-Daten.";
//   }
// }

// /**
//  * Hauptfunktion für den regulären Report (z. B. Gesamtzahlen).
//  */
// async function initAnalytics() {
//   try {
//     const data = await fetchAnalyticsData(analyticsUrl);
//     console.log("Empfangene Analytics-Daten:", data);
//     const processedData = processAnalyticsData(data);
//     displayAnalyticsData(processedData);
//   } catch (error) {
//     handleAnalyticsError(error);
//   }
// }

// /* --- Funktionalität für Test-Events --- */

// /**
//  * Extrahiert aus den abgerufenen Daten die Test-Event-Daten.
//  * Wir gehen davon aus, dass eine Zeile den Test-Event enthält,
//  * d.h. row.dimensionValues[0].value === "test_click".
//  * @param {Object} data - Das Analytics-JSON.
//  * @returns {Object|null} - Ein Objekt wie { eventName: "test_click", count: "42" } oder null, wenn nicht gefunden.
//  */
// function processTestAnalyticsData(data) {
//   if (data.rows && data.rows.length > 0) {
//     // Suchen nach einer Zeile, in der das Test-Event "test_click" erfasst wurde
//     const testRow = data.rows.find(row => {
//       return row.dimensionValues &&
//              row.dimensionValues[0] &&
//              row.dimensionValues[0].value === "test_click";
//     });
//     if (testRow && testRow.metricValues && testRow.metricValues[0]) {
//       return {
//         eventName: "test_click",
//         count: testRow.metricValues[0].value
//       };
//     }
//   }
//   return null;
// }

// /**
//  * Zeigt die Test-Event-Daten in einem separaten Container an.
//  * @param {Object|null} testData - Das verarbeitete Test-Event-Objekt.
//  */
// function displayTestAnalyticsData(testData) {
//   const container = document.getElementById("analyticsTestData");
//   if (!container) {
//     console.error("Container für Test Analytics-Daten nicht gefunden.");
//     return;
//   }
//   if (testData) {
//     container.textContent = `Test-Event "test_click" wurde ${testData.count} mal ausgelöst.`;
//   } else {
//     container.textContent = "Keine Test-Daten verfügbar.";
//   }
// }

// /**
//  * Initialisiert den Test-Event-Report.
//  * Diese Funktion ruft denselben Report ab und extrahiert speziell die Test-Event-Daten.
//  */
// async function initTestAnalytics() {
//   try {
//     const data = await fetchAnalyticsData(analyticsUrl);
//     console.log("Empfangene Test Analytics-Daten:", data);
//     const testData = processTestAnalyticsData(data);
//     displayTestAnalyticsData(testData);
//   } catch (error) {
//     console.error("Fehler beim Abrufen der Test Analytics-Daten:", error);
//     const container = document.getElementById("analyticsTestData");
//     if (container) {
//       container.textContent = "Fehler beim Laden der Test Analytics-Daten.";
//     }
//   }
// }

// /**
//  * Exportiere die Funktion zum Abrufen der Test-Daten als globale Funktion,
//  * damit sie z. B. von Alpine.js oder direkt im HTML-Attribut aufgerufen werden kann.
//  */
// window.initTestAnalytics = initTestAnalytics;

// // Starte den regulären Report, wenn das DOM vollständig geladen ist.
// document.addEventListener("DOMContentLoaded", initAnalytics);



// URL deiner Cloud Function (welche den GA4 Report liefert)
const analyticsUrl = "https://analytics-yi34fule4q-uc.a.run.app";

/**
 * Ruft Analytics-Daten von der Cloud Function ab.
 * @param {string} url - Die URL der Cloud Function.
 * @returns {Promise<Object>} - Das abgerufene JSON-Objekt.
 */
async function fetchAnalyticsData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Netzwerkantwort war nicht ok");
  }
  return response.json();
}

/**
 * Verarbeitet das empfangene Analytics-JSON.
 * Hier passt du die Verarbeitung an die Struktur deiner API-Antwort an.
 * @param {Object} data - Die rohen Analytics-Daten.
 * @returns {Array} - Ein Array von Objekten, z. B. [{ date: "2025-01-25", count: "42" }, ...].
 */
function processAnalyticsData(data) {
  // Wir gehen davon aus, dass data.rows ein Array von Zeilen ist,
  // wobei jede Zeile folgende Struktur hat:
  //   - row.dimensionValues[0].value als Datum,
  //   - row.metricValues[0].value als Zähler (z. B. Seitenaufrufe).
  if (data.rows && data.rows.length > 0) {
    return data.rows.map(row => ({
      date: row.dimensionValues && row.dimensionValues[0]
        ? row.dimensionValues[0].value
        : "Unbekannt",
      count: row.metricValues && row.metricValues[0]
        ? row.metricValues[0].value
        : "0"
    }));
  }
  return [];
}

/**
 * Zeigt die verarbeiteten Analytics-Daten im Container an.
 * @param {Array} dataArray - Das Array der verarbeiteten Daten.
 */
function displayAnalyticsData(dataArray) {
  const container = document.getElementById("analyticsData");
  if (!container) {
    console.error("Container für Analytics-Daten nicht gefunden.");
    return;
  }
  
  let html = "<ul>";
  if (dataArray.length > 0) {
    dataArray.forEach(item => {
      html += `<li>Datum: ${item.date} – Klicks/Seitenaufrufe: ${item.count}</li>`;
    });
  } else {
    html += "<li>Keine Daten verfügbar.</li>";
  }
  html += "</ul>";
  container.innerHTML = html;
}

/**
 * Behandelt Fehler beim Abrufen der Analytics-Daten.
 * @param {Error} error - Der aufgetretene Fehler.
 */
function handleAnalyticsError(error) {
  console.error("Fehler beim Abrufen der Analytics-Daten:", error);
  const container = document.getElementById("analyticsData");
  if (container) {
    container.textContent = "Fehler beim Laden der Analytics-Daten.";
  }
}

/**
 * Hauptfunktion für den regulären Report (z. B. Gesamtzahlen).
 */
async function initAnalytics() {
  try {
    const data = await fetchAnalyticsData(analyticsUrl);
    console.log("Empfangene Analytics-Daten:", data);
    const processedData = processAnalyticsData(data);
    displayAnalyticsData(processedData);
  } catch (error) {
    handleAnalyticsError(error);
  }
}

/* --- Funktionalität für Test-Events --- */

/**
 * Extrahiert aus den abgerufenen Daten die Test-Event-Daten.
 * Wir gehen davon aus, dass eine Zeile den Test-Event enthält,
 * d.h. row.dimensionValues[0].value === "test_click".
 * @param {Object} data - Das Analytics-JSON.
 * @returns {Object|null} - Ein Objekt wie { eventName: "test_click", count: "42" } oder null, wenn nicht gefunden.
 */
function processTestAnalyticsData(data) {
  if (data.rows && data.rows.length > 0) {
    // Suche nach einer Zeile, in der das Test-Event "test_click" erfasst wurde
    const testRow = data.rows.find(row => {
      return row.dimensionValues &&
             row.dimensionValues[0] &&
             row.dimensionValues[0].value === "test_click";
    });
    if (testRow && testRow.metricValues && testRow.metricValues[0]) {
      return {
        eventName: "test_click",
        count: testRow.metricValues[0].value
      };
    }
  }
  return null;
}

/**
 * Zeigt die Test-Event-Daten in einem separaten Container an.
 * @param {Object|null} testData - Das verarbeitete Test-Event-Objekt.
 */
function displayTestAnalyticsData(testData) {
  const container = document.getElementById("analyticsTestData");
  if (!container) {
    console.error("Container für Test Analytics-Daten nicht gefunden.");
    return;
  }
  if (testData) {
    container.textContent = `Test-Event "test_click" wurde ${testData.count} mal ausgelöst.`;
  } else {
    container.textContent = "Keine Test-Daten verfügbar.";
  }
}

/**
 * Initialisiert den Test-Event-Report.
 * Diese Funktion ruft denselben Report ab und extrahiert speziell die Test-Event-Daten.
 */
async function initTestAnalytics() {
  try {
    const data = await fetchAnalyticsData(analyticsUrl);
    console.log("Empfangene Test Analytics-Daten:", data);
    const testData = processTestAnalyticsData(data);
    displayTestAnalyticsData(testData);
  } catch (error) {
    console.error("Fehler beim Abrufen der Test Analytics-Daten:", error);
    const container = document.getElementById("analyticsTestData");
    if (container) {
      container.textContent = "Fehler beim Laden der Test Analytics-Daten.";
    }
  }
}

/**
 * Exportiere die Funktion zum Abrufen der Test-Daten als globale Funktion,
 * damit sie z. B. von Alpine.js oder direkt im HTML-Attribut aufgerufen werden kann.
 */
window.initTestAnalytics = initTestAnalytics;

// Starte den regulären Report, wenn das DOM vollständig geladen ist.
document.addEventListener("DOMContentLoaded", initAnalytics);
