import { ALPHABET, getFrequencies } from "./analyzer.js";

export function caesarCryptanalysis(text){

  const freq = getFrequencies(text);

  let most = "A";
  for(let l in freq)
    if(freq[l] > freq[most]) most = l;

  const key =
    (ALPHABET.indexOf(most) - ALPHABET.indexOf("E") + 26) % ALPHABET.length;

  return key;
}

export function decryptCaesar(text,key){
  let out="";
  for(let c of text){
    let i = ALPHABET.indexOf(c);
    out += ALPHABET[(i-key+26)%ALPHABET.length];
  }
  return out;
}

export function encryptCaesar(text,key){
  let out="";
  for(let c of text){
    let i = ALPHABET.indexOf(c);
    out += ALPHABET[(i+key)%ALPHABET.length];
  }
  return out;
}
