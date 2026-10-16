// Run in the connected Codex browser through cua_repl. No independent browser
// launcher is used. See QA.md for the invocation and isolated submission setup.
export const routes = [
  "/",
  "/services",
  "/services/exterior-detail",
  "/services/interior-detail",
  "/services/full-detail",
  "/services/maintenance-detail",
  "/services/paint-enhancement",
  "/services/paint-correction",
  "/services/ceramic-protection",
  "/services/headlight-restoration",
  "/services/specialty-services",
  "/services/add-ons",
  "/results",
  "/service-area",
  "/about",
  "/book",
  "/contact",
  "/privacy",
  "/terms",
];
export const viewports = [
  { width: 1920, height: 1080 },
  { width: 1440, height: 900 },
  { width: 1280, height: 720 },
  { width: 1024, height: 768 },
  { width: 820, height: 1180 },
  { width: 430, height: 932 },
  { width: 390, height: 844 },
  { width: 320, height: 740 },
];
function assert(value, message) {
  if (!value) throw new Error(message);
}
export async function runLayoutChecks(tab, viewport, sizes = viewports) {
  const results = [];
  for (const size of sizes) {
    await viewport.set(size);
    for (const route of routes) {
      const url = `http://127.0.0.1:3000${route}`;
      if ((await tab.url()) !== url) await tab.goto(url);
      await tab.getAXState({ emit: false });
      const layout = await tab.playwright.evaluate(() => {
        const visible = (el) => {
          const box = el.getBoundingClientRect();
          return (
            box.width > 0 &&
            box.height > 0 &&
            getComputedStyle(el).visibility !== "hidden"
          );
        };
        const outliers = [
          ...document.querySelectorAll(
            "h1,h2,h3,button,input,select,textarea,a.button",
          ),
        ]
          .filter(visible)
          .filter((el) => {
            if (el.closest(".honeypot")) return false;
            const box = el.getBoundingClientRect();
            return box.left < -1 || box.right > innerWidth + 1;
          })
          .map(
            (el) =>
              el.textContent.trim().slice(0, 70) || el.getAttribute("name"),
          );
        return {
          title: document.title,
          h1: document.querySelectorAll("main h1").length,
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          outliers,
          decorativeNumbers:
            /(?:^|\n)\s*(?:0[1-9]|(?:STEP|SCENE|CHAPTER)\s+0?\d+(?:\s*\/\s*\d+)?)\s*(?:\n|$)/i.test(
              document.body.innerText,
            ),
          missingAlt: [...document.querySelectorAll("img")].filter(
            (el) => !el.hasAttribute("alt"),
          ).length,
          brokenImages: [...document.querySelectorAll("img")]
            .filter((el) => visible(el) && el.complete && !el.naturalWidth)
            .map((el) => el.getAttribute("src")),
          developmentLanguage:
            /concept imag(?:e|ery)|demo imag|placeholder|mockup|prototype|try the booking demo|demo site|sample content|test content|design preview|initial concept|future integration|coming integration|not yet connected/i.test(
              document.body.innerText +
                " " +
                [...document.querySelectorAll("img")]
                  .map((el) => el.alt)
                  .join(" ") +
                " " +
                document.title +
                " " +
                (document.querySelector('meta[name="description"]')?.content ||
                  ""),
            ),
          numericPricing:
            /\$\s*\d|(?:starting at|from)\s*\$|\d+\s*(?:USD|dollars)/i.test(
              document.body.innerText,
            ),
        };
      });
      assert(layout.h1 === 1, `${route}: expected one main heading`);
      assert(
        !layout.overflow && !layout.outliers.length,
        `${size.width} ${route}: overflow ${JSON.stringify(layout.outliers)}`,
      );
      assert(!layout.decorativeNumbers, `${route}: decorative numbering`);
      assert(
        !layout.missingAlt && !layout.brokenImages.length,
        `${route}: inaccessible/broken image`,
      );
      assert(
        !layout.developmentLanguage,
        `${route}: public development language`,
      );
      assert(!layout.numericPricing, `${route}: numeric pricing`);
      results.push({ route, ...size, ...layout });
    }
  }
  return results;
}
export async function runPrimaryJourneys(tab, viewport) {
  const result = [];
  async function routeIs(path) {
    await tab.playwright
      .locator(path === "/book" ? ".request-flow" : ".quiet-intro")
      .waitFor({ state: "visible" });
    await tab.getAXState({ emit: false });
    assert(new URL(await tab.url()).pathname === path, `Expected ${path}`);
    result.push(path);
  }
  await viewport.set({ width: 1440, height: 900 });
  await tab.goto("http://127.0.0.1:3000/");
  await tab.getAXState({ emit: false });
  await tab.playwright
    .getByRole("link", { name: "View services", exact: true })
    .click();
  await routeIs("/services");
  await tab.back();
  await tab.getAXState({ emit: false });
  await tab.playwright
    .locator(".commercial-copy")
    .getByRole("link", { name: "Book your detail", exact: true })
    .click();
  await routeIs("/book");
  await tab.goto("http://127.0.0.1:3000/services/interior-detail");
  await tab.getAXState({ emit: false });
  await tab.playwright
    .locator(".quiet-intro")
    .getByRole("link", { name: "Book your detail", exact: true })
    .click();
  await routeIs("/book");
  const preselected = new URL(await tab.url()).searchParams.get("service");
  assert(preselected === "interior-detail", "Service attribution missing");
  await viewport.set({ width: 390, height: 844 });
  await tab.goto("http://127.0.0.1:3000/");
  await tab.getAXState({ emit: false });
  await tab.playwright
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  await tab.getAXState({ emit: false });
  assert(
    await tab.playwright
      .getByRole("navigation", { name: "Mobile navigation" })
      .isVisible(),
    "Menu not open",
  );
  await tab.playwright
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await routeIs("/contact");
  assert(
    !(await tab.playwright
      .getByRole("navigation", { name: "Mobile navigation" })
      .count()),
    "Menu did not close",
  );
  await tab.playwright
    .locator("main")
    .getByRole("link", { name: "Book your detail", exact: true })
    .click();
  await routeIs("/book");
  return { passed: result, servicePreselection: preselected, mobileMenu: true };
}

