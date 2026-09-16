'use strict';

/* ============================================================
   «Маршрут» — адаптивный планировщик путешествия
   Логика: данные, состояние, рендер, интерактивность
   Все демонстрационные данные хранятся здесь, локально.
   ============================================================ */

/* ---------- 1. Демонстрационные данные ---------- */

const TRIP_DEMO = {
  id: 'lisbon-ocean',
  name: 'Лиссабон и океан',
  dates: {
    start: '2026-09-12',
    end: '2026-09-18'
  },
  routeCities: ['Лиссабон', 'Кашкайш', 'Синтра', 'Эрисейра', 'Океан', 'Лиссабон'],
  totalBudget: 180000,

  categories: {
    transport:     { label: 'Транспорт',   color: '#2C6E9B' },
    accommodation: { label: 'Отель',       color: '#3A7BC8' },
    food:          { label: 'Питание',     color: '#E17055' },
    fun:           { label: 'Активности',  color: '#F2C94C' }
  },

  days: [
    {
      id: 1, date: '2026-09-12', city: 'Лиссабон',
      calm: [
        { id: 'd1c1', time: '08:00', title: 'Выезд в аэропорт', category: 'transport', cost: 1800, bookingId: null },
        { id: 'd1c2', time: '11:00', title: 'Перелёт Москва → Лиссабон', category: 'transport', cost: 40000, bookingId: 'b1' },
        { id: 'd1c3', time: '16:00', title: 'Заселение в отель Bairro Alto', category: 'accommodation', cost: 2800, bookingId: 'b2' },
        { id: 'd1c4', time: '19:00', title: 'Ужин в Алфаме', category: 'food', cost: 2500, bookingId: null }
      ],
      active: [
        { id: 'd1a1', time: '08:00', title: 'Выезд в аэропорт', category: 'transport', cost: 1800, bookingId: null },
        { id: 'd1a2', time: '11:00', title: 'Перелёт Москва → Лиссабон', category: 'transport', cost: 40000, bookingId: 'b1' },
        { id: 'd1a3', time: '16:00', title: 'Заселение в отель Bairro Alto', category: 'accommodation', cost: 2800, bookingId: 'b2' },
        { id: 'd1a4', time: '19:00', title: 'Ужин в Алфаме', category: 'food', cost: 2500, bookingId: null },
        { id: 'd1a5', time: '22:00', title: 'Живая музыка в клубе Луза', category: 'fun', cost: 3000, bookingId: null }
      ]
    },
    {
      id: 2, date: '2026-09-13', city: 'Лиссабон',
      calm: [
        { id: 'd2c1', time: '10:00', title: 'Завтрак на смотровой Канселой', category: 'food', cost: 1800, bookingId: null },
        { id: 'd2c2', time: '11:30', title: 'Трамвай №28 через Альфаму', category: 'transport', cost: 300, bookingId: null },
        { id: 'd2c3', time: '15:00', title: 'Музей азулежу', category: 'fun', cost: 1500, bookingId: null },
        { id: 'd2c4', time: '20:00', title: 'Лёгкий ужин в Тайпасе', category: 'food', cost: 2200, bookingId: null }
      ],
      active: [
        { id: 'd2a1', time: '08:30', title: 'Завтрак и апельсиновый фреш', category: 'food', cost: 1800, bookingId: null },
        { id: 'd2a2', time: '09:30', title: 'Прогулка по Белену и башня', category: 'fun', cost: 900, bookingId: null },
        { id: 'd2a3', time: '11:30', title: 'Трамвай №28 через Альфаму', category: 'transport', cost: 300, bookingId: null },
        { id: 'd2a4', time: '13:00', title: 'Океанариум Лиссабона', category: 'fun', cost: 2400, bookingId: null },
        { id: 'd2a5', time: '20:00', title: 'Ужин в Тайпасе', category: 'food', cost: 2200, bookingId: null }
      ]
    },
    {
      id: 3, date: '2026-09-14', city: 'Кашкайш',
      calm: [
        { id: 'd3c1', time: '10:00', title: 'Электричка Лиссабон → Кашкайш', category: 'transport', cost: 900, bookingId: 'b3' },
        { id: 'd3c2', time: '11:30', title: 'Пляж Прайя-да-Райнья', category: 'fun', cost: 0, bookingId: null },
        { id: 'd3c3', time: '15:00', title: 'Прогулка по набережной', category: 'fun', cost: 0, bookingId: null },
        { id: 'd3c4', time: '19:00', title: 'Ужин с морепродуктами', category: 'food', cost: 3000, bookingId: null }
      ],
      active: [
        { id: 'd3a1', time: '10:00', title: 'Электричка Лиссабон → Кашкайш', category: 'transport', cost: 900, bookingId: 'b3' },
        { id: 'd3a2', time: '11:30', title: 'Пляж Прайя-да-Райнья', category: 'fun', cost: 0, bookingId: null },
        { id: 'd3a3', time: '13:30', title: 'Урок сёрфинга на пляже', category: 'fun', cost: 4500, bookingId: null },
        { id: 'd3a4', time: '17:00', title: 'Аперитив в баре у пирса', category: 'food', cost: 1500, bookingId: null },
        { id: 'd3a5', time: '19:00', title: 'Ужин с морепродуктами', category: 'food', cost: 3000, bookingId: null }
      ]
    },
    {
      id: 4, date: '2026-09-15', city: 'Синтра',
      calm: [
        { id: 'd4c1', time: '09:00', title: 'Поезд в Синтру', category: 'transport', cost: 700, bookingId: null },
        { id: 'd4c2', time: '10:30', title: 'Дворец Пена', category: 'fun', cost: 2500, bookingId: null },
        { id: 'd4c3', time: '14:00', title: 'Кинта-да-Регалейра', category: 'fun', cost: 1800, bookingId: null },
        { id: 'd4c4', time: '18:00', title: 'Ужин с фангу в таверне', category: 'food', cost: 2200, bookingId: null }
      ],
      active: [
        { id: 'd4a1', time: '09:00', title: 'Поезд в Синтру', category: 'transport', cost: 700, bookingId: null },
        { id: 'd4a2', time: '10:30', title: 'Дворец Пена', category: 'fun', cost: 2500, bookingId: null },
        { id: 'd4a3', time: '14:00', title: 'Кинта-да-Регалейра', category: 'fun', cost: 1800, bookingId: null },
        { id: 'd4a4', time: '16:30', title: 'Мыс Рока — край земли', category: 'fun', cost: 2000, bookingId: null },
        { id: 'd4a5', time: '19:00', title: 'Ужин с фангу в таверне', category: 'food', cost: 2400, bookingId: null }
      ]
    },
    {
      id: 5, date: '2026-09-16', city: 'Эрисейра',
      calm: [
        { id: 'd5c1', time: '10:00', title: 'Трансфер в Эрисейру', category: 'transport', cost: 2200, bookingId: null },
        { id: 'd5c2', time: '12:00', title: 'Пляж Прайя-душ-Коксуш', category: 'fun', cost: 0, bookingId: null },
        { id: 'd5c3', time: '17:00', title: 'Закат у маяка', category: 'fun', cost: 0, bookingId: null },
        { id: 'd5c4', time: '20:00', title: 'Ужин в таверне у порта', category: 'food', cost: 2600, bookingId: null }
      ],
      active: [
        { id: 'd5a1', time: '10:00', title: 'Трансфер в Эрисейру', category: 'transport', cost: 2200, bookingId: null },
        { id: 'd5a2', time: '12:00', title: 'Сёрф-сессия с гидом', category: 'fun', cost: 3800, bookingId: null },
        { id: 'd5a3', time: '17:00', title: 'Закат у маяка', category: 'fun', cost: 0, bookingId: null },
        { id: 'd5a4', time: '20:00', title: 'Ужин в таверне у порта', category: 'food', cost: 2600, bookingId: null }
      ]
    },
    {
      id: 6, date: '2026-09-17', city: 'Океан',
      calm: [
        { id: 'd6c1', time: '10:00', title: 'Яхтинг вдоль побережья', category: 'fun', cost: 6000, bookingId: 'b4' },
        { id: 'd6c2', time: '15:00', title: 'Прогулка вдоль дюн', category: 'fun', cost: 0, bookingId: null },
        { id: 'd6c3', time: '19:00', title: 'Прощальный ужин у океана', category: 'food', cost: 3500, bookingId: null }
      ],
      active: [
        { id: 'd6a1', time: '09:00', title: 'Завтрак у воды', category: 'food', cost: 1500, bookingId: null },
        { id: 'd6a2', time: '10:00', title: 'Яхтинг вдоль побережья', category: 'fun', cost: 6000, bookingId: 'b4' },
        { id: 'd6a3', time: '12:30', title: 'Кайт-сессия', category: 'fun', cost: 5000, bookingId: null },
        { id: 'd6a4', time: '15:00', title: 'Прогулка вдоль дюн', category: 'fun', cost: 0, bookingId: null },
        { id: 'd6a5', time: '19:00', title: 'Прощальный ужин у океана', category: 'food', cost: 3500, bookingId: null }
      ]
    },
    {
      id: 7, date: '2026-09-18', city: 'Лиссабон',
      calm: [
        { id: 'd7c1', time: '09:00', title: 'Возвращение в Лиссабон', category: 'transport', cost: 1200, bookingId: null },
        { id: 'd7c2', time: '13:00', title: 'Сувениры и кофе в Бике', category: 'food', cost: 1800, bookingId: null },
        { id: 'd7c3', time: '18:00', title: 'Обратный перелёт домой', category: 'transport', cost: 40000, bookingId: 'b1' }
      ],
      active: [
        { id: 'd7a1', time: '09:00', title: 'Возвращение в Лиссабон', category: 'transport', cost: 1200, bookingId: null },
        { id: 'd7a2', time: '11:00', title: 'Бранч в Pineapple House', category: 'food', cost: 1500, bookingId: null },
        { id: 'd7a3', time: '14:00', title: 'Смотровая Мирадуру-де-Санта-Катарина', category: 'fun', cost: 1200, bookingId: null },
        { id: 'd7a4', time: '18:00', title: 'Обратный перелёт домой', category: 'transport', cost: 40000, bookingId: 'b1' }
      ]
    }
  ],

  bookings: [
    { id: 'b1', type: 'flight',    title: 'Перелёт Москва ↔ Лиссабон',      date: '12.09 — 18.09', price: 80000, status: 'confirmed' },
    { id: 'b2', type: 'hotel',     title: 'Hotel Bairro Alto',              date: '12.09 — 18.09', price: 42000, status: 'pending' },
    { id: 'b3', type: 'train',     title: 'Электричка Лиссабон — Кашкайш',  date: '14.09',         price: 2400,  status: 'confirmed' },
    { id: 'b4', type: 'excursion', title: 'Яхтинг вдоль побережья',         date: '17.09',         price: 9000,  status: 'pending' }
  ],

  checklist: {
    documents: [
      { id: 'c1', text: 'Загранпаспорт', checked: false },
      { id: 'c2', text: 'Распечатка билетов', checked: false },
      { id: 'c3', text: 'Медицинская страховка', checked: false },
      { id: 'c4', text: 'Подтверждение отеля', checked: false }
    ],
    money: [
      { id: 'c5', text: 'Банковские карты', checked: false },
      { id: 'c6', text: 'Наличные — 300 €', checked: false },
      { id: 'c7', text: 'Поднять лимит на карту', checked: false }
    ],
    things: [
      { id: 'c8', text: 'Солнцезащитный крем', checked: false },
      { id: 'c9', text: 'Лёгкая одежда и кеды', checked: false },
      { id: 'c10', text: 'Адаптер для розеток', checked: false },
      { id: 'c11', text: 'Очки и панама', checked: false }
    ],
    health: [
      { id: 'c12', text: 'Аптечка (пластырь, ибупрофен)', checked: false },
      { id: 'c13', text: 'Лекарства по рецепту', checked: false },
      { id: 'c14', text: 'Вода для перелёта и снеки', checked: false }
    ]
  },

  paceHints: {
    calm: 'Спокойный ритм: успеете увидеть главное, останется время на кофе и рассвет у океана.',
    active: 'Насыщенный план: больше событий и приключений — день будет очень плотным.'
  }
};

