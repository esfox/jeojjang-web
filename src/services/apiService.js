const discordID = window.location.pathname.slice(1);
const user = `http://localhost:7777/user/discord/${discordID}`
const userMedia = `http://localhost:7777/user_media/${discordID}`;

function request(api)
{
  return fetch(api)
    .then(response => response.json())
    .catch(console.error);
}

function getDiscordUserData()
{
  if(discordID === '')
    return;

  return request(user);
}

async function getMedia()
{
  let data = await request(userMedia);
  data = data.map(({ id, media, tags, createdAt }) =>
  {
    createdAt = new Date(createdAt);
    const item =
    {
      id,
      link: media.link,
      tags: tags.map(tag => tag.name),
      savedAt: createdAt,
    };
    return item;
  });
  return data;
}

export { getDiscordUserData, getMedia };
