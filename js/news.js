const uploadCategories = () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category) )
    .catch(error => console.log(error))


}
// Dynamically Displaying Categories

const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById('catergory-container');
    categoryContainer.textContent = '';

    categories.forEach(category =>{
        console.log(category.category_name);
        const categoryUl = document.createElement('ul');
        categoryUl.classList.add('navbar-nav');
        categoryUl.innerHTML = `
        <li class="nav-item mx-3">
                <a onclick="uploadNews('${category.category_id}')" class="nav-link text-muted mx-2  fw-semibold" aria-current="page" href="#">${category.category_name}</a>
        </li>
        `;
        categoryContainer.appendChild(categoryUl);
    });
}

const uploadNews = (id) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data =>displayNews(data.data.sort((a,b) => b.total_view - a.total_view) ))
    .catch(error => console.log(error))
    //code sorted by view above
    // start loader
    const getLoader = document.getElementById('spinner');
    getLoader.classList.remove('d-none');

}
// Displaying News Contents

const displayNews = (totalNews) =>{
    console.log(totalNews);
    

    // News Count Section

    const countContainer =document.getElementById('count-container');
    countContainer.innerHTML = '';
    const countContainerDiv = document.createElement('div');
    countContainerDiv.classList.add('fw-bold');
    countContainerDiv.innerHTML = `
    <h5 class="p-3">${totalNews.length} items found </h5>
    `;
    countContainer.appendChild(countContainerDiv);

    

    // All news Part
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    totalNews.forEach(news =>{
        console.log(news);
        const newsContainerDiv = document.createElement('div');
        newsContainerDiv.innerHTML = `
       <div class="row row-cols-sm-1 row-cols-lg-1">
            <div class="col">
            <div class="card mb-4">
            <div class="row g-0 row-cols-sm-1">
                <div class="col-md-4 ">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-4 p-3" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body mt-4">
                        <h5 class="card-title fw-bold">${news.title}</h5>
                        <p class="card-text text-muted">${news.details.length > 500 ? news.details.slice(0, 500) + '...' : news.details}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex">
                            <img src="${news.author.img}" class="img-fluid rounded-4 p-3 rounded-circle" alt="..." style="width: 80px;">
                            <div>
                                <h6 class="mt-3">${news.author.name ? news.author.name : 'No Author Name'}</h6>
                                <p class="text-muted">${news.author.published_date ? news.author.published_date.slice(0,10) : 'No Published Date'}</p>
                            </div>

                        </div>
                        <div>
                            <p><i class="fa-solid fa-eye"></i> <span>${news.total_view ? news.total_view : 'No Views'}</span> </p>
                        </div>
                        <div class="me-5"> 
                            <!-- Button trigger modal -->
                            <button onclick="displayModal('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showDetailsModal">
                            Show Details
                            </button>
                            
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
            </div>
       </div>
        `
        newsContainer.appendChild(newsContainerDiv);
    });

    // stop Loader

    const stopLoader = document.getElementById('spinner');
    stopLoader.classList.add('d-none');



}

// Loading Data On Modal

const displayModal = (modalId) =>{
    const url = `https://openapi.programming-hero.com/api/news/${modalId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data) )
    .catch(error => console.log(error))
} 
// News Details show
const displayNewsDetails = (newsId) =>{
    console.log(newsId);
    const modalTitle = document.getElementById('showDetailsModalLabel');
    modalTitle.innerText = newsId[0].title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML =`
    <img src="${newsId[0].thumbnail_url}" class="img-lg-fluid rounded-4 p-3" alt="...">
    <p>Author Image: <img src="${newsId[0].author.img}" class="img-fluid rounded-4 p-3 rounded-circle" alt="..." style="width: 80px;"></p>
    <p>Author Name: ${newsId[0].author.name ? newsId[0].author.name : 'No Author Name'}</p> 
    <p>Published Date: ${newsId[0].author.published_date ? newsId[0].author.published_date.slice(0,10) : 'No Published Date'}</p>
    <p>Views: ${newsId[0].total_view ? newsId[0].total_view : 'No Views'}</p> 
    <p>Details: ${newsId[0].details} </p>
    `

}






uploadCategories();