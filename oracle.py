import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def hu(n, d): return (2*n + d) // (2*d)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def feed(h, d, b):
    return f"The {h} head at {d} lb a day eat {h*d} lb a day, or {dec(hu(h*d*100,b))} bales of {b} lb."
def days(n, b, d):
    t = n*b; k = t//d
    return f"The {pl(n,' bale',' bales')} of {b} lb hold {t} lb, which feeds {pl(k,' day',' days')} at {d} lb a day, with {t-k*d} lb left over."
def room(n, l, w, h, k):
    cf = hu(n*l*w*h*100,1728); st = (n+k-1)//k; sf = hu(st*l*w*100,144)
    return f"The {pl(n,' bale',' bales')} of {l} by {w} by {h} inches fill {dec(cf)} cu ft, and stacked {k} high cover {dec(sf)} sq ft."
def cost(n, p, f, b):
    c = n*p + f
    return f"The {pl(n,' bale',' bales')} at ${dec(p)} and ${dec(f)} delivery cost ${money(c)}, or ${money(hu(c*2000,n*b))} a ton."
random.seed(756)
R=random.randint
cases = [
 dict(fn="feed", args=["3","20","50"], expect=feed(3,20,50)),
 dict(fn="days", args=["100","50","60"], expect=days(100,50,60)),
 dict(fn="room", args=["100","36","18","14","6"], expect=room(100,36,18,14,6)),
 dict(fn="cost", args=["100","7.50","40","50"], expect=cost(100,750,4000,50)),
]
for _ in range(25):
    h,d,b=R(1,1000),R(1,200),R(1,2000); cases.append(dict(fn="feed", args=[str(h),str(d),str(b)], expect=feed(h,d,b)))
for _ in range(25):
    n,b,d=R(1,1000000),R(1,2000),R(1,1000000); cases.append(dict(fn="days", args=[str(n),str(b),str(d)], expect=days(n,b,d)))
for _ in range(20):
    n,l,w,h,k=R(1,1000000),R(1,200),R(1,200),R(1,200),R(1,20); cases.append(dict(fn="room", args=[str(n),str(l),str(w),str(h),str(k)], expect=room(n,l,w,h,k)))
for _ in range(20):
    n,p,f,b=R(1,1000000),R(1,1000000),R(1,1000000),R(1,2000)
    cases.append(dict(fn="cost", args=[str(n),dec(p),dec(f),str(b)], expect=cost(n,p,f,b)))
errs=[["feed",["0","20","50"]],["feed",["3","0","50"]],["feed",["3","20","0"]],["days",["0","50","60"]],["days",["100","0","60"]],["days",["100","50","0"]],
 ["room",["100","0","18","14","6"]],["room",["100","36","18","14","0"]],["room",["100","36","18","14","21"]],["cost",["100","0","40","50"]],["cost",["100","7.50","0","50"]],["cost",["0","7.50","40","50"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
