const express = require('express');
const { crawlPage, printReport } = require('../controllers/spider');
const User = require('../models/user'); 
const Spider = require('../models/spider');
const { restrictToLoggedinUserOnly, checkAuth } = require('../middlewares/auth');

const router = express.Router();

router.post('/', checkAuth, restrictToLoggedinUserOnly, async (req, res) => {
  const { baseURL } = req.body;
 
  try {
    const pages = await crawlPage(baseURL, baseURL, {});
    console.log(pages);
    const newSpider = new Spider({
      baseURL,
      report: pages,
      createdBy:req.user._id,
    });
    await newSpider.save();
    res.status(200).json({ message: 'Crawl completed and data saved.', report: pages });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during crawling.', error: error.message });
  }
});
router.get('/', checkAuth, restrictToLoggedinUserOnly, async (req, res) => {
    try {
      const spiders = await Spider.find({ createdBy: req.user._id });
      res.status(200).json(spiders);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred fetching the URLs.', error: error.message });
    }
  });
  
router.get('/report/:id', checkAuth, restrictToLoggedinUserOnly, async (req, res) => {
  const { id } = req.params;
  
  try {
    const spider = await Spider.findById(id).populate('createdBy');
    if (!spider) {
      return res.status(404).json({ message: 'Report not found.' });
    }
    res.status(200).json(spider);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred fetching the report.', error: error.message });
  }
});

module.exports = router;
