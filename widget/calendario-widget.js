// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: calendar-alt;

// Calendario Chile y CEPAL · widget para Scriptable (iOS)
// Tamaños: pequeño, mediano y grande en la pantalla de inicio;
// circular, rectangular y en línea en la pantalla bloqueada.
// Al tocar el widget se abre la app web.

const APP_URL = "https://pablocarvallo.github.io/calendario/";

// ---------- Feriados (los mismos de index.html) ----------
const YEAR = 2026;
const CHILE = {
  "01-01": "Año Nuevo",
  "04-03": "Viernes Santo",
  "04-04": "Sábado Santo",
  "05-01": "Día Nacional del Trabajo",
  "05-21": "Día de las Glorias Navales",
  "06-21": "Día Nacional de los Pueblos Indígenas",
  "06-29": "San Pedro y San Pablo",
  "07-16": "Día de la Virgen del Carmen",
  "08-15": "Asunción de la Virgen",
  "09-18": "Independencia Nacional",
  "09-19": "Día de las Glorias del Ejército",
  "10-12": "Encuentro de Dos Mundos",
  "10-31": "Día de las Iglesias Evangélicas y Protestantes",
  "11-01": "Día de Todos los Santos",
  "12-08": "Inmaculada Concepción",
  "12-25": "Navidad"
};
const CEPAL = {
  "01-01": "Año Nuevo",
  "03-20": "Eid al-Fitr",
  "04-03": "Viernes Santo",
  "05-01": "Día Nacional del Trabajo",
  "05-27": "Eid al-Adha",
  "06-29": "San Pedro y San Pablo",
  "09-18": "Independencia Nacional",
  "10-12": "Encuentro de Dos Mundos",
  "12-08": "Inmaculada Concepción",
  "12-25": "Navidad"
};

// ---------- Textos ----------
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const MESES_C = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const DIAS_C = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

// ---------- Colores de la app (claro / oscuro) ----------
const dyn = (light, dark) => Color.dynamic(new Color(light), new Color(dark));
const C = {
  paper: dyn("#FFFFFF", "#17201A"),
  ink: dyn("#1B2620", "#E7EFE9"),
  muted: dyn("#5F6D65", "#97A59C"),
  soft: dyn("#EFF4F0", "#1F2922"),
  line: dyn("#DCE4DE", "#27322B"),
  sageTint: dyn("#D3E5D8", "#2A3D30"),
  chile: dyn("#D9362C", "#FF6B5E"),
  chileInk: dyn("#B32A21", "#FF9F94"),
  chileTint: dyn("#FCDCD7", "#44201C"),
  cepal: dyn("#C77D00", "#F4B740"),
  cepalInk: dyn("#8A5000", "#F6C766"),
  cepalDot: dyn("#EFA51B", "#F4B740"),
  cepalTint: dyn("#FCEDC7", "#3B2D10")
};

// ---------- Tipografías del sistema ----------
const F = {
  num: s => new Font("AvenirNextCondensed-Heavy", s),
  bold: s => new Font("AvenirNext-Bold", s),
  demi: s => new Font("AvenirNext-DemiBold", s),
  medium: s => new Font("AvenirNext-Medium", s)
};

// ---------- Fechas y feriados ----------
const pad = n => String(n).padStart(2, "0");
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const ymd = (y, m, d) => new Date(y, m, d);
const add = (d, n) => ymd(d.getFullYear(), d.getMonth(), d.getDate() + n);
const keyOf = d => pad(d.getMonth() + 1) + "-" + pad(d.getDate());
const daysBetween = (a, b) => Math.round((b - a) / 864e5);

// kind: color de la fecha (los domingos van en rojo). tag: feriado con nombre, que se indica en texto.
function info(d) {
  const dow = d.getDay();
  const known = d.getFullYear() === YEAR;
  const k = keyOf(d);
  const chileName = known ? CHILE[k] || null : null;
  const cepalName = known ? CEPAL[k] || null : null;
  const red = !!chileName || dow === 0;
  const kind = red && cepalName ? "both" : red ? "chile" : cepalName ? "cepal" : "none";
  const tag = chileName && cepalName ? "both" : chileName ? "chile" : cepalName ? "cepal" : null;
  return { dow, kind, tag, name: chileName || cepalName };
}

function label(i) {
  if (i.tag === "both") return "Feriado Chile y CEPAL";
  if (i.tag === "chile") return "Feriado Chile";
  if (i.tag === "cepal") return "Feriado CEPAL";
  return "";
}

