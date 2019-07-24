var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render("pages/download", {title: "Download Page"});
});

module.exports = router;
