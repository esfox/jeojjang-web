const url = window.location.origin + window.location.pathname;
const queryParams = new URLSearchParams(window.location.search);
const tags = queryParams.get('tags');
const page = queryParams.get('page');

function searchTags(tagsQuery)
{
  if(!tagsQuery)
    queryParams.delete('tags');
  else
    queryParams.set('tags', tagsQuery);
  
  queryParams.delete('page');

  const params = queryParams.toString();
  go(url + (!params? '' : `?${params}`));
}

function changePage(toPage)
{
  queryParams.set('page', toPage);
  go(url + '?' + queryParams.toString());
}

function go(url)
{
  window.location.href = url;
}

function getTagsSearch()
{
  return tags || '';
}

function getPage()
{
  return page || 1;
}

export { searchTags, changePage, getTagsSearch, getPage };
