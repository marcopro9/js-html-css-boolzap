//attendo il caricamento del documento
$(document).ready(
  function (){

    // FUNZIONE ORARIO
    function orario(){
      // vado a prendere l'ora da inserire affianco il messaggio...
      var time = new Date();
      // ...prendo solo ore e minuti...
      var ore = time.getHours();
      var minuti = time.getMinutes().toString();
      //...passo i minuti come stringa e se la lunghezza della stringa è minore di 2...
      if (minuti.toString().length < 2) {
        // faccio aggiungere uno 0
        minuti = '0'+ minuti;
      }
      // risultato
      return ore + ':' + minuti;
    }

    //FUNZIONE INVIO MESSAGGIO UTENTE / RISPOSTA OK BOT
    messaggioUtenteBot();
    function messaggioUtenteBot(){
      // prendo l'elemento my_message_input e al keypress faccio partire una funzione
      var inputMessaggio = $('.my_message_input');
      inputMessaggio.keypress(function() {
        // se viene premuto il tasto invio (13)...
        if ((event.which === 13) || (event.keyCode === 13)) {
          // variabili per selezionare gli elementi del dom
          var messaggioUtente = $('.my_template .my_sent_message .my_text');
          var orarioCorrente = $('.my_template .my_sent_message .my_text .my_hour');
          var messaggioInviato = $('.my_template .my_sent_message');
          var chatBox = $('.my_chatbox');
          // ...il valore di "my_message_input", inserito nella variabile,...
          var valoreMessaggio =  $(this).val();
          // ...viene inserito in un template nascosto...
          messaggioUtente.text(valoreMessaggio);
          // ...contestualmente si inserisce l'ora all'interno di my_text...
          orarioCorrente.text(orario());
          messaggioUtente.append('<sub>' + orario() + '</sub>');
          // ...poi viene clonato il messaggio nel template e attaccato alla ul "my_chat"...
          messaggioInviato.clone().appendTo('.my_chat');
          // ...dopodichè il valore di "my_message_input" torna ad essere vuoto
          inputMessaggio.val('');
          // come aggiungo messaggi lo scroll segue i messaggi automaticamente.
          chatBox.scrollTop($(this).height());
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
                  // variabili per selezionare gli elementi del dom
                  var valoreMessaggioBot = $('.my_template .my_received_message .my_text');
                  var orarioCorrenteBot = $('.my_template .my_received_message .my_text .my_hour');
                  var messaggioRicevuto = $('.my_template .my_received_message');
                  //...scrivi ok sul messaggio di template...
                  valoreMessaggioBot.text('ok');
                  //...aggiungi l'ora corrente al messagio di template...
                  orarioCorrenteBot.text(orario());
                  //...attacca l'ora corrente al messaggio di template..
                  valoreMessaggioBot.append('<sub>' + orario() + '</sub>');
                  //...clona il messaggio di template e lo attacca alla chat...
                  messaggioRicevuto.clone().appendTo('.my_chat');
                } else {
                    //...altrimenti fa continuare il countdown
                    attesa--;
                  }
              }
            ,1000);
          }
        }
      });
    }

    // FUNZIONE RICERCA CONTATTI
    ricercaContatti();
    function ricercaContatti(){
      // seleziona my_input e al keyup parte la funzione...
      var inputRicercaContatti = $(".my_input");
      inputRicercaContatti.on("keyup", function() {
        // ...il valore dell'input viene forzato a diventare minuscolo
        var value = $(this).val().toLowerCase();
        // seleziona l'elemento ul>li filtra e fa partire la funzione...
        var contatti = $(".my_chat_list .my_chat_element");
        contatti.filter(
          function() {
            //...gli elementi li vengono attivati/disattivati, il testo va in minuscolo e cerca tra gli li
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
          });
      });
    }

    //funzione per eliminare il messaggio
    $('.my_arrow_received').click(
    function () {
    $('.my_dropdown_received').toggle();
    });

    $('.my_arrow_sent').click(
    function () {
    $('.my_dropdown_sent').toggle();
    });

    // All click su "elimina messaggio" - elimino tutto il mesaggio
    $('.my_delete_received').click(
      function () {
        $('.my_received_message').remove();
    });
    $('.my_delete_sent').click(
      function () {
        $('.my_sent_message').remove();
    });
  }
);
