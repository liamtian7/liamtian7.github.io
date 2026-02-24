export default {
  async fetch(request) {
    const url = new URL(request.url);
    const source = url.searchParams.get('source');
    const date = url.searchParams.get('date');

    const NYT_KEY = 'daUUHflQZcuAQRGdSKta81ygH4T4TUoSGa2fkxeGqgFcDmEE';
    const GUARDIAN_KEY = '7a2fb983-1153-49a9-906b-137863711dec';

    let apiUrl;
    if (source === 'nyt') {
      const [year, month] = date.split('-');
      apiUrl = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${NYT_KEY}`;
    } else if (source === 'guardian') {
      apiUrl = `https://content.guardianapis.com/search?from-date=${date}&to-date=${date}&page-size=15&api-key=${GUARDIAN_KEY}`;
    } 
  } else if (source === 'loc') {
  apiUrl = `https://www.loc.gov/collections/chronicling-america/?dl=page&end_date=${date}&searchType=advanced&start_date=${date}&fo=json`;
}

    try {
      const response = await fetch(apiUrl);
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { error: 'Invalid response from source', raw: text.slice(0, 200) };
      }
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    }
  }
}
