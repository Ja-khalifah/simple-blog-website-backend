const {
    comment
} = require('../model');
const db = require('../model');
const Comment = db.comment;

//creating a new comment

exports.createComment = (req, res) => {
    Comment.create({
        content: req.body.content
    }).then(comment => {
        res.status(200).send({
            success: true,
            result: comment,
            message: 'A comment is created successfully'
        })
    }).catch(err => {
        res.status(404).send({
            success: false,
            message: err.message
        })
    });
}

//read comments

exports.ReadComment = (req, res) => {
    let offset = parseInt(req.params.comment) * parseInt(req.params.limit)
    Comment.findAndCountAll({
        limit: parseInt(req.params.limit),
        offset: offset,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(result => {
        res.status(200).send({
            result: result,
            success: true
        })
    }).catch(err => {
        res.status(400).send({
            message: err.message,
            success: false
        })
    })
}

//read comment by content

exports.ReadCommentByContent = (req, res) => {
    let offset = parseInt(req.params.comment) * parseInt(req.params.limit)
    Comment.findAndCountAll({
        limit: parseInt(req.params.limit),
        offset: offset,
        order: [
            ['createdAt', 'updatedAt']
        ],
        where: {
            content: req.body.content
        }
    }).then(result => {
        res.status(200).send({
            result: result,
            success: true
        })
    }).catch(err => {
        res.status(400).send({
            message: err.message,
            success: false
        })
    })
};

//update comment

exports.updateComment = (req, res) => {
    Comment.update({
        content: req.body.content
    }, {
        where: {
            id: parseInt(req.body.id)
        }
    }).then(result => {
        res.status(200).send({
            result: result,
            success: true
        })
    }).catch(err => {
        res.status(400).send({
            message: err.message,
            success: false
        })
    })
}

//delete comment

exports.deleteComment = (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.status(200).send({
            result: result,
            success: true
        })
    }).catch(err => {
        res.status(400).send({
            message: err.message,
            success: false
        })
    })
}