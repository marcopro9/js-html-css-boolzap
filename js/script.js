//attendo il caricamento del documento
$(document).ready(
  // prendo l'elemento my_message_input e al keyup faccio partire una funzione
  $('.my_message_input').keyup(function() {
    // se viene premuto il tasto invio (13)...
    if (event.which === 13) {
      // ...il valore di "my_message_input", inserito nella variabile,...
      var messaggio = $(this).val();
      // ...viene inserito in un template nascosto...
      $('.my_template .my_sent_message .my_text').text(messaggio);
      // ...che viene clonato e attacato alla ul "my_chat"...
      $('.my_template .my_sent_message').clone().appendTo('.my_chat');
      // ...dopodichè il valore di "my_message_input" torna ad essere vuoto
      $('.my_message_input').val('');
    }
  })
);
