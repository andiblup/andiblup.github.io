// // js/demos/analytics.js
// export function init() {
//     // URL deines Dashboard-Endpunkts (Cloud Function)
//     const dashboardUrl = "https://analytics-yi34fule4q-uc.a.run.app/dashboard";

//     function formatDate(dateString) {
//         // Überprüfen, ob der Input eine 8-stellige Zeichenkette ist
//         if (typeof dateString !== 'string' || dateString.length !== 8) {
//           throw new Error("Input muss ein String im Format 'yyyymmdd' sein");
//         }

//         const year = dateString.slice(0, 4);
//         const month = dateString.slice(4, 6);
//         const day = dateString.slice(6, 8);

//         return (localStorage.getItem('lang') === 'de') ? `${day}.${month}.${year}` : `${month}/${day}/${year}`;
//       }

//       // Beispiel:
//       const input = "20250202";
//       const output = formatDate(input);
//       console.log(output);  // Ausgabe: "02.02.2025"


//     /**
//      * Ruft Dashboard-Daten von der Cloud Function ab.
//      * @param {string} url - Die URL des Dashboard-Endpunkts.
//      * @returns {Promise<Object>} - Das abgerufene JSON-Objekt.
//      */
//     async function fetchDashboardData(url) {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error("Netzwerkantwort war nicht ok");
//         }
//         return response.json();
//     }

//     /**
//      * Initialisiert das Dashboard:
//      * - Ruft die Daten ab
//      * - Verarbeitet die Daten für die einzelnen Diagramme
//      * - Rendert die Diagramme mit Chart.js
//      */
//     async function initDashboard() {
//         try {
//             const data = await fetchDashboardData(dashboardUrl);
//             console.log("Dashboard-Daten:", data);

//             // Allgemeiner Report: Annahme, dass data.general.rows ein Array von Objekten ist,
//             // wobei jede Zeile ein Datum (als Dimension) und den Wert für "screenPageViews" (als Metrik) enthält.
//             // Beispielstruktur: { dimensionValues: [{ value: "2025-01-25" }], metricValues: [{ value: "123" }] }
//             const generalLabels = [];
//             const generalValues = [];
//             if (data && data.rows) {
//                 data.rows.forEach(row => {
//                     let date;
//                     try {
//                         date = formatDate(row.dimensionValues[0].value);
//                     } catch (error) {

//                         date = row.dimensionValues && row.dimensionValues[0] ? row.dimensionValues[0].value : "Unbekannt";
//                     }
//                     const views = row.metricValues && row.metricValues[0] ? parseInt(row.metricValues[0].value, 10) : 0;
//                     generalLabels.push(date);
//                     generalValues.push(views);
//                 });
//             }

//             // Länder-Aufschlüsselung: data.testEventBreakdown.rows enthält z. B. { dimensionValues: [{ value: "Germany" }], metricValues: [{ value: "50" }] }
//             const testEventLabels = [];
//             const testEventValues = [];
//             if (data && data.rows) {
//                 data.rows.forEach(row => {

//                     let testEvent;
//                     try {
//                         testEvent = formatDate(row.dimensionValues[0].value);
//                     } catch (error) {

//                         testEvent = row.dimensionValues && row.dimensionValues[0] ? row.dimensionValues[0].value : "Unbekannt";
//                     }

//                     // const testEvent = row.dimensionValues && row.dimensionValues[0] ? row.dimensionValues[0].value : "Unbekannt";
//                     const sessions = row.metricValues && row.metricValues[0] ? parseInt(row.metricValues[1].value, 10) : 0;
//                     testEventLabels.push(testEvent);
//                     testEventValues.push(sessions);
//                 });
//             }

