const jokesContainer = document.querySelector(".jokes-container");
const anotherJokeBtn = document.querySelector("#another-joke-btn");
const getJokeBtn = document.querySelector("#get-joke-btn");
const btn = document.querySelector(".btn");
const jokeInput = document.querySelector("#joke-input");
const jokeHeading = document.querySelector(".joke-heading");
const jokeText = document.querySelector(".markup");

class DadJokes {
  constructor() {
    this.jokeInputValue = jokeInput.value;
    !this.jokeInputValue ? this.renderError() : this.getJokes();
  }

  randJoke = function (num) {
    return Math.floor(Math.random() * num) + 1;
  };
  toggleInput = function (markup) {
    jokeInput.classList.add("hidden");
    getJokeBtn.classList.add("hidden");
    anotherJokeBtn.classList.remove("hidden");
    this.toggleButtons(anotherJokeBtn, getJokeBtn);
    jokeText.insertAdjacentHTML(
      "afterbegin",
      `<p class="markup">${markup}</p>`
    );
    this.jokeInputValue = "";
  };

  getJokes = async function () {
    try {
      const res = await fetch(
        `https://icanhazdadjoke.com/search?term=${this.jokeInputValue}`,
        {
          headers: { Accept: "application/json" },
        }
      );
      if (!res) throw new Error("Something went wrong ://");
      const data = await res.json();
      if (data.results.length == 0) throw new Error("No results!");
      const joke = await data.results[this.randJoke(data.results.length - 1)]
        .joke;
      this.toggleInput(joke);
    } catch (err) {
      console.error(err.message);
      this.renderError("Something went wrong, try again");
    }
  };
  toggleButtons = function (on, off) {
    on.classList.remove("hidden");
    off.classList.add("hidden");
  };
  renderError = function (message = "Something went wrong, try again") {
    jokeHeading.innerHTML = message;
    setTimeout(() => {
      jokeHeading.innerHTML = `Enter a joke topic`;
    }, 1500);
  };
}

class NewJoke extends DadJokes {
  constructor() {}
}

getJokeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  new DadJokes();
});

anotherJokeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  getJokeBtn.classList.remove("hidden");
  anotherJokeBtn.classList.add("hidden");
  jokeText.innerHTML = "";
  jokeInput.classList.remove("hidden");
  jokeInput.value = "";
});
