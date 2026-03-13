# Stripe Payment Processing Setup — AI Content Generator

## 1. Create Your Stripe Account

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Complete account registration with your business details
3. Verify your email address

## 2. Get Your API Keys

1. Log into the [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers → API keys**
3. You will see two key pairs:

| Key Type | Purpose | Prefix |
|----------|---------|--------|
| **Publishable key** | Client-side (checkout forms) | `pk_test_` / `pk_live_` |
| **Secret key** | Server-side (API calls, webhooks) | `sk_test_` / `sk_live_` |

> **NEVER** expose your secret key in client-side code or commit it to version control.

## 3. Test Mode vs Live Mode

Stripe starts in **Test Mode** by default. Use this for all development and testing.

### Test Mode
- Toggle is in the top-right of the Stripe Dashboard
- Uses `pk_test_` and `sk_test_` keys
- No real charges are processed
- Use [Stripe test card numbers](https://docs.stripe.com/testing#cards):

| Card Number | Scenario |
|-------------|----------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 3220` | Requires 3D Secure |
| `4000 0000 0000 9995` | Declined (insufficient funds) |
| `4000 0000 0000 0069` | Declined (expired card) |

- Use any future expiry date, any 3-digit CVC, any postal code

### Live Mode
- Toggle off test mode when ready to accept real payments
- Uses `pk_live_` and `sk_live_` keys
- Complete Stripe account verification first (identity, bank account)

## 4. Create Products & Prices in Stripe

### Option A: Via Stripe Dashboard (Recommended)

1. Go to **Products** → **Add product**
2. Create the **Pro** product:
   - Name: `AI Content Generator — Pro`
   - Description: `Unlimited generations, all templates, priority processing`
   - Price: `$9.00 / month` (Recurring)
   - Copy the **Price ID** (starts with `price_`)
3. Create the **Enterprise** product:
   - Name: `AI Content Generator — Enterprise`
   - Description: `All Pro features plus team collaboration, API access, priority support`
   - Price: `$29.00 / month` (Recurring)
   - Copy the **Price ID** (starts with `price_`)

### Option B: Via Stripe CLI

```bash
# Install Stripe CLI
# macOS: brew install stripe/stripe-cli/stripe
# Linux: see https://docs.stripe.com/stripe-cli

stripe login

# Create Pro product + price
stripe products create \
  --name="AI Content Generator — Pro" \
  --description="Unlimited generations, all templates, priority processing"

# Note the product ID (prod_xxx), then:
stripe prices create \
  --product=prod_xxx \
  --unit-amount=900 \
  --currency=usd \
  --recurring-interval=month

# Create Enterprise product + price
stripe products create \
  --name="AI Content Generator — Enterprise" \
  --description="All Pro features plus team collaboration, API access, priority support"

stripe prices create \
  --product=prod_yyy \
  --unit-amount=2900 \
  --currency=usd \
  --recurring-interval=month
```

## 5. Create Payment Links

### Via Dashboard
1. Go to **Payment links** → **New**
2. Select the Pro price → Create link
3. Repeat for Enterprise
4. Copy the generated URLs

### Via API
```bash
stripe payment_links create --line-items[0][price]=price_PRO_ID --line-items[0][quantity]=1
stripe payment_links create --line-items[0][price]=price_ENTERPRISE_ID --line-items[0][quantity]=1
```

## 6. Configure Webhooks (Optional but Recommended)

Webhooks notify your server when payments succeed or fail.

1. Go to **Developers → Webhooks** → **Add endpoint**
2. Set your endpoint URL (e.g., `https://yourdomain.com/api/stripe/webhook`)
3. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

## 7. Configure the Checkout Page

Edit `checkout.html` and replace the placeholder values:

```javascript
// Replace with your Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_KEY_HERE';

// Replace with your Stripe price IDs
const PRICE_IDS = {
    pro: 'price_YOUR_PRO_PRICE_ID',
    enterprise: 'price_YOUR_ENTERPRISE_PRICE_ID'
};
```

## 8. Go Live Checklist

- [ ] Complete Stripe account verification (identity + bank account)
- [ ] Test the full checkout flow with test cards
- [ ] Verify success and cancel redirect pages work
- [ ] Switch API keys from `pk_test_` to `pk_live_`
- [ ] Update price IDs to live price IDs
- [ ] Set up webhook endpoint for production
- [ ] Test one real transaction with a small amount
- [ ] Monitor the Stripe Dashboard for successful payments

## 9. File Structure

```
stripe/
├── SETUP.md              ← This file
├── checkout.html          ← Checkout page with embedded Stripe
├── success.html           ← Post-payment success page
├── cancel.html            ← Payment cancelled/failed page
├── payment-links.html     ← Standalone payment link buttons
└── INTEGRATION.md         ← How to connect to the pricing page
```

## 10. Stripe Fees

| Fee Type | Amount |
|----------|--------|
| Standard processing | 2.9% + $0.30 per transaction |
| International cards | +1.5% |
| Currency conversion | +1% |
| Disputes/chargebacks | $15.00 per dispute |

### Revenue After Fees

| Plan | Price | Stripe Fee | Net Revenue |
|------|-------|-----------|-------------|
| Pro | $9.00 | ~$0.56 | ~$8.44 |
| Enterprise | $29.00 | ~$1.14 | ~$27.86 |
