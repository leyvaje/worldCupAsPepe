export interface WorldCup {
  year: number;
  host: string;
  winner: string;
  runnerUp: string;
  score: string;
  mvp: string;
  mvpCountry: string;
  mvpType: 'Golden Ball' | 'Star Player';
  fact: string;
  era: 'Origins' | 'Post-War' | 'Golden Age' | 'Modern Era';
}

export interface Era {
  id: string;
  label: string;
  range: string;
}

export type Theme = 'pitch' | 'night';
