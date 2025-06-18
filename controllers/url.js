const URL = require("../models/url");
const shortid = require("shortid");

async function handleGenrateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(404).json({ err: "URL is require" });
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render("home",{ id: shortID,newUrl: `http://localhost:8001/${shortID}`})

 // return res.json({ id: shortID,newUrl: `http://localhost:8001/${shortID}`});
}

async function handleGivenId(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(entry.redirectURL);
}
async function handleShowAll(req, res) {
  const data = await URL.find({});
  console.log(data);
  return res.status(200).json(data);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  console.log(result);
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  handleGenrateNewShortURL,
  handleGivenId,
  handleShowAll,
  handleGetAnalytics,
};
