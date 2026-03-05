import {
  ALPHABET,
  calculateIC,
  chiSquaredScore
} from "./analyzer.js";

/* ==============================
   ENCONTRAR LONGITUD DE CLAVE
   usando IC por columnas
============================== */
function findKeyLength(text){

  let bestLen = 3;
  let bestDiff = Infinity;

  for(let len=2; len<=12; len++){

    let totalIC = 0;

    for(let col=0; col<len; col++){

      let column="";

      for(let i=col;i<text.length;i+=len){
        column += text[i];
      }

      totalIC += calculateIC(column);
    }

    const avgIC = totalIC / len;

    // 0.065 aprox idioma natural
    const diff = Math.abs(avgIC - 0.065);

    if(diff < bestDiff){
      bestDiff = diff;
      bestLen = len;
    }
  }

  return bestLen;
}

/* ==============================
   RESOLVER COLUMNA COMO CÉSAR
============================== */
function solveColumn(column){

  let bestShift = 0;
  let bestScore = Infinity;

  for(let shift=0; shift<26; shift++){

    let decrypted="";

    for(let c of column){
      let i = ALPHABET.indexOf(c);
      decrypted += ALPHABET[(i-shift+26)%26];
    }

    const score = chiSquaredScore(decrypted);

    if(score < bestScore){
      bestScore = score;
      bestShift = shift;
    }
  }

  return bestShift;
}


/* ==============================
   DESCIFRAR VIGENÈRE
============================== */
export function decryptVigenere(text){

  const keyLen = findKeyLength(text);

  let key = "";

  // construir clave
  for(let col=0; col<keyLen; col++){

    let column = "";

    for(let i=col;i<text.length;i+=keyLen){
      column += text[i];
    }

    const shift = solveColumn(column);

    key += ALPHABET[shift];
  }

      // 🔥 REDUCIR CLAVE ANTES
  key = reduceKey(key);

  // descifrar final
  let out = "";

  for(let i=0;i<text.length;i++){

    const t = ALPHABET.indexOf(text[i]);
    const k = ALPHABET.indexOf(
      key[i % key.length]
    );

    out += ALPHABET[(t-k+26)%26];
  }

  return { text: out, key };


}

/* ==============================
   CIFRAR
============================== */
export function encryptVigenere(text,key){

  let out = "";

  for(let i=0;i<text.length;i++){

    const t = ALPHABET.indexOf(text[i]);
    const k = ALPHABET.indexOf(
      key[i % key.length]
    );

    out += ALPHABET[(t+k)%26];
  }

  return out;
}

function reduceKey(key){

  for(let len=1; len<=key.length/2; len++){

    const part = key.substring(0,len);

    let repeated = true;

    for(let i=0;i<key.length;i++){
      if(key[i] !== part[i % len]){
        repeated = false;
        break;
      }
    }

    if(repeated) return part;
  }

  return key;
}
