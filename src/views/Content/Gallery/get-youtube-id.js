// regex for getting YouTube video ID
// eslint-disable-next-line
const youTubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

function getYouTubeID(url)
{
  const [ , youTubeID ] = url.match(youTubeRegex);
  return youTubeID;
}

export { getYouTubeID };
