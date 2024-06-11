const shortid=require("shortid")
const URL =require('../models/url');
async function handleGenerateNewShortURL(req,res){
    const body=req.body;
 
    console.log(body);
    if(!body.url)return res.status(400).json({error:'url is require'})
    const shortID= shortid();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
        createdBy: req.user._id,
    })
    return res.json({id:shortID});
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

async function handleGetShortidLink(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );

    if (entry) {
        res.redirect(entry.redirectURL);
    } else {
        res.status(404).json({ error: 'Short URL not found' });
    }
}

// async function handleGetAllUrls(req, res) {
//     if (!req.user) return res.redirect("/login");
//     const urls = await URL.find({ createdBy: req.user._id });
//     //const urls = await URL.find({});
//     res.json({ urls });
// }
async function handleGetAllUrls(req, res) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  
    try {
      const urls = await URL.find({ createdBy: req.user._id });
   
      res.json({ urls });
    } catch (error) {
      console.error('Error fetching URLs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleGetShortidLink,
    handleGetAllUrls
};