function nextHoliday(d) {
  for (let x = add(d, 1); x.getFullYear() === YEAR; x = add(x, 1)) if (info(x).tag) return x;
  return null;
}

function nextText(d, long) {
  const n = nextHoliday(d);
  if (!n) return d.getFullYear() === YEAR ? "No quedan feriados en " + YEAR : "Faltan los feriados de " + d.getFullYear();
  const diff = daysBetween(d, n);
  if (!long) return "Próx. feriado: " + DIAS_C[n.getDay()] + " " + n.getDate() + " " + MESES_C[n.getMonth()];
  return "Próximo feriado: " + DIAS[n.getDay()] + " " + n.getDate() + " de " + MESES[n.getMonth()] + ", " + (diff === 1 ? "mañana" : "en " + diff + " días");
}

const numColor = k => (k === "cepal" ? C.cepal : k === "none" ? C.ink : C.chile);
const numShadow = k => (k === "chile" ? C.chileTint : k === "none" ? C.sageTint : C.cepalTint);
const tagInk = t => (t === "cepal" ? C.cepalInk : C.chileInk);
const tagTint = t => (t === "cepal" ? C.cepalTint : C.chileTint);

// ---------- Piezas del widget ----------
function text(parent, str, font, color, lines = 1, scale = 0.6) {
  const t = parent.addText(str);
  t.font = font;
  t.textColor = color;
  t.lineLimit = lines;
  t.minimumScaleFactor = scale;
  return t;
}

// Fila horizontal; align: "center", "left" o "right"
function row(parent, align, build) {
  const r = parent.addStack();
  r.layoutHorizontally();
  r.centerAlignContent();
  if (align !== "left") r.addSpacer();
  build(r);
  if (align !== "right") r.addSpacer();
  return r;
}

function bigNumber(parent, d, i, size) {
  row(parent, "center", r => {
    const t = text(r, String(d.getDate()), F.num(size), numColor(i.kind), 1, 0.5);
    t.shadowColor = numShadow(i.kind);
    t.shadowRadius = 0;
    t.shadowOffset = new Point(Math.round(size * 0.05), Math.round(size * 0.045));
  });
}

function chip(parent, i, size) {
  const c = parent.addStack();
  c.layoutHorizontally();
  c.centerAlignContent();
  c.setPadding(size * 0.35, size * 0.8, size * 0.35, size * 0.9);
  c.cornerRadius = size;
  c.backgroundColor = tagTint(i.tag);
  const dots = i.tag === "both" ? [C.chile, C.cepalDot] : [i.tag === "cepal" ? C.cepalDot : C.chile];
  for (const color of dots) text(c, "●", Font.systemFont(size * 0.62), color, 1, 1);
  c.addSpacer(size * 0.4);
  text(c, label(i), F.demi(size), tagInk(i.tag), 1, 0.6);
  return c;
}

// Hoja del día: mes, día de la semana, número grande y feriado
function daySheet(parent, d, o) {
  const i = info(d);
  const col = parent.addStack();
  col.layoutVertically();
  row(col, "center", r => text(r, MESES[d.getMonth()].toUpperCase(), F.bold(o.month), C.ink));
  row(col, "center", r => text(r, cap(DIAS[i.dow]), F.medium(o.weekday), C.muted));
  bigNumber(col, d, i, o.num);
  if (i.tag) {
    row(col, "center", r => chip(r, i, o.chip));
    if (o.name) {
      col.addSpacer(o.gap || 4);
      row(col, "center", r => text(r, i.name, F.demi(o.name), C.ink, 2, 0.7).centerAlignText());
    }
  } else if (o.next) {
    row(col, "center", r => text(r, nextText(d, o.long), F.medium(o.next), C.muted, 2, 0.7).centerAlignText());
  }
  return col;
}

// Tarjeta del día anterior o siguiente
function neighborCard(parent, d, size, align) {
  const i = info(d);
  const c = parent.addStack();
  c.layoutHorizontally();
  c.centerAlignContent();
  c.backgroundColor = C.soft;
  c.cornerRadius = size * 0.55;
  c.setPadding(size * 0.28, size * 0.45, size * 0.28, size * 0.5);
  if (align === "right") c.addSpacer();
  const n = text(c, String(d.getDate()), F.num(size), numColor(i.kind), 1, 0.7);
  c.addSpacer(size * 0.3);
  const t = c.addStack();
  t.layoutVertically();
  text(t, cap(DIAS[i.dow]), F.demi(size * 0.42), C.muted, 1, 0.7);
  const lb = label(i);
  if (lb) text(t, lb, F.demi(size * 0.4), tagInk(i.tag), 1, 0.6);
  if (align !== "right") c.addSpacer();
  return c;
}