/* ---------- 2. Управление поездками ----------
   Всё содержимое поездки (события, брони, чек-лист вместе с отметками)
   хранится внутри самого объекта поездки и сохраняется одним ключом.
   Так состояние не перетекает между поездками.
   ------------------------------------------------------------------ */

const STORAGE_TRIPS = 'marshroot-trips';
const STORAGE_ACTIVE = 'marshroot-active-trip';

const CHECKLIST_LABELS = {
  documents: 'Документы',
  money: 'Деньги',
  things: 'Вещи',
  health: 'Здоровье'
};

function catLabel(cat) {
  return CHECKLIST_LABELS[cat] || cat;
}

let ALL_TRIPS = [];
let TRIP_DATA = null;

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

/* Уникальный id для того, что добавляет пользователь */
let idCounter = 0;
function makeId(prefix) {
  idCounter++;
  return prefix + '-' + Date.now().toString(36) + '-' + idCounter;
}

function loadTrips() {
  var saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_TRIPS));
  } catch (e) { saved = null; }

  ALL_TRIPS = (Array.isArray(saved) && saved.length) ? saved : [deepClone(TRIP_DEMO)];
  ALL_TRIPS.forEach(normalizeTrip);

  migrateOldStorage();

  var activeId = null;
  try { activeId = localStorage.getItem(STORAGE_ACTIVE); } catch (e) { /* ignore */ }
  TRIP_DATA = ALL_TRIPS.find(function (t) { return t.id === activeId; }) || ALL_TRIPS[0];
}

/* Прошлая версия хранила отметки, брони и свои задачи отдельными ключами.
   Переносим их внутрь поездок один раз, старые ключи не трогаем. */
function migrateOldStorage() {
  var FLAG = 'marshroot-migrated-v2';
  try {
    if (localStorage.getItem(FLAG)) return;

    var oldCheck = JSON.parse(localStorage.getItem('marshroot-checklist') || '{}');
    var oldBook = JSON.parse(localStorage.getItem('marshroot-bookings') || '{}');
    var oldCustom = JSON.parse(localStorage.getItem('marshroot-custom') || '{}');

    ALL_TRIPS.forEach(function (trip) {
      var custom = oldCustom[trip.id] || {};
      Object.keys(custom).forEach(function (cat) {
        if (!trip.checklist[cat]) trip.checklist[cat] = [];
        (custom[cat] || []).forEach(function (item) {
          trip.checklist[cat].push({ id: item.id, text: item.text, checked: !!item.checked });
        });
      });
      Object.keys(trip.checklist).forEach(function (cat) {
        trip.checklist[cat].forEach(function (item) {
          if (typeof oldCheck[item.id] === 'boolean') item.checked = oldCheck[item.id];
        });
      });
      trip.bookings.forEach(function (b) {
        if (oldBook[b.id]) b.status = oldBook[b.id];
      });
    });

    localStorage.setItem(STORAGE_TRIPS, JSON.stringify(ALL_TRIPS));
    localStorage.setItem(FLAG, '1');
  } catch (e) { /* ignore */ }
}

/* Достраивает поездку, сохранённую прошлой версией приложения */
function normalizeTrip(trip) {
  if (!trip.categories) trip.categories = deepClone(TRIP_DEMO.categories);
  if (!Array.isArray(trip.bookings)) trip.bookings = [];
  if (!Array.isArray(trip.days)) trip.days = [];
  if (!trip.checklist) trip.checklist = {};
  if (!trip.paceHints) trip.paceHints = deepClone(TRIP_DEMO.paceHints);
  if (!Array.isArray(trip.routeCities)) trip.routeCities = [];
  trip.days.forEach(function (day) {
    if (!Array.isArray(day.calm)) day.calm = [];
    if (!Array.isArray(day.active)) day.active = [];
  });
  trip.bookings.forEach(function (b) { delete b.icon; delete b.iconLabel; });
  Object.keys(trip.checklist).forEach(function (cat) {
    if (!Array.isArray(trip.checklist[cat])) trip.checklist[cat] = [];
    trip.checklist[cat].forEach(function (item) { item.checked = !!item.checked; });
  });
  return trip;
}

function saveTrips() {
  try {
    localStorage.setItem(STORAGE_TRIPS, JSON.stringify(ALL_TRIPS));
    localStorage.setItem(STORAGE_ACTIVE, TRIP_DATA.id);
  } catch (e) { /* ignore */ }
}

function switchTrip(id) {
  var trip = ALL_TRIPS.find(function (t) { return t.id === id; });
  if (!trip) return;
  TRIP_DATA = trip;
  state.currentDay = todayDayId();
  state.checklistTab = Object.keys(TRIP_DATA.checklist)[0] || 'documents';
  saveTrips();
  renderAll();
}

function addTrip(name, startDate, endDate, budget) {
  var id = makeId('trip');
  var days = [];
  var start = parseDate(startDate);
  var end = parseDate(endDate);
  var diffDays = Math.max(1, Math.round((end - start) / 86400000) + 1);
  for (var i = 0; i < diffDays; i++) {
    var d = new Date(start);
    d.setDate(d.getDate() + i);
    var ds = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    days.push({ id: i + 1, date: ds, city: '', calm: [], active: [] });
  }
  var newTrip = {
    id: id, name: name,
    dates: { start: startDate, end: endDate },
    routeCities: [], totalBudget: Number(budget) || 0,
    categories: deepClone(TRIP_DEMO.categories),
    days: days,
    bookings: [],
    checklist: {
      documents: [{ id: makeId('c'), text: 'Загранпаспорт', checked: false }],
      money: [{ id: makeId('c'), text: 'Банковские карты', checked: false }],
      things: [{ id: makeId('c'), text: 'Солнцезащитный крем', checked: false }],
      health: [{ id: makeId('c'), text: 'Аптечка', checked: false }]
    },
    paceHints: {
      calm: 'Спокойный ритм: немного событий, больше свободного времени.',
      active: 'Насыщенный ритм: плотный день и много впечатлений.'
    }
  };
  ALL_TRIPS.push(newTrip);
  switchTrip(id);
  return newTrip;
}

