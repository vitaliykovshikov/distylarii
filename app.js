const $ = (id) => document.getElementById(id);
const panels = [...document.querySelectorAll(".panel")];
const tabs = [...document.querySelectorAll(".tab")];
const finalDrinkOptions = [...document.querySelectorAll(".final-drink-option")];
const methodOptions = [...document.querySelectorAll(".method-option")];
const introItems = [...document.querySelectorAll(".intro-item[data-intro-tab]")];
const workspace = document.querySelector(".workspace");
const resultAside = document.querySelector(".result");
const themeToggle = $("themeToggle");
const themeIcon = $("themeIcon").querySelector("use");
const settingsOpen = $("settingsOpen");
const settingsClose = $("settingsClose");
const settingsModal = $("settingsModal");
const printOpen = $("printOpen");
const printClose = $("printClose");
const printCancel = $("printCancel");
const printBuild = $("printBuild");
const printModal = $("printModal");
const efficiencyModal = $("efficiencyModal");
const efficiencyClose = $("efficiencyClose");
const efficiencyDetails = $("efficiencyDetails");
const formula = $("formula");
const formulaToggle = $("formulaToggle");
const formulaBody = $("formulaBody");
const calcEfficiencyOpen = $("calcEfficiencyOpen");
const actualEfficiencyOpen = $("actualEfficiencyOpen");
const languageToggle = $("languageToggle");
const homeOpen = $("homeOpen");
let activeTab = null;
let activeFinalDrink = "gin";
let currentLang = localStorage.getItem("distillery-lang") || "uk";
let transferRawVolume = 0;
let transferRawAbv = 30;
let transferProductVolume = 0;
let transferProductAbv = 96;
let myRawVolumeValue = 0;
let myProductVolumeValue = 0;
let myFinalVolumeValue = 0;

const enText = {
  "Дистилярій": "Distillarium",
  "дистилярій": "distillarium",
  "Калькулятор для браги, сирцю, розбавлення та оцінки спирту в кубі. Значення орієнтовні, з відкритими коефіцієнтами.": "Calculator for mash, low wines, dilution and boiler alcohol estimation. Values are approximate, with open coefficients.",
  "Розрахункова ефективність": "Calculated efficiency",
  "Фактична ефективність": "Actual efficiency",
  "Подробиці ефективності": "Efficiency details",
  "На головну": "Home",
  "калібрування: 20 °C": "calibration: 20 °C",
  "Вихід сирцю": "Low-wine yield",
  "Ректифікація": "Rectification",
  "Фінальний продукт": "Final product",
  "Розбавлення": "Dilution",
  "Спирт у кубі": "Boiler alcohol",
  "Розрахунок виходу сирцю з сировини": "Low-wine yield from raw material",
  "З чого почати": "Where to start",
  "Оцінює потенційний абсолютний спирт із сировини та орієнтовний об'єм сирцю потрібної міцності.": "Estimates potential absolute alcohol from raw material and the expected low-wine volume at the chosen strength.",
  "Рахує голови, хвости й тіло після відсікання з урахуванням міцності сирцю та температурної поправки.": "Calculates heads, tails and hearts after cuts, accounting for low-wine strength and temperature correction.",
  "Переводить ректифікат у вибраний напій, враховуючи міцність, хвости та нетоварний відбір для джину.": "Converts rectified spirit into the selected drink, accounting for strength, tails and the non-saleable gin cut.",
  "У шапці показується розрахункова ефективність усього ланцюжка, а фактична з'явиться після введення реального об'єму в одному з етапів.": "The header shows the calculated efficiency of the whole chain, while actual efficiency appears after you enter a real volume in one of the stages.",
  "Сировина": "Raw material",
  "Цукор": "Sugar",
  "Борошно": "Flour",
  "Маса сировини, кг": "Raw material mass, kg",
  "Маса сировини": "Raw material mass",
  "База виходу": "Yield basis",
  "Міцність очікуваного сирцю, %": "Expected low-wine ABV, %",
  "Вміст цукру або крохмалю та базовий коефіцієнт виходу беруться з глобальних налаштувань обладнання.": "Sugar or starch content and the base yield coefficient are taken from global equipment settings.",
  "Об'єм сирцю, л": "Low-wine volume, L",
  "Показ спиртометра, %": "Alcoholmeter reading, %",
  "Температура проби, °C": "Sample temperature, °C",
  "Міцність продукту після ректифікації, %": "Product ABV after rectification, %",
  "Голови, % від АС": "Heads, % of AA",
  "Хвости, % від АС": "Tails, % of AA",
  "Температурна поправка є наближенням: для теплого зразка фактичну міцність зменшуємо приблизно на 0.3 % об. за кожен градус вище 20 °C.": "Temperature correction is approximate: for a warm sample, reduce actual ABV by about 0.3 percentage points for each degree above 20 °C.",
  "Вибір фінального продукту": "Final product selection",
  "Джин 42%": "Gin 42%",
  "Сирець 30%": "Low wine 30%",
  "Дистилят 65%": "Distillate 65%",
  "Напій 40%": "Drink 40%",
  "Спирт 96%": "Spirit 96%",
  "Об'єм ректифікату, л": "Rectified spirit volume, L",
  "Міцність ректифікату, %": "Rectified spirit ABV, %",
  "Нетоварний відбір джину, % від АС": "Non-saleable gin cut, % of AA",
  "Розрахунок переводить об'єм після ректифікації у вибраний фінальний продукт з урахуванням хвостів і нетоварного відбору.": "The calculation converts rectified volume into the selected final product, accounting for tails and non-saleable cut.",
  "Розбавлення водою": "Dilution with water",
  "Початковий об'єм, л": "Initial volume, L",
  "Початкова міцність, %": "Initial ABV, %",
  "Бажана міцність, %": "Target ABV, %",
  "Стискання суміші, % від доданої води": "Mixture contraction, % of added water",
  "Класичний розрахунок C1 x V1 = C2 x V2 не враховує повністю контракцію спирт-водної суміші, тому для точного доведення міцності фінальне коригування краще робити після відстоювання і виміру при 20 °C.": "The classic C1 x V1 = C2 x V2 calculation does not fully account for alcohol-water contraction, so final proof correction is best done after resting and measuring at 20 °C.",
  "Вміст спирту в кубі за температурою кипіння": "Boiler alcohol by boiling temperature",
  "Температура в кубі, °C": "Boiler temperature, °C",
  "Атмосферний тиск, мм рт. ст.": "Atmospheric pressure, mmHg",
  "Оцінка побудована на інтерполяції таблиці кипіння водно-спиртової суміші при 760 мм рт. ст. Поправка на тиск приблизна: нижчий тиск знижує температуру кипіння.": "The estimate uses interpolation of a water-alcohol boiling table at 760 mmHg. Pressure correction is approximate: lower pressure lowers boiling temperature.",
  "Налаштування обладнання": "Equipment settings",
  "Загальні налаштування": "General settings",
  "Діаметр колони, мм": "Column diameter, mm",
  "Висота насадкової частини, см": "Packed section height, cm",
  "Метод перегону": "Distillation method",
  "Простий перегін": "Pot still",
  "Колона з укріпленням": "Column with strengthening",
  "База виходу з крохмалю": "Starch yield basis",
  "0.718 - теоретичний максимум": "0.718 - theoretical maximum",
  "0.61 - хороший реальний": "0.61 - good real-world",
  "0.56 - середній побутовий": "0.56 - average home process",
  "0.46 - обережний": "0.46 - conservative",
  "Вміст цукру в цукрі, %": "Sugar content in sugar, %",
  "Крохмаль у борошні, %": "Starch in flour, %",
  "Вплив на розрахунки": "Affects calculations",
  "Корисний відбір": "Useful cut",
  "Втрати перегону": "Distillation losses",
  "Міцність продукту": "Product ABV",
  "Крохмаль": "Starch",
  "Це не заміна реальних режимів перегону. Якщо увімкнено вплив на розрахунки, профіль і параметри обладнання дають м'яку поправку там, де це можливо.": "This is not a replacement for real distillation regimes. If calculation impact is enabled, the profile and equipment parameters apply a soft correction where possible.",
  "Результат": "Result",
  "Формула": "Formula",
  "Перевіряйте місцеві правила виробництва алкоголю і використовуйте калькулятор як технологічну підказку, а не як лабораторну таблицю.": "Check local alcohol-production laws and use the calculator as a technical aid, not as a laboratory table.",
  "Надрукувати": "Print",
  "Друк звіту": "Print report",
  "Обладнання": "Equipment",
  "Скасувати": "Cancel",
  "Сформувати": "Build",
  "Потенційний абсолютний спирт": "Potential absolute alcohol",
  "Фактичний об'єм, л": "Actual volume, L",
  "Співпадіння з очікуваним": "Match with expected",
  "Голови": "Heads",
  "Хвости": "Tails",
  "Тіло після відсікання": "Hearts after cuts",
  "АС після ректифікації": "AA after rectification",
  "Потенційний АС": "Potential AA",
  "Абсолютний спирт": "Absolute alcohol",
  "Вміст цукру/крохмалю": "Sugar/starch content",
  "Базовий максимум": "Base maximum",
  "Об'єм ректифікату": "Rectified spirit volume",
  "Об'єм фінального продукту": "Final product volume",
  "Продукт": "Product",
  "Початковий об'єм": "Initial volume",
  "Початкова міцність": "Initial ABV",
  "Бажана міцність": "Target ABV",
  "Температура в кубі": "Boiler temperature",
  "Атмосферний тиск": "Atmospheric pressure",
  "Температура до 760 мм": "Temperature at 760 mmHg",
  "Оцінка спирту в рідині": "Estimated alcohol in liquid",
  "Діаметр колони": "Column diameter",
  "Висота насадкової частини": "Packed section height",
  "Вміст цукру": "Sugar content",
  "Вплив на ректифікацію": "Affects rectification",
  "Орієнтовний корисний відбір": "Estimated useful cut",
  "Орієнтовні втрати перегону": "Estimated distillation losses",
  "Орієнтовна міцність продукту": "Estimated product ABV",
  "джині": "gin",
  "сирцю": "low wine",
  "дистиляту": "distillate",
  "напою": "drink",
  "спирту": "spirit",
  "Нетоварний відбір джину": "Non-saleable gin cut",
  "Додати води": "Add water",
  "Фінальний об'єм без контракції": "Final volume without contraction",
  "Оцінка об'єму після стискання": "Estimated volume after contraction",
  "Можлива міцність після стискання": "Possible ABV after contraction",
  "Оцінка спирту в рідині куба": "Estimated alcohol in boiler liquid",
  "Температура, приведена до 760 мм": "Temperature adjusted to 760 mmHg",
  "Груба оцінка спирту в парі": "Rough vapor alcohol estimate",
  "Діапазон довіри": "Confidence range",
  "орієнтовний": "approximate",
  "Потенціал сировини": "Raw material potential",
  "АС для порівняння": "AA used for comparison",
  "Ректифікат у розрахунку": "Rectified spirit in calculation",
  "Що потрібно": "Needed",
  "Фінальний продукт у розрахунку": "Final product in calculation",
  "Відсікання у фінальному продукті": "Final product cuts",
  "Де просідає": "Where it drops",
  "Розрахунок": "Calculation",
  "Поки немає фактичних даних": "No actual data yet",
  "Фактична ефективність з'явиться після введення хоча б одного фактичного об'єму.": "Actual efficiency appears after entering at least one actual volume.",
  "введіть фактичний об'єм у сирці, ректифікації або фінальному продукті": "enter an actual volume in low-wine yield, rectification or final product",
  "увімкнено": "enabled",
  "вимкнено": "disabled",
  "так": "yes",
  "ні": "no",
  "не вказано": "not specified"
};

