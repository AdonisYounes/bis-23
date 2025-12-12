(function () {
  "use strict";

  /* ==========
     Link Model
     ========== */
  class Link {
    constructor(title, url, author) {
      this.title = title.trim();
      this.url = this.normalizeUrl(url);
      this.author = author.trim();
    }

    normalizeUrl(rawUrl) {
      const trimmed = rawUrl.trim();
      if (
        !trimmed.startsWith("http://") &&
        !trimmed.startsWith("https://")
      ) {
        return "http://" + trimmed;
      }
      return trimmed;
    }

    toString() {
      return `${this.title} (${this.url}) by ${this.author}`;
    }
  }

  /* ==========
     Data Store
     ========== */
  const links = [
    new Link("MDN Web Docs", "https://developer.mozilla.org", "Mozilla"),
    new Link("OpenAI", "openai.com", "OpenAI"),
    new Link("Wikipedia", "https://wikipedia.org", "Jimmy Wales")
  ];

  /* ==========
     UI Helpers
     ========== */
  function showMenu() {
    return prompt(
      "Social News Program\n" +
        "-------------------\n" +
        "1: Show the list of links\n" +
        "2: Add a new link\n" +
        "3: Remove an existing link\n" +
        "0: Quit\n\n" +
        "Enter your choice:"
    );
  }

  function showLinks() {
    if (links.length === 0) {
      alert("There are no links to display.");
      return;
    }

    let message = "Current links:\n\n";
    links.forEach((link, index) => {
      message += `${index + 1}. ${link.toString()}\n`;
    });

    alert(message);
  }

  function addLink() {
    const title = prompt("Enter the link title:");
    if (title === null) return;

    const url = prompt("Enter the link URL:");
    if (url === null) return;

    const author = prompt("Enter the link author:");
    if (author === null) return;

    const link = new Link(title, url, author);
    links.push(link);

    alert("Link added:\n" + link.toString());
  }

  function removeLink() {
    if (links.length === 0) {
      alert("There are no links to remove.");
      return;
    }

    let index;
    do {
      const input = prompt(
        `Enter the index of the link to remove (1–${links.length}):`
      );
      if (input === null) return;

      index = Number(input);
    } while (!Number.isInteger(index) || index < 1 || index > links.length);

    const removed = links.splice(index - 1, 1)[0];
    alert("Removed link:\n" + removed.toString());
  }

  /* ==========
     Main Loop
     ========== */
  function startProgram() {
    let choice;

    do {
      choice = showMenu();

      if (choice === null) {
        if (confirm("Do you want to quit?")) {
          choice = "0";
        } else {
          continue;
        }
      }

      switch (choice) {
        case "1":
          showLinks();
          break;
        case "2":
          addLink();
          break;
        case "3":
          removeLink();
          break;
        case "0":
          alert("Goodbye!");
          break;
        default:
          alert("Invalid choice.");
      }
    } while (choice !== "0");
  }

  /* ==========
     Init
     ========== */
  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("launchBtn");
    if (btn) {
      btn.addEventListener("click", startProgram);
    }
  });
})();
