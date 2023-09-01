import $ from 'jquery';
import { refreshGame, puzzle, solution } from './js/sudoku.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Logo from './assets/img/logo.jpg';

$("link").attr('href', Logo);
$(document).ready(() => {
    let numSelected = null;
    let checks = 0;
    let timerInterval;
    let board = puzzle[0];
    let answer = solution[0];

    $("#new-game").on("click", refreshGame);
    startTimer();

    let idArray = [];

    function selectNumber() {
        if (numSelected != null) {
            numSelected.removeClass("sudoku-number-selected");
        }
        numSelected = $(this);
        numSelected.addClass("sudoku-number-selected");
    }

    function selectTile() {
        if (numSelected) {
            $(this).removeClass("sudoku-correct sudoku-wrong").text(numSelected.attr("id"));
        }
    }

    function startTimer() {
        let seconds = 0;
        timerInterval = setInterval(function () {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            // Display the timer in the timer element
            $('#timer').text(`${minutes}:${remainingSeconds}`);
        }, 1000);
    }
    
    // Function to stop the timer
    function stopTimer() {
        clearInterval(timerInterval);
    }    

    const setGame = () => {
        // Digits 1-9
        for (let i = 1; i <= 9; i++) {
            let number = $("<div>").attr("id", i).addClass("sudoku-number").text(i).on("click", selectNumber);
            $("#digit-panel").append(number);
        }

        // Board 9x9
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                let tile = $("<div>")
                    .attr("id", r + "-" + c).addClass("sudoku-tile")
                    .on("click", selectTile);
                if (r == 2 || r == 5) {
                    tile.addClass("sudoku-horizontal-line");
                }
                if (c == 2 || c == 5) {
                    tile.addClass("sudoku-vertical-line");
                }

                idArray.push(tile.attr("id"));

                if (board[r][c] != "-") {
                    tile.text(board[r][c]).addClass("sudoku-tile-start").off("click", selectTile);
                }

                $("#sudoku-board").append(tile);
            }
        }
    };

    const Validate = () => {
        checks += 1;
        $(".checks-count").text(checks);
        let checker = [];
        let checker2 = [];

        idArray.forEach((element) => {
            let numberTile = $("#" + element);
            let coords = element.split("-"); // ["0", "0"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            if (answer[r][c] == numberTile.text()) {
                numberTile.removeClass("sudoku-wrong").addClass("sudoku-correct").off("click", selectTile);
            } else {
                numberTile.removeClass("sudoku-correct").addClass("sudoku-wrong");
            }

            checker.push(answer[r][c]);
            checker2.push(numberTile.text());
        });

        if (checker.join("") == checker2.join("")) {
            $(".mode-alert").show(1000);
            $("body").addClass("sudoku-winner");
            stopTimer();
            $("#check-button").off("click", Validate);

            if (checks === 1) {
                $(".grade").text("Perfect");
            } else if (checks >= 2 && checks <= 4) {
                $(".grade").text("Excellent");
            } else if (checks >= 5 && checks <= 8) {
                $(".grade").text("Good");
            } else {
                $(".grade").text("Fair");
            }
        }
    };

    $("#check-button").on("click", Validate);

    setGame();
    $(".btn-close").click(function () {
        $(".mode-alert").hide();
    });
});