const enAttributes = {
  "Обладнання": "Equipment",
  "Загальні налаштування": "General settings",
  "Перемкнути тему": "Toggle theme",
  "English language": "Українська мова",
  "Світла тема": "Light theme",
  "Темна тема": "Dark theme",
  "увімкнено": "enabled",
  "вимкнено": "disabled",
  "так": "yes",
  "ні": "no",
  "не вказано": "not specified",
  "Закрити налаштування": "Close settings",
  "Закрити друк": "Close print",
  "Закрити подробиці": "Close details",
  "Частка абсолютного спирту, яку плануєте відокремити як головну фракцію. Типово це кілька відсотків від АС у сирці.": "The share of absolute alcohol you plan to separate as heads. Typically a few percent of AA in the low wines.",
  "Частка абсолютного спирту, яку не беремо в основний продукт через хвостові фракції або зупинку відбору.": "The share of absolute alcohol not taken into the main product because of tails or stopping the cut.",
  "Коли спирт змішується з водою, фінальний об'єм стає трохи меншим за просту суму об'ємів. Це і є контракція, або стискання суміші.": "When alcohol is mixed with water, the final volume is slightly smaller than the simple sum. This is contraction.",
  "Ефективність процесу": "Process efficiency",
  "Розділи калькулятора": "Calculator sections",
  "Додаткові інструменти": "Additional tools",
  "На головну": "Home"
};

const originalText = new WeakMap();
const originalAttrs = new WeakMap();

