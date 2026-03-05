export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function cleanText(text) {
  return text.toUpperCase().replace(/[^A-Z]/g, "");
}

export function getFrequencies(text) {
  const freq = {};
  for (let c of ALPHABET) freq[c] = 0;

  for (let c of text) freq[c]++;

  return freq;
}

export function calculateIC(text) {
  const freq = getFrequencies(text);
  const N = text.length;

  let sum = 0;
  for (let l in freq) {
    sum += freq[l] * (freq[l] - 1);
  }

  return sum / (N * (N - 1));
}

/* Score lingüístico simple */
export function languageScore(text) {
  const common = ["E","A","O","S","N","R","L"];
  let score = 0;

  for (let c of text) {
    if (common.includes(c)) score++;
  }

  return score / text.length;
}

// Frecuencias aproximadas del español
const spanishFreq = {
  A:12.53,B:1.42,C:4.68,D:5.86,E:13.68,F:0.69,
  G:1.01,H:0.70,I:6.25,J:0.44,K:0.02,L:4.97,
  M:3.15,N:6.71,O:8.68,P:2.51,Q:0.88,R:6.87,
  S:7.98,T:4.63,U:3.93,V:0.90,W:0.01,X:0.22,
  Y:0.90,Z:0.52
};

// chi-cuadrado
export function chiSquaredScore(text){

  const freq = getFrequencies(text);
  const N = text.length;

  let chi = 0;

  for(let l in spanishFreq){
    const observed = freq[l];
    const expected = (spanishFreq[l] / 100) * N;

    chi += ((observed - expected)**2) / expected;
  }

  return chi;
}