function deleteTrip(id) {
  if (ALL_TRIPS.length <= 1) {
    showToast('Нельзя удалить последнюю поездку', 'error');
    return;
  }
  var wasActive = TRIP_DATA.id === id;
  ALL_TRIPS = ALL_TRIPS.filter(function (t) { return t.id !== id; });
  if (wasActive) switchTrip(ALL_TRIPS[0].id);
  saveTrips();
}

/* ---------- 3. Состояние приложения ---------- */

const state = {
  currentDay: 1,
  pace: 'calm',
  uiState: 'loading',
  mobileTab: 'today',
  checklistTab: 'documents'
};

/* ---------- 4. Утилиты ---------- */

const $ = function (sel) { return document.querySelector(sel); };
const $$ = function (sel) { return Array.from(document.querySelectorAll(sel)); };

/* Экранирование: названия поездок, событий и задач вводит пользователь,
   а рендер идёт через innerHTML */
function esc(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fmtMoney(n) {
  return (Number(n) || 0).toLocaleString('ru-RU') + ' ₽';
}

function byTime(a, b) {
  return a.time < b.time ? -1 : (a.time > b.time ? 1 : 0);
}

function todayStamp() {
  var d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

/* id дня, который считается «сегодняшним»:
   идёт поездка — текущая дата, поездка впереди — первый день, позади — последний */
function todayDayId() {
  if (!TRIP_DATA || !TRIP_DATA.days.length) return 1;
  var now = todayStamp();
  var match = TRIP_DATA.days.find(function (d) { return d.date === now; });
  if (match) return match.id;
  if (now < TRIP_DATA.days[0].date) return TRIP_DATA.days[0].id;
  return TRIP_DATA.days[TRIP_DATA.days.length - 1].id;
}

function parseDate(str) {
  var parts = str.split('-').map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function fmtDayShort(dateStr) {
  var d = parseDate(dateStr);
  return d.getDate() + ' ' + MONTHS[d.getMonth()].slice(0, 3);
}

function getBooking(id) {
  return TRIP_DATA.bookings.find(function (b) { return b.id === id; });
}

/* Категория может прийти из старых данных и не найтись в справочнике */
function catInfo(cat) {
  return TRIP_DATA.categories[cat] || { label: cat, color: '#B8B2A7' };
}

function getPaceEvents() {
  var day = TRIP_DATA.days.find(function (d) { return d.id === state.currentDay; });
  return day ? day[state.pace] : [];
}

function getBudgetSummary(pace) {
  var byCat = {};
  Object.keys(TRIP_DATA.categories).forEach(function (c) { byCat[c] = 0; });
  var planned = 0;
  TRIP_DATA.days.forEach(function (day) {
    day[pace].forEach(function (ev) {
      var cost = Number(ev.cost) || 0;
      if (byCat[ev.category] === undefined) byCat[ev.category] = 0;
      byCat[ev.category] += cost;
      planned += cost;
    });
  });
  var left = TRIP_DATA.totalBudget - planned;
  return { byCat: byCat, planned: planned, left: left };
}

/* ---------- 5. Сохранение ----------
   Отметки чек-листа, статусы броней, события — всё это поля поездки,
   поэтому отдельных ключей больше нет: одно сохранение на всё.
   ------------------------------------------------------------------ */

function save() {
  saveTrips();
}

/* ---------- 6. Обратный отсчёт ---------- */

function restoreCountdownUnits() {
  var label = $('#countdown-values');
  if (!label) return;
  if (!$('#cd-days')) {
    label.innerHTML =
      '<span class="countdown-unit"><b id="cd-days">–</b><i>дней</i></span>' +
      '<span class="countdown-unit"><b id="cd-hours">–</b><i>часов</i></span>' +
      '<span class="countdown-unit"><b id="cd-mins">–</b><i>минут</i></span>' +
      '<span class="countdown-unit"><b id="cd-secs">–</b><i>секунд</i></span>';
  }
}

function updateCountdown() {
  var target = parseDate(TRIP_DATA.dates.start).getTime();
  var now = Date.now();
  var diff = target - now;
  var label = $('#countdown-values');
  var text = $('#countdown .cover__countdown-label');
  if (diff <= 0) {
    var end = parseDate(TRIP_DATA.dates.end).getTime();
    var finished = now > end;
    label.innerHTML = '<span class="countdown-unit countdown-unit--done"><b>♪</b><i>поездка</i></span>';
    text.textContent = finished ? 'Поездка завершена' : 'Поездка идёт!';
    return;
  }
  restoreCountdownUnits();
  var days = Math.floor(diff / 86400000);
  var hours = Math.floor((diff % 86400000) / 3600000);
  var mins = Math.floor((diff % 3600000) / 60000);
  var secs = Math.floor((diff % 60000) / 1000);
  $('#cd-days').textContent = days;
  $('#cd-hours').textContent = String(hours).padStart(2, '0');
  $('#cd-mins').textContent = String(mins).padStart(2, '0');
  $('#cd-secs').textContent = String(secs).padStart(2, '0');
}

/* ---------- 7. Toast ---------- */

function showToast(msg, type) {
  type = type || 'success';
  var icons = { success: '✓', info: 'ℹ', error: '!' };
  var el = document.createElement('div');
  el.className = 'toast toast--' + type;
  el.innerHTML = '<span class="toast__icon" aria-hidden="true">' + icons[type] + '</span><span>' + esc(msg) + '</span>';
  $('#toast-container').appendChild(el);
  setTimeout(function () {
    el.classList.add('toast--leaving');
    setTimeout(function () { el.remove(); }, 320);
  }, 2600);
}

/* ---------- 8. Рендер: поездка (шапка) ---------- */

function fmtRange(trip) {
  var start = parseDate(trip.dates.start);
  var end = parseDate(trip.dates.end);
  if (start.getMonth() === end.getMonth()) {
    return start.getDate() + '–' + end.getDate() + ' ' + MONTHS[end.getMonth()];
  }
  return start.getDate() + ' ' + MONTHS[start.getMonth()] + ' – ' + end.getDate() + ' ' + MONTHS[end.getMonth()];
}

function renderTripHeader() {
  $('#current-trip-name').textContent = TRIP_DATA.name;
  $('#current-trip-dates').textContent = fmtRange(TRIP_DATA) + ', ' + TRIP_DATA.days.length + ' дней';
}

function renderTripsList() {
  var list = $('#trips-list');
  list.innerHTML = '';
  var svgEdit = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
  var svgDel = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>';
  ALL_TRIPS.forEach(function (trip) {
    var isActive = trip.id === TRIP_DATA.id;
    var card = document.createElement('div');
    card.className = 'trips-list__item' + (isActive ? ' trips-list__item--active' : '');
    var range = fmtRange(trip);
    card.innerHTML =
      '<div class="trips-list__info">' +
        '<h3 class="trips-list__name">' + esc(trip.name) + '</h3>' +
        '<span class="trips-list__meta">' + range + ' · ' + trip.days.length + ' дней</span>' +
      '</div>' +
      '<div class="trips-list__actions">' +
        (isActive ? '<span class="trips-list__badge">Текущая</span>' :
          '<button type="button" class="btn btn--ghost btn--sm" data-trip-switch="' + esc(trip.id) + '">Открыть</button>') +
        '<button type="button" class="trips-list__icon-btn" data-trip-edit="' + esc(trip.id) + '" aria-label="Редактировать «' + esc(trip.name) + '»">' + svgEdit + '</button>' +
        '<button type="button" class="trips-list__icon-btn trips-list__icon-btn--del" data-trip-delete="' + esc(trip.id) + '" aria-label="Удалить «' + esc(trip.name) + '»">' + svgDel + '</button>' +
      '</div>';
    list.appendChild(card);
  });

  list.querySelectorAll('[data-trip-switch]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      switchTrip(btn.dataset.tripSwitch);
      closeModal($('#trips-modal'));
      showToast('Открыта поездка: ' + TRIP_DATA.name, 'info');
    });
  });

  list.querySelectorAll('[data-trip-edit]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var trip = ALL_TRIPS.find(function (t) { return t.id === btn.dataset.tripEdit; });
      if (trip) openTripEditor(trip);
    });
  });

  list.querySelectorAll('[data-trip-delete]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var trip = ALL_TRIPS.find(function (t) { return t.id === btn.dataset.tripDelete; });
      if (!trip) return;
      askConfirm('Удалить поездку «' + trip.name + '»? Все её события, брони и задачи пропадут.', function () {
        deleteTrip(trip.id);
        renderTripsList();
        showToast('Поездка удалена', 'info');
      });
    });
  });
}