function translateText(text) {
  if (currentLang !== "en") return text;
  if (enText[text]) return enText[text];
  const rawMatch = text.match(/^Орієнтовний об'єм (.+) сирцю$/);
  if (rawMatch) return `Estimated ${rawMatch[1]} low-wine volume`;
  const finalMatch = text.match(/^Об'єм фінального продукту (.+)$/);
  if (finalMatch) return `Final product volume ${finalMatch[1]}`;
  return text;
}

function translateAttribute(value) {
  return currentLang === "en" ? enAttributes[value] || enText[value] || value : value;
}

function applyTranslations(root = document.body) {
  document.documentElement.lang = currentLang;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "SVG"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest("#languageToggle")) return NodeFilter.FILTER_REJECT;
      if (parent.closest("#calcEfficiencyValue, #actualEfficiencyValue")) return NodeFilter.FILTER_REJECT;
      return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (!originalText.has(node)) originalText.set(node, node.textContent);
    const base = originalText.get(node);
    const trimmed = base.trim();
    const translated = translateText(trimmed);
    node.textContent = base.replace(trimmed, translated);
  });

  root.querySelectorAll?.("[aria-label], [title], [data-tip]").forEach((element) => {
    ["aria-label", "title", "data-tip"].forEach((attr) => {
      if (!element.hasAttribute(attr)) return;
      const key = `${attr}:${element.getAttribute(attr)}`;
      if (!originalAttrs.has(element)) originalAttrs.set(element, {});
      const attrs = originalAttrs.get(element);
      if (!attrs[attr]) attrs[attr] = element.getAttribute(attr);
      element.setAttribute(attr, translateAttribute(attrs[attr]));
    });
  });

  languageToggle.textContent = currentLang === "uk" ? "EN" : "UK";
  languageToggle.setAttribute("aria-label", currentLang === "uk" ? "English language" : "Українська мова");
  languageToggle.title = currentLang === "uk" ? "English language" : "Українська мова";
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("distillery-theme", theme);
  const isDark = theme === "dark";
  const title = isDark ? "Світла тема" : "Темна тема";
  themeIcon.setAttribute("href", isDark ? "#icon-sun" : "#icon-moon");
  themeToggle.title = translateAttribute(title);
  themeToggle.setAttribute("aria-label", translateAttribute("Перемкнути тему"));
}

setTheme(localStorage.getItem("distillery-theme") || "dark");

const defaults = {
  sugar: { extract: 100, efficiency: 88, label: "цукру", yield: 0.681 },
  flour: { extract: 70, efficiency: 78, label: "крохмалю", yield: 0.718 }
};

const starchYieldProfiles = {
  theory: { value: 0.718, label: "теоретичний максимум" },
  good: { value: 0.61, label: "хороший реальний" },
  average: { value: 0.56, label: "середній побутовий" },
  weak: { value: 0.46, label: "обережний" }
};

const drinks = {
  gin: { label: "джині", abv: 42 },
  raw: { label: "сирцю", abv: 30 },
  distillate: { label: "дистиляту", abv: 65 },
  vodka: { label: "напою", abv: 40 },
  spirit: { label: "спирту", abv: 96 }
};

const boilingTable = [
  [0, 100.0], [5, 96.2], [7.74, 94.0], [10, 93.5], [15, 91.3], [20, 89.4],
  [25, 87.8], [30, 86.4], [35, 85.2], [40, 84.1], [45, 83.2],
  [50, 82.4], [55, 81.8], [60, 81.2], [65, 80.7], [70, 80.3],
  [75, 79.9], [80, 79.5], [85, 79.1], [90, 78.8], [95, 78.4],
  [97, 78.3]
];

function n(id) {
  const element = $(id);
  const value = Number(element?.value);
  return Number.isFinite(value) ? value : 0;
}

