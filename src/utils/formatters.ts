/**
 * Korean Real Estate Currency & Measurement Formatters
 */

export function formatWonToKorean(won: number, short = false): string {
  if (!won || won <= 0) return '0원';
  
  const eok = Math.floor(won / 100000000); // 억 (100 million)
  const man = Math.floor((won % 100000000) / 10000); // 만 (10 thousand)
  
  if (short) {
    if (eok > 0 && man === 0) return `${eok}억`;
    if (eok > 0 && man > 0) {
      const decimal = (won / 100000000).toFixed(1).replace(/\.0$/, '');
      return `${decimal}억`;
    }
    return `${man.toLocaleString()}만`;
  }

  const parts: string[] = [];
  if (eok > 0) parts.push(`${eok}억`);
  if (man > 0) parts.push(`${man.toLocaleString()}`);

  return parts.length > 0 ? parts.join(' ') : '0';
}

export function m2ToPyeong(m2: number): number {
  return Math.round((m2 * 0.3025) * 10) / 10;
}

export function pyeongToM2(pyeong: number): number {
  return Math.round((pyeong / 0.3025) * 10) / 10;
}

export function formatArea(m2: number, isPyeong: boolean): string {
  if (isPyeong) {
    return `${m2ToPyeong(m2)}평`;
  }
  return `${m2.toFixed(1).replace(/\.0$/, '')}m²`;
}
