export default {
  async fetch(request) {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    const key = 'YOUR_NYT_API_KEY';

    const [year, month] = date.split('-');
    const apiUrl = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${key}`;

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
