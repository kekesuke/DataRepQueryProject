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
        name: req.body.name,
        slot: req.body.slot,
        price: req.body.price,
        imgUrl: req.body.imgUrl,

    })
    newItem.save().then(item => res.json(item));
})

//get item by id
router.get('/:id', (req, res) => {
    Item.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

//update
//listening for put request to update
router.put('/:id', (req, res) => {
    console.log("TEEEEEEEST")
    //searching and update
    Item.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, data) => {
        res.send(data);
    })
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