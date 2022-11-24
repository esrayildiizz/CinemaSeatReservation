const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

//container içinde herhangi bir yere tıklandığında
container.addEventListener('click', function(e) {

  //tıkladığım yer bir seat(koltuk) mu ve rezerve olmayan koltuk mu diye kontrol etmeliyiz.
  if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {

    //target:hedef demek.
    //varsa silsin yoksa eklesin metodu:toggle
    e.target.classList.toggle('selected');
    calculateTotal();
  }
});

select.addEventListener('change', function() {
  calculateTotal();
});

function calculateTotal() {
  const selectedSeats = container.querySelectorAll('.seat.selected');

  const selectedSeatsArr = [];
  const seatsArr = [];

  selectedSeats.forEach(function(seat) {
    selectedSeatsArr.push(seat);
  });

  seats.forEach(function(seat) {
    seatsArr.push(push);
  });

  //seçili olan bilgilerin locale storage içerisine saklama.
  //sayfayı yenilediğimizde bilgilerin halen durmasını istiyoruz.
  //şimdi local storage içerisinde saklicak olduğumuz elemanı oluşturalım.
  //örneğin [1,3,5] şeklinde seat lerin index numaralarını bulur
  let selectedSeatIndexs = selectedSeatsArr.map(function(seat) {
    return seatsArr.indexOf(seat);
  });

  let selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;


  saveToLocalStorage(selectedSeatIndexs);
}

//localstorage den bilet bilgilerinin alınması.
function getFromLocalStorage() {

  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach(function(seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }


  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}

//localstorage e kayıt edilmesi.
function saveToLocalStorage(indexs) {
  localStorage.setItem('selectedSeats', JSON.stringify(indexs));
  localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}