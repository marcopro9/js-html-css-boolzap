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
          var dropdownMessInviati = $('.my_template .my_sent_message .my_dropdown')
          var chatBox = $('.my_chatbox');
          // ...il valore di "my_message_input", inserito nella variabile,...
          var valoreMessaggio =  $(this).val();
          // ...viene inserito in un template nascosto...
          messaggioUtente.text(valoreMessaggio);
          // ...contestualmente si inserisce l'ora all'interno di my_text...
          orarioCorrente.text(orario());
          messaggioUtente.append('<sub><i class="my_arrow fas fa-chevron-down"></i>' + orario() + '</sub>');
          // ...poi viene clonato il messaggio nel template e attaccato alla ul "my_chat"...
          messaggioInviato.clone().appendTo('.my_visible .my_chat');
          //...qui attacca anche il dropdown nel messaggio inviato...
          messaggioInviato.append(dropdownMessInviati);
          // ...dopodichè il valore di "my_message_input" torna ad essere vuoto
          inputMessaggio.val('');
          // come aggiungo messaggi lo scroll segue i messaggi automaticamente.
          chatBox.scrollTop($('.my_chatbox').prop('scrollHeight'));
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
                  var dropdownMessRicevuti = $('.my_template .my_received_message .my_dropdown')
                  //...scrivi ok sul messaggio di template...
                  valoreMessaggioBot.text('ok');
                  //...aggiungi l'ora corrente al messagio di template...
                  orarioCorrenteBot.text(orario());
                  //...attacca l'ora corrente al messaggio di template..
                  valoreMessaggioBot.append('<sub> <i class="my_arrow fas fa-chevron-down"></i>' + orario() + '</sub>');
                  //...qui attacca anche il dropdown nel messaggio ricevuto...
                  messaggioRicevuto.append(dropdownMessRicevuti);
                  //...clona il messaggio di template e lo attacca alla chat...
                  messaggioRicevuto.clone().appendTo('.my_visible .my_chat');
                  // come aggiunge messaggi lo scroll segue i messaggi automaticamente.
                  chatBox.scrollTop($('.my_chatbox').prop('scrollHeight'));
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

    //FUNZIONE MOSTRA DROPDOWN
    mostraDropdown();
    function mostraDropdown(){
      $(document).on('click','.my_arrow',
      function () {
        $(this).parent('sub').parent('p').siblings('.my_dropdown').toggle();
      });
    }

    // FUNZIONE ELIMINA MESSAGGIO
    eliminaMessaggio();
    function eliminaMessaggio(){
      $(document).on('click','.my_delete',
        function () {
          $(this).parent('.my_dropdown').parent('.my_received_message').remove();
          $(this).parent('.my_dropdown').parent('.my_sent_message').remove();
      })
    }

    //FUNZIONE CAMBIO FINESTRA CHAT
    cambioChat()
    function cambioChat(){
      //al click sul contatto nella lista...
      $('.my_chats .my_chat_list .my_chat_element').click(
        function(){
          //aggiunge la classe my_active all'elemento cliccato e la rimuove agli altri...
          $(this).addClass('my_active');
          $(this).siblings().removeClass('my_active')
          //...prende gli attributi dell'elemento cliccato in lista contatti...
          var contact = $(this).attr('data-contact');
          var immagine = $(this).find('img').attr('src');
          var name = $(this).find('h2').text();
          //... e cambia la chat in base ai valori degli attributi...
          var select ='.my_chatbox[data-chat="' + contact + '"]'
          var currentAvatar = $('.my_chat_person').find('img').attr('src', immagine);
          var currentName = $('.my_chat_person').find('h2').text(name)
          // ...dopodichè aggiunge my_hidden a tutte le chat e lascia visibile solo quella del contatto cliccato
          $('.my_chatbox').addClass('my_visible');
          $(select).siblings().removeClass('my_visible');
        }
      );
    }
  }
);
