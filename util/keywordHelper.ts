import _ from "lodash";
import keyword_extractor from "keyword-extractor";

export const extractAndFilter = (text: string) => {
  const extraction_result = keyword_extractor.extract(text, {
    language: "english",
    remove_digits: false,
    return_changed_case: true,
    remove_duplicates: true,
  });

  // Remove basic keywords from it.
  const basickeys = [
    "located",
    "hf0",
    "mansion",
    "project",
    "projects",
    "ai",
    "hack",
    "week",
    "2022",
    "AI",
    "HUMAN",
    "human",
    "interesting",
    "interested",
    "interest",
  ];

  let filtered = _.difference(extraction_result, basickeys);

  return filtered;
};
