# MWI Market Mate · Feature Documentation

---

# Before We Begin

> ⚠️ **Compliance Notice**

This plugin **does not include any auto-buy functionality**, as automation would violate game rule 4.2.

✅ **This plugin**: Navigates to a specific item's market page on the client side. This is identical to a player manually Shift-clicking an item in their inventory.

❌ **Rule-breaking plugins**: Provide one-click batch purchasing of multiple items, sending bulk requests to the server — that's automation.

Therefore, **all purchases must be performed manually by the player.**
The plugin only helps you find items and calculate quantities — the rest is up to you.

If you don't trust the one-click market navigation feature, the plugin also provides in-market highlighting of items in your shopping list.

**The plugin has been submitted to admin for review. All features from v1.4.1 onward are fully compliant.**

---

# I. Overview

The core purpose of this plugin is to serve as a **crafting material shortage calculator and manual purchasing assistant**. When you open any crafting panel, it automatically analyzes the required materials, precisely calculates what you're missing and how much, and lets you add them to a shopping list for quick market navigation.

**v1.3.0**: Core data source migrated from DOM parsing to the game data layer (`initClientData`), providing more accurate recipe data and automatic Artisan Tea buff calculations.

**v1.3.1**: Added market dialog auto-fill and purchase navigation bar, greatly improving efficiency when buying multiple materials.

**v1.3.5**: Added crafting plans with inventory locking, solving miscalculation issues when multiple recipes share materials.

**v1.4.0**: Added English language support (bilingual i18n). Switch plugin language in the settings panel.

**v1.4.1**: Removed auto-advance after purchase. Replaced with an inline fulfilled banner in the navigation bar — all market page navigation is now triggered by manual player clicks, ensuring compliance.

**v1.4.2**: Added Z-score safety margin probability model, upgrade chain tree display, and quest tracking panel. Removed legacy fallback navigation to further ensure compliance.

**v1.4.3**: Added surplus markers and upgrade chain step filtering. Gold coins no longer affected by Artisan Tea reductions. New feedback and donate buttons in settings.

**v1.4.5**: Fixed script loading timing that caused inventory data loss for some users. Full chain materials now sync to crafting plans. Added User Guide page and feedback completion marking.

**v1.4.6**: "Add Full Chain Materials" now creates independent crafting plans per step, so intermediate products' materials are properly locked. Fixes shortage miscalculation when multiple upgrade chains share intermediate materials.

**v1.4.7**: Fixed full chain materials not deducting existing cart quantities when adding to shopping list. Upgrade chain tree now correctly subtracts cart-claimed quantities from available inventory.

> 📖 Full User Guide: https://mate.colacola.cloud/guide?lang=en
>
> 💬 Feedback & Community: https://mate.colacola.cloud/community?lang=en

---

# II. Acknowledgments

## Ideas & Suggestions

- Mooooooooo
- AlphB
- wangchyan
- mutallip
- Foreversunny & friends
- Joey
- baozi

## Bug Reports

- Neilyo
- ccat
- SuxingX🐊

(In no particular order)

---

# III. Changelog

## v1.4.7

### Fixed

- **Full Chain Cart Deduplication**: "Add Full Chain Materials" now deducts existing cart quantities after calculating shortages, only adding the net difference to the shopping list — prevents duplicate additions that inflated purchase quantities
- **Chain Tree Inventory Subtracts Cart Claims**: Upgrade chain tree display now correctly subtracts cart-claimed quantities from available inventory, showing more accurate shortage figures

## v1.4.6

### Improved

- **Per-Step Crafting Plans**: "Add Full Chain Materials" now creates independent crafting plans for each checked step (instead of a single aggregate plan for the final product). Intermediate products' materials are locked separately, fixing shortage miscalculation when multiple upgrade chains share intermediate materials
- **Chain Inventory Display**: Upgrade chain tree's material inventory calculation now excludes all steps of the current chain, only affected by other chains' plans — more accurate display
- **Per-Step Progress Tracking**: WS events for intermediate crafting steps now correctly match their respective plans, enabling step-by-step progress bar updates