export async function runRequestJourney(tab) {
  const checks = [];
  const fieldAttributes = {};
  const p = tab.playwright;
  const continued = () =>
    p.getByRole("button", { name: "Continue", exact: true }).click();
  async function setDate(date) {
    const state = await tab.getAXState({ disableDiffing: true, emit: false });
    const nativeDate = state.match(
      /^\s*(\d+) date field \(settable\) Preferred date/m,
    );
    if (nativeDate) await tab.setValue(Number(nativeDate[1]), date);
    else await p.getByLabel("Preferred date", { exact: true }).fill(date);
    await tab.getAXState({ emit: false });
    assert(
      (await p.locator("input[type=date]").evaluate((el) => el.value)) === date,
      "Date control did not accept value",
    );
  }
  const value = (label) =>
    (label === "Your region"
      ? p.getByRole("combobox", { name: label, exact: true })
      : p.getByLabel(label, { exact: true })
    ).evaluate((el) => el.value);
  async function heading(name) {
    await p
      .getByRole("heading", { name, exact: true })
      .waitFor({ state: "visible" });
    await tab.getAXState({ emit: false });
    assert(
      await p.getByRole("heading", { name, exact: true }).isVisible(),
      name,
    );
    checks.push(name);
    fieldAttributes[name] = await p.evaluate(() =>
      [...document.querySelectorAll("form input,form select,form textarea")]
        .filter((el) => !el.closest(".honeypot"))
        .map((el) => ({
          name: el.name,
          type: el.type,
          inputMode: el.inputMode,
          required: el.required,
          maxLength: el.maxLength,
          autoComplete: el.autocomplete,
        })),
    );
  }
  async function invalidNative(name) {
    await continued();
    await tab.getAXState({ emit: false });
    assert(
      await p
        .getByLabel(name, { exact: true })
        .evaluate((el) => !el.validity.valid),
      `${name}: missing native validation`,
    );
    checks.push(`native validation: ${name}`);
  }
  async function invalidSchema(message) {
    await continued();
    await p.locator("#request-error").waitFor({ state: "visible" });
    await tab.getAXState({ emit: false });
    assert(
      (await p.locator("#request-error").innerText()).includes(message),
      `Expected validation: ${message}`,
    );
    checks.push(`schema validation: ${message}`);
  }
  await tab.goto(
    "http://127.0.0.1:3000/book?service=interior-detail&market=river-valley&utm_source=cinematic-regression",
  );
  await heading("Tell us about your vehicle.");
  await p.getByLabel("Year", { exact: true }).fill("2022");
  await tab.reload();
  await heading("Tell us about your vehicle.");
  assert(
    (await value("Year")) === "",
    "Refresh unexpectedly retained customer draft",
  );
  checks.push("Refresh clears customer draft");
  await invalidNative("Year");
  await p.getByLabel("Year", { exact: true }).fill("2022");
  await invalidNative("Make");
  await p.getByLabel("Make", { exact: true }).fill("Toyota");
  await invalidNative("Model");
  for (const [name, text] of [
    ["Year", "1899"],
    ["Make", "Toyota"],
    ["Model", "4Runner"],
    ["Trim (optional)", "Regression trim"],
  ])
    await p.getByLabel(name, { exact: true }).fill(text);
  await p
    .getByRole("combobox", { name: "Vehicle type", exact: true })
    .selectOption("SUV / Crossover");
  await invalidSchema("valid vehicle year");
  await p.getByLabel("Year", { exact: true }).fill("2022");
  await p.getByLabel("Make", { exact: true }).fill(" ");
  await invalidSchema("This field is required.");
  await p.getByLabel("Make", { exact: true }).fill("Toyota");
  await continued();
  await heading("Choose your service.");
  assert(
    await p
      .getByRole("radio", { name: "Interior Detail", exact: true })
      .evaluate((el) => el.checked),
    "Preselected service missing",
  );
  await p.getByRole("radio", { name: "Full Detail", exact: true }).check();
  await continued();
  await heading("Vehicle condition.");
  await invalidSchema("Choose at least one condition.");
  await p.getByRole("checkbox", { name: "Pet hair", exact: true }).check();
  await p.getByRole("checkbox", { name: "Stains", exact: true }).check();
  await p.getByRole("checkbox", { name: "Stains", exact: true }).uncheck();
  await p
    .getByLabel("Anything else? (optional)", { exact: true })
    .fill("Synthetic browser regression request. Please ignore. ".repeat(10));
  await p.getByRole("button", { name: "Back", exact: true }).click();
  await heading("Choose your service.");
  assert(
    await p
      .getByRole("radio", { name: "Full Detail", exact: true })
      .evaluate((el) => el.checked),
    "Back lost service",
  );
  await continued();
  await heading("Vehicle condition.");
  assert(
    await p
      .getByRole("checkbox", { name: "Pet hair", exact: true })
      .evaluate((el) => el.checked),
    "Back lost condition",
  );
  await continued();
  await heading("Your location.");
  assert(
    (await value("Your region")) === "river-valley",
    "Preselected region missing",
  );
  await invalidNative("Street address");
  await p.getByLabel("Street address", { exact: true }).fill("123 Test Drive");
  await invalidNative("City");
  await p.getByLabel("City", { exact: true }).fill("Test City");
  await invalidNative("ZIP code");
  await p.getByLabel("ZIP code", { exact: true }).fill("1234");
  await invalidNative("ZIP code");
  await p.getByLabel("ZIP code", { exact: true }).fill("72701");
  await continued();
  await heading("Preferred time.");
  await invalidNative("Preferred date");
  await setDate("2020-01-01");
  await invalidNative("Preferred date");
  await setDate("9999-12-31");
  await invalidNative("Preferred date");
  const date = new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10);
  await setDate(date);
  await p
    .getByRole("combobox", { name: "Time of day", exact: true })
    .selectOption("Afternoon");
  await continued();
  await heading("Your contact details.");
  await invalidNative("First name");
  await p.getByLabel("First name", { exact: true }).fill("Regression");
  await invalidNative("Last name");
  await p.getByLabel("Last name", { exact: true }).fill("Test");
  await invalidNative("Mobile phone");
  await p.getByLabel("Mobile phone", { exact: true }).fill("123");
  await invalidNative("Email");
  for (const [name, text] of [
    ["First name", "Regression"],
    ["Last name", "Test"],
    ["Mobile phone", "123"],
    ["Email", "regression@example.invalid"],
  ])
    await p.getByLabel(name, { exact: true }).fill(text);
  await invalidSchema("valid US mobile phone number");
  await p.getByLabel("Mobile phone", { exact: true }).fill("4795550100");
  await p.getByLabel("Email", { exact: true }).fill("invalid-email");
  await invalidNative("Email");
  await p
    .getByLabel("Email", { exact: true })
    .fill("regression@example.invalid");
  await continued();
  await heading("Review your request.");
  let review = await p.locator(".request-summary").innerText();
  for (const expected of [
    "2022 Toyota 4Runner",
    "Full Detail",
    "Pet hair",
    "123 Test Drive",
    "Arkansas River Valley",
    date,
    "Afternoon",
    "Regression Test",
    "regression@example.invalid",
  ])
    assert(review.includes(expected), `Review missing ${expected}`);
  await p.locator('.form-actions button[type="submit"]').click();
  await tab.getAXState({ emit: false });
  assert(
    await p.locator(".consent input").evaluate((el) => !el.validity.valid),
    "Consent did not block submission",
  );
  await p.locator(".request-edit summary").click();
  await tab.getAXState({ emit: false });
  await p
    .getByRole("button", { name: "Edit your vehicle", exact: true })
    .click();
  await heading("Tell us about your vehicle.");
  assert(
    (await value("Year")) === "2022" &&
      (await value("Trim (optional)")) === "Regression trim",
    "Edit lost vehicle",
  );
  for (const stage of [
    "Choose your service.",
    "Vehicle condition.",
    "Your location.",
    "Preferred time.",
    "Your contact details.",
    "Review your request.",
  ]) {
    await continued();
    await heading(stage);
  }
  review = await p.locator(".request-summary").innerText();
  assert(
    review.includes("regression@example.invalid") &&
      review.includes("Pet hair"),
    "Edit lost request data",
  );
  await p.locator(".consent input").check();
  await tab.getAXState({ emit: false });
  checks.push("Review, edit, consent, retained selections and long notes");
  return { checks, fieldAttributes, date, readyToSubmit: true };
}

