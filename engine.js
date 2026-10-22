// Hay Math engine: the hay a herd eats a day, the days a stack of bales lasts, the room the bales take, and the cost a ton. Exact integers (hundredths where shown), half-up on display only. Every number is the owner's own entry off the scale and the seller ticket.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _HGT = "the wall height must be from 1 to 240 inches with no decimal places";
var _HD = "the head count must be from 1 to 1000 with no decimal places";
var _LBD = "the pounds a day must be from 1 to 200 lb with no decimal places";
var _BW = "the bale weight must be from 1 to 2000 lb with no decimal places";
var _NB = "the bale count must be from 1 to 1000000 with no decimal places";
var _DIM = "the bale size must be from 1 to 200 inches with no decimal places";
var _HI = "the stack height must be from 1 to 20 bales with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }
function _pl(n, one, many) { return n + (n === 1 ? one : many); }

function feedTruth(head, lbday, balelb) {
  var h = _i(head, _HD, 4, 1, 1000), d = _i(lbday, _LBD, 3, 1, 200), b = _i(balelb, _BW, 4, 1, 2000);
  var daily = h * d;
  return "The " + _pl(h, " head", " head") + " at " + d + " lb a day eat " + daily + " lb a day, or " + _dec(_hu(daily * 100, b), 2) + " bales of " + b + " lb.";
}
function daysTruth(bales, balelb, daily) {
  var n = _i(bales, _NB, 7, 1, 1000000), b = _i(balelb, _BW, 4, 1, 2000), d = _i(daily, _NB, 7, 1, 1000000);
  var total = n * b, days = Math.floor(total / d), left = total - days * d;
  return "The " + _pl(n, " bale", " bales") + " of " + b + " lb hold " + total + " lb, which feeds " + _pl(days, " day", " days") + " at " + d + " lb a day, with " + left + " lb left over.";
}
function roomTruth(bales, len, wid, hgt, high) {
  var n = _i(bales, _NB, 7, 1, 1000000), l = _i(len, _DIM, 3, 1, 200), w = _i(wid, _DIM, 3, 1, 200), h = _i(hgt, _DIM, 3, 1, 200), k = _i(high, _HI, 2, 1, 20);
  var cf = _hu(n * l * w * h * 100, 1728), stacks = Math.floor((n + k - 1) / k), sf = _hu(stacks * l * w * 100, 144);
  return "The " + _pl(n, " bale", " bales") + " of " + l + " by " + w + " by " + h + " inches fill " + _dec(cf, 2) + " cu ft, and stacked " + k + " high cover " + _dec(sf, 2) + " sq ft.";
}
function costTruth(bales, price, fee, balelb) {
  var n = _i(bales, _NB, 7, 1, 1000000), p = _p(price, _PRICE, 5, 2, 1, 1000000);
  var f = _p(fee, _PRICE, 5, 2, 1, 1000000), b = _i(balelb, _BW, 4, 1, 2000);
  var cents = n * p + f, perton = _hu(cents * 2000, n * b);
  return "The " + _pl(n, " bale", " bales") + " at $" + _dec(p, 2) + " and $" + _dec(f, 2) + " delivery cost $" + _money(cents) + ", or $" + _money(perton) + " a ton.";
}
