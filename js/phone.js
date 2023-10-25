const loadData = async(searchText,isShowAll)=>{
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();  
    const phone = data.data;
    displayPhone(phone,isShowAll);
}
const displayPhone = (phones,isShowAll) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showMore = document.getElementById('show-more-container');
    if(phones.length > 12 && !isShowAll){
        showMore.classList.remove('hidden');
    }else{
        showMore.classList.add('hidden');
    }
    // console.log('isshowall',isShowAll);
    if(!isShowAll){
        phones = phones.slice(0,9);
    }
    phones.forEach(phone => {
        //console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-base-100 shadow-xl p-4 gap-y-4 container mx-auto`;
        phoneCard.innerHTML= `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>Brand: ${phone.brand}</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>`;
        phoneContainer.appendChild(phoneCard);
        
    });
    
    toggleSpinner(false);
}

// const searchHandler = () =>{
//     const searchField = document.getElementById('search-field');
//     const searchText = searchField.value;
//     loadData(searchText);
// }

const handleSearch =(isShowAll)=>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    toggleSpinner(true);
    loadData(searchText,isShowAll);
}
const toggleSpinner = (isLoading) =>{
    const spinner = document.getElementById('loading-spinner');
    if(isLoading){
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden');
    }
}

const handleShowAll = (isShowAll)=>{
     handleSearch(true);
}

loadData();
