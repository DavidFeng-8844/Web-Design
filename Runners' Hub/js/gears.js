$(document).ready(function () {
        ////////////////////////////Gear Page//////////////////////////////////////
    //Function to show the draggable modal window
    document.getElementById('openModalIcon').addEventListener('click', function () {
        $('#draggableModal').modal('show');
    });
    
    // Add an event listener for drag and drop functionality
    let dragged;
    
    document.addEventListener('dragstart', function (event) {
      // store a reference to the dragged element
      dragged = event.target;
      // make it half transparent
      event.target.style.opacity = .5;
    });
    
    document.addEventListener('dragover', function (event) {
      // prevent default to allow drop
      event.preventDefault();
    });
    
    document.addEventListener('drop', function (event) {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged element to the top of the list
      if (event.target.className === 'draggable-card') {
        event.target.parentNode.insertBefore(dragged, event.target);
      } else if (event.target.className === 'modal-body') {
        event.target.appendChild(dragged);
      }
    });

    // Function to add an item to the comparison modal
    function addItemToModal(content) {
        let container = document.getElementById('modal-cards-container');
        let newCard = document.createElement('div');
        newCard.className = 'draggable-card';
        newCard.draggable = true;
        newCard.innerHTML = `
        <p>${content}</p>
        <span class="remove-icon" style="position: relative" onclick="removeCard(this)">&#128465;</span>
      `;
        container.appendChild(newCard); 
        saveCardOrder();
      }

    // Function to save the order of cards to localStorage
    function saveCardOrder() {
        let cards = document.querySelectorAll('.draggable-card');
        let order = [];
        cards.forEach(function (card) {
          order.push(card.outerHTML);
        });   
        localStorage.setItem('cardOrder', JSON.stringify(order));
    }

    // Function to load the order of cards from localStorage
    function loadCardOrder() {
        let order = localStorage.getItem('cardOrder');
        if (order) {
          order = JSON.parse(order);
          let container = document.getElementById('modal-cards-container');
          container.innerHTML = order.join('');
        }
    }

    // Add an event listener to the icons to add items to the comparison modal
    let addButtons = document.querySelectorAll('.add-to-comparison');
    addButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        let content = button.getAttribute('shoe-comparsion-content');
        addItemToModal(content);
      });
    });

    document.addEventListener('dragend', function (event) {
      // reset the transparency
      event.target.style.opacity = '';
      // save the order of cards to localStorage
      saveCardOrder();
    });

    // Load the initial order of cards when the page is loaded
    loadCardOrder();
    

    // Add an event listener to the buttons to add content to the comparison modal
    let addButtonTemplates = document.querySelectorAll('.add-to-modal');
    addButtonTemplates.forEach(function (button) {
      button.addEventListener('click', function () {
        let content = button.getAttribute('shoe-comparsion-content');
        addItemToModal(content);
      });
    });
    

    // Function to remove a card from the comparison modal
    window.removeCard = function (element) {
        let card = element.parentNode;
        card.parentNode.removeChild(card);
        // save the order of cards to localStorage
        saveCardOrder();
    };
});