function nf(id, fallback) {
  const element = $(id);
  const value = Number(element?.value);
  const attrValue = Number(element?.getAttribute("value"));
  if (Number.isFinite(value) && value > 0) return value;
  if (Number.isFinite(attrValue) && attrValue > 0) return attrValue;
  return fallback;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function fmt(value, digits = 2, suffix = "") {
  if (!Number.isFinite(value)) return "—";
  const localizedSuffix = currentLang === "en"
    ? suffix.replaceAll(" л", " L").replaceAll(" АС", " AA").replaceAll(" об.", " vol.").replaceAll(" мм рт. ст.", " mmHg")
    : suffix;
  return `${value.toLocaleString(currentLang === "en" ? "en-US" : "uk-UA", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  })}${localizedSuffix}`;
}

function metric(row) {
  const [label, value, action, icon = "icon-percent", variant = ""] = row;
  if (variant === "subhead") {
    return `<div class="metric-subhead">${label}</div>`;
  }
  if (variant === "field") {
    const actionIcons = {
      "send-raw-actual": ["<path d=\"M9 2h6\"></path><path d=\"M10 2v6l-5.5 9.5A3 3 0 0 0 7.1 22h9.8a3 3 0 0 0 2.6-4.5L14 8V2\"></path><path d=\"M7.5 16h9\"></path>", "На ректифікацію"],
      "send-final-actual": ["<path d=\"M10 2h4\"></path><path d=\"M11 2v5l-3 3v9a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-9l-3-3V2\"></path><path d=\"M9 14h6\"></path>", "На фінальний продукт"]
    };
    const button = icon && actionIcons[icon] ? `<button class="metric-action" type="button" data-action="${icon}" aria-label="${actionIcons[icon][1]}" title="${actionIcons[icon][1]}"><span class="arrow">→</span><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${actionIcons[icon][0]}</svg></button>` : "";
    return `<label class="metric-field"><span>${label}</span><input id="${action}" type="text" inputmode="decimal" value="${value}">${button}</label>`;
  }
  const actionIcons = {
    "send-raw": ["<path d=\"M9 2h6\"></path><path d=\"M10 2v6l-5.5 9.5A3 3 0 0 0 7.1 22h9.8a3 3 0 0 0 2.6-4.5L14 8V2\"></path><path d=\"M7.5 16h9\"></path>", "На ректифікацію"],
    "send-final": ["<path d=\"M10 2h4\"></path><path d=\"M11 2v5l-3 3v9a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-9l-3-3V2\"></path><path d=\"M9 14h6\"></path>", "На фінальний продукт"],
    "send-dilute": ["<path d=\"M12 2.5 6.5 10A7 7 0 1 0 17.5 10L12 2.5z\"></path>", "На розбавлення"]
  };
  const actionButton = action ? `<button class="metric-action" type="button" data-action="${action}" aria-label="${actionIcons[action][1]}" title="${actionIcons[action][1]}"><span class="arrow">→</span><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${actionIcons[action][0]}</svg></button>` : "";
  const className = variant === "primary" ? `metric primary${action ? " has-action" : ""}` : `metric${variant ? ` ${variant}` : ""}`;
  return `<div class="${className}"><svg class="icon"><use href="#${icon}"></use></svg><span>${label}</span><strong>${value}</strong>${actionButton}</div>`;
}

function setResult(rows, formulaText) {
  workspace.classList.remove("start-screen");
  resultAside.hidden = false;
  $("metrics").innerHTML = rows.map(metric).join("");
  formulaBody.textContent = formulaText;
  applyTranslations($("metrics"));
  applyTranslations(formula);
}

function correctedAbv(reading, temp) {
  return clamp(reading - ((temp - 20) * 0.3), 0, 100);
}

function efficiencyMood(value) {
  if (value < 70) return "☹";
  if (value < 85) return "●";
  return "☺";
}

function equipmentProfile() {
  const method = $("distillMethod").value;
  const diameter = clamp(n("columnDiameter"), 20, 120);
  const height = clamp(n("columnHeight"), 0, 250);
  const affectCalculations = $("applyGear").checked;

  const base = {
    pot: { usable: 78, loss: 12, product: 55 },
    column: { usable: 85, loss: 8, product: 92 },
    reflux: { usable: 88, loss: 6, product: 95 }
  }[method];

  const diameterBonus = clamp((diameter - 38) / 40, -0.25, 0.35);
  const heightBonus = clamp((height - 80) / 120, -0.25, 0.35);
  const qualityBonus = method === "pot" ? 0 : (diameterBonus + heightBonus) / 2;

  return {
    affectEfficiency: affectCalculations,
    affectRaw: affectCalculations,
    method,
    usable: clamp(base.usable + qualityBonus * 6, 60, 94),
    loss: clamp(base.loss - qualityBonus * 3, 3, 20),
    product: clamp(base.product + qualityBonus * 4, method === "pot" ? 35 : 75, method === "reflux" ? 96.5 : 94)
  };
}

function yieldFor(type) {
  if (type === "sugar") return defaults.sugar.yield;
  return (starchYieldProfiles[$("starchYieldProfile").value] || starchYieldProfiles.average).value;
}

function yieldProfileText(type) {
  if (type === "sugar") return "0.681 л АС/кг цукру";
  const profile = starchYieldProfiles[$("starchYieldProfile").value] || starchYieldProfiles.average;
  return `${profile.value} л АС/кг крохмалю (${profile.label})`;
}

function extractFor(type) {
  const settingId = {
    sugar: "sugarExtractSetting",
    flour: "flourExtractSetting"
  }[type];
  return clamp(n(settingId), 0, 100);
}

function updateDrinkFields() {
  $("finalGinWasteLabel").hidden = activeFinalDrink !== "gin";
}

function equipmentText() {
  const profile = equipmentProfile();
  return profile;
}

function calcMash() {
  const type = $("feedstock").value;
  const cfg = defaults[type];
  const gear = equipmentText();
  const mass = n("feedMass");
  const extractPct = extractFor(type);
  const extract = extractPct / 100;
  const rawAbv = Math.max(n("rawAbvFromMash"), 0.1) / 100;
  const myRawVolume = myRawVolumeValue;
  const fermentable = mass * extract;
  const yieldRate = yieldFor(type);
  const absoluteAlcohol = fermentable * yieldRate;
  const rawVolume = absoluteAlcohol / rawAbv;
  const matchPct = rawVolume > 0 ? myRawVolume / rawVolume * 100 : 0;
  transferRawVolume = rawVolume;
  transferRawAbv = rawAbv * 100;
  const matchVariant = matchPct < 60 ? "match-red" : matchPct < 85 ? "match-yellow" : "match-green";

  const rows = [
    ["Потенційний абсолютний спирт", fmt(absoluteAlcohol, 2, " л АС")],
    [`Орієнтовний об'єм ${fmt(rawAbv * 100, 1, "%")} сирцю`, fmt(rawVolume, 2, " л"), "send-raw", "icon-flask", "primary"],
    ["Фактичний об'єм, л", myRawVolume > 0 ? String(myRawVolume) : "", "myRawVolume", "send-raw-actual", "field"]
  ];
  if (myRawVolume > 0) {
    rows.push(["Співпадіння з очікуваним", fmt(matchPct, 1, " %"), null, "icon-scale", matchVariant]);
  }
  setResult(rows, `маса x вміст ${cfg.label} з налаштувань x ${yieldRate} л АС/кг; сирець = АС / міцність сирцю; база: ${yieldProfileText(type)}`);
}

function calcRaw() {
  equipmentText();
  const volume = n("rawVolume");
  const meter = clamp(n("rawMeterAbv"), 0, 100);
  const temp = n("sampleTemp");
  const productAbvPct = Math.max(n("productAbv"), 0.1);
  const productAbv = productAbvPct / 100;
  const myProductVolume = myProductVolumeValue;
  const headsPct = clamp(n("headsPct"), 0, 100);
  const tailsPct = clamp(n("tailsPct"), 0, 100);
  $("headsValue").textContent = fmt(headsPct, 1, " %");
  $("tailsValue").textContent = fmt(tailsPct, 1, " %");
  const trueAbv = correctedAbv(meter, temp);
  const absoluteAlcohol = volume * trueAbv / 100;
  const headsAlcohol = absoluteAlcohol * headsPct / 100;
  const tailsAlcohol = absoluteAlcohol * tailsPct / 100;
  const bodyAlcohol = Math.max(absoluteAlcohol - headsAlcohol - tailsAlcohol, 0);
  const productVolume = bodyAlcohol / productAbv;
  const matchPct = productVolume > 0 ? myProductVolume / productVolume * 100 : 0;
  const matchVariant = matchPct < 60 ? "match-red" : matchPct < 85 ? "match-yellow" : "match-green";
  transferProductVolume = productVolume;
  transferProductAbv = productAbvPct;

  const rows = [
    ["Голови", fmt(headsAlcohol, 2, " л")],
    ["Хвости", fmt(tailsAlcohol, 2, " л")],
    ["Тіло після відсікання", fmt(productVolume, 2, " л"), "send-final", "icon-droplet", "primary"],
    ["Фактичний об'єм, л", myProductVolume > 0 ? String(myProductVolume) : "", "myProductVolume", "send-final-actual", "field"]
  ];
  if (myProductVolume > 0) {
    rows.push(["Співпадіння з очікуваним", fmt(matchPct, 1, " %"), null, "icon-scale", matchVariant]);
  }
  setResult(rows, `міцність(20 °C) = показ - (температура - 20) x 0.3; тіло = (АС у сирці - голови - хвости) / міцність продукту`);
}

function calcFinal() {
  updateDrinkFields();
  const sourceVolume = n("finalSourceVolume");
  const sourceAbv = clamp(n("finalSourceAbv"), 0.1, 99.9);
  const drink = drinks[activeFinalDrink];
  const tailsPct = clamp(n("finalTailsPct"), 0, 95);
  $("finalTailsValue").textContent = fmt(tailsPct, 1, " %");
  const ginWastePct = activeFinalDrink === "gin" ? clamp(n("finalGinWastePct"), 0, 95) : 0;
  const keptShare = Math.max(1 - ((tailsPct + ginWastePct) / 100), 0.01);
  const sourceAlcohol = sourceVolume * sourceAbv / 100;
  const finalAlcohol = sourceAlcohol * keptShare;
  const tailsAlcohol = sourceAlcohol * tailsPct / 100;
  const ginWasteAlcohol = sourceAlcohol * ginWastePct / 100;
  const finalVolume = finalAlcohol / (drink.abv / 100);
  const matchPct = finalVolume > 0 ? myFinalVolumeValue / finalVolume * 100 : 0;
  const matchVariant = matchPct < 60 ? "match-red" : matchPct < 85 ? "match-yellow" : "match-green";

  const rows = [
    ["АС після ректифікації", fmt(sourceAlcohol, 2, " л АС")],
    ["Хвости", fmt(tailsAlcohol, 2, " л")],
    ...(activeFinalDrink === "gin" ? [["Нетоварний відбір джину", fmt(ginWasteAlcohol, 2, " л")]] : []),
    [`Об'єм фінального продукту ${fmt(drink.abv, 1, "%")}`, fmt(finalVolume, 2, " л"), null, "icon-droplet", "primary"],
    ["Фактичний об'єм, л", myFinalVolumeValue > 0 ? String(myFinalVolumeValue) : "", "myFinalVolume", null, "field"]
  ];
  if (myFinalVolumeValue > 0) {
    rows.push(["Співпадіння з очікуваним", fmt(matchPct, 1, " %"), null, "icon-scale", matchVariant]);
  }
  setResult(rows, `фінальний продукт = об'єм ректифікату x міцність ректифікату / міцність вибраного продукту x (1 - хвости - нетоварний відбір)`);
}

function calcDilute() {
  const startVolume = n("startVolume");
  const startAbv = clamp(n("startAbv"), 0, 100);
  const targetAbv = Math.max(clamp(n("targetAbv"), 0.1, 100), 0.1);
  const contraction = clamp(n("contractionPct"), 0, 10) / 100;
  const finalVolume = startVolume * startAbv / targetAbv;
  const water = Math.max(finalVolume - startVolume, 0);
  const estimatedFinal = startVolume + water * (1 - contraction);
  const afterContractionAbv = estimatedFinal > 0 ? (startVolume * startAbv / estimatedFinal) : 0;

  setResult([
    ["Додати води", fmt(water, 2, " л")],
    ["Фінальний об'єм без контракції", fmt(finalVolume, 2, " л")],
    ["Оцінка об'єму після стискання", fmt(estimatedFinal, 2, " л")],
    ["Можлива міцність після стискання", fmt(afterContractionAbv, 1, " %")]
  ], `вода = V1 x C1 / C2 - V1; контракція показана окремо як практична поправка`);
}

function abvFromBoiling(temp, pressure) {
  const pressureAdjustedTemp = temp - ((pressure - 760) * 0.037);
  if (pressureAdjustedTemp >= 100) return 0;
  if (pressureAdjustedTemp <= 78.3) return 97;

  for (let i = 0; i < boilingTable.length - 1; i++) {
    const [abvA, tempA] = boilingTable[i];
    const [abvB, tempB] = boilingTable[i + 1];
    const high = Math.max(tempA, tempB);
    const low = Math.min(tempA, tempB);
    if (pressureAdjustedTemp <= high && pressureAdjustedTemp >= low) {
      const t = (pressureAdjustedTemp - tempA) / (tempB - tempA);
      return abvA + ((abvB - abvA) * t);
    }
  }
  return 0;
}

function calcBoiler() {
  const temp = n("boilerTemp");
  const pressure = n("pressure");
  const adjustedTemp = temp - ((pressure - 760) * 0.037);
  const abv = clamp(abvFromBoiling(temp, pressure), 0, 97);
  const vaporHint = abv <= 0.05 || adjustedTemp >= 99.95 ? 0 : clamp(abv + (100 - abv) * 0.467, 0, 97);

  setResult([
    ["Оцінка спирту в рідині куба", fmt(abv, 1, " % об.")],
    ["Температура, приведена до 760 мм", fmt(adjustedTemp, 1, " °C")],
    ["Груба оцінка спирту в парі", fmt(vaporHint, 1, " % об.")],
    ["Діапазон довіри", "орієнтовний"]
  ], `інтерполяція таблиці кипіння; поправка температури приблизно 0.037 °C на 1 мм рт. ст.`);
}

function processEfficiency() {
  const gear = equipmentProfile();
  const feedType = defaults[$("feedstock")?.value] ? $("feedstock").value : "flour";
  const feedMass = nf("feedMass", 50);
  const mashPotential = feedMass * Math.max(extractFor(feedType), 0.1) / 100 * yieldFor(feedType);
  const rawTrueAbv = correctedAbv(clamp(nf("rawMeterAbv", 30), 0, 100), nf("sampleTemp", 20));
  const expectedRawVolume = mashPotential / (Math.max(nf("rawAbvFromMash", 30), 0.1) / 100);
  const rawVolumeForEfficiency = n("rawVolume") > 0 ? n("rawVolume") : expectedRawVolume;
  const rawAlcohol = rawVolumeForEfficiency * rawTrueAbv / 100;
  const headsAlcohol = rawAlcohol * clamp(nf("headsPct", 8), 0, 100) / 100;
  const tailsAlcohol = rawAlcohol * clamp(nf("tailsPct", 10), 0, 100) / 100;
  const productAbvPct = Math.max(nf("productAbv", 95), 0.1);
  const bodyAlcohol = Math.max(rawAlcohol - headsAlcohol - tailsAlcohol, 0);
  const productVolume = bodyAlcohol / (productAbvPct / 100);
  const sourceAbv = clamp(nf("finalSourceAbv", productAbvPct), 0.1, 99.9);
  const finalDrink = drinks[activeFinalDrink];
  const finalTailsPct = clamp(nf("finalTailsPct", 10), 0, 95);
  const finalGinWastePct = activeFinalDrink === "gin" ? clamp(nf("finalGinWastePct", 8), 0, 95) : 0;
  const finalKeptShare = Math.max(1 - ((finalTailsPct + finalGinWastePct) / 100), 0.01);
  const calculatedBaseVolume = productVolume;
  const calculatedAlcohol = calculatedBaseVolume * sourceAbv / 100 * finalKeptShare;
  const calculated = mashPotential > 0 ? calculatedAlcohol / mashPotential * 100 : 0;
  const hasActual = myRawVolumeValue > 0 || myProductVolumeValue > 0 || myFinalVolumeValue > 0;
  const rawRetention = rawAlcohol > 0 ? bodyAlcohol / rawAlcohol : 0;
  const rawStageAlcohol = myRawVolumeValue > 0
    ? myRawVolumeValue * Math.max(n("rawAbvFromMash"), 0.1) / 100
    : mashPotential;
  const productStageExpected = rawStageAlcohol * rawRetention;
  const productStageAlcohol = myProductVolumeValue > 0
    ? myProductVolumeValue * productAbvPct / 100
    : productStageExpected;
  const finalStageExpected = productStageAlcohol * finalKeptShare;
  const actualAlcohol = myFinalVolumeValue > 0
    ? myFinalVolumeValue * finalDrink.abv / 100
    : finalStageExpected;
  const actual = hasActual && mashPotential > 0 && actualAlcohol > 0 ? actualAlcohol / mashPotential * 100 : null;

  return {
    mashPotential,
    rawAlcohol,
    headsAlcohol,
    tailsAlcohol,
    productVolume,
    sourceVolume: calculatedBaseVolume,
    sourceAbv,
    finalDrink,
    finalKeptShare,
    calculatedAlcohol,
    calculated,
    rawRetention,
    rawStageAlcohol,
    productStageAlcohol,
    actualAlcohol,
    actual
  };
}

function updateEfficiencyHeader() {
  const data = processEfficiency();
  const calculated = data.mashPotential > 0 && Number.isFinite(data.calculated) ? data.calculated : 0;
  $("calcEfficiencyValue").textContent = fmt(calculated, 1, " %");
  setEfficiencyTone(calcEfficiencyOpen, calculated);
  actualEfficiencyOpen.hidden = data.actual === null;
  $("actualEfficiencyValue").textContent = data.actual === null ? "—" : fmt(data.actual, 1, " %");
  if (data.actual !== null) setEfficiencyTone(actualEfficiencyOpen, data.actual);
}

function setEfficiencyTone(element, value) {
  element.classList.remove("eff-low", "eff-mid", "eff-high");
  if (value < 60) element.classList.add("eff-low");
  else if (value < 85) element.classList.add("eff-mid");
  else element.classList.add("eff-high");
}

function showEfficiencyDetails(kind) {
  const data = processEfficiency();
  const title = kind === "actual" ? "Фактична ефективність" : "Розрахункова ефективність";
  if (kind === "actual" && data.actual === null) {
    openEfficiencyModal(title, [
      ["Поки немає фактичних даних", "—"],
      ["Що потрібно", "введіть фактичний об'єм у сирці, ректифікації або фінальному продукті"]
    ], "Фактична ефективність з'явиться після введення хоча б одного фактичного об'єму.");
    return;
  }

  const value = kind === "actual" ? data.actual : data.calculated;
  const alcohol = kind === "actual" ? data.actualAlcohol : data.calculatedAlcohol;
  const finalCutAlcohol = data.sourceVolume * data.sourceAbv / 100 * (1 - data.finalKeptShare);
  const dropRows = [
    ["Голови", fmt(data.headsAlcohol / data.mashPotential * 100, 1, " %"), dropClass(data.headsAlcohol, data.mashPotential)],
    ["Хвости", fmt(data.tailsAlcohol / data.mashPotential * 100, 1, " %"), dropClass(data.tailsAlcohol, data.mashPotential)],
    ["Фінальний відбір", fmt(finalCutAlcohol / data.mashPotential * 100, 1, " %"), dropClass(finalCutAlcohol, data.mashPotential)]
  ];
  openEfficiencyModal(title, [
    [title, fmt(value, 1, " %")],
    ["Потенціал сировини", fmt(data.mashPotential, 2, " л АС")],
    ["АС для порівняння", fmt(alcohol, 2, " л АС")],
    ["Ректифікат у розрахунку", fmt(data.sourceVolume, 2, " л")],
    ["Міцність ректифікату", fmt(data.sourceAbv, 1, " %")],
    ["Фінальний продукт у розрахунку", data.finalDrink.label],
    ["Відсікання у фінальному продукті", fmt((1 - data.finalKeptShare) * 100, 1, " %")]
  ], `${title.toLowerCase()} = АС для порівняння / потенціал сировини x 100`, dropRows);
}

function dropClass(lossAlcohol, potentialAlcohol) {
  if (!potentialAlcohol || lossAlcohol <= 0) return "";
  const pct = lossAlcohol / potentialAlcohol * 100;
  if (pct >= 10) return "drop-high";
  if (pct >= 4) return "drop-mid";
  return "";
}

function openEfficiencyModal(title, detailRows, formulaText, dropRows = []) {
  $("efficiencyTitle").lastChild.textContent = translateText(title);
  efficiencyDetails.innerHTML = [
    ...detailRows.map(([label, value, rowClass = ""]) => `<div class="detail-row ${rowClass}"><span>${translateText(label)}</span><strong>${translateText(value)}</strong></div>`),
    dropRows.length ? `<div class="drop-summary"><h3>${translateText("Де просідає")}</h3>${dropRows.map(([label, value, rowClass = ""]) => `<div class="drop-row ${rowClass}"><span>${translateText(label)}</span><strong>${translateText(value)}</strong></div>`).join("")}</div>` : "",
    `<div class="formula detail-formula"><button class="formula-toggle" type="button" aria-expanded="false">${translateText("Формула")}</button><div class="formula-body">${translateText(formulaText)}</div></div>`
  ].join("");
  efficiencyModal.hidden = false;
  efficiencyClose.focus();
}

function methodLabel(method) {
  return {
    pot: "Простий перегін",
    column: "Колона з укріпленням",
    reflux: "Ректифікація"
  }[method] || "Колона з укріпленням";
}

function currentData() {
  const gear = equipmentText();
  const feed = defaults[$("feedstock").value];
  const rawTrueAbv = correctedAbv(clamp(n("rawMeterAbv"), 0, 100), n("sampleTemp"));
  const rawAlcohol = n("rawVolume") * rawTrueAbv / 100;
  const headsAlcohol = rawAlcohol * clamp(n("headsPct"), 0, 100) / 100;
  const tailsAlcohol = rawAlcohol * clamp(n("tailsPct"), 0, 100) / 100;
  const productAbvPct = Math.max(n("productAbv"), 0.1);
  const bodyAlcohol = Math.max(rawAlcohol - headsAlcohol - tailsAlcohol, 0);
  const productVolume = bodyAlcohol / (productAbvPct / 100);
  const productMatch = productVolume > 0 ? myProductVolumeValue / productVolume * 100 : 0;
  const mashTheory = n("feedMass") * extractFor($("feedstock").value) / 100 * yieldFor($("feedstock").value);
  const mashRawVolume = mashTheory / (Math.max(n("rawAbvFromMash"), 0.1) / 100);
  const mashMatch = mashRawVolume > 0 ? myRawVolumeValue / mashRawVolume * 100 : 0;
  const finalDrink = drinks[activeFinalDrink];
  const finalTailsPct = clamp(n("finalTailsPct"), 0, 95);
  const finalGinWastePct = activeFinalDrink === "gin" ? clamp(n("finalGinWastePct"), 0, 95) : 0;
  const finalKeptShare = Math.max(1 - ((finalTailsPct + finalGinWastePct) / 100), 0.01);
  const finalSourceAlcohol = n("finalSourceVolume") * clamp(n("finalSourceAbv"), 0.1, 99.9) / 100;
  const finalAlcohol = finalSourceAlcohol * finalKeptShare;
  const finalVolume = finalAlcohol / (finalDrink.abv / 100);
  const finalMatch = finalVolume > 0 ? myFinalVolumeValue / finalVolume * 100 : 0;
  const boilerAdjusted = n("boilerTemp") - ((n("pressure") - 760) * 0.037);
  const boilerAbv = clamp(abvFromBoiling(n("boilerTemp"), n("pressure")), 0, 97);

  return {
    gear, feed, rawTrueAbv, rawAlcohol, headsAlcohol, tailsAlcohol,
    productAbvPct, bodyAlcohol, productVolume, productMatch, mashTheory,
    mashRawVolume, mashMatch, finalDrink, finalTailsPct, finalGinWastePct, finalSourceAlcohol,
    finalVolume, finalMatch, boilerAdjusted, boilerAbv
  };
}

function rows(items) {
  return `<table>${items.map(([label, value]) => `<tr><th>${translateText(label)}</th><td>${translateText(value)}</td></tr>`).join("")}</table>`;
}

function reportSection(title, items) {
  return `<section><h2>${translateText(title)}</h2>${rows(items)}</section>`;
}

function buildPrintDocument() {
  const data = currentData();
  const sections = [];

  if ($("printMash").checked) {
    sections.push(reportSection("Вихід сирцю", [
      ["Сировина", $("feedstock").selectedOptions[0].textContent],
      ["База виходу", yieldProfileText($("feedstock").value)],
      ["Маса сировини", fmt(n("feedMass"), 2, " кг")],
      ["Вміст цукру/крохмалю", fmt(extractFor($("feedstock").value), 1, " %")],
      ["Потенційний АС", fmt(data.mashTheory, 2, " л АС")],
      [`Орієнтовний об'єм ${fmt(n("rawAbvFromMash"), 1, "%")} сирцю`, fmt(data.mashRawVolume, 2, " л")],
      ["Фактичний об'єм", myRawVolumeValue > 0 ? fmt(myRawVolumeValue, 2, " л") : "не вказано"],
      ["Співпадіння з очікуваним", myRawVolumeValue > 0 ? fmt(data.mashMatch, 1, " %") : "—"]
    ]));
  }

  if ($("printRaw").checked) {
    sections.push(reportSection("Ректифікація", [
      ["Об'єм сирцю", fmt(n("rawVolume"), 2, " л")],
      ["Голови", fmt(data.headsAlcohol, 2, " л")],
      ["Хвости", fmt(data.tailsAlcohol, 2, " л")],
      ["Тіло після відсікання", fmt(data.productVolume, 2, " л")],
      ["Фактичний об'єм", myProductVolumeValue > 0 ? fmt(myProductVolumeValue, 2, " л") : "не вказано"],
      ["Співпадіння з очікуваним", myProductVolumeValue > 0 ? fmt(data.productMatch, 1, " %") : "—"]
    ]));
  }

  if ($("printFinal").checked) {
    sections.push(reportSection("Фінальний продукт", [
      ["Продукт", data.finalDrink.label],
      ["Об'єм ректифікату", fmt(n("finalSourceVolume"), 2, " л")],
      ["Міцність ректифікату", fmt(n("finalSourceAbv"), 1, " %")],
      ["Хвости", fmt(data.finalTailsPct, 1, " %")],
      ...(activeFinalDrink === "gin" ? [["Нетоварний відбір джину", fmt(data.finalGinWastePct, 1, " %")]] : []),
      ["АС після ректифікації", fmt(data.finalSourceAlcohol, 2, " л АС")],
      ["Об'єм фінального продукту", fmt(data.finalVolume, 2, " л")],
      ["Фактичний об'єм", myFinalVolumeValue > 0 ? fmt(myFinalVolumeValue, 2, " л") : "не вказано"],
      ["Співпадіння з очікуваним", myFinalVolumeValue > 0 ? fmt(data.finalMatch, 1, " %") : "—"]
    ]));
  }

  if ($("printDilute").checked) {
    const finalVolume = n("startVolume") * clamp(n("startAbv"), 0, 100) / Math.max(clamp(n("targetAbv"), 0.1, 100), 0.1);
    const water = Math.max(finalVolume - n("startVolume"), 0);
    sections.push(reportSection("Розбавлення", [
      ["Початковий об'єм", fmt(n("startVolume"), 2, " л")],
      ["Початкова міцність", fmt(n("startAbv"), 1, " %")],
      ["Бажана міцність", fmt(n("targetAbv"), 1, " %")],
      ["Додати води", fmt(water, 2, " л")],
      ["Фінальний об'єм без контракції", fmt(finalVolume, 2, " л")]
    ]));
  }

  if ($("printBoiler").checked) {
    sections.push(reportSection("Спирт у кубі", [
      ["Температура в кубі", fmt(n("boilerTemp"), 1, " °C")],
      ["Атмосферний тиск", fmt(n("pressure"), 0, " мм рт. ст.")],
      ["Температура до 760 мм", fmt(data.boilerAdjusted, 1, " °C")],
      ["Оцінка спирту в рідині", fmt(data.boilerAbv, 1, " % об.")]
    ]));
  }

  if ($("printEquipment").checked) {
    sections.push(reportSection("Загальні налаштування", [
      ["Діаметр колони", fmt(n("columnDiameter"), 0, " мм")],
      ["Висота насадкової частини", fmt(n("columnHeight"), 0, " см")],
      ["Метод перегону", methodLabel($("distillMethod").value)],
      ["База виходу з крохмалю", yieldProfileText("flour")],
      ["Вміст цукру", fmt(extractFor("sugar"), 1, " %")],
      ["Крохмаль у борошні", fmt(extractFor("flour"), 1, " %")],
      ["Вплив на розрахунки", data.gear.affectRaw ? "так" : "ні"],
      ["Корисний відбір", fmt(data.gear.usable, 1, " %")],
      ["Втрати перегону", fmt(data.gear.loss, 1, " %")],
      ["Міцність продукту", fmt(data.gear.product, 1, " %")]
    ]));
  }

  const reportTitle = currentLang === "en" ? "Distillarium report" : "Звіт Дистилярій";
  const generated = currentLang === "en" ? "Report generated" : "Звіт сформовано";
  const printLabel = translateText("Надрукувати");
  return `<!doctype html><html lang="${currentLang}"><head><meta charset="utf-8"><title>${reportTitle}</title><style>
    body{font-family:Arial,sans-serif;color:#211827;margin:32px;line-height:1.35}
    h1{margin:0 0 6px;font-size:30px} .date{color:#6f617d;margin-bottom:22px}
    section{break-inside:avoid;margin:0 0 22px;padding-bottom:14px;border-bottom:1px solid #ddd2ee}
    h2{font-size:20px;margin:0 0 10px;color:#7c3aed}
    table{width:100%;border-collapse:collapse} th,td{padding:7px 0;border-bottom:1px solid #eee;text-align:left}
    th{color:#6f617d;font-weight:700;width:52%} td{font-weight:800}
    @media print{body{margin:18mm}.no-print{display:none}}
  </style></head><body><button class="no-print" onclick="window.print()">${printLabel}</button><h1>${translateText("Дистилярій")}</h1><div class="date">${generated} ${new Date().toLocaleString(currentLang === "en" ? "en-US" : "uk-UA")}</div>${sections.join("")}</body></html>`;
}

function calculate() {
  if (!activeTab) {
    workspace.classList.add("start-screen");
    resultAside.hidden = true;
    updateEfficiencyHeader();
    return;
  }
  if (activeTab === "mash") calcMash();
  if (activeTab === "raw") calcRaw();
  if (activeTab === "final") calcFinal();
  if (activeTab === "dilute") calcDilute();
  if (activeTab === "boiler") calcBoiler();
  updateEfficiencyHeader();
}

function calcSettings() {
  const gear = equipmentText();

  setResult([
    ["Вплив на розрахунки", gear.affectRaw ? "увімкнено" : "вимкнено"],
    ["База виходу з крохмалю", yieldProfileText("flour")],
    ["Крохмаль у борошні", fmt(extractFor("flour"), 1, " %")],
    ["Орієнтовний корисний відбір", fmt(gear.usable, 1, " %")],
    ["Орієнтовні втрати перегону", fmt(gear.loss, 1, " %")],
    ["Орієнтовна міцність продукту", fmt(gear.product, 1, " %")]
  ], "Налаштування використовуються як м'яка поправка там, де це можливо.");
}

function activateTab(tabName) {
  activeTab = tabName;
  tabs.forEach((item) => item.setAttribute("aria-selected", String(item.dataset.tab === activeTab)));
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === activeTab));
  calculate();
}

