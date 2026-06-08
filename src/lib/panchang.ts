// Update this every week by checking https://grahaguru.in/panchang/2026/june/
// Last updated: June 8, 2026 — Data source: grahaguru.in (Delhi timings)

const WEEKLY_DATA: Record<string, any> = {
  "2026-06-11": { tithi: "Navami", nakshatra: "Chitra", yoga: "Dhriti", karana: "Gara", rahuKalam: "1:30–3:00 PM", abhijitMuhurat: "11:51 AM–12:39 PM", sunrise: "6:22 AM", sunset: "7:08 PM" },
  "2026-06-12": { tithi: "Dashami", nakshatra: "Swati", yoga: "Shula", karana: "Vanija", rahuKalam: "10:30 AM–12:00 PM", abhijitMuhurat: "11:51 AM–12:39 PM", sunrise: "6:23 AM", sunset: "7:07 PM" },
  "2026-06-13": { tithi: "Ekadashi", nakshatra: "Vishakha", yoga: "Ganda", karana: "Vishti", rahuKalam: "9:00–10:30 AM", abhijitMuhurat: "11:51 AM–12:39 PM", sunrise: "6:23 AM", sunset: "7:07 PM" },
  "2026-06-14": { tithi: "Dwadashi", nakshatra: "Anuradha", yoga: "Vriddhi", karana: "Bava", rahuKalam: "4:30–6:00 PM", abhijitMuhurat: "11:51 AM–12:39 PM", sunrise: "6:24 AM", sunset: "7:06 PM" },
  "2026-06-15": { tithi: "Trayodashi", nakshatra: "Jyeshtha", yoga: "Dhruva", karana: "Kaulava", rahuKalam: "7:30–9:00 AM", abhijitMuhurat: "11:51 AM–12:39 PM", sunrise: "6:25 AM", sunset: "7:05 PM" },
  "2026-06-16": { tithi: "Chaturdashi", nakshatra: "Mula", yoga: "Vyaghata", karana: "Gara", rahuKalam: "3:00–4:30 PM", abhijitMuhurat: "11:51 AM–12:39 PM", sunrise: "6:26 AM", sunset: "7:04 PM" },
  "2026-06-17": { tithi: "Purnima", nakshatra: "Purva Ashadha", yoga: "Harshana", karana: "Shakuni", rahuKalam: "12:00–1:30 PM", abhijitMuhurat: "11:51 AM–12:39 PM", sunrise: "6:27 AM", sunset: "7:03 PM" },
};

const FALLBACK = {
  tithi: "Check drikpanchang.com",
  nakshatra: "Check drikpanchang.com",
  yoga: "Check drikpanchang.com",
  karana: "Check drikpanchang.com",
  rahuKalam: "Check drikpanchang.com",
  abhijitMuhurat: "Check drikpanchang.com",
  sunrise: "Check drikpanchang.com",
  sunset: "Check drikpanchang.com",
};

export async function getTodayPanchang() {
  const todayKey = new Date().toLocaleDateString('en-CA'); // gives YYYY-MM-DD
  return WEEKLY_DATA[todayKey] ?? FALLBACK;
}