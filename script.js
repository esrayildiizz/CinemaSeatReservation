const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');


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
  let selectedSeatCount = container.querySelectorAll('.seat.selected').length;
  let price = select.value;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * price;

}