function showHome() {
  activeTab = null;
  tabs.forEach((item) => item.setAttribute("aria-selected", "false"));
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === "welcome"));
  calculate();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

homeOpen.addEventListener("click", showHome);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateTab(tab.dataset.tab);
  });
});

introItems.forEach((item) => {
  item.addEventListener("click", () => {
    activateTab(item.dataset.introTab);
  });
});

$("metrics").addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]");
  if (!action) return;
  if (action.dataset.action === "send-raw" || action.dataset.action === "send-raw-actual") {
    const rawVolume = action.dataset.action === "send-raw-actual" && myRawVolumeValue > 0 ? myRawVolumeValue : transferRawVolume;
    $("rawVolume").value = rawVolume.toFixed(2);
    $("rawMeterAbv").value = transferRawAbv.toFixed(1);
    $("sampleTemp").value = 20;
    activateTab("raw");
  }
  if (action.dataset.action === "send-final") {
    $("finalSourceVolume").value = transferProductVolume.toFixed(2);
    $("finalSourceAbv").value = transferProductAbv.toFixed(1);
    activateTab("final");
  }
  if (action.dataset.action === "send-final-actual") {
    const productVolume = myProductVolumeValue > 0 ? myProductVolumeValue : transferProductVolume;
    $("finalSourceVolume").value = productVolume.toFixed(2);
    $("finalSourceAbv").value = transferProductAbv.toFixed(1);
    activateTab("final");
  }
  if (action.dataset.action === "send-dilute") {
    $("startVolume").value = transferProductVolume.toFixed(2);
    $("startAbv").value = transferProductAbv.toFixed(1);
    activateTab("dilute");
  }
});

