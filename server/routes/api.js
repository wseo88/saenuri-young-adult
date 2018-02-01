const express = require('express');

const router = new express.router;

router.get('/dashboard', (req, res) => {
    res.status(200).json({
        message: "You are authorized to see this secret message!"
    });
});

module.exports = router;