## v1.4.5

### Fixed

- **WS Inventory Timing**: Changed script loading from `document-idle` to `document-start`, moving WebSocket interception to script top-level execution. Fixes inventory data loss for users whose game WS initialized before the script loaded

### Added

- **Full Chain Materials Sync to Crafting Plans**: "Add Full Chain Materials" now auto-creates/updates crafting plans, locking leaf materials' inventory. Deselecting steps and re-clicking correctly reduces the locked scope, preventing shortage miscalculation when multiple chains share materials
- **User Guide Page**: New guide page at mate.colacola.cloud/guide with bilingual support. New "📖 User Guide" button in the settings panel
- **Feedback Completion Marking**: Community feedback now supports a "✅ Resolved" status badge, automatically displayed on the frontend

## v1.4.3

### Added

- **Surplus Markers**: When materials are sufficient, a blue "+X" badge shows how many extra you'll have after crafting. Upgrade chain tree and upgrade item rows also display surplus indicators
- **Upgrade Chain Step Filtering**: Each step in the upgrade chain tree now has a checkbox. When clicking "Add Full Chain Materials", only checked steps' materials are added — making it easy to skip lower-tier steps you don't need to craft
- **Feedback & Donate Buttons**: New "💡 Suggest" and "❤ Donate" buttons at the bottom of the settings panel, linking to external pages for submitting feature suggestions or viewing the donor leaderboard

### Fixed

- **Gold Coins Excluded from Artisan Tea Reduction**: Gold coin costs are no longer affected by Artisan Tea buff or Z-score safety margin calculations, using linear calculation instead for more accurate shortage results
- **Same-Recipe Multi-Quest Plan Accumulation**: When multiple quests use the same recipe, crafting plan counts and locked material quantities now correctly accumulate instead of being overwritten

## v1.4.2

### Added

- **Z-score Safety Margin**: Binomial distribution-based material safety margin model with four confidence levels (Z-90%/95%/99%/99.9%). Shortage badges display in `requirement⁺margin` format. New settings for Z-score level and Guzzling Pouch level override
- **Upgrade Chain Tree Display**: Upgrade chain recipes (e.g., equipment upgrade sequences) automatically show the full chain tree in the summary panel, listing each step's required materials and shortages. Supports expand/collapse toggle. New "Add Full Chain Materials" button adds all leaf materials from the entire chain to the shopping list
- **Quest Tracking Panel**: New quest panel in the shopping list showing active production quest progress, with "Add Missing" and "Create Plan" shortcut buttons. Quest status updates in real-time via WS

### Compliance

- **Removed Fallback Navigation**: Deleted `openMarketplaceByVisibleMenu` function (which simulated clicking item + context menu to navigate to market). Market navigation now exclusively uses the React internal method, strictly ensuring 1:1 human-to-script action correspondence

## v1.4.1

### Changed

- **Removed "Auto-Advance After Purchase"**: Based on admin's feedback, automatically navigating to the next item's market page after a purchase violated the 1:1 human-action-to-server-request rule (one human action should produce only one server request). This feature and its settings toggle have been completely removed

### Added

- **Inline Fulfilled Banner in Nav Bar**: When an item is fully purchased and removed from the shopping list, an inline banner slides into the purchase navigation bar showing the fulfilled item and next pending item info, with a "Next item ▶" button. Clicking the button navigates to the next item's market page — ensuring every market navigation is triggered by a manual player click
- **All-Done Banner**: When the entire shopping list is fulfilled, the nav bar displays a "🎉 All items purchased!" completion banner that auto-fades after 5 seconds

### Cleaned Up

