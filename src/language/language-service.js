/* eslint-disable quotes */
const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from("language")
      .select(
        "language.id",
        "language.name",
        "language.user_id",
        "language.head",
        "language.total_score"
      )
      .where("language.user_id", user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from("word")
      .select(
        "id",
        "language_id",
        "original",
        "translation",
        "next",
        "memory_value",
        "correct_count",
        "incorrect_count"
      )
      .where({ language_id });
  },

  getLanguageHead(db, language_id) {
    return db
      .from("language")
      .select(
        "word.original",
        "word.translation",
        "language.total_score",
        "word.correct_count",
        "word.incorrect_count",
        "word.next"
      )
      .join("word", "word.id", "=", "language.head")
      .where("language.id", language_id);
  },
  getCurrentWord(db, language_id, word_id) {
    return db
      .from("word")
      .select("*")
      .where("word.id", word_id);
  },
  getNextWord(db, language_id, word_id) {
    return db
      .from("word")
      .select("original", "translation")
      .where("word.id", word_id);
  },

  updateLanguageHeadAndScore(db, language_id, head, total_score) {
    return db
      .from("language")
      .where("language.id", language_id)
      .update({ head, total_score });
  },

  getTotalWordScore(db, language_id, word_id) {
    return db
      .from("word")
      .select("*")
      .where("word.id", word_id);
  },
  updateCorrectScoreAndPosition(db, word_id, correct_count, next) {
    return db
      .from("word")
      .where("word.id", word_id)
      .update({ correct_count, next });
  },
  updateIncorrectScoreAndPosition(db, word_id, incorrect_count, next) {
    return db
      .from("word")
      .where("word.id", word_id)
      .update({ incorrect_count, next });
  },

  setHeadToNext(db, next) {
    return db
      .from("word")
      .select("original")
      .where("id", next)
      .first();
  },
  updateNext(db, id, next) {
    return db
      .from("word")
      .where("id", id)
      .update({ next });
  },
  checkGuess(db, id) {
    return db
      .from("word")
      .select("*")
      .where("id", id)
      .first();
  },

  increaseHeadMemValue(db, language_id) {
    const word = db
      .from("word")
      .select("word.id", "word.memory_value")
      .leftJoin("language", "language.head", "=", "word.id")
      .where("language.id", language_id);

    const newMemoryValue = word.memory_value * 2;

    db("word")
      .where("word.id", "=", word.id)
      .update({
        memory_value: newMemoryValue
      });

    return newMemoryValue;
  },

  resetHeadMemValue(db, language_id) {
    const id = db
      .from("word")
      .select("word.id")
      .leftJoin("language", "language.head", "=", "word.id")
      .where("language.id", language_id);

    db("word")
      .where("word.id", id)
      .update({
        memory_value: 1
      });

    return 1;
  },

  shiftWord(db, language_id, int) {
    const head = db
      .from("word")
      .select("word.id", "word.next")
      .leftJoin("language", "language.head", "=", "word.id")
      .where("language.id", "=", language_id);

    db("language")
      .where("language.id", "=", language_id)
      .update({
        head: int
      });
  }
};

module.exports = LanguageService;
