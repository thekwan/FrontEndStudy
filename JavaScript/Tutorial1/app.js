const container = document.getElementById('root');

const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

ajax.open('GET', NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);

window.addEventListener('hashchange', function() {
    // console.log('hash is changed!');
    // console.log(location.hash);
    const id = location.hash.substring(1);
    ajax.open('GET', CONTENT_URL.replace('@id', id), false);
    ajax.send();

    const newsConetnt = JSON.parse(ajax.response)
    const title = document.createElement('h1');
    // console.log(newsConetnt)

    title.innerHTML = newsConetnt.title;
    content.appendChild(title);
});

const ul = document.createElement('ul');
for (let i = 0; i < 10; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = `#${newsFeed[i].id}`;
    a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;

    li.appendChild(a);
    ul.appendChild(li);
}

container.appendChild(content);
container.appendChild(ul);