$("metrics").addEventListener("input", (event) => {
  if (!["myRawVolume", "myProductVolume", "myFinalVolume"].includes(event.target.id)) return;
  const focusedId = event.target.id;
  const value = Number(event.target.value);
  if (event.target.id === "myRawVolume") {
    myRawVolumeValue = Number.isFinite(value) ? value : 0;
  }
  if (event.target.id === "myProductVolume") {
    myProductVolumeValue = Number.isFinite(value) ? value : 0;
  }
  if (event.target.id === "myFinalVolume") {
    myFinalVolumeValue = Number.isFinite(value) ? value : 0;
  }
  calculate();
  const restored = $(focusedId);
  if (restored) {
    restored.focus({ preventScroll: true });
    const end = restored.value.length;
    restored.setSelectionRange(end, end);
  }
});

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

languageToggle.addEventListener("click", () => {
  currentLang = currentLang === "uk" ? "en" : "uk";
  localStorage.setItem("distillery-lang", currentLang);
  applyTranslations(document.body);
  setTheme(document.documentElement.dataset.theme || "dark");
  calculate();
});

formulaToggle.addEventListener("click", () => {
  const isOpen = formula.classList.toggle("open");
  formulaToggle.setAttribute("aria-expanded", String(isOpen));
});

calcEfficiencyOpen.addEventListener("click", () => {
  showEfficiencyDetails("calculated");
});

