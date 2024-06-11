const express=require('express');
const { restrictToLoggedinUserOnly, checkAuth } = require("../middlewares/auth");
const{handleGenerateNewShortURL,handleGetAnalytics,handleGetShortidLink,handleGetAllUrls}=require('../controllers/url')
const router=express.Router();
router.post('/',restrictToLoggedinUserOnly,handleGenerateNewShortURL)
router.get('/analytics/:shortId',handleGetAnalytics)
router.get('/:shortId',handleGetShortidLink);
router.get('/', checkAuth,handleGetAllUrls); 
module.exports=router;