- Removed `_tryAutoAdvanceMarket` function and all call sites
- Removed `STATE.autoAdvanceEnabled` and its persistence logic
- Removed "Auto-Advance" settings row and event handler
- Removed related i18n keys (`s_auto_advance`, `toast_advance_on/off`, `toast_auto_jump`, `toast_all_purchased`)

## v1.4.0

### Added

- **Bilingual Support (i18n)**: Full English language support for all UI text (buttons, labels, toast messages, settings panel — 120+ strings translated). New "Language" toggle at the bottom of settings panel to switch between Chinese and English
- **Bilingual Item Name Resolution**: Extracts both Chinese and English item name mappings from the game's i18n resources. Switching language automatically updates item names in the shopping list and navigation bar — no need to re-add items

### Improved

- **Wider Default Panel**: Increased from 346px to 390px to accommodate longer English text
- **Variable Shadowing Fix**: Fixed `const t` inside `getItemName` shadowing the global `t()` translation function, causing fallback path crashes

### Fixed

- **Enhancement Panel Inventory Zeroed**: Fixed same-item multi-enhancement-level entries overwriting each other, causing inventory to show 0. Switched to hash-keyed storage, aggregating only inventory-location items
- **Guzzling Pouch Bonus Lost**: Fixed `_detailMap` only containing bag items, unable to find equipped Guzzling Pouch. Now uses `getEquippedLevel` to search all locations via hashMap
- **Artisan Tea Detection Unstable**: Prioritizes WS-captured drink slot data (`actionTypeDrinkSlotsMap`), React Fiber as fallback
- **Enhancement Panel Rebuild Cooldown**: Game destroys and rebuilds the panel DOM after each enhancement. Added 6-second cooldown protection to prevent data flickering
- **Cross-Panel Tab Interference**: `isCurrentActionMode` now scopes tab search to the modal's own panel container

## v1.3.6

### Fixed

- Fixed an intermittent minor bug

## v1.3.5

### Added

- **Crafting Plans & Inventory Locking**: Clicking "Add to Shopping List" auto-creates a crafting plan recording locked material quantities. Other recipes deduct locked quantities before calculating shortages, solving the shared-material miscalculation problem
- **Crafting Plans Panel**: New clipboard icon in the shopping list header opens an independent side panel showing all plans, progress, and locked material details. Supports independent dragging and position persistence
- **WS Crafting Tracking**: Monitors `action_completed` and `actions_updated` WS messages for precise progress tracking; auto-removes plans and releases locked inventory on completion
- **Editable Craft Count**: Craft count can be modified directly in the plan panel; locked quantities auto-recalculate
- New settings toggle: **Crafting Plans** (default on)

### Fixed

- **House Panel Shortage Calculation Failed**: v1.3.4's `_getVisibleMainContainer()` scoped to `MainPanel_subPanelContainer`, but the house panel lives in a separate `Modal_modal` dialog. Fixed `findActiveHousePanel()` to search `document` directly
- **Empty Plans Not Created When Materials Sufficient**: Crafting plans only created when there are actual shortages
- **Fixed a bug caused by fixing the bug that was caused by fixing a bug.**

### Improved

- Other known issue optimizations

## v1.3.4 and Earlier

- Core features launched: shortage auto-calculation, shopping list, market navigation & highlighting
- Game data layer integration (`initClientData`); production recipes no longer depend on DOM parsing
- Artisan Tea & Guzzling Pouch auto-calculation; data source tag for visual buff confirmation
- Smart fallback to DOM parsing for alchemy, enhancement, and other dynamic-input scenarios
- WebSocket precise inventory tracking; auto-deduction from shopping list after purchases
- Market dialog quantity pre-fill, purchase navigation bar, WS market data cache
- Star protection, reserve quantities, auto-collapse on fulfillment
- Tiered clearing (main button clears non-starred / dropdown clears all)
- House building panel shortage calculation support
- "Current Action" tab manual planned actions input
- Panel dragging, locking, resizing, item search, editable quantities, pick from inventory
- Multi-version stability fixes and optimizations