actualEfficiencyOpen.addEventListener("click", () => {
  showEfficiencyDetails("actual");
});

settingsOpen.addEventListener("click", () => {
  equipmentText();
  settingsModal.hidden = false;
  settingsClose.focus();
});

settingsClose.addEventListener("click", () => {
  settingsModal.hidden = true;
  settingsOpen.focus();
});

settingsModal.addEventListener("click", (event) => {
  if (event.target === settingsModal) {
    settingsModal.hidden = true;
    settingsOpen.focus();
  }
});

printOpen.addEventListener("click", () => {
  printModal.hidden = false;
  printBuild.focus();
});

function closePrintModal() {
  printModal.hidden = true;
  printOpen.focus();
}

printClose.addEventListener("click", closePrintModal);
printCancel.addEventListener("click", closePrintModal);

printModal.addEventListener("click", (event) => {
  if (event.target === printModal) closePrintModal();
});

function closeEfficiencyModal() {
  efficiencyModal.hidden = true;
  calcEfficiencyOpen.focus();
}

efficiencyClose.addEventListener("click", closeEfficiencyModal);

efficiencyModal.addEventListener("click", (event) => {
  const toggle = event.target.closest(".formula-toggle");
  if (toggle && efficiencyDetails.contains(toggle)) {
    const wrapper = toggle.closest(".formula");
    const isOpen = wrapper.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    return;
  }
  if (event.target === efficiencyModal) closeEfficiencyModal();
});