/* ---------- 9. Рендер: обложка ---------- */

function renderCover() {
  $('#cover-title').textContent = TRIP_DATA.name;
  $('#cover-dates').textContent = fmtRange(TRIP_DATA);
  $('#cover-days').textContent = TRIP_DATA.days.length + ' дней';
  renderCoverStrip();
  updateCountdown();
}

/* Линия маршрута строится из городов поездки, а не из статичной разметки */
function renderCoverStrip() {
  var strip = $('#cover-strip');
  var cities = TRIP_DATA.routeCities && TRIP_DATA.routeCities.length
    ? TRIP_DATA.routeCities
    : TRIP_DATA.days.map(function (d) { return d.city; }).filter(Boolean);

  /* Соседние повторы схлопываем: три дня в одном городе — одна точка */
  var points = cities.filter(function (city, i) { return i === 0 || city !== cities[i - 1]; });

  if (points.length < 2) { strip.innerHTML = ''; strip.hidden = true; return; }
  strip.hidden = false;

  strip.innerHTML = '<div class="cover__strip-track"></div>' +
    points.map(function (city, i) {
      var mod = i === 0 ? ' cover__strip-dot--start'
        : (i === points.length - 1 ? ' cover__strip-dot--end' : '');
      return '<div class="cover__strip-dot' + mod + '">' +
        '<span class="cover__strip-label">' + esc(city) + '</span></div>';
    }).join('');
}

/* ---------- 10. Рендер: темп путешествия ---------- */

function renderPace() {
  var paceEl = $('.pace');
  paceEl.dataset.pace = state.pace;

  $$('.pace__option').forEach(function (btn) {
    btn.setAttribute('aria-selected', String(btn.dataset.pace === state.pace));
    btn.tabIndex = btn.dataset.pace === state.pace ? 0 : -1;
  });

  var events = getPaceEvents();
  var dayCost = events.reduce(function (s, e) { return s + e.cost; }, 0);
  var summary = getBudgetSummary(state.pace);

  $('#pace-summary').innerHTML =
    '<div class="pace__summary-item">' +
      '<span class="pace__label">Событий в день</span>' +
      '<span class="pace__value" id="pace-events">' + events.length + '</span>' +
    '</div>' +
    '<div class="pace__summary-item">' +
      '<span class="pace__label">Стоимость дня</span>' +
      '<span class="pace__value" id="pace-cost">' + fmtMoney(dayCost) + '</span>' +
    '</div>' +
    '<div class="pace__summary-item">' +
      '<span class="pace__label">Прогноз расходов</span>' +
      '<span class="pace__value" id="pace-forecast">' + fmtMoney(summary.planned) + '</span>' +
    '</div>';

  $('#pace-hint').textContent = TRIP_DATA.paceHints[state.pace];
}

function addTabArrows(wrap, requery) {
  wrap.addEventListener('keydown', function (e) {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].indexOf(e.key) === -1) return;
    var tabs = Array.prototype.slice.call(wrap.querySelectorAll('[role="tab"]'));
    var idx = tabs.indexOf(document.activeElement);
    if (idx === -1) return;
    e.preventDefault();
    var next;
    if (e.key === 'Home') next = tabs[0];
    else if (e.key === 'End') next = tabs[tabs.length - 1];
    else if (e.key === 'ArrowRight') next = tabs[(idx + 1) % tabs.length];
    else next = tabs[(idx - 1 + tabs.length) % tabs.length];
    if (!next) return;
    next.click();
    if (requery) {
      requestAnimationFrame(function () {
        var el = wrap.querySelector(requery(next));
        if (el) el.focus();
      });
    }
  });
}

function bindPace() {
  $$('.pace__option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.pace = btn.dataset.pace;
      renderPace();
      renderRoute();
      renderBudget();
      renderToday();
    });
  });
}

/* ---------- 11. Рендер: маршрут ---------- */

function renderRouteDays() {
  var wrap = $('#route-days');
  wrap.innerHTML = '';
  TRIP_DATA.days.forEach(function (day) {
    var tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'route__day-tab' + (day.id === state.currentDay ? ' route__day-tab--active' : '');
    tab.dataset.day = day.id;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', String(day.id === state.currentDay));
    tab.tabIndex = day.id === state.currentDay ? 0 : -1;
    tab.innerHTML = '<b>День ' + day.id + '</b><i>' + fmtDayShort(day.date) + '</i>';
    tab.addEventListener('click', function () {
      state.currentDay = day.id;
      renderRouteDays();
      renderRoute();
      renderPace();
      renderToday();
    });
    wrap.appendChild(tab);
  });
  updateScrollFade();
}

/* Слушатель прокрутки вешается один раз в init(), а не на каждый рендер дня */
function updateScrollFade() {
  var wrap = $('#route-days-wrap');
  var el = $('#route-days');
  var left = $('#route-fade-left');
  var right = $('#route-fade-right');
  if (!wrap || !el || !left || !right) return;
  var hasScroll = el.scrollWidth > el.clientWidth + 1;
  wrap.classList.toggle('route__days-wrap--scrollable', hasScroll);
  if (!hasScroll) { left.style.opacity = 0; right.style.opacity = 0; return; }
  var maxScroll = el.scrollWidth - el.clientWidth;
  left.style.opacity = Math.min(1, el.scrollLeft / 40);
  right.style.opacity = Math.min(1, (maxScroll - el.scrollLeft) / 40);
}

function eventBadge(ev) {
  if (!ev.bookingId) return '';
  var b = getBooking(ev.bookingId);
  if (!b) return '';
  var confirmed = b.status === 'confirmed';
  return '<span class="badge ' + (confirmed ? 'badge--confirmed' : 'badge--pending') + '">' +
    (confirmed ? 'Подтверждено' : 'Ожидает брони') + '</span>';
}

function isEventCurrent(day, ev) {
  var date = parseDate(day.date);
  var now = new Date();
  if (date.getFullYear() !== now.getFullYear() ||
      date.getMonth() !== now.getMonth() ||
      date.getDate() !== now.getDate()) return false;
  var parts = ev.time.split(':');
  var start = new Date(date);
  start.setHours(+parts[0], +parts[1], 0, 0);
  var end = start.getTime() + 90 * 60000;
  return now >= start && now.getTime() <= end;
}

function currentDayObj() {
  return TRIP_DATA.days.find(function (d) { return d.id === state.currentDay; }) || TRIP_DATA.days[0];
}

function renderTimeline() {
  var day = currentDayObj();
  if (!day) { renderEmpty(); return; }
  var events = day[state.pace].slice().sort(byTime);

  var head = document.createElement('div');
  head.className = 'route__day-head';
  head.innerHTML =
    '<span class="route__day-city">' + esc(day.city || 'День ' + day.id) + '</span>' +
    '<span class="route__day-date">' + fmtDayShort(day.date) + '</span>';

  var list = document.createElement('div');
  list.className = 'timeline';

  events.forEach(function (ev, i) {
    var cat = TRIP_DATA.categories[ev.category];
    var card = document.createElement('article');
    card.className = 'event event--category-' + ev.category;
    if (isEventCurrent(day, ev)) card.classList.add('event--current');
    card.style.animationDelay = (i * 70) + 'ms';
    var costHtml = Number(ev.cost) === 0
      ? '<span class="event__cost event__cost--free">Бесплатно</span>'
      : '<span class="event__cost">' + fmtMoney(ev.cost) + '</span>';
    card.innerHTML =
      '<span class="event__time">' + esc(ev.time) + '</span>' +
      '<div class="event__body">' +
        '<div class="event__title">' + esc(ev.title) + '</div>' +
        '<div class="event__meta">' +
          '<span>' + esc(cat ? cat.label : ev.category) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="event__right">' + eventBadge(ev) + costHtml + '</div>' +
      '<button type="button" class="icon-btn icon-btn--del event__del" ' +
        'data-event-del="' + esc(ev.id) + '" aria-label="Удалить событие «' + esc(ev.title) + '»">' + SVG_TRASH + '</button>';
    card.querySelector('[data-event-del]').addEventListener('click', function () {
      askConfirm('Удалить событие «' + ev.title + '»?', function () { deleteEvent(ev.id); });
    });
    list.appendChild(card);
  });

  $('#route-content').innerHTML = '';
  $('#route-content').appendChild(head);
  $('#route-content').appendChild(list);
}

