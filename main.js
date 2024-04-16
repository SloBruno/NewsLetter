function search() {
    const enviar = document.querySelector("#enviar");

    fetchNoticias('Brasil');

    enviar.addEventListener('click', e => {
        e.preventDefault();
        let input = document.querySelector("input[name='input']").value;

        if (typeof input === "string" && input.length > 0 && input.length <= 50) {
            fetchNoticias(input);
            return;
        }
        else{
            fetchNoticias('Brasil');
        }
    });

};



function fetchNoticias(input) {

    const container = document.querySelector('.container');

    container.innerHTML = '';

    let url = ` https://newsapi.org/v2/everything?q=${input}&sortBy=relevancy&apiKey=86273464b81041c38d232bdf1f10de6e`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            
            let noticias = data.articles.filter(news => news.title != "[Removed]");
            console.log(noticias);

            for(let i = 0; i < 50; i++){
                addNews(i, noticias);
            };
     })
    .catch(error => {
        console.error('Erro ao buscar dados:', error);
    });
    
};


function addNews(number, noticias){
    const container = document.querySelector('.container');

    const noticia = noticias[number];

    const title = `<h2>${noticia.title}</h2>`
    const description = `<p class="description">${noticia.description}</p>`
    const publishedAt = `<p class="publishedAt">Publicado em: ${noticia.publishedAt}</p>`
    const author = `<p class="author">Autor: ${noticia.author}</p>`

    const body = document.createElement('div');
    body.classList.add('body');

    body.innerHTML += title;
    body.innerHTML += description;
    body.innerHTML += publishedAt;
    body.innerHTML += author;

    const img = document.createElement('img');
    img.classList.add('img');
    img.src = noticia.urlToImage;

    const boxIcon = document.createElement('box-icon')

    boxIcon.setAttribute('size', '52px');
    boxIcon.setAttribute('name', 'chevron-right');

    const link = noticia.url;

    const a = document.createElement('a');
    a.setAttribute('target', '_blank')
    a.classList.add('noticia')
    a.href = link;
   
    a.appendChild(body);
    a.appendChild(img);
    a.appendChild(boxIcon);
    container.appendChild(a);

}

search();