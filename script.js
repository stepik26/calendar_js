let today = new Date();
let monthIndex = today.getMonth();

//Arrays
const days = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];
const months = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];
const counterDays = ["erste", "zweite", "dritte", "vierte", "fünfte"];
const holidays = [
  { month: 0, day: 1, name: "Neujahr" },
  { month: 3, day: 3, name: "Karfreitag" },
  { month: 3, day: 6, name: "Ostermontag" },
  { month: 4, day: 1, name: "Tag der Arbeit" },
  { month: 4, day: 14, name: "Christi Himmelfahrt" },
  { month: 4, day: 25, name: "Pfingsmontag" },
  { month: 9, day: 3, name: "Tag der Deutschen Einheit" },
  { month: 11, day: 25, name: "Erster Weihnachstag" },
  { month: 11, day: 26, name: "Zweiter Weihnachstag" },
];

//Werte berechnen
let day = days[today.getDay()];
let month = months[monthIndex];
let year = today.getFullYear();
let counter = counterDays[Math.ceil(today.getDate() / 7) - 1];
let daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

//Datum ausgeschrieben
let fullDate = today.toLocaleDateString("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
document.title = "Kalenderblatt vom " + fullDate;

//Elemente füllen
document.getElementById("date").textContent = fullDate;
document.getElementById("dateText").textContent = fullDate;
document.getElementById("weekday").textContent = day;
document.getElementById("counter").textContent = counter;
document.getElementById("weekday1").textContent = day;
document.getElementById("month").textContent = month;
document.getElementById("month1").textContent = month;
document.getElementById("daysInMonth").textContent = daysInMonth;
document.getElementById("year").textContent = year;

//Aktuellen Tag markieren
let cells = document.querySelectorAll("td");

// for (let i = 0; i < cells.length; i++) {
//   let cell = cells[i];

//   if (!cell.classList.contains("another-month")) {
//     let cellNumber = parseInt(cell.textContent);

//     if (cellNumber === today.getDate()) {
//       cell.id = "today";
//     }
//   }
// }

//Tag des Jahres
let start = new Date(year, 0, 0);
let diff = today - start;
let oneDay = 1000 * 60 * 60 * 24;
let dayOfYear = Math.floor(diff / oneDay);
document.getElementById("dayOfYear").textContent = dayOfYear;

//Tage bis Jahresende
let end = new Date(year, 11, 31);
let diffEnd = end - today;
let daysLeft = Math.ceil(diffEnd / oneDay);
document.getElementById("daysLeft").textContent = daysLeft;

//Feiertage
let holiday = holidays.find(
  (f) => f.day == today.getDate() && f.month == monthIndex,
);
document.getElementById("holiday").textContent = holiday ? "ein" : "kein";

function generateCalendar() {
  const tbody = document.querySelector("#calendar tbody");
  tbody.innerHTML = "";

  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  let daysInMonth = lastDay.getDate();

  // Starttag der Woche (0=So … 6=Sa)
  let startDay = firstDay.getDay();
  startDay = startDay === 0 ? 6 : startDay - 1; // Montag = 0 … Sonntag = 6

  // Letzter Tag des Vormonats
  let prevMonthLastDay = new Date(year, monthIndex, 0).getDate();

  let dayCounter = 1;

  for (let row = 0; row < 6; row++) {
    let tr = document.createElement("tr");

    for (let col = 0; col < 7; col++) {
      let td = document.createElement("td");
      let cellDate;

      if (row === 0 && col < startDay) {
        // Tage vom Vormonat
        let prevDay = prevMonthLastDay - startDay + col + 1;
        td.textContent = prevDay;
        td.classList.add("another-month");
        cellDate = new Date(year, monthIndex - 1, prevDay);
      } else if (dayCounter > daysInMonth) {
        // Tage vom nächsten Monat
        let nextDay = dayCounter - daysInMonth;
        td.textContent = nextDay;
        td.classList.add("another-month");
        cellDate = new Date(year, monthIndex + 1, nextDay);
        dayCounter++;
      } else {
        // Tage vom aktuellen Monat
        td.textContent = dayCounter;
        cellDate = new Date(year, monthIndex, dayCounter);

        // Heutiger Tag
        if (dayCounter === today.getDate()) {
          td.id = "today";
        }

        // Feiertage markieren
        let isHoliday = holidays.find(
          (f) => f.day === dayCounter && f.month === monthIndex
        );
        if (isHoliday) td.classList.add("highlight");

        dayCounter++;
      }

      // Samstag/Sonntag korrekt färben
      let weekday = cellDate.getDay(); // 0=So … 6=Sa
      if (weekday === 6) td.classList.add("saturday"); // Samstag
      if (weekday === 0) td.classList.add("sunday");   // Sonntag

      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }
}

generateCalendar();