function renderEmpty() {
  var day = currentDayObj();
  var hasNext = TRIP_DATA.days.length > 1;
  $('#route-content').innerHTML =
    '<div class="state-box">' +
      '<span class="state-box__icon state-box__icon--empty" aria-hidden="true">🌤</span>' +
      '<h3 class="state-box__title">День без событий</h3>' +
      '<p class="state-box__text">' +
        (day ? fmtDayShort(day.date) + ' — на этот день пока ничего не запланировано.'
             : 'В этой поездке пока нет дней.') +
      '</p>' +
      '<div class="state-box__actions">' +
        '<button type="button" class="btn btn--primary" id="empty-add-btn">Добавить событие</button>' +
        (hasNext ? '<button type="button" class="btn btn--ghost" id="next-day-btn">Следующий день</button>' : '') +
      '</div>' +
    '</div>';

  var addBtn = $('#empty-add-btn');
  if (addBtn) addBtn.addEventListener('click', openEventModal);

  var nextBtn = $('#next-day-btn');
  if (nextBtn) nextBtn.addEventListener('click', function () {
    var ids = TRIP_DATA.days.map(function (d) { return d.id; });
    var idx = ids.indexOf(state.currentDay);
    state.currentDay = ids[(idx + 1) % ids.length];
    renderRouteDays();
    renderRoute();
    renderPace();
    showToast('Открыт день ' + state.currentDay, 'info');
  });
}

function renderError() {
  $('#app-error').innerHTML =
    '<div class="state-box app-error__inner">' +
      '<span class="state-box__icon" aria-hidden="true">⚠</span>' +
      '<h3 class="state-box__title">Что-то пошло не так</h3>' +
      '<p class="state-box__text">Не удалось загрузить данные поездки.</p>' +
      '<button type="button" class="btn btn--primary" id="retry-btn">Повторить</button>' +
    '</div>';
  $('#app-error').querySelector('#retry-btn').addEventListener('click', function () {
    setUiState('loading');
    setTimeout(function () { setUiState('success'); }, 1200);
  });
}

function skeletonBlock(kind, count) {
  var n = count || 3;
  var html = '';
  var i;

  if (kind === 'timeline') {
    html = '<div class="route__day-head"><span class="skeleton skeleton--title"></span></div>';
    for (i = 0; i < 4; i++) html += '<div class="skeleton skeleton--line" style="margin-bottom:12px"></div>';
    return html;
  }
  if (kind === 'summary') {
    for (i = 0; i < 3; i++) html += '<div class="skeleton skeleton--sm" style="margin-bottom:10px"></div>';
    return html;
  }
  if (kind === 'checklist') {
    for (i = 0; i < n; i++) html += '<div class="skeleton skeleton--line" style="height:46px;margin-bottom:10px"></div>';
    return html;
  }
  for (i = 0; i < n; i++) html += '<div class="skeleton skeleton--block" style="margin-bottom:12px"></div>';
  return html;
}

function renderLoading() {
  $('#pace-summary').innerHTML = skeletonBlock('summary');
  $('#route-content').innerHTML = skeletonBlock('timeline');

  var chart = $('#budget-chart');
  chart.style.background = 'var(--color-skeleton)';
  chart.querySelector('.budget__chart-center').innerHTML =
    '<span class="skeleton skeleton--title"></span>';
  $('#budget-legend').innerHTML = '<div class="skeleton skeleton--sm" style="margin-bottom:8px"></div><div class="skeleton skeleton--sm" style="margin-bottom:8px"></div><div class="skeleton skeleton--sm"></div>';
  $('#budget-categories').innerHTML = '<div class="skeleton skeleton--sm" style="height:30px;margin-bottom:8px"></div><div class="skeleton skeleton--sm" style="height:30px;margin-bottom:8px"></div><div class="skeleton skeleton--sm" style="height:30px"></div>';

  $('#bookings-list').innerHTML = skeletonBlock('block', 2);

  $('#checklist-tabs').innerHTML =
    '<div class="skeleton skeleton--sm" style="width:230px;height:40px;margin-bottom:14px"></div>';
  $('#checklist-items').innerHTML = skeletonBlock('checklist', 4);
  $('#checklist-progress').innerHTML = '';

  $('#route-skeleton').classList.add('route__days-skeleton--visible');
}

function hideRouteSkeleton() {
  $('#route-skeleton').classList.remove('route__days-skeleton--visible');
}

/* ---------- 12. Рендер: бюджет ---------- */

function renderBudget() {
  var summary = getBudgetSummary(state.pace);
  var planned = summary.planned;
  var left = summary.left;

  $('#budget-total').textContent = fmtMoney(TRIP_DATA.totalBudget);
  $('#budget-planned-row').textContent = fmtMoney(planned);
  $('#budget-left').textContent = fmtMoney(left);

  var budget = Number(TRIP_DATA.totalBudget) || 0;
  var percent = budget > 0 ? Math.min(100, Math.round(planned / budget * 100)) : (planned > 0 ? 100 : 0);
  $('.budget__summary').classList.toggle('budget__summary--over', budget > 0 && left < 0);
  var progressBar = $('#budget-progress-bar');
  progressBar.classList.toggle('budget__progress-bar--over', budget > 0 && left < 0);
  progressBar.style.width = '0%';
  requestAnimationFrame(function () {
    progressBar.style.width = percent + '%';
  });

  var entries = Object.entries(summary.byCat).filter(function (entry) { return entry[1] > 0; });
  var total = entries.reduce(function (s, entry) { return s + entry[1]; }, 0);
  var acc = 0;
  var segments = entries.map(function (entry) {
    var cat = entry[0], v = entry[1];
    var angle = total ? (v / total) * 360 : 0;
    var seg = catInfo(cat).color + ' ' + acc.toFixed(1) + 'deg ' + (acc + angle).toFixed(1) + 'deg';
    acc += angle;
    return seg;
  });

  var chart = $('#budget-chart');
  chart.style.background = segments.length
    ? 'conic-gradient(' + segments.join(', ') + ')'
    : 'conic-gradient(#EDEBE6 0deg)';
  chart.classList.remove('budget__chart--animate');
  void chart.offsetWidth;
  chart.classList.add('budget__chart--animate');

  var center = chart.querySelector('.budget__chart-center');
  center.innerHTML =
    '<span class="budget__chart-total-label">Запланировано</span>' +
    '<span class="budget__chart-total">' + fmtMoney(planned) + '</span>';

  var legend = $('#budget-legend');
  legend.innerHTML = '';
  entries.forEach(function (entry) {
    var cat = catInfo(entry[0]), v = entry[1];
    var item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML =
      '<span class="legend-item__label">' +
        '<span class="legend-item__dot" style="background:' + esc(cat.color) + '"></span>' +
        esc(cat.label) +
      '</span>' +
      '<span class="legend-item__value">' + fmtMoney(v) + '</span>';
    legend.appendChild(item);
  });

  var list = $('#budget-categories');
  list.innerHTML = '';
  entries.forEach(function (entry) {
    var cat = entry[0], v = entry[1];
    var pct = total ? Math.round(v / total * 100) : 0;
    var li = document.createElement('li');
    li.className = 'budget-cat';
    var info = catInfo(cat);
    li.innerHTML =
      '<span class="budget-cat__dot" style="background:' + esc(info.color) + '"></span>' +
      '<span class="budget-cat__name">' + esc(info.label) + '</span>' +
      '<span class="budget-cat__percent">' + pct + '%</span>' +
      '<span class="budget-cat__bar"><span class="budget-cat__bar-fill" data-pct="' + pct + '" ' +
        'style="background:' + esc(info.color) + '"></span></span>';
    list.appendChild(li);
    requestAnimationFrame(function () {
      li.querySelector('.budget-cat__bar-fill').style.width = pct + '%';
    });
  });
}

/* ---------- 13. Рендер: бронирования ---------- */

var BOOKING_TYPE_LABEL = { flight: 'Перелёт', hotel: 'Отель', train: 'Поезд', excursion: 'Экскурсия' };

var SVG_ATTRS = 'viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';

var BOOKING_ICONS = {
  flight:    '<svg ' + SVG_ATTRS + '><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>',
  hotel:     '<svg ' + SVG_ATTRS + '><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01M9 13v.01M9 17v.01"/></svg>',
  train:     '<svg ' + SVG_ATTRS + '><rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><circle cx="8" cy="21" r="1"/><circle cx="16" cy="21" r="1"/><path d="M8 17l-2 4"/><path d="M16 17l2 4"/></svg>',
  excursion: '<svg ' + SVG_ATTRS + '><path d="M2 21l1-7h20l1 7"/><path d="M5 14l7-11 7 11"/><path d="M10 21v-4h4v4"/><path d="M12 3v2"/></svg>'
};

var SVG_TRASH = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>';

