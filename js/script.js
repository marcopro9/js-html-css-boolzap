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
        //funzione di risposta automatica ok
        rispOk(1);
        function rispOk(attesa){
          //creo una variabile di countdown a cui assegno un intervallo
          var countdownSecondi = setInterval(
          // funzione per l'intervallo...
          function(){
            // ...se l'attesa arriva a 0 ...
            if (attesa === 0) {
              clearInterval(countdownSecondi);
              //...scrivi ok sul messaggio di template...
              $('.my_template .my_received_message .my_text').text('ok');
              //...aggiungi l'ora corrente al messagio di template...
              $('.my_template .my_received_message .my_text .my_hour').text(oraCorrente);
              //...attacca l'ora corrente al messaggio di template..
              $('.my_template .my_sent_message .my_text').append('<sub>' + oraCorrente + '</sub>');
              //...clona il messaggio di template e lo attacca alla chat...
              $('.my_template .my_received_message').clone().appendTo('.my_chat');
            }  else {
              //...altrimenti fa continuare il countdown
                attesa--;
              }
          }, 1000);
        }
      }
    })
  }
);
