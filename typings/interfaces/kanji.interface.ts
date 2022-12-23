export interface KanjiWordData {
  word: string;
  meaning: string;
  on_reading: {
    reading: string;
    example: {
      eg: string;
      meaning: string;
      pronounciation: string;
    };
  };
  kun_reading: {
    reading: string;
    example: {
      eg: string;
      meaning: string;
      pronounciation: string;
    };
  };
  level: number;
}
