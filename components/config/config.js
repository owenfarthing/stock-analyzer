const NETWORK = {
  MIN_RECORDS: 0,
  SPLITS: [
    "90/10",
    "85/15",
    "80/20",
    "75/25",
    "70/30",
    "65/35",
    "60/40",
    "55/45",
    "50/50",
  ],
  MIN_ITERATIONS: 5,
  MAX_ITERATIONS: 100,
  MIN_PATIENCE: 0,
  MAX_PATIENCE: 15,
};

const EXPERIMENTS = {
  MAX_ENTRIES_PER_PAGE: 8,
  MAX_PAGES: 5,
};

const DATASETS = {
  MAX_FILE_SIZE: 50,
  ACCEPTED_FILE_TYPES: ["csv", "xlsx"],
  MAX_COLUMNS_SHOWN: 10,
  MAX_COLUMN_OFFSET: 10,
};

module.exports = {
  NETWORK,
  EXPERIMENTS,
  DATASETS,
};
