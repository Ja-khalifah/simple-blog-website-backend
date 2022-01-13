const db = require('../model');
const Category = db.category;

//saving record to the database
exports.createCategory = (req, res) => {
    Category.create({
        name: req.body.name,
        detail: req.body.detail,
        tag: req.body.tag
    }).then(category => {
        res.status(200).send({
            success: true,
            result: category,
            message: 'Category is created'
        })
    }).catch(err => {
        res.status(404).send({
            success: false,
            message: err.message
        })
    });
}

//reading all records from the database
exports.categories = (req, res) => {
    let offset = parseInt(req.params.category) * parseInt(req.params.limit)
    Category.findAndCountAll({
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

//get categories by the name parameter
exports.categoryByName = (req, res) => {
    let offset = parseInt(req.params.page) * parseInt(req.params.limit)
    Category.findAndCountAll({
        limit: parseInt(req.params.limit),
        offset: offset,
        order: [
            ['createdAt', 'DESC']
        ],
        where: {
            name: req.params.name
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

//update record in the database
exports.updateCategory = (req, res) => {
    Category.update({
        name: req.body.name,
        detail: req.body.detail,
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

//delete category

exports.deleteCategory = (req, res) => {
    Category.destroy({
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