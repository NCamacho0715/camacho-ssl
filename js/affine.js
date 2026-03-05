import {
  ALPHABET,
  chiSquaredScore
} from "./analyzer.js";

const validA = [1,3,5,7,9,11,15,17,19,21,23,25];

function modInverse(a,m=26){
  for(let x=1;x<m;x++)
    if((a*x)%m===1) return x;
}

// descifrar
export function decryptAffine(text,a,b){

  const invA = modInverse(a);
  let out="";

  for(let c of text){
    let y = ALPHABET.indexOf(c);
    let x = (invA*(y-b+26)) % ALPHABET.length;
    out += ALPHABET[x];
  }

  return out;
}

// cifrar
export function encryptAffine(text,a,b){
  let out="";

  for(let c of text){
    let x = ALPHABET.indexOf(c);
    out += ALPHABET[(a*x+b)%ALPHABET.length];
  }

  return out;
}

// CRIPTOANÁLISIS REAL
export function affineCryptanalysis(text){

  let best = {
    score: Infinity,
    a: null,
    b: null,
    plaintext: ""
  };

  for(let a of validA){
    for(let b=0;b<26;b++){

      const candidate = decryptAffine(text,a,b);
      const score = chiSquaredScore(candidate);

      if(score < best.score){
        best = {score,a,b,plaintext:candidate};
      }
    }
  }

  return best;
}
