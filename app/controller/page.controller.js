const db = require('../model');
const Page = db.page;

//creating a new page to the database
exports.createPage = (req, res) => {
    Page.create({
        title: req.body.title,
        content: req.body.content,
        publish: req.body.publish,
        tag: req.body.tag
    }).then(page => {
        res.status(200).send({
            success: true,
            result: page,
            message: 'A page is created successfully'
        })
    }).catch(err => {
        res.status(404).send({
            success: false,
            message: err.message
        })
    });
}

//read page i.e reading all the pages

exports.ReadingPage = (req, res) => {
    let offset = parseInt(req.params.page) * parseInt(req.params.limit)
    Page.findAndCountAll({
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

exports.ReadPagebyTitle = (req, res) => {
    let offset = parseInt(req.params.page) * parseInt(req.params.limit)
    Page.findAndCountAll({
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

//update page i.e changing some parameters of the content of the page

exports.updatePage = (req, res) => {
    Page.update({
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

exports.deletePage = (req, res) => {
    Page.destroy({
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