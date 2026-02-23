let today = new Date();

//Arrays
const days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const months = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const counterDays = ["erste", "zweite", "dritte", "vierte"];
const holidays = [
    {month: 0, day: 1, name: "Neujahr"},
    {month: 3, day: 3, name: "Karfreitag"},
    {month: 3, day: 6, name: "Ostermontag"},
    {month: 4, day: 1, name: "Tag der Arbeit"},
    {month: 4, day: 14, name: "Christi Himmelfahrt"},
    {month: 4, day: 25, name: "Pfingsmontag"},
    {month: 9, day: 3, name: "Tag der Deutschen Einheit"},
    {month: 11, day: 25, name: "Erster Weihnachstag"},
    {month: 11, day: 26, name: "Zweiter Weihnachstag"},
]

//Werte berechnen
let day = days[today.getDay()];
let month = months[today.getMonth()]
let year = today.getFullYear();
let counter = counterDays[Math.ceil(today.getDate() / 7) - 1];

//Datum ausgeschrieben
let fullDate = today.toLocaleDateString("de-DE", { 
  day: "numeric", 
  month: "long", 
  year: "numeric"
});
document.title = "Kalenderblatt vom " + fullDate;

//Elemente füllen
document.getElementById("date").textContent = fullDate;
document.getElementById("dateText").textContent = fullDate;
document.getElementById("weekday").textContent = day;
document.getElementById("counter").textContent = counter;
document.getElementById("weekday1").textContent = day;
document.getElementById("month").textContent = month;
document.getElementById("year").textContent = year;

//Feiertage
let holiday = holidays.find(f => f.day ==today.getDate() && f.month == today.getMonth());
document.getElementById("holiday").textContent = holiday? "ein":"kein";

