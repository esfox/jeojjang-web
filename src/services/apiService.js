const discordID = window.location.pathname.slice(1);
const api = 'https://jeojjang.glitch.me/api';
// const api = process.env.PROJECT_DOMAIN?
//   `https://jeojjang.glitch.me/api` :
//   `http://localhost:7777/api`;

const user = `${api}/user/${discordID}`
const media = `${api}/media/${discordID}?limit=25`;
const count = `${api}/count/${discordID}?`;
const tags = `${api}/tags`;

function request(link, plain)
{
  return fetch(link)
    .then(response => !plain? response.json() : response.text())
    .catch(console.error);
}

function getDiscordUserData()
{
  if(discordID === '')
    return;

  return request(user);
}

async function getMediaPages(tags)
{
  let link = count;
  if(tags)
    link += `&tags=${tags}`;

  const pages = await request(link, true);
  return Math.ceil(pages / 25);
}

async function getMedia(page = 1, tags)
{
  let link = media;
  if(page)
    link += `&page=${page}`;
  if(tags)
    link += `&tags=${tags}`;

  let data = await request(link);
  data = data.map(({ id, link, tags, createdAt }) =>
  {
    createdAt = new Date(createdAt);
    const item =
    {
      id,
      link,
      tags,
      savedAt: `${createdAt.getMonth() + 1}/${createdAt.getDate()}/`
        + createdAt.getFullYear(),
    };
    return item;
  });
  return data;
}

function getTags()
{
  return request(tags);
}

function isPublic()
{
  return !discordID;
}

export { getDiscordUserData, getMediaPages, getMedia, getTags, isPublic };
