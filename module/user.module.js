const config = require(`${__config_dir}/app.config.json`);
const { debug } = config;
const mysql = new (require(`${__class_dir}/mariadb.class.js`))(config.db);
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class _user {
  async add(data) {
    // Validate data
    const schema = Joi.object({
      username: Joi.string(),
      password: Joi.string(),
    }).options({
      abortEarly: false,
    });

    const validation = schema.validate(data);
    if (validation.error) {
      const errorDetails = validation.error.details.map(
        (detail) => detail.message
      );
      return {
        status: false,
        code: 422,
        error: errorDetails.join(", "),
      };
    }

    const password = data.password;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const sql = {
        query: `INSERT INTO user (username, password) VALUES (?,?)`,
        params: [data.username, hashedPassword],
      };

      const insertedData = await mysql.query(sql.query, sql.params);
      return {
        status: true,
        data: insertedData,
      };
    } catch (error) {
      if (debug) {
        console.error("add user Error: ", error);
      }

      return {
        status: false,
        error,
      };
    }
  }

  async login(username, password) {
    const sql = {
      query: `SELECT id, password FROM user WHERE username = ?`,
      params: [username],
    };

    try {
      const [user] = await mysql.query(sql.query, sql.params);

      if (!user) {
        return {
          status: false,
          error: "User not found",
        };
      }

      const hashedPassword = user.password;

      const passwordMatches = await bcrypt.compare(password, hashedPassword);

      if (!passwordMatches) {
        return {
          status: false,
          error: "Incorrect password",
        };
      }

      const tokenPayload = { userId: user.id };
      const jwtSecret = "test_key"; // Replace with your own secret key
      const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: "1h" });

      return {
        status: true,
        data: {
          token,
        },
      };
    } catch (error) {
      if (debug) {
        console.error("login Error: ", error);
      }

      return {
        status: false,
        error,
      };
    }
  }

  get(data) {
    // Validate data
    const schema = Joi.object({
      id: Joi.string(),
    }).options({
      abortEarly: false,
    });
    const validation = schema.validate(data);
    if (validation.error) {
      const errorDetails = validation.error.details.map(
        (detail) => detail.message
      );

      return {
        status: false,
        code: 422,
        error: errorDetails.join(", "),
      };
    }

    const sql = {
      query: `SELECT * FROM user`,
      params: [],
    };

    return mysql
      .query(sql.query, sql.params)
      .then((data) => {
        return {
          status: true,
          data,
        };
      })
      .catch((error) => {
        if (debug) {
          console.error("get user Error: ", error);
        }

        return {
          status: false,
          error,
        };
      });
  }

  async update(data) {
    // Validate data
    const schema = Joi.object({
      id: Joi.string(),
      username: Joi.string(),
      password: Joi.string(),
    }).options({
      abortEarly: false,
    });

    const validation = schema.validate(data);
    if (validation.error) {
      const errorDetails = validation.error.details.map(
        (detail) => detail.message
      );
      return {
        status: false,
        code: 422,
        error: errorDetails.join(", "),
      };
    }

    const password = data.password;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const sql = {
        query: `UPDATE user SET username = ?, password = ? WHERE id = ?`,
        params: [data.username, hashedPassword, data.id],
      };

      const updatedData = await mysql.query(sql.query, sql.params);
      return {
        status: true,
        data: updatedData,
      };
    } catch (error) {
      if (debug) {
        console.error("update user Error: ", error);
      }

      return {
        status: false,
        error,
      };
    }
  }

  delete(data) {
    // Validate data
    const schema = Joi.object({
      id: Joi.string(),
    }).options({
      abortEarly: false,
    });
    const validation = schema.validate(data);
    if (validation.error) {
      const errorDetails = validation.error.details.map(
        (detail) => detail.message
      );

      return {
        status: false,
        code: 422,
        error: errorDetails.join(", "),
      };
    }

    const sql = {
      query: `DELETE FROM user WHERE id = ?`,
      params: [data.id],
    };

    return mysql
      .query(sql.query, sql.params)
      .then((data) => {
        return {
          status: true,
          data,
        };
      })
      .catch((error) => {
        if (debug) {
          console.error("delete user Error: ", error);
        }

        return {
          status: false,
          error,
        };
      });
  }
}

module.exports = new _user();
