# Hay Math

Hay bale arithmetic. The 3 head at 20 lb a day eat 60 lb a day, or 1.2 bales of 50 lb.

## What it computes

- **The feed truth** - pounds and bales a day: the head (1 to 1000) times the pounds a day each (1 to 200), over the bale weight (1 to 2000 lb).
- **The days truth** - days: the bales (1 to 1000000) times the bale weight, divided by the herd pounds a day, rounded down, with the pounds left over.
- **The room truth** - cubic feet and floor: the bale size (1 to 200 inches a side) times the count, and the floor the stacks cover at a stack height of 1 to 20 bales.
- **The cost truth** - cost: the bales at their price plus delivery (0.01 to 10000 dollars), and what that is a ton.

## Boundary

Arithmetic only. Counting applied as written. It has not seen any animal and does not know their needs, their health, the hay's quality or a vet's advice, and it gives no verdict that an amount of hay is enough or right. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/haymath/
Repo: https://github.com/iLanis-agent/haymath