export async function submitRequest(tab, expected = "received") {
  const p = tab.playwright;
  await p.locator('.form-actions button[type="submit"]').click();
  if (expected === "prepared") {
    await p
      .getByRole("heading", { name: "Your inquiry is ready.", exact: true })
      .waitFor({ state: "visible" });
    await tab.getAXState({ emit: false });
    const text = await p.locator("main").innerText();
    assert(
      /Your details have not been sent to Landry['’]s/.test(text) &&
        text.includes("no appointment has been reserved"),
      "False delivery or booking claim",
    );
    const href = await p
      .getByRole("link", { name: "Open email to send", exact: true })
      .getAttribute("href");
    assert(
      href.startsWith("mailto:info@landrysmobiledetail.com?") &&
        decodeURIComponent(href).includes("Regression Test"),
      "Email inquiry missing reviewed details",
    );
    const state = await p.evaluate(() => ({
      scroll: scrollY,
      focus: document.activeElement?.textContent,
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
    }));
    assert(
      !state.overflow &&
        state.scroll === 0 &&
        state.focus === "Your inquiry is ready.",
      "Prepared inquiry focus or layout failure",
    );
    return {
      prepared: true,
      delivered: false,
      appointmentReserved: false,
      emailComposer: true,
      ...state,
    };
  }
  if (expected === "error") {
    await p.locator("#request-error").waitFor({ state: "visible" });
    await tab.getAXState({ emit: false });
    assert(
      (await p.locator("#request-error").innerText()).includes(
        "Your details are still here",
      ),
      "Failure did not preserve the draft",
    );
    assert(
      (await p.locator(".request-summary").innerText()).includes(
        "regression@example.invalid",
      ),
      "Request data lost",
    );
    assert(
      await p
        .getByRole("button", { name: "Request appointment", exact: true })
        .isEnabled(),
      "Retry disabled",
    );
    return { errorPreserved: true, retryEnabled: true };
  }
  await p
    .getByRole("heading", { name: "Request received.", exact: true })
    .waitFor({ state: "visible" });
  await tab.getAXState({ emit: false });
  assert(
    (await p.locator("main").innerText()).includes(
      "Your preferred time is not yet booked.",
    ),
    "False booking confirmation",
  );
  const state = await p.evaluate(() => ({
    scroll: scrollY,
    focus: document.activeElement?.textContent,
    overflow: document.documentElement.scrollWidth > innerWidth + 1,
  }));
  assert(!state.overflow, "Success overflow");
  assert(
    state.scroll === 0 && state.focus === "Request received.",
    "Success focus/scroll did not move to heading",
  );
  return { received: true, unconfirmed: true, ...state };
}

export async function runLinkChecks(tab, viewport) {
  await viewport.set({ width: 1440, height: 900 });
  const targets = new Map();
  let inspected = 0;
  const ctas = [];
  for (const route of routes) {
    await tab.goto(`http://127.0.0.1:3000${route}`);
    await tab.getAXState({ emit: false });
    const links = await tab.playwright.evaluate(() =>
      [...document.querySelectorAll("a[href]")]
        .filter(
          (el) =>
            el.getBoundingClientRect().width &&
            el.getBoundingClientRect().height,
        )
        .map((el) => ({
          href: el.getAttribute("href"),
          label: el.textContent.trim() || el.getAttribute("aria-label"),
          cta: el.classList.contains("button"),
        })),
    );
    for (const link of links) {
      inspected++;
      if (link.href.startsWith("mailto:")) {
        assert(
          link.href === "mailto:info@landrysmobiledetail.com",
          "Incorrect contact email",
        );
        continue;
      }
      assert(
        link.href.startsWith("/") || link.href.startsWith("#"),
        "Unexpected external navigation",
      );
      if (link.href === "#main") continue;
      const url = new URL(link.href, `http://127.0.0.1:3000${route}`);
      assert(routes.includes(url.pathname), "Unknown internal route");
      targets.set(url.href, { route, ...link });
      if (link.cta) ctas.push({ route, ...link });
    }
    const pageCtas = links.filter((link) => link.cta);
    for (let index = 0; index < pageCtas.length; index++) {
      const href = pageCtas[index].href;
      await tab.playwright
        .locator("a.button")
        .filter({ visible: true })
        .nth(index)
        .click();
      await tab.playwright
        .locator(new URL(href, "http://127.0.0.1:3000").pathname === "/book" ? ".request-flow" : ".quiet-intro")
        .waitFor({ state: "visible" });
      await tab.getAXState({ emit: false });
      const arrived = new URL(await tab.url());
      const intended = new URL(href, `http://127.0.0.1:3000${route}`);
      assert(
        arrived.pathname === intended.pathname &&
          arrived.search === intended.search,
        "CTA changed request parameters",
      );
      if (route !== "/book") {
        await tab.goto(`http://127.0.0.1:3000${route}`);
        await tab.getAXState({ emit: false });
      }
    }
  }
  for (const [url, link] of targets) {
    if (link.cta) continue;
    await tab.goto(`http://127.0.0.1:3000${link.route}`);
    await tab.getAXState({ emit: false });
    await tab.playwright
      .locator(`a[href="${link.href}"]`)
      .filter({ visible: true })
      .first()
      .click();
    const intended = new URL(url);
    await tab.playwright
      .locator(
        intended.pathname === "/book"
          ? ".request-flow"
          : intended.pathname === "/"
            ? ".commercial-hero"
            : ".quiet-intro",
      )
      .waitFor({ state: "visible" });
    await tab.getAXState({ emit: false });
    assert(
      new URL(await tab.url()).pathname === intended.pathname,
      "Navigation landed on wrong route",
    );
    if (intended.hash)
      assert(
        (await tab.playwright.locator(intended.hash).count()) === 1,
        "Anchor is missing",
      );
  }
  return {
    linksInspected: inspected,
    uniqueTargets: targets.size,
    ctasInspected: ctas.length,
    allCtaTargetsClicked: true,
    allCtaInstancesClicked: true,
    email: "info@landrysmobiledetail.com",
  };
}

export async function runMobileNavigation(tab, viewport) {
  const p = tab.playwright;
  await viewport.set({ width: 390, height: 844 });
  await tab.goto("http://127.0.0.1:3000/");
  await tab.getAXState({ emit: false });
  await p.locator(".skip-link").press("Enter");
  await tab.getAXState({ emit: false });
  assert(
    (await p.evaluate(() => document.activeElement?.id)) === "main",
    "Skip link did not move keyboard focus",
  );
  await tab.goto("http://127.0.0.1:3000/service-area");
  await tab.getAXState({ emit: false });
  await p
    .locator(".questions summary")
    .filter({ hasText: "What is mobile detailing?" })
    .click();
  await tab.getAXState({ emit: false });
  assert(
    (await p.locator(".questions details[open]").count()) === 1,
    "FAQ did not open",
  );
  await p
    .locator(".questions summary")
    .filter({ hasText: "What is mobile detailing?" })
    .press("Enter");
  await p.getByRole("button", { name: "Open navigation", exact: true }).click();
  await tab.getAXState({ emit: false });
  const links = await p.evaluate(() =>
    [...document.querySelectorAll("#mobile-nav a")].map((el) => ({
      href: el.getAttribute("href"),
      label: el.textContent.trim(),
    })),
  );
  await p
    .getByRole("button", { name: "Close navigation", exact: true })
    .press("Escape");
  await tab.getAXState({ emit: false });
  assert(
    !(await p.locator("#mobile-nav").count()),
    "Escape did not close menu",
  );
  for (const link of links) {
    await p
      .getByRole("button", { name: "Open navigation", exact: true })
      .click();
    await tab.getAXState({ emit: false });
    await p.locator(`#mobile-nav a[href="${link.href}"]`).click();
    const intended = new URL(link.href, "http://127.0.0.1:3000");
    await p
      .locator(
        intended.pathname === "/book"
          ? ".request-flow"
          : intended.pathname === "/"
            ? ".commercial-hero"
            : ".quiet-intro",
      )
      .waitFor({ state: "visible" });
    await tab.getAXState({ emit: false });
    assert(
      new URL(await tab.url()).pathname === intended.pathname,
      "Mobile link did not navigate",
    );
    assert(
      !(await p.locator("#mobile-nav").count()),
      "Menu did not close after navigation",
    );
  }
  return {
    skipFocus: true,
    faqKeyboard: true,
    escape: true,
    linksTested: links,
  };
}

export async function runUnselectedServiceCheck(tab) {
  await tab.goto("http://127.0.0.1:3000/book");
  const p = tab.playwright;
  await p.locator(".request-flow").waitFor({ state: "visible" });
  await tab.getAXState({ emit: false });
  for (const [name, value] of [
    ["Year", "2022"],
    ["Make", "Toyota"],
    ["Model", "4Runner"],
  ])
    await p.getByLabel(name, { exact: true }).fill(value);
  await p.getByRole("button", { name: "Continue", exact: true }).click();
  await p
    .getByRole("heading", { name: "Choose your service.", exact: true })
    .waitFor({ state: "visible" });
  await tab.getAXState({ emit: false });
  await p.getByRole("button", { name: "Continue", exact: true }).click();
  await tab.getAXState({ emit: false });
  const state = await p.evaluate(() => ({
    invalid: [...document.querySelectorAll("input[name=service]")].every(
      (el) => !el.validity.valid,
    ),
    radioCount: document.querySelectorAll("input[name=service]").length,
    heading: document.querySelector(".request-panel h2")?.textContent,
  }));
  assert(
    state.invalid &&
      state.radioCount === 10 &&
      state.heading === "Choose your service.",
    "Service required validation failed",
  );
  return state;
}
