# Pricing Page Integration Guide

How to connect the Stripe checkout flow to the existing `pricing.html` page.

## Step 1: Update Pricing Page Buttons

In `../pricing.html`, update the CTA button `href` attributes:

### Free Tier (no change needed)
```html
<a href="#" class="cta cta-outline">Get Started Free</a>
```
Point this to your CLI install instructions or README:
```html
<a href="https://pypi.org/project/ai-contentgen/" class="cta cta-outline">Get Started Free</a>
```

### Pro Tier — Option A: Stripe Payment Link (Simplest)
```html
<a href="https://buy.stripe.com/YOUR_PRO_PAYMENT_LINK" class="cta cta-primary">Start Pro Trial</a>
```

### Pro Tier — Option B: Custom Checkout Page
```html
<a href="stripe/checkout.html?plan=pro" class="cta cta-primary">Start Pro Trial</a>
```

### Enterprise Tier — Option A: Stripe Payment Link
```html
<a href="https://buy.stripe.com/YOUR_ENTERPRISE_PAYMENT_LINK" class="cta cta-dark">Subscribe — $29/mo</a>
```

### Enterprise Tier — Option B: Custom Checkout Page
```html
<a href="stripe/checkout.html?plan=enterprise" class="cta cta-dark">Subscribe — $29/mo</a>
```

## Step 2: Choose Your Integration Method

### Method 1: Stripe Payment Links (No Backend Required)

Best for: Static sites, GitHub Pages, minimal setup.

1. Create products and prices in Stripe Dashboard
2. Generate Payment Links in **Stripe Dashboard > Payment Links**
3. Replace `YOUR_PRO_PAYMENT_LINK` and `YOUR_ENTERPRISE_PAYMENT_LINK` in the HTML files
4. Set success/cancel redirect URLs in each Payment Link's settings:
   - Success: `https://yourdomain.com/_projects/ai-contentgen/stripe/success.html`
   - Cancel: `https://yourdomain.com/_projects/ai-contentgen/stripe/cancel.html`

### Method 2: Stripe Checkout Sessions (Backend Required)

Best for: Custom flows, collecting additional data, server-side validation.

Requires a backend endpoint (Node.js example):

```javascript
// server.js (Node.js + Express)
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
    const { priceId, customerEmail } = req.body;

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer_email: customerEmail,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: 'https://yourdomain.com/stripe/success.html?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://yourdomain.com/stripe/cancel.html',
    });

    res.json({ id: session.id });
});

app.listen(3000);
```

Then uncomment "Option 1" in `checkout.html` and comment out "Option 2".

### Method 3: Stripe Embedded Checkout (Advanced)

For embedding Stripe's checkout UI directly in your page. See Stripe's
[Embedded Checkout docs](https://docs.stripe.com/checkout/embedded/quickstart).

## Step 3: Set Up Post-Payment License Activation

After payment, users need to activate their CLI tier. Options:

### Option A: Manual Activation (MVP)
1. User pays via Stripe
2. You receive a Stripe webhook or email notification
3. You generate a license key and email it to the customer
4. User runs: `ai-contentgen activate --key LICENSE_KEY`

### Option B: Automated via Webhooks
1. Set up a webhook endpoint to listen for `checkout.session.completed`
2. Generate a license key automatically
3. Store it in a database keyed to the customer's email
4. CLI checks the license server on `ai-contentgen activate`

### Option C: Stripe Customer Portal
Let users manage their own subscriptions:
```javascript
const portalSession = await stripe.billingPortal.sessions.create({
    customer: 'cus_xxx',
    return_url: 'https://yourdomain.com/pricing.html',
});
// Redirect to portalSession.url
```

## Step 4: Test the Full Flow

1. Set Stripe to **Test Mode**
2. Use test card `4242 4242 4242 4242` (any future expiry, any CVC)
3. Walk through:
   - Click "Start Pro Trial" on pricing page
   - Complete checkout
   - Verify redirect to success page
   - Check Stripe Dashboard for the test subscription
4. Test the cancel flow:
   - Start checkout, then close/cancel
   - Verify redirect to cancel page
5. Test declined cards:
   - Use `4000 0000 0000 9995` (insufficient funds)
   - Verify error handling

## Quick Reference: Files

| File | Purpose |
|------|---------|
| `checkout.html` | Checkout page with plan selector and Stripe card element |
| `success.html` | Post-payment confirmation with setup instructions |
| `cancel.html` | Friendly cancellation page with reassurance |
| `payment-links.html` | Standalone payment link buttons (alternative to checkout) |
| `SETUP.md` | Full Stripe account setup documentation |
| `INTEGRATION.md` | This file — how to wire it all together |
