function addCards() {
    const addedCardsSelect = document.querySelector('#added_cards'),
        availableCardsSelect = document.querySelector('#available_cards'),
        selectedOptions = availableCardsSelect.selectedOptions;

    for(var i = selectedOptions.length - 1; 0 <= i; i--) {
        addedCardsSelect.add(selectedOptions[i]);
    }
    deselectAllCards();
}

function removeCards() {
    const addedCardsSelect = document.querySelector('#added_cards'),
        availableCardsSelect = document.querySelector('#available_cards'),
        selectedOptions = addedCardsSelect.selectedOptions;

    for(var i = selectedOptions.length - 1; 0 <= i; i--) {
        availableCardsSelect.add(selectedOptions[i]);
    }
    deselectAllCards();
}

function selectAllCards() {
    const addedCardsSelect = document.querySelector('#added_cards');

    _.forEach(addedCardsSelect.options, option => {
        option.selected = true;
    });
}

function deselectAllCards() {
    const addedCardsSelect = document.querySelector('#added_cards'),
        availableCardsSelect = document.querySelector('#available_cards');

    _.forEach(addedCardsSelect.options, option => {
        option.selected = false;
    });
    _.forEach(availableCardsSelect.options, option => {
        option.selected = false;
    });
}