function onDeleteButtonClick(cardId) {
    $('#deleteCardModal #cardId').val(cardId);
    $('#deleteCardModal').modal();
}

function onDeleteConfirm() {
    var cardId = $('#deleteCardModal #cardId').val();
    $.ajax({
        method: "DELETE",
        url: "deck/" + cardId
    }).done(function() {
        window.location.reload();
    });
}