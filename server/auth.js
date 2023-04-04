const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jwtSecretKey = process.env.JWT_SECRET_KEY

const generatePasswordHash = async (password, saltRounds) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

const validatePassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
};

const generateUserToken = (userData) => {
	const exp = Math.floor(Date.now() / 1000) + 60 * 60;
	const payload = {
		userData,
		exp: exp
	}
	
	const jwt_Key = jwtSecretKey;
  	const token = jwt.sign(payload, jwt_Key);
  	return token;
};

const verifyToken = (token) => {
	const jwt_Key = jwtSecretKey;
	const verified = jwt.verify(token, jwt_Key);
	console.log(verified)
	return verified
}

module.exports = {
    generatePasswordHash,
    validatePassword,
    generateUserToken,
	verifyToken
};

