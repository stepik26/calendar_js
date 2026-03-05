let today = new Date();          // aktuelles Datum
let monthIndex = today.getMonth(); // aktueller Monat (0 = Januar)
let year = today.getFullYear();    // aktuelles Jahr

const days = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
const months = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];

// "erste", "zweite" ... für die Woche
const counterDays = ["erste","zweite","dritte","vierte","fünfte"];

// Feiertage
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

function isHoliday(day, month){
  for (let i=0; i<holidays.length; i++){
    if (holidays[i].day === day && holidays[i].month === month){
      return true;
    }
  }
  return false;
}

function renderCalendarStart() {
  document.querySelector("#calendar tbody").innerHTML = ""; // Tabelle leeren
}

function renderWeekStart() {
  const tr = document.createElement("tr");
  document.querySelector("#calendar tbody").appendChild(tr);
  return tr; 
}

function renderDay(tr, dayDate) {
  const td = document.createElement("td");
  td.textContent = dayDate.getDate();

  // Tage vom anderen Monat hellgrau machen
  if (dayDate.getMonth() !== monthIndex) {
    td.classList.add("another-month");
  }

  // Heutigen Tag markieren
  if (dayDate.getDate() === today.getDate() && dayDate.getMonth() === monthIndex) {
    td.id = "today";
  }

  // Feiertag markieren
  if (isHoliday(dayDate.getDate(), dayDate.getMonth())) {
    td.classList.add("highlight");
  }

  // Wochenende markieren
  const weekday = dayDate.getDay();
  if (weekday === 0) td.classList.add("sunday");
  if (weekday === 6) td.classList.add("saturday");

  tr.appendChild(td);
}

function renderCalendarEnd() {
  // Datum ausgeschrieben
  let fullDate = today.toLocaleDateString("de-DE", { day:"numeric", month:"long", year:"numeric" });
  document.title = "Kalenderblatt vom " + fullDate;
  document.getElementById("date").textContent = fullDate;
  document.getElementById("dateText").textContent = fullDate;

  // Wochentag, Monat, Jahr
  document.getElementById("weekday").textContent = days[today.getDay()];
  document.getElementById("weekday1").textContent = days[today.getDay()];
  document.getElementById("month").textContent = months[monthIndex];
  document.getElementById("month1").textContent = months[monthIndex];
  document.getElementById("monthName").textContent = months[monthIndex];
  document.getElementById("year").textContent = year;
  

  // Counter für Woche (erste, zweite ...)
  let counter = counterDays[Math.ceil(today.getDate() / 7) - 1];
  document.getElementById("counter").textContent = counter;

  // Tage im Monat
  let daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  document.getElementById("daysInMonth").textContent = daysInMonth;

  // Tag des Jahres
  let start = new Date(year, 0, 0);
  let diff = today - start;
  let oneDay = 1000*60*60*24;
  let dayOfYear = Math.floor(diff / oneDay);
  document.getElementById("dayOfYear").textContent = dayOfYear;

  // Tage bis Jahresende
  let end = new Date(year, 11, 31);
  let diffEnd = end - today;
  let daysLeft = Math.ceil(diffEnd / oneDay);
  document.getElementById("daysLeft").textContent = daysLeft;

  // Feiertag heute
  let holiday = isHoliday(today.getDate(), monthIndex);
  document.getElementById("holiday").textContent = holiday ? "ein" : "kein";
}

function generateCalendar() {
  renderCalendarStart();

  const firstDay = new Date(year, monthIndex, 1); // Erster Tag des Monats
  const lastDay = new Date(year, monthIndex + 1, 0); // monthIndex + 1 = nächster Monat, Tag 0 = letzter Tag des aktuellen Monats
  let daysInMonth = lastDay.getDate();

  let startDay = firstDay.getDay(); // am welchen Wochentag beginnt der Monat
  startDay = startDay === 0 ? 6 : startDay - 1; // Damit die Woche am Montag anfängt

  const prevMonthLastDay = new Date(year, monthIndex, 0).getDate();
  let dayCounter = 1 - startDay;

  for (let row = 0; row <= 5; row++) {
    let tr = renderWeekStart();

    for (let col = 0; col < 7; col++) {
      let dayDate;

      if (dayCounter <= 0) {
        dayDate = new Date(year, monthIndex - 1, prevMonthLastDay + dayCounter); // Vormonat
      } 
      else if (dayCounter > daysInMonth) {
        dayDate = new Date(year, monthIndex + 1, dayCounter - daysInMonth); // nächster Monat
      } 
      else {
        dayDate = new Date(year, monthIndex, dayCounter); // aktueller Monat
      }

      renderDay(tr, dayDate);
      dayCounter++;
    }
  }

  renderCalendarEnd(); // Textinfos setzen
}

//Events
const button1 = document.getElementById("prevMonth");
button1.onclick = () => {
  alert("geklickt");
};
const button2 = document.getElementById("nextMonth");


generateCalendar();