function renderBookings() {
  var list = $('#bookings-list');
  list.innerHTML = '';

  if (!TRIP_DATA.bookings.length) {
    list.innerHTML =
      '<div class="state-box state-box--inline">' +
        '<span class="state-box__icon state-box__icon--empty" aria-hidden="true">🎫</span>' +
        '<h3 class="state-box__title">Бронирований пока нет</h3>' +
        '<p class="state-box__text">Добавьте перелёт, отель, поезд или экскурсию.</p>' +
      '</div>';
    return;
  }

  TRIP_DATA.bookings.forEach(function (b) {
    var confirmed = b.status === 'confirmed';
    var card = document.createElement('article');
    card.className = 'booking-card booking-card--type-' + b.type;
    var footerBtn = confirmed
      ? '<span class="badge badge--confirmed">✓ Подтверждено</span>'
      : '<button type="button" class="btn btn--primary btn--sm" data-confirm="' + esc(b.id) + '">Подтвердить</button>';
    card.innerHTML =
      '<div class="booking-card__top">' +
        '<div class="booking-card__icon" aria-hidden="true">' + (BOOKING_ICONS[b.type] || BOOKING_ICONS.excursion) + '</div>' +
        '<div class="booking-card__info">' +
          '<span class="booking-card__type">' + esc(BOOKING_TYPE_LABEL[b.type] || b.type) + '</span>' +
          '<h3 class="booking-card__title">' + esc(b.title) + '</h3>' +
        '</div>' +
        '<button type="button" class="icon-btn icon-btn--del booking-card__del" ' +
          'data-booking-del="' + esc(b.id) + '" aria-label="Удалить бронирование «' + esc(b.title) + '»">' + SVG_TRASH + '</button>' +
      '</div>' +
      '<p class="booking-card__details">' + fmtMoney(b.price) + '</p>' +
      '<div class="booking-card__footer">' +
        '<span class="booking-card__date">' + esc(b.date) + '</span>' +
        footerBtn +
      '</div>';
    var confirmBtn = card.querySelector('[data-confirm]');
    if (confirmBtn) confirmBtn.addEventListener('click', function () { confirmBooking(b.id); });
    card.querySelector('[data-booking-del]').addEventListener('click', function () {
      askConfirm('Удалить бронирование «' + b.title + '»?', function () { deleteBooking(b.id); });
    });
    list.appendChild(card);
  });
}

function confirmBooking(id) {
  var b = getBooking(id);
  if (!b) return;
  b.status = 'confirmed';
  save();
  renderBookings();
  renderRoute();
  renderToday();
  showToast('Бронирование подтверждено: ' + b.title, 'success');
}

function addBooking(data) {
  var booking = {
    id: makeId('bk'),
    type: data.type,
    title: data.title,
    date: data.date,
    price: Number(data.price) || 0,
    status: data.status === 'confirmed' ? 'confirmed' : 'pending'
  };
  TRIP_DATA.bookings.push(booking);
  save();
  renderBookings();
  renderToday();
  showToast('Бронирование добавлено: ' + booking.title, 'success');
  return booking;
}

function deleteBooking(id) {
  var b = getBooking(id);
  if (!b) return;
  TRIP_DATA.bookings = TRIP_DATA.bookings.filter(function (x) { return x.id !== id; });
  /* События теряют ссылку на удалённую бронь, иначе останется «висячий» статус */
  TRIP_DATA.days.forEach(function (day) {
    ['calm', 'active'].forEach(function (pace) {
      day[pace].forEach(function (ev) { if (ev.bookingId === id) ev.bookingId = null; });
    });
  });
  save();
  renderBookings();
  renderRoute();
  renderToday();
  showToast('Бронирование удалено: ' + b.title, 'info');
}

/* ---------- 14. Рендер: чек-лист ---------- */

function checklistCount(cat) {
  var items = TRIP_DATA.checklist[cat];
  var done = items.filter(function (i) { return i.checked; }).length;
  return { done: done, total: items.length };
}

function renderChecklistTabs() {
  var wrap = $('#checklist-tabs');
  wrap.innerHTML = '';
  Object.keys(TRIP_DATA.checklist).forEach(function (cat) {
    var tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'checklist__tab' + (cat === state.checklistTab ? ' checklist__tab--active' : '');
    var count = checklistCount(cat);
    tab.dataset.count = count.total;
    tab.dataset.cat = cat;
    tab.textContent = catLabel(cat);
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', String(cat === state.checklistTab));
    tab.setAttribute('aria-controls', 'checklist-items');
    tab.setAttribute('aria-label', catLabel(cat) + ': выполнено ' + count.done + ' из ' + count.total);
    tab.tabIndex = cat === state.checklistTab ? 0 : -1;
    tab.addEventListener('click', function () {
      state.checklistTab = cat;
      renderChecklistTabs();
      renderChecklistItems();
    });
    wrap.appendChild(tab);
  });
}

function renderChecklistItems() {
  var list = $('#checklist-items');
  var items = TRIP_DATA.checklist[state.checklistTab] || [];
  list.innerHTML = '';
  items.forEach(function (item) {
    var li = document.createElement('li');
    li.className = 'checklist-item' + (item.checked ? ' checklist-item--checked' : '');
    li.dataset.id = item.id;
    li.setAttribute('role', 'checkbox');
    li.setAttribute('aria-checked', String(item.checked));
    li.tabIndex = 0;
    li.innerHTML =
      '<span class="checklist-item__checkbox" aria-hidden="true">✓</span>' +
      '<span class="checklist-item__text">' + esc(item.text) + '</span>' +
      '<button type="button" class="icon-btn icon-btn--del checklist-item__del" ' +
        'data-task-del="' + esc(item.id) + '" aria-label="Удалить задачу «' + esc(item.text) + '»">' + SVG_TRASH + '</button>';
    li.querySelector('[data-task-del]').addEventListener('click', function (e) {
      e.stopPropagation();
      deleteTask(item.id);
    });
    li.addEventListener('click', function () { toggleChecklist(item.id); });
    li.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleChecklist(item.id);
      }
    });
    list.appendChild(li);
  });
}

function renderChecklistProgress() {
  var done = 0, total = 0;
  Object.keys(TRIP_DATA.checklist).forEach(function (cat) {
    var c = checklistCount(cat);
    done += c.done;
    total += c.total;
  });
  $('#checklist-progress').innerHTML =
    'Выполнено <b>' + done + '</b> из <b>' + total + '</b> задач';
}

function toggleChecklist(id) {
  var item = null;
  Object.keys(TRIP_DATA.checklist).forEach(function (cat) {
    TRIP_DATA.checklist[cat].forEach(function (i) { if (i.id === id) item = i; });
  });
  if (!item) return;
  item.checked = !item.checked;
  save();
  renderChecklistItems();
  renderChecklistProgress();
  renderChecklistTabs();
  renderToday();
}

function addCustomTask(text) {
  if (!text.trim()) return;
  var cat = state.checklistTab;
  if (!TRIP_DATA.checklist[cat]) TRIP_DATA.checklist[cat] = [];
  TRIP_DATA.checklist[cat].push({
    id: makeId('c'), text: text.trim(), checked: false
  });
  save();
  renderChecklistItems();
  renderChecklistTabs();
  renderChecklistProgress();
  renderToday();
  showToast('Задача добавлена в «' + catLabel(cat) + '»', 'success');
}

function deleteTask(id) {
  var removed = null;
  Object.keys(TRIP_DATA.checklist).forEach(function (cat) {
    TRIP_DATA.checklist[cat] = TRIP_DATA.checklist[cat].filter(function (i) {
      if (i.id === id) { removed = i; return false; }
      return true;
    });
  });
  if (!removed) return;
  save();
  renderChecklistTabs();
  renderChecklistItems();
  renderChecklistProgress();
  renderToday();
  showToast('Задача удалена: ' + removed.text, 'info');
}

/* Сброс: демонстрационная поездка возвращается к исходным данным целиком,
   собственная поездка теряет только отметки и статусы броней */
function resetChecklist() {
  var isDemo = TRIP_DATA.id === TRIP_DEMO.id;
  var text = isDemo
    ? 'Вернуть демонстрационную поездку «' + TRIP_DEMO.name + '» к исходному виду? Добавленные события, брони и задачи будут удалены.'
    : 'Снять все отметки чек-листа и вернуть брони в статус «Ожидает»?';

  askConfirm(text, function () {
    if (isDemo) {
      var idx = ALL_TRIPS.findIndex(function (t) { return t.id === TRIP_DEMO.id; });
      var fresh = normalizeTrip(deepClone(TRIP_DEMO));
      if (idx === -1) ALL_TRIPS.push(fresh); else ALL_TRIPS[idx] = fresh;
      TRIP_DATA = fresh;
      state.currentDay = todayDayId();
      state.checklistTab = Object.keys(TRIP_DATA.checklist)[0] || 'documents';
    } else {
      Object.keys(TRIP_DATA.checklist).forEach(function (cat) {
        TRIP_DATA.checklist[cat].forEach(function (i) { i.checked = false; });
      });
      TRIP_DATA.bookings.forEach(function (b) { b.status = 'pending'; });
    }
    save();
    renderAll();
    showToast('Учебные данные сброшены', 'info');
  }, 'Сбросить');
}

/* ---------- 15. Рендер: мобильный «Сегодня» ---------- */

