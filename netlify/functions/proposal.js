/**
 * Proposal form handler — receives a POST from the contact page, validates it,
 * and emails the submission to the FDP team via Resend.
 *
 * Required Netlify environment variable:
 *   RESEND_API_KEY   — your Resend API key (Site settings → Environment variables)
 * Optional overrides:
 *   PROPOSAL_TO      — recipient (default: proposal@fdp.org)
 *   PROPOSAL_FROM    — verified Resend sender (default: "FDP Website <noreply@fdp.org>")
 *
 * No npm dependencies: uses the global fetch available on Netlify's Node 24 runtime.
 */

const TO = process.env.PROPOSAL_TO || "proposal@fdp.org";
const FROM = process.env.PROPOSAL_FROM || "FDP Website <noreply@fdp.org>";
const KEY = process.env.RESEND_API_KEY;

// Escape user input before it goes into the HTML email body.
const esc = (s = "") =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "Method not allowed." });
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { ok: false, error: "Invalid request." });
  }

  // Honeypot: real users never fill the hidden "bot-field". If it's populated,
  // pretend success so bots don't learn they were caught — but send nothing.
  if (data["bot-field"]) return json(200, { ok: true });

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const message = (data.message || "").trim();
  const org = (data.org || "").trim();
  const phone = (data.phone || "").trim();
  const sector = (data.sector || "").trim();

  if (!name || !email || !message) {
    return json(422, {
      ok: false,
      error: "Please fill in your name, email, and a short message.",
    });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(422, { ok: false, error: "Please enter a valid email address." });
  }
  if (message.length > 5000) {
    return json(422, { ok: false, error: "That message is a bit too long." });
  }

  if (!KEY) {
    // Misconfiguration, not the visitor's fault — log loudly, fail gracefully.
    console.error("proposal: RESEND_API_KEY is not set");
    return json(500, {
      ok: false,
      error: "The form isn't fully configured yet. Please email us directly.",
    });
  }

  const subject = `Proposal request — ${name}${org ? ` (${org})` : ""}`;
  const html = `
    <h2 style="margin:0 0 12px">New proposal request</h2>
    <table cellpadding="0" cellspacing="0" style="font:14px/1.5 Arial,sans-serif">
      <tr><td style="padding:3px 16px 3px 0"><strong>Name</strong></td><td>${esc(name)}</td></tr>
      <tr><td style="padding:3px 16px 3px 0"><strong>Organization</strong></td><td>${esc(org) || "—"}</td></tr>
      <tr><td style="padding:3px 16px 3px 0"><strong>Email</strong></td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
      <tr><td style="padding:3px 16px 3px 0"><strong>Phone</strong></td><td>${esc(phone) || "—"}</td></tr>
      <tr><td style="padding:3px 16px 3px 0"><strong>Project type</strong></td><td>${esc(sector) || "—"}</td></tr>
    </table>
    <p style="font:14px/1.5 Arial,sans-serif;margin:14px 0 4px"><strong>Message</strong></p>
    <p style="font:14px/1.6 Arial,sans-serif;white-space:pre-wrap;margin:0">${esc(message)}</p>
    <hr style="border:none;border-top:1px solid #e2e5eb;margin:18px 0">
    <p style="font:12px/1.4 Arial,sans-serif;color:#6a7284">Sent from the fdp.org proposal form.</p>
  `;
  const text =
    `New proposal request\n\n` +
    `Name: ${name}\n` +
    `Organization: ${org || "—"}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone || "—"}\n` +
    `Project type: ${sector || "—"}\n\n` +
    `Message:\n${message}\n`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("proposal: Resend error", res.status, detail);
      return json(502, {
        ok: false,
        error: "We couldn't send that right now. Please try again or email us.",
      });
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error("proposal: unexpected error", err);
    return json(500, {
      ok: false,
      error: "Something went wrong. Please try again or email us.",
    });
  }
};
