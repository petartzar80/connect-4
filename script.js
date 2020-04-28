function initialize(withSpicedMode) {
  var currentPlayer = "player1";
  var close = $(".close");
  var allSlots = $(".slot");
  var winbox = $(".winbox");
  var winShadow = $(".win-shadow");
  var wintext = $(".wintext");
  var winContainer = $(".win-container");
  var overlay = $(".overlay");
  var title = $(".title");

  winbox.removeClass("box-appear");
  winShadow.removeClass("shadow-appear");
  winContainer.removeClass("on");
  winContainer.addClass("hidden");
  overlay.addClass("hidden");

  $(".column").on("click", function (e) {
    // Setting color of current player to title
    title.removeClass("red");
    title.removeClass("blue");
    title.addClass("yellow");
    function removeYellow() {
      title.removeClass("yellow");
      title.removeClass("red");
      title.removeClass("blue");
      if (currentPlayer === "player2") {
        title.addClass("blue");
      } else {
        title.addClass("red");
      }
    }
    setTimeout(removeYellow, 150);

    // Spiced mode random yellow token

    var col = $(e.currentTarget);
    var slotsInCol = col.find(".slot");
    var godRandom = Math.floor(Math.random() * 6);

    if (withSpicedMode === true) {
      if (godRandom === 2) {
        console.log("Here's God!");
        var columnRandomAdd = Math.floor(Math.random() * 6);

        slotsInCol.eq(columnRandomAdd).removeClass("player1");
        slotsInCol.eq(columnRandomAdd).removeClass("player2");
        slotsInCol.eq(columnRandomAdd).addClass("player3");
      }
    }

    // Looking for empty slots

    var foundAnEmptySlot = false;
    for (var i = 5; i >= 0; i--) {
      if (
        !slotsInCol.eq(i).hasClass("player1") &&
        !slotsInCol.eq(i).hasClass("player2") &&
        !slotsInCol.eq(i).hasClass("player3")
      ) {
        foundAnEmptySlot = true;
        break;
      }
    }
    if (!foundAnEmptySlot) {
      return;
    }

    // Blinking before adding tokens

    slotsInCol
      .eq(i)
      .children()
      .addClass("blink");

    setTimeout(function () {
      slotsInCol
        .eq(i)
        .children()
        .removeClass("blink");
    }, 150);

    slotsInCol.eq(i).addClass(currentPlayer);

    // Checking for victory

    function win() {
      title.addClass("hidden");
      close.removeClass("hidden");

      winContainer.addClass("on");
      winContainer.removeClass("hidden");
      overlay.removeClass("hidden");
      winbox.addClass("box-appear");
      winShadow.addClass("shadow-appear");
      wintext.html(currentPlayer + " won!");
    }

    if (checkForVictory(slotsInCol)) {
      console.log("column win");
      win();
    } else if (checkForVictory($(".row" + i))) {
      console.log("row win");
      win();
    } else if (checkForDiagonal()) {
      console.log("diagonal win");
      win();
    } else if (checkForAll()) {
      console.log("all win");
      currentPlayer = "God";
      win(currentPlayer);
    }

    switchPlayers();
  });

  // Checking if all slots have tokens

  function checkForAll() {
    var count = 0;
    for (var i = 0; i < allSlots.length; i++) {
      if (
        allSlots.eq(i).hasClass("player1") ||
        allSlots.eq(i).hasClass("player2") ||
        allSlots.eq(i).hasClass("player3")
      ) {
        count++;
        if (count == 42) {
          return true;
        }
      }
    }
  }

  // Check for diagonal win

  function checkForDiagonal() {
    var start7Slots = [0, 1, 2, 6, 7, 8, 12, 13, 14, 18, 19, 20];
    var start5Slots = [3, 4, 5, 9, 10, 11, 15, 16, 17, 21, 22, 23];

    for (var slotB = 0; slotB < start5Slots.length; slotB++) {
      var slot5_00 = allSlots.eq(start5Slots[slotB]);
      var slot5_05 = allSlots.eq(start5Slots[slotB] + 5);
      var slot5_10 = allSlots.eq(start5Slots[slotB] + 10);
      var slot5_15 = allSlots.eq(start5Slots[slotB] + 15);

      if (
        slot5_00.hasClass(currentPlayer) &&
        slot5_05.hasClass(currentPlayer) &&
        slot5_10.hasClass(currentPlayer) &&
        slot5_15.hasClass(currentPlayer)
      ) {
        return true;
      }
    }

    for (var slotA = 0; slotA < start7Slots.length; slotA++) {
      var slot7_00 = allSlots.eq(start7Slots[slotA]);
      var slot7_07 = allSlots.eq(start7Slots[slotA] + 7);
      var slot7_14 = allSlots.eq(start7Slots[slotA] + 14);
      var slot7_21 = allSlots.eq(start7Slots[slotA] + 21);

      if (
        slot7_00.hasClass(currentPlayer) &&
        slot7_07.hasClass(currentPlayer) &&
        slot7_14.hasClass(currentPlayer) &&
        slot7_21.hasClass(currentPlayer)
      ) {
        return true;
      }
    }
  }

  // Checking for horizontal & vertical win

  function checkForVictory(slots) {
    var count = 0;

    for (var i = 0; i < slots.length; i++) {
      if (slots.eq(i).hasClass(currentPlayer)) {
        count++;
        if (count == 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  }

  // Closing current game & starting a new one

  close.click(function () {
    console.log("clicking!");
    winContainer.removeClass("on");
    winbox.removeClass("box-appear");
    winShadow.removeClass("shadow-appear");
    function pleaseWait() {
      allSlots.removeClass("player1");
      allSlots.removeClass("player2");
      allSlots.removeClass("player3");
    }
    setTimeout(pleaseWait, 1000);
    setTimeout(function () {
      title.removeClass("red");
      title.removeClass("yellow");
      title.removeClass("blue");
      title.removeClass("hidden");
    }, 1050);

    currentPlayer = "player1";
    overlay.addClass("hidden");
    winContainer.addClass("hidden");
  });

  // Player switching

  function switchPlayers() {
    if (currentPlayer == "player3") {
      return;
    }
    if (currentPlayer == "player1") {
      currentPlayer = "player2";
    } else {
      currentPlayer = "player1";
    }
  }
}

(function main() {
  var winbox = $(".winbox");
  var winShadow = $(".win-shadow");
  var wintext = $(".wintext");
  var winContainer = $(".win-container");
  var overlay = $(".overlay");

  winbox.addClass("box-appear");
  winShadow.addClass("shadow-appear");
  winContainer.addClass("on");
  winContainer.removeClass("hidden");
  overlay.removeClass("hidden");

  wintext.html("n for Normal s for Spiced");

  $(document).one("keypress", function (e) {
    var keyCode = e.keyCode;
    console.log("keycode: ", keyCode);
    if (keyCode === 115) {
      initialize(true);
    } else if (keyCode === 110) {
      initialize(false);
    }
  });
})();
