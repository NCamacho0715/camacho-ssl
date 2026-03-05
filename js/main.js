import {
  cleanText,
  calculateIC,
  getFrequencies,
  languageScore
} from "./analyzer.js";

import { drawFrequencyChart } from "./chart.js";

import {
  caesarCryptanalysis,
  decryptCaesar,
  encryptCaesar
} from "./caesar.js";

import {
  affineCryptanalysis,
  decryptAffine,
  encryptAffine
} from "./affine.js";

import {
  decryptVigenere,
  encryptVigenere
} from "./vigenere.js";

/* ==============================
   BOTÓN DESCIFRAR (AUTOMÁTICO)
============================== */
document.getElementById("decryptBtn").onclick = () => {

  const input = cleanText(
    document.getElementById("inputText").value
  );

  if (!input) return;

  // 1️⃣ Índice de coincidencia
  const ic = calculateIC(input);

  document.getElementById("icResult").textContent =
    ic.toFixed(4);

  // 2️⃣ Histograma
  drawFrequencyChart(getFrequencies(input));

  let output = "";
  let type = "";
  let key = "";

  // =============================
  // VIGENÈRE (polialfabético)
  // =============================
  if (ic < 0.05) {

    const v = decryptVigenere(input);

    type = "Vigenère";
    output = v.text;
    key = v.key;

  } else {

    // =============================
    // CÉSAR
    // =============================
    const cKey = caesarCryptanalysis(input);
    const cText = decryptCaesar(input, cKey);

    // =============================
    // AFÍN
    // =============================
    const aData = affineCryptanalysis(input);
    const aText = aData.plaintext;

    // comparar qué texto parece más español
    if (languageScore(cText) > languageScore(aText)) {
      type = "César";
      output = cText;
      key = cKey;
    } else {
      type = "Afín";
      output = aText;
      key = `a=${aData.a}, b=${aData.b}`;
    }
  }

  document.getElementById("cipherType").textContent = type;
  document.getElementById("keyResult").textContent = key;
  document.getElementById("outputText").value = output;
};

/* ==============================
   BOTÓN CIFRAR
============================== */
document.getElementById("encryptBtn").onclick = () => {

  const input = cleanText(
    document.getElementById("inputText").value
  );

  if (!input) return;

  const cipher =
    document.getElementById("cipherSelect").value;

  const keyRaw =
    document.getElementById("keyInput").value;

  let output = "";

  if (cipher === "caesar") {
    output = encryptCaesar(input, parseInt(keyRaw));
  }

  if (cipher === "affine") {
    const [a, b] = keyRaw.split(",").map(Number);
    output = encryptAffine(input, a, b);
  }

  if (cipher === "vigenere") {
    output = encryptVigenere(input, cleanText(keyRaw));
  }

  document.getElementById("cipherType").textContent =
    "Modo cifrado";

  document.getElementById("keyResult").textContent = keyRaw;
  document.getElementById("outputText").value = output;
};

/* ==============================
   BOTÓN LIMPIAR
============================== */
document.getElementById("clearBtn").onclick = () => {

  document.getElementById("inputText").value = "";
  document.getElementById("outputText").value = "";

  document.getElementById("icResult").textContent = "--";
  document.getElementById("cipherType").textContent = "--";
  document.getElementById("keyResult").textContent = "--";
};
