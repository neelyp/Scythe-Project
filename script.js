// Typing effect for landing
(function () {
  const el = document.querySelector(".typing");
  if (!el) return;
  const words = JSON.parse(el.getAttribute("data-words") || "[]");
  const speed = 80;
  let idx = 0,
    pos = 0;

  function type() {
    const word = words[idx % words.length];
    el.textContent = word.slice(0, pos) + "|";
    if (pos < word.length) {
      pos++;
      setTimeout(type, speed);
    } else {
      el.textContent = word;
    }
  }
  type();
})();

// Smooth scroll for anchors
(function () {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();

// Moral dilemma game with card clicks and auto-advance
(function () {
  const game = document.getElementById("dilemma-game");
  const questionEl = document.getElementById("dilemma-question");
  const optionsEl = document.getElementById("dilemma-options");
  const progressEl = document.getElementById("dilemma-progress");
  const resetBtn = document.getElementById("dilemma-reset");
  const result = document.getElementById("dilemma-result");
  if (!game || !questionEl || !optionsEl || !progressEl || !resetBtn || !result)
    return;

  const questions = [
    {
      text: "You arrive at a crowded market to Glean. How do you proceed?",
      options: [
        {
          title:
            "Pick a random person and then invite the family to a meal afterward to get to know the person better.",
          key: "curie",
        },
        {
          title: "Pick randomly based on death statistics from the Mortal Age",
          key: "faraday",
        },
        {
          title: "Announce publicly and glean everyone in the market.",
          key: "goddard",
        },
      ],
    },
    {
      text: "A fellow Scythe bends rules to avoid Gleaning children. How do you react?",
      options: [
        {
          title:
            "Defend them, stating that children have not lived long enough to warrant being killed",
          key: "curie",
        },
        {
          title:
            "Point out the rule break, but suggest a change to the rule to make this allowed.",
          key: "faraday",
        },
        {
          title: "Call out the Scythe for being weak.",
          key: "goddard",
        },
      ],
    },
    {
      text: "Your apprentice asks you how you stay calm after a gleaning. How do you respond?",
      options: [
        {
          title: "Remember the person and not the act.",
          key: "curie",
        },
        {
          title:
            "Stay disciplined. It can be hard to not feel bad after a gleaning, but it is our duty as Scythes to do them.",
          key: "faraday",
        },
        {
          title: "Instead of feeling bad about gleaning, embrace the act",
          key: "goddard",
        },
      ],
    },
    {
      text: "Your apprentice hesitates at their first gleaning.",
      options: [
        {
          title: "Guide them through completing the gleaning with respect",
          key: "curie",
        },
        {
          title:
            "Demand that they complete it, but afterward state that hesitating shows humanity.",
          key: "faraday",
        },
        {
          title: "Force them to follow through.",
          key: "goddard",
        },
      ],
    },
    {
      text: "A group of citizens offer you gifts in exchange for immunity. What do you do?",
      options: [
        {
          title:
            "Thank them but refuse as you remind them that no one can get special treatment.",
          key: "curie",
        },
        {
          title: "Ignore them and move on.",
          key: "faraday",
        },
        {
          title: "Accept the gifts and grant them immunity",
          key: "goddard",
        },
      ],
    },
  ];

  const blurbs = {
    curie:
      "Scythe Curie Archetype: Your priority is to preserve the humanity of your job.",
    faraday:
      "Scythe Faraday Archetype: You strive to keep balance through rules and staying disciplined.",
    goddard:
      "Scythe Goddard Archetype: You treat gleaning as entertainment and seek celebrity status through being a Scythe",
  };

  let scores = { curie: 0, faraday: 0, goddard: 0, thunderhead: 0 };
  let idx = 0;

  function render() {
    if (idx >= questions.length) {
      const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
      result.textContent =
        blurbs[best] ||
        "You balance multiple Archetypes; your Scythe style is hybrid.";
      questionEl.textContent = "Completed";
      optionsEl.innerHTML = "";
      progressEl.textContent = `Result ready`;
      return;
    }
    const q = questions[idx];
    questionEl.textContent = q.text;
    progressEl.textContent = `Question ${idx + 1} of ${questions.length}`;
    optionsEl.innerHTML = "";
    q.options.forEach((opt) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "option-card";
      card.setAttribute("data-key", opt.key);
      card.innerHTML = `<strong>${opt.title}</strong>`;
      card.addEventListener("click", () => {
        scores[opt.key] += 1;
        idx += 1;
        render();
      });
      optionsEl.appendChild(card);
    });
  }

  resetBtn.addEventListener("click", () => {
    scores = { curie: 0, faraday: 0, goddard: 0, thunderhead: 0 };
    idx = 0;
    result.textContent = "";
    render();
  });

  render();
})();
