function onDeleteButtonClick(deckId) {
    $('#deleteDeckModal #deckId').val(deckId);
    $('#deleteDeckModal').modal();
}

function onDeleteConfirm() {
    var deckId = $('#deleteDeckModal #deckId').val();
    $.ajax({
        method: "DELETE",
        url: "deck/" + deckId
    }).done(function() {
        window.location.reload();
    });
}