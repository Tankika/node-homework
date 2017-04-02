function onDeleteButtonClick(itemId) {
    $('#deleteItemModal #itemId').val(itemId);
    $('#deleteItemModal').modal();
}

function onDeleteConfirm() {
    const deleteItemUrl = $('#deleteItemModal #deleteItemUrl').val(),
        itemId = $('#deleteItemModal #itemId').val();
    $.ajax({
        method: "DELETE",
        url: deleteItemUrl + itemId
    }).done(function() {
        window.location.reload();
    });
}