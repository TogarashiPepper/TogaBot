import fetch from 'node-fetch';
const fetchJSONResults = async (url: string) => {
	const body = await fetch(url);
	const results = await body.json();
  
	if (!results) console.error("Something went wrong");
	return results;
}
export default fetchJSONResults;