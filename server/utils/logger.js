const request = require('request');
const LOGGER_URL = process.env.LOGGER_URL;

module.exports = async (res, req) => {
  //  Ignore static calls
  if (req.url.includes('static')) {
    return;
  }
  res.date = Date.now();

  try {
    res.data = JSON.parse(res.data.toString('utf8'));
  } catch (err) {
    //  In case the data is not a JSON we just transform it into a string
    res.data = res.data.toString('utf8');
  }
  const log = {
    req: {
      base: req.baseUrl,
      url: req.url,
      path: req.path,
      method: req.method,
      date: req.date,
      headers: req.headers,
      params: req.params,
      query: req.query,
      body: req.body
    },
    res: {
      statusCode: res.statusCode,
      date: res.date,
      time: res.date - req.date,
      headers: res.headers,
      data: res.data
    }
  };
  request.post({ url: LOGGER_URL, json: log }, (err, httpResponse, html) => {});
};
