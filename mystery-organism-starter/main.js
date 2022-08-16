// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


// Returns multiple P. Aequor objects
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      let randIndex = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();
      if (this.dna[randIndex] !== newBase) {
        this.dna[randIndex] = newBase;
      }
      else {
        mutate();
      }
      return this.dna;
    },
    compareDNA(pAequorObj) {
      const shared = this.dna.reduce((acc, curr, idx, arr) => {
        if (arr[idx] === pAequorObj.dna[idx]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);
      const percentShared = (shared / this.dna.length) * 100;
      const percentDec = percentShared.toFixed(2);
      console.log(`${this.specimenNum} and ${pAequorObj.specimenNum} have ${percentDec}% in common`);
    },
    willLikelySurvive() {
      const CG = this.dna.filter(el => el === 'C' || el === 'G');
      return CG.length / this.dna.length >= 0.6;
    }
  }
};


const specimen1 = pAequorFactory(1, mockUpStrand());
const specimen2 = pAequorFactory(2, mockUpStrand());

console.log(specimen1);
console.log(specimen2);


console.log(specimen1.willLikelySurvive());