//             // Gerätetyp-Aufschlüsselung: data.deviceCategory.rows enthält z. B. { dimensionValues: [{ value: "mobile" }], metricValues: [{ value: "75" }] }
//             const deviceLabels = [];
//             const deviceValues = [];
//             if (data && data.rows) {
//                 data.rows.forEach(row => {
//                     const device = row.dimensionValues && row.dimensionValues[0] ? row.dimensionValues[0].value : "Unbekannt";
//                     const sessions = row.metricValues && row.metricValues[0] ? parseInt(row.metricValues[0].value, 10) : 0;
//                     deviceLabels.push(device);
//                     deviceValues.push(sessions);
//                 });
//             }

//             // Render die Diagramme
//             renderGeneralChart(generalLabels, generalValues);
//             renderTestEventChart(testEventLabels, testEventValues);
//             renderDeviceChart(deviceLabels, deviceValues);

//         } catch (error) {
//             console.error("Fehler beim Abrufen der Dashboard-Daten:", error);
//         }
//     }

//     /**
//      * Rendert ein Liniendiagramm für den allgemeinen Report (z. B. Seitenaufrufe über die Zeit).
//      * @param {Array} labels - Die Labels (Datum).
//      * @param {Array} dataValues - Die Metrik-Werte (z. B. Seitenaufrufe).
//      */
//     function renderGeneralChart(labels, dataValues) {
//         const canvas = document.getElementById("generalChart");
//         const ctx = canvas.getContext("2d");

//         // Überprüfen, ob bereits ein Chart an diesem Canvas existiert
//         const existingChart = Chart.getChart(canvas);
//         if (existingChart) {
//             existingChart.destroy();
//         }

