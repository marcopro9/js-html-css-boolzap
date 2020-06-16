$(document).ready(
  $('.my_message_input').keyup(function() {
    if (event.which === 13) {
      var messaggio = $(this).val();
      $('.1 .my_messages_right .my_mess_send .my_mess').text(messaggio);
      $('.my_mess_send').clone().appendTo('.my_messages_right');
      $('.my_message_input').val('');
    }
  })
);
