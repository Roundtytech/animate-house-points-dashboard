
const https = require('https');

exports.handler = async function(event, context) {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0nPiFV37j3yPs1KlRmLJrTK_68qMQYpXE903Y2QM8mczDyvWCC9p5jPAh2aXwRjfwO3iLr567hYkY/pub?gid=278819802&single=true&output=csv";

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const rows = data.trim().split('\n').map(r => r.split(','));
        const result = Object.fromEntries(rows.slice(1).map(r => [r[0].trim(), parseInt(r[1])]));
        resolve({
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(result)
        });
      });
    }).on('error', (err) => {
      reject({
        statusCode: 500,
        body: JSON.stringify({ error: err.message })
      });
    });
  });
};
