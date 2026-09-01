# Turning payments on

Memovo runs without Stripe. The payment routes switch themselves off while
`STRIPE_SECRET_KEY` is empty, and a development route sets a plan directly so the
galleries and QR codes stay testable. This page is what turns the real thing on.

Everything below is Stripe's **test mode**. No real money moves, and the test card
at the end is the one Stripe publishes for exactly this.

## 1. Three prices

In the Stripe dashboard, with the **Test mode** switch on, create three products
under Product catalogue. Each one needs a **recurring, monthly** price:

| Product | Price | Matches the card on /pricing |
| --- | --- | --- |
| Memovo Starter | 19 USD / month | Starter |
| Memovo Pro | 29 USD / month | Pro |
| Memovo Premium | 49 USD / month | Premium |

Open each price and copy its id. They look like `price_1Ab2Cd...`.

## 2. The secret key

Developers → API keys → **Secret key**, still in test mode. It starts with
`sk_test_`. This one belongs in `.env` and nowhere else: it can move money and
read customers.

## 3. The webhook secret

Stripe has to reach this machine to report a payment, and a laptop has no public
address. The Stripe CLI forwards for it.

```powershell
# Install once
winget install Stripe.StripeCLI

stripe login
stripe listen --forward-to localhost:4000/api/billing/webhook
```

`stripe listen` prints a signing secret beginning with `whsec_`. It is valid only
while that command runs, so a new one is printed each time it starts. **Leave the
command running** for as long as you are testing.

## 4. Fill in `.env`

`backend/.env`, which is gitignored and stays on this machine:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_PREMIUM=price_...
CHECKOUT_RETURN_URL=http://192.168.1.11:3100/account
```

`CHECKOUT_RETURN_URL` is where Stripe sends the visitor back to. Use the address
the browser actually reaches the site on, so a phone comes back to the site rather
than to itself.

Restart the API so it reads the new values.

Two things happen the moment `STRIPE_SECRET_KEY` has a value: the pricing buttons
start opening Checkout, and `POST /billing/dev-plan` stops existing. Plans are set
by paying for them from then on.

## 5. Pay for a plan

1. Sign in, open **/pricing**, press a plan's button.
2. Stripe's own page opens. Card `4242 4242 4242 4242`, any future expiry, any
   CVC, any postcode.
3. Stripe sends the visitor back to `/account?checkout=success`.
4. The terminal running `stripe listen` shows `checkout.session.completed`
   forwarded with a `200`.
5. The account page shows the plan and the date it runs to — one month out.

Other cards Stripe publishes for test mode:

| Card | What it does |
| --- | --- |
| 4242 4242 4242 4242 | Pays |
| 4000 0000 0000 9995 | Declined for insufficient funds |
| 4000 0025 0000 3155 | Asks for 3D Secure confirmation |

## What the webhook does with what it hears

| Stripe event | Effect |
| --- | --- |
| `checkout.session.completed` | Reads the new subscription and applies it |
| `customer.subscription.created` / `.updated` | Writes the plan and the period end |
| `customer.subscription.deleted` | Drops the account to FREE |

The subscription's own status decides whether the plan is granted:

| Status | Plan |
| --- | --- |
| `active`, `trialing` | Granted |
| `past_due` | Granted until the period ends, while Stripe retries the card |
| `incomplete`, `unpaid`, `canceled` | FREE at once |

Every event id is recorded, so the retries Stripe sends until it gets a `200`
apply once. A payload whose signature does not check out is refused with a `400`
and changes nothing.

## Going live

Swap the five values for their live-mode equivalents and point a real webhook
endpoint at `https://<the API's address>/api/billing/webhook`. The signing secret
then comes from the dashboard's webhook page rather than from `stripe listen`.
