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
    } else if (source === 'loc') {
  const dateFmt = date.replace(/-/g, '');
  apiUrl = `https://chroniclingamerica.loc.gov/search/pages/results/?date1=${dateFmt}&date2=${dateFmt}&format=json&rows=15`;
}

    const response = await fetch(apiUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
