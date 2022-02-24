const model = require('./model');

exports.create = async (req, res) => {
  try {
    const body = req.body;
    if (req.role !== 'admin') return res.status(401);
    if (body.post.length < 255) {
      return res.status(200).send({
        status: false,
        success: null,
        error: { message: 'Minimum character for post is 255!' },
      });
    }
    const post = await model.create(body);
    return res.status(200).send({
      status: true,
      success: {
        message: 'Post added successfully!',
        data: [post.post],
      },
      error: null,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      success: null,
      error: {
        message: 'Something went wrong!',
      },
    });
  }
};

exports.fetch = async (req, res) => {
  try {
    const pageOptions = {
      page: parseInt(req.query.page) > 1 ? parseInt(req.query.page) - 1 : 0,
      limit: parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 10,
    };
    const posts = await model
      .find({ active: true }, { _id: 1, post: 1 })
      .sort({ createdAt: -1 })
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit);
    if (posts.length === 0) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'No posts found!',
        },
      });
    } else {
      res.status(200).send({
        status: true,
        success: {
          message: 'Posts fetched successfully!',
          data: posts,
        },
        error: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      success: null,
      error: {
        message: 'Something went wrong!',
      },
    });
  }
};

exports.update = async (req, res) => {
  try {
    const body = req.body;
    if (req.role !== 'admin') return res.status(401);

    if (body.post.length < 255) {
      return res.status(200).send({
        status: false,
        success: null,
        error: { message: 'Minimum character for post is 255!' },
      });
    }
    await model.findByIdAndUpdate({ _id: req.params.id }, body);
    return res.status(204);
  } catch (error) {
    res.status(500).send({
      status: false,
      success: null,
      error: {
        message: 'Something went wrong!',
      },
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const body = { active: false };
    if (req.role !== 'admin') return res.status(401);

    await model.findByIdAndUpdate({ _id: req.params.id }, body);
    return res.status(204);
  } catch (error) {
    res.status(500).send({
      status: false,
      success: null,
      error: {
        message: 'Something went wrong!',
      },
    });
  }
};
