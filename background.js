document.addEventListener("DOMContentLoaded", () => {
  let articles = [];
  //Fetching the featured articles for the day
  fetch(
    "https://api.hashnode.com/?query={storiesFeed(type:%20FEATURED){title,author{username,blogHandle,publicationDomain},coverImage,slug,dateFeatured}}"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      articles = data.data.storiesFeed;
      setTimeout(() => {
        createList(articles);
        document.getElementById("loader").style.display = "none";
      }, 2000);
    })
    .catch(function (e) {
      console.log(e);
    });

  //creating list
  function createList(articles) {
    let list = document.querySelector("#list");
    for (let i = 0; i < articles.length; i++) {
      let listItem = document.createElement("li");
      let imgCover = document.createElement("img");
      articles[i].coverImage != ""
        ? (imgCover.src = articles[i].coverImage)
        : (imgCover.src = "images/no-img.png");
      let title = document.createElement("h2");
      title.appendChild(document.createTextNode(articles[i].title));
      let author = document.createElement("h3");
      author.appendChild(
        document.createTextNode(`by ${articles[i].author.username}`)
      );
      let anchor = document.createElement("a");
      let publicationDomain = articles[i].author.publicationDomain;
      anchor.href = publicationDomain
        ? `https://${publicationDomain}/${articles[i].slug}`
        : `https://${articles[i].author.blogHandle}.hashnode.dev/${articles[i].slug}`;
      anchor.target = "_blank";
      anchor.appendChild(imgCover);
      anchor.appendChild(title);
      listItem.appendChild(anchor);
      listItem.appendChild(author);
      list.appendChild(listItem);
    }
  }
});
