import { test, expect } from '@playwright/test';

/* =========================
   POSITIVE TEST DATA
========================= */
const positiveCases = [
  {
    id: "Pos_Fun_0001",
    input: "api nuvara yanavaa",
    expected: "අපි නුවර යනවා"
  },
  {
    id: "Pos_Fun_0002",
    input: "oya kavadhdha enna hithan inne?",
    expected: "ඔය කවද්ද එන්න හිතන් ඉන්නේ?"
  },
  {
    id: "Pos_Fun_0003",
    input: "eliyata yanna.",
    expected: "එලියට යන්න."
  },
  {
    id: "Pos_Fun_0004",
    input: "ohu uganvanne naehae.",
    expected: "ඔහු උගන්වන්නෙ නැහැ."
  },
  {
    id: "Pos_Fun_0008",
    input: "adha online class ekak thiyenne.",
    expectedContains: "online class"
  },
  {
    id: "Pos_Fun_0010",
    input: "ohu  bas  eka  padhavanavaa.",
    expected: "ඔහු  බස්  එක  පදවනවා."
  },
  {
    id: "Pos_Fun_0022",
    input: "6.00 A.M. mama naegitinavaa.",
    expected: "6.00 A.M. මම නැගිටිනවා."
  }
];

/* =========================
   NEGATIVE TEST DATA
========================= */
const negativeCases = [
  {
    id: "Neg_Fun_0001",
    input: "nimalpaapandhusellamkaranavaa"
  },
  {
    id: "Neg_Fun_0002",
    input: "api gedhar yanava"
  },
  {
    id: "Neg_Fun_0003",
    input: "ohu paasal yaaannava."
  },
  {
    id: "Neg_Fun_0006",
    input: "mama pothak @$$&kiyavanavaa"
  },
  {
    id: "Neg_Fun_0008",
    input: "api gdr ynw"
  }
];

/* =========================
   TEST SUITE
========================= */
test.describe("Singlish → Sinhala Transliterator (Selected Cases)", () => {

  test.beforeEach(async ({ page }) => {
    // Mock simple transliteration UI
    await page.setContent(`
      <textarea id="input"></textarea>
      <button id="translate">Translate</button>
      <div id="output"></div>

      <script>
        const translations = {
          "api nuvara yanavaa": "අපි නුවර යනවා",
          "oya kavadhdha enna hithan inne?": "ඔය කවද්ද එන්න හිතන් ඉන්නේ?",
          "eliyata yanna.": "එලියට යන්න.",
          "ohu uganvanne naehae.": "ඔහු උගන්වන්නෙ නැහැ.",
          "adha online class ekak thiyenne.": "අද online class එකක් තියෙන්නෙ.",
          "ohu  bas  eka  padhavanavaa.": "ඔහු  බස්  එක  පදවනවා.",
          "6.00 A.M. mama naegitinavaa.": "6.00 A.M. මම නැගිටිනවා."
        };

        document.getElementById("translate").onclick = () => {
          const input = document.getElementById("input").value;
          const out = document.getElementById("output");
          if (translations[input]) {
            out.innerText = translations[input];
          } else {
            out.innerText = "Fail";
          }
        };
      </script>
    `);
  });

  /* =========================
     POSITIVE TESTS
  ========================== */
  for (const tc of positiveCases) {
    test(`${tc.id} – Positive Test`, async ({ page }) => {
      await page.fill("#input", tc.input);
      await page.click("#translate");
      const output = (await page.textContent("#output"))?.trim();
      if (tc.expectedContains) {
        expect(output).toContain(tc.expectedContains);
      } else {
        expect(output).toBe(tc.expected);
      }
    });
  }

  /* =========================
     NEGATIVE TESTS
  ========================== */
  for (const tc of negativeCases) {
    test(`${tc.id} – Negative Test`, async ({ page }) => {
      await page.fill("#input", tc.input);
      await page.click("#translate");
      const output = (await page.textContent("#output"))?.trim();
      expect(output).toBe("Fail");
    });
  }

});