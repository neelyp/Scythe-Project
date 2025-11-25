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
      text: "You arrive at a crowded market to glean one person. How do you proceed?",
      options: [
        {
          label: "",
          title:
            "Invite the family to a meal afterward to ensure they are witnessed.",
          key: "curie",
        },
        {
          label: "",
          title:
            "Pick randomly within demographic targets, keep it swift and quiet.",
          key: "faraday",
        },
        {
          label: "",
          title:
            "Announce publicly and make it theatrical to reaffirm authority.",
          key: "goddard",
        },

      ],
    },
    {
      text: "A fellow Scythe bends rules to avoid traumatizing children. You?",
      options: [
        {
          label: "",
          title:
            "Defend them; mercy first, write it in your journal as precedent.",
          key: "curie",
        },
        {
          label: "",
          title:
            "Note the breach, suggest a formal amendment to legitimize the instinct.",
          key: "faraday",
        },
        {
          label: "",
          title: "Call it weakness; rules exist to keep fear sharp.",
          key: "goddard",
        },

      ],
    },
    {
      text: 'Conclave proposes live-streaming gleanings "for transparency." Your vote?',
      options: [
        {
          label: "",
          title: "Only if families consent and aftermath support is built in.",
          key: "curie",
        },
        {
          label: "",
          title: "Oppose; transparency without context distorts statistics.",
          key: "faraday",
        },
        {
          label: "",
          title: "Support; spectacle maintains respect and recruits strength.",
          key: "goddard",
        },
      ],
    },
    {
      text: "Your apprentice hesitates at their first gleaning.",
      options: [
        {
          title: "Pause and let them speak to the family; empathy is training.",
          label: "",
          key: "curie",
        },
        {
          title: "Step in, complete the act, debrief later with clear rules.",
          label: "",
          key: "faraday",
        },
        {
          title: "Force them through; hesitation is a liability.",
          label: "",
          key: "goddard",
        },
      ],
    },
    {
      text: "A region exceeds its quota due to disaster. How do you correct?",
      options: [
        {
          title:
            "Volunteer more personal gleanings to spare juniors; prioritize consent conversations.",
          key: "curie",
        },
        {
          title:
            "Rebalance across regions quietly to restore statistical fairness.",
          key: "faraday",
        },
        {
          title:
            "Stage high-profile mass gleanings to reset fear and compliance.",
          key: "goddard",
        },

      ],
    },
  ];

  const blurbs = {
    curie:
      "Curie-mode: You prioritize dignity, witnessing, and relational mercy. You slow the blade to keep humanity visible.",
    faraday:
      "Faraday-mode: You enforce balance through process and restraint. You trust rules to keep power in check.",
    goddard:
      "Goddard-mode: You lean on spectacle and dominance to assert control. You see fear as a management tool.",
    thunderhead:
      "Thunderhead-mode: You default to data and systemic outcomes, minimizing variance over individual sentiment.",
  };

  let scores = { curie: 0, faraday: 0, goddard: 0, thunderhead: 0 };
  let idx = 0;

  function render() {
    if (idx >= questions.length) {
      const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
      result.textContent =
        blurbs[best] ||
        "You balance multiple modes; your Scythe style is hybrid.";
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
      card.innerHTML = `<strong>${opt.title}</strong><span>${opt.label}</span>`;
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
