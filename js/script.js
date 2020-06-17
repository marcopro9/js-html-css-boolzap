//attendo il caricamento del documento
$(document).ready(
  function (){
    var time = new Date();
    var ore = time.getHours()
    var minuti = time.getMinutes().toString();
    if (minuti.toString().length < 2) {
      minuti = '0'+ minuti;
    }
    var oraCorrente = ore + ':' + minuti;
    // prendo l'elemento my_message_input e al keypress faccio partire una funzione
    $('.my_message_input').keypress(function() {
      // se viene premuto il tasto invio (13)...
      if ((event.which === 13) || (event.keyCode === 13)) {
        // ...il valore di "my_message_input", inserito nella variabile,...
        var messaggio =  $(this).val();
        // ...viene inserito in un template nascosto...
        $('.my_template .my_sent_message .my_text').text(messaggio);
        // ...contestualmente si inserisce l'ora all'interno di my_text...
        $('.my_template .my_sent_message .my_text .my_hour').text(oraCorrente);
        $('.my_template .my_sent_message .my_text').append('<sub>' + oraCorrente + '</sub>');
        // ...poi viene clonato il messaggio nel template e attaccato alla ul "my_chat"...
        $('.my_template .my_sent_message').clone().appendTo('.my_chat');
        // ...dopodichè il valore di "my_message_input" torna ad essere vuoto
        $('.my_message_input').val('');
        // come aggiungo messaggi lo scroll segue i messaggi automaticamente.
        $('.my_chatbox').scrollTop($('.my_chatbox').height());
      }
    })
  }
);
