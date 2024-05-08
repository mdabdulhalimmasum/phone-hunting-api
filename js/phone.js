const loadPhone = async (searchText, isShowAll) => {
    const res = await  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);
    displayPhone(phones, isShowAll);
}

const displayPhone = (phones, isShowAll) => {
    //console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    //clear phone container cards before adding new cards
    phoneContainer.textContent = ' ';
    //display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden');
    }
    else{
      showAllContainer.classList.add('hidden');
    }
    //console.log('is show all', isShowAll);
    //display only first 12 phones if not show all
    if(!isShowAll){
      phones = phones.slice(0,12);
    }

    phones.forEach(phone => {
        //console.log(phone);

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-5 bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p class="text-center">There are many variations of passages of available, but the majority have suffered</p>
          <p class="text-3xl font-bold text-center my-3">$999</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    //hide loading 
    toggleLoading(false);
}
//handle search
const handleSearch = (isShowAll) => {
    const searchInput = document.getElementById('input-value');
    const searchText = searchInput.value;
    //console.log(searchText);
    loadPhone(searchText, isShowAll);
    toggleLoading(true);
}

const toggleLoading = (isLoading) => {
  const loading = document.getElementById('loading-spanner');
  if(isLoading){
    loading.classList.remove('hidden');
  }
  else{
    loading.classList.add('hidden');
  }
}

//handle show all
const handleShowAll = () => {
  handleSearch(true);
}

//
const handleShowDetail = async (id) => {
  console.log('clicked', id)
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);

}

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-phone-name');
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img src="${phone.image}">
  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
  <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>Memory:</span>${phone?.mainFeatures?.memory}</p>
  <p><span>Release Date:</span>${phone?.releaseDate}</p>
  `
  //show the modal
  show_details_modal.showModal();
}

//loadPhone()