function firstUncheckedTask() {
  var cats = Object.keys(TRIP_DATA.checklist);
  for (var i = 0; i < cats.length; i++) {
    var item = TRIP_DATA.checklist[cats[i]].find(function (x) { return !x.checked; });
    if (item) return { item: item, cat: cats[i] };
  }
  return null;
}

/* Блок «Сегодня» показывает реальный сегодняшний день поездки,
   а не тот, что выбран во вкладках маршрута */
function renderToday() {
  var day = TRIP_DATA.days.find(function (d) { return d.id === todayDayId(); });
  if (!day) return;

  var isReallyToday = day.date === todayStamp();
  var events = day[state.pace].slice().sort(byTime);

  /* Ближайшее — первое событие, которое ещё не прошло по часам */
  var upcoming = null;
  if (isReallyToday) {
    var now = new Date();
    var hhmm = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    upcoming = events.find(function (ev) { return ev.time >= hhmm; }) || null;
    $('#today-event-label').textContent = upcoming ? 'Ближайшее событие' : 'События на сегодня закончились';
  } else {
    upcoming = events[0] || null;
    $('#today-event-label').textContent = 'Первое событие дня';
  }

  $('#today-title').textContent = isReallyToday
    ? 'Сегодня'
    : (day.date > todayStamp() ? 'Первый день' : 'Последний день');
  $('#today-date').textContent = fmtDayShort(day.date) + (day.city ? ', ' + day.city : '');

  var statusEl = $('#today-event-status');
  if (upcoming) {
    var cat = TRIP_DATA.categories[upcoming.category];
    $('#today-event-time').textContent = upcoming.time;
    $('#today-event-title').textContent = upcoming.title;
    $('#today-event-place').textContent =
      (day.city ? day.city + ' · ' : '') + (cat ? cat.label : upcoming.category);
    var b = upcoming.bookingId ? getBooking(upcoming.bookingId) : null;
    if (b) {
      statusEl.className = 'badge ' + (b.status === 'confirmed' ? 'badge--confirmed' : 'badge--pending');
      statusEl.textContent = b.status === 'confirmed' ? 'Подтверждено' : 'Ожидает брони';
    } else {
      statusEl.className = 'badge badge--static';
      statusEl.textContent = 'Без брони';
    }
  } else {
    $('#today-event-time').textContent = '––:––';
    $('#today-event-title').textContent = events.length ? 'Все события позади' : 'Свободное время';
    $('#today-event-place').textContent = events.length ? 'можно отдохнуть' : 'запланированных событий нет';
    statusEl.className = 'badge badge--static';
    statusEl.textContent = 'Отдых';
  }

  var task = firstUncheckedTask();
  if (task) {
    $('#today-task-text').textContent = task.item.text;
    $('#today-task-cat').textContent = catLabel(task.cat);
  } else {
    $('#today-task-text').textContent = 'Все задачи выполнены. Можно собираться!';
    $('#today-task-cat').textContent = 'Готово';
  }
}

/* ---------- 16. Состояния интерфейса ---------- */

var ALL_SECTIONS = ['section-trips', 'section-cover', 'section-today', 'section-pace', 'section-route', 'section-budget', 'section-bookings', 'section-checklist'];

function setSectionsHidden(hidden) {
  ALL_SECTIONS.forEach(function (id) { $('#' + id).hidden = hidden; });
}

function setUiState(st) {
  state.uiState = st;
  var errorEl = $('#app-error');
  if (st === 'loading') {
    errorEl.hidden = true;
    errorEl.innerHTML = '';
    setSectionsHidden(false);
    renderLoading();
    applyMobileLayout();
  } else if (st === 'error') {
    setSectionsHidden(true);
    errorEl.hidden = false;
    renderError();
  } else {
    errorEl.hidden = true;
    errorEl.innerHTML = '';
    renderAll();
    hideRouteSkeleton();
  }
}

function renderAll() {
  renderTripHeader();
  renderCover();
  renderRouteDays();
  renderRoute();
  renderPace();
  renderBudget();
  renderBookings();
  renderChecklistTabs();
  renderChecklistItems();
  renderChecklistProgress();
  renderToday();
  applyMobileLayout();
  updateScrollFade();
}

/* Пустое состояние включается само: в выбранном дне нет событий */
function renderRoute() {
  var day = currentDayObj();
  if (!day || !day[state.pace].length) { renderEmpty(); return; }
  renderTimeline();
}

/* ---------- 12b. Редактирование событий ---------- */

function addEvent(data, bothPaces) {
  var day = currentDayObj();
  if (!day) return;
  var paces = bothPaces ? ['calm', 'active'] : [state.pace];
  var evId = makeId('ev');   /* один id на оба темпа — удаление снимает событие целиком */
  paces.forEach(function (pace) {
    day[pace].push({
      id: evId,
      time: data.time,
      title: data.title,
      category: data.category,
      cost: Number(data.cost) || 0,
      bookingId: data.bookingId || null
    });
    day[pace].sort(byTime);
  });
  save();
  renderRouteDays();
  renderRoute();
  renderPace();
  renderBudget();
  renderToday();
  showToast('Событие добавлено: ' + data.title, 'success');
}

function deleteEvent(id) {
  var day = currentDayObj();
  if (!day) return;
  var title = '';
  ['calm', 'active'].forEach(function (pace) {
    day[pace] = day[pace].filter(function (ev) {
      if (ev.id === id) { title = ev.title; return false; }
      return true;
    });
  });
  save();
  renderRoute();
  renderPace();
  renderBudget();
  renderToday();
  showToast(title ? 'Событие удалено: ' + title : 'Событие удалено', 'info');
}

/* ---------- 17. Мобильная навигация ---------- */

function isMobile() {
  return window.matchMedia('(max-width: 600px)').matches;
}

var MOBILE_GROUPS = {
  today:     ['section-today'],
  route:     ['section-pace', 'section-route'],
  budget:    ['section-budget', 'section-bookings'],
  checklist: ['section-checklist']
};

var DESKTOP_SECTIONS = ['section-pace', 'section-route', 'section-budget', 'section-bookings', 'section-checklist'];

function applyMobileLayout() {
  var mobile = isMobile();
  $('#bottom-nav').hidden = !mobile;
  if (state.uiState === 'error') {
    setSectionsHidden(true);
    return;
  }
  $('#section-today').hidden = !mobile;
  if (!mobile) {
    DESKTOP_SECTIONS.forEach(function (id) { $('#' + id).hidden = false; });
    $('#section-trips').hidden = false;
    $('#section-cover').hidden = false;
    return;
  }
  var showToday = state.mobileTab === 'today';
  $('#section-today').hidden = !showToday;
  var group = MOBILE_GROUPS[state.mobileTab] || MOBILE_GROUPS.today;
  DESKTOP_SECTIONS.forEach(function (id) {
    $('#' + id).hidden = !group.includes(id);
  });
}

function bindMobileNav() {
  $$('.bottom-nav__item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.mobileTab = btn.dataset.tab;
      $$('.bottom-nav__item').forEach(function (x) {
        x.classList.toggle('bottom-nav__item--active', x === btn);
      });
      applyMobileLayout();
      updateScrollFade();
      var first = $('#' + MOBILE_GROUPS[state.mobileTab][0]);
      if (first && !first.hidden) {
        first.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  window.addEventListener('resize', function () {
    applyMobileLayout();
    updateScrollFade();
    var active = $('.bottom-nav__item[data-tab="' + state.mobileTab + '"]');
    if (active) {
      $$('.bottom-nav__item').forEach(function (x) {
        x.classList.toggle('bottom-nav__item--active', x === active);
      });
    }
  });
}

/* ---------- 18. Модальные окна ----------
   Общий механизм: Escape, ловушка фокуса, блокировка прокрутки фона,
   возврат фокуса на элемент, который открыл окно.
   ------------------------------------------------------------------ */

var openModals = [];

var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), ' +
  'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function openModal(modal, focusSelector) {
  if (!modal || openModals.indexOf(modal) !== -1) return;
  modal._returnFocus = document.activeElement;
  modal.hidden = false;
  openModals.push(modal);
  document.body.classList.add('is-modal-open');
  var target = focusSelector ? modal.querySelector(focusSelector) : null;
  if (!target) target = modal.querySelector(FOCUSABLE);
  if (target) target.focus();
}

function closeModal(modal) {
  if (!modal) return;
  var idx = openModals.indexOf(modal);
  if (idx !== -1) openModals.splice(idx, 1);
  modal.hidden = true;
  if (!openModals.length) document.body.classList.remove('is-modal-open');
  var back = modal._returnFocus;
  if (back && document.contains(back)) back.focus();
  modal._returnFocus = null;
}

function topModal() {
  return openModals.length ? openModals[openModals.length - 1] : null;
}

