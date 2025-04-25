const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0nPiFV37j3yPs1KlRmLJrTK_68qMQYpXE903Y2QM8mczDyvWCC9p5jPAh2aXwRjfwO3iLr567hYkY/pub?gid=278819802&single=true&output=csv";

  try {
    const res = await fetch(url);
    const csv = await res.text();
    const rows = csv.trim().split('\n').map(row => row.split(','));
    const data = Object.fromEntries(rows.slice(1).map(r => [r[0].trim(), parseInt(r[1])]));
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

