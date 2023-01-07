export const cosineSimilarity = (a: number[], b: number[]) => {
  let dotProduct = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
  }
  return dotProduct;
};

export const euclideanDistance = (a: number[], b: number[]) => {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += Math.pow(a[i] - b[i], 2);
  }
  return Math.sqrt(sum);
};

export const getMax = (a: number, b: number) => {
  return a > b ? a : b;
};

export const updateTopN = (topN: number[], newValue: number, take: number) => {
  topN.push(newValue);
  topN.sort((a, b) => b - a);
  return topN.slice(0, take);
};
