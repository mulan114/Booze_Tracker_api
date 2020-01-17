'use strict';

// exports.DATABASE_URL =
//   process.env.DATABASE_URL || "mongodb://localhost/booze_tracker_db";

// exports.TEST_DATABASE_URL =
//   process.env.TEST_DATABASE_URL || "mongodb://localhost/test_booze_tracker_db";

exports.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb+srv://capstone3:capstone3@cluster0-zwatf.mongodb.net/test?retryWrites=true&w=majority";

exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost/test_booze_tracker_db";


exports.PORT = process.env.PORT || 8080;

exports.JWT_SECRET = process.env.JWT_SECRET || 'simple_SECRET';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';