// Update this every week by checking https://www.drikpanchang.com
// Last updated: June 4, 2026

const WEEKLY_DATA: Record<string, any> = {
  "2026-06-04": { tithi: "Navami", nakshatra: "Purva Phalguni", yoga: "Harshana", karana: "Vishti", rahuKalam: "3:00–4:30 PM", abhijitMuhurat: "11:53–12:47 PM", sunrise: "5:24 AM", sunset: "7:19 PM" },
  "2026-06-05": { tithi: "Dashami", nakshatra: "Uttara Phalguni", yoga: "Vajra", karana: "Bava", rahuKalam: "12:00–1:30 PM", abhijitMuhurat: "11:53–12:47 PM", sunrise: "5:24 AM", sunset: "7:19 PM" },
  "2026-06-06": { tithi: "Ekadashi", nakshatra: "Hasta", yoga: "Siddhi", karana: "Balava", rahuKalam: "10:30–12:00 PM", abhijitMuhurat: "11:53–12:47 PM", sunrise: "5:24 AM", sunset: "7:20 PM" },
  "2026-06-07": { tithi: "Dwadashi", nakshatra: "Chitra", yoga: "Vyatipata", karana: "Kaulava", rahuKalam: "3:00–4:30 PM", abhijitMuhurat: "11:53–12:47 PM", sunrise: "5:24 AM", sunset: "7:20 PM" },
  "2026-06-08": { tithi: "Trayodashi", nakshatra: "Swati", yoga: "Variyana", karana: "Taitila", rahuKalam: "9:00–10:30 AM", abhijitMuhurat: "11:54–12:47 PM", sunrise: "5:23 AM", sunset: "7:20 PM" },
  "2026-06-09": { tithi: "Chaturdashi", nakshatra: "Vishakha", yoga: "Parigha", karana: "Garija", rahuKalam: "7:30–9:00 AM", abhijitMuhurat: "11:54–12:48 PM", sunrise: "5:23 AM", sunset: "7:21 PM" },
  "2026-06-10": { tithi: "Purnima", nakshatra: "Anuradha", yoga: "Shiva", karana: "Vishti", rahuKalam: "4:30–6:00 PM", abhijitMuhurat: "11:54–12:48 PM", sunrise: "5:23 AM", sunset: "7:21 PM" },
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