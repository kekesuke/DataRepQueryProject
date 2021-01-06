const express = require('express')
const router = express.Router();
const auth = require('../../Middleware/Auth')

//item model
const Item = require('../../Models/Item')

//@route GET api/items
//@desc Get all Items
//@access private auth needed

router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
})

//@route POST api/items
//@desc create post
//@access private auth needed

router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })
    newItem.save().then(item => res.json(item));
})

//@route delete api/items
//@desc delete item
//@access private auth needed
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})
module.exports = router;