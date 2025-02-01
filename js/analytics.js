// Ersetze die URL durch die URL deiner Cloud Function
const analyticsUrl = "https://analytics-yi34fule4q-uc.a.run.app";




// Funktion zum Anzeigen der Daten
function displayAnalyticsData(data) {
  const container = document.getElementById("analyticsData");
    if (!container) {
    console.error("Container für Analytics-Daten nicht gefunden.");
    return;
    }
  // Beispielhafte Darstellung: Wir nehmen an, dass die Daten eine Liste von Zeilen enthalten.
  let html = "<ul>";

  // Überprüfe, ob Berichte und Zeilen vorhanden sind
  if (data.reports && data.reports[0] && data.reports[0].data.rows) {
    data.reports[0].data.rows.forEach((row) => {
      // Annahme: row.dimensions[0] enthält das Datum,
      // row.metrics[0].values[0] die Seitenaufrufe.
      const datum = row.dimensions[0];
      const seitenaufrufe = row.metrics[0].values[0];
      html += `<li>Datum: ${datum} – Seitenaufrufe: ${seitenaufrufe}</li>`;
    });
  } else {
    html += "<li>Keine Daten verfügbar.</li>";
  }
  html += "</ul>";

  container.innerHTML = html;
}

// Daten von der Cloud Function abrufen
fetch(analyticsUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Netzwerkantwort war nicht ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Empfangene Analytics-Daten:", data);
    displayAnalyticsData(data);
  })
  .catch((error) => {
    console.error("Fehler beim Abrufen der Analytics-Daten:", error);
    document.getElementById("analyticsData").textContent =
      "Fehler beim Laden der Analytics-Daten.";
  });