//         new Chart(ctx, {
//             type: "line",
//             data: {
//                 labels: labels,
//                 datasets: [{
//                     label: "Seitenaufrufe",
//                     data: dataValues,
//                     borderColor: "rgba(75, 192, 192, 1)",
//                     backgroundColor: "rgba(75, 192, 192, 0.6)",
//                     fill: true,
//                     tension: 0.3,
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     title: {
//                         display: true,
//                         text: "Seitenaufrufe (Letzte 7 Tage)"
//                     }
//                 }
//             }
//         });
//     }

//     /**
//      * Rendert ein Balkendiagramm für die Länder-Aufschlüsselung.
//      * @param {Array} labels - Die Ländernamen.
//      * @param {Array} dataValues - Die Anzahl der engagierten Sitzungen pro Land.
//      */
//     function renderTestEventChart(labels, dataValues) {
//         // const ctx = document.getElementById("testEventChart").getContext("2d");
//         const canvas = document.getElementById("testEventChart");
//         const ctx = canvas.getContext("2d");

//         // Überprüfen, ob bereits ein Chart an diesem Canvas existiert
//         const existingChart = Chart.getChart(canvas);
//         if (existingChart) {
//             existingChart.destroy();
//         }
//         new Chart(ctx, {
//             type: "line",
//             data: {
//                 labels: labels,
//                 datasets: [{
//                     label: "Engagierte Sitzungen",
//                     data: dataValues,
//                     backgroundColor: "rgba(153, 102, 255, 0.6)",
//                     borderColor: "rgba(153, 102, 255, 1)",
//                     borderWidth: 1,
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     title: {
//                         display: true,
//                         text: "Anzahl ausgelöster Test-Events (Letzte 7 Tage)"
//                     }
//                 },
//                 scales: {
//                     y: {
//                         beginAtZero: true
//                     }
//                 }
//             }
//         });
//     }

//     /**
//      * Rendert ein Kreisdiagramm für die Gerätetyp-Aufschlüsselung.
//      * @param {Array} labels - Die Gerätetypen.
//      * @param {Array} dataValues - Die Anzahl der engagierten Sitzungen pro Gerätetyp.
//      */
//     function renderDeviceChart(labels, dataValues) {
//         // const ctx = document.getElementById("deviceChart").getContext("2d");
//         const canvas = document.getElementById("deviceChart");
//         const ctx = canvas.getContext("2d");

//         // Überprüfen, ob bereits ein Chart an diesem Canvas existiert
//         const existingChart = Chart.getChart(canvas);
//         if (existingChart) {
//             existingChart.destroy();
//         }
//         new Chart(ctx, {
//             type: "pie",
//             data: {
//                 labels: labels,
//                 datasets: [{
//                     label: "Engagierte Sitzungen",
//                     data: dataValues,
//                     backgroundColor: [
//                         "rgba(255, 99, 132, 0.6)",
//                         "rgba(54, 162, 235, 0.6)",
//                         "rgba(255, 206, 86, 0.6)",
//                         "rgba(75, 192, 192, 0.6)",
//                         "rgba(153, 102, 255, 0.6)",
//                         "rgba(255, 159, 64, 0.6)"
//                     ],
//                     borderColor: [
//                         "rgba(255, 99, 132, 1)",
//                         "rgba(54, 162, 235, 1)",
//                         "rgba(255, 206, 86, 1)",
//                         "rgba(75, 192, 192, 1)",
//                         "rgba(153, 102, 255, 1)",
//                         "rgba(255, 159, 64, 1)"
//                     ],
//                     borderWidth: 1
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     title: {
//                         display: true,
//                         text: "Engagierte Sitzungen"
//                     }
//                 }
//             }
//         });
//     }

//     // Starte das Dashboard, wenn das DOM vollständig geladen ist.
//     // document.addEventListener("DOMContentLoaded", initDashboard);
//     // initDashboard();
//     if (document.readyState === "loading") {
//         document.addEventListener("DOMContentLoaded", initDashboard);
//     } else {
//         initDashboard();
//     }

// }


// js/demos/analytics.js
export function init() {
    // URL deines Dashboard-Endpunkts (Cloud Function)
    const dashboardUrl = "https://dashboard-yi34fule4q-uc.a.run.app";

    /**
     * Formatiert einen Datumsstring im Format "yyyymmdd" in "dd.mm.yyyy" (bei Deutsch)
     * oder "mm/dd/yyyy" (bei anderen Sprachen).
     */
    function formatDate(dateString) {
        if (typeof dateString !== "string" || dateString.length !== 8) {
            throw new Error("Input muss ein String im Format 'yyyymmdd' sein");
        }
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);
        return localStorage.getItem("lang") === "de"
            ? `${day}.${month}.${year}`
            : `${month}/${day}/${year}`;
    }

    /**
     * Ruft Dashboard-Daten von der Cloud Function ab.
     * @param {string} url - Die URL des Dashboard-Endpunkts.
     * @returns {Promise<Object>} - Das abgerufene JSON-Objekt.
     */
    async function fetchDashboardData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Netzwerkantwort war nicht ok");
        }
        return response.json();
    }

    /**
     * Liest die vier Report-Teile aus den gelieferten Daten aus und
     * extrahiert jeweils Labels und Werte.
     */
    async function initDashboard() {
        try {
            const data = await fetchDashboardData(dashboardUrl);
            console.log("Dashboard-Daten:", data);
            console.log("Dashboard-Daten General:", data.general);

            // 1. Allgemeiner Report: (ScreenPageViews)
            //? OLD
            // const generalLabels = [];
            // const generalValues = [];
            // if (data && data.rows) {
            //     data.rows.forEach(row => {
            //         let date;
            //         try {
            //             date = formatDate(row.dimensionValues[0].value);
            //         } catch (error) {
            //             date =
            //                 row.dimensionValues && row.dimensionValues[0]
            //                     ? row.dimensionValues[0].value
            //                     : "Unbekannt";
            //         }
            //         // screenPageViews ist hier das erste Metric (Index 0)
            //         const views =
            //             row.metricValues && row.metricValues[0]
            //                 ? parseInt(row.metricValues[0].value, 10)
            //                 : 0;
            //         generalLabels.push(date);
            //         generalValues.push(views);
            //     });
            // }

            const generalLabels = [];
            const generalValues = [];
            if (data && data.general && data.general.rows) {
                data.general.rows.forEach(row => {
                    let date;
                    try {
                        date = formatDate(row.dimensionValues[0].value);
                    } catch (error) {
                        date = row.dimensionValues && row.dimensionValues[0]
                            ? row.dimensionValues[0].value
                            : "Unbekannt";
                    }
                    // screenPageViews ist der erste Metric-Wert (Index 0)
                    const views = row.metricValues && row.metricValues[0]
                        ? parseInt(row.metricValues[0].value, 10)
                        : 0;
                    generalLabels.push(date);
                    generalValues.push(views);
                });
            }


            // 2. Test-Event Report: (z. B. eventCount für "test_click")
            // ? OLD
            // const testEventLabels = [];
            // const testEventValues = [];
            // if (data && data.rows) {
            //     data.rows.forEach(row => {
            //         // Bei diesem Report könnte als Label z. B. das Event-Datum oder der Event-Name stehen.
            //         // Hier verwenden wir den ersten Dimensionseintrag (z.B. Datum)
            //         let label;
            //         try {
            //             label = formatDate(row.dimensionValues[0].value);
            //         } catch (error) {
            //             label =
            //                 row.dimensionValues && row.dimensionValues[0]
            //                     ? row.dimensionValues[0].value
            //                     : "Unbekannt";
            //         }
            //         // Der erste Metric-Wert sollte in diesem Report die Anzahl der Events sein.
            //         const count =
            //             row.metricValues && row.metricValues[0]
            //                 ? parseInt(row.metricValues[0].value, 10)
            //                 : 0;
            //         testEventLabels.push(label);
            //         testEventValues.push(count);
            //     });
            // }

            const testEventLabels = [];
            const testEventValues = [];
            if (data && data.testEvent && data.testEvent.rows) {
                data.testEvent.rows.forEach(row => {
                    let label;
                    try {
                        label = formatDate(row.dimensionValues[0].value);
                    } catch (error) {
                        label = row.dimensionValues && row.dimensionValues[0]
                            ? row.dimensionValues[0].value
                            : "Unbekannt";
                    }
                    const count = row.metricValues && row.metricValues[0]
                        ? parseInt(row.metricValues[0].value, 10)
                        : 0;
                    testEventLabels.push(label);
                    testEventValues.push(count);
                });
            }


            // 3. Country Breakdown Report: (Engagierte Sitzungen nach Land)
            // ? OLD
            // const countryLabels = [];
            // const countryValues = [];
            // if (data && data.rows) {
            //     data.rows.forEach(row => {
            //         const country =
            //             row.dimensionValues && row.dimensionValues[0]
            //                 ? row.dimensionValues[0].value
            //                 : "Unbekannt";
            //         const sessions =
            //             row.metricValues && row.metricValues[0]
            //                 ? parseInt(row.metricValues[0].value, 10)
            //                 : 0;
            //         countryLabels.push(country);
            //         countryValues.push(sessions);
            //     });
            // }

            const countryLabels = [];
            const countryValues = [];
            if (data && data.countryBreakdown && data.countryBreakdown.rows) {
                data.countryBreakdown.rows.forEach(row => {
                    const country = row.dimensionValues && row.dimensionValues[0]
                        ? row.dimensionValues[0].value
                        : "Unbekannt";
                    const sessions = row.metricValues && row.metricValues[0]
                        ? parseInt(row.metricValues[0].value, 10)
                        : 0;
                    countryLabels.push(country);
                    countryValues.push(sessions);
                });
            }


            // 4. Device Category Report: (Engagierte Sitzungen nach Gerätetyp)
            // const deviceLabels = [];
            // const deviceValues = [];
            // if (data && data.rows) {
            //     data.rows.forEach(row => {
            //         const device =
            //             row.dimensionValues && row.dimensionValues[0]
            //                 ? row.dimensionValues[0].value
            //                 : "Unbekannt";
            //         const sessions =
            //             row.metricValues && row.metricValues[0]
            //                 ? parseInt(row.metricValues[0].value, 10)
            //                 : 0;
            //         deviceLabels.push(device);
            //         deviceValues.push(sessions);
            //     });
            // }
            const deviceLabels = [];
            const deviceValues = [];
            if (data && data.deviceCategory && data.deviceCategory.rows) {
                data.deviceCategory.rows.forEach(row => {
                    const device = row.dimensionValues && row.dimensionValues[0]
                                   ? row.dimensionValues[0].value
                                   : "Unbekannt";
                    const sessions = row.metricValues && row.metricValues[0]
                                     ? parseInt(row.metricValues[0].value, 10)
                                     : 0;
                    deviceLabels.push(device);
                    deviceValues.push(sessions);
                });
            }
            


            // Chart rendern
            renderGeneralChart(generalLabels, generalValues);
            renderTestEventChart(testEventLabels, testEventValues);
            renderCountryChart(countryLabels, countryValues);
            renderDeviceChart(deviceLabels, deviceValues);

        } catch (error) {
            console.error("Fehler beim Abrufen der Dashboard-Daten:", error);
        }
    }

    /**
     * Rendert ein Liniendiagramm für den allgemeinen Report (z. B. Seitenaufrufe über die Zeit).
     * @param {Array} labels - Die Labels (Datum).
     * @param {Array} dataValues - Die Metrik-Werte (z. B. Seitenaufrufe).
     */
    function renderGeneralChart(labels, dataValues) {
        const canvas = document.getElementById("generalChart");
        const ctx = canvas.getContext("2d");

        // Vorher existierenden Chart zerstören
        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
            existingChart.destroy();
        }

        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Seitenaufrufe",
                    data: dataValues,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    fill: true,
                    tension: 0.3,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: "Seitenaufrufe (Letzte 7 Tage)"
                    }
                }
            }
        });
    }

    /**
     * Rendert ein Liniendiagramm für den Test-Event Report.
     * @param {Array} labels - Die Labels (z. B. Datum oder Event-Name).
     * @param {Array} dataValues - Die Anzahl der ausgelösten Test-Events.
     */
    function renderTestEventChart(labels, dataValues) {
        const canvas = document.getElementById("testEventChart");
        const ctx = canvas.getContext("2d");

        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
            existingChart.destroy();
        }
        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Test-Events",
                    data: dataValues,
                    backgroundColor: "rgba(153, 102, 255, 0.6)",
                    borderColor: "rgba(153, 102, 255, 1)",
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: "Anzahl Test-Events (Letzte 7 Tage)"
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    /**
     * Rendert ein Balkendiagramm für den Country Breakdown Report.
     * @param {Array} labels - Die Ländernamen.
     * @param {Array} dataValues - Die Anzahl der engagierten Sitzungen pro Land.
     */
    function renderCountryChart(labels, dataValues) {
        const canvas = document.getElementById("countryChart");
        const ctx = canvas.getContext("2d");

        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
            existingChart.destroy();
        }
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Engagierte Sitzungen",
                    data: dataValues,
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: "Engagierte Sitzungen nach Land"
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    /**
     * Rendert ein Kreisdiagramm für den Device Category Report.
     * @param {Array} labels - Die Gerätetypen.
     * @param {Array} dataValues - Die Anzahl der engagierten Sitzungen pro Gerätetyp.
     */
    function renderDeviceChart(labels, dataValues) {
        const canvas = document.getElementById("deviceChart");
        const ctx = canvas.getContext("2d");

        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
            existingChart.destroy();
        }
        new Chart(ctx, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [{
                    label: "Engagierte Sitzungen",
                    data: dataValues,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.6)",
                        "rgba(54, 162, 235, 0.6)",
                        "rgba(255, 206, 86, 0.6)",
                        "rgba(75, 192, 192, 0.6)",
                        "rgba(153, 102, 255, 0.6)",
                        "rgba(255, 159, 64, 0.6)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: "Engagierte Sitzungen nach Gerätetyp"
                    }
                }
            }
        });
    }

    // Starte das Dashboard – falls der DOM noch nicht komplett geladen ist, wird ein Listener registriert.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initDashboard);
    } else {
        initDashboard();
    }
}