// ---------- Tamaños ----------
function small(w, d) {
  w.setPadding(10, 10, 10, 10);
  daySheet(w, d, { month: 12, weekday: 12, num: 58, chip: 10, next: 9.5 });
}

function medium(w, d) {
  w.setPadding(12, 14, 12, 12);
  const i = info(d);
  const h = w.addStack();
  h.layoutHorizontally();
  h.centerAlignContent();
  const left = daySheet(h, d, { month: 12, weekday: 12, num: 62, chip: 10 });
  left.size = new Size(140, 0);
  h.addSpacer(10);
  const right = h.addStack();
  right.layoutVertically();
  row(right, "left", r => {
    if (i.tag) text(r, i.name, F.demi(12), C.ink, 2, 0.7);
    else text(r, nextText(d, true), F.medium(11), C.muted, 2, 0.7);
  });
  right.addSpacer();
  neighborCard(right, add(d, -1), 24);
  right.addSpacer(6);
  neighborCard(right, add(d, 1), 24);
}

function large(w, d) {
  w.setPadding(16, 16, 16, 16);
  w.addSpacer();
  daySheet(w, d, { month: 20, weekday: 18, num: 118, chip: 14, name: 16, gap: 6, next: 13, long: true });
  w.addSpacer();
  const rule = w.addStack();
  rule.layoutHorizontally();
  rule.backgroundColor = C.line;
  rule.size = new Size(0, 1.5);
  rule.addSpacer();
  w.addSpacer(12);
  const nb = w.addStack();
  nb.layoutHorizontally();
  neighborCard(nb, add(d, -1), 30, "left");
  nb.addSpacer(10);
  neighborCard(nb, add(d, 1), 30, "right");
}

function circular(w, d) {
  const i = info(d);
  w.addAccessoryWidgetBackground = true;
  w.setPadding(2, 2, 2, 2);
  row(w, "center", r => text(r, DIAS_C[i.dow].toUpperCase(), F.bold(10), Color.white()));
  row(w, "center", r => text(r, String(d.getDate()), F.num(26), Color.white(), 1, 0.7));
  if (i.tag) row(w, "center", r => text(r, "FERIADO", F.bold(7), Color.white()));
}

function rectangular(w, d) {
  const i = info(d);
  w.setPadding(0, 0, 0, 0);
  row(w, "left", r => text(r, cap(DIAS[i.dow]) + " " + d.getDate() + " de " + MESES[d.getMonth()], F.bold(14), Color.white(), 1, 0.7));
  if (i.tag) {
    row(w, "left", r => text(r, label(i), F.demi(12), Color.white(), 1, 0.7));
    row(w, "left", r => text(r, i.name, F.medium(12), Color.white(), 1, 0.7));
  } else {
    row(w, "left", r => text(r, nextText(d, false), F.medium(12), Color.white(), 2, 0.7));
  }
}

function inline(w, d) {
  const i = info(d);
  const head = cap(DIAS_C[i.dow]) + " " + d.getDate() + " " + MESES_C[d.getMonth()];
  const tail = i.tag ? label(i) : nextText(d, false).replace("Próx. feriado:", "próx. feriado");
  w.addText(head + " · " + tail);
}

// ---------- Armar y mostrar ----------
const now = new Date();
const today = ymd(now.getFullYear(), now.getMonth(), now.getDate());
const family = config.widgetFamily || "medium";

const w = new ListWidget();
w.url = APP_URL;
w.refreshAfterDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 1);
if (!family.startsWith("accessory")) w.backgroundColor = C.paper;

if (family === "small") small(w, today);
else if (family === "large" || family === "extraLarge") large(w, today);
else if (family === "accessoryCircular") circular(w, today);
else if (family === "accessoryRectangular") rectangular(w, today);
else if (family === "accessoryInline") inline(w, today);
else medium(w, today);

if (config.runsInWidget) {
  Script.setWidget(w);
} else {
  await w.presentMedium();
}
Script.complete();
