// PART 3. Events
//
// This function is called once, when the page loads, to set up all of
// the static events, i.e., events that do not need to change as we
// change the contents of the board. For instance, the "Add list" button
// always does the same thing. The button doesn't appear or disappear
// and its behavior never changes.
horello.mountStatic = function() {

  // Phase 1. Static events

  // Add list form: these events control the "Add a list" form that
  // appears on the top-level board.

  // 1a. [EXAMPLE] Add list form: toggle collapse
  // This event, attached to the "Add a list..." button, should cause
  // its associated form to appear and disappear.
  $('.add-list').click(function(e) {
    $('#addList').collapse('toggle');
  });

  // 1b. Add list form: focus the title text input
  // This event, triggered whenever the "Add a list..." form appears,
  // should focus on its text input (so the user can start typing
  // immediately, without having to click again to select the text input
  // field).
  $('#addList').on('shown.bs.collapse', function (e) {
    $('#addListText').focus();
  });

  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.
  $('#addListSave').click(function(e) {
    var listName = $('#addListText').val();
    // validate input
    if (!listName) {
      alert("Please enter a list name");
      return;
    }
    board.addList(listName);
    $('#addListText').val('');
    $('#addList').collapse('toggle');
    horello.mount(board);
  });

  // 1d. Add list form: cancel button
  // This event, triggered when the "X" (cancel) button on the "Add a
  // list..." form is clicked, should hide the form.
  $('#addListCancel').click(function(e) {
    $('#addList').collapse('hide');
  });

  // Modal: these events control the modal that appears when you click
  // on a card.

  // 1b. This event, triggered when the user clicks on a card, should
  // reveal the "Edit card" modal, populated with that card's data. It
  // should store the necessary 
  $('#cardEdit').on('show.bs.modal', function (e) {
    var button = $(e.relatedTarget);
    var cardId = button.data('card-id');
    var listId = button.data('list-id');
    var list = board.getList(listId);
    var card = list.getCard(cardId);
    $('#modalText').val(card.getTitle());
    $('#modalBody').val(card.getDescription());
    $('#modalSave').data('list-id', listId);
    $('#modalSave').data('card-id', cardId);
  });

  // 1f. Modal save
  $('#modalSave').click(function (e) {
    var title = $('#modalText').val();
    var desc = $('#modalBody').val();
    if (!title) {
      alert('Please enter a title');
      return;
    }

    var listId = $(e.currentTarget).data('list-id');
    var cardId = $(e.currentTarget).data('card-id');
    var list = board.getList(listId);
    var card = list.getCard(cardId);
    card.setTitle(title);
    card.setDescription(desc);
    $('#cardEdit').modal('hide');
    horello.mount(board);
  });
}

// This function is called multiple times, to configure dynamic events.
horello.mount = function (board) {
  /*
    Note: we are NOT unbinding event listeners from elements that are
    going away. It looks like this isn't necessary with jquery per
    http://stackoverflow.com/questions/10957709/do-i-need-to-unbind-jquery-event-before-remove-element.
    However, we do remove listeners on elements that stick around so
    that we don't duplicate listeners (not 100% sure whether this is
    necessary but let's do it to be safe).
   */

  // Phase 3. Create card

  // Unrender and re-render the board.
  $('#boardAnchor').empty();
  $('#boardAnchor').append(board.render());

  // 2a. Add card forms
  // Write selectors to add the following functionality to each "Add a
  // card..." button and form:
  // - Clicking the button reveals the form
  // - When the form is revealed, the title field is focused
  // - Clicking Save validates the input and creates the new card
  // - Clicking Cancel collapses the form
  $('.add-card').each(function (idx) {
    $(this).off();

    var id = $(this).attr('addCardId');

    // Open add card form
    $(this).click(function (e) {
      $('#addCardForm'+id).collapse('toggle');
    });

    $('#addCardForm'+id).off();
    $('#addCardForm'+id).on('shown.bs.collapse', function(e) {
      $('#addCardTitle'+id).focus();
    });

    // Save new card
    $('#addCardBtn'+id).off();
    $('#addCardBtn'+id).click(function (e) {
      var val = $('#addCardTitle'+id).val();
      if (!val) {
        alert('Please enter a card title');
        return;
      }

      // Get the list object
      var list = board.getList(id);
      list.addCard(val);
      horello.mount(board);
    });

    // Cancel
    $('#addCardCancelBtn'+id).off();
    $('#addCardCancelBtn'+id).click(function (e) {
      $('#addCardForm'+id).collapse('hide');
    });
  });

  // Phase 4(a). Edit card
 
  // 4a. Re-bind card detail modals.
  $('.card').each(function (idx) {
    $(this).off();
    $(this).click(function (e) {
      $('#cardEdit').modal('toggle', $(this));
    });
  });
};
