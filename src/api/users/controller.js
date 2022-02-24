const bcrypt = require('bcryptjs');
const model = require('./model');
const auth = require('../auth/controller');

const addUser = async (body) => {
  try {
    const password = await bcrypt.hashSync(body.password, 5);
    body.password = password;
    const userData = new model(body);
    const insertedUser = await userData.save();
    const user = await model.findOne(
      { _id: insertedUser._id },
      { password: 0 }
    );
    const token = {
      token: await auth.generateToken(
        { userId: user._id, userRole: user.role },
        {}
      ),
    };
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.login = async (req, res) => {
  try {
    const body = req.body;
    body.password = body.password.toString();
    const userData = await model.findOne(
      { username: body.username },
      { password: 0 }
    );
    if (!userData) {
      const token = await addUser(body);
      return res.status(200).send({
        status: true,
        success: {
          message: 'Login successfully!',
          data: [token],
        },
        error: null,
      });
    } else {
      const password = (
        await model.findOne({ username: body.username }, { password: 1 })
      ).password;
      const passwordsMatch = await bcrypt.compareSync(body.password, password);
      if (passwordsMatch) {
        const token = {
          token: await auth.generateToken(
            { userId: userData._id, userRole: userData.role },
            {}
          ),
        };
        res.status(200).send({
          status: true,
          success: {
            message: 'Login successfully!',
            data: [token],
          },
          error: null,
        });
      } else {
        res.status(500).send({
          status: false,
          success: null,
          error: {
            message: 'Password mismatched!',
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      success: null,
      error: {
        message: 'Something went wrong!',
      },
    });
  }
};