printBuild.addEventListener("click", () => {
  const report = window.open("", "_blank");
  if (!report) return;
  report.document.open();
  report.document.write(buildPrintDocument());
  report.document.close();
  report.focus();
  report.print();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !settingsModal.hidden) {
    settingsModal.hidden = true;
    settingsOpen.focus();
  }
  if (event.key === "Escape" && !printModal.hidden) {
    closePrintModal();
  }
  if (event.key === "Escape" && !efficiencyModal.hidden) {
    closeEfficiencyModal();
  }
});

$("feedstock").addEventListener("change", calculate);

finalDrinkOptions.forEach((option) => {
  option.addEventListener("click", () => {
    activeFinalDrink = option.dataset.drink;
    finalDrinkOptions.forEach((item) => item.setAttribute("aria-pressed", String(item === option)));
    calculate();
  });
});

methodOptions.forEach((option) => {
  option.addEventListener("click", () => {
    $("distillMethod").value = option.dataset.method;
    methodOptions.forEach((item) => item.setAttribute("aria-pressed", String(item === option)));
    calculate();
  });
});

document.querySelectorAll("input, select").forEach((input) => {
  input.addEventListener("input", calculate);
});

function moveCursorToEnd(input) {
  if (!input || input.matches("input[type='range'], input[type='checkbox'], select")) return;
  window.setTimeout(() => {
    input.focus({ preventScroll: true });
    const end = input.value.length;
    try {
      input.setSelectionRange(end, end);
    } catch (error) {
      const value = input.value;
      input.value = "";
      input.value = value;
    }
  }, 0);
}

document.querySelectorAll("input:not([type='range']):not([type='checkbox'])").forEach((input) => {
  input.addEventListener("focus", () => moveCursorToEnd(input));
  input.addEventListener("pointerup", () => moveCursorToEnd(input));
});

calculate();
try {
  applyTranslations(document.body);
  calculate();
} catch (error) {
  console.error("Translation failed, calculations stayed active:", error);
}
