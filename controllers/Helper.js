import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Helper {
  /**
   * @description - Hash password method
   * @param {string} - password
   * @returns {string} - returns the hashed password
  */

  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  /**
  * @description - compares password
  * @param {string} - password
  * @returns {Boolean} - returns true or false
  */

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
   * @description - chech if email is valid
   * @param {string} - email
   * @returns {Boolean} - returns true or false
   */

  static isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  /**
   * @description - generates token
   * @param {string} - id
   * @returns {string} - token
   */

  static generateToken(id) {
    const token = jwt.sign({ userId: id },
      process.env.SECRET, { expiresIn: '2h' });
    return token;
  }
}

export default Helper;
