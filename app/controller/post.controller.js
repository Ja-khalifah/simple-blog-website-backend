const {
    post
} = require('../model');
const db = require('../model');
const Post = db.post;

//creating a new post

exports.createPost = (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        publish: req.body.publish,
        tag: req.body.tag,
        categoryId: req.body.categoryId == null ? 1 : req.body.categoryId
    }).then(post => {
        res.status(200).send({
            success: true,
            result: post,
            message: 'A post is created successfully'
        })
    }).catch(err => {
        res.status(404).send({
            success: false,
            message: err.message
        })
    });
}

//read post i.e reading all the posts

exports.ReadingPost = (req, res) => {
    let offset = parseInt(req.params.post) * parseInt(req.params.limit)
    Post.findAndCountAll({
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

//read page i.e reading pages by title 

exports.ReadPostbyTitle = (req, res) => {
    let offset = parseInt(req.params.post) * parseInt(req.params.limit)
    Post.findAndCountAll({
        limit: parseInt(req.params.limit),
        offset: offset,
        order: [
            ['createdAt', 'DESC']
        ],
        where: {
            title: req.body.title,
            // content: req.body.content
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

//update post i.e changing some parameters of the content of the post

exports.updatePost = (req, res) => {
    Post.update({
        title: req.body.title,
        content: req.body.content,
        publish: req.body.publish,
        tag: req.body.tag
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

//delete page i.e deleting data from your data

exports.deletePost = (req, res) => {
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