function bindModalMechanics() {
  $$('.modal').forEach(function (modal) {
    modal.querySelectorAll('[data-modal-close]').forEach(function (el) {
      el.addEventListener('click', function () { closeModal(modal); });
    });
  });

  document.addEventListener('keydown', function (e) {
    var modal = topModal();
    if (!modal) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal(modal);
      return;
    }

    if (e.key !== 'Tab') return;
    var items = Array.prototype.slice.call(modal.querySelectorAll(FOCUSABLE))
      .filter(function (el) { return el.offsetParent !== null; });
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

/* Своё окно подтверждения вместо системного confirm() */
var confirmAction = null;

function askConfirm(text, onOk, okLabel) {
  confirmAction = onOk;
  $('#confirm-modal-text').textContent = text;
  $('#confirm-modal-ok').textContent = okLabel || 'Удалить';
  openModal($('#confirm-modal'), '#confirm-modal-ok');
}

function bindConfirmModal() {
  $('#confirm-modal-ok').addEventListener('click', function () {
    var action = confirmAction;
    confirmAction = null;
    closeModal($('#confirm-modal'));
    if (action) action();
  });
}

/* ---------- 19. Модалки: поездки ---------- */

function resetTripForm() {
  $('#trip-name-input').value = '';
  $('#trip-start-input').value = '';
  $('#trip-end-input').value = '';
  $('#trip-budget-input').value = '';
  delete $('#modal-submit').dataset.editId;
  $('#new-trip-modal-title').textContent = 'Новая поездка';
  $('#modal-submit').textContent = 'Создать поездку';
}

function openTripEditor(trip) {
  if (trip) {
    $('#trip-name-input').value = trip.name;
    $('#trip-start-input').value = trip.dates.start;
    $('#trip-end-input').value = trip.dates.end;
    $('#trip-budget-input').value = trip.totalBudget || '';
    $('#modal-submit').dataset.editId = trip.id;
    $('#new-trip-modal-title').textContent = 'Редактирование поездки';
    $('#modal-submit').textContent = 'Сохранить изменения';
  } else {
    resetTripForm();
  }
  openModal($('#new-trip-modal'), '#trip-name-input');
}

function bindTripModals() {
  $('#trips-list-btn').addEventListener('click', function () {
    renderTripsList();
    openModal($('#trips-modal'));
  });

  $('#add-trip-btn').addEventListener('click', function () { openTripEditor(null); });

  $('#new-trip-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#trip-name-input').value.trim();
    var start = $('#trip-start-input').value;
    var end = $('#trip-end-input').value;
    var budget = Number($('#trip-budget-input').value);

    if (!name || !start || !end) {
      showToast('Заполните все поля', 'error');
      return;
    }
    if (end < start) {
      showToast('Дата окончания раньше даты начала', 'error');
      return;
    }
    if (!(budget > 0)) {
      showToast('Бюджет должен быть больше нуля', 'error');
      return;
    }

    var editId = $('#modal-submit').dataset.editId;
    if (editId) {
      var trip = ALL_TRIPS.find(function (t) { return t.id === editId; });
      if (trip) {
        trip.name = name;
        trip.dates.start = start;
        trip.dates.end = end;
        trip.totalBudget = budget;
        saveTrips();
        renderTripsList();
        renderTripHeader();
        renderCover();
        renderBudget();
        showToast('Поездка обновлена', 'success');
      }
    } else {
      addTrip(name, start, end, budget);
      showToast('Поездка «' + name + '» создана', 'success');
    }
    resetTripForm();
    closeModal($('#new-trip-modal'));
  });
}

/* ---------- 20. Модалки: события и брони ---------- */

function openEventModal() {
  var day = currentDayObj();
  if (!day) { showToast('В поездке нет дней', 'error'); return; }

  var catSelect = $('#event-category-input');
  catSelect.innerHTML = Object.keys(TRIP_DATA.categories).map(function (key) {
    return '<option value="' + esc(key) + '">' + esc(TRIP_DATA.categories[key].label) + '</option>';
  }).join('');

  var bookSelect = $('#event-booking-input');
  bookSelect.innerHTML = '<option value="">Без брони</option>' +
    TRIP_DATA.bookings.map(function (b) {
      return '<option value="' + esc(b.id) + '">' + esc(b.title) + '</option>';
    }).join('');

  $('#event-form-note').textContent =
    'День ' + day.id + ' · ' + fmtDayShort(day.date) + (day.city ? ' · ' + day.city : '');
  $('#event-title-input').value = '';
  $('#event-cost-input').value = 0;
  $('#event-both-paces').checked = true;

  openModal($('#event-modal'), '#event-title-input');
}

function bindEventModal() {
  $('#add-event-btn').addEventListener('click', openEventModal);

  $('#event-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var title = $('#event-title-input').value.trim();
    var time = $('#event-time-input').value;
    if (!title || !time) {
      showToast('Заполните название и время', 'error');
      return;
    }
    addEvent({
      title: title,
      time: time,
      category: $('#event-category-input').value,
      cost: $('#event-cost-input').value,
      bookingId: $('#event-booking-input').value || null
    }, $('#event-both-paces').checked);
    closeModal($('#event-modal'));
  });
}

function bindBookingModal() {
  $('#add-booking-btn').addEventListener('click', function () {
    $('#booking-title-input').value = '';
    $('#booking-price-input').value = 0;
    $('#booking-date-input').value = '';
    $('#booking-type-input').value = 'flight';
    $('#booking-status-input').value = 'pending';
    openModal($('#booking-modal'), '#booking-title-input');
  });

  $('#booking-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var title = $('#booking-title-input').value.trim();
    var date = $('#booking-date-input').value.trim();
    if (!title || !date) {
      showToast('Заполните название и даты', 'error');
      return;
    }
    addBooking({
      title: title,
      date: date,
      type: $('#booking-type-input').value,
      price: $('#booking-price-input').value,
      status: $('#booking-status-input').value
    });
    closeModal($('#booking-modal'));
  });
}

/* ---------- 20b. Верхняя навигация ----------
   Плавный переход к секции, подсветка активного пункта при прокрутке
   и тень у липкой шапки, когда страницу сдвинули вниз.
   ------------------------------------------------------------------ */

var TOPBAR_SECTIONS = ['section-cover', 'section-pace', 'section-route', 'section-budget', 'section-bookings', 'section-checklist'];

function setActiveTopLink(id) {
  $$('.topbar__link').forEach(function (link) {
    link.classList.toggle('topbar__link--active', link.dataset.nav === id);
  });
}

function bindTopbar() {
  var topbar = $('#topbar');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  $$('.topbar__link, .topbar__brand').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = (link.getAttribute('href') || '').slice(1);
      var target = id && $('#' + id);
      if (!target || target.hidden) return;   /* скрытую секцию не трогаем */
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      if (link.dataset.nav) setActiveTopLink(id);
    });
  });

  /* Заглушка: раздела профиля пока нет */
  $('#topbar-profile').addEventListener('click', function () {
    showToast('Профиль появится позже — сейчас это заглушка', 'info');
  });

  window.addEventListener('scroll', function () {
    topbar.classList.toggle('topbar--stuck', window.scrollY > 8);
  }, { passive: true });

  if (!('IntersectionObserver' in window)) return;

  /* Активным считается самый верхний раздел, попавший в видимую зону
     под шапкой. rootMargin отрезает высоту шапки сверху и нижние 55%
     экрана, чтобы подсветка переключалась ровно по «текущему» блоку. */
  var visible = {};
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      visible[entry.target.id] = entry.isIntersecting;
    });
    var current = TOPBAR_SECTIONS.filter(function (id) { return visible[id]; })[0];
    if (current) setActiveTopLink(current);
  }, { rootMargin: '-80px 0px -55% 0px', threshold: 0 });

  TOPBAR_SECTIONS.forEach(function (id) {
    var el = $('#' + id);
    if (el) observer.observe(el);
  });
}

/* ---------- 21. Инициализация ---------- */

function init() {
  loadTrips();
  state.currentDay = todayDayId();
  state.checklistTab = Object.keys(TRIP_DATA.checklist)[0] || 'documents';

  $$('.bottom-nav__item').forEach(function (x) {
    x.classList.toggle('bottom-nav__item--active', x.dataset.tab === state.mobileTab);
  });

  bindModalMechanics();
  bindConfirmModal();
  bindPace();
  bindMobileNav();
  bindTopbar();
  bindTripModals();
  bindEventModal();
  bindBookingModal();
  $('#checklist-reset').addEventListener('click', resetChecklist);
  $('#route-days').addEventListener('scroll', updateScrollFade);

  addTabArrows($('#route-days'), function (tab) { return '[data-day="' + tab.dataset.day + '"]'; });
  addTabArrows($('.pace__toggle'));
  addTabArrows($('#checklist-tabs'), function (tab) { return '[data-cat="' + tab.dataset.cat + '"]'; });

  $('#checklist-add').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = $('#checklist-add-input');
    addCustomTask(input.value);
    input.value = '';
    input.focus();
  });

  setInterval(updateCountdown, 1000);

  setUiState('loading');
  setTimeout(function () { setUiState('success'); }, 1400);
}

document.addEventListener('DOMContentLoaded', init);
