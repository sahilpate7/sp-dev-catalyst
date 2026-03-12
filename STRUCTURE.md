# Catalyst Project Structure

This document provides an overview of the Catalyst project structure and its contents to help developers and students understand how the framework is organized and where to find specific functionality.

## High-Level Overview

Catalyst is a headless commerce framework for BigCommerce, built with Next.js and powered by the GraphQL Storefront API. Most of the core application logic and components reside within the `core/` directory.

## Root Directory Structure

- `core/`: The main Next.js application, including components, library code, and API integrations.
- `package.json`: Project metadata, dependencies, and scripts.
- `pnpm-workspace.yaml`: Configuration for the PNPM workspace (monorepo).
- `turbo.json`: Configuration for Turborepo, used to manage build and test pipelines.
- `graphql.config.json`: Configuration for GraphQL tooling.

---

## Core Directory (`core/`)

The `core/` directory contains the heart of the Catalyst framework.

### `app/` (Next.js App Router)
Follows the Next.js App Router conventions with a localized structure.
- `[locale]/`: The root for localized routes.
  - `(default)/`: A route group for the default layout of the storefront.
    - `product/[slug]/`: Product detail pages.
    - `cart/`: Shopping cart page.
    - `checkout/`: Checkout process.
    - `account/`: Customer account pages.
    - `webpages/`: Content pages managed in BigCommerce.
  - `api/`: Route handlers for API endpoints.
- `providers.tsx`: React context providers for the application (e.g., QueryClient, Analytics).

### `client/` (BigCommerce GraphQL Client)
Contains logic for interacting with the BigCommerce GraphQL Storefront API.
- `queries/`: Defined GraphQL queries for fetching data (e.g., `get-products.ts`, `get-cart.ts`).
- `fragments/`: Reusable GraphQL fragments.
- `graphql.ts`: Main GraphQL client configuration and types.

### `components/` (Storefront Components)
High-level React components specific to the storefront's features.
- `header/`: Site navigation and header.
- `footer/`: Site footer.
- `product-card/`: Reusable product card component.
- `breadcrumbs/`: Navigation breadcrumbs.

### `lib/` (Utilities & Integrations)
General-purpose utilities and external service integrations.
- `makeswift/`: Integration with the Makeswift visual editor.
- `analytics/`: Tracking and analytics implementations.
- `cart/`: Shopping cart management logic.
- `currency.ts`: Currency formatting utilities.
- `utils.ts`: Miscellaneous helper functions.

### `vibes/` (UI Library - Soul)
A design system and UI library called "Soul" that provides the foundational building blocks for the storefront.
- `soul/primitives/`: Atomic UI components (Buttons, Badges, Inputs, etc.).
- `soul/sections/`: Larger UI blocks (Product Carousel, Header Section, etc.).

### `data-transformers/`
Logic for mapping complex BigCommerce API responses into simplified props used by UI components.
- `product-card-transformer.ts`: Transforms raw product data for the `ProductCard` component.
- `breadcrumbs-transformer.ts`: Transforms navigation data for breadcrumbs.

### `i18n/` & `messages/`
Internationalization support.
- `i18n/`: Logic for locale detection and routing.
- `messages/`: JSON translation files for various languages (e.g., `en.json`, `es.json`).

### `middlewares/`
Next.js middleware functions for handling cross-cutting concerns.
- `with-auth.ts`: Authentication checks.
- `with-intl.ts`: Internationalization logic.
- `with-channel-id.ts`: BigCommerce channel identification.

### `tests/`
Automated tests for the application, typically using Playwright for E2E testing.

---

## Key Concepts for Students

1.  **GraphQL Integration**: Catalyst uses `gql.tada` for type-safe GraphQL queries. Check `core/client/queries/` to see how data is fetched.
2.  **Data Transformation**: Raw data from BigCommerce often needs reshaping before being passed to UI components. This happens in `core/data-transformers/`.
3.  **Vibes/Soul UI**: Instead of building UI from scratch, use components from `core/vibes/soul/`. Primitives are low-level, while Sections are high-level layout blocks.
4.  **Makeswift Integration**: If you're using visual editing, check `core/lib/makeswift/` to see how components are registered for the editor.
5.  **Localized Routing**: The `[locale]` folder in `core/app/` ensures the storefront can support multiple languages and regions.

## How to Explore

- To change the **Home Page**: Look at `core/app/[locale]/(default)/page.tsx`.
- To edit **Product Pages**: Go to `core/app/[locale]/(default)/product/[slug]/page.tsx`.
- To modify the **Global Header**: Check `core/components/header/`.
- To add a **New UI Component**: Consider adding it to `core/vibes/soul/primitives/`.
