function Vr(e, t) {
  const n = Object.create(null),
    o = e.split(",");
  for (let r = 0; r < o.length; r++) n[o[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const ve = {},
  nn = [],
  nt = () => {},
  iu = () => !1,
  su = /^on[^a-z]/,
  To = (e) => su.test(e),
  Dr = (e) => e.startsWith("onUpdate:"),
  Ce = Object.assign,
  Hr = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  lu = Object.prototype.hasOwnProperty,
  ce = (e, t) => lu.call(e, t),
  te = Array.isArray,
  on = (e) => Qn(e) === "[object Map]",
  Gs = (e) => Qn(e) === "[object Set]",
  au = (e) => Qn(e) === "[object RegExp]",
  le = (e) => typeof e == "function",
  xe = (e) => typeof e == "string",
  zr = (e) => typeof e == "symbol",
  ye = (e) => e !== null && typeof e == "object",
  el = (e) => ye(e) && le(e.then) && le(e.catch),
  tl = Object.prototype.toString,
  Qn = (e) => tl.call(e),
  uu = (e) => Qn(e).slice(8, -1),
  nl = (e) => Qn(e) === "[object Object]",
  Kr = (e) =>
    xe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  co = Vr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  qo = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  cu = /-(\w)/g,
  ct = qo((e) => e.replace(cu, (t, n) => (n ? n.toUpperCase() : ""))),
  fu = /\B([A-Z])/g,
  Kt = qo((e) => e.replace(fu, "-$1").toLowerCase()),
  Ao = qo((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Ko = qo((e) => (e ? `on${Ao(e)}` : "")),
  Fn = (e, t) => !Object.is(e, t),
  qn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  bo = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  du = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  hu = (e) => {
    const t = xe(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let _i;
const mr = () =>
  _i ||
  (_i =
    typeof globalThis != "undefined"
      ? globalThis
      : typeof self != "undefined"
      ? self
      : typeof window != "undefined"
      ? window
      : typeof global != "undefined"
      ? global
      : {});
function Ur(e) {
  if (te(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n],
        r = xe(o) ? vu(o) : Ur(o);
      if (r) for (const i in r) t[i] = r[i];
    }
    return t;
  } else {
    if (xe(e)) return e;
    if (ye(e)) return e;
  }
}
const gu = /;(?![^(]*\))/g,
  mu = /:([^]+)/,
  pu = /\/\*[^]*?\*\//g;
function vu(e) {
  const t = {};
  return (
    e
      .replace(pu, "")
      .split(gu)
      .forEach((n) => {
        if (n) {
          const o = n.split(mu);
          o.length > 1 && (t[o[0].trim()] = o[1].trim());
        }
      }),
    t
  );
}
function Wr(e) {
  let t = "";
  if (xe(e)) t = e;
  else if (te(e))
    for (let n = 0; n < e.length; n++) {
      const o = Wr(e[n]);
      o && (t += o + " ");
    }
  else if (ye(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const bu =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  yu = Vr(bu);
function ol(e) {
  return !!e || e === "";
}
const ym = (e) =>
    xe(e)
      ? e
      : e == null
      ? ""
      : te(e) || (ye(e) && (e.toString === tl || !le(e.toString)))
      ? JSON.stringify(e, rl, 2)
      : String(e),
  rl = (e, t) =>
    t && t.__v_isRef
      ? rl(e, t.value)
      : on(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [o, r]) => ((n[`${o} =>`] = r), n),
            {}
          ),
        }
      : Gs(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : ye(t) && !te(t) && !nl(t)
      ? String(t)
      : t;
let Ye;
class _u {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ye),
      !t && Ye && (this.index = (Ye.scopes || (Ye.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Ye;
      try {
        return (Ye = this), t();
      } finally {
        Ye = n;
      }
    }
  }
  on() {
    Ye = this;
  }
  off() {
    Ye = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++) this.effects[n].stop();
      for (n = 0, o = this.cleanups.length; n < o; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, o = this.scopes.length; n < o; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function wu(e, t = Ye) {
  t && t.active && t.effects.push(e);
}
function xu() {
  return Ye;
}
const Qr = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  il = (e) => (e.w & Tt) > 0,
  sl = (e) => (e.n & Tt) > 0,
  Cu = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Tt;
  },
  ku = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let o = 0; o < t.length; o++) {
        const r = t[o];
        il(r) && !sl(r) ? r.delete(e) : (t[n++] = r),
          (r.w &= ~Tt),
          (r.n &= ~Tt);
      }
      t.length = n;
    }
  },
  pr = new WeakMap();
let Sn = 0,
  Tt = 1;
const vr = 30;
let Ge;
const jt = Symbol(""),
  br = Symbol("");
class Yr {
  constructor(t, n = null, o) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      wu(this, o);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Ge,
      n = St;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Ge),
        (Ge = this),
        (St = !0),
        (Tt = 1 << ++Sn),
        Sn <= vr ? Cu(this) : wi(this),
        this.fn()
      );
    } finally {
      Sn <= vr && ku(this),
        (Tt = 1 << --Sn),
        (Ge = this.parent),
        (St = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Ge === this
      ? (this.deferStop = !0)
      : this.active &&
        (wi(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function wi(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let St = !0;
const ll = [];
function gn() {
  ll.push(St), (St = !1);
}
function mn() {
  const e = ll.pop();
  St = e === void 0 ? !0 : e;
}
function Ie(e, t, n) {
  if (St && Ge) {
    let o = pr.get(e);
    o || pr.set(e, (o = new Map()));
    let r = o.get(n);
    r || o.set(n, (r = Qr())), al(r);
  }
}
function al(e, t) {
  let n = !1;
  Sn <= vr ? sl(e) || ((e.n |= Tt), (n = !il(e))) : (n = !e.has(Ge)),
    n && (e.add(Ge), Ge.deps.push(e));
}
function gt(e, t, n, o, r, i) {
  const s = pr.get(e);
  if (!s) return;
  let l = [];
  if (t === "clear") l = [...s.values()];
  else if (n === "length" && te(e)) {
    const a = Number(o);
    s.forEach((c, u) => {
      (u === "length" || u >= a) && l.push(c);
    });
  } else
    switch ((n !== void 0 && l.push(s.get(n)), t)) {
      case "add":
        te(e)
          ? Kr(n) && l.push(s.get("length"))
          : (l.push(s.get(jt)), on(e) && l.push(s.get(br)));
        break;
      case "delete":
        te(e) || (l.push(s.get(jt)), on(e) && l.push(s.get(br)));
        break;
      case "set":
        on(e) && l.push(s.get(jt));
        break;
    }
  if (l.length === 1) l[0] && yr(l[0]);
  else {
    const a = [];
    for (const c of l) c && a.push(...c);
    yr(Qr(a));
  }
}
function yr(e, t) {
  const n = te(e) ? e : [...e];
  for (const o of n) o.computed && xi(o);
  for (const o of n) o.computed || xi(o);
}
function xi(e, t) {
  (e !== Ge || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Eu = Vr("__proto__,__v_isRef,__isVue"),
  ul = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(zr)
  ),
  Su = Zr(),
  Ru = Zr(!1, !0),
  Pu = Zr(!0),
  Ci = Tu();
function Tu() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const o = ie(this);
        for (let i = 0, s = this.length; i < s; i++) Ie(o, "get", i + "");
        const r = o[t](...n);
        return r === -1 || r === !1 ? o[t](...n.map(ie)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        gn();
        const o = ie(this)[t].apply(this, n);
        return mn(), o;
      };
    }),
    e
  );
}
function qu(e) {
  const t = ie(this);
  return Ie(t, "has", e), t.hasOwnProperty(e);
}
function Zr(e = !1, t = !1) {
  return function (o, r, i) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_isShallow") return t;
    if (r === "__v_raw" && i === (e ? (t ? Uu : gl) : t ? hl : dl).get(o))
      return o;
    const s = te(o);
    if (!e) {
      if (s && ce(Ci, r)) return Reflect.get(Ci, r, i);
      if (r === "hasOwnProperty") return qu;
    }
    const l = Reflect.get(o, r, i);
    return (zr(r) ? ul.has(r) : Eu(r)) || (e || Ie(o, "get", r), t)
      ? l
      : Oe(l)
      ? s && Kr(r)
        ? l
        : l.value
      : ye(l)
      ? e
        ? pl(l)
        : pn(l)
      : l;
  };
}
const Au = cl(),
  Mu = cl(!0);
function cl(e = !1) {
  return function (n, o, r, i) {
    let s = n[o];
    if (ln(s) && Oe(s) && !Oe(r)) return !1;
    if (
      !e &&
      (!yo(r) && !ln(r) && ((s = ie(s)), (r = ie(r))),
      !te(n) && Oe(s) && !Oe(r))
    )
      return (s.value = r), !0;
    const l = te(n) && Kr(o) ? Number(o) < n.length : ce(n, o),
      a = Reflect.set(n, o, r, i);
    return (
      n === ie(i) && (l ? Fn(r, s) && gt(n, "set", o, r) : gt(n, "add", o, r)),
      a
    );
  };
}
function Ou(e, t) {
  const n = ce(e, t);
  e[t];
  const o = Reflect.deleteProperty(e, t);
  return o && n && gt(e, "delete", t, void 0), o;
}
function $u(e, t) {
  const n = Reflect.has(e, t);
  return (!zr(t) || !ul.has(t)) && Ie(e, "has", t), n;
}
function Lu(e) {
  return Ie(e, "iterate", te(e) ? "length" : jt), Reflect.ownKeys(e);
}
const fl = { get: Su, set: Au, deleteProperty: Ou, has: $u, ownKeys: Lu },
  Bu = {
    get: Pu,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Fu = Ce({}, fl, { get: Ru, set: Mu }),
  Jr = (e) => e,
  Mo = (e) => Reflect.getPrototypeOf(e);
function Jn(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const r = ie(e),
    i = ie(t);
  n || (t !== i && Ie(r, "get", t), Ie(r, "get", i));
  const { has: s } = Mo(r),
    l = o ? Jr : n ? ei : In;
  if (s.call(r, t)) return l(e.get(t));
  if (s.call(r, i)) return l(e.get(i));
  e !== r && e.get(t);
}
function Xn(e, t = !1) {
  const n = this.__v_raw,
    o = ie(n),
    r = ie(e);
  return (
    t || (e !== r && Ie(o, "has", e), Ie(o, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function Gn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Ie(ie(e), "iterate", jt), Reflect.get(e, "size", e)
  );
}
function ki(e) {
  e = ie(e);
  const t = ie(this);
  return Mo(t).has.call(t, e) || (t.add(e), gt(t, "add", e, e)), this;
}
function Ei(e, t) {
  t = ie(t);
  const n = ie(this),
    { has: o, get: r } = Mo(n);
  let i = o.call(n, e);
  i || ((e = ie(e)), (i = o.call(n, e)));
  const s = r.call(n, e);
  return (
    n.set(e, t), i ? Fn(t, s) && gt(n, "set", e, t) : gt(n, "add", e, t), this
  );
}
function Si(e) {
  const t = ie(this),
    { has: n, get: o } = Mo(t);
  let r = n.call(t, e);
  r || ((e = ie(e)), (r = n.call(t, e))), o && o.call(t, e);
  const i = t.delete(e);
  return r && gt(t, "delete", e, void 0), i;
}
function Ri() {
  const e = ie(this),
    t = e.size !== 0,
    n = e.clear();
  return t && gt(e, "clear", void 0, void 0), n;
}
function eo(e, t) {
  return function (o, r) {
    const i = this,
      s = i.__v_raw,
      l = ie(s),
      a = t ? Jr : e ? ei : In;
    return (
      !e && Ie(l, "iterate", jt), s.forEach((c, u) => o.call(r, a(c), a(u), i))
    );
  };
}
function to(e, t, n) {
  return function (...o) {
    const r = this.__v_raw,
      i = ie(r),
      s = on(i),
      l = e === "entries" || (e === Symbol.iterator && s),
      a = e === "keys" && s,
      c = r[e](...o),
      u = n ? Jr : t ? ei : In;
    return (
      !t && Ie(i, "iterate", a ? br : jt),
      {
        next() {
          const { value: d, done: f } = c.next();
          return f
            ? { value: d, done: f }
            : { value: l ? [u(d[0]), u(d[1])] : u(d), done: f };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function bt(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Iu() {
  const e = {
      get(i) {
        return Jn(this, i);
      },
      get size() {
        return Gn(this);
      },
      has: Xn,
      add: ki,
      set: Ei,
      delete: Si,
      clear: Ri,
      forEach: eo(!1, !1),
    },
    t = {
      get(i) {
        return Jn(this, i, !1, !0);
      },
      get size() {
        return Gn(this);
      },
      has: Xn,
      add: ki,
      set: Ei,
      delete: Si,
      clear: Ri,
      forEach: eo(!1, !0),
    },
    n = {
      get(i) {
        return Jn(this, i, !0);
      },
      get size() {
        return Gn(this, !0);
      },
      has(i) {
        return Xn.call(this, i, !0);
      },
      add: bt("add"),
      set: bt("set"),
      delete: bt("delete"),
      clear: bt("clear"),
      forEach: eo(!0, !1),
    },
    o = {
      get(i) {
        return Jn(this, i, !0, !0);
      },
      get size() {
        return Gn(this, !0);
      },
      has(i) {
        return Xn.call(this, i, !0);
      },
      add: bt("add"),
      set: bt("set"),
      delete: bt("delete"),
      clear: bt("clear"),
      forEach: eo(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
      (e[i] = to(i, !1, !1)),
        (n[i] = to(i, !0, !1)),
        (t[i] = to(i, !1, !0)),
        (o[i] = to(i, !0, !0));
    }),
    [e, n, t, o]
  );
}
const [Nu, ju, Vu, Du] = Iu();
function Xr(e, t) {
  const n = t ? (e ? Du : Vu) : e ? ju : Nu;
  return (o, r, i) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? o
      : Reflect.get(ce(n, r) && r in o ? n : o, r, i);
}
const Hu = { get: Xr(!1, !1) },
  zu = { get: Xr(!1, !0) },
  Ku = { get: Xr(!0, !1) },
  dl = new WeakMap(),
  hl = new WeakMap(),
  gl = new WeakMap(),
  Uu = new WeakMap();
function Wu(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Qu(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Wu(uu(e));
}
function pn(e) {
  return ln(e) ? e : Gr(e, !1, fl, Hu, dl);
}
function ml(e) {
  return Gr(e, !1, Fu, zu, hl);
}
function pl(e) {
  return Gr(e, !0, Bu, Ku, gl);
}
function Gr(e, t, n, o, r) {
  if (!ye(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = r.get(e);
  if (i) return i;
  const s = Qu(e);
  if (s === 0) return e;
  const l = new Proxy(e, s === 2 ? o : n);
  return r.set(e, l), l;
}
function rn(e) {
  return ln(e) ? rn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ln(e) {
  return !!(e && e.__v_isReadonly);
}
function yo(e) {
  return !!(e && e.__v_isShallow);
}
function vl(e) {
  return rn(e) || ln(e);
}
function ie(e) {
  const t = e && e.__v_raw;
  return t ? ie(t) : e;
}
function vn(e) {
  return bo(e, "__v_skip", !0), e;
}
const In = (e) => (ye(e) ? pn(e) : e),
  ei = (e) => (ye(e) ? pl(e) : e);
function bl(e) {
  St && Ge && ((e = ie(e)), al(e.dep || (e.dep = Qr())));
}
function yl(e, t) {
  e = ie(e);
  const n = e.dep;
  n && yr(n);
}
function Oe(e) {
  return !!(e && e.__v_isRef === !0);
}
function he(e) {
  return _l(e, !1);
}
function Yu(e) {
  return _l(e, !0);
}
function _l(e, t) {
  return Oe(e) ? e : new Zu(e, t);
}
class Zu {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : ie(t)),
      (this._value = n ? t : In(t));
  }
  get value() {
    return bl(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || yo(t) || ln(t);
    (t = n ? t : ie(t)),
      Fn(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : In(t)), yl(this));
  }
}
function Vt(e) {
  return Oe(e) ? e.value : e;
}
const Ju = {
  get: (e, t, n) => Vt(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return Oe(r) && !Oe(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, o);
  },
};
function wl(e) {
  return rn(e) ? e : new Proxy(e, Ju);
}
class Xu {
  constructor(t, n, o, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Yr(t, () => {
        this._dirty || ((this._dirty = !0), yl(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = o);
  }
  get value() {
    const t = ie(this);
    return (
      bl(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Gu(e, t, n = !1) {
  let o, r;
  const i = le(e);
  return (
    i ? ((o = e), (r = nt)) : ((o = e.get), (r = e.set)),
    new Xu(o, r, i || !r, n)
  );
}
function Rt(e, t, n, o) {
  let r;
  try {
    r = o ? e(...o) : e();
  } catch (i) {
    Oo(i, t, n);
  }
  return r;
}
function Ue(e, t, n, o) {
  if (le(e)) {
    const i = Rt(e, t, n, o);
    return (
      i &&
        el(i) &&
        i.catch((s) => {
          Oo(s, t, n);
        }),
      i
    );
  }
  const r = [];
  for (let i = 0; i < e.length; i++) r.push(Ue(e[i], t, n, o));
  return r;
}
function Oo(e, t, n, o = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const s = t.proxy,
      l = n;
    for (; i; ) {
      const c = i.ec;
      if (c) {
        for (let u = 0; u < c.length; u++) if (c[u](e, s, l) === !1) return;
      }
      i = i.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      Rt(a, null, 10, [e, s, l]);
      return;
    }
  }
  ec(e, n, r, o);
}
function ec(e, t, n, o = !0) {
  console.error(e);
}
let Nn = !1,
  _r = !1;
const Me = [];
let lt = 0;
const sn = [];
let ht = null,
  Lt = 0;
const xl = Promise.resolve();
let ti = null;
function je(e) {
  const t = ti || xl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function tc(e) {
  let t = lt + 1,
    n = Me.length;
  for (; t < n; ) {
    const o = (t + n) >>> 1;
    jn(Me[o]) < e ? (t = o + 1) : (n = o);
  }
  return t;
}
function ni(e) {
  (!Me.length || !Me.includes(e, Nn && e.allowRecurse ? lt + 1 : lt)) &&
    (e.id == null ? Me.push(e) : Me.splice(tc(e.id), 0, e), Cl());
}
function Cl() {
  !Nn && !_r && ((_r = !0), (ti = xl.then(El)));
}
function nc(e) {
  const t = Me.indexOf(e);
  t > lt && Me.splice(t, 1);
}
function oc(e) {
  te(e)
    ? sn.push(...e)
    : (!ht || !ht.includes(e, e.allowRecurse ? Lt + 1 : Lt)) && sn.push(e),
    Cl();
}
function Pi(e, t = Nn ? lt + 1 : 0) {
  for (; t < Me.length; t++) {
    const n = Me[t];
    n && n.pre && (Me.splice(t, 1), t--, n());
  }
}
function kl(e) {
  if (sn.length) {
    const t = [...new Set(sn)];
    if (((sn.length = 0), ht)) {
      ht.push(...t);
      return;
    }
    for (ht = t, ht.sort((n, o) => jn(n) - jn(o)), Lt = 0; Lt < ht.length; Lt++)
      ht[Lt]();
    (ht = null), (Lt = 0);
  }
}
const jn = (e) => (e.id == null ? 1 / 0 : e.id),
  rc = (e, t) => {
    const n = jn(e) - jn(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function El(e) {
  (_r = !1), (Nn = !0), Me.sort(rc);
  const t = nt;
  try {
    for (lt = 0; lt < Me.length; lt++) {
      const n = Me[lt];
      n && n.active !== !1 && Rt(n, null, 14);
    }
  } finally {
    (lt = 0),
      (Me.length = 0),
      kl(),
      (Nn = !1),
      (ti = null),
      (Me.length || sn.length) && El();
  }
}
function ic(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || ve;
  let r = n;
  const i = t.startsWith("update:"),
    s = i && t.slice(7);
  if (s && s in o) {
    const u = `${s === "modelValue" ? "model" : s}Modifiers`,
      { number: d, trim: f } = o[u] || ve;
    f && (r = n.map((p) => (xe(p) ? p.trim() : p))), d && (r = n.map(du));
  }
  let l,
    a = o[(l = Ko(t))] || o[(l = Ko(ct(t)))];
  !a && i && (a = o[(l = Ko(Kt(t)))]), a && Ue(a, e, 6, r);
  const c = o[l + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Ue(c, e, 6, r);
  }
}
function Sl(e, t, n = !1) {
  const o = t.emitsCache,
    r = o.get(e);
  if (r !== void 0) return r;
  const i = e.emits;
  let s = {},
    l = !1;
  if (!le(e)) {
    const a = (c) => {
      const u = Sl(c, t, !0);
      u && ((l = !0), Ce(s, u));
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  return !i && !l
    ? (ye(e) && o.set(e, null), null)
    : (te(i) ? i.forEach((a) => (s[a] = null)) : Ce(s, i),
      ye(e) && o.set(e, s),
      s);
}
function $o(e, t) {
  return !e || !To(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      ce(e, t[0].toLowerCase() + t.slice(1)) || ce(e, Kt(t)) || ce(e, t));
}
let Ve = null,
  Rl = null;
function _o(e) {
  const t = Ve;
  return (Ve = e), (Rl = (e && e.type.__scopeId) || null), t;
}
function sc(e, t = Ve, n) {
  if (!t || e._n) return e;
  const o = (...r) => {
    o._d && Vi(-1);
    const i = _o(t);
    let s;
    try {
      s = e(...r);
    } finally {
      _o(i), o._d && Vi(1);
    }
    return s;
  };
  return (o._n = !0), (o._c = !0), (o._d = !0), o;
}
function Uo(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    props: i,
    propsOptions: [s],
    slots: l,
    attrs: a,
    emit: c,
    render: u,
    renderCache: d,
    data: f,
    setupState: p,
    ctx: y,
    inheritAttrs: T,
  } = e;
  let q, M;
  const m = _o(e);
  try {
    if (n.shapeFlag & 4) {
      const w = r || o;
      (q = st(u.call(w, w, d, i, p, f, y))), (M = a);
    } else {
      const w = t;
      (q = st(
        w.length > 1 ? w(i, { attrs: a, slots: l, emit: c }) : w(i, null)
      )),
        (M = t.props ? a : lc(a));
    }
  } catch (w) {
    ($n.length = 0), Oo(w, e, 1), (q = Fe(ot));
  }
  let _ = q;
  if (M && T !== !1) {
    const w = Object.keys(M),
      { shapeFlag: F } = _;
    w.length && F & 7 && (s && w.some(Dr) && (M = ac(M, s)), (_ = mt(_, M)));
  }
  return (
    n.dirs && ((_ = mt(_)), (_.dirs = _.dirs ? _.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (_.transition = n.transition),
    (q = _),
    _o(m),
    q
  );
}
const lc = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || To(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  ac = (e, t) => {
    const n = {};
    for (const o in e) (!Dr(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
    return n;
  };
function uc(e, t, n) {
  const { props: o, children: r, component: i } = e,
    { props: s, children: l, patchFlag: a } = t,
    c = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return o ? Ti(o, s, c) : !!s;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        const f = u[d];
        if (s[f] !== o[f] && !$o(c, f)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : o === s
      ? !1
      : o
      ? s
        ? Ti(o, s, c)
        : !0
      : !!s;
  return !1;
}
function Ti(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < o.length; r++) {
    const i = o[r];
    if (t[i] !== e[i] && !$o(n, i)) return !0;
  }
  return !1;
}
function cc({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Pl = (e) => e.__isSuspense;
function fc(e, t) {
  t && t.pendingBranch
    ? te(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : oc(e);
}
const no = {};
function be(e, t, n) {
  return Tl(e, t, n);
}
function Tl(
  e,
  t,
  { immediate: n, deep: o, flush: r, onTrack: i, onTrigger: s } = ve
) {
  var l;
  const a = xu() === ((l = Pe) == null ? void 0 : l.scope) ? Pe : null;
  let c,
    u = !1,
    d = !1;
  if (
    (Oe(e)
      ? ((c = () => e.value), (u = yo(e)))
      : rn(e)
      ? ((c = () => e), (o = !0))
      : te(e)
      ? ((d = !0),
        (u = e.some((w) => rn(w) || yo(w))),
        (c = () =>
          e.map((w) => {
            if (Oe(w)) return w.value;
            if (rn(w)) return Ft(w);
            if (le(w)) return Rt(w, a, 2);
          })))
      : le(e)
      ? t
        ? (c = () => Rt(e, a, 2))
        : (c = () => {
            if (!(a && a.isUnmounted)) return f && f(), Ue(e, a, 3, [p]);
          })
      : (c = nt),
    t && o)
  ) {
    const w = c;
    c = () => Ft(w());
  }
  let f,
    p = (w) => {
      f = m.onStop = () => {
        Rt(w, a, 4);
      };
    },
    y;
  if (Hn)
    if (
      ((p = nt),
      t ? n && Ue(t, a, 3, [c(), d ? [] : void 0, p]) : c(),
      r === "sync")
    ) {
      const w = sf();
      y = w.__watcherHandles || (w.__watcherHandles = []);
    } else return nt;
  let T = d ? new Array(e.length).fill(no) : no;
  const q = () => {
    if (!!m.active)
      if (t) {
        const w = m.run();
        (o || u || (d ? w.some((F, j) => Fn(F, T[j])) : Fn(w, T))) &&
          (f && f(),
          Ue(t, a, 3, [w, T === no ? void 0 : d && T[0] === no ? [] : T, p]),
          (T = w));
      } else m.run();
  };
  q.allowRecurse = !!t;
  let M;
  r === "sync"
    ? (M = q)
    : r === "post"
    ? (M = () => qe(q, a && a.suspense))
    : ((q.pre = !0), a && (q.id = a.uid), (M = () => ni(q)));
  const m = new Yr(c, M);
  t
    ? n
      ? q()
      : (T = m.run())
    : r === "post"
    ? qe(m.run.bind(m), a && a.suspense)
    : m.run();
  const _ = () => {
    m.stop(), a && a.scope && Hr(a.scope.effects, m);
  };
  return y && y.push(_), _;
}
function dc(e, t, n) {
  const o = this.proxy,
    r = xe(e) ? (e.includes(".") ? ql(o, e) : () => o[e]) : e.bind(o, o);
  let i;
  le(t) ? (i = t) : ((i = t.handler), (n = t));
  const s = Pe;
  un(this);
  const l = Tl(r, i.bind(o), n);
  return s ? un(s) : Dt(), l;
}
function ql(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let r = 0; r < n.length && o; r++) o = o[n[r]];
    return o;
  };
}
function Ft(e, t) {
  if (!ye(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), Oe(e))) Ft(e.value, t);
  else if (te(e)) for (let n = 0; n < e.length; n++) Ft(e[n], t);
  else if (Gs(e) || on(e))
    e.forEach((n) => {
      Ft(n, t);
    });
  else if (nl(e)) for (const n in e) Ft(e[n], t);
  return e;
}
function Al(e, t) {
  const n = Ve;
  if (n === null) return e;
  const o = Vo(n) || n.proxy,
    r = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [s, l, a, c = ve] = t[i];
    s &&
      (le(s) && (s = { mounted: s, updated: s }),
      s.deep && Ft(l),
      r.push({
        dir: s,
        instance: o,
        value: l,
        oldValue: void 0,
        arg: a,
        modifiers: c,
      }));
  }
  return e;
}
function At(e, t, n, o) {
  const r = e.dirs,
    i = t && t.dirs;
  for (let s = 0; s < r.length; s++) {
    const l = r[s];
    i && (l.oldValue = i[s].value);
    let a = l.dir[o];
    a && (gn(), Ue(a, n, 8, [e.el, l, e, t]), mn());
  }
}
function Ml() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Ut(() => {
      e.isMounted = !0;
    }),
    We(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const De = [Function, Array],
  Ol = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: De,
    onEnter: De,
    onAfterEnter: De,
    onEnterCancelled: De,
    onBeforeLeave: De,
    onLeave: De,
    onAfterLeave: De,
    onLeaveCancelled: De,
    onBeforeAppear: De,
    onAppear: De,
    onAfterAppear: De,
    onAppearCancelled: De,
  },
  hc = {
    name: "BaseTransition",
    props: Ol,
    setup(e, { slots: t }) {
      const n = ke(),
        o = Ml();
      let r;
      return () => {
        const i = t.default && oi(t.default(), !0);
        if (!i || !i.length) return;
        let s = i[0];
        if (i.length > 1) {
          for (const T of i)
            if (T.type !== ot) {
              s = T;
              break;
            }
        }
        const l = ie(e),
          { mode: a } = l;
        if (o.isLeaving) return Wo(s);
        const c = qi(s);
        if (!c) return Wo(s);
        const u = Vn(c, l, o, n);
        an(c, u);
        const d = n.subTree,
          f = d && qi(d);
        let p = !1;
        const { getTransitionKey: y } = c.type;
        if (y) {
          const T = y();
          r === void 0 ? (r = T) : T !== r && ((r = T), (p = !0));
        }
        if (f && f.type !== ot && (!kt(c, f) || p)) {
          const T = Vn(f, l, o, n);
          if ((an(f, T), a === "out-in"))
            return (
              (o.isLeaving = !0),
              (T.afterLeave = () => {
                (o.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              Wo(s)
            );
          a === "in-out" &&
            c.type !== ot &&
            (T.delayLeave = (q, M, m) => {
              const _ = $l(o, f);
              (_[String(f.key)] = f),
                (q._leaveCb = () => {
                  M(), (q._leaveCb = void 0), delete u.delayedLeave;
                }),
                (u.delayedLeave = m);
            });
        }
        return s;
      };
    },
  },
  gc = hc;
function $l(e, t) {
  const { leavingVNodes: n } = e;
  let o = n.get(t.type);
  return o || ((o = Object.create(null)), n.set(t.type, o)), o;
}
function Vn(e, t, n, o) {
  const {
      appear: r,
      mode: i,
      persisted: s = !1,
      onBeforeEnter: l,
      onEnter: a,
      onAfterEnter: c,
      onEnterCancelled: u,
      onBeforeLeave: d,
      onLeave: f,
      onAfterLeave: p,
      onLeaveCancelled: y,
      onBeforeAppear: T,
      onAppear: q,
      onAfterAppear: M,
      onAppearCancelled: m,
    } = t,
    _ = String(e.key),
    w = $l(n, e),
    F = (N, C) => {
      N && Ue(N, o, 9, C);
    },
    j = (N, C) => {
      const x = C[1];
      F(N, C),
        te(N) ? N.every(($) => $.length <= 1) && x() : N.length <= 1 && x();
    },
    V = {
      mode: i,
      persisted: s,
      beforeEnter(N) {
        let C = l;
        if (!n.isMounted)
          if (r) C = T || l;
          else return;
        N._leaveCb && N._leaveCb(!0);
        const x = w[_];
        x && kt(e, x) && x.el._leaveCb && x.el._leaveCb(), F(C, [N]);
      },
      enter(N) {
        let C = a,
          x = c,
          $ = u;
        if (!n.isMounted)
          if (r) (C = q || a), (x = M || c), ($ = m || u);
          else return;
        let v = !1;
        const H = (N._enterCb = (k) => {
          v ||
            ((v = !0),
            k ? F($, [N]) : F(x, [N]),
            V.delayedLeave && V.delayedLeave(),
            (N._enterCb = void 0));
        });
        C ? j(C, [N, H]) : H();
      },
      leave(N, C) {
        const x = String(e.key);
        if ((N._enterCb && N._enterCb(!0), n.isUnmounting)) return C();
        F(d, [N]);
        let $ = !1;
        const v = (N._leaveCb = (H) => {
          $ ||
            (($ = !0),
            C(),
            H ? F(y, [N]) : F(p, [N]),
            (N._leaveCb = void 0),
            w[x] === e && delete w[x]);
        });
        (w[x] = e), f ? j(f, [N, v]) : v();
      },
      clone(N) {
        return Vn(N, t, n, o);
      },
    };
  return V;
}
function Wo(e) {
  if (Bo(e)) return (e = mt(e)), (e.children = null), e;
}
function qi(e) {
  return Bo(e) ? (e.children ? e.children[0] : void 0) : e;
}
function an(e, t) {
  e.shapeFlag & 6 && e.component
    ? an(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function oi(e, t = !1, n) {
  let o = [],
    r = 0;
  for (let i = 0; i < e.length; i++) {
    let s = e[i];
    const l = n == null ? s.key : String(n) + String(s.key != null ? s.key : i);
    s.type === Xe
      ? (s.patchFlag & 128 && r++, (o = o.concat(oi(s.children, t, l))))
      : (t || s.type !== ot) && o.push(l != null ? mt(s, { key: l }) : s);
  }
  if (r > 1) for (let i = 0; i < o.length; i++) o[i].patchFlag = -2;
  return o;
}
function Lo(e, t) {
  return le(e) ? (() => Ce({ name: e.name }, t, { setup: e }))() : e;
}
const An = (e) => !!e.type.__asyncLoader,
  Bo = (e) => e.type.__isKeepAlive,
  mc = {
    name: "KeepAlive",
    __isKeepAlive: !0,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number],
    },
    setup(e, { slots: t }) {
      const n = ke(),
        o = n.ctx;
      if (!o.renderer)
        return () => {
          const m = t.default && t.default();
          return m && m.length === 1 ? m[0] : m;
        };
      const r = new Map(),
        i = new Set();
      let s = null;
      const l = n.suspense,
        {
          renderer: {
            p: a,
            m: c,
            um: u,
            o: { createElement: d },
          },
        } = o,
        f = d("div");
      (o.activate = (m, _, w, F, j) => {
        const V = m.component;
        c(m, _, w, 0, l),
          a(V.vnode, m, _, w, V, l, F, m.slotScopeIds, j),
          qe(() => {
            (V.isDeactivated = !1), V.a && qn(V.a);
            const N = m.props && m.props.onVnodeMounted;
            N && ze(N, V.parent, m);
          }, l);
      }),
        (o.deactivate = (m) => {
          const _ = m.component;
          c(m, f, null, 1, l),
            qe(() => {
              _.da && qn(_.da);
              const w = m.props && m.props.onVnodeUnmounted;
              w && ze(w, _.parent, m), (_.isDeactivated = !0);
            }, l);
        });
      function p(m) {
        Qo(m), u(m, n, l, !0);
      }
      function y(m) {
        r.forEach((_, w) => {
          const F = Rr(_.type);
          F && (!m || !m(F)) && T(w);
        });
      }
      function T(m) {
        const _ = r.get(m);
        !s || !kt(_, s) ? p(_) : s && Qo(s), r.delete(m), i.delete(m);
      }
      be(
        () => [e.include, e.exclude],
        ([m, _]) => {
          m && y((w) => Rn(m, w)), _ && y((w) => !Rn(_, w));
        },
        { flush: "post", deep: !0 }
      );
      let q = null;
      const M = () => {
        q != null && r.set(q, Yo(n.subTree));
      };
      return (
        Ut(M),
        ri(M),
        We(() => {
          r.forEach((m) => {
            const { subTree: _, suspense: w } = n,
              F = Yo(_);
            if (m.type === F.type && m.key === F.key) {
              Qo(F);
              const j = F.component.da;
              j && qe(j, w);
              return;
            }
            p(m);
          });
        }),
        () => {
          if (((q = null), !t.default)) return null;
          const m = t.default(),
            _ = m[0];
          if (m.length > 1) return (s = null), m;
          if (!Co(_) || (!(_.shapeFlag & 4) && !(_.shapeFlag & 128)))
            return (s = null), _;
          let w = Yo(_);
          const F = w.type,
            j = Rr(An(w) ? w.type.__asyncResolved || {} : F),
            { include: V, exclude: N, max: C } = e;
          if ((V && (!j || !Rn(V, j))) || (N && j && Rn(N, j)))
            return (s = w), _;
          const x = w.key == null ? F : w.key,
            $ = r.get(x);
          return (
            w.el && ((w = mt(w)), _.shapeFlag & 128 && (_.ssContent = w)),
            (q = x),
            $
              ? ((w.el = $.el),
                (w.component = $.component),
                w.transition && an(w, w.transition),
                (w.shapeFlag |= 512),
                i.delete(x),
                i.add(x))
              : (i.add(x),
                C && i.size > parseInt(C, 10) && T(i.values().next().value)),
            (w.shapeFlag |= 256),
            (s = w),
            Pl(_.type) ? _ : w
          );
        }
      );
    },
  },
  _m = mc;
function Rn(e, t) {
  return te(e)
    ? e.some((n) => Rn(n, t))
    : xe(e)
    ? e.split(",").includes(t)
    : au(e)
    ? e.test(t)
    : !1;
}
function Ll(e, t) {
  Bl(e, "a", t);
}
function Fo(e, t) {
  Bl(e, "da", t);
}
function Bl(e, t, n = Pe) {
  const o =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((Io(t, o, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      Bo(r.parent.vnode) && pc(o, t, n, r), (r = r.parent);
  }
}
function pc(e, t, n, o) {
  const r = Io(t, e, o, !0);
  ii(() => {
    Hr(o[t], r);
  }, n);
}
function Qo(e) {
  (e.shapeFlag &= -257), (e.shapeFlag &= -513);
}
function Yo(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function Io(e, t, n = Pe, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...s) => {
          if (n.isUnmounted) return;
          gn(), un(n);
          const l = Ue(t, n, e, s);
          return Dt(), mn(), l;
        });
    return o ? r.unshift(i) : r.push(i), i;
  }
}
const vt =
    (e) =>
    (t, n = Pe) =>
      (!Hn || e === "sp") && Io(e, (...o) => t(...o), n),
  vc = vt("bm"),
  Ut = vt("m"),
  Fl = vt("bu"),
  ri = vt("u"),
  We = vt("bum"),
  ii = vt("um"),
  bc = vt("sp"),
  yc = vt("rtg"),
  _c = vt("rtc");
function wc(e, t = Pe) {
  Io("ec", e, t);
}
const Il = "components";
function xc(e, t) {
  return kc(Il, e, !0, t) || e;
}
const Cc = Symbol.for("v-ndc");
function kc(e, t, n = !0, o = !1) {
  const r = Ve || Pe;
  if (r) {
    const i = r.type;
    if (e === Il) {
      const l = Rr(i, !1);
      if (l && (l === t || l === ct(t) || l === Ao(ct(t)))) return i;
    }
    const s = Ai(r[e] || i[e], t) || Ai(r.appContext[e], t);
    return !s && o ? i : s;
  }
}
function Ai(e, t) {
  return e && (e[t] || e[ct(t)] || e[Ao(ct(t))]);
}
function wm(e, t, n, o) {
  let r;
  const i = n && n[o];
  if (te(e) || xe(e)) {
    r = new Array(e.length);
    for (let s = 0, l = e.length; s < l; s++)
      r[s] = t(e[s], s, void 0, i && i[s]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let s = 0; s < e; s++) r[s] = t(s + 1, s, void 0, i && i[s]);
  } else if (ye(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (s, l) => t(s, l, void 0, i && i[l]));
    else {
      const s = Object.keys(e);
      r = new Array(s.length);
      for (let l = 0, a = s.length; l < a; l++) {
        const c = s[l];
        r[l] = t(e[c], c, l, i && i[l]);
      }
    }
  else r = [];
  return n && (n[o] = r), r;
}
function xm(e, t) {
  for (let n = 0; n < t.length; n++) {
    const o = t[n];
    if (te(o)) for (let r = 0; r < o.length; r++) e[o[r].name] = o[r].fn;
    else
      o &&
        (e[o.name] = o.key
          ? (...r) => {
              const i = o.fn(...r);
              return i && (i.key = o.key), i;
            }
          : o.fn);
  }
  return e;
}
const wr = (e) => (e ? (Xl(e) ? Vo(e) || e.proxy : wr(e.parent)) : null),
  Mn = Ce(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => wr(e.parent),
    $root: (e) => wr(e.root),
    $emit: (e) => e.emit,
    $options: (e) => si(e),
    $forceUpdate: (e) => e.f || (e.f = () => ni(e.update)),
    $nextTick: (e) => e.n || (e.n = je.bind(e.proxy)),
    $watch: (e) => dc.bind(e),
  }),
  Zo = (e, t) => e !== ve && !e.__isScriptSetup && ce(e, t),
  Ec = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: o,
        data: r,
        props: i,
        accessCache: s,
        type: l,
        appContext: a,
      } = e;
      let c;
      if (t[0] !== "$") {
        const p = s[t];
        if (p !== void 0)
          switch (p) {
            case 1:
              return o[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return i[t];
          }
        else {
          if (Zo(o, t)) return (s[t] = 1), o[t];
          if (r !== ve && ce(r, t)) return (s[t] = 2), r[t];
          if ((c = e.propsOptions[0]) && ce(c, t)) return (s[t] = 3), i[t];
          if (n !== ve && ce(n, t)) return (s[t] = 4), n[t];
          xr && (s[t] = 0);
        }
      }
      const u = Mn[t];
      let d, f;
      if (u) return t === "$attrs" && Ie(e, "get", t), u(e);
      if ((d = l.__cssModules) && (d = d[t])) return d;
      if (n !== ve && ce(n, t)) return (s[t] = 4), n[t];
      if (((f = a.config.globalProperties), ce(f, t))) return f[t];
    },
    set({ _: e }, t, n) {
      const { data: o, setupState: r, ctx: i } = e;
      return Zo(r, t)
        ? ((r[t] = n), !0)
        : o !== ve && ce(o, t)
        ? ((o[t] = n), !0)
        : ce(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((i[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: o,
          appContext: r,
          propsOptions: i,
        },
      },
      s
    ) {
      let l;
      return (
        !!n[s] ||
        (e !== ve && ce(e, s)) ||
        Zo(t, s) ||
        ((l = i[0]) && ce(l, s)) ||
        ce(o, s) ||
        ce(Mn, s) ||
        ce(r.config.globalProperties, s)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : ce(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Mi(e) {
  return te(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let xr = !0;
function Sc(e) {
  const t = si(e),
    n = e.proxy,
    o = e.ctx;
  (xr = !1), t.beforeCreate && Oi(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: i,
    methods: s,
    watch: l,
    provide: a,
    inject: c,
    created: u,
    beforeMount: d,
    mounted: f,
    beforeUpdate: p,
    updated: y,
    activated: T,
    deactivated: q,
    beforeDestroy: M,
    beforeUnmount: m,
    destroyed: _,
    unmounted: w,
    render: F,
    renderTracked: j,
    renderTriggered: V,
    errorCaptured: N,
    serverPrefetch: C,
    expose: x,
    inheritAttrs: $,
    components: v,
    directives: H,
    filters: k,
  } = t;
  if ((c && Rc(c, o, null), s))
    for (const A in s) {
      const W = s[A];
      le(W) && (o[A] = W.bind(n));
    }
  if (r) {
    const A = r.call(n, n);
    ye(A) && (e.data = pn(A));
  }
  if (((xr = !0), i))
    for (const A in i) {
      const W = i[A],
        _e = le(W) ? W.bind(n, n) : le(W.get) ? W.get.bind(n, n) : nt,
        se = !le(W) && le(W.set) ? W.set.bind(n) : nt,
        fe = R({ get: _e, set: se });
      Object.defineProperty(o, A, {
        enumerable: !0,
        configurable: !0,
        get: () => fe.value,
        set: (L) => (fe.value = L),
      });
    }
  if (l) for (const A in l) Nl(l[A], o, n, A);
  if (a) {
    const A = le(a) ? a.call(n) : a;
    Reflect.ownKeys(A).forEach((W) => {
      fo(W, A[W]);
    });
  }
  u && Oi(u, e, "c");
  function Y(A, W) {
    te(W) ? W.forEach((_e) => A(_e.bind(n))) : W && A(W.bind(n));
  }
  if (
    (Y(vc, d),
    Y(Ut, f),
    Y(Fl, p),
    Y(ri, y),
    Y(Ll, T),
    Y(Fo, q),
    Y(wc, N),
    Y(_c, j),
    Y(yc, V),
    Y(We, m),
    Y(ii, w),
    Y(bc, C),
    te(x))
  )
    if (x.length) {
      const A = e.exposed || (e.exposed = {});
      x.forEach((W) => {
        Object.defineProperty(A, W, {
          get: () => n[W],
          set: (_e) => (n[W] = _e),
        });
      });
    } else e.exposed || (e.exposed = {});
  F && e.render === nt && (e.render = F),
    $ != null && (e.inheritAttrs = $),
    v && (e.components = v),
    H && (e.directives = H);
}
function Rc(e, t, n = nt) {
  te(e) && (e = Cr(e));
  for (const o in e) {
    const r = e[o];
    let i;
    ye(r)
      ? "default" in r
        ? (i = ut(r.from || o, r.default, !0))
        : (i = ut(r.from || o))
      : (i = ut(r)),
      Oe(i)
        ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (s) => (i.value = s),
          })
        : (t[o] = i);
  }
}
function Oi(e, t, n) {
  Ue(te(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Nl(e, t, n, o) {
  const r = o.includes(".") ? ql(n, o) : () => n[o];
  if (xe(e)) {
    const i = t[e];
    le(i) && be(r, i);
  } else if (le(e)) be(r, e.bind(n));
  else if (ye(e))
    if (te(e)) e.forEach((i) => Nl(i, t, n, o));
    else {
      const i = le(e.handler) ? e.handler.bind(n) : t[e.handler];
      le(i) && be(r, i, e);
    }
}
function si(e) {
  const t = e.type,
    { mixins: n, extends: o } = t,
    {
      mixins: r,
      optionsCache: i,
      config: { optionMergeStrategies: s },
    } = e.appContext,
    l = i.get(t);
  let a;
  return (
    l
      ? (a = l)
      : !r.length && !n && !o
      ? (a = t)
      : ((a = {}), r.length && r.forEach((c) => wo(a, c, s, !0)), wo(a, t, s)),
    ye(t) && i.set(t, a),
    a
  );
}
function wo(e, t, n, o = !1) {
  const { mixins: r, extends: i } = t;
  i && wo(e, i, n, !0), r && r.forEach((s) => wo(e, s, n, !0));
  for (const s in t)
    if (!(o && s === "expose")) {
      const l = Pc[s] || (n && n[s]);
      e[s] = l ? l(e[s], t[s]) : t[s];
    }
  return e;
}
const Pc = {
  data: $i,
  props: Li,
  emits: Li,
  methods: Pn,
  computed: Pn,
  beforeCreate: Le,
  created: Le,
  beforeMount: Le,
  mounted: Le,
  beforeUpdate: Le,
  updated: Le,
  beforeDestroy: Le,
  beforeUnmount: Le,
  destroyed: Le,
  unmounted: Le,
  activated: Le,
  deactivated: Le,
  errorCaptured: Le,
  serverPrefetch: Le,
  components: Pn,
  directives: Pn,
  watch: qc,
  provide: $i,
  inject: Tc,
};
function $i(e, t) {
  return t
    ? e
      ? function () {
          return Ce(
            le(e) ? e.call(this, this) : e,
            le(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Tc(e, t) {
  return Pn(Cr(e), Cr(t));
}
function Cr(e) {
  if (te(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Le(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Pn(e, t) {
  return e ? Ce(Object.create(null), e, t) : t;
}
function Li(e, t) {
  return e
    ? te(e) && te(t)
      ? [...new Set([...e, ...t])]
      : Ce(Object.create(null), Mi(e), Mi(t != null ? t : {}))
    : t;
}
function qc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ce(Object.create(null), e);
  for (const o in t) n[o] = Le(e[o], t[o]);
  return n;
}
function jl() {
  return {
    app: null,
    config: {
      isNativeTag: iu,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Ac = 0;
function Mc(e, t) {
  return function (o, r = null) {
    le(o) || (o = Ce({}, o)), r != null && !ye(r) && (r = null);
    const i = jl(),
      s = new Set();
    let l = !1;
    const a = (i.app = {
      _uid: Ac++,
      _component: o,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: lf,
      get config() {
        return i.config;
      },
      set config(c) {},
      use(c, ...u) {
        return (
          s.has(c) ||
            (c && le(c.install)
              ? (s.add(c), c.install(a, ...u))
              : le(c) && (s.add(c), c(a, ...u))),
          a
        );
      },
      mixin(c) {
        return i.mixins.includes(c) || i.mixins.push(c), a;
      },
      component(c, u) {
        return u ? ((i.components[c] = u), a) : i.components[c];
      },
      directive(c, u) {
        return u ? ((i.directives[c] = u), a) : i.directives[c];
      },
      mount(c, u, d) {
        if (!l) {
          const f = Fe(o, r);
          return (
            (f.appContext = i),
            u && t ? t(f, c) : e(f, c, d),
            (l = !0),
            (a._container = c),
            (c.__vue_app__ = a),
            Vo(f.component) || f.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(c, u) {
        return (i.provides[c] = u), a;
      },
      runWithContext(c) {
        xo = a;
        try {
          return c();
        } finally {
          xo = null;
        }
      },
    });
    return a;
  };
}
let xo = null;
function fo(e, t) {
  if (Pe) {
    let n = Pe.provides;
    const o = Pe.parent && Pe.parent.provides;
    o === n && (n = Pe.provides = Object.create(o)), (n[e] = t);
  }
}
function ut(e, t, n = !1) {
  const o = Pe || Ve;
  if (o || xo) {
    const r = o
      ? o.parent == null
        ? o.vnode.appContext && o.vnode.appContext.provides
        : o.parent.provides
      : xo._context.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && le(t) ? t.call(o && o.proxy) : t;
  }
}
function Oc(e, t, n, o = !1) {
  const r = {},
    i = {};
  bo(i, jo, 1), (e.propsDefaults = Object.create(null)), Vl(e, t, r, i);
  for (const s in e.propsOptions[0]) s in r || (r[s] = void 0);
  n ? (e.props = o ? r : ml(r)) : e.type.props ? (e.props = r) : (e.props = i),
    (e.attrs = i);
}
function $c(e, t, n, o) {
  const {
      props: r,
      attrs: i,
      vnode: { patchFlag: s },
    } = e,
    l = ie(r),
    [a] = e.propsOptions;
  let c = !1;
  if ((o || s > 0) && !(s & 16)) {
    if (s & 8) {
      const u = e.vnode.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        let f = u[d];
        if ($o(e.emitsOptions, f)) continue;
        const p = t[f];
        if (a)
          if (ce(i, f)) p !== i[f] && ((i[f] = p), (c = !0));
          else {
            const y = ct(f);
            r[y] = kr(a, l, y, p, e, !1);
          }
        else p !== i[f] && ((i[f] = p), (c = !0));
      }
    }
  } else {
    Vl(e, t, r, i) && (c = !0);
    let u;
    for (const d in l)
      (!t || (!ce(t, d) && ((u = Kt(d)) === d || !ce(t, u)))) &&
        (a
          ? n &&
            (n[d] !== void 0 || n[u] !== void 0) &&
            (r[d] = kr(a, l, d, void 0, e, !0))
          : delete r[d]);
    if (i !== l)
      for (const d in i) (!t || (!ce(t, d) && !0)) && (delete i[d], (c = !0));
  }
  c && gt(e, "set", "$attrs");
}
function Vl(e, t, n, o) {
  const [r, i] = e.propsOptions;
  let s = !1,
    l;
  if (t)
    for (let a in t) {
      if (co(a)) continue;
      const c = t[a];
      let u;
      r && ce(r, (u = ct(a)))
        ? !i || !i.includes(u)
          ? (n[u] = c)
          : ((l || (l = {}))[u] = c)
        : $o(e.emitsOptions, a) ||
          ((!(a in o) || c !== o[a]) && ((o[a] = c), (s = !0)));
    }
  if (i) {
    const a = ie(n),
      c = l || ve;
    for (let u = 0; u < i.length; u++) {
      const d = i[u];
      n[d] = kr(r, a, d, c[d], e, !ce(c, d));
    }
  }
  return s;
}
function kr(e, t, n, o, r, i) {
  const s = e[n];
  if (s != null) {
    const l = ce(s, "default");
    if (l && o === void 0) {
      const a = s.default;
      if (s.type !== Function && !s.skipFactory && le(a)) {
        const { propsDefaults: c } = r;
        n in c ? (o = c[n]) : (un(r), (o = c[n] = a.call(null, t)), Dt());
      } else o = a;
    }
    s[0] &&
      (i && !l ? (o = !1) : s[1] && (o === "" || o === Kt(n)) && (o = !0));
  }
  return o;
}
function Dl(e, t, n = !1) {
  const o = t.propsCache,
    r = o.get(e);
  if (r) return r;
  const i = e.props,
    s = {},
    l = [];
  let a = !1;
  if (!le(e)) {
    const u = (d) => {
      a = !0;
      const [f, p] = Dl(d, t, !0);
      Ce(s, f), p && l.push(...p);
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  if (!i && !a) return ye(e) && o.set(e, nn), nn;
  if (te(i))
    for (let u = 0; u < i.length; u++) {
      const d = ct(i[u]);
      Bi(d) && (s[d] = ve);
    }
  else if (i)
    for (const u in i) {
      const d = ct(u);
      if (Bi(d)) {
        const f = i[u],
          p = (s[d] = te(f) || le(f) ? { type: f } : Ce({}, f));
        if (p) {
          const y = Ni(Boolean, p.type),
            T = Ni(String, p.type);
          (p[0] = y > -1),
            (p[1] = T < 0 || y < T),
            (y > -1 || ce(p, "default")) && l.push(d);
        }
      }
    }
  const c = [s, l];
  return ye(e) && o.set(e, c), c;
}
function Bi(e) {
  return e[0] !== "$";
}
function Fi(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Ii(e, t) {
  return Fi(e) === Fi(t);
}
function Ni(e, t) {
  return te(t) ? t.findIndex((n) => Ii(n, e)) : le(t) && Ii(t, e) ? 0 : -1;
}
const Hl = (e) => e[0] === "_" || e === "$stable",
  li = (e) => (te(e) ? e.map(st) : [st(e)]),
  Lc = (e, t, n) => {
    if (t._n) return t;
    const o = sc((...r) => li(t(...r)), n);
    return (o._c = !1), o;
  },
  zl = (e, t, n) => {
    const o = e._ctx;
    for (const r in e) {
      if (Hl(r)) continue;
      const i = e[r];
      if (le(i)) t[r] = Lc(r, i, o);
      else if (i != null) {
        const s = li(i);
        t[r] = () => s;
      }
    }
  },
  Kl = (e, t) => {
    const n = li(t);
    e.slots.default = () => n;
  },
  Bc = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = ie(t)), bo(t, "_", n)) : zl(t, (e.slots = {}));
    } else (e.slots = {}), t && Kl(e, t);
    bo(e.slots, jo, 1);
  },
  Fc = (e, t, n) => {
    const { vnode: o, slots: r } = e;
    let i = !0,
      s = ve;
    if (o.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (i = !1)
          : (Ce(r, t), !n && l === 1 && delete r._)
        : ((i = !t.$stable), zl(t, r)),
        (s = t);
    } else t && (Kl(e, t), (s = { default: 1 }));
    if (i) for (const l in r) !Hl(l) && !(l in s) && delete r[l];
  };
function Er(e, t, n, o, r = !1) {
  if (te(e)) {
    e.forEach((f, p) => Er(f, t && (te(t) ? t[p] : t), n, o, r));
    return;
  }
  if (An(o) && !r) return;
  const i = o.shapeFlag & 4 ? Vo(o.component) || o.component.proxy : o.el,
    s = r ? null : i,
    { i: l, r: a } = e,
    c = t && t.r,
    u = l.refs === ve ? (l.refs = {}) : l.refs,
    d = l.setupState;
  if (
    (c != null &&
      c !== a &&
      (xe(c)
        ? ((u[c] = null), ce(d, c) && (d[c] = null))
        : Oe(c) && (c.value = null)),
    le(a))
  )
    Rt(a, l, 12, [s, u]);
  else {
    const f = xe(a),
      p = Oe(a);
    if (f || p) {
      const y = () => {
        if (e.f) {
          const T = f ? (ce(d, a) ? d[a] : u[a]) : a.value;
          r
            ? te(T) && Hr(T, i)
            : te(T)
            ? T.includes(i) || T.push(i)
            : f
            ? ((u[a] = [i]), ce(d, a) && (d[a] = u[a]))
            : ((a.value = [i]), e.k && (u[e.k] = a.value));
        } else
          f
            ? ((u[a] = s), ce(d, a) && (d[a] = s))
            : p && ((a.value = s), e.k && (u[e.k] = s));
      };
      s ? ((y.id = -1), qe(y, n)) : y();
    }
  }
}
const qe = fc;
function Ic(e) {
  return Nc(e);
}
function Nc(e, t) {
  const n = mr();
  n.__VUE__ = !0;
  const {
      insert: o,
      remove: r,
      patchProp: i,
      createElement: s,
      createText: l,
      createComment: a,
      setText: c,
      setElementText: u,
      parentNode: d,
      nextSibling: f,
      setScopeId: p = nt,
      insertStaticContent: y,
    } = e,
    T = (
      h,
      g,
      b,
      P = null,
      O = null,
      B = null,
      U = !1,
      D = null,
      K = !!g.dynamicChildren
    ) => {
      if (h === g) return;
      h && !kt(h, g) && ((P = S(h)), L(h, O, B, !0), (h = null)),
        g.patchFlag === -2 && ((K = !1), (g.dynamicChildren = null));
      const { type: I, ref: G, shapeFlag: J } = g;
      switch (I) {
        case No:
          q(h, g, b, P);
          break;
        case ot:
          M(h, g, b, P);
          break;
        case Jo:
          h == null && m(g, b, P, U);
          break;
        case Xe:
          v(h, g, b, P, O, B, U, D, K);
          break;
        default:
          J & 1
            ? F(h, g, b, P, O, B, U, D, K)
            : J & 6
            ? H(h, g, b, P, O, B, U, D, K)
            : (J & 64 || J & 128) && I.process(h, g, b, P, O, B, U, D, K, z);
      }
      G != null && O && Er(G, h && h.ref, B, g || h, !g);
    },
    q = (h, g, b, P) => {
      if (h == null) o((g.el = l(g.children)), b, P);
      else {
        const O = (g.el = h.el);
        g.children !== h.children && c(O, g.children);
      }
    },
    M = (h, g, b, P) => {
      h == null ? o((g.el = a(g.children || "")), b, P) : (g.el = h.el);
    },
    m = (h, g, b, P) => {
      [h.el, h.anchor] = y(h.children, g, b, P, h.el, h.anchor);
    },
    _ = ({ el: h, anchor: g }, b, P) => {
      let O;
      for (; h && h !== g; ) (O = f(h)), o(h, b, P), (h = O);
      o(g, b, P);
    },
    w = ({ el: h, anchor: g }) => {
      let b;
      for (; h && h !== g; ) (b = f(h)), r(h), (h = b);
      r(g);
    },
    F = (h, g, b, P, O, B, U, D, K) => {
      (U = U || g.type === "svg"),
        h == null ? j(g, b, P, O, B, U, D, K) : C(h, g, O, B, U, D, K);
    },
    j = (h, g, b, P, O, B, U, D) => {
      let K, I;
      const { type: G, props: J, shapeFlag: ee, transition: re, dirs: ae } = h;
      if (
        ((K = h.el = s(h.type, B, J && J.is, J)),
        ee & 8
          ? u(K, h.children)
          : ee & 16 &&
            N(h.children, K, null, P, O, B && G !== "foreignObject", U, D),
        ae && At(h, null, P, "created"),
        V(K, h, h.scopeId, U, P),
        J)
      ) {
        for (const me in J)
          me !== "value" &&
            !co(me) &&
            i(K, me, null, J[me], B, h.children, P, O, ne);
        "value" in J && i(K, "value", null, J.value),
          (I = J.onVnodeBeforeMount) && ze(I, P, h);
      }
      ae && At(h, null, P, "beforeMount");
      const pe = (!O || (O && !O.pendingBranch)) && re && !re.persisted;
      pe && re.beforeEnter(K),
        o(K, g, b),
        ((I = J && J.onVnodeMounted) || pe || ae) &&
          qe(() => {
            I && ze(I, P, h),
              pe && re.enter(K),
              ae && At(h, null, P, "mounted");
          }, O);
    },
    V = (h, g, b, P, O) => {
      if ((b && p(h, b), P)) for (let B = 0; B < P.length; B++) p(h, P[B]);
      if (O) {
        let B = O.subTree;
        if (g === B) {
          const U = O.vnode;
          V(h, U, U.scopeId, U.slotScopeIds, O.parent);
        }
      }
    },
    N = (h, g, b, P, O, B, U, D, K = 0) => {
      for (let I = K; I < h.length; I++) {
        const G = (h[I] = D ? xt(h[I]) : st(h[I]));
        T(null, G, g, b, P, O, B, U, D);
      }
    },
    C = (h, g, b, P, O, B, U) => {
      const D = (g.el = h.el);
      let { patchFlag: K, dynamicChildren: I, dirs: G } = g;
      K |= h.patchFlag & 16;
      const J = h.props || ve,
        ee = g.props || ve;
      let re;
      b && Mt(b, !1),
        (re = ee.onVnodeBeforeUpdate) && ze(re, b, g, h),
        G && At(g, h, b, "beforeUpdate"),
        b && Mt(b, !0);
      const ae = O && g.type !== "foreignObject";
      if (
        (I
          ? x(h.dynamicChildren, I, D, b, P, ae, B)
          : U || W(h, g, D, null, b, P, ae, B, !1),
        K > 0)
      ) {
        if (K & 16) $(D, g, J, ee, b, P, O);
        else if (
          (K & 2 && J.class !== ee.class && i(D, "class", null, ee.class, O),
          K & 4 && i(D, "style", J.style, ee.style, O),
          K & 8)
        ) {
          const pe = g.dynamicProps;
          for (let me = 0; me < pe.length; me++) {
            const Ee = pe[me],
              Qe = J[Ee],
              Yt = ee[Ee];
            (Yt !== Qe || Ee === "value") &&
              i(D, Ee, Qe, Yt, O, h.children, b, P, ne);
          }
        }
        K & 1 && h.children !== g.children && u(D, g.children);
      } else !U && I == null && $(D, g, J, ee, b, P, O);
      ((re = ee.onVnodeUpdated) || G) &&
        qe(() => {
          re && ze(re, b, g, h), G && At(g, h, b, "updated");
        }, P);
    },
    x = (h, g, b, P, O, B, U) => {
      for (let D = 0; D < g.length; D++) {
        const K = h[D],
          I = g[D],
          G =
            K.el && (K.type === Xe || !kt(K, I) || K.shapeFlag & 70)
              ? d(K.el)
              : b;
        T(K, I, G, null, P, O, B, U, !0);
      }
    },
    $ = (h, g, b, P, O, B, U) => {
      if (b !== P) {
        if (b !== ve)
          for (const D in b)
            !co(D) && !(D in P) && i(h, D, b[D], null, U, g.children, O, B, ne);
        for (const D in P) {
          if (co(D)) continue;
          const K = P[D],
            I = b[D];
          K !== I && D !== "value" && i(h, D, I, K, U, g.children, O, B, ne);
        }
        "value" in P && i(h, "value", b.value, P.value);
      }
    },
    v = (h, g, b, P, O, B, U, D, K) => {
      const I = (g.el = h ? h.el : l("")),
        G = (g.anchor = h ? h.anchor : l(""));
      let { patchFlag: J, dynamicChildren: ee, slotScopeIds: re } = g;
      re && (D = D ? D.concat(re) : re),
        h == null
          ? (o(I, b, P), o(G, b, P), N(g.children, b, G, O, B, U, D, K))
          : J > 0 && J & 64 && ee && h.dynamicChildren
          ? (x(h.dynamicChildren, ee, b, O, B, U, D),
            (g.key != null || (O && g === O.subTree)) && ai(h, g, !0))
          : W(h, g, b, G, O, B, U, D, K);
    },
    H = (h, g, b, P, O, B, U, D, K) => {
      (g.slotScopeIds = D),
        h == null
          ? g.shapeFlag & 512
            ? O.ctx.activate(g, b, P, U, K)
            : k(g, b, P, O, B, U, K)
          : Z(h, g, K);
    },
    k = (h, g, b, P, O, B, U) => {
      const D = (h.component = Xc(h, P, O));
      if ((Bo(h) && (D.ctx.renderer = z), Gc(D), D.asyncDep)) {
        if ((O && O.registerDep(D, Y), !h.el)) {
          const K = (D.subTree = Fe(ot));
          M(null, K, g, b);
        }
        return;
      }
      Y(D, h, g, b, O, B, U);
    },
    Z = (h, g, b) => {
      const P = (g.component = h.component);
      if (uc(h, g, b))
        if (P.asyncDep && !P.asyncResolved) {
          A(P, g, b);
          return;
        } else (P.next = g), nc(P.update), P.update();
      else (g.el = h.el), (P.vnode = g);
    },
    Y = (h, g, b, P, O, B, U) => {
      const D = () => {
          if (h.isMounted) {
            let { next: G, bu: J, u: ee, parent: re, vnode: ae } = h,
              pe = G,
              me;
            Mt(h, !1),
              G ? ((G.el = ae.el), A(h, G, U)) : (G = ae),
              J && qn(J),
              (me = G.props && G.props.onVnodeBeforeUpdate) &&
                ze(me, re, G, ae),
              Mt(h, !0);
            const Ee = Uo(h),
              Qe = h.subTree;
            (h.subTree = Ee),
              T(Qe, Ee, d(Qe.el), S(Qe), h, O, B),
              (G.el = Ee.el),
              pe === null && cc(h, Ee.el),
              ee && qe(ee, O),
              (me = G.props && G.props.onVnodeUpdated) &&
                qe(() => ze(me, re, G, ae), O);
          } else {
            let G;
            const { el: J, props: ee } = g,
              { bm: re, m: ae, parent: pe } = h,
              me = An(g);
            if (
              (Mt(h, !1),
              re && qn(re),
              !me && (G = ee && ee.onVnodeBeforeMount) && ze(G, pe, g),
              Mt(h, !0),
              J && de)
            ) {
              const Ee = () => {
                (h.subTree = Uo(h)), de(J, h.subTree, h, O, null);
              };
              me
                ? g.type.__asyncLoader().then(() => !h.isUnmounted && Ee())
                : Ee();
            } else {
              const Ee = (h.subTree = Uo(h));
              T(null, Ee, b, P, h, O, B), (g.el = Ee.el);
            }
            if ((ae && qe(ae, O), !me && (G = ee && ee.onVnodeMounted))) {
              const Ee = g;
              qe(() => ze(G, pe, Ee), O);
            }
            (g.shapeFlag & 256 ||
              (pe && An(pe.vnode) && pe.vnode.shapeFlag & 256)) &&
              h.a &&
              qe(h.a, O),
              (h.isMounted = !0),
              (g = b = P = null);
          }
        },
        K = (h.effect = new Yr(D, () => ni(I), h.scope)),
        I = (h.update = () => K.run());
      (I.id = h.uid), Mt(h, !0), I();
    },
    A = (h, g, b) => {
      g.component = h;
      const P = h.vnode.props;
      (h.vnode = g),
        (h.next = null),
        $c(h, g.props, P, b),
        Fc(h, g.children, b),
        gn(),
        Pi(),
        mn();
    },
    W = (h, g, b, P, O, B, U, D, K = !1) => {
      const I = h && h.children,
        G = h ? h.shapeFlag : 0,
        J = g.children,
        { patchFlag: ee, shapeFlag: re } = g;
      if (ee > 0) {
        if (ee & 128) {
          se(I, J, b, P, O, B, U, D, K);
          return;
        } else if (ee & 256) {
          _e(I, J, b, P, O, B, U, D, K);
          return;
        }
      }
      re & 8
        ? (G & 16 && ne(I, O, B), J !== I && u(b, J))
        : G & 16
        ? re & 16
          ? se(I, J, b, P, O, B, U, D, K)
          : ne(I, O, B, !0)
        : (G & 8 && u(b, ""), re & 16 && N(J, b, P, O, B, U, D, K));
    },
    _e = (h, g, b, P, O, B, U, D, K) => {
      (h = h || nn), (g = g || nn);
      const I = h.length,
        G = g.length,
        J = Math.min(I, G);
      let ee;
      for (ee = 0; ee < J; ee++) {
        const re = (g[ee] = K ? xt(g[ee]) : st(g[ee]));
        T(h[ee], re, b, null, O, B, U, D, K);
      }
      I > G ? ne(h, O, B, !0, !1, J) : N(g, b, P, O, B, U, D, K, J);
    },
    se = (h, g, b, P, O, B, U, D, K) => {
      let I = 0;
      const G = g.length;
      let J = h.length - 1,
        ee = G - 1;
      for (; I <= J && I <= ee; ) {
        const re = h[I],
          ae = (g[I] = K ? xt(g[I]) : st(g[I]));
        if (kt(re, ae)) T(re, ae, b, null, O, B, U, D, K);
        else break;
        I++;
      }
      for (; I <= J && I <= ee; ) {
        const re = h[J],
          ae = (g[ee] = K ? xt(g[ee]) : st(g[ee]));
        if (kt(re, ae)) T(re, ae, b, null, O, B, U, D, K);
        else break;
        J--, ee--;
      }
      if (I > J) {
        if (I <= ee) {
          const re = ee + 1,
            ae = re < G ? g[re].el : P;
          for (; I <= ee; )
            T(null, (g[I] = K ? xt(g[I]) : st(g[I])), b, ae, O, B, U, D, K),
              I++;
        }
      } else if (I > ee) for (; I <= J; ) L(h[I], O, B, !0), I++;
      else {
        const re = I,
          ae = I,
          pe = new Map();
        for (I = ae; I <= ee; I++) {
          const Ne = (g[I] = K ? xt(g[I]) : st(g[I]));
          Ne.key != null && pe.set(Ne.key, I);
        }
        let me,
          Ee = 0;
        const Qe = ee - ae + 1;
        let Yt = !1,
          vi = 0;
        const yn = new Array(Qe);
        for (I = 0; I < Qe; I++) yn[I] = 0;
        for (I = re; I <= J; I++) {
          const Ne = h[I];
          if (Ee >= Qe) {
            L(Ne, O, B, !0);
            continue;
          }
          let it;
          if (Ne.key != null) it = pe.get(Ne.key);
          else
            for (me = ae; me <= ee; me++)
              if (yn[me - ae] === 0 && kt(Ne, g[me])) {
                it = me;
                break;
              }
          it === void 0
            ? L(Ne, O, B, !0)
            : ((yn[it - ae] = I + 1),
              it >= vi ? (vi = it) : (Yt = !0),
              T(Ne, g[it], b, null, O, B, U, D, K),
              Ee++);
        }
        const bi = Yt ? jc(yn) : nn;
        for (me = bi.length - 1, I = Qe - 1; I >= 0; I--) {
          const Ne = ae + I,
            it = g[Ne],
            yi = Ne + 1 < G ? g[Ne + 1].el : P;
          yn[I] === 0
            ? T(null, it, b, yi, O, B, U, D, K)
            : Yt && (me < 0 || I !== bi[me] ? fe(it, b, yi, 2) : me--);
        }
      }
    },
    fe = (h, g, b, P, O = null) => {
      const { el: B, type: U, transition: D, children: K, shapeFlag: I } = h;
      if (I & 6) {
        fe(h.component.subTree, g, b, P);
        return;
      }
      if (I & 128) {
        h.suspense.move(g, b, P);
        return;
      }
      if (I & 64) {
        U.move(h, g, b, z);
        return;
      }
      if (U === Xe) {
        o(B, g, b);
        for (let J = 0; J < K.length; J++) fe(K[J], g, b, P);
        o(h.anchor, g, b);
        return;
      }
      if (U === Jo) {
        _(h, g, b);
        return;
      }
      if (P !== 2 && I & 1 && D)
        if (P === 0) D.beforeEnter(B), o(B, g, b), qe(() => D.enter(B), O);
        else {
          const { leave: J, delayLeave: ee, afterLeave: re } = D,
            ae = () => o(B, g, b),
            pe = () => {
              J(B, () => {
                ae(), re && re();
              });
            };
          ee ? ee(B, ae, pe) : pe();
        }
      else o(B, g, b);
    },
    L = (h, g, b, P = !1, O = !1) => {
      const {
        type: B,
        props: U,
        ref: D,
        children: K,
        dynamicChildren: I,
        shapeFlag: G,
        patchFlag: J,
        dirs: ee,
      } = h;
      if ((D != null && Er(D, null, b, h, !0), G & 256)) {
        g.ctx.deactivate(h);
        return;
      }
      const re = G & 1 && ee,
        ae = !An(h);
      let pe;
      if ((ae && (pe = U && U.onVnodeBeforeUnmount) && ze(pe, g, h), G & 6))
        oe(h.component, b, P);
      else {
        if (G & 128) {
          h.suspense.unmount(b, P);
          return;
        }
        re && At(h, null, g, "beforeUnmount"),
          G & 64
            ? h.type.remove(h, g, b, O, z, P)
            : I && (B !== Xe || (J > 0 && J & 64))
            ? ne(I, g, b, !1, !0)
            : ((B === Xe && J & 384) || (!O && G & 16)) && ne(K, g, b),
          P && ue(h);
      }
      ((ae && (pe = U && U.onVnodeUnmounted)) || re) &&
        qe(() => {
          pe && ze(pe, g, h), re && At(h, null, g, "unmounted");
        }, b);
    },
    ue = (h) => {
      const { type: g, el: b, anchor: P, transition: O } = h;
      if (g === Xe) {
        Re(b, P);
        return;
      }
      if (g === Jo) {
        w(h);
        return;
      }
      const B = () => {
        r(b), O && !O.persisted && O.afterLeave && O.afterLeave();
      };
      if (h.shapeFlag & 1 && O && !O.persisted) {
        const { leave: U, delayLeave: D } = O,
          K = () => U(b, B);
        D ? D(h.el, B, K) : K();
      } else B();
    },
    Re = (h, g) => {
      let b;
      for (; h !== g; ) (b = f(h)), r(h), (h = b);
      r(g);
    },
    oe = (h, g, b) => {
      const { bum: P, scope: O, update: B, subTree: U, um: D } = h;
      P && qn(P),
        O.stop(),
        B && ((B.active = !1), L(U, h, g, b)),
        D && qe(D, g),
        qe(() => {
          h.isUnmounted = !0;
        }, g),
        g &&
          g.pendingBranch &&
          !g.isUnmounted &&
          h.asyncDep &&
          !h.asyncResolved &&
          h.suspenseId === g.pendingId &&
          (g.deps--, g.deps === 0 && g.resolve());
    },
    ne = (h, g, b, P = !1, O = !1, B = 0) => {
      for (let U = B; U < h.length; U++) L(h[U], g, b, P, O);
    },
    S = (h) =>
      h.shapeFlag & 6
        ? S(h.component.subTree)
        : h.shapeFlag & 128
        ? h.suspense.next()
        : f(h.anchor || h.el),
    Q = (h, g, b) => {
      h == null
        ? g._vnode && L(g._vnode, null, null, !0)
        : T(g._vnode || null, h, g, null, null, null, b),
        Pi(),
        kl(),
        (g._vnode = h);
    },
    z = { p: T, um: L, m: fe, r: ue, mt: k, mc: N, pc: W, pbc: x, n: S, o: e };
  let X, de;
  return t && ([X, de] = t(z)), { render: Q, hydrate: X, createApp: Mc(Q, X) };
}
function Mt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function ai(e, t, n = !1) {
  const o = e.children,
    r = t.children;
  if (te(o) && te(r))
    for (let i = 0; i < o.length; i++) {
      const s = o[i];
      let l = r[i];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[i] = xt(r[i])), (l.el = s.el)),
        n || ai(s, l)),
        l.type === No && (l.el = s.el);
    }
}
function jc(e) {
  const t = e.slice(),
    n = [0];
  let o, r, i, s, l;
  const a = e.length;
  for (o = 0; o < a; o++) {
    const c = e[o];
    if (c !== 0) {
      if (((r = n[n.length - 1]), e[r] < c)) {
        (t[o] = r), n.push(o);
        continue;
      }
      for (i = 0, s = n.length - 1; i < s; )
        (l = (i + s) >> 1), e[n[l]] < c ? (i = l + 1) : (s = l);
      c < e[n[i]] && (i > 0 && (t[o] = n[i - 1]), (n[i] = o));
    }
  }
  for (i = n.length, s = n[i - 1]; i-- > 0; ) (n[i] = s), (s = t[s]);
  return n;
}
const Vc = (e) => e.__isTeleport,
  On = (e) => e && (e.disabled || e.disabled === ""),
  ji = (e) => typeof SVGElement != "undefined" && e instanceof SVGElement,
  Sr = (e, t) => {
    const n = e && e.to;
    return xe(n) ? (t ? t(n) : null) : n;
  },
  Dc = {
    __isTeleport: !0,
    process(e, t, n, o, r, i, s, l, a, c) {
      const {
          mc: u,
          pc: d,
          pbc: f,
          o: { insert: p, querySelector: y, createText: T, createComment: q },
        } = c,
        M = On(t.props);
      let { shapeFlag: m, children: _, dynamicChildren: w } = t;
      if (e == null) {
        const F = (t.el = T("")),
          j = (t.anchor = T(""));
        p(F, n, o), p(j, n, o);
        const V = (t.target = Sr(t.props, y)),
          N = (t.targetAnchor = T(""));
        V && (p(N, V), (s = s || ji(V)));
        const C = (x, $) => {
          m & 16 && u(_, x, $, r, i, s, l, a);
        };
        M ? C(n, j) : V && C(V, N);
      } else {
        t.el = e.el;
        const F = (t.anchor = e.anchor),
          j = (t.target = e.target),
          V = (t.targetAnchor = e.targetAnchor),
          N = On(e.props),
          C = N ? n : j,
          x = N ? F : V;
        if (
          ((s = s || ji(j)),
          w
            ? (f(e.dynamicChildren, w, C, r, i, s, l), ai(e, t, !0))
            : a || d(e, t, C, x, r, i, s, l, !1),
          M)
        )
          N || oo(t, n, F, c, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const $ = (t.target = Sr(t.props, y));
          $ && oo(t, $, null, c, 0);
        } else N && oo(t, j, V, c, 1);
      }
      Ul(t);
    },
    remove(e, t, n, o, { um: r, o: { remove: i } }, s) {
      const {
        shapeFlag: l,
        children: a,
        anchor: c,
        targetAnchor: u,
        target: d,
        props: f,
      } = e;
      if ((d && i(u), (s || !On(f)) && (i(c), l & 16)))
        for (let p = 0; p < a.length; p++) {
          const y = a[p];
          r(y, t, n, !0, !!y.dynamicChildren);
        }
    },
    move: oo,
    hydrate: Hc,
  };
function oo(e, t, n, { o: { insert: o }, m: r }, i = 2) {
  i === 0 && o(e.targetAnchor, t, n);
  const { el: s, anchor: l, shapeFlag: a, children: c, props: u } = e,
    d = i === 2;
  if ((d && o(s, t, n), (!d || On(u)) && a & 16))
    for (let f = 0; f < c.length; f++) r(c[f], t, n, 2);
  d && o(l, t, n);
}
function Hc(
  e,
  t,
  n,
  o,
  r,
  i,
  { o: { nextSibling: s, parentNode: l, querySelector: a } },
  c
) {
  const u = (t.target = Sr(t.props, a));
  if (u) {
    const d = u._lpa || u.firstChild;
    if (t.shapeFlag & 16)
      if (On(t.props))
        (t.anchor = c(s(e), t, l(e), n, o, r, i)), (t.targetAnchor = d);
      else {
        t.anchor = s(e);
        let f = d;
        for (; f; )
          if (
            ((f = s(f)), f && f.nodeType === 8 && f.data === "teleport anchor")
          ) {
            (t.targetAnchor = f),
              (u._lpa = t.targetAnchor && s(t.targetAnchor));
            break;
          }
        c(d, t, u, n, o, r, i);
      }
    Ul(t);
  }
  return t.anchor && s(t.anchor);
}
const zc = Dc;
function Ul(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
        (n = n.nextSibling);
    t.ut();
  }
}
const Xe = Symbol.for("v-fgt"),
  No = Symbol.for("v-txt"),
  ot = Symbol.for("v-cmt"),
  Jo = Symbol.for("v-stc"),
  $n = [];
let et = null;
function Wl(e = !1) {
  $n.push((et = e ? null : []));
}
function Kc() {
  $n.pop(), (et = $n[$n.length - 1] || null);
}
let Dn = 1;
function Vi(e) {
  Dn += e;
}
function Ql(e) {
  return (
    (e.dynamicChildren = Dn > 0 ? et || nn : null),
    Kc(),
    Dn > 0 && et && et.push(e),
    e
  );
}
function Cm(e, t, n, o, r, i) {
  return Ql(Jl(e, t, n, o, r, i, !0));
}
function Yl(e, t, n, o, r) {
  return Ql(Fe(e, t, n, o, r, !0));
}
function Co(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function kt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const jo = "__vInternal",
  Zl = ({ key: e }) => (e != null ? e : null),
  ho = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? xe(e) || Oe(e) || le(e)
        ? { i: Ve, r: e, k: t, f: !!n }
        : e
      : null
  );
function Jl(
  e,
  t = null,
  n = null,
  o = 0,
  r = null,
  i = e === Xe ? 0 : 1,
  s = !1,
  l = !1
) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Zl(t),
    ref: t && ho(t),
    scopeId: Rl,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: o,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Ve,
  };
  return (
    l
      ? (ui(a, n), i & 128 && e.normalize(a))
      : n && (a.shapeFlag |= xe(n) ? 8 : 16),
    Dn > 0 &&
      !s &&
      et &&
      (a.patchFlag > 0 || i & 6) &&
      a.patchFlag !== 32 &&
      et.push(a),
    a
  );
}
const Fe = Uc;
function Uc(e, t = null, n = null, o = 0, r = null, i = !1) {
  if (((!e || e === Cc) && (e = ot), Co(e))) {
    const l = mt(e, t, !0);
    return (
      n && ui(l, n),
      Dn > 0 &&
        !i &&
        et &&
        (l.shapeFlag & 6 ? (et[et.indexOf(e)] = l) : et.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((of(e) && (e = e.__vccOpts), t)) {
    t = Wc(t);
    let { class: l, style: a } = t;
    l && !xe(l) && (t.class = Wr(l)),
      ye(a) && (vl(a) && !te(a) && (a = Ce({}, a)), (t.style = Ur(a)));
  }
  const s = xe(e) ? 1 : Pl(e) ? 128 : Vc(e) ? 64 : ye(e) ? 4 : le(e) ? 2 : 0;
  return Jl(e, t, n, o, r, s, i, !0);
}
function Wc(e) {
  return e ? (vl(e) || jo in e ? Ce({}, e) : e) : null;
}
function mt(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: i, children: s } = e,
    l = t ? Yc(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Zl(l),
    ref:
      t && t.ref
        ? n && r
          ? te(r)
            ? r.concat(ho(t))
            : [r, ho(t)]
          : ho(t)
        : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: s,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Xe ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && mt(e.ssContent),
    ssFallback: e.ssFallback && mt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function Qc(e = " ", t = 0) {
  return Fe(No, null, e, t);
}
function km(e = "", t = !1) {
  return t ? (Wl(), Yl(ot, null, e)) : Fe(ot, null, e);
}
function st(e) {
  return e == null || typeof e == "boolean"
    ? Fe(ot)
    : te(e)
    ? Fe(Xe, null, e.slice())
    : typeof e == "object"
    ? xt(e)
    : Fe(No, null, String(e));
}
function xt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : mt(e);
}
function ui(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null) t = null;
  else if (te(t)) n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), ui(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(jo in t)
        ? (t._ctx = Ve)
        : r === 3 &&
          Ve &&
          (Ve.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    le(t)
      ? ((t = { default: t, _ctx: Ve }), (n = 32))
      : ((t = String(t)), o & 64 ? ((n = 16), (t = [Qc(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Yc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const r in o)
      if (r === "class")
        t.class !== o.class && (t.class = Wr([t.class, o.class]));
      else if (r === "style") t.style = Ur([t.style, o.style]);
      else if (To(r)) {
        const i = t[r],
          s = o[r];
        s &&
          i !== s &&
          !(te(i) && i.includes(s)) &&
          (t[r] = i ? [].concat(i, s) : s);
      } else r !== "" && (t[r] = o[r]);
  }
  return t;
}
function ze(e, t, n, o = null) {
  Ue(e, t, 7, [n, o]);
}
const Zc = jl();
let Jc = 0;
function Xc(e, t, n) {
  const o = e.type,
    r = (t ? t.appContext : e.appContext) || Zc,
    i = {
      uid: Jc++,
      vnode: e,
      type: o,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new _u(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Dl(o, r),
      emitsOptions: Sl(o, r),
      emit: null,
      emitted: null,
      propsDefaults: ve,
      inheritAttrs: o.inheritAttrs,
      ctx: ve,
      data: ve,
      props: ve,
      attrs: ve,
      slots: ve,
      refs: ve,
      setupState: ve,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = ic.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let Pe = null;
const ke = () => Pe || Ve;
let ci,
  Zt,
  Di = "__VUE_INSTANCE_SETTERS__";
(Zt = mr()[Di]) || (Zt = mr()[Di] = []),
  Zt.push((e) => (Pe = e)),
  (ci = (e) => {
    Zt.length > 1 ? Zt.forEach((t) => t(e)) : Zt[0](e);
  });
const un = (e) => {
    ci(e), e.scope.on();
  },
  Dt = () => {
    Pe && Pe.scope.off(), ci(null);
  };
function Xl(e) {
  return e.vnode.shapeFlag & 4;
}
let Hn = !1;
function Gc(e, t = !1) {
  Hn = t;
  const { props: n, children: o } = e.vnode,
    r = Xl(e);
  Oc(e, n, r, t), Bc(e, o);
  const i = r ? ef(e, t) : void 0;
  return (Hn = !1), i;
}
function ef(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = vn(new Proxy(e.ctx, Ec)));
  const { setup: o } = n;
  if (o) {
    const r = (e.setupContext = o.length > 1 ? nf(e) : null);
    un(e), gn();
    const i = Rt(o, e, 0, [e.props, r]);
    if ((mn(), Dt(), el(i))) {
      if ((i.then(Dt, Dt), t))
        return i
          .then((s) => {
            Hi(e, s, t);
          })
          .catch((s) => {
            Oo(s, e, 0);
          });
      e.asyncDep = i;
    } else Hi(e, i, t);
  } else Gl(e, t);
}
function Hi(e, t, n) {
  le(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ye(t) && (e.setupState = wl(t)),
    Gl(e, n);
}
let zi;
function Gl(e, t, n) {
  const o = e.type;
  if (!e.render) {
    if (!t && zi && !o.render) {
      const r = o.template || si(e).template;
      if (r) {
        const { isCustomElement: i, compilerOptions: s } = e.appContext.config,
          { delimiters: l, compilerOptions: a } = o,
          c = Ce(Ce({ isCustomElement: i, delimiters: l }, s), a);
        o.render = zi(r, c);
      }
    }
    e.render = o.render || nt;
  }
  un(e), gn(), Sc(e), mn(), Dt();
}
function tf(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return Ie(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function nf(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return tf(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Vo(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(wl(vn(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Mn) return Mn[n](e);
        },
        has(t, n) {
          return n in t || n in Mn;
        },
      }))
    );
}
function Rr(e, t = !0) {
  return le(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function of(e) {
  return le(e) && "__vccOpts" in e;
}
const R = (e, t) => Gu(e, t, Hn);
function E(e, t, n) {
  const o = arguments.length;
  return o === 2
    ? ye(t) && !te(t)
      ? Co(t)
        ? Fe(e, null, [t])
        : Fe(e, t)
      : Fe(e, null, t)
    : (o > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : o === 3 && Co(n) && (n = [n]),
      Fe(e, t, n));
}
const rf = Symbol.for("v-scx"),
  sf = () => ut(rf),
  lf = "3.3.4",
  af = "http://www.w3.org/2000/svg",
  Bt = typeof document != "undefined" ? document : null,
  Ki = Bt && Bt.createElement("template"),
  uf = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, o) => {
      const r = t
        ? Bt.createElementNS(af, e)
        : Bt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          o &&
          o.multiple != null &&
          r.setAttribute("multiple", o.multiple),
        r
      );
    },
    createText: (e) => Bt.createTextNode(e),
    createComment: (e) => Bt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Bt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, o, r, i) {
      const s = n ? n.previousSibling : t.lastChild;
      if (r && (r === i || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === i || !(r = r.nextSibling));

        );
      else {
        Ki.innerHTML = o ? `<svg>${e}</svg>` : e;
        const l = Ki.content;
        if (o) {
          const a = l.firstChild;
          for (; a.firstChild; ) l.appendChild(a.firstChild);
          l.removeChild(a);
        }
        t.insertBefore(l, n);
      }
      return [
        s ? s.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function cf(e, t, n) {
  const o = e._vtc;
  o && (t = (t ? [t, ...o] : [...o]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function ff(e, t, n) {
  const o = e.style,
    r = xe(n);
  if (n && !r) {
    if (t && !xe(t)) for (const i in t) n[i] == null && Pr(o, i, "");
    for (const i in n) Pr(o, i, n[i]);
  } else {
    const i = o.display;
    r ? t !== n && (o.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (o.display = i);
  }
}
const Ui = /\s*!important$/;
function Pr(e, t, n) {
  if (te(n)) n.forEach((o) => Pr(e, t, o));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const o = df(e, t);
    Ui.test(n)
      ? e.setProperty(Kt(o), n.replace(Ui, ""), "important")
      : (e[o] = n);
  }
}
const Wi = ["Webkit", "Moz", "ms"],
  Xo = {};
function df(e, t) {
  const n = Xo[t];
  if (n) return n;
  let o = ct(t);
  if (o !== "filter" && o in e) return (Xo[t] = o);
  o = Ao(o);
  for (let r = 0; r < Wi.length; r++) {
    const i = Wi[r] + o;
    if (i in e) return (Xo[t] = i);
  }
  return t;
}
const Qi = "http://www.w3.org/1999/xlink";
function hf(e, t, n, o, r) {
  if (o && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Qi, t.slice(6, t.length))
      : e.setAttributeNS(Qi, t, n);
  else {
    const i = yu(t);
    n == null || (i && !ol(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? "" : n);
  }
}
function gf(e, t, n, o, r, i, s) {
  if (t === "innerHTML" || t === "textContent") {
    o && s(o, r, i), (e[t] = n == null ? "" : n);
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n;
    const c = l === "OPTION" ? e.getAttribute("value") : e.value,
      u = n == null ? "" : n;
    c !== u && (e.value = u), n == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean"
      ? (n = ol(n))
      : n == null && c === "string"
      ? ((n = ""), (a = !0))
      : c === "number" && ((n = 0), (a = !0));
  }
  try {
    e[t] = n;
  } catch {}
  a && e.removeAttribute(t);
}
function mf(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function pf(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
function vf(e, t, n, o, r = null) {
  const i = e._vei || (e._vei = {}),
    s = i[t];
  if (o && s) s.value = o;
  else {
    const [l, a] = bf(t);
    if (o) {
      const c = (i[t] = wf(o, r));
      mf(e, l, c, a);
    } else s && (pf(e, l, s, a), (i[t] = void 0));
  }
}
const Yi = /(?:Once|Passive|Capture)$/;
function bf(e) {
  let t;
  if (Yi.test(e)) {
    t = {};
    let o;
    for (; (o = e.match(Yi)); )
      (e = e.slice(0, e.length - o[0].length)), (t[o[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : Kt(e.slice(2)), t];
}
let Go = 0;
const yf = Promise.resolve(),
  _f = () => Go || (yf.then(() => (Go = 0)), (Go = Date.now()));
function wf(e, t) {
  const n = (o) => {
    if (!o._vts) o._vts = Date.now();
    else if (o._vts <= n.attached) return;
    Ue(xf(o, n.value), t, 5, [o]);
  };
  return (n.value = e), (n.attached = _f()), n;
}
function xf(e, t) {
  if (te(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((o) => (r) => !r._stopped && o && o(r))
    );
  } else return t;
}
const Zi = /^on[a-z]/,
  Cf = (e, t, n, o, r = !1, i, s, l, a) => {
    t === "class"
      ? cf(e, o, r)
      : t === "style"
      ? ff(e, n, o)
      : To(t)
      ? Dr(t) || vf(e, t, n, o, s)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : kf(e, t, o, r)
        )
      ? gf(e, t, o, i, s, l, a)
      : (t === "true-value"
          ? (e._trueValue = o)
          : t === "false-value" && (e._falseValue = o),
        hf(e, t, o, r));
  };
function kf(e, t, n, o) {
  return o
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Zi.test(t) && le(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Zi.test(t) && xe(n))
    ? !1
    : t in e;
}
const yt = "transition",
  _n = "animation",
  cn = (e, { slots: t }) => E(gc, ta(e), t);
cn.displayName = "Transition";
const ea = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  Ef = (cn.props = Ce({}, Ol, ea)),
  Ot = (e, t = []) => {
    te(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  Ji = (e) => (e ? (te(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function ta(e) {
  const t = {};
  for (const v in e) v in ea || (t[v] = e[v]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: o,
      duration: r,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: s = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: a = i,
      appearActiveClass: c = s,
      appearToClass: u = l,
      leaveFromClass: d = `${n}-leave-from`,
      leaveActiveClass: f = `${n}-leave-active`,
      leaveToClass: p = `${n}-leave-to`,
    } = e,
    y = Sf(r),
    T = y && y[0],
    q = y && y[1],
    {
      onBeforeEnter: M,
      onEnter: m,
      onEnterCancelled: _,
      onLeave: w,
      onLeaveCancelled: F,
      onBeforeAppear: j = M,
      onAppear: V = m,
      onAppearCancelled: N = _,
    } = t,
    C = (v, H, k) => {
      wt(v, H ? u : l), wt(v, H ? c : s), k && k();
    },
    x = (v, H) => {
      (v._isLeaving = !1), wt(v, d), wt(v, p), wt(v, f), H && H();
    },
    $ = (v) => (H, k) => {
      const Z = v ? V : m,
        Y = () => C(H, v, k);
      Ot(Z, [H, Y]),
        Xi(() => {
          wt(H, v ? a : i), dt(H, v ? u : l), Ji(Z) || Gi(H, o, T, Y);
        });
    };
  return Ce(t, {
    onBeforeEnter(v) {
      Ot(M, [v]), dt(v, i), dt(v, s);
    },
    onBeforeAppear(v) {
      Ot(j, [v]), dt(v, a), dt(v, c);
    },
    onEnter: $(!1),
    onAppear: $(!0),
    onLeave(v, H) {
      v._isLeaving = !0;
      const k = () => x(v, H);
      dt(v, d),
        oa(),
        dt(v, f),
        Xi(() => {
          !v._isLeaving || (wt(v, d), dt(v, p), Ji(w) || Gi(v, o, q, k));
        }),
        Ot(w, [v, k]);
    },
    onEnterCancelled(v) {
      C(v, !1), Ot(_, [v]);
    },
    onAppearCancelled(v) {
      C(v, !0), Ot(N, [v]);
    },
    onLeaveCancelled(v) {
      x(v), Ot(F, [v]);
    },
  });
}
function Sf(e) {
  if (e == null) return null;
  if (ye(e)) return [er(e.enter), er(e.leave)];
  {
    const t = er(e);
    return [t, t];
  }
}
function er(e) {
  return hu(e);
}
function dt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function wt(e, t) {
  t.split(/\s+/).forEach((o) => o && e.classList.remove(o));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Xi(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Rf = 0;
function Gi(e, t, n, o) {
  const r = (e._endId = ++Rf),
    i = () => {
      r === e._endId && o();
    };
  if (n) return setTimeout(i, n);
  const { type: s, timeout: l, propCount: a } = na(e, t);
  if (!s) return o();
  const c = s + "end";
  let u = 0;
  const d = () => {
      e.removeEventListener(c, f), i();
    },
    f = (p) => {
      p.target === e && ++u >= a && d();
    };
  setTimeout(() => {
    u < a && d();
  }, l + 1),
    e.addEventListener(c, f);
}
function na(e, t) {
  const n = window.getComputedStyle(e),
    o = (y) => (n[y] || "").split(", "),
    r = o(`${yt}Delay`),
    i = o(`${yt}Duration`),
    s = es(r, i),
    l = o(`${_n}Delay`),
    a = o(`${_n}Duration`),
    c = es(l, a);
  let u = null,
    d = 0,
    f = 0;
  t === yt
    ? s > 0 && ((u = yt), (d = s), (f = i.length))
    : t === _n
    ? c > 0 && ((u = _n), (d = c), (f = a.length))
    : ((d = Math.max(s, c)),
      (u = d > 0 ? (s > c ? yt : _n) : null),
      (f = u ? (u === yt ? i.length : a.length) : 0));
  const p =
    u === yt && /\b(transform|all)(,|$)/.test(o(`${yt}Property`).toString());
  return { type: u, timeout: d, propCount: f, hasTransform: p };
}
function es(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, o) => ts(n) + ts(e[o])));
}
function ts(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function oa() {
  return document.body.offsetHeight;
}
const ra = new WeakMap(),
  ia = new WeakMap(),
  sa = {
    name: "TransitionGroup",
    props: Ce({}, Ef, { tag: String, moveClass: String }),
    setup(e, { slots: t }) {
      const n = ke(),
        o = Ml();
      let r, i;
      return (
        ri(() => {
          if (!r.length) return;
          const s = e.moveClass || `${e.name || "v"}-move`;
          if (!Of(r[0].el, n.vnode.el, s)) return;
          r.forEach(qf), r.forEach(Af);
          const l = r.filter(Mf);
          oa(),
            l.forEach((a) => {
              const c = a.el,
                u = c.style;
              dt(c, s),
                (u.transform = u.webkitTransform = u.transitionDuration = "");
              const d = (c._moveCb = (f) => {
                (f && f.target !== c) ||
                  ((!f || /transform$/.test(f.propertyName)) &&
                    (c.removeEventListener("transitionend", d),
                    (c._moveCb = null),
                    wt(c, s)));
              });
              c.addEventListener("transitionend", d);
            });
        }),
        () => {
          const s = ie(e),
            l = ta(s);
          let a = s.tag || Xe;
          (r = i), (i = t.default ? oi(t.default()) : []);
          for (let c = 0; c < i.length; c++) {
            const u = i[c];
            u.key != null && an(u, Vn(u, l, o, n));
          }
          if (r)
            for (let c = 0; c < r.length; c++) {
              const u = r[c];
              an(u, Vn(u, l, o, n)), ra.set(u, u.el.getBoundingClientRect());
            }
          return Fe(a, null, i);
        }
      );
    },
  },
  Pf = (e) => delete e.mode;
sa.props;
const Tf = sa;
function qf(e) {
  const t = e.el;
  t._moveCb && t._moveCb(), t._enterCb && t._enterCb();
}
function Af(e) {
  ia.set(e, e.el.getBoundingClientRect());
}
function Mf(e) {
  const t = ra.get(e),
    n = ia.get(e),
    o = t.left - n.left,
    r = t.top - n.top;
  if (o || r) {
    const i = e.el.style;
    return (
      (i.transform = i.webkitTransform = `translate(${o}px,${r}px)`),
      (i.transitionDuration = "0s"),
      e
    );
  }
}
function Of(e, t, n) {
  const o = e.cloneNode();
  e._vtc &&
    e._vtc.forEach((s) => {
      s.split(/\s+/).forEach((l) => l && o.classList.remove(l));
    }),
    n.split(/\s+/).forEach((s) => s && o.classList.add(s)),
    (o.style.display = "none");
  const r = t.nodeType === 1 ? t : t.parentNode;
  r.appendChild(o);
  const { hasTransform: i } = na(o);
  return r.removeChild(o), i;
}
const $f = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  Em = (e, t) => (n) => {
    if (!("key" in n)) return;
    const o = Kt(n.key);
    if (t.some((r) => r === o || $f[r] === o)) return e(n);
  },
  Sm = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e._vod = e.style.display === "none" ? "" : e.style.display),
        n && t ? n.beforeEnter(e) : wn(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: o }) {
      !t != !n &&
        (o
          ? t
            ? (o.beforeEnter(e), wn(e, !0), o.enter(e))
            : o.leave(e, () => {
                wn(e, !1);
              })
          : wn(e, t));
    },
    beforeUnmount(e, { value: t }) {
      wn(e, t);
    },
  };
function wn(e, t) {
  e.style.display = t ? e._vod : "none";
}
const Lf = Ce({ patchProp: Cf }, uf);
let ns;
function Bf() {
  return ns || (ns = Ic(Lf));
}
const la = (...e) => {
  const t = Bf().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (o) => {
      const r = Ff(o);
      if (!r) return;
      const i = t._component;
      !le(i) && !i.render && !i.template && (i.template = r.innerHTML),
        (r.innerHTML = "");
      const s = n(r, !1, r instanceof SVGElement);
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        s
      );
    }),
    t
  );
};
function Ff(e) {
  return xe(e) ? document.querySelector(e) : e;
}
function bn(e, t, n, o) {
  return Object.defineProperty(e, t, { get: n, set: o, enumerable: !0 }), e;
}
const qt = he(!1);
let Do;
function If(e, t) {
  const n =
    /(edg|edge|edga|edgios)\/([\w.]+)/.exec(e) ||
    /(opr)[\/]([\w.]+)/.exec(e) ||
    /(vivaldi)[\/]([\w.]+)/.exec(e) ||
    /(chrome|crios)[\/]([\w.]+)/.exec(e) ||
    /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) ||
    /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(
      e
    ) ||
    /(firefox|fxios)[\/]([\w.]+)/.exec(e) ||
    /(webkit)[\/]([\w.]+)/.exec(e) ||
    /(opera)(?:.*version|)[\/]([\w.]+)/.exec(e) ||
    [];
  return {
    browser: n[5] || n[3] || n[1] || "",
    version: n[2] || n[4] || "0",
    versionNumber: n[4] || n[2] || "0",
    platform: t[0] || "",
  };
}
function Nf(e) {
  return (
    /(ipad)/.exec(e) ||
    /(ipod)/.exec(e) ||
    /(windows phone)/.exec(e) ||
    /(iphone)/.exec(e) ||
    /(kindle)/.exec(e) ||
    /(silk)/.exec(e) ||
    /(android)/.exec(e) ||
    /(win)/.exec(e) ||
    /(mac)/.exec(e) ||
    /(linux)/.exec(e) ||
    /(cros)/.exec(e) ||
    /(playbook)/.exec(e) ||
    /(bb)/.exec(e) ||
    /(blackberry)/.exec(e) ||
    []
  );
}
const aa = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
function jf(e) {
  (Do = { is: { ...e } }), delete e.mac, delete e.desktop;
  const t =
    Math.min(window.innerHeight, window.innerWidth) > 414 ? "ipad" : "iphone";
  Object.assign(e, { mobile: !0, ios: !0, platform: t, [t]: !0 });
}
function Vf(e) {
  const t = e.toLowerCase(),
    n = Nf(t),
    o = If(t, n),
    r = {};
  o.browser &&
    ((r[o.browser] = !0),
    (r.version = o.version),
    (r.versionNumber = parseInt(o.versionNumber, 10))),
    o.platform && (r[o.platform] = !0);
  const i =
    r.android ||
    r.ios ||
    r.bb ||
    r.blackberry ||
    r.ipad ||
    r.iphone ||
    r.ipod ||
    r.kindle ||
    r.playbook ||
    r.silk ||
    r["windows phone"];
  return (
    i === !0 || t.indexOf("mobile") > -1
      ? ((r.mobile = !0),
        r.edga || r.edgios
          ? ((r.edge = !0), (o.browser = "edge"))
          : r.crios
          ? ((r.chrome = !0), (o.browser = "chrome"))
          : r.fxios && ((r.firefox = !0), (o.browser = "firefox")))
      : (r.desktop = !0),
    (r.ipod || r.ipad || r.iphone) && (r.ios = !0),
    r["windows phone"] && ((r.winphone = !0), delete r["windows phone"]),
    (r.chrome ||
      r.opr ||
      r.safari ||
      r.vivaldi ||
      (r.mobile === !0 && r.ios !== !0 && i !== !0)) &&
      (r.webkit = !0),
    r.edg && ((o.browser = "edgechromium"), (r.edgeChromium = !0)),
    ((r.safari && r.blackberry) || r.bb) &&
      ((o.browser = "blackberry"), (r.blackberry = !0)),
    r.safari && r.playbook && ((o.browser = "playbook"), (r.playbook = !0)),
    r.opr && ((o.browser = "opera"), (r.opera = !0)),
    r.safari && r.android && ((o.browser = "android"), (r.android = !0)),
    r.safari && r.kindle && ((o.browser = "kindle"), (r.kindle = !0)),
    r.safari && r.silk && ((o.browser = "silk"), (r.silk = !0)),
    r.vivaldi && ((o.browser = "vivaldi"), (r.vivaldi = !0)),
    (r.name = o.browser),
    (r.platform = o.platform),
    t.indexOf("electron") > -1
      ? (r.electron = !0)
      : document.location.href.indexOf("-extension://") > -1
      ? (r.bex = !0)
      : (window.Capacitor !== void 0
          ? ((r.capacitor = !0),
            (r.nativeMobile = !0),
            (r.nativeMobileWrapper = "capacitor"))
          : (window._cordovaNative !== void 0 || window.cordova !== void 0) &&
            ((r.cordova = !0),
            (r.nativeMobile = !0),
            (r.nativeMobileWrapper = "cordova")),
        aa === !0 &&
          r.mac === !0 &&
          ((r.desktop === !0 && r.safari === !0) ||
            (r.nativeMobile === !0 &&
              r.android !== !0 &&
              r.ios !== !0 &&
              r.ipad !== !0)) &&
          jf(r)),
    r
  );
}
const os = navigator.userAgent || navigator.vendor || window.opera,
  Df = { has: { touch: !1, webStorage: !1 }, within: { iframe: !1 } },
  we = {
    userAgent: os,
    is: Vf(os),
    has: { touch: aa },
    within: { iframe: window.self !== window.top },
  },
  Tr = {
    install(e) {
      const { $q: t } = e;
      qt.value === !0
        ? (e.onSSRHydrated.push(() => {
            Object.assign(t.platform, we), (qt.value = !1), (Do = void 0);
          }),
          (t.platform = pn(this)))
        : (t.platform = this);
    },
  };
{
  let e;
  bn(we.has, "webStorage", () => {
    if (e !== void 0) return e;
    try {
      if (window.localStorage) return (e = !0), !0;
    } catch {}
    return (e = !1), !1;
  }),
    we.is.ios === !0 && window.navigator.vendor.toLowerCase().indexOf("apple"),
    qt.value === !0 ? Object.assign(Tr, we, Do, Df) : Object.assign(Tr, we);
}
var Ho = (e, t) => {
  const n = pn(e);
  for (const o in e)
    bn(
      t,
      o,
      () => n[o],
      (r) => {
        n[o] = r;
      }
    );
  return t;
};
const Be = { hasPassive: !1, passiveCapture: !0, notPassiveCapture: !0 };
try {
  const e = Object.defineProperty({}, "passive", {
    get() {
      Object.assign(Be, {
        hasPassive: !0,
        passive: { passive: !0 },
        notPassive: { passive: !1 },
        passiveCapture: { passive: !0, capture: !0 },
        notPassiveCapture: { passive: !1, capture: !0 },
      });
    },
  });
  window.addEventListener("qtest", null, e),
    window.removeEventListener("qtest", null, e);
} catch {}
function Pt() {}
function Rm(e) {
  return e.button === 0;
}
function Hf(e) {
  return (
    e.touches && e.touches[0]
      ? (e = e.touches[0])
      : e.changedTouches && e.changedTouches[0]
      ? (e = e.changedTouches[0])
      : e.targetTouches && e.targetTouches[0] && (e = e.targetTouches[0]),
    { top: e.clientY, left: e.clientX }
  );
}
function zf(e) {
  if (e.path) return e.path;
  if (e.composedPath) return e.composedPath();
  const t = [];
  let n = e.target;
  for (; n; ) {
    if ((t.push(n), n.tagName === "HTML"))
      return t.push(document), t.push(window), t;
    n = n.parentElement;
  }
}
function ko(e) {
  e.stopPropagation();
}
function Et(e) {
  e.cancelable !== !1 && e.preventDefault();
}
function Ke(e) {
  e.cancelable !== !1 && e.preventDefault(), e.stopPropagation();
}
function Pm(e, t) {
  if (e === void 0 || (t === !0 && e.__dragPrevented === !0)) return;
  const n =
    t === !0
      ? (o) => {
          (o.__dragPrevented = !0),
            o.addEventListener("dragstart", Et, Be.notPassiveCapture);
        }
      : (o) => {
          delete o.__dragPrevented,
            o.removeEventListener("dragstart", Et, Be.notPassiveCapture);
        };
  e.querySelectorAll("a, img").forEach(n);
}
function Kf(e, t, n) {
  const o = `__q_${t}_evt`;
  (e[o] = e[o] !== void 0 ? e[o].concat(n) : n),
    n.forEach((r) => {
      r[0].addEventListener(r[1], e[r[2]], Be[r[3]]);
    });
}
function Uf(e, t) {
  const n = `__q_${t}_evt`;
  e[n] !== void 0 &&
    (e[n].forEach((o) => {
      o[0].removeEventListener(o[1], e[o[2]], Be[o[3]]);
    }),
    (e[n] = void 0));
}
function ua(e, t = 250, n) {
  let o = null;
  function r() {
    const i = arguments,
      s = () => {
        (o = null), n !== !0 && e.apply(this, i);
      };
    o !== null ? clearTimeout(o) : n === !0 && e.apply(this, i),
      (o = setTimeout(s, t));
  }
  return (
    (r.cancel = () => {
      o !== null && clearTimeout(o);
    }),
    r
  );
}
const tr = ["sm", "md", "lg", "xl"],
  { passive: rs } = Be;
var Wf = Ho(
  {
    width: 0,
    height: 0,
    name: "xs",
    sizes: { sm: 600, md: 1024, lg: 1440, xl: 1920 },
    lt: { sm: !0, md: !0, lg: !0, xl: !0 },
    gt: { xs: !1, sm: !1, md: !1, lg: !1 },
    xs: !0,
    sm: !1,
    md: !1,
    lg: !1,
    xl: !1,
  },
  {
    setSizes: Pt,
    setDebounce: Pt,
    install({ $q: e, onSSRHydrated: t }) {
      if (((e.screen = this), this.__installed === !0)) {
        e.config.screen !== void 0 &&
          (e.config.screen.bodyClasses === !1
            ? document.body.classList.remove(`screen--${this.name}`)
            : this.__update(!0));
        return;
      }
      const { visualViewport: n } = window,
        o = n || window,
        r = document.scrollingElement || document.documentElement,
        i =
          n === void 0 || we.is.mobile === !0
            ? () => [
                Math.max(window.innerWidth, r.clientWidth),
                Math.max(window.innerHeight, r.clientHeight),
              ]
            : () => [
                n.width * n.scale + window.innerWidth - r.clientWidth,
                n.height * n.scale + window.innerHeight - r.clientHeight,
              ],
        s = e.config.screen !== void 0 && e.config.screen.bodyClasses === !0;
      this.__update = (d) => {
        const [f, p] = i();
        if ((p !== this.height && (this.height = p), f !== this.width))
          this.width = f;
        else if (d !== !0) return;
        let y = this.sizes;
        (this.gt.xs = f >= y.sm),
          (this.gt.sm = f >= y.md),
          (this.gt.md = f >= y.lg),
          (this.gt.lg = f >= y.xl),
          (this.lt.sm = f < y.sm),
          (this.lt.md = f < y.md),
          (this.lt.lg = f < y.lg),
          (this.lt.xl = f < y.xl),
          (this.xs = this.lt.sm),
          (this.sm = this.gt.xs === !0 && this.lt.md === !0),
          (this.md = this.gt.sm === !0 && this.lt.lg === !0),
          (this.lg = this.gt.md === !0 && this.lt.xl === !0),
          (this.xl = this.gt.lg),
          (y =
            (this.xs === !0 && "xs") ||
            (this.sm === !0 && "sm") ||
            (this.md === !0 && "md") ||
            (this.lg === !0 && "lg") ||
            "xl"),
          y !== this.name &&
            (s === !0 &&
              (document.body.classList.remove(`screen--${this.name}`),
              document.body.classList.add(`screen--${y}`)),
            (this.name = y));
      };
      let l,
        a = {},
        c = 16;
      (this.setSizes = (d) => {
        tr.forEach((f) => {
          d[f] !== void 0 && (a[f] = d[f]);
        });
      }),
        (this.setDebounce = (d) => {
          c = d;
        });
      const u = () => {
        const d = getComputedStyle(document.body);
        d.getPropertyValue("--q-size-sm") &&
          tr.forEach((f) => {
            this.sizes[f] = parseInt(d.getPropertyValue(`--q-size-${f}`), 10);
          }),
          (this.setSizes = (f) => {
            tr.forEach((p) => {
              f[p] && (this.sizes[p] = f[p]);
            }),
              this.__update(!0);
          }),
          (this.setDebounce = (f) => {
            l !== void 0 && o.removeEventListener("resize", l, rs),
              (l = f > 0 ? ua(this.__update, f) : this.__update),
              o.addEventListener("resize", l, rs);
          }),
          this.setDebounce(c),
          Object.keys(a).length !== 0
            ? (this.setSizes(a), (a = void 0))
            : this.__update(),
          s === !0 &&
            this.name === "xs" &&
            document.body.classList.add("screen--xs");
      };
      qt.value === !0 ? t.push(u) : u();
    },
  }
);
const Ae = Ho(
    { isActive: !1, mode: !1 },
    {
      __media: void 0,
      set(e) {
        (Ae.mode = e),
          e === "auto"
            ? (Ae.__media === void 0 &&
                ((Ae.__media = window.matchMedia(
                  "(prefers-color-scheme: dark)"
                )),
                (Ae.__updateMedia = () => {
                  Ae.set("auto");
                }),
                Ae.__media.addListener(Ae.__updateMedia)),
              (e = Ae.__media.matches))
            : Ae.__media !== void 0 &&
              (Ae.__media.removeListener(Ae.__updateMedia),
              (Ae.__media = void 0)),
          (Ae.isActive = e === !0),
          document.body.classList.remove(
            `body--${e === !0 ? "light" : "dark"}`
          ),
          document.body.classList.add(`body--${e === !0 ? "dark" : "light"}`);
      },
      toggle() {
        Ae.set(Ae.isActive === !1);
      },
      install({ $q: e, onSSRHydrated: t, ssrContext: n }) {
        const { dark: o } = e.config;
        if (((e.dark = this), this.__installed === !0 && o === void 0)) return;
        this.isActive = o === !0;
        const r = o !== void 0 ? o : !1;
        if (qt.value === !0) {
          const i = (l) => {
              this.__fromSSR = l;
            },
            s = this.set;
          (this.set = i),
            i(r),
            t.push(() => {
              (this.set = s), this.set(this.__fromSSR);
            });
        } else this.set(r);
      },
    }
  ),
  ca = () => !0;
function Qf(e) {
  return typeof e == "string" && e !== "" && e !== "/" && e !== "#/";
}
function Yf(e) {
  return (
    e.startsWith("#") === !0 && (e = e.substring(1)),
    e.startsWith("/") === !1 && (e = "/" + e),
    e.endsWith("/") === !0 && (e = e.substring(0, e.length - 1)),
    "#" + e
  );
}
function Zf(e) {
  if (e.backButtonExit === !1) return () => !1;
  if (e.backButtonExit === "*") return ca;
  const t = ["#/"];
  return (
    Array.isArray(e.backButtonExit) === !0 &&
      t.push(...e.backButtonExit.filter(Qf).map(Yf)),
    () => t.includes(window.location.hash)
  );
}
var qr = {
    __history: [],
    add: Pt,
    remove: Pt,
    install({ $q: e }) {
      if (this.__installed === !0) return;
      const { cordova: t, capacitor: n } = we.is;
      if (t !== !0 && n !== !0) return;
      const o = e.config[t === !0 ? "cordova" : "capacitor"];
      if (
        (o !== void 0 && o.backButton === !1) ||
        (n === !0 &&
          (window.Capacitor === void 0 ||
            window.Capacitor.Plugins.App === void 0))
      )
        return;
      (this.add = (s) => {
        s.condition === void 0 && (s.condition = ca), this.__history.push(s);
      }),
        (this.remove = (s) => {
          const l = this.__history.indexOf(s);
          l >= 0 && this.__history.splice(l, 1);
        });
      const r = Zf(Object.assign({ backButtonExit: !0 }, o)),
        i = () => {
          if (this.__history.length) {
            const s = this.__history[this.__history.length - 1];
            s.condition() === !0 && (this.__history.pop(), s.handler());
          } else r() === !0 ? navigator.app.exitApp() : window.history.back();
        };
      t === !0
        ? document.addEventListener("deviceready", () => {
            document.addEventListener("backbutton", i, !1);
          })
        : window.Capacitor.Plugins.App.addListener("backButton", i);
    },
  },
  is = {
    isoName: "en-US",
    nativeName: "English (US)",
    label: {
      clear: "Clear",
      ok: "OK",
      cancel: "Cancel",
      close: "Close",
      set: "Set",
      select: "Select",
      reset: "Reset",
      remove: "Remove",
      update: "Update",
      create: "Create",
      search: "Search",
      filter: "Filter",
      refresh: "Refresh",
      expand: (e) => (e ? `Expand "${e}"` : "Expand"),
      collapse: (e) => (e ? `Collapse "${e}"` : "Collapse"),
    },
    date: {
      days: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
        "_"
      ),
      daysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      months:
        "January_February_March_April_May_June_July_August_September_October_November_December".split(
          "_"
        ),
      monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      firstDayOfWeek: 0,
      format24h: !1,
      pluralDay: "days",
    },
    table: {
      noData: "No data available",
      noResults: "No matching records found",
      loading: "Loading...",
      selectedRecords: (e) =>
        e === 1
          ? "1 record selected."
          : (e === 0 ? "No" : e) + " records selected.",
      recordsPerPage: "Records per page:",
      allRows: "All",
      pagination: (e, t, n) => e + "-" + t + " of " + n,
      columns: "Columns",
    },
    editor: {
      url: "URL",
      bold: "Bold",
      italic: "Italic",
      strikethrough: "Strikethrough",
      underline: "Underline",
      unorderedList: "Unordered List",
      orderedList: "Ordered List",
      subscript: "Subscript",
      superscript: "Superscript",
      hyperlink: "Hyperlink",
      toggleFullscreen: "Toggle Fullscreen",
      quote: "Quote",
      left: "Left align",
      center: "Center align",
      right: "Right align",
      justify: "Justify align",
      print: "Print",
      outdent: "Decrease indentation",
      indent: "Increase indentation",
      removeFormat: "Remove formatting",
      formatting: "Formatting",
      fontSize: "Font Size",
      align: "Align",
      hr: "Insert Horizontal Rule",
      undo: "Undo",
      redo: "Redo",
      heading1: "Heading 1",
      heading2: "Heading 2",
      heading3: "Heading 3",
      heading4: "Heading 4",
      heading5: "Heading 5",
      heading6: "Heading 6",
      paragraph: "Paragraph",
      code: "Code",
      size1: "Very small",
      size2: "A bit small",
      size3: "Normal",
      size4: "Medium-large",
      size5: "Big",
      size6: "Very big",
      size7: "Maximum",
      defaultFont: "Default Font",
      viewSource: "View Source",
    },
    tree: {
      noNodes: "No nodes available",
      noResults: "No matching nodes found",
    },
  };
function ss() {
  const e =
    Array.isArray(navigator.languages) === !0 &&
    navigator.languages.length !== 0
      ? navigator.languages[0]
      : navigator.language;
  if (typeof e == "string")
    return e
      .split(/[-_]/)
      .map((t, n) =>
        n === 0
          ? t.toLowerCase()
          : n > 1 || t.length < 4
          ? t.toUpperCase()
          : t[0].toUpperCase() + t.slice(1).toLowerCase()
      )
      .join("-");
}
const Ze = Ho(
  { __langPack: {} },
  {
    getLocale: ss,
    set(e = is, t) {
      const n = { ...e, rtl: e.rtl === !0, getLocale: ss };
      {
        if (
          ((n.set = Ze.set),
          Ze.__langConfig === void 0 || Ze.__langConfig.noHtmlAttrs !== !0)
        ) {
          const o = document.documentElement;
          o.setAttribute("dir", n.rtl === !0 ? "rtl" : "ltr"),
            o.setAttribute("lang", n.isoName);
        }
        Object.assign(Ze.__langPack, n),
          (Ze.props = n),
          (Ze.isoName = n.isoName),
          (Ze.nativeName = n.nativeName);
      }
    },
    install({ $q: e, lang: t, ssrContext: n }) {
      (e.lang = Ze.__langPack),
        (Ze.__langConfig = e.config.lang),
        this.__installed === !0
          ? t !== void 0 && this.set(t)
          : this.set(t || is);
    },
  }
);
function Jf(e, t, n = document.body) {
  if (typeof e != "string")
    throw new TypeError("Expected a string as propName");
  if (typeof t != "string") throw new TypeError("Expected a string as value");
  if (!(n instanceof Element)) throw new TypeError("Expected a DOM element");
  n.style.setProperty(`--q-${e}`, t);
}
let fa = !1;
function Xf(e) {
  fa = e.isComposing === !0;
}
function da(e) {
  return (
    fa === !0 || e !== Object(e) || e.isComposing === !0 || e.qKeyEvent === !0
  );
}
function zn(e, t) {
  return da(e) === !0 ? !1 : [].concat(t).includes(e.keyCode);
}
function ha(e) {
  if (e.ios === !0) return "ios";
  if (e.android === !0) return "android";
}
function Gf({ is: e, has: t, within: n }, o) {
  const r = [
    e.desktop === !0 ? "desktop" : "mobile",
    `${t.touch === !1 ? "no-" : ""}touch`,
  ];
  if (e.mobile === !0) {
    const i = ha(e);
    i !== void 0 && r.push("platform-" + i);
  }
  if (e.nativeMobile === !0) {
    const i = e.nativeMobileWrapper;
    r.push(i),
      r.push("native-mobile"),
      e.ios === !0 &&
        (o[i] === void 0 || o[i].iosStatusBarPadding !== !1) &&
        r.push("q-ios-padding");
  } else e.electron === !0 ? r.push("electron") : e.bex === !0 && r.push("bex");
  return n.iframe === !0 && r.push("within-iframe"), r;
}
function ed() {
  const { is: e } = we,
    t = document.body.className,
    n = new Set(t.replace(/ {2}/g, " ").split(" "));
  if (Do !== void 0)
    n.delete("desktop"), n.add("platform-ios"), n.add("mobile");
  else if (e.nativeMobile !== !0 && e.electron !== !0 && e.bex !== !0) {
    if (e.desktop === !0)
      n.delete("mobile"),
        n.delete("platform-ios"),
        n.delete("platform-android"),
        n.add("desktop");
    else if (e.mobile === !0) {
      n.delete("desktop"), n.add("mobile");
      const r = ha(e);
      r !== void 0
        ? (n.add(`platform-${r}`),
          n.delete(`platform-${r === "ios" ? "android" : "ios"}`))
        : (n.delete("platform-ios"), n.delete("platform-android"));
    }
  }
  we.has.touch === !0 && (n.delete("no-touch"), n.add("touch")),
    we.within.iframe === !0 && n.add("within-iframe");
  const o = Array.from(n).join(" ");
  t !== o && (document.body.className = o);
}
function td(e) {
  for (const t in e) Jf(t, e[t]);
}
var nd = {
    install(e) {
      if (this.__installed !== !0) {
        if (qt.value === !0) ed();
        else {
          const { $q: t } = e;
          t.config.brand !== void 0 && td(t.config.brand);
          const n = Gf(we, t.config);
          document.body.classList.add.apply(document.body.classList, n);
        }
        we.is.ios === !0 && document.body.addEventListener("touchstart", Pt),
          window.addEventListener("keydown", Xf, !0);
      }
    },
  },
  od = {
    name: "material-icons",
    type: {
      positive: "check_circle",
      negative: "warning",
      info: "info",
      warning: "priority_high",
    },
    arrow: {
      up: "arrow_upward",
      right: "arrow_forward",
      down: "arrow_downward",
      left: "arrow_back",
      dropdown: "arrow_drop_down",
    },
    chevron: { left: "chevron_left", right: "chevron_right" },
    colorPicker: { spectrum: "gradient", tune: "tune", palette: "style" },
    pullToRefresh: { icon: "refresh" },
    carousel: {
      left: "chevron_left",
      right: "chevron_right",
      up: "keyboard_arrow_up",
      down: "keyboard_arrow_down",
      navigationIcon: "lens",
    },
    chip: { remove: "cancel", selected: "check" },
    datetime: {
      arrowLeft: "chevron_left",
      arrowRight: "chevron_right",
      now: "access_time",
      today: "today",
    },
    editor: {
      bold: "format_bold",
      italic: "format_italic",
      strikethrough: "strikethrough_s",
      underline: "format_underlined",
      unorderedList: "format_list_bulleted",
      orderedList: "format_list_numbered",
      subscript: "vertical_align_bottom",
      superscript: "vertical_align_top",
      hyperlink: "link",
      toggleFullscreen: "fullscreen",
      quote: "format_quote",
      left: "format_align_left",
      center: "format_align_center",
      right: "format_align_right",
      justify: "format_align_justify",
      print: "print",
      outdent: "format_indent_decrease",
      indent: "format_indent_increase",
      removeFormat: "format_clear",
      formatting: "text_format",
      fontSize: "format_size",
      align: "format_align_left",
      hr: "remove",
      undo: "undo",
      redo: "redo",
      heading: "format_size",
      code: "code",
      size: "format_size",
      font: "font_download",
      viewSource: "code",
    },
    expansionItem: {
      icon: "keyboard_arrow_down",
      denseIcon: "arrow_drop_down",
    },
    fab: { icon: "add", activeIcon: "close" },
    field: { clear: "cancel", error: "error" },
    pagination: {
      first: "first_page",
      prev: "keyboard_arrow_left",
      next: "keyboard_arrow_right",
      last: "last_page",
    },
    rating: { icon: "grade" },
    stepper: { done: "check", active: "edit", error: "warning" },
    tabs: {
      left: "chevron_left",
      right: "chevron_right",
      up: "keyboard_arrow_up",
      down: "keyboard_arrow_down",
    },
    table: {
      arrowUp: "arrow_upward",
      warning: "warning",
      firstPage: "first_page",
      prevPage: "chevron_left",
      nextPage: "chevron_right",
      lastPage: "last_page",
    },
    tree: { icon: "play_arrow" },
    uploader: {
      done: "done",
      clear: "clear",
      add: "add_box",
      upload: "cloud_upload",
      removeQueue: "clear_all",
      removeUploaded: "done_all",
    },
  };
const Eo = Ho(
    { iconMapFn: null, __icons: {} },
    {
      set(e, t) {
        const n = { ...e, rtl: e.rtl === !0 };
        (n.set = Eo.set), Object.assign(Eo.__icons, n);
      },
      install({ $q: e, iconSet: t, ssrContext: n }) {
        e.config.iconMapFn !== void 0 && (this.iconMapFn = e.config.iconMapFn),
          (e.iconSet = this.__icons),
          bn(
            e,
            "iconMapFn",
            () => this.iconMapFn,
            (o) => {
              this.iconMapFn = o;
            }
          ),
          this.__installed === !0
            ? t !== void 0 && this.set(t)
            : this.set(t || od);
      },
    }
  ),
  rd = "_q_",
  Tm = "_q_l_",
  qm = "_q_pc_",
  id = "_q_fo_",
  Am = "_q_tabs_",
  Mm = () => {},
  So = {};
let ga = !1;
function sd() {
  ga = !0;
}
function nr(e, t) {
  if (e === t) return !0;
  if (
    e !== null &&
    t !== null &&
    typeof e == "object" &&
    typeof t == "object"
  ) {
    if (e.constructor !== t.constructor) return !1;
    let n, o;
    if (e.constructor === Array) {
      if (((n = e.length), n !== t.length)) return !1;
      for (o = n; o-- !== 0; ) if (nr(e[o], t[o]) !== !0) return !1;
      return !0;
    }
    if (e.constructor === Map) {
      if (e.size !== t.size) return !1;
      let i = e.entries();
      for (o = i.next(); o.done !== !0; ) {
        if (t.has(o.value[0]) !== !0) return !1;
        o = i.next();
      }
      for (i = e.entries(), o = i.next(); o.done !== !0; ) {
        if (nr(o.value[1], t.get(o.value[0])) !== !0) return !1;
        o = i.next();
      }
      return !0;
    }
    if (e.constructor === Set) {
      if (e.size !== t.size) return !1;
      const i = e.entries();
      for (o = i.next(); o.done !== !0; ) {
        if (t.has(o.value[0]) !== !0) return !1;
        o = i.next();
      }
      return !0;
    }
    if (e.buffer != null && e.buffer.constructor === ArrayBuffer) {
      if (((n = e.length), n !== t.length)) return !1;
      for (o = n; o-- !== 0; ) if (e[o] !== t[o]) return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    const r = Object.keys(e).filter((i) => e[i] !== void 0);
    if (
      ((n = r.length),
      n !== Object.keys(t).filter((i) => t[i] !== void 0).length)
    )
      return !1;
    for (o = n; o-- !== 0; ) {
      const i = r[o];
      if (nr(e[i], t[i]) !== !0) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function at(e) {
  return e !== null && typeof e == "object" && Array.isArray(e) !== !0;
}
function ld(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function ad(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
function Om(e) {
  return typeof e == "number" && isFinite(e);
}
const ls = [Tr, nd, Ae, Wf, qr, Ze, Eo];
function ma(e, t) {
  const n = la(e);
  n.config.globalProperties = t.config.globalProperties;
  const { reload: o, ...r } = t._context;
  return Object.assign(n._context, r), n;
}
function as(e, t) {
  t.forEach((n) => {
    n.install(e), (n.__installed = !0);
  });
}
function ud(e, t, n) {
  (e.config.globalProperties.$q = n.$q),
    e.provide(rd, n.$q),
    as(n, ls),
    t.components !== void 0 &&
      Object.values(t.components).forEach((o) => {
        at(o) === !0 && o.name !== void 0 && e.component(o.name, o);
      }),
    t.directives !== void 0 &&
      Object.values(t.directives).forEach((o) => {
        at(o) === !0 && o.name !== void 0 && e.directive(o.name, o);
      }),
    t.plugins !== void 0 &&
      as(
        n,
        Object.values(t.plugins).filter(
          (o) => typeof o.install == "function" && ls.includes(o) === !1
        )
      ),
    qt.value === !0 &&
      (n.$q.onSSRHydrated = () => {
        n.onSSRHydrated.forEach((o) => {
          o();
        }),
          (n.$q.onSSRHydrated = () => {});
      });
}
var cd = function (e, t = {}) {
    const n = { version: "2.12.4" };
    ga === !1
      ? (t.config !== void 0 && Object.assign(So, t.config),
        (n.config = { ...So }),
        sd())
      : (n.config = t.config || {}),
      ud(e, t, {
        parentApp: e,
        $q: n,
        lang: t.lang,
        iconSet: t.iconSet,
        onSSRHydrated: [],
      });
  },
  fd = { version: "2.12.4", install: cd, lang: Ze, iconSet: Eo },
  dd = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [o, r] of t) n[o] = r;
    return n;
  };
const hd = Lo({ name: "App" });
function gd(e, t, n, o, r, i) {
  const s = xc("router-view");
  return Wl(), Yl(s);
}
var md = dd(hd, [["render", gd]]);
/*!
 * vue-router v4.2.4
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const en = typeof window != "undefined";
function pd(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const ge = Object.assign;
function or(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = rt(r) ? r.map(e) : e(r);
  }
  return n;
}
const Ln = () => {},
  rt = Array.isArray,
  vd = /\/$/,
  bd = (e) => e.replace(vd, "");
function rr(e, t, n = "/") {
  let o,
    r = {},
    i = "",
    s = "";
  const l = t.indexOf("#");
  let a = t.indexOf("?");
  return (
    l < a && l >= 0 && (a = -1),
    a > -1 &&
      ((o = t.slice(0, a)),
      (i = t.slice(a + 1, l > -1 ? l : t.length)),
      (r = e(i))),
    l > -1 && ((o = o || t.slice(0, l)), (s = t.slice(l, t.length))),
    (o = xd(o != null ? o : t, n)),
    { fullPath: o + (i && "?") + i + s, path: o, query: r, hash: s }
  );
}
function yd(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function us(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function _d(e, t, n) {
  const o = t.matched.length - 1,
    r = n.matched.length - 1;
  return (
    o > -1 &&
    o === r &&
    fn(t.matched[o], n.matched[r]) &&
    pa(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function fn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function pa(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!wd(e[n], t[n])) return !1;
  return !0;
}
function wd(e, t) {
  return rt(e) ? cs(e, t) : rt(t) ? cs(t, e) : e === t;
}
function cs(e, t) {
  return rt(t)
    ? e.length === t.length && e.every((n, o) => n === t[o])
    : e.length === 1 && e[0] === t;
}
function xd(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    o = e.split("/"),
    r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let i = n.length - 1,
    s,
    l;
  for (s = 0; s < o.length; s++)
    if (((l = o[s]), l !== "."))
      if (l === "..") i > 1 && i--;
      else break;
  return (
    n.slice(0, i).join("/") +
    "/" +
    o.slice(s - (s === o.length ? 1 : 0)).join("/")
  );
}
var Kn;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(Kn || (Kn = {}));
var Bn;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(Bn || (Bn = {}));
function Cd(e) {
  if (!e)
    if (en) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), bd(e);
}
const kd = /^[^#]+#/;
function Ed(e, t) {
  return e.replace(kd, "#") + t;
}
function Sd(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0),
  };
}
const zo = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Rd(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      o = typeof n == "string" && n.startsWith("#"),
      r =
        typeof n == "string"
          ? o
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!r) return;
    t = Sd(r, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function fs(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Ar = new Map();
function Pd(e, t) {
  Ar.set(e, t);
}
function Td(e) {
  const t = Ar.get(e);
  return Ar.delete(e), t;
}
let qd = () => location.protocol + "//" + location.host;
function va(e, t) {
  const { pathname: n, search: o, hash: r } = t,
    i = e.indexOf("#");
  if (i > -1) {
    let l = r.includes(e.slice(i)) ? e.slice(i).length : 1,
      a = r.slice(l);
    return a[0] !== "/" && (a = "/" + a), us(a, "");
  }
  return us(n, e) + o + r;
}
function Ad(e, t, n, o) {
  let r = [],
    i = [],
    s = null;
  const l = ({ state: f }) => {
    const p = va(e, location),
      y = n.value,
      T = t.value;
    let q = 0;
    if (f) {
      if (((n.value = p), (t.value = f), s && s === y)) {
        s = null;
        return;
      }
      q = T ? f.position - T.position : 0;
    } else o(p);
    r.forEach((M) => {
      M(n.value, y, {
        delta: q,
        type: Kn.pop,
        direction: q ? (q > 0 ? Bn.forward : Bn.back) : Bn.unknown,
      });
    });
  };
  function a() {
    s = n.value;
  }
  function c(f) {
    r.push(f);
    const p = () => {
      const y = r.indexOf(f);
      y > -1 && r.splice(y, 1);
    };
    return i.push(p), p;
  }
  function u() {
    const { history: f } = window;
    !f.state || f.replaceState(ge({}, f.state, { scroll: zo() }), "");
  }
  function d() {
    for (const f of i) f();
    (i = []),
      window.removeEventListener("popstate", l),
      window.removeEventListener("beforeunload", u);
  }
  return (
    window.addEventListener("popstate", l),
    window.addEventListener("beforeunload", u, { passive: !0 }),
    { pauseListeners: a, listen: c, destroy: d }
  );
}
function ds(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? zo() : null,
  };
}
function Md(e) {
  const { history: t, location: n } = window,
    o = { value: va(e, n) },
    r = { value: t.state };
  r.value ||
    i(
      o.value,
      {
        back: null,
        current: o.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function i(a, c, u) {
    const d = e.indexOf("#"),
      f =
        d > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(d)) + a
          : qd() + e + a;
    try {
      t[u ? "replaceState" : "pushState"](c, "", f), (r.value = c);
    } catch (p) {
      console.error(p), n[u ? "replace" : "assign"](f);
    }
  }
  function s(a, c) {
    const u = ge({}, t.state, ds(r.value.back, a, r.value.forward, !0), c, {
      position: r.value.position,
    });
    i(a, u, !0), (o.value = a);
  }
  function l(a, c) {
    const u = ge({}, r.value, t.state, { forward: a, scroll: zo() });
    i(u.current, u, !0);
    const d = ge({}, ds(o.value, a, null), { position: u.position + 1 }, c);
    i(a, d, !1), (o.value = a);
  }
  return { location: o, state: r, push: l, replace: s };
}
function Od(e) {
  e = Cd(e);
  const t = Md(e),
    n = Ad(e, t.state, t.location, t.replace);
  function o(i, s = !0) {
    s || n.pauseListeners(), history.go(i);
  }
  const r = ge(
    { location: "", base: e, go: o, createHref: Ed.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(r, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(r, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    r
  );
}
function $d(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ""),
    e.includes("#") || (e += "#"),
    Od(e)
  );
}
function Ld(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function ba(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const _t = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  ya = Symbol("");
var hs;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(hs || (hs = {}));
function dn(e, t) {
  return ge(new Error(), { type: e, [ya]: !0 }, t);
}
function ft(e, t) {
  return e instanceof Error && ya in e && (t == null || !!(e.type & t));
}
const gs = "[^/]+?",
  Bd = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Fd = /[.+*?^${}()[\]/\\]/g;
function Id(e, t) {
  const n = ge({}, Bd, t),
    o = [];
  let r = n.start ? "^" : "";
  const i = [];
  for (const c of e) {
    const u = c.length ? [] : [90];
    n.strict && !c.length && (r += "/");
    for (let d = 0; d < c.length; d++) {
      const f = c[d];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (f.type === 0)
        d || (r += "/"), (r += f.value.replace(Fd, "\\$&")), (p += 40);
      else if (f.type === 1) {
        const { value: y, repeatable: T, optional: q, regexp: M } = f;
        i.push({ name: y, repeatable: T, optional: q });
        const m = M || gs;
        if (m !== gs) {
          p += 10;
          try {
            new RegExp(`(${m})`);
          } catch (w) {
            throw new Error(
              `Invalid custom RegExp for param "${y}" (${m}): ` + w.message
            );
          }
        }
        let _ = T ? `((?:${m})(?:/(?:${m}))*)` : `(${m})`;
        d || (_ = q && c.length < 2 ? `(?:/${_})` : "/" + _),
          q && (_ += "?"),
          (r += _),
          (p += 20),
          q && (p += -8),
          T && (p += -20),
          m === ".*" && (p += -50);
      }
      u.push(p);
    }
    o.push(u);
  }
  if (n.strict && n.end) {
    const c = o.length - 1;
    o[c][o[c].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? (r += "$") : n.strict && (r += "(?:/|$)");
  const s = new RegExp(r, n.sensitive ? "" : "i");
  function l(c) {
    const u = c.match(s),
      d = {};
    if (!u) return null;
    for (let f = 1; f < u.length; f++) {
      const p = u[f] || "",
        y = i[f - 1];
      d[y.name] = p && y.repeatable ? p.split("/") : p;
    }
    return d;
  }
  function a(c) {
    let u = "",
      d = !1;
    for (const f of e) {
      (!d || !u.endsWith("/")) && (u += "/"), (d = !1);
      for (const p of f)
        if (p.type === 0) u += p.value;
        else if (p.type === 1) {
          const { value: y, repeatable: T, optional: q } = p,
            M = y in c ? c[y] : "";
          if (rt(M) && !T)
            throw new Error(
              `Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`
            );
          const m = rt(M) ? M.join("/") : M;
          if (!m)
            if (q)
              f.length < 2 &&
                (u.endsWith("/") ? (u = u.slice(0, -1)) : (d = !0));
            else throw new Error(`Missing required param "${y}"`);
          u += m;
        }
    }
    return u || "/";
  }
  return { re: s, score: o, keys: i, parse: l, stringify: a };
}
function Nd(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o) return o;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function jd(e, t) {
  let n = 0;
  const o = e.score,
    r = t.score;
  for (; n < o.length && n < r.length; ) {
    const i = Nd(o[n], r[n]);
    if (i) return i;
    n++;
  }
  if (Math.abs(r.length - o.length) === 1) {
    if (ms(o)) return 1;
    if (ms(r)) return -1;
  }
  return r.length - o.length;
}
function ms(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Vd = { type: 0, value: "" },
  Dd = /[a-zA-Z0-9_]/;
function Hd(e) {
  if (!e) return [[]];
  if (e === "/") return [[Vd]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${c}": ${p}`);
  }
  let n = 0,
    o = n;
  const r = [];
  let i;
  function s() {
    i && r.push(i), (i = []);
  }
  let l = 0,
    a,
    c = "",
    u = "";
  function d() {
    !c ||
      (n === 0
        ? i.push({ type: 0, value: c })
        : n === 1 || n === 2 || n === 3
        ? (i.length > 1 &&
            (a === "*" || a === "+") &&
            t(
              `A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`
            ),
          i.push({
            type: 1,
            value: c,
            regexp: u,
            repeatable: a === "*" || a === "+",
            optional: a === "*" || a === "?",
          }))
        : t("Invalid state to consume buffer"),
      (c = ""));
  }
  function f() {
    c += a;
  }
  for (; l < e.length; ) {
    if (((a = e[l++]), a === "\\" && n !== 2)) {
      (o = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        a === "/" ? (c && d(), s()) : a === ":" ? (d(), (n = 1)) : f();
        break;
      case 4:
        f(), (n = o);
        break;
      case 1:
        a === "("
          ? (n = 2)
          : Dd.test(a)
          ? f()
          : (d(), (n = 0), a !== "*" && a !== "?" && a !== "+" && l--);
        break;
      case 2:
        a === ")"
          ? u[u.length - 1] == "\\"
            ? (u = u.slice(0, -1) + a)
            : (n = 3)
          : (u += a);
        break;
      case 3:
        d(), (n = 0), a !== "*" && a !== "?" && a !== "+" && l--, (u = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), d(), s(), r;
}
function zd(e, t, n) {
  const o = Id(Hd(e.path), n),
    r = ge(o, { record: e, parent: t, children: [], alias: [] });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function Kd(e, t) {
  const n = [],
    o = new Map();
  t = bs({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(u) {
    return o.get(u);
  }
  function i(u, d, f) {
    const p = !f,
      y = Ud(u);
    y.aliasOf = f && f.record;
    const T = bs(t, u),
      q = [y];
    if ("alias" in u) {
      const _ = typeof u.alias == "string" ? [u.alias] : u.alias;
      for (const w of _)
        q.push(
          ge({}, y, {
            components: f ? f.record.components : y.components,
            path: w,
            aliasOf: f ? f.record : y,
          })
        );
    }
    let M, m;
    for (const _ of q) {
      const { path: w } = _;
      if (d && w[0] !== "/") {
        const F = d.record.path,
          j = F[F.length - 1] === "/" ? "" : "/";
        _.path = d.record.path + (w && j + w);
      }
      if (
        ((M = zd(_, d, T)),
        f
          ? f.alias.push(M)
          : ((m = m || M),
            m !== M && m.alias.push(M),
            p && u.name && !vs(M) && s(u.name)),
        y.children)
      ) {
        const F = y.children;
        for (let j = 0; j < F.length; j++) i(F[j], M, f && f.children[j]);
      }
      (f = f || M),
        ((M.record.components && Object.keys(M.record.components).length) ||
          M.record.name ||
          M.record.redirect) &&
          a(M);
    }
    return m
      ? () => {
          s(m);
        }
      : Ln;
  }
  function s(u) {
    if (ba(u)) {
      const d = o.get(u);
      d &&
        (o.delete(u),
        n.splice(n.indexOf(d), 1),
        d.children.forEach(s),
        d.alias.forEach(s));
    } else {
      const d = n.indexOf(u);
      d > -1 &&
        (n.splice(d, 1),
        u.record.name && o.delete(u.record.name),
        u.children.forEach(s),
        u.alias.forEach(s));
    }
  }
  function l() {
    return n;
  }
  function a(u) {
    let d = 0;
    for (
      ;
      d < n.length &&
      jd(u, n[d]) >= 0 &&
      (u.record.path !== n[d].record.path || !_a(u, n[d]));

    )
      d++;
    n.splice(d, 0, u), u.record.name && !vs(u) && o.set(u.record.name, u);
  }
  function c(u, d) {
    let f,
      p = {},
      y,
      T;
    if ("name" in u && u.name) {
      if (((f = o.get(u.name)), !f)) throw dn(1, { location: u });
      (T = f.record.name),
        (p = ge(
          ps(
            d.params,
            f.keys.filter((m) => !m.optional).map((m) => m.name)
          ),
          u.params &&
            ps(
              u.params,
              f.keys.map((m) => m.name)
            )
        )),
        (y = f.stringify(p));
    } else if ("path" in u)
      (y = u.path),
        (f = n.find((m) => m.re.test(y))),
        f && ((p = f.parse(y)), (T = f.record.name));
    else {
      if (((f = d.name ? o.get(d.name) : n.find((m) => m.re.test(d.path))), !f))
        throw dn(1, { location: u, currentLocation: d });
      (T = f.record.name),
        (p = ge({}, d.params, u.params)),
        (y = f.stringify(p));
    }
    const q = [];
    let M = f;
    for (; M; ) q.unshift(M.record), (M = M.parent);
    return { name: T, path: y, params: p, matched: q, meta: Qd(q) };
  }
  return (
    e.forEach((u) => i(u)),
    {
      addRoute: i,
      resolve: c,
      removeRoute: s,
      getRoutes: l,
      getRecordMatcher: r,
    }
  );
}
function ps(e, t) {
  const n = {};
  for (const o of t) o in e && (n[o] = e[o]);
  return n;
}
function Ud(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Wd(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function Wd(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const o in e.components) t[o] = typeof n == "object" ? n[o] : n;
  return t;
}
function vs(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Qd(e) {
  return e.reduce((t, n) => ge(t, n.meta), {});
}
function bs(e, t) {
  const n = {};
  for (const o in e) n[o] = o in t ? t[o] : e[o];
  return n;
}
function _a(e, t) {
  return t.children.some((n) => n === e || _a(e, n));
}
const wa = /#/g,
  Yd = /&/g,
  Zd = /\//g,
  Jd = /=/g,
  Xd = /\?/g,
  xa = /\+/g,
  Gd = /%5B/g,
  eh = /%5D/g,
  Ca = /%5E/g,
  th = /%60/g,
  ka = /%7B/g,
  nh = /%7C/g,
  Ea = /%7D/g,
  oh = /%20/g;
function fi(e) {
  return encodeURI("" + e)
    .replace(nh, "|")
    .replace(Gd, "[")
    .replace(eh, "]");
}
function rh(e) {
  return fi(e).replace(ka, "{").replace(Ea, "}").replace(Ca, "^");
}
function Mr(e) {
  return fi(e)
    .replace(xa, "%2B")
    .replace(oh, "+")
    .replace(wa, "%23")
    .replace(Yd, "%26")
    .replace(th, "`")
    .replace(ka, "{")
    .replace(Ea, "}")
    .replace(Ca, "^");
}
function ih(e) {
  return Mr(e).replace(Jd, "%3D");
}
function sh(e) {
  return fi(e).replace(wa, "%23").replace(Xd, "%3F");
}
function lh(e) {
  return e == null ? "" : sh(e).replace(Zd, "%2F");
}
function Ro(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function ah(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const i = o[r].replace(xa, " "),
      s = i.indexOf("="),
      l = Ro(s < 0 ? i : i.slice(0, s)),
      a = s < 0 ? null : Ro(i.slice(s + 1));
    if (l in t) {
      let c = t[l];
      rt(c) || (c = t[l] = [c]), c.push(a);
    } else t[l] = a;
  }
  return t;
}
function ys(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (((n = ih(n)), o == null)) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (rt(o) ? o.map((i) => i && Mr(i)) : [o && Mr(o)]).forEach((i) => {
      i !== void 0 &&
        ((t += (t.length ? "&" : "") + n), i != null && (t += "=" + i));
    });
  }
  return t;
}
function uh(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 &&
      (t[n] = rt(o)
        ? o.map((r) => (r == null ? null : "" + r))
        : o == null
        ? o
        : "" + o);
  }
  return t;
}
const ch = Symbol(""),
  _s = Symbol(""),
  di = Symbol(""),
  Sa = Symbol(""),
  Or = Symbol("");
function xn() {
  let e = [];
  function t(o) {
    return (
      e.push(o),
      () => {
        const r = e.indexOf(o);
        r > -1 && e.splice(r, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function Ct(e, t, n, o, r) {
  const i = o && (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () =>
    new Promise((s, l) => {
      const a = (d) => {
          d === !1
            ? l(dn(4, { from: n, to: t }))
            : d instanceof Error
            ? l(d)
            : Ld(d)
            ? l(dn(2, { from: t, to: d }))
            : (i &&
                o.enterCallbacks[r] === i &&
                typeof d == "function" &&
                i.push(d),
              s());
        },
        c = e.call(o && o.instances[r], t, n, a);
      let u = Promise.resolve(c);
      e.length < 3 && (u = u.then(a)), u.catch((d) => l(d));
    });
}
function ir(e, t, n, o) {
  const r = [];
  for (const i of e)
    for (const s in i.components) {
      let l = i.components[s];
      if (!(t !== "beforeRouteEnter" && !i.instances[s]))
        if (fh(l)) {
          const c = (l.__vccOpts || l)[t];
          c && r.push(Ct(c, n, o, i, s));
        } else {
          let a = l();
          r.push(() =>
            a.then((c) => {
              if (!c)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${s}" at "${i.path}"`)
                );
              const u = pd(c) ? c.default : c;
              i.components[s] = u;
              const f = (u.__vccOpts || u)[t];
              return f && Ct(f, n, o, i, s)();
            })
          );
        }
    }
  return r;
}
function fh(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function ws(e) {
  const t = ut(di),
    n = ut(Sa),
    o = R(() => t.resolve(Vt(e.to))),
    r = R(() => {
      const { matched: a } = o.value,
        { length: c } = a,
        u = a[c - 1],
        d = n.matched;
      if (!u || !d.length) return -1;
      const f = d.findIndex(fn.bind(null, u));
      if (f > -1) return f;
      const p = xs(a[c - 2]);
      return c > 1 && xs(u) === p && d[d.length - 1].path !== p
        ? d.findIndex(fn.bind(null, a[c - 2]))
        : f;
    }),
    i = R(() => r.value > -1 && mh(n.params, o.value.params)),
    s = R(
      () =>
        r.value > -1 &&
        r.value === n.matched.length - 1 &&
        pa(n.params, o.value.params)
    );
  function l(a = {}) {
    return gh(a)
      ? t[Vt(e.replace) ? "replace" : "push"](Vt(e.to)).catch(Ln)
      : Promise.resolve();
  }
  return {
    route: o,
    href: R(() => o.value.href),
    isActive: i,
    isExactActive: s,
    navigate: l,
  };
}
const dh = Lo({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: ws,
    setup(e, { slots: t }) {
      const n = pn(ws(e)),
        { options: o } = ut(di),
        r = R(() => ({
          [Cs(e.activeClass, o.linkActiveClass, "router-link-active")]:
            n.isActive,
          [Cs(
            e.exactActiveClass,
            o.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const i = t.default && t.default(n);
        return e.custom
          ? i
          : E(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: r.value,
              },
              i
            );
      };
    },
  }),
  hh = dh;
function gh(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function mh(e, t) {
  for (const n in t) {
    const o = t[n],
      r = e[n];
    if (typeof o == "string") {
      if (o !== r) return !1;
    } else if (!rt(r) || r.length !== o.length || o.some((i, s) => i !== r[s]))
      return !1;
  }
  return !0;
}
function xs(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const Cs = (e, t, n) => (e != null ? e : t != null ? t : n),
  ph = Lo({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const o = ut(Or),
        r = R(() => e.route || o.value),
        i = ut(_s, 0),
        s = R(() => {
          let c = Vt(i);
          const { matched: u } = r.value;
          let d;
          for (; (d = u[c]) && !d.components; ) c++;
          return c;
        }),
        l = R(() => r.value.matched[s.value]);
      fo(
        _s,
        R(() => s.value + 1)
      ),
        fo(ch, l),
        fo(Or, r);
      const a = he();
      return (
        be(
          () => [a.value, l.value, e.name],
          ([c, u, d], [f, p, y]) => {
            u &&
              ((u.instances[d] = c),
              p &&
                p !== u &&
                c &&
                c === f &&
                (u.leaveGuards.size || (u.leaveGuards = p.leaveGuards),
                u.updateGuards.size || (u.updateGuards = p.updateGuards))),
              c &&
                u &&
                (!p || !fn(u, p) || !f) &&
                (u.enterCallbacks[d] || []).forEach((T) => T(c));
          },
          { flush: "post" }
        ),
        () => {
          const c = r.value,
            u = e.name,
            d = l.value,
            f = d && d.components[u];
          if (!f) return ks(n.default, { Component: f, route: c });
          const p = d.props[u],
            y = p
              ? p === !0
                ? c.params
                : typeof p == "function"
                ? p(c)
                : p
              : null,
            q = E(
              f,
              ge({}, y, t, {
                onVnodeUnmounted: (M) => {
                  M.component.isUnmounted && (d.instances[u] = null);
                },
                ref: a,
              })
            );
          return ks(n.default, { Component: q, route: c }) || q;
        }
      );
    },
  });
function ks(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const vh = ph;
function bh(e) {
  const t = Kd(e.routes, e),
    n = e.parseQuery || ah,
    o = e.stringifyQuery || ys,
    r = e.history,
    i = xn(),
    s = xn(),
    l = xn(),
    a = Yu(_t);
  let c = _t;
  en &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const u = or.bind(null, (S) => "" + S),
    d = or.bind(null, lh),
    f = or.bind(null, Ro);
  function p(S, Q) {
    let z, X;
    return (
      ba(S) ? ((z = t.getRecordMatcher(S)), (X = Q)) : (X = S), t.addRoute(X, z)
    );
  }
  function y(S) {
    const Q = t.getRecordMatcher(S);
    Q && t.removeRoute(Q);
  }
  function T() {
    return t.getRoutes().map((S) => S.record);
  }
  function q(S) {
    return !!t.getRecordMatcher(S);
  }
  function M(S, Q) {
    if (((Q = ge({}, Q || a.value)), typeof S == "string")) {
      const b = rr(n, S, Q.path),
        P = t.resolve({ path: b.path }, Q),
        O = r.createHref(b.fullPath);
      return ge(b, P, {
        params: f(P.params),
        hash: Ro(b.hash),
        redirectedFrom: void 0,
        href: O,
      });
    }
    let z;
    if ("path" in S) z = ge({}, S, { path: rr(n, S.path, Q.path).path });
    else {
      const b = ge({}, S.params);
      for (const P in b) b[P] == null && delete b[P];
      (z = ge({}, S, { params: d(b) })), (Q.params = d(Q.params));
    }
    const X = t.resolve(z, Q),
      de = S.hash || "";
    X.params = u(f(X.params));
    const h = yd(o, ge({}, S, { hash: rh(de), path: X.path })),
      g = r.createHref(h);
    return ge(
      { fullPath: h, hash: de, query: o === ys ? uh(S.query) : S.query || {} },
      X,
      { redirectedFrom: void 0, href: g }
    );
  }
  function m(S) {
    return typeof S == "string" ? rr(n, S, a.value.path) : ge({}, S);
  }
  function _(S, Q) {
    if (c !== S) return dn(8, { from: Q, to: S });
  }
  function w(S) {
    return V(S);
  }
  function F(S) {
    return w(ge(m(S), { replace: !0 }));
  }
  function j(S) {
    const Q = S.matched[S.matched.length - 1];
    if (Q && Q.redirect) {
      const { redirect: z } = Q;
      let X = typeof z == "function" ? z(S) : z;
      return (
        typeof X == "string" &&
          ((X = X.includes("?") || X.includes("#") ? (X = m(X)) : { path: X }),
          (X.params = {})),
        ge(
          { query: S.query, hash: S.hash, params: "path" in X ? {} : S.params },
          X
        )
      );
    }
  }
  function V(S, Q) {
    const z = (c = M(S)),
      X = a.value,
      de = S.state,
      h = S.force,
      g = S.replace === !0,
      b = j(z);
    if (b)
      return V(
        ge(m(b), {
          state: typeof b == "object" ? ge({}, de, b.state) : de,
          force: h,
          replace: g,
        }),
        Q || z
      );
    const P = z;
    P.redirectedFrom = Q;
    let O;
    return (
      !h && _d(o, X, z) && ((O = dn(16, { to: P, from: X })), fe(X, X, !0, !1)),
      (O ? Promise.resolve(O) : x(P, X))
        .catch((B) => (ft(B) ? (ft(B, 2) ? B : se(B)) : W(B, P, X)))
        .then((B) => {
          if (B) {
            if (ft(B, 2))
              return V(
                ge({ replace: g }, m(B.to), {
                  state: typeof B.to == "object" ? ge({}, de, B.to.state) : de,
                  force: h,
                }),
                Q || P
              );
          } else B = v(P, X, !0, g, de);
          return $(P, X, B), B;
        })
    );
  }
  function N(S, Q) {
    const z = _(S, Q);
    return z ? Promise.reject(z) : Promise.resolve();
  }
  function C(S) {
    const Q = Re.values().next().value;
    return Q && typeof Q.runWithContext == "function"
      ? Q.runWithContext(S)
      : S();
  }
  function x(S, Q) {
    let z;
    const [X, de, h] = yh(S, Q);
    z = ir(X.reverse(), "beforeRouteLeave", S, Q);
    for (const b of X)
      b.leaveGuards.forEach((P) => {
        z.push(Ct(P, S, Q));
      });
    const g = N.bind(null, S, Q);
    return (
      z.push(g),
      ne(z)
        .then(() => {
          z = [];
          for (const b of i.list()) z.push(Ct(b, S, Q));
          return z.push(g), ne(z);
        })
        .then(() => {
          z = ir(de, "beforeRouteUpdate", S, Q);
          for (const b of de)
            b.updateGuards.forEach((P) => {
              z.push(Ct(P, S, Q));
            });
          return z.push(g), ne(z);
        })
        .then(() => {
          z = [];
          for (const b of h)
            if (b.beforeEnter)
              if (rt(b.beforeEnter))
                for (const P of b.beforeEnter) z.push(Ct(P, S, Q));
              else z.push(Ct(b.beforeEnter, S, Q));
          return z.push(g), ne(z);
        })
        .then(
          () => (
            S.matched.forEach((b) => (b.enterCallbacks = {})),
            (z = ir(h, "beforeRouteEnter", S, Q)),
            z.push(g),
            ne(z)
          )
        )
        .then(() => {
          z = [];
          for (const b of s.list()) z.push(Ct(b, S, Q));
          return z.push(g), ne(z);
        })
        .catch((b) => (ft(b, 8) ? b : Promise.reject(b)))
    );
  }
  function $(S, Q, z) {
    l.list().forEach((X) => C(() => X(S, Q, z)));
  }
  function v(S, Q, z, X, de) {
    const h = _(S, Q);
    if (h) return h;
    const g = Q === _t,
      b = en ? history.state : {};
    z &&
      (X || g
        ? r.replace(S.fullPath, ge({ scroll: g && b && b.scroll }, de))
        : r.push(S.fullPath, de)),
      (a.value = S),
      fe(S, Q, z, g),
      se();
  }
  let H;
  function k() {
    H ||
      (H = r.listen((S, Q, z) => {
        if (!oe.listening) return;
        const X = M(S),
          de = j(X);
        if (de) {
          V(ge(de, { replace: !0 }), X).catch(Ln);
          return;
        }
        c = X;
        const h = a.value;
        en && Pd(fs(h.fullPath, z.delta), zo()),
          x(X, h)
            .catch((g) =>
              ft(g, 12)
                ? g
                : ft(g, 2)
                ? (V(g.to, X)
                    .then((b) => {
                      ft(b, 20) &&
                        !z.delta &&
                        z.type === Kn.pop &&
                        r.go(-1, !1);
                    })
                    .catch(Ln),
                  Promise.reject())
                : (z.delta && r.go(-z.delta, !1), W(g, X, h))
            )
            .then((g) => {
              (g = g || v(X, h, !1)),
                g &&
                  (z.delta && !ft(g, 8)
                    ? r.go(-z.delta, !1)
                    : z.type === Kn.pop && ft(g, 20) && r.go(-1, !1)),
                $(X, h, g);
            })
            .catch(Ln);
      }));
  }
  let Z = xn(),
    Y = xn(),
    A;
  function W(S, Q, z) {
    se(S);
    const X = Y.list();
    return (
      X.length ? X.forEach((de) => de(S, Q, z)) : console.error(S),
      Promise.reject(S)
    );
  }
  function _e() {
    return A && a.value !== _t
      ? Promise.resolve()
      : new Promise((S, Q) => {
          Z.add([S, Q]);
        });
  }
  function se(S) {
    return (
      A ||
        ((A = !S),
        k(),
        Z.list().forEach(([Q, z]) => (S ? z(S) : Q())),
        Z.reset()),
      S
    );
  }
  function fe(S, Q, z, X) {
    const { scrollBehavior: de } = e;
    if (!en || !de) return Promise.resolve();
    const h =
      (!z && Td(fs(S.fullPath, 0))) ||
      ((X || !z) && history.state && history.state.scroll) ||
      null;
    return je()
      .then(() => de(S, Q, h))
      .then((g) => g && Rd(g))
      .catch((g) => W(g, S, Q));
  }
  const L = (S) => r.go(S);
  let ue;
  const Re = new Set(),
    oe = {
      currentRoute: a,
      listening: !0,
      addRoute: p,
      removeRoute: y,
      hasRoute: q,
      getRoutes: T,
      resolve: M,
      options: e,
      push: w,
      replace: F,
      go: L,
      back: () => L(-1),
      forward: () => L(1),
      beforeEach: i.add,
      beforeResolve: s.add,
      afterEach: l.add,
      onError: Y.add,
      isReady: _e,
      install(S) {
        const Q = this;
        S.component("RouterLink", hh),
          S.component("RouterView", vh),
          (S.config.globalProperties.$router = Q),
          Object.defineProperty(S.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => Vt(a),
          }),
          en &&
            !ue &&
            a.value === _t &&
            ((ue = !0), w(r.location).catch((de) => {}));
        const z = {};
        for (const de in _t)
          Object.defineProperty(z, de, {
            get: () => a.value[de],
            enumerable: !0,
          });
        S.provide(di, Q), S.provide(Sa, ml(z)), S.provide(Or, a);
        const X = S.unmount;
        Re.add(S),
          (S.unmount = function () {
            Re.delete(S),
              Re.size < 1 &&
                ((c = _t),
                H && H(),
                (H = null),
                (a.value = _t),
                (ue = !1),
                (A = !1)),
              X();
          });
      },
    };
  function ne(S) {
    return S.reduce((Q, z) => Q.then(() => C(z)), Promise.resolve());
  }
  return oe;
}
function yh(e, t) {
  const n = [],
    o = [],
    r = [],
    i = Math.max(t.matched.length, e.matched.length);
  for (let s = 0; s < i; s++) {
    const l = t.matched[s];
    l && (e.matched.find((c) => fn(c, l)) ? o.push(l) : n.push(l));
    const a = e.matched[s];
    a && (t.matched.find((c) => fn(c, a)) || r.push(a));
  }
  return [n, o, r];
}
const _h = (function () {
    const t = document.createElement("link").relList;
    return t && t.supports && t.supports("modulepreload")
      ? "modulepreload"
      : "preload";
  })(),
  Es = {},
  wh = "/",
  sr = function (t, n) {
    return !n || n.length === 0
      ? t()
      : Promise.all(
          n.map((o) => {
            if (((o = `${wh}${o}`), o in Es)) return;
            Es[o] = !0;
            const r = o.endsWith(".css"),
              i = r ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${o}"]${i}`)) return;
            const s = document.createElement("link");
            if (
              ((s.rel = r ? "stylesheet" : _h),
              r || ((s.as = "script"), (s.crossOrigin = "")),
              (s.href = o),
              document.head.appendChild(s),
              r)
            )
              return new Promise((l, a) => {
                s.addEventListener("load", l),
                  s.addEventListener("error", () =>
                    a(new Error(`Unable to preload CSS for ${o}`))
                  );
              });
          })
        ).then(() => t());
  },
  xh = [
    {
      path: "/",
      component: () =>
        sr(
          () => import("./MainLayout.295f5fc5.js"),
          [
            "assets/MainLayout.295f5fc5.js",
            "assets/QResizeObserver.b8a0e5fe.js",
          ]
        ),
      children: [
        {
          path: "",
          component: () =>
            sr(
              () => import("./MarketPage.b7a84b02.js"),
              [
                "assets/MarketPage.b7a84b02.js",
                "assets/QResizeObserver.b8a0e5fe.js",
              ]
            ),
        },
      ],
    },
    {
      path: "/:catchAll(.*)*",
      component: () => sr(() => import("./ErrorNotFound.4fc67341.js"), []),
    },
  ];
var lr = function () {
  return bh({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: xh,
    history: $d("/"),
  });
};
async function Ch(e, t) {
  const n = e(md);
  n.use(fd, t);
  const o = vn(typeof lr == "function" ? await lr({}) : lr);
  return { app: n, router: o };
}
const $r = { xs: 18, sm: 24, md: 32, lg: 38, xl: 46 },
  Yn = { size: String };
function Zn(e, t = $r) {
  return R(() =>
    e.size !== void 0
      ? { fontSize: e.size in t ? `${t[e.size]}px` : e.size }
      : null
  );
}
const $e = (e) => vn(Lo(e)),
  kh = (e) => vn(e);
function tt(e, t) {
  return (e !== void 0 && e()) || t;
}
function $m(e, t) {
  if (e !== void 0) {
    const n = e();
    if (n != null) return n.slice();
  }
  return t;
}
function It(e, t) {
  return e !== void 0 ? t.concat(e()) : t;
}
function Eh(e, t) {
  return e === void 0 ? t : t !== void 0 ? t.concat(e()) : e();
}
function Lm(e, t, n, o, r, i) {
  t.key = o + r;
  const s = E(e, t, n);
  return r === !0 ? Al(s, i()) : s;
}
const Ss = "0 0 24 24",
  Rs = (e) => e,
  ar = (e) => `ionicons ${e}`,
  Ra = {
    "mdi-": (e) => `mdi ${e}`,
    "icon-": Rs,
    "bt-": (e) => `bt ${e}`,
    "eva-": (e) => `eva ${e}`,
    "ion-md": ar,
    "ion-ios": ar,
    "ion-logo": ar,
    "iconfont ": Rs,
    "ti-": (e) => `themify-icon ${e}`,
    "bi-": (e) => `bootstrap-icons ${e}`,
  },
  Pa = { o_: "-outlined", r_: "-round", s_: "-sharp" },
  Ta = { sym_o_: "-outlined", sym_r_: "-rounded", sym_s_: "-sharp" },
  Sh = new RegExp("^(" + Object.keys(Ra).join("|") + ")"),
  Rh = new RegExp("^(" + Object.keys(Pa).join("|") + ")"),
  Ps = new RegExp("^(" + Object.keys(Ta).join("|") + ")"),
  Ph = /^[Mm]\s?[-+]?\.?\d/,
  Th = /^img:/,
  qh = /^svguse:/,
  Ah = /^ion-/,
  Mh = /^(fa-(sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;
var pt = $e({
    name: "QIcon",
    props: {
      ...Yn,
      tag: { type: String, default: "i" },
      name: String,
      color: String,
      left: Boolean,
      right: Boolean,
    },
    setup(e, { slots: t }) {
      const {
          proxy: { $q: n },
        } = ke(),
        o = Zn(e),
        r = R(
          () =>
            "q-icon" +
            (e.left === !0 ? " on-left" : "") +
            (e.right === !0 ? " on-right" : "") +
            (e.color !== void 0 ? ` text-${e.color}` : "")
        ),
        i = R(() => {
          let s,
            l = e.name;
          if (l === "none" || !l) return { none: !0 };
          if (n.iconMapFn !== null) {
            const u = n.iconMapFn(l);
            if (u !== void 0)
              if (u.icon !== void 0) {
                if (((l = u.icon), l === "none" || !l)) return { none: !0 };
              } else
                return {
                  cls: u.cls,
                  content: u.content !== void 0 ? u.content : " ",
                };
          }
          if (Ph.test(l) === !0) {
            const [u, d = Ss] = l.split("|");
            return {
              svg: !0,
              viewBox: d,
              nodes: u.split("&&").map((f) => {
                const [p, y, T] = f.split("@@");
                return E("path", { style: y, d: p, transform: T });
              }),
            };
          }
          if (Th.test(l) === !0) return { img: !0, src: l.substring(4) };
          if (qh.test(l) === !0) {
            const [u, d = Ss] = l.split("|");
            return { svguse: !0, src: u.substring(7), viewBox: d };
          }
          let a = " ";
          const c = l.match(Sh);
          if (c !== null) s = Ra[c[1]](l);
          else if (Mh.test(l) === !0) s = l;
          else if (Ah.test(l) === !0)
            s = `ionicons ion-${
              n.platform.is.ios === !0 ? "ios" : "md"
            }${l.substring(3)}`;
          else if (Ps.test(l) === !0) {
            s = "notranslate material-symbols";
            const u = l.match(Ps);
            u !== null && ((l = l.substring(6)), (s += Ta[u[1]])), (a = l);
          } else {
            s = "notranslate material-icons";
            const u = l.match(Rh);
            u !== null && ((l = l.substring(2)), (s += Pa[u[1]])), (a = l);
          }
          return { cls: s, content: a };
        });
      return () => {
        const s = {
          class: r.value,
          style: o.value,
          "aria-hidden": "true",
          role: "presentation",
        };
        return i.value.none === !0
          ? E(e.tag, s, tt(t.default))
          : i.value.img === !0
          ? E("span", s, It(t.default, [E("img", { src: i.value.src })]))
          : i.value.svg === !0
          ? E(
              "span",
              s,
              It(t.default, [
                E(
                  "svg",
                  { viewBox: i.value.viewBox || "0 0 24 24" },
                  i.value.nodes
                ),
              ])
            )
          : i.value.svguse === !0
          ? E(
              "span",
              s,
              It(t.default, [
                E("svg", { viewBox: i.value.viewBox }, [
                  E("use", { "xlink:href": i.value.src }),
                ]),
              ])
            )
          : (i.value.cls !== void 0 && (s.class += " " + i.value.cls),
            E(e.tag, s, It(t.default, [i.value.content])));
      };
    },
  }),
  Oh = $e({
    name: "QAvatar",
    props: {
      ...Yn,
      fontSize: String,
      color: String,
      textColor: String,
      icon: String,
      square: Boolean,
      rounded: Boolean,
    },
    setup(e, { slots: t }) {
      const n = Zn(e),
        o = R(
          () =>
            "q-avatar" +
            (e.color ? ` bg-${e.color}` : "") +
            (e.textColor ? ` text-${e.textColor} q-chip--colored` : "") +
            (e.square === !0
              ? " q-avatar--square"
              : e.rounded === !0
              ? " rounded-borders"
              : "")
        ),
        r = R(() => (e.fontSize ? { fontSize: e.fontSize } : null));
      return () => {
        const i = e.icon !== void 0 ? [E(pt, { name: e.icon })] : void 0;
        return E("div", { class: o.value, style: n.value }, [
          E(
            "div",
            {
              class: "q-avatar__content row flex-center overflow-hidden",
              style: r.value,
            },
            Eh(t.default, i)
          ),
        ]);
      };
    },
  });
const $h = { size: { type: [Number, String], default: "1em" }, color: String };
function Lh(e) {
  return {
    cSize: R(() => (e.size in $r ? `${$r[e.size]}px` : e.size)),
    classes: R(() => "q-spinner" + (e.color ? ` text-${e.color}` : "")),
  };
}
var Un = $e({
  name: "QSpinner",
  props: { ...$h, thickness: { type: Number, default: 5 } },
  setup(e) {
    const { cSize: t, classes: n } = Lh(e);
    return () =>
      E(
        "svg",
        {
          class: n.value + " q-spinner-mat",
          width: t.value,
          height: t.value,
          viewBox: "25 25 50 50",
        },
        [
          E("circle", {
            class: "path",
            cx: "50",
            cy: "50",
            r: "20",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": e.thickness,
            "stroke-miterlimit": "10",
          }),
        ]
      );
  },
});
function Bm(e) {
  return e === window ? window.innerHeight : e.getBoundingClientRect().height;
}
function Lr(e, t) {
  const n = e.style;
  for (const o in t) n[o] = t[o];
}
function Bh(e) {
  if (e == null) return;
  if (typeof e == "string")
    try {
      return document.querySelector(e) || void 0;
    } catch {
      return;
    }
  const t = Vt(e);
  if (t) return t.$el || t;
}
function Fh(e, t) {
  if (e == null || e.contains(t) === !0) return !0;
  for (let n = e.nextElementSibling; n !== null; n = n.nextElementSibling)
    if (n.contains(t)) return !0;
  return !1;
}
function Ih(e, t = 250) {
  let n = !1,
    o;
  return function () {
    return (
      n === !1 &&
        ((n = !0),
        setTimeout(() => {
          n = !1;
        }, t),
        (o = e.apply(this, arguments))),
      o
    );
  };
}
function Ts(e, t, n, o) {
  n.modifiers.stop === !0 && ko(e);
  const r = n.modifiers.color;
  let i = n.modifiers.center;
  i = i === !0 || o === !0;
  const s = document.createElement("span"),
    l = document.createElement("span"),
    a = Hf(e),
    { left: c, top: u, width: d, height: f } = t.getBoundingClientRect(),
    p = Math.sqrt(d * d + f * f),
    y = p / 2,
    T = `${(d - p) / 2}px`,
    q = i ? T : `${a.left - c - y}px`,
    M = `${(f - p) / 2}px`,
    m = i ? M : `${a.top - u - y}px`;
  (l.className = "q-ripple__inner"),
    Lr(l, {
      height: `${p}px`,
      width: `${p}px`,
      transform: `translate3d(${q},${m},0) scale3d(.2,.2,1)`,
      opacity: 0,
    }),
    (s.className = `q-ripple${r ? " text-" + r : ""}`),
    s.setAttribute("dir", "ltr"),
    s.appendChild(l),
    t.appendChild(s);
  const _ = () => {
    s.remove(), clearTimeout(w);
  };
  n.abort.push(_);
  let w = setTimeout(() => {
    l.classList.add("q-ripple__inner--enter"),
      (l.style.transform = `translate3d(${T},${M},0) scale3d(1,1,1)`),
      (l.style.opacity = 0.2),
      (w = setTimeout(() => {
        l.classList.remove("q-ripple__inner--enter"),
          l.classList.add("q-ripple__inner--leave"),
          (l.style.opacity = 0),
          (w = setTimeout(() => {
            s.remove(), n.abort.splice(n.abort.indexOf(_), 1);
          }, 275));
      }, 250));
  }, 50);
}
function qs(e, { modifiers: t, value: n, arg: o }) {
  const r = Object.assign({}, e.cfg.ripple, t, n);
  e.modifiers = {
    early: r.early === !0,
    stop: r.stop === !0,
    center: r.center === !0,
    color: r.color || o,
    keyCodes: [].concat(r.keyCodes || 13),
  };
}
var Nh = kh({
  name: "ripple",
  beforeMount(e, t) {
    const n = t.instance.$.appContext.config.globalProperties.$q.config || {};
    if (n.ripple === !1) return;
    const o = {
      cfg: n,
      enabled: t.value !== !1,
      modifiers: {},
      abort: [],
      start(r) {
        o.enabled === !0 &&
          r.qSkipRipple !== !0 &&
          r.type === (o.modifiers.early === !0 ? "pointerdown" : "click") &&
          Ts(r, e, o, r.qKeyEvent === !0);
      },
      keystart: Ih((r) => {
        o.enabled === !0 &&
          r.qSkipRipple !== !0 &&
          zn(r, o.modifiers.keyCodes) === !0 &&
          r.type === `key${o.modifiers.early === !0 ? "down" : "up"}` &&
          Ts(r, e, o, !0);
      }, 300),
    };
    qs(o, t),
      (e.__qripple = o),
      Kf(o, "main", [
        [e, "pointerdown", "start", "passive"],
        [e, "click", "start", "passive"],
        [e, "keydown", "keystart", "passive"],
        [e, "keyup", "keystart", "passive"],
      ]);
  },
  updated(e, t) {
    if (t.oldValue !== t.value) {
      const n = e.__qripple;
      n !== void 0 &&
        ((n.enabled = t.value !== !1),
        n.enabled === !0 && Object(t.value) === t.value && qs(n, t));
    }
  },
  beforeUnmount(e) {
    const t = e.__qripple;
    t !== void 0 &&
      (t.abort.forEach((n) => {
        n();
      }),
      Uf(t, "main"),
      delete e._qripple);
  },
});
const qa = {
    left: "start",
    center: "center",
    right: "end",
    between: "between",
    around: "around",
    evenly: "evenly",
    stretch: "stretch",
  },
  jh = Object.keys(qa),
  Aa = { align: { type: String, validator: (e) => jh.includes(e) } };
function Ma(e) {
  return R(() => {
    const t =
      e.align === void 0 ? (e.vertical === !0 ? "stretch" : "left") : e.align;
    return `${e.vertical === !0 ? "items" : "justify"}-${qa[t]}`;
  });
}
function go(e) {
  if (Object(e.$parent) === e.$parent) return e.$parent;
  let { parent: t } = e.$;
  for (; Object(t) === t; ) {
    if (Object(t.proxy) === t.proxy) return t.proxy;
    t = t.parent;
  }
}
function Oa(e, t) {
  typeof t.type == "symbol"
    ? Array.isArray(t.children) === !0 &&
      t.children.forEach((n) => {
        Oa(e, n);
      })
    : e.add(t);
}
function Fm(e) {
  const t = new Set();
  return (
    e.forEach((n) => {
      Oa(t, n);
    }),
    Array.from(t)
  );
}
function $a(e) {
  return e.appContext.config.globalProperties.$router !== void 0;
}
function La(e) {
  return e.isUnmounted === !0 || e.isDeactivated === !0;
}
function As(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
function Ms(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Vh(e, t) {
  for (const n in t) {
    const o = t[n],
      r = e[n];
    if (typeof o == "string") {
      if (o !== r) return !1;
    } else if (
      Array.isArray(r) === !1 ||
      r.length !== o.length ||
      o.some((i, s) => i !== r[s])
    )
      return !1;
  }
  return !0;
}
function Os(e, t) {
  return Array.isArray(t) === !0
    ? e.length === t.length && e.every((n, o) => n === t[o])
    : e.length === 1 && e[0] === t;
}
function Dh(e, t) {
  return Array.isArray(e) === !0
    ? Os(e, t)
    : Array.isArray(t) === !0
    ? Os(t, e)
    : e === t;
}
function Hh(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (Dh(e[n], t[n]) === !1) return !1;
  return !0;
}
const zh = {
  to: [String, Object],
  replace: Boolean,
  exact: Boolean,
  activeClass: { type: String, default: "q-router-link--active" },
  exactActiveClass: { type: String, default: "q-router-link--exact-active" },
  href: String,
  target: String,
  disable: Boolean,
};
function Kh({ fallbackTag: e, useDisableForRouterLinkProps: t = !0 } = {}) {
  const n = ke(),
    { props: o, proxy: r, emit: i } = n,
    s = $a(n),
    l = R(() => o.disable !== !0 && o.href !== void 0),
    a = R(
      t === !0
        ? () =>
            s === !0 &&
            o.disable !== !0 &&
            l.value !== !0 &&
            o.to !== void 0 &&
            o.to !== null &&
            o.to !== ""
        : () =>
            s === !0 &&
            l.value !== !0 &&
            o.to !== void 0 &&
            o.to !== null &&
            o.to !== ""
    ),
    c = R(() => (a.value === !0 ? m(o.to) : null)),
    u = R(() => c.value !== null),
    d = R(() => l.value === !0 || u.value === !0),
    f = R(() => (o.type === "a" || d.value === !0 ? "a" : o.tag || e || "div")),
    p = R(() =>
      l.value === !0
        ? { href: o.href, target: o.target }
        : u.value === !0
        ? { href: c.value.href, target: o.target }
        : {}
    ),
    y = R(() => {
      if (u.value === !1) return -1;
      const { matched: F } = c.value,
        { length: j } = F,
        V = F[j - 1];
      if (V === void 0) return -1;
      const N = r.$route.matched;
      if (N.length === 0) return -1;
      const C = N.findIndex(Ms.bind(null, V));
      if (C > -1) return C;
      const x = As(F[j - 2]);
      return j > 1 && As(V) === x && N[N.length - 1].path !== x
        ? N.findIndex(Ms.bind(null, F[j - 2]))
        : C;
    }),
    T = R(
      () =>
        u.value === !0 && y.value !== -1 && Vh(r.$route.params, c.value.params)
    ),
    q = R(
      () =>
        T.value === !0 &&
        y.value === r.$route.matched.length - 1 &&
        Hh(r.$route.params, c.value.params)
    ),
    M = R(() =>
      u.value === !0
        ? q.value === !0
          ? ` ${o.exactActiveClass} ${o.activeClass}`
          : o.exact === !0
          ? ""
          : T.value === !0
          ? ` ${o.activeClass}`
          : ""
        : ""
    );
  function m(F) {
    try {
      return r.$router.resolve(F);
    } catch {}
    return null;
  }
  function _(
    F,
    { returnRouterError: j, to: V = o.to, replace: N = o.replace } = {}
  ) {
    if (o.disable === !0) return F.preventDefault(), Promise.resolve(!1);
    if (
      F.metaKey ||
      F.altKey ||
      F.ctrlKey ||
      F.shiftKey ||
      (F.button !== void 0 && F.button !== 0) ||
      o.target === "_blank"
    )
      return Promise.resolve(!1);
    F.preventDefault();
    const C = r.$router[N === !0 ? "replace" : "push"](V);
    return j === !0 ? C : C.then(() => {}).catch(() => {});
  }
  function w(F) {
    if (u.value === !0) {
      const j = (V) => _(F, V);
      i("click", F, j), F.defaultPrevented !== !0 && j();
    } else i("click", F);
  }
  return {
    hasRouterLink: u,
    hasHrefLink: l,
    hasLink: d,
    linkTag: f,
    resolvedLink: c,
    linkIsActive: T,
    linkIsExactActive: q,
    linkClass: M,
    linkAttrs: p,
    getLink: m,
    navigateToRouterLink: _,
    navigateOnClick: w,
  };
}
const $s = { none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  Uh = { xs: 8, sm: 10, md: 14, lg: 20, xl: 24 },
  Wh = ["button", "submit", "reset"],
  Qh = /[^\s]\/[^\s]/,
  Yh = ["flat", "outline", "push", "unelevated"],
  Ba = (e, t) =>
    e.flat === !0
      ? "flat"
      : e.outline === !0
      ? "outline"
      : e.push === !0
      ? "push"
      : e.unelevated === !0
      ? "unelevated"
      : t,
  Im = (e) => {
    const t = Ba(e);
    return t !== void 0 ? { [t]: !0 } : {};
  },
  Zh = {
    ...Yn,
    ...zh,
    type: { type: String, default: "button" },
    label: [Number, String],
    icon: String,
    iconRight: String,
    ...Yh.reduce((e, t) => (e[t] = Boolean) && e, {}),
    square: Boolean,
    round: Boolean,
    rounded: Boolean,
    glossy: Boolean,
    size: String,
    fab: Boolean,
    fabMini: Boolean,
    padding: String,
    color: String,
    textColor: String,
    noCaps: Boolean,
    noWrap: Boolean,
    dense: Boolean,
    tabindex: [Number, String],
    ripple: { type: [Boolean, Object], default: !0 },
    align: { ...Aa.align, default: "center" },
    stack: Boolean,
    stretch: Boolean,
    loading: { type: Boolean, default: null },
    disable: Boolean,
  };
function Jh(e) {
  const t = Zn(e, Uh),
    n = Ma(e),
    {
      hasRouterLink: o,
      hasLink: r,
      linkTag: i,
      linkAttrs: s,
      navigateOnClick: l,
    } = Kh({ fallbackTag: "button" }),
    a = R(() => {
      const q = e.fab === !1 && e.fabMini === !1 ? t.value : {};
      return e.padding !== void 0
        ? Object.assign({}, q, {
            padding: e.padding
              .split(/\s+/)
              .map((M) => (M in $s ? $s[M] + "px" : M))
              .join(" "),
            minWidth: "0",
            minHeight: "0",
          })
        : q;
    }),
    c = R(() => e.rounded === !0 || e.fab === !0 || e.fabMini === !0),
    u = R(() => e.disable !== !0 && e.loading !== !0),
    d = R(() => (u.value === !0 ? e.tabindex || 0 : -1)),
    f = R(() => Ba(e, "standard")),
    p = R(() => {
      const q = { tabindex: d.value };
      return (
        r.value === !0
          ? Object.assign(q, s.value)
          : Wh.includes(e.type) === !0 && (q.type = e.type),
        i.value === "a"
          ? (e.disable === !0
              ? (q["aria-disabled"] = "true")
              : q.href === void 0 && (q.role = "button"),
            o.value !== !0 && Qh.test(e.type) === !0 && (q.type = e.type))
          : e.disable === !0 &&
            ((q.disabled = ""), (q["aria-disabled"] = "true")),
        e.loading === !0 &&
          e.percentage !== void 0 &&
          Object.assign(q, {
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": e.percentage,
          }),
        q
      );
    }),
    y = R(() => {
      let q;
      e.color !== void 0
        ? e.flat === !0 || e.outline === !0
          ? (q = `text-${e.textColor || e.color}`)
          : (q = `bg-${e.color} text-${e.textColor || "white"}`)
        : e.textColor && (q = `text-${e.textColor}`);
      const M =
        e.round === !0
          ? "round"
          : `rectangle${
              c.value === !0
                ? " q-btn--rounded"
                : e.square === !0
                ? " q-btn--square"
                : ""
            }`;
      return (
        `q-btn--${f.value} q-btn--${M}` +
        (q !== void 0 ? " " + q : "") +
        (u.value === !0
          ? " q-btn--actionable q-focusable q-hoverable"
          : e.disable === !0
          ? " disabled"
          : "") +
        (e.fab === !0
          ? " q-btn--fab"
          : e.fabMini === !0
          ? " q-btn--fab-mini"
          : "") +
        (e.noCaps === !0 ? " q-btn--no-uppercase" : "") +
        (e.dense === !0 ? " q-btn--dense" : "") +
        (e.stretch === !0 ? " no-border-radius self-stretch" : "") +
        (e.glossy === !0 ? " glossy" : "") +
        (e.square ? " q-btn--square" : "")
      );
    }),
    T = R(
      () =>
        n.value +
        (e.stack === !0 ? " column" : " row") +
        (e.noWrap === !0 ? " no-wrap text-no-wrap" : "") +
        (e.loading === !0 ? " q-btn__content--hidden" : "")
    );
  return {
    classes: y,
    style: a,
    innerClasses: T,
    attributes: p,
    hasLink: r,
    linkTag: i,
    navigateOnClick: l,
    isActionable: u,
  };
}
const { passiveCapture: He } = Be;
let Jt = null,
  Xt = null,
  Gt = null;
var Br = $e({
  name: "QBtn",
  props: {
    ...Zh,
    percentage: Number,
    darkPercentage: Boolean,
    onTouchstart: [Function, Array],
  },
  emits: ["click", "keydown", "mousedown", "keyup"],
  setup(e, { slots: t, emit: n }) {
    const { proxy: o } = ke(),
      {
        classes: r,
        style: i,
        innerClasses: s,
        attributes: l,
        hasLink: a,
        linkTag: c,
        navigateOnClick: u,
        isActionable: d,
      } = Jh(e),
      f = he(null),
      p = he(null);
    let y = null,
      T,
      q = null;
    const M = R(() => e.label !== void 0 && e.label !== null && e.label !== ""),
      m = R(() =>
        e.disable === !0 || e.ripple === !1
          ? !1
          : {
              keyCodes: a.value === !0 ? [13, 32] : [13],
              ...(e.ripple === !0 ? {} : e.ripple),
            }
      ),
      _ = R(() => ({ center: e.round })),
      w = R(() => {
        const k = Math.max(0, Math.min(100, e.percentage));
        return k > 0
          ? {
              transition: "transform 0.6s",
              transform: `translateX(${k - 100}%)`,
            }
          : {};
      }),
      F = R(() => {
        if (e.loading === !0)
          return {
            onMousedown: H,
            onTouchstart: H,
            onClick: H,
            onKeydown: H,
            onKeyup: H,
          };
        if (d.value === !0) {
          const k = { onClick: V, onKeydown: N, onMousedown: x };
          if (o.$q.platform.has.touch === !0) {
            const Z = e.onTouchstart !== void 0 ? "" : "Passive";
            k[`onTouchstart${Z}`] = C;
          }
          return k;
        }
        return { onClick: Ke };
      }),
      j = R(() => ({
        ref: f,
        class: "q-btn q-btn-item non-selectable no-outline " + r.value,
        style: i.value,
        ...l.value,
        ...F.value,
      }));
    function V(k) {
      if (f.value !== null) {
        if (k !== void 0) {
          if (k.defaultPrevented === !0) return;
          const Z = document.activeElement;
          if (
            e.type === "submit" &&
            Z !== document.body &&
            f.value.contains(Z) === !1 &&
            Z.contains(f.value) === !1
          ) {
            f.value.focus();
            const Y = () => {
              document.removeEventListener("keydown", Ke, !0),
                document.removeEventListener("keyup", Y, He),
                f.value !== null && f.value.removeEventListener("blur", Y, He);
            };
            document.addEventListener("keydown", Ke, !0),
              document.addEventListener("keyup", Y, He),
              f.value.addEventListener("blur", Y, He);
          }
        }
        u(k);
      }
    }
    function N(k) {
      f.value !== null &&
        (n("keydown", k),
        zn(k, [13, 32]) === !0 &&
          Xt !== f.value &&
          (Xt !== null && v(),
          k.defaultPrevented !== !0 &&
            (f.value.focus(),
            (Xt = f.value),
            f.value.classList.add("q-btn--active"),
            document.addEventListener("keyup", $, !0),
            f.value.addEventListener("blur", $, He)),
          Ke(k)));
    }
    function C(k) {
      f.value !== null &&
        (n("touchstart", k),
        k.defaultPrevented !== !0 &&
          (Jt !== f.value &&
            (Jt !== null && v(),
            (Jt = f.value),
            (y = k.target),
            y.addEventListener("touchcancel", $, He),
            y.addEventListener("touchend", $, He)),
          (T = !0),
          q !== null && clearTimeout(q),
          (q = setTimeout(() => {
            (q = null), (T = !1);
          }, 200))));
    }
    function x(k) {
      f.value !== null &&
        ((k.qSkipRipple = T === !0),
        n("mousedown", k),
        k.defaultPrevented !== !0 &&
          Gt !== f.value &&
          (Gt !== null && v(),
          (Gt = f.value),
          f.value.classList.add("q-btn--active"),
          document.addEventListener("mouseup", $, He)));
    }
    function $(k) {
      if (
        f.value !== null &&
        !(
          k !== void 0 &&
          k.type === "blur" &&
          document.activeElement === f.value
        )
      ) {
        if (k !== void 0 && k.type === "keyup") {
          if (Xt === f.value && zn(k, [13, 32]) === !0) {
            const Z = new MouseEvent("click", k);
            (Z.qKeyEvent = !0),
              k.defaultPrevented === !0 && Et(Z),
              k.cancelBubble === !0 && ko(Z),
              f.value.dispatchEvent(Z),
              Ke(k),
              (k.qKeyEvent = !0);
          }
          n("keyup", k);
        }
        v();
      }
    }
    function v(k) {
      const Z = p.value;
      k !== !0 &&
        (Jt === f.value || Gt === f.value) &&
        Z !== null &&
        Z !== document.activeElement &&
        (Z.setAttribute("tabindex", -1), Z.focus()),
        Jt === f.value &&
          (y !== null &&
            (y.removeEventListener("touchcancel", $, He),
            y.removeEventListener("touchend", $, He)),
          (Jt = y = null)),
        Gt === f.value &&
          (document.removeEventListener("mouseup", $, He), (Gt = null)),
        Xt === f.value &&
          (document.removeEventListener("keyup", $, !0),
          f.value !== null && f.value.removeEventListener("blur", $, He),
          (Xt = null)),
        f.value !== null && f.value.classList.remove("q-btn--active");
    }
    function H(k) {
      Ke(k), (k.qSkipRipple = !0);
    }
    return (
      We(() => {
        v(!0);
      }),
      Object.assign(o, { click: V }),
      () => {
        let k = [];
        e.icon !== void 0 &&
          k.push(
            E(pt, {
              name: e.icon,
              left: e.stack === !1 && M.value === !0,
              role: "img",
              "aria-hidden": "true",
            })
          ),
          M.value === !0 && k.push(E("span", { class: "block" }, [e.label])),
          (k = It(t.default, k)),
          e.iconRight !== void 0 &&
            e.round === !1 &&
            k.push(
              E(pt, {
                name: e.iconRight,
                right: e.stack === !1 && M.value === !0,
                role: "img",
                "aria-hidden": "true",
              })
            );
        const Z = [E("span", { class: "q-focus-helper", ref: p })];
        return (
          e.loading === !0 &&
            e.percentage !== void 0 &&
            Z.push(
              E(
                "span",
                {
                  class:
                    "q-btn__progress absolute-full overflow-hidden" +
                    (e.darkPercentage === !0 ? " q-btn__progress--dark" : ""),
                },
                [
                  E("span", {
                    class: "q-btn__progress-indicator fit block",
                    style: w.value,
                  }),
                ]
              )
            ),
          Z.push(
            E(
              "span",
              {
                class:
                  "q-btn__content text-center col items-center q-anchor--skip " +
                  s.value,
              },
              k
            )
          ),
          e.loading !== null &&
            Z.push(
              E(cn, { name: "q-transition--fade" }, () =>
                e.loading === !0
                  ? [
                      E(
                        "span",
                        {
                          key: "loading",
                          class: "absolute-full flex flex-center",
                        },
                        t.loading !== void 0 ? t.loading() : [E(Un)]
                      ),
                    ]
                  : null
              )
            ),
          Al(E(c.value, j.value, Z), [[Nh, m.value, void 0, _.value]])
        );
      }
    );
  },
});
let Xh = 1,
  Gh = document.body;
function hi(e, t) {
  const n = document.createElement("div");
  if (
    ((n.id = t !== void 0 ? `q-portal--${t}--${Xh++}` : e),
    So.globalNodes !== void 0)
  ) {
    const o = So.globalNodes.class;
    o !== void 0 && (n.className = o);
  }
  return Gh.appendChild(n), n;
}
function Fa(e) {
  e.remove();
}
let eg = 0;
const mo = {},
  po = {},
  Je = {},
  Ia = {},
  tg = /^\s*$/,
  Na = [],
  gi = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "top",
    "bottom",
    "left",
    "right",
    "center",
  ],
  ng = ["top-left", "top-right", "bottom-left", "bottom-right"],
  tn = {
    positive: { icon: (e) => e.iconSet.type.positive, color: "positive" },
    negative: { icon: (e) => e.iconSet.type.negative, color: "negative" },
    warning: {
      icon: (e) => e.iconSet.type.warning,
      color: "warning",
      textColor: "dark",
    },
    info: { icon: (e) => e.iconSet.type.info, color: "info" },
    ongoing: { group: !1, timeout: 0, spinner: !0, color: "grey-8" },
  };
function ja(e, t, n) {
  if (!e) return Cn("parameter required");
  let o;
  const r = { textColor: "white" };
  if (
    (e.ignoreDefaults !== !0 && Object.assign(r, mo),
    at(e) === !1 &&
      (r.type && Object.assign(r, tn[r.type]), (e = { message: e })),
    Object.assign(r, tn[e.type || r.type], e),
    typeof r.icon == "function" && (r.icon = r.icon(t)),
    r.spinner
      ? (r.spinner === !0 && (r.spinner = Un), (r.spinner = vn(r.spinner)))
      : (r.spinner = !1),
    (r.meta = {
      hasMedia: Boolean(r.spinner !== !1 || r.icon || r.avatar),
      hasText: Ls(r.message) || Ls(r.caption),
    }),
    r.position)
  ) {
    if (gi.includes(r.position) === !1) return Cn("wrong position", e);
  } else r.position = "bottom";
  if (r.timeout === void 0) r.timeout = 5e3;
  else {
    const a = parseInt(r.timeout, 10);
    if (isNaN(a) || a < 0) return Cn("wrong timeout", e);
    r.timeout = a;
  }
  r.timeout === 0
    ? (r.progress = !1)
    : r.progress === !0 &&
      ((r.meta.progressClass =
        "q-notification__progress" +
        (r.progressClass ? ` ${r.progressClass}` : "")),
      (r.meta.progressStyle = { animationDuration: `${r.timeout + 1e3}ms` }));
  const i = (Array.isArray(e.actions) === !0 ? e.actions : [])
      .concat(
        e.ignoreDefaults !== !0 && Array.isArray(mo.actions) === !0
          ? mo.actions
          : []
      )
      .concat(
        tn[e.type] !== void 0 && Array.isArray(tn[e.type].actions) === !0
          ? tn[e.type].actions
          : []
      ),
    { closeBtn: s } = r;
  if (
    (s && i.push({ label: typeof s == "string" ? s : t.lang.label.close }),
    (r.actions = i.map(({ handler: a, noDismiss: c, ...u }) => ({
      flat: !0,
      ...u,
      onClick:
        typeof a == "function"
          ? () => {
              a(), c !== !0 && l();
            }
          : () => {
              l();
            },
    }))),
    r.multiLine === void 0 && (r.multiLine = r.actions.length > 1),
    Object.assign(r.meta, {
      class:
        `q-notification row items-stretch q-notification--${
          r.multiLine === !0 ? "multi-line" : "standard"
        }` +
        (r.color !== void 0 ? ` bg-${r.color}` : "") +
        (r.textColor !== void 0 ? ` text-${r.textColor}` : "") +
        (r.classes !== void 0 ? ` ${r.classes}` : ""),
      wrapperClass:
        "q-notification__wrapper col relative-position border-radius-inherit " +
        (r.multiLine === !0
          ? "column no-wrap justify-center"
          : "row items-center"),
      contentClass:
        "q-notification__content row items-center" +
        (r.multiLine === !0 ? "" : " col"),
      leftClass: r.meta.hasText === !0 ? "additional" : "single",
      attrs: { role: "alert", ...r.attrs },
    }),
    r.group === !1
      ? ((r.group = void 0), (r.meta.group = void 0))
      : ((r.group === void 0 || r.group === !0) &&
          (r.group = [r.message, r.caption, r.multiline]
            .concat(r.actions.map((a) => `${a.label}*${a.icon}`))
            .join("|")),
        (r.meta.group = r.group + "|" + r.position)),
    r.actions.length === 0
      ? (r.actions = void 0)
      : (r.meta.actionsClass =
          "q-notification__actions row items-center " +
          (r.multiLine === !0 ? "justify-end" : "col-auto") +
          (r.meta.hasMedia === !0
            ? " q-notification__actions--with-media"
            : "")),
    n !== void 0)
  ) {
    n.notif.meta.timer &&
      (clearTimeout(n.notif.meta.timer), (n.notif.meta.timer = void 0)),
      (r.meta.uid = n.notif.meta.uid);
    const a = Je[r.position].value.indexOf(n.notif);
    Je[r.position].value[a] = r;
  } else {
    const a = po[r.meta.group];
    if (a === void 0) {
      if (
        ((r.meta.uid = eg++),
        (r.meta.badge = 1),
        ["left", "right", "center"].indexOf(r.position) !== -1)
      )
        Je[r.position].value.splice(
          Math.floor(Je[r.position].value.length / 2),
          0,
          r
        );
      else {
        const c = r.position.indexOf("top") > -1 ? "unshift" : "push";
        Je[r.position].value[c](r);
      }
      r.group !== void 0 && (po[r.meta.group] = r);
    } else {
      if (
        (a.meta.timer && (clearTimeout(a.meta.timer), (a.meta.timer = void 0)),
        r.badgePosition !== void 0)
      ) {
        if (ng.includes(r.badgePosition) === !1)
          return Cn("wrong badgePosition", e);
      } else
        r.badgePosition = `top-${
          r.position.indexOf("left") > -1 ? "right" : "left"
        }`;
      (r.meta.uid = a.meta.uid),
        (r.meta.badge = a.meta.badge + 1),
        (r.meta.badgeClass =
          `q-notification__badge q-notification__badge--${r.badgePosition}` +
          (r.badgeColor !== void 0 ? ` bg-${r.badgeColor}` : "") +
          (r.badgeTextColor !== void 0 ? ` text-${r.badgeTextColor}` : "") +
          (r.badgeClass ? ` ${r.badgeClass}` : ""));
      const c = Je[r.position].value.indexOf(a);
      Je[r.position].value[c] = po[r.meta.group] = r;
    }
  }
  const l = () => {
    og(r), (o = void 0);
  };
  if (
    (r.timeout > 0 &&
      (r.meta.timer = setTimeout(() => {
        (r.meta.timer = void 0), l();
      }, r.timeout + 1e3)),
    r.group !== void 0)
  )
    return (a) => {
      a !== void 0
        ? Cn("trying to update a grouped one which is forbidden", e)
        : l();
    };
  if (((o = { dismiss: l, config: e, notif: r }), n !== void 0)) {
    Object.assign(n, o);
    return;
  }
  return (a) => {
    if (o !== void 0)
      if (a === void 0) o.dismiss();
      else {
        const c = Object.assign({}, o.config, a, {
          group: !1,
          position: r.position,
        });
        ja(c, t, o);
      }
  };
}
function og(e) {
  e.meta.timer && (clearTimeout(e.meta.timer), (e.meta.timer = void 0));
  const t = Je[e.position].value.indexOf(e);
  if (t !== -1) {
    e.group !== void 0 && delete po[e.meta.group];
    const n = Na["" + e.meta.uid];
    if (n) {
      const { width: o, height: r } = getComputedStyle(n);
      (n.style.left = `${n.offsetLeft}px`),
        (n.style.width = o),
        (n.style.height = r);
    }
    Je[e.position].value.splice(t, 1),
      typeof e.onDismiss == "function" && e.onDismiss();
  }
}
function Ls(e) {
  return e != null && tg.test(e) !== !0;
}
function Cn(e, t) {
  return console.error(`Notify: ${e}`, t), !1;
}
function rg() {
  return $e({
    name: "QNotifications",
    devtools: { hide: !0 },
    setup() {
      return () =>
        E(
          "div",
          { class: "q-notifications" },
          gi.map((e) =>
            E(
              Tf,
              {
                key: e,
                class: Ia[e],
                tag: "div",
                name: `q-notification--${e}`,
              },
              () =>
                Je[e].value.map((t) => {
                  const n = t.meta,
                    o = [];
                  if (
                    (n.hasMedia === !0 &&
                      (t.spinner !== !1
                        ? o.push(
                            E(t.spinner, {
                              class:
                                "q-notification__spinner q-notification__spinner--" +
                                n.leftClass,
                              color: t.spinnerColor,
                              size: t.spinnerSize,
                            })
                          )
                        : t.icon
                        ? o.push(
                            E(pt, {
                              class:
                                "q-notification__icon q-notification__icon--" +
                                n.leftClass,
                              name: t.icon,
                              color: t.iconColor,
                              size: t.iconSize,
                              role: "img",
                            })
                          )
                        : t.avatar &&
                          o.push(
                            E(
                              Oh,
                              {
                                class:
                                  "q-notification__avatar q-notification__avatar--" +
                                  n.leftClass,
                              },
                              () =>
                                E("img", {
                                  src: t.avatar,
                                  "aria-hidden": "true",
                                })
                            )
                          )),
                    n.hasText === !0)
                  ) {
                    let i;
                    const s = { class: "q-notification__message col" };
                    if (t.html === !0)
                      s.innerHTML = t.caption
                        ? `<div>${t.message}</div><div class="q-notification__caption">${t.caption}</div>`
                        : t.message;
                    else {
                      const l = [t.message];
                      i = t.caption
                        ? [
                            E("div", l),
                            E("div", { class: "q-notification__caption" }, [
                              t.caption,
                            ]),
                          ]
                        : l;
                    }
                    o.push(E("div", s, i));
                  }
                  const r = [E("div", { class: n.contentClass }, o)];
                  return (
                    t.progress === !0 &&
                      r.push(
                        E("div", {
                          key: `${n.uid}|p|${n.badge}`,
                          class: n.progressClass,
                          style: n.progressStyle,
                        })
                      ),
                    t.actions !== void 0 &&
                      r.push(
                        E(
                          "div",
                          { class: n.actionsClass },
                          t.actions.map((i) => E(Br, i))
                        )
                      ),
                    n.badge > 1 &&
                      r.push(
                        E(
                          "div",
                          {
                            key: `${n.uid}|${n.badge}`,
                            class: t.meta.badgeClass,
                            style: t.badgeStyle,
                          },
                          [n.badge]
                        )
                      ),
                    E(
                      "div",
                      {
                        ref: (i) => {
                          Na["" + n.uid] = i;
                        },
                        key: n.uid,
                        class: n.class,
                        ...n.attrs,
                      },
                      [E("div", { class: n.wrapperClass }, r)]
                    )
                  );
                })
            )
          )
        );
    },
  });
}
var ig = {
  setDefaults(e) {
    at(e) === !0 && Object.assign(mo, e);
  },
  registerType(e, t) {
    at(t) === !0 && (tn[e] = t);
  },
  install({ $q: e, parentApp: t }) {
    if (
      ((e.notify = this.create = (n) => ja(n, e)),
      (e.notify.setDefaults = this.setDefaults),
      (e.notify.registerType = this.registerType),
      e.config.notify !== void 0 && this.setDefaults(e.config.notify),
      this.__installed !== !0)
    ) {
      gi.forEach((o) => {
        Je[o] = he([]);
        const r =
            ["left", "center", "right"].includes(o) === !0
              ? "center"
              : o.indexOf("top") > -1
              ? "top"
              : "bottom",
          i =
            o.indexOf("left") > -1
              ? "start"
              : o.indexOf("right") > -1
              ? "end"
              : "center",
          s = ["left", "right"].includes(o)
            ? `items-${o === "left" ? "start" : "end"} justify-center`
            : o === "center"
            ? "flex-center"
            : `items-${i}`;
        Ia[
          o
        ] = `q-notifications__list q-notifications__list--${r} fixed column no-wrap ${s}`;
      });
      const n = hi("q-notify");
      ma(rg(), t).mount(n);
    }
  },
};
function sg(e) {
  return ld(e) === !0
    ? "__q_date|" + e.toUTCString()
    : ad(e) === !0
    ? "__q_expr|" + e.source
    : typeof e == "number"
    ? "__q_numb|" + e
    : typeof e == "boolean"
    ? "__q_bool|" + (e ? "1" : "0")
    : typeof e == "string"
    ? "__q_strn|" + e
    : typeof e == "function"
    ? "__q_strn|" + e.toString()
    : e === Object(e)
    ? "__q_objt|" + JSON.stringify(e)
    : e;
}
function lg(e) {
  if (e.length < 9) return e;
  const n = e.substring(0, 8),
    o = e.substring(9);
  switch (n) {
    case "__q_date":
      return new Date(o);
    case "__q_expr":
      return new RegExp(o);
    case "__q_numb":
      return Number(o);
    case "__q_bool":
      return Boolean(o === "1");
    case "__q_strn":
      return "" + o;
    case "__q_objt":
      return JSON.parse(o);
    default:
      return e;
  }
}
function ag() {
  const e = () => null;
  return {
    has: () => !1,
    getLength: () => 0,
    getItem: e,
    getIndex: e,
    getKey: e,
    getAll: () => {},
    getAllKeys: () => [],
    set: Pt,
    remove: Pt,
    clear: Pt,
    isEmpty: () => !0,
  };
}
function ug(e) {
  const t = window[e + "Storage"],
    n = (o) => {
      const r = t.getItem(o);
      return r ? lg(r) : null;
    };
  return {
    has: (o) => t.getItem(o) !== null,
    getLength: () => t.length,
    getItem: n,
    getIndex: (o) => (o < t.length ? n(t.key(o)) : null),
    getKey: (o) => (o < t.length ? t.key(o) : null),
    getAll: () => {
      let o;
      const r = {},
        i = t.length;
      for (let s = 0; s < i; s++) (o = t.key(s)), (r[o] = n(o));
      return r;
    },
    getAllKeys: () => {
      const o = [],
        r = t.length;
      for (let i = 0; i < r; i++) o.push(t.key(i));
      return o;
    },
    set: (o, r) => {
      t.setItem(o, sg(r));
    },
    remove: (o) => {
      t.removeItem(o);
    },
    clear: () => {
      t.clear();
    },
    isEmpty: () => t.length === 0,
  };
}
const Va = we.has.webStorage === !1 ? ag() : ug("local"),
  Da = {
    install({ $q: e }) {
      e.localStorage = Va;
    },
  };
Object.assign(Da, Va);
function cg(e, t, n) {
  let o;
  function r() {
    o !== void 0 && (qr.remove(o), (o = void 0));
  }
  return (
    We(() => {
      e.value === !0 && r();
    }),
    {
      removeFromHistory: r,
      addToHistory() {
        (o = { condition: () => n.value === !0, handler: t }), qr.add(o);
      },
    }
  );
}
function fg() {
  let e = null;
  const t = ke();
  function n() {
    e !== null && (clearTimeout(e), (e = null));
  }
  return (
    Fo(n),
    We(n),
    {
      removeTimeout: n,
      registerTimeout(o, r) {
        n(), La(t) === !1 && (e = setTimeout(o, r));
      },
    }
  );
}
function dg() {
  let e;
  const t = ke();
  function n() {
    e = void 0;
  }
  return (
    Fo(n),
    We(n),
    {
      removeTick: n,
      registerTick(o) {
        (e = o),
          je(() => {
            e === o && (La(t) === !1 && e(), (e = void 0));
          });
      },
    }
  );
}
const hg = {
    modelValue: { type: Boolean, default: null },
    "onUpdate:modelValue": [Function, Array],
  },
  gg = ["beforeShow", "show", "beforeHide", "hide"];
function mg({
  showing: e,
  canShow: t,
  hideOnRouteChange: n,
  handleShow: o,
  handleHide: r,
  processOnMount: i,
}) {
  const s = ke(),
    { props: l, emit: a, proxy: c } = s;
  let u;
  function d(m) {
    e.value === !0 ? y(m) : f(m);
  }
  function f(m) {
    if (
      l.disable === !0 ||
      (m !== void 0 && m.qAnchorHandled === !0) ||
      (t !== void 0 && t(m) !== !0)
    )
      return;
    const _ = l["onUpdate:modelValue"] !== void 0;
    _ === !0 &&
      (a("update:modelValue", !0),
      (u = m),
      je(() => {
        u === m && (u = void 0);
      })),
      (l.modelValue === null || _ === !1) && p(m);
  }
  function p(m) {
    e.value !== !0 &&
      ((e.value = !0), a("beforeShow", m), o !== void 0 ? o(m) : a("show", m));
  }
  function y(m) {
    if (l.disable === !0) return;
    const _ = l["onUpdate:modelValue"] !== void 0;
    _ === !0 &&
      (a("update:modelValue", !1),
      (u = m),
      je(() => {
        u === m && (u = void 0);
      })),
      (l.modelValue === null || _ === !1) && T(m);
  }
  function T(m) {
    e.value !== !1 &&
      ((e.value = !1), a("beforeHide", m), r !== void 0 ? r(m) : a("hide", m));
  }
  function q(m) {
    l.disable === !0 && m === !0
      ? l["onUpdate:modelValue"] !== void 0 && a("update:modelValue", !1)
      : (m === !0) !== e.value && (m === !0 ? p : T)(u);
  }
  be(() => l.modelValue, q),
    n !== void 0 &&
      $a(s) === !0 &&
      be(
        () => c.$route.fullPath,
        () => {
          n.value === !0 && e.value === !0 && y();
        }
      ),
    i === !0 &&
      Ut(() => {
        q(l.modelValue);
      });
  const M = { show: f, hide: y, toggle: d };
  return Object.assign(c, M), M;
}
const pg = {
  transitionShow: { type: String, default: "fade" },
  transitionHide: { type: String, default: "fade" },
  transitionDuration: { type: [String, Number], default: 300 },
};
function vg(e, t = () => {}, n = () => {}) {
  return {
    transitionProps: R(() => {
      const o = `q-transition--${e.transitionShow || t()}`,
        r = `q-transition--${e.transitionHide || n()}`;
      return {
        appear: !0,
        enterFromClass: `${o}-enter-from`,
        enterActiveClass: `${o}-enter-active`,
        enterToClass: `${o}-enter-to`,
        leaveFromClass: `${r}-leave-from`,
        leaveActiveClass: `${r}-leave-active`,
        leaveToClass: `${r}-leave-to`,
      };
    }),
    transitionStyle: R(
      () => `--q-transition-duration: ${e.transitionDuration}ms`
    ),
  };
}
let Nt = [],
  Wn = [];
function Ha(e) {
  Wn = Wn.filter((t) => t !== e);
}
function bg(e) {
  Ha(e), Wn.push(e);
}
function Bs(e) {
  Ha(e), Wn.length === 0 && Nt.length !== 0 && (Nt[Nt.length - 1](), (Nt = []));
}
function mi(e) {
  Wn.length === 0 ? e() : Nt.push(e);
}
function yg(e) {
  Nt = Nt.filter((t) => t !== e);
}
const vo = [];
function Nm(e) {
  return vo.find((t) => t.contentEl !== null && t.contentEl.contains(e));
}
function _g(e, t) {
  do {
    if (e.$options.name === "QMenu") {
      if ((e.hide(t), e.$props.separateClosePopup === !0)) return go(e);
    } else if (e.__qPortal === !0) {
      const n = go(e);
      return n !== void 0 && n.$options.name === "QPopupProxy"
        ? (e.hide(t), n)
        : e;
    }
    e = go(e);
  } while (e != null);
}
function jm(e, t, n) {
  for (; n !== 0 && e !== void 0 && e !== null; ) {
    if (e.__qPortal === !0) {
      if ((n--, e.$options.name === "QMenu")) {
        e = _g(e, t);
        continue;
      }
      e.hide(t);
    }
    e = go(e);
  }
}
function wg(e) {
  for (e = e.parent; e != null; ) {
    if (e.type.name === "QGlobalDialog") return !0;
    if (e.type.name === "QDialog" || e.type.name === "QMenu") return !1;
    e = e.parent;
  }
  return !1;
}
function xg(e, t, n, o) {
  const r = he(!1),
    i = he(!1);
  let s = null;
  const l = {},
    a = o === "dialog" && wg(e);
  function c(d) {
    if (d === !0) {
      Bs(l), (i.value = !0);
      return;
    }
    (i.value = !1),
      r.value === !1 &&
        (a === !1 && s === null && (s = hi(!1, o)),
        (r.value = !0),
        vo.push(e.proxy),
        bg(l));
  }
  function u(d) {
    if (((i.value = !1), d !== !0)) return;
    Bs(l), (r.value = !1);
    const f = vo.indexOf(e.proxy);
    f !== -1 && vo.splice(f, 1), s !== null && (Fa(s), (s = null));
  }
  return (
    ii(() => {
      u(!0);
    }),
    (e.proxy.__qPortal = !0),
    bn(e.proxy, "contentEl", () => t.value),
    {
      showPortal: c,
      hidePortal: u,
      portalIsActive: r,
      portalIsAccessible: i,
      renderPortal: () =>
        a === !0 ? n() : r.value === !0 ? [E(zc, { to: s }, n())] : void 0,
    }
  );
}
const Cg = [
  null,
  document,
  document.body,
  document.scrollingElement,
  document.documentElement,
];
function Vm(e, t) {
  let n = Bh(t);
  if (n === void 0) {
    if (e == null) return window;
    n = e.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return Cg.includes(n) ? window : n;
}
function Dm(e) {
  return (e === window ? document.body : e).scrollHeight;
}
function za(e) {
  return e === window
    ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0
    : e.scrollTop;
}
function Ka(e) {
  return e === window
    ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0
    : e.scrollLeft;
}
function Ua(e, t, n = 0) {
  const o = arguments[3] === void 0 ? performance.now() : arguments[3],
    r = za(e);
  if (n <= 0) {
    r !== t && Fr(e, t);
    return;
  }
  requestAnimationFrame((i) => {
    const s = i - o,
      l = r + ((t - r) / Math.max(s, n)) * s;
    Fr(e, l), l !== t && Ua(e, t, n - s, i);
  });
}
function Wa(e, t, n = 0) {
  const o = arguments[3] === void 0 ? performance.now() : arguments[3],
    r = Ka(e);
  if (n <= 0) {
    r !== t && Ir(e, t);
    return;
  }
  requestAnimationFrame((i) => {
    const s = i - o,
      l = r + ((t - r) / Math.max(s, n)) * s;
    Ir(e, l), l !== t && Wa(e, t, n - s, i);
  });
}
function Fr(e, t) {
  if (e === window) {
    window.scrollTo(
      window.pageXOffset || window.scrollX || document.body.scrollLeft || 0,
      t
    );
    return;
  }
  e.scrollTop = t;
}
function Ir(e, t) {
  if (e === window) {
    window.scrollTo(
      t,
      window.pageYOffset || window.scrollY || document.body.scrollTop || 0
    );
    return;
  }
  e.scrollLeft = t;
}
function Hm(e, t, n) {
  if (n) {
    Ua(e, t, n);
    return;
  }
  Fr(e, t);
}
function zm(e, t, n) {
  if (n) {
    Wa(e, t, n);
    return;
  }
  Ir(e, t);
}
let ro;
function Km() {
  if (ro !== void 0) return ro;
  const e = document.createElement("p"),
    t = document.createElement("div");
  Lr(e, { width: "100%", height: "200px" }),
    Lr(t, {
      position: "absolute",
      top: "0px",
      left: "0px",
      visibility: "hidden",
      width: "200px",
      height: "150px",
      overflow: "hidden",
    }),
    t.appendChild(e),
    document.body.appendChild(t);
  const n = e.offsetWidth;
  t.style.overflow = "scroll";
  let o = e.offsetWidth;
  return n === o && (o = t.clientWidth), t.remove(), (ro = n - o), ro;
}
function kg(e, t = !0) {
  return !e || e.nodeType !== Node.ELEMENT_NODE
    ? !1
    : t
    ? e.scrollHeight > e.clientHeight &&
      (e.classList.contains("scroll") ||
        e.classList.contains("overflow-auto") ||
        ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-y"]))
    : e.scrollWidth > e.clientWidth &&
      (e.classList.contains("scroll") ||
        e.classList.contains("overflow-auto") ||
        ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-x"]));
}
let kn = 0,
  ur,
  cr,
  Tn,
  fr = !1,
  Fs,
  Is,
  Ns,
  $t = null;
function Eg(e) {
  Sg(e) && Ke(e);
}
function Sg(e) {
  if (
    e.target === document.body ||
    e.target.classList.contains("q-layout__backdrop")
  )
    return !0;
  const t = zf(e),
    n = e.shiftKey && !e.deltaX,
    o = !n && Math.abs(e.deltaX) <= Math.abs(e.deltaY),
    r = n || o ? e.deltaY : e.deltaX;
  for (let i = 0; i < t.length; i++) {
    const s = t[i];
    if (kg(s, o))
      return o
        ? r < 0 && s.scrollTop === 0
          ? !0
          : r > 0 && s.scrollTop + s.clientHeight === s.scrollHeight
        : r < 0 && s.scrollLeft === 0
        ? !0
        : r > 0 && s.scrollLeft + s.clientWidth === s.scrollWidth;
  }
  return !0;
}
function js(e) {
  e.target === document &&
    (document.scrollingElement.scrollTop = document.scrollingElement.scrollTop);
}
function io(e) {
  fr !== !0 &&
    ((fr = !0),
    requestAnimationFrame(() => {
      fr = !1;
      const { height: t } = e.target,
        { clientHeight: n, scrollTop: o } = document.scrollingElement;
      (Tn === void 0 || t !== window.innerHeight) &&
        ((Tn = n - t), (document.scrollingElement.scrollTop = o)),
        o > Tn &&
          (document.scrollingElement.scrollTop -= Math.ceil((o - Tn) / 8));
    }));
}
function Vs(e) {
  const t = document.body,
    n = window.visualViewport !== void 0;
  if (e === "add") {
    const { overflowY: o, overflowX: r } = window.getComputedStyle(t);
    (ur = Ka(window)),
      (cr = za(window)),
      (Fs = t.style.left),
      (Is = t.style.top),
      (Ns = window.location.href),
      (t.style.left = `-${ur}px`),
      (t.style.top = `-${cr}px`),
      r !== "hidden" &&
        (r === "scroll" || t.scrollWidth > window.innerWidth) &&
        t.classList.add("q-body--force-scrollbar-x"),
      o !== "hidden" &&
        (o === "scroll" || t.scrollHeight > window.innerHeight) &&
        t.classList.add("q-body--force-scrollbar-y"),
      t.classList.add("q-body--prevent-scroll"),
      (document.qScrollPrevented = !0),
      we.is.ios === !0 &&
        (n === !0
          ? (window.scrollTo(0, 0),
            window.visualViewport.addEventListener(
              "resize",
              io,
              Be.passiveCapture
            ),
            window.visualViewport.addEventListener(
              "scroll",
              io,
              Be.passiveCapture
            ),
            window.scrollTo(0, 0))
          : window.addEventListener("scroll", js, Be.passiveCapture));
  }
  we.is.desktop === !0 &&
    we.is.mac === !0 &&
    window[`${e}EventListener`]("wheel", Eg, Be.notPassive),
    e === "remove" &&
      (we.is.ios === !0 &&
        (n === !0
          ? (window.visualViewport.removeEventListener(
              "resize",
              io,
              Be.passiveCapture
            ),
            window.visualViewport.removeEventListener(
              "scroll",
              io,
              Be.passiveCapture
            ))
          : window.removeEventListener("scroll", js, Be.passiveCapture)),
      t.classList.remove("q-body--prevent-scroll"),
      t.classList.remove("q-body--force-scrollbar-x"),
      t.classList.remove("q-body--force-scrollbar-y"),
      (document.qScrollPrevented = !1),
      (t.style.left = Fs),
      (t.style.top = Is),
      window.location.href === Ns && window.scrollTo(ur, cr),
      (Tn = void 0));
}
function Rg(e) {
  let t = "add";
  if (e === !0) {
    if ((kn++, $t !== null)) {
      clearTimeout($t), ($t = null);
      return;
    }
    if (kn > 1) return;
  } else {
    if (kn === 0 || (kn--, kn > 0)) return;
    if (((t = "remove"), we.is.ios === !0 && we.is.nativeMobile === !0)) {
      $t !== null && clearTimeout($t),
        ($t = setTimeout(() => {
          Vs(t), ($t = null);
        }, 100));
      return;
    }
  }
  Vs(t);
}
function Pg() {
  let e;
  return {
    preventBodyScroll(t) {
      t !== e && (e !== void 0 || t === !0) && ((e = t), Rg(t));
    },
  };
}
const Ht = [];
let hn;
function Tg(e) {
  hn = e.keyCode === 27;
}
function qg() {
  hn === !0 && (hn = !1);
}
function Ag(e) {
  hn === !0 && ((hn = !1), zn(e, 27) === !0 && Ht[Ht.length - 1](e));
}
function Qa(e) {
  window[e]("keydown", Tg),
    window[e]("blur", qg),
    window[e]("keyup", Ag),
    (hn = !1);
}
function Mg(e) {
  we.is.desktop === !0 &&
    (Ht.push(e), Ht.length === 1 && Qa("addEventListener"));
}
function Ds(e) {
  const t = Ht.indexOf(e);
  t > -1 && (Ht.splice(t, 1), Ht.length === 0 && Qa("removeEventListener"));
}
const zt = [];
function Ya(e) {
  zt[zt.length - 1](e);
}
function Og(e) {
  we.is.desktop === !0 &&
    (zt.push(e),
    zt.length === 1 && document.body.addEventListener("focusin", Ya));
}
function Hs(e) {
  const t = zt.indexOf(e);
  t > -1 &&
    (zt.splice(t, 1),
    zt.length === 0 && document.body.removeEventListener("focusin", Ya));
}
let so = 0;
const $g = {
    standard: "fixed-full flex-center",
    top: "fixed-top justify-center",
    bottom: "fixed-bottom justify-center",
    right: "fixed-right items-center",
    left: "fixed-left items-center",
  },
  zs = {
    standard: ["scale", "scale"],
    top: ["slide-down", "slide-up"],
    bottom: ["slide-up", "slide-down"],
    right: ["slide-left", "slide-right"],
    left: ["slide-right", "slide-left"],
  };
var Lg = $e({
  name: "QDialog",
  inheritAttrs: !1,
  props: {
    ...hg,
    ...pg,
    transitionShow: String,
    transitionHide: String,
    persistent: Boolean,
    autoClose: Boolean,
    allowFocusOutside: Boolean,
    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,
    seamless: Boolean,
    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    square: Boolean,
    position: {
      type: String,
      default: "standard",
      validator: (e) =>
        e === "standard" || ["top", "bottom", "left", "right"].includes(e),
    },
  },
  emits: [...gg, "shake", "click", "escapeKey"],
  setup(e, { slots: t, emit: n, attrs: o }) {
    const r = ke(),
      i = he(null),
      s = he(!1),
      l = he(!1);
    let a = null,
      c = null,
      u,
      d;
    const f = R(
        () =>
          e.persistent !== !0 && e.noRouteDismiss !== !0 && e.seamless !== !0
      ),
      { preventBodyScroll: p } = Pg(),
      { registerTimeout: y } = fg(),
      { registerTick: T, removeTick: q } = dg(),
      { transitionProps: M, transitionStyle: m } = vg(
        e,
        () => zs[e.position][0],
        () => zs[e.position][1]
      ),
      {
        showPortal: _,
        hidePortal: w,
        portalIsAccessible: F,
        renderPortal: j,
      } = xg(r, i, Re, "dialog"),
      { hide: V } = mg({
        showing: s,
        hideOnRouteChange: f,
        handleShow: k,
        handleHide: Z,
        processOnMount: !0,
      }),
      { addToHistory: N, removeFromHistory: C } = cg(s, V, f),
      x = R(
        () =>
          `q-dialog__inner flex no-pointer-events q-dialog__inner--${
            e.maximized === !0 ? "maximized" : "minimized"
          } q-dialog__inner--${e.position} ${$g[e.position]}` +
          (l.value === !0 ? " q-dialog__inner--animating" : "") +
          (e.fullWidth === !0 ? " q-dialog__inner--fullwidth" : "") +
          (e.fullHeight === !0 ? " q-dialog__inner--fullheight" : "") +
          (e.square === !0 ? " q-dialog__inner--square" : "")
      ),
      $ = R(() => s.value === !0 && e.seamless !== !0),
      v = R(() => (e.autoClose === !0 ? { onClick: fe } : {})),
      H = R(() => [
        `q-dialog fullscreen no-pointer-events q-dialog--${
          $.value === !0 ? "modal" : "seamless"
        }`,
        o.class,
      ]);
    be(
      () => e.maximized,
      (oe) => {
        s.value === !0 && se(oe);
      }
    ),
      be($, (oe) => {
        p(oe), oe === !0 ? (Og(ue), Mg(W)) : (Hs(ue), Ds(W));
      });
    function k(oe) {
      N(),
        (c =
          e.noRefocus === !1 && document.activeElement !== null
            ? document.activeElement
            : null),
        se(e.maximized),
        _(),
        (l.value = !0),
        e.noFocus !== !0
          ? (document.activeElement !== null && document.activeElement.blur(),
            T(Y))
          : q(),
        y(() => {
          if (r.proxy.$q.platform.is.ios === !0) {
            if (e.seamless !== !0 && document.activeElement) {
              const { top: ne, bottom: S } =
                  document.activeElement.getBoundingClientRect(),
                { innerHeight: Q } = window,
                z =
                  window.visualViewport !== void 0
                    ? window.visualViewport.height
                    : Q;
              ne > 0 &&
                S > z / 2 &&
                (document.scrollingElement.scrollTop = Math.min(
                  document.scrollingElement.scrollHeight - z,
                  S >= Q
                    ? 1 / 0
                    : Math.ceil(document.scrollingElement.scrollTop + S - z / 2)
                )),
                document.activeElement.scrollIntoView();
            }
            (d = !0), i.value.click(), (d = !1);
          }
          _(!0), (l.value = !1), n("show", oe);
        }, e.transitionDuration);
    }
    function Z(oe) {
      q(),
        C(),
        _e(!0),
        (l.value = !0),
        w(),
        c !== null &&
          ((
            (oe && oe.type.indexOf("key") === 0
              ? c.closest('[tabindex]:not([tabindex^="-"])')
              : void 0) || c
          ).focus(),
          (c = null)),
        y(() => {
          w(!0), (l.value = !1), n("hide", oe);
        }, e.transitionDuration);
    }
    function Y(oe) {
      mi(() => {
        let ne = i.value;
        ne === null ||
          ne.contains(document.activeElement) === !0 ||
          ((ne =
            (oe !== "" ? ne.querySelector(oe) : null) ||
            ne.querySelector(
              "[autofocus][tabindex], [data-autofocus][tabindex]"
            ) ||
            ne.querySelector(
              "[autofocus] [tabindex], [data-autofocus] [tabindex]"
            ) ||
            ne.querySelector("[autofocus], [data-autofocus]") ||
            ne),
          ne.focus({ preventScroll: !0 }));
      });
    }
    function A(oe) {
      oe && typeof oe.focus == "function"
        ? oe.focus({ preventScroll: !0 })
        : Y(),
        n("shake");
      const ne = i.value;
      ne !== null &&
        (ne.classList.remove("q-animate--scale"),
        ne.classList.add("q-animate--scale"),
        a !== null && clearTimeout(a),
        (a = setTimeout(() => {
          (a = null),
            i.value !== null && (ne.classList.remove("q-animate--scale"), Y());
        }, 170)));
    }
    function W() {
      e.seamless !== !0 &&
        (e.persistent === !0 || e.noEscDismiss === !0
          ? e.maximized !== !0 && e.noShake !== !0 && A()
          : (n("escapeKey"), V()));
    }
    function _e(oe) {
      a !== null && (clearTimeout(a), (a = null)),
        (oe === !0 || s.value === !0) &&
          (se(!1), e.seamless !== !0 && (p(!1), Hs(ue), Ds(W))),
        oe !== !0 && (c = null);
    }
    function se(oe) {
      oe === !0
        ? u !== !0 &&
          (so < 1 && document.body.classList.add("q-body--dialog"),
          so++,
          (u = !0))
        : u === !0 &&
          (so < 2 && document.body.classList.remove("q-body--dialog"),
          so--,
          (u = !1));
    }
    function fe(oe) {
      d !== !0 && (V(oe), n("click", oe));
    }
    function L(oe) {
      e.persistent !== !0 && e.noBackdropDismiss !== !0
        ? V(oe)
        : e.noShake !== !0 && A();
    }
    function ue(oe) {
      e.allowFocusOutside !== !0 &&
        F.value === !0 &&
        Fh(i.value, oe.target) !== !0 &&
        Y('[tabindex]:not([tabindex="-1"])');
    }
    Object.assign(r.proxy, {
      focus: Y,
      shake: A,
      __updateRefocusTarget(oe) {
        c = oe || null;
      },
    }),
      We(_e);
    function Re() {
      return E(
        "div",
        {
          role: "dialog",
          "aria-modal": $.value === !0 ? "true" : "false",
          ...o,
          class: H.value,
        },
        [
          E(cn, { name: "q-transition--fade", appear: !0 }, () =>
            $.value === !0
              ? E("div", {
                  class: "q-dialog__backdrop fixed-full",
                  style: m.value,
                  "aria-hidden": "true",
                  tabindex: -1,
                  onClick: L,
                })
              : null
          ),
          E(cn, M.value, () =>
            s.value === !0
              ? E(
                  "div",
                  {
                    ref: i,
                    class: x.value,
                    style: m.value,
                    tabindex: -1,
                    ...v.value,
                  },
                  tt(t.default)
                )
              : null
          ),
        ]
      );
    }
    return j;
  },
});
const Wt = { dark: { type: Boolean, default: null } };
function Qt(e, t) {
  return R(() => (e.dark === null ? t.dark.isActive : e.dark));
}
var Bg = $e({
    name: "QCard",
    props: {
      ...Wt,
      tag: { type: String, default: "div" },
      square: Boolean,
      flat: Boolean,
      bordered: Boolean,
    },
    setup(e, { slots: t }) {
      const {
          proxy: { $q: n },
        } = ke(),
        o = Qt(e, n),
        r = R(
          () =>
            "q-card" +
            (o.value === !0 ? " q-card--dark q-dark" : "") +
            (e.bordered === !0 ? " q-card--bordered" : "") +
            (e.square === !0 ? " q-card--square no-border-radius" : "") +
            (e.flat === !0 ? " q-card--flat no-shadow" : "")
        );
      return () => E(e.tag, { class: r.value }, tt(t.default));
    },
  }),
  En = $e({
    name: "QCardSection",
    props: { tag: { type: String, default: "div" }, horizontal: Boolean },
    setup(e, { slots: t }) {
      const n = R(
        () =>
          `q-card__section q-card__section--${
            e.horizontal === !0 ? "horiz row no-wrap" : "vert"
          }`
      );
      return () => E(e.tag, { class: n.value }, tt(t.default));
    },
  }),
  Fg = $e({
    name: "QCardActions",
    props: { ...Aa, vertical: Boolean },
    setup(e, { slots: t }) {
      const n = Ma(e),
        o = R(
          () =>
            `q-card__actions ${n.value} q-card__actions--${
              e.vertical === !0 ? "vert column" : "horiz row"
            }`
        );
      return () => E("div", { class: o.value }, tt(t.default));
    },
  });
const Ig = {
    true: "inset",
    item: "item-inset",
    "item-thumbnail": "item-thumbnail-inset",
  },
  dr = { xs: 2, sm: 4, md: 8, lg: 16, xl: 24 };
var Ks = $e({
  name: "QSeparator",
  props: {
    ...Wt,
    spaced: [Boolean, String],
    inset: [Boolean, String],
    vertical: Boolean,
    color: String,
    size: String,
  },
  setup(e) {
    const t = ke(),
      n = Qt(e, t.proxy.$q),
      o = R(() => (e.vertical === !0 ? "vertical" : "horizontal")),
      r = R(() => ` q-separator--${o.value}`),
      i = R(() => (e.inset !== !1 ? `${r.value}-${Ig[e.inset]}` : "")),
      s = R(
        () =>
          `q-separator${r.value}${i.value}` +
          (e.color !== void 0 ? ` bg-${e.color}` : "") +
          (n.value === !0 ? " q-separator--dark" : "")
      ),
      l = R(() => {
        const a = {};
        if (
          (e.size !== void 0 &&
            (a[e.vertical === !0 ? "width" : "height"] = e.size),
          e.spaced !== !1)
        ) {
          const c =
              e.spaced === !0
                ? `${dr.md}px`
                : e.spaced in dr
                ? `${dr[e.spaced]}px`
                : e.spaced,
            u = e.vertical === !0 ? ["Left", "Right"] : ["Top", "Bottom"];
          a[`margin${u[0]}`] = a[`margin${u[1]}`] = c;
        }
        return a;
      });
    return () =>
      E("hr", { class: s.value, style: l.value, "aria-orientation": o.value });
  },
});
function Ng({ validate: e, resetValidation: t, requiresQForm: n }) {
  const o = ut(id, !1);
  if (o !== !1) {
    const { props: r, proxy: i } = ke();
    Object.assign(i, { validate: e, resetValidation: t }),
      be(
        () => r.disable,
        (s) => {
          s === !0
            ? (typeof t == "function" && t(), o.unbindComponent(i))
            : o.bindComponent(i);
        }
      ),
      Ut(() => {
        r.disable !== !0 && o.bindComponent(i);
      }),
      We(() => {
        r.disable !== !0 && o.unbindComponent(i);
      });
  } else n === !0 && console.error("Parent QForm not found on useFormChild()!");
}
const Us = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,
  Ws = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,
  Qs = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
  lo =
    /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,
  ao =
    /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,
  hr = {
    date: (e) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),
    time: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),
    fulltime: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),
    timeOrFulltime: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),
    email: (e) =>
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e
      ),
    hexColor: (e) => Us.test(e),
    hexaColor: (e) => Ws.test(e),
    hexOrHexaColor: (e) => Qs.test(e),
    rgbColor: (e) => lo.test(e),
    rgbaColor: (e) => ao.test(e),
    rgbOrRgbaColor: (e) => lo.test(e) || ao.test(e),
    hexOrRgbColor: (e) => Us.test(e) || lo.test(e),
    hexaOrRgbaColor: (e) => Ws.test(e) || ao.test(e),
    anyColor: (e) => Qs.test(e) || lo.test(e) || ao.test(e),
  },
  jg = [!0, !1, "ondemand"],
  Vg = {
    modelValue: {},
    error: { type: Boolean, default: null },
    errorMessage: String,
    noErrorIcon: Boolean,
    rules: Array,
    reactiveRules: Boolean,
    lazyRules: { type: [Boolean, String], validator: (e) => jg.includes(e) },
  };
function Dg(e, t) {
  const { props: n, proxy: o } = ke(),
    r = he(!1),
    i = he(null),
    s = he(null);
  Ng({ validate: y, resetValidation: p });
  let l = 0,
    a;
  const c = R(
      () => n.rules !== void 0 && n.rules !== null && n.rules.length !== 0
    ),
    u = R(() => n.disable !== !0 && c.value === !0),
    d = R(() => n.error === !0 || r.value === !0),
    f = R(() =>
      typeof n.errorMessage == "string" && n.errorMessage.length !== 0
        ? n.errorMessage
        : i.value
    );
  be(
    () => n.modelValue,
    () => {
      T();
    }
  ),
    be(
      () => n.reactiveRules,
      (M) => {
        M === !0
          ? a === void 0 &&
            (a = be(
              () => n.rules,
              () => {
                T(!0);
              }
            ))
          : a !== void 0 && (a(), (a = void 0));
      },
      { immediate: !0 }
    ),
    be(e, (M) => {
      M === !0
        ? s.value === null && (s.value = !1)
        : s.value === !1 &&
          ((s.value = !0),
          u.value === !0 &&
            n.lazyRules !== "ondemand" &&
            t.value === !1 &&
            q());
    });
  function p() {
    l++,
      (t.value = !1),
      (s.value = null),
      (r.value = !1),
      (i.value = null),
      q.cancel();
  }
  function y(M = n.modelValue) {
    if (u.value !== !0) return !0;
    const m = ++l,
      _ =
        t.value !== !0
          ? () => {
              s.value = !0;
            }
          : () => {},
      w = (j, V) => {
        j === !0 && _(), (r.value = j), (i.value = V || null), (t.value = !1);
      },
      F = [];
    for (let j = 0; j < n.rules.length; j++) {
      const V = n.rules[j];
      let N;
      if (
        (typeof V == "function"
          ? (N = V(M, hr))
          : typeof V == "string" && hr[V] !== void 0 && (N = hr[V](M)),
        N === !1 || typeof N == "string")
      )
        return w(!0, N), !1;
      N !== !0 && N !== void 0 && F.push(N);
    }
    return F.length === 0
      ? (w(!1), !0)
      : ((t.value = !0),
        Promise.all(F).then(
          (j) => {
            if (j === void 0 || Array.isArray(j) === !1 || j.length === 0)
              return m === l && w(!1), !0;
            const V = j.find((N) => N === !1 || typeof N == "string");
            return m === l && w(V !== void 0, V), V === void 0;
          },
          (j) => (m === l && (console.error(j), w(!0)), !1)
        ));
  }
  function T(M) {
    u.value === !0 &&
      n.lazyRules !== "ondemand" &&
      (s.value === !0 || (n.lazyRules !== !0 && M !== !0)) &&
      q();
  }
  const q = ua(y, 0);
  return (
    We(() => {
      a !== void 0 && a(), q.cancel();
    }),
    Object.assign(o, { resetValidation: p, validate: y }),
    bn(o, "hasError", () => d.value),
    {
      isDirtyModel: s,
      hasRules: c,
      hasError: d,
      errorMessage: f,
      validate: y,
      resetValidation: p,
    }
  );
}
const Ys = /^on[A-Z]/;
function Hg(e, t) {
  const n = { listeners: he({}), attributes: he({}) };
  function o() {
    const r = {},
      i = {};
    for (const s in e)
      s !== "class" && s !== "style" && Ys.test(s) === !1 && (r[s] = e[s]);
    for (const s in t.props) Ys.test(s) === !0 && (i[s] = t.props[s]);
    (n.attributes.value = r), (n.listeners.value = i);
  }
  return Fl(o), o(), n;
}
let gr,
  uo = 0;
const Te = new Array(256);
for (let e = 0; e < 256; e++) Te[e] = (e + 256).toString(16).substring(1);
const zg = (() => {
    const e =
      typeof crypto != "undefined"
        ? crypto
        : typeof window != "undefined"
        ? window.crypto || window.msCrypto
        : void 0;
    if (e !== void 0) {
      if (e.randomBytes !== void 0) return e.randomBytes;
      if (e.getRandomValues !== void 0)
        return (t) => {
          const n = new Uint8Array(t);
          return e.getRandomValues(n), n;
        };
    }
    return (t) => {
      const n = [];
      for (let o = t; o > 0; o--) n.push(Math.floor(Math.random() * 256));
      return n;
    };
  })(),
  Zs = 4096;
function Kg() {
  (gr === void 0 || uo + 16 > Zs) && ((uo = 0), (gr = zg(Zs)));
  const e = Array.prototype.slice.call(gr, uo, (uo += 16));
  return (
    (e[6] = (e[6] & 15) | 64),
    (e[8] = (e[8] & 63) | 128),
    Te[e[0]] +
      Te[e[1]] +
      Te[e[2]] +
      Te[e[3]] +
      "-" +
      Te[e[4]] +
      Te[e[5]] +
      "-" +
      Te[e[6]] +
      Te[e[7]] +
      "-" +
      Te[e[8]] +
      Te[e[9]] +
      "-" +
      Te[e[10]] +
      Te[e[11]] +
      Te[e[12]] +
      Te[e[13]] +
      Te[e[14]] +
      Te[e[15]]
  );
}
function Nr(e) {
  return e === void 0 ? `f_${Kg()}` : e;
}
function jr(e) {
  return e != null && ("" + e).length !== 0;
}
const Ug = {
    ...Wt,
    ...Vg,
    label: String,
    stackLabel: Boolean,
    hint: String,
    hideHint: Boolean,
    prefix: String,
    suffix: String,
    labelColor: String,
    color: String,
    bgColor: String,
    filled: Boolean,
    outlined: Boolean,
    borderless: Boolean,
    standout: [Boolean, String],
    square: Boolean,
    loading: Boolean,
    labelSlot: Boolean,
    bottomSlots: Boolean,
    hideBottomSpace: Boolean,
    rounded: Boolean,
    dense: Boolean,
    itemAligned: Boolean,
    counter: Boolean,
    clearable: Boolean,
    clearIcon: String,
    disable: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    for: String,
    maxlength: [Number, String],
  },
  Wg = [
    "update:modelValue",
    "clear",
    "focus",
    "blur",
    "popupShow",
    "popupHide",
  ];
function Qg() {
  const { props: e, attrs: t, proxy: n, vnode: o } = ke();
  return {
    isDark: Qt(e, n.$q),
    editable: R(() => e.disable !== !0 && e.readonly !== !0),
    innerLoading: he(!1),
    focused: he(!1),
    hasPopupOpen: !1,
    splitAttrs: Hg(t, o),
    targetUid: he(Nr(e.for)),
    rootRef: he(null),
    targetRef: he(null),
    controlRef: he(null),
  };
}
function Yg(e) {
  const { props: t, emit: n, slots: o, attrs: r, proxy: i } = ke(),
    { $q: s } = i;
  let l = null;
  e.hasValue === void 0 && (e.hasValue = R(() => jr(t.modelValue))),
    e.emitValue === void 0 &&
      (e.emitValue = (A) => {
        n("update:modelValue", A);
      }),
    e.controlEvents === void 0 &&
      (e.controlEvents = { onFocusin: C, onFocusout: x }),
    Object.assign(e, {
      clearValue: $,
      onControlFocusin: C,
      onControlFocusout: x,
      focus: V,
    }),
    e.computedCounter === void 0 &&
      (e.computedCounter = R(() => {
        if (t.counter !== !1) {
          const A =
              typeof t.modelValue == "string" || typeof t.modelValue == "number"
                ? ("" + t.modelValue).length
                : Array.isArray(t.modelValue) === !0
                ? t.modelValue.length
                : 0,
            W = t.maxlength !== void 0 ? t.maxlength : t.maxValues;
          return A + (W !== void 0 ? " / " + W : "");
        }
      }));
  const {
      isDirtyModel: a,
      hasRules: c,
      hasError: u,
      errorMessage: d,
      resetValidation: f,
    } = Dg(e.focused, e.innerLoading),
    p =
      e.floatingLabel !== void 0
        ? R(
            () =>
              t.stackLabel === !0 ||
              e.focused.value === !0 ||
              e.floatingLabel.value === !0
          )
        : R(
            () =>
              t.stackLabel === !0 ||
              e.focused.value === !0 ||
              e.hasValue.value === !0
          ),
    y = R(
      () =>
        t.bottomSlots === !0 ||
        t.hint !== void 0 ||
        c.value === !0 ||
        t.counter === !0 ||
        t.error !== null
    ),
    T = R(() =>
      t.filled === !0
        ? "filled"
        : t.outlined === !0
        ? "outlined"
        : t.borderless === !0
        ? "borderless"
        : t.standout
        ? "standout"
        : "standard"
    ),
    q = R(
      () =>
        `q-field row no-wrap items-start q-field--${T.value}` +
        (e.fieldClass !== void 0 ? ` ${e.fieldClass.value}` : "") +
        (t.rounded === !0 ? " q-field--rounded" : "") +
        (t.square === !0 ? " q-field--square" : "") +
        (p.value === !0 ? " q-field--float" : "") +
        (m.value === !0 ? " q-field--labeled" : "") +
        (t.dense === !0 ? " q-field--dense" : "") +
        (t.itemAligned === !0 ? " q-field--item-aligned q-item-type" : "") +
        (e.isDark.value === !0 ? " q-field--dark" : "") +
        (e.getControl === void 0 ? " q-field--auto-height" : "") +
        (e.focused.value === !0 ? " q-field--focused" : "") +
        (u.value === !0 ? " q-field--error" : "") +
        (u.value === !0 || e.focused.value === !0
          ? " q-field--highlighted"
          : "") +
        (t.hideBottomSpace !== !0 && y.value === !0
          ? " q-field--with-bottom"
          : "") +
        (t.disable === !0
          ? " q-field--disabled"
          : t.readonly === !0
          ? " q-field--readonly"
          : "")
    ),
    M = R(
      () =>
        "q-field__control relative-position row no-wrap" +
        (t.bgColor !== void 0 ? ` bg-${t.bgColor}` : "") +
        (u.value === !0
          ? " text-negative"
          : typeof t.standout == "string" &&
            t.standout.length !== 0 &&
            e.focused.value === !0
          ? ` ${t.standout}`
          : t.color !== void 0
          ? ` text-${t.color}`
          : "")
    ),
    m = R(() => t.labelSlot === !0 || t.label !== void 0),
    _ = R(
      () =>
        "q-field__label no-pointer-events absolute ellipsis" +
        (t.labelColor !== void 0 && u.value !== !0
          ? ` text-${t.labelColor}`
          : "")
    ),
    w = R(() => ({
      id: e.targetUid.value,
      editable: e.editable.value,
      focused: e.focused.value,
      floatingLabel: p.value,
      modelValue: t.modelValue,
      emitValue: e.emitValue,
    })),
    F = R(() => {
      const A = { for: e.targetUid.value };
      return (
        t.disable === !0
          ? (A["aria-disabled"] = "true")
          : t.readonly === !0 && (A["aria-readonly"] = "true"),
        A
      );
    });
  be(
    () => t.for,
    (A) => {
      e.targetUid.value = Nr(A);
    }
  );
  function j() {
    const A = document.activeElement;
    let W = e.targetRef !== void 0 && e.targetRef.value;
    W &&
      (A === null || A.id !== e.targetUid.value) &&
      (W.hasAttribute("tabindex") === !0 || (W = W.querySelector("[tabindex]")),
      W && W !== A && W.focus({ preventScroll: !0 }));
  }
  function V() {
    mi(j);
  }
  function N() {
    yg(j);
    const A = document.activeElement;
    A !== null && e.rootRef.value.contains(A) && A.blur();
  }
  function C(A) {
    l !== null && (clearTimeout(l), (l = null)),
      e.editable.value === !0 &&
        e.focused.value === !1 &&
        ((e.focused.value = !0), n("focus", A));
  }
  function x(A, W) {
    l !== null && clearTimeout(l),
      (l = setTimeout(() => {
        (l = null),
          !(
            document.hasFocus() === !0 &&
            (e.hasPopupOpen === !0 ||
              e.controlRef === void 0 ||
              e.controlRef.value === null ||
              e.controlRef.value.contains(document.activeElement) !== !1)
          ) &&
            (e.focused.value === !0 && ((e.focused.value = !1), n("blur", A)),
            W !== void 0 && W());
      }));
  }
  function $(A) {
    Ke(A),
      s.platform.is.mobile !== !0
        ? (
            (e.targetRef !== void 0 && e.targetRef.value) ||
            e.rootRef.value
          ).focus()
        : e.rootRef.value.contains(document.activeElement) === !0 &&
          document.activeElement.blur(),
      t.type === "file" && (e.inputRef.value.value = null),
      n("update:modelValue", null),
      n("clear", t.modelValue),
      je(() => {
        f(), s.platform.is.mobile !== !0 && (a.value = !1);
      });
  }
  function v() {
    const A = [];
    return (
      o.prepend !== void 0 &&
        A.push(
          E(
            "div",
            {
              class:
                "q-field__prepend q-field__marginal row no-wrap items-center",
              key: "prepend",
              onClick: Et,
            },
            o.prepend()
          )
        ),
      A.push(
        E(
          "div",
          {
            class:
              "q-field__control-container col relative-position row no-wrap q-anchor--skip",
          },
          H()
        )
      ),
      u.value === !0 &&
        t.noErrorIcon === !1 &&
        A.push(
          Z("error", [
            E(pt, { name: s.iconSet.field.error, color: "negative" }),
          ])
        ),
      t.loading === !0 || e.innerLoading.value === !0
        ? A.push(
            Z(
              "inner-loading-append",
              o.loading !== void 0 ? o.loading() : [E(Un, { color: t.color })]
            )
          )
        : t.clearable === !0 &&
          e.hasValue.value === !0 &&
          e.editable.value === !0 &&
          A.push(
            Z("inner-clearable-append", [
              E(pt, {
                class: "q-field__focusable-action",
                tag: "button",
                name: t.clearIcon || s.iconSet.field.clear,
                tabindex: 0,
                type: "button",
                "aria-hidden": null,
                role: null,
                onClick: $,
              }),
            ])
          ),
      o.append !== void 0 &&
        A.push(
          E(
            "div",
            {
              class:
                "q-field__append q-field__marginal row no-wrap items-center",
              key: "append",
              onClick: Et,
            },
            o.append()
          )
        ),
      e.getInnerAppend !== void 0 &&
        A.push(Z("inner-append", e.getInnerAppend())),
      e.getControlChild !== void 0 && A.push(e.getControlChild()),
      A
    );
  }
  function H() {
    const A = [];
    return (
      t.prefix !== void 0 &&
        t.prefix !== null &&
        A.push(
          E(
            "div",
            { class: "q-field__prefix no-pointer-events row items-center" },
            t.prefix
          )
        ),
      e.getShadowControl !== void 0 &&
        e.hasShadow.value === !0 &&
        A.push(e.getShadowControl()),
      e.getControl !== void 0
        ? A.push(e.getControl())
        : o.rawControl !== void 0
        ? A.push(o.rawControl())
        : o.control !== void 0 &&
          A.push(
            E(
              "div",
              {
                ref: e.targetRef,
                class: "q-field__native row",
                tabindex: -1,
                ...e.splitAttrs.attributes.value,
                "data-autofocus": t.autofocus === !0 || void 0,
              },
              o.control(w.value)
            )
          ),
      m.value === !0 &&
        A.push(E("div", { class: _.value }, tt(o.label, t.label))),
      t.suffix !== void 0 &&
        t.suffix !== null &&
        A.push(
          E(
            "div",
            { class: "q-field__suffix no-pointer-events row items-center" },
            t.suffix
          )
        ),
      A.concat(tt(o.default))
    );
  }
  function k() {
    let A, W;
    u.value === !0
      ? d.value !== null
        ? ((A = [E("div", { role: "alert" }, d.value)]),
          (W = `q--slot-error-${d.value}`))
        : ((A = tt(o.error)), (W = "q--slot-error"))
      : (t.hideHint !== !0 || e.focused.value === !0) &&
        (t.hint !== void 0
          ? ((A = [E("div", t.hint)]), (W = `q--slot-hint-${t.hint}`))
          : ((A = tt(o.hint)), (W = "q--slot-hint")));
    const _e = t.counter === !0 || o.counter !== void 0;
    if (t.hideBottomSpace === !0 && _e === !1 && A === void 0) return;
    const se = E("div", { key: W, class: "q-field__messages col" }, A);
    return E(
      "div",
      {
        class:
          "q-field__bottom row items-start q-field__bottom--" +
          (t.hideBottomSpace !== !0 ? "animated" : "stale"),
        onClick: Et,
      },
      [
        t.hideBottomSpace === !0
          ? se
          : E(cn, { name: "q-transition--field-message" }, () => se),
        _e === !0
          ? E(
              "div",
              { class: "q-field__counter" },
              o.counter !== void 0 ? o.counter() : e.computedCounter.value
            )
          : null,
      ]
    );
  }
  function Z(A, W) {
    return W === null
      ? null
      : E(
          "div",
          {
            key: A,
            class:
              "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip",
          },
          W
        );
  }
  let Y = !1;
  return (
    Fo(() => {
      Y = !0;
    }),
    Ll(() => {
      Y === !0 && t.autofocus === !0 && i.focus();
    }),
    Ut(() => {
      qt.value === !0 && t.for === void 0 && (e.targetUid.value = Nr()),
        t.autofocus === !0 && i.focus();
    }),
    We(() => {
      l !== null && clearTimeout(l);
    }),
    Object.assign(i, { focus: V, blur: N }),
    function () {
      const W =
        e.getControl === void 0 && o.control === void 0
          ? {
              ...e.splitAttrs.attributes.value,
              "data-autofocus": t.autofocus === !0 || void 0,
              ...F.value,
            }
          : F.value;
      return E(
        "label",
        { ref: e.rootRef, class: [q.value, r.class], style: r.style, ...W },
        [
          o.before !== void 0
            ? E(
                "div",
                {
                  class:
                    "q-field__before q-field__marginal row no-wrap items-center",
                  onClick: Et,
                },
                o.before()
              )
            : null,
          E(
            "div",
            { class: "q-field__inner relative-position col self-stretch" },
            [
              E(
                "div",
                {
                  ref: e.controlRef,
                  class: M.value,
                  tabindex: -1,
                  ...e.controlEvents,
                },
                v()
              ),
              y.value === !0 ? k() : null,
            ]
          ),
          o.after !== void 0
            ? E(
                "div",
                {
                  class:
                    "q-field__after q-field__marginal row no-wrap items-center",
                  onClick: Et,
                },
                o.after()
              )
            : null,
        ]
      );
    }
  );
}
const Js = {
    date: "####/##/##",
    datetime: "####/##/## ##:##",
    time: "##:##",
    fulltime: "##:##:##",
    phone: "(###) ### - ####",
    card: "#### #### #### ####",
  },
  Po = {
    "#": { pattern: "[\\d]", negate: "[^\\d]" },
    S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
    N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
    A: {
      pattern: "[a-zA-Z]",
      negate: "[^a-zA-Z]",
      transform: (e) => e.toLocaleUpperCase(),
    },
    a: {
      pattern: "[a-zA-Z]",
      negate: "[^a-zA-Z]",
      transform: (e) => e.toLocaleLowerCase(),
    },
    X: {
      pattern: "[0-9a-zA-Z]",
      negate: "[^0-9a-zA-Z]",
      transform: (e) => e.toLocaleUpperCase(),
    },
    x: {
      pattern: "[0-9a-zA-Z]",
      negate: "[^0-9a-zA-Z]",
      transform: (e) => e.toLocaleLowerCase(),
    },
  },
  Za = Object.keys(Po);
Za.forEach((e) => {
  Po[e].regex = new RegExp(Po[e].pattern);
});
const Zg = new RegExp(
    "\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + Za.join("") + "])|(.)",
    "g"
  ),
  Xs = /[.*+?^${}()|[\]\\]/g,
  Se = String.fromCharCode(1),
  Jg = {
    mask: String,
    reverseFillMask: Boolean,
    fillMask: [Boolean, String],
    unmaskedValue: Boolean,
  };
function Xg(e, t, n, o) {
  let r, i, s, l, a, c;
  const u = he(null),
    d = he(p());
  function f() {
    return (
      e.autogrow === !0 ||
      ["textarea", "text", "search", "url", "tel", "password"].includes(e.type)
    );
  }
  be(() => e.type + e.autogrow, T),
    be(
      () => e.mask,
      (C) => {
        if (C !== void 0) q(d.value, !0);
        else {
          const x = V(d.value);
          T(), e.modelValue !== x && t("update:modelValue", x);
        }
      }
    ),
    be(
      () => e.fillMask + e.reverseFillMask,
      () => {
        u.value === !0 && q(d.value, !0);
      }
    ),
    be(
      () => e.unmaskedValue,
      () => {
        u.value === !0 && q(d.value);
      }
    );
  function p() {
    if ((T(), u.value === !0)) {
      const C = F(V(e.modelValue));
      return e.fillMask !== !1 ? N(C) : C;
    }
    return e.modelValue;
  }
  function y(C) {
    if (C < r.length) return r.slice(-C);
    let x = "",
      $ = r;
    const v = $.indexOf(Se);
    if (v > -1) {
      for (let H = C - $.length; H > 0; H--) x += Se;
      $ = $.slice(0, v) + x + $.slice(v);
    }
    return $;
  }
  function T() {
    if (
      ((u.value = e.mask !== void 0 && e.mask.length !== 0 && f()),
      u.value === !1)
    ) {
      (l = void 0), (r = ""), (i = "");
      return;
    }
    const C = Js[e.mask] === void 0 ? e.mask : Js[e.mask],
      x =
        typeof e.fillMask == "string" && e.fillMask.length !== 0
          ? e.fillMask.slice(0, 1)
          : "_",
      $ = x.replace(Xs, "\\$&"),
      v = [],
      H = [],
      k = [];
    let Z = e.reverseFillMask === !0,
      Y = "",
      A = "";
    C.replace(Zg, (fe, L, ue, Re, oe) => {
      if (Re !== void 0) {
        const ne = Po[Re];
        k.push(ne),
          (A = ne.negate),
          Z === !0 &&
            (H.push(
              "(?:" +
                A +
                "+)?(" +
                ne.pattern +
                "+)?(?:" +
                A +
                "+)?(" +
                ne.pattern +
                "+)?"
            ),
            (Z = !1)),
          H.push("(?:" + A + "+)?(" + ne.pattern + ")?");
      } else if (ue !== void 0)
        (Y = "\\" + (ue === "\\" ? "" : ue)),
          k.push(ue),
          v.push("([^" + Y + "]+)?" + Y + "?");
      else {
        const ne = L !== void 0 ? L : oe;
        (Y = ne === "\\" ? "\\\\\\\\" : ne.replace(Xs, "\\\\$&")),
          k.push(ne),
          v.push("([^" + Y + "]+)?" + Y + "?");
      }
    });
    const W = new RegExp(
        "^" +
          v.join("") +
          "(" +
          (Y === "" ? "." : "[^" + Y + "]") +
          "+)?" +
          (Y === "" ? "" : "[" + Y + "]*") +
          "$"
      ),
      _e = H.length - 1,
      se = H.map((fe, L) =>
        L === 0 && e.reverseFillMask === !0
          ? new RegExp("^" + $ + "*" + fe)
          : L === _e
          ? new RegExp(
              "^" +
                fe +
                "(" +
                (A === "" ? "." : A) +
                "+)?" +
                (e.reverseFillMask === !0 ? "$" : $ + "*")
            )
          : new RegExp("^" + fe)
      );
    (s = k),
      (l = (fe) => {
        const L = W.exec(
          e.reverseFillMask === !0 ? fe : fe.slice(0, k.length + 1)
        );
        L !== null && (fe = L.slice(1).join(""));
        const ue = [],
          Re = se.length;
        for (let oe = 0, ne = fe; oe < Re; oe++) {
          const S = se[oe].exec(ne);
          if (S === null) break;
          (ne = ne.slice(S.shift().length)), ue.push(...S);
        }
        return ue.length !== 0 ? ue.join("") : fe;
      }),
      (r = k.map((fe) => (typeof fe == "string" ? fe : Se)).join("")),
      (i = r.split(Se).join(x));
  }
  function q(C, x, $) {
    const v = o.value,
      H = v.selectionEnd,
      k = v.value.length - H,
      Z = V(C);
    x === !0 && T();
    const Y = F(Z),
      A = e.fillMask !== !1 ? N(Y) : Y,
      W = d.value !== A;
    v.value !== A && (v.value = A),
      W === !0 && (d.value = A),
      document.activeElement === v &&
        je(() => {
          if (A === i) {
            const se = e.reverseFillMask === !0 ? i.length : 0;
            v.setSelectionRange(se, se, "forward");
            return;
          }
          if ($ === "insertFromPaste" && e.reverseFillMask !== !0) {
            const se = v.selectionEnd;
            let fe = H - 1;
            for (let L = a; L <= fe && L < se; L++) r[L] !== Se && fe++;
            m.right(v, fe);
            return;
          }
          if (
            ["deleteContentBackward", "deleteContentForward"].indexOf($) > -1
          ) {
            const se =
              e.reverseFillMask === !0
                ? H === 0
                  ? A.length > Y.length
                    ? 1
                    : 0
                  : Math.max(
                      0,
                      A.length - (A === i ? 0 : Math.min(Y.length, k) + 1)
                    ) + 1
                : H;
            v.setSelectionRange(se, se, "forward");
            return;
          }
          if (e.reverseFillMask === !0)
            if (W === !0) {
              const se = Math.max(
                0,
                A.length - (A === i ? 0 : Math.min(Y.length, k + 1))
              );
              se === 1 && H === 1
                ? v.setSelectionRange(se, se, "forward")
                : m.rightReverse(v, se);
            } else {
              const se = A.length - k;
              v.setSelectionRange(se, se, "backward");
            }
          else if (W === !0) {
            const se = Math.max(0, r.indexOf(Se), Math.min(Y.length, H) - 1);
            m.right(v, se);
          } else {
            const se = H - 1;
            m.right(v, se);
          }
        });
    const _e = e.unmaskedValue === !0 ? V(A) : A;
    String(e.modelValue) !== _e && n(_e, !0);
  }
  function M(C, x, $) {
    const v = F(V(C.value));
    (x = Math.max(0, r.indexOf(Se), Math.min(v.length, x))),
      (a = x),
      C.setSelectionRange(x, $, "forward");
  }
  const m = {
    left(C, x) {
      const $ = r.slice(x - 1).indexOf(Se) === -1;
      let v = Math.max(0, x - 1);
      for (; v >= 0; v--)
        if (r[v] === Se) {
          (x = v), $ === !0 && x++;
          break;
        }
      if (v < 0 && r[x] !== void 0 && r[x] !== Se) return m.right(C, 0);
      x >= 0 && C.setSelectionRange(x, x, "backward");
    },
    right(C, x) {
      const $ = C.value.length;
      let v = Math.min($, x + 1);
      for (; v <= $; v++)
        if (r[v] === Se) {
          x = v;
          break;
        } else r[v - 1] === Se && (x = v);
      if (v > $ && r[x - 1] !== void 0 && r[x - 1] !== Se) return m.left(C, $);
      C.setSelectionRange(x, x, "forward");
    },
    leftReverse(C, x) {
      const $ = y(C.value.length);
      let v = Math.max(0, x - 1);
      for (; v >= 0; v--)
        if ($[v - 1] === Se) {
          x = v;
          break;
        } else if ($[v] === Se && ((x = v), v === 0)) break;
      if (v < 0 && $[x] !== void 0 && $[x] !== Se) return m.rightReverse(C, 0);
      x >= 0 && C.setSelectionRange(x, x, "backward");
    },
    rightReverse(C, x) {
      const $ = C.value.length,
        v = y($),
        H = v.slice(0, x + 1).indexOf(Se) === -1;
      let k = Math.min($, x + 1);
      for (; k <= $; k++)
        if (v[k - 1] === Se) {
          (x = k), x > 0 && H === !0 && x--;
          break;
        }
      if (k > $ && v[x - 1] !== void 0 && v[x - 1] !== Se)
        return m.leftReverse(C, $);
      C.setSelectionRange(x, x, "forward");
    },
  };
  function _(C) {
    t("click", C), (c = void 0);
  }
  function w(C) {
    if ((t("keydown", C), da(C) === !0 || C.altKey === !0)) return;
    const x = o.value,
      $ = x.selectionStart,
      v = x.selectionEnd;
    if ((C.shiftKey || (c = void 0), C.keyCode === 37 || C.keyCode === 39)) {
      C.shiftKey &&
        c === void 0 &&
        (c = x.selectionDirection === "forward" ? $ : v);
      const H =
        m[
          (C.keyCode === 39 ? "right" : "left") +
            (e.reverseFillMask === !0 ? "Reverse" : "")
        ];
      if ((C.preventDefault(), H(x, c === $ ? v : $), C.shiftKey)) {
        const k = x.selectionStart;
        x.setSelectionRange(Math.min(c, k), Math.max(c, k), "forward");
      }
    } else
      C.keyCode === 8 && e.reverseFillMask !== !0 && $ === v
        ? (m.left(x, $), x.setSelectionRange(x.selectionStart, v, "backward"))
        : C.keyCode === 46 &&
          e.reverseFillMask === !0 &&
          $ === v &&
          (m.rightReverse(x, v),
          x.setSelectionRange($, x.selectionEnd, "forward"));
  }
  function F(C) {
    if (C == null || C === "") return "";
    if (e.reverseFillMask === !0) return j(C);
    const x = s;
    let $ = 0,
      v = "";
    for (let H = 0; H < x.length; H++) {
      const k = C[$],
        Z = x[H];
      if (typeof Z == "string") (v += Z), k === Z && $++;
      else if (k !== void 0 && Z.regex.test(k))
        (v += Z.transform !== void 0 ? Z.transform(k) : k), $++;
      else return v;
    }
    return v;
  }
  function j(C) {
    const x = s,
      $ = r.indexOf(Se);
    let v = C.length - 1,
      H = "";
    for (let k = x.length - 1; k >= 0 && v > -1; k--) {
      const Z = x[k];
      let Y = C[v];
      if (typeof Z == "string") (H = Z + H), Y === Z && v--;
      else if (Y !== void 0 && Z.regex.test(Y))
        do
          (H = (Z.transform !== void 0 ? Z.transform(Y) : Y) + H),
            v--,
            (Y = C[v]);
        while ($ === k && Y !== void 0 && Z.regex.test(Y));
      else return H;
    }
    return H;
  }
  function V(C) {
    return typeof C != "string" || l === void 0
      ? typeof C == "number"
        ? l("" + C)
        : C
      : l(C);
  }
  function N(C) {
    return i.length - C.length <= 0
      ? C
      : e.reverseFillMask === !0 && C.length !== 0
      ? i.slice(0, -C.length) + C
      : C + i.slice(C.length);
  }
  return {
    innerValue: d,
    hasMask: u,
    moveCursorForPaste: M,
    updateMaskValue: q,
    onMaskedKeydown: w,
    onMaskedClick: _,
  };
}
const pi = { name: String };
function Ja(e = {}) {
  return (t, n, o) => {
    t[n](E("input", { class: "hidden" + (o || ""), ...e.value }));
  };
}
function Gg(e) {
  return R(() => e.name || e.for);
}
function em(e, t) {
  function n() {
    const o = e.modelValue;
    try {
      const r =
        "DataTransfer" in window
          ? new DataTransfer()
          : "ClipboardEvent" in window
          ? new ClipboardEvent("").clipboardData
          : void 0;
      return (
        Object(o) === o &&
          ("length" in o ? Array.from(o) : [o]).forEach((i) => {
            r.items.add(i);
          }),
        { files: r.files }
      );
    } catch {
      return { files: void 0 };
    }
  }
  return R(
    t === !0
      ? () => {
          if (e.type === "file") return n();
        }
      : n
  );
}
const tm =
    /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/,
  nm =
    /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u,
  om = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,
  rm = /[a-z0-9_ -]$/i;
function im(e) {
  return function (n) {
    if (n.type === "compositionend" || n.type === "change") {
      if (n.target.qComposing !== !0) return;
      (n.target.qComposing = !1), e(n);
    } else
      n.type === "compositionupdate" &&
        n.target.qComposing !== !0 &&
        typeof n.data == "string" &&
        (we.is.firefox === !0
          ? rm.test(n.data) === !1
          : tm.test(n.data) === !0 ||
            nm.test(n.data) === !0 ||
            om.test(n.data) === !0) === !0 &&
        (n.target.qComposing = !0);
  };
}
var sm = $e({
  name: "QInput",
  inheritAttrs: !1,
  props: {
    ...Ug,
    ...Jg,
    ...pi,
    modelValue: { required: !1 },
    shadowText: String,
    type: { type: String, default: "text" },
    debounce: [String, Number],
    autogrow: Boolean,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object],
  },
  emits: [...Wg, "paste", "change", "keydown", "click", "animationend"],
  setup(e, { emit: t, attrs: n }) {
    const { proxy: o } = ke(),
      { $q: r } = o,
      i = {};
    let s = NaN,
      l,
      a,
      c = null,
      u;
    const d = he(null),
      f = Gg(e),
      {
        innerValue: p,
        hasMask: y,
        moveCursorForPaste: T,
        updateMaskValue: q,
        onMaskedKeydown: M,
        onMaskedClick: m,
      } = Xg(e, t, Y, d),
      _ = em(e, !0),
      w = R(() => jr(p.value)),
      F = im(k),
      j = Qg(),
      V = R(() => e.type === "textarea" || e.autogrow === !0),
      N = R(
        () =>
          V.value === !0 ||
          ["text", "search", "url", "tel", "password"].includes(e.type)
      ),
      C = R(() => {
        const L = {
          ...j.splitAttrs.listeners.value,
          onInput: k,
          onPaste: H,
          onChange: W,
          onBlur: _e,
          onFocus: ko,
        };
        return (
          (L.onCompositionstart =
            L.onCompositionupdate =
            L.onCompositionend =
              F),
          y.value === !0 && ((L.onKeydown = M), (L.onClick = m)),
          e.autogrow === !0 && (L.onAnimationend = Z),
          L
        );
      }),
      x = R(() => {
        const L = {
          tabindex: 0,
          "data-autofocus": e.autofocus === !0 || void 0,
          rows: e.type === "textarea" ? 6 : void 0,
          "aria-label": e.label,
          name: f.value,
          ...j.splitAttrs.attributes.value,
          id: j.targetUid.value,
          maxlength: e.maxlength,
          disabled: e.disable === !0,
          readonly: e.readonly === !0,
        };
        return (
          V.value === !1 && (L.type = e.type),
          e.autogrow === !0 && (L.rows = 1),
          L
        );
      });
    be(
      () => e.type,
      () => {
        d.value && (d.value.value = e.modelValue);
      }
    ),
      be(
        () => e.modelValue,
        (L) => {
          if (y.value === !0) {
            if (a === !0 && ((a = !1), String(L) === s)) return;
            q(L);
          } else
            p.value !== L &&
              ((p.value = L),
              e.type === "number" &&
                i.hasOwnProperty("value") === !0 &&
                (l === !0 ? (l = !1) : delete i.value));
          e.autogrow === !0 && je(A);
        }
      ),
      be(
        () => e.autogrow,
        (L) => {
          L === !0
            ? je(A)
            : d.value !== null && n.rows > 0 && (d.value.style.height = "auto");
        }
      ),
      be(
        () => e.dense,
        () => {
          e.autogrow === !0 && je(A);
        }
      );
    function $() {
      mi(() => {
        const L = document.activeElement;
        d.value !== null &&
          d.value !== L &&
          (L === null || L.id !== j.targetUid.value) &&
          d.value.focus({ preventScroll: !0 });
      });
    }
    function v() {
      d.value !== null && d.value.select();
    }
    function H(L) {
      if (y.value === !0 && e.reverseFillMask !== !0) {
        const ue = L.target;
        T(ue, ue.selectionStart, ue.selectionEnd);
      }
      t("paste", L);
    }
    function k(L) {
      if (!L || !L.target) return;
      if (e.type === "file") {
        t("update:modelValue", L.target.files);
        return;
      }
      const ue = L.target.value;
      if (L.target.qComposing === !0) {
        i.value = ue;
        return;
      }
      if (y.value === !0) q(ue, !1, L.inputType);
      else if ((Y(ue), N.value === !0 && L.target === document.activeElement)) {
        const { selectionStart: Re, selectionEnd: oe } = L.target;
        Re !== void 0 &&
          oe !== void 0 &&
          je(() => {
            L.target === document.activeElement &&
              ue.indexOf(L.target.value) === 0 &&
              L.target.setSelectionRange(Re, oe);
          });
      }
      e.autogrow === !0 && A();
    }
    function Z(L) {
      t("animationend", L), A();
    }
    function Y(L, ue) {
      (u = () => {
        (c = null),
          e.type !== "number" &&
            i.hasOwnProperty("value") === !0 &&
            delete i.value,
          e.modelValue !== L &&
            s !== L &&
            ((s = L),
            ue === !0 && (a = !0),
            t("update:modelValue", L),
            je(() => {
              s === L && (s = NaN);
            })),
          (u = void 0);
      }),
        e.type === "number" && ((l = !0), (i.value = L)),
        e.debounce !== void 0
          ? (c !== null && clearTimeout(c),
            (i.value = L),
            (c = setTimeout(u, e.debounce)))
          : u();
    }
    function A() {
      requestAnimationFrame(() => {
        const L = d.value;
        if (L !== null) {
          const ue = L.parentNode.style,
            { scrollTop: Re } = L,
            { overflowY: oe, maxHeight: ne } =
              r.platform.is.firefox === !0 ? {} : window.getComputedStyle(L),
            S = oe !== void 0 && oe !== "scroll";
          S === !0 && (L.style.overflowY = "hidden"),
            (ue.marginBottom = L.scrollHeight - 1 + "px"),
            (L.style.height = "1px"),
            (L.style.height = L.scrollHeight + "px"),
            S === !0 &&
              (L.style.overflowY =
                parseInt(ne, 10) < L.scrollHeight ? "auto" : "hidden"),
            (ue.marginBottom = ""),
            (L.scrollTop = Re);
        }
      });
    }
    function W(L) {
      F(L),
        c !== null && (clearTimeout(c), (c = null)),
        u !== void 0 && u(),
        t("change", L.target.value);
    }
    function _e(L) {
      L !== void 0 && ko(L),
        c !== null && (clearTimeout(c), (c = null)),
        u !== void 0 && u(),
        (l = !1),
        (a = !1),
        delete i.value,
        e.type !== "file" &&
          setTimeout(() => {
            d.value !== null &&
              (d.value.value = p.value !== void 0 ? p.value : "");
          });
    }
    function se() {
      return i.hasOwnProperty("value") === !0
        ? i.value
        : p.value !== void 0
        ? p.value
        : "";
    }
    We(() => {
      _e();
    }),
      Ut(() => {
        e.autogrow === !0 && A();
      }),
      Object.assign(j, {
        innerValue: p,
        fieldClass: R(
          () =>
            `q-${V.value === !0 ? "textarea" : "input"}` +
            (e.autogrow === !0 ? " q-textarea--autogrow" : "")
        ),
        hasShadow: R(
          () =>
            e.type !== "file" &&
            typeof e.shadowText == "string" &&
            e.shadowText.length !== 0
        ),
        inputRef: d,
        emitValue: Y,
        hasValue: w,
        floatingLabel: R(
          () =>
            (w.value === !0 &&
              (e.type !== "number" || isNaN(p.value) === !1)) ||
            jr(e.displayValue)
        ),
        getControl: () =>
          E(V.value === !0 ? "textarea" : "input", {
            ref: d,
            class: ["q-field__native q-placeholder", e.inputClass],
            style: e.inputStyle,
            ...x.value,
            ...C.value,
            ...(e.type !== "file" ? { value: se() } : _.value),
          }),
        getShadowControl: () =>
          E(
            "div",
            {
              class:
                "q-field__native q-field__shadow absolute-bottom no-pointer-events" +
                (V.value === !0 ? "" : " text-no-wrap"),
            },
            [E("span", { class: "invisible" }, se()), E("span", e.shadowText)]
          ),
      });
    const fe = Yg(j);
    return (
      Object.assign(o, {
        focus: $,
        select: v,
        getNativeElement: () => d.value,
      }),
      bn(o, "nativeEl", () => d.value),
      fe
    );
  },
});
function Xa(e, t) {
  const n = he(null),
    o = R(() =>
      e.disable === !0
        ? null
        : E("span", { ref: n, class: "no-outline", tabindex: -1 })
    );
  function r(i) {
    const s = t.value;
    i !== void 0 && i.type.indexOf("key") === 0
      ? s !== null &&
        document.activeElement !== s &&
        s.contains(document.activeElement) === !0 &&
        s.focus()
      : n.value !== null &&
        (i === void 0 || (s !== null && s.contains(i.target) === !0)) &&
        n.value.focus();
  }
  return { refocusTargetEl: o, refocusTarget: r };
}
var Ga = { xs: 30, sm: 35, md: 40, lg: 50, xl: 60 };
const lm = E(
  "svg",
  {
    key: "svg",
    class: "q-radio__bg absolute non-selectable",
    viewBox: "0 0 24 24",
  },
  [
    E("path", {
      d: "M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12",
    }),
    E("path", {
      class: "q-radio__check",
      d: "M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6",
    }),
  ]
);
var am = $e({
  name: "QRadio",
  props: {
    ...Wt,
    ...Yn,
    ...pi,
    modelValue: { required: !0 },
    val: { required: !0 },
    label: String,
    leftLabel: Boolean,
    checkedIcon: String,
    uncheckedIcon: String,
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    disable: Boolean,
    tabindex: [String, Number],
  },
  emits: ["update:modelValue"],
  setup(e, { slots: t, emit: n }) {
    const { proxy: o } = ke(),
      r = Qt(e, o.$q),
      i = Zn(e, Ga),
      s = he(null),
      { refocusTargetEl: l, refocusTarget: a } = Xa(e, s),
      c = R(() => ie(e.modelValue) === ie(e.val)),
      u = R(
        () =>
          "q-radio cursor-pointer no-outline row inline no-wrap items-center" +
          (e.disable === !0 ? " disabled" : "") +
          (r.value === !0 ? " q-radio--dark" : "") +
          (e.dense === !0 ? " q-radio--dense" : "") +
          (e.leftLabel === !0 ? " reverse" : "")
      ),
      d = R(() => {
        const _ =
          e.color !== void 0 && (e.keepColor === !0 || c.value === !0)
            ? ` text-${e.color}`
            : "";
        return `q-radio__inner relative-position q-radio__inner--${
          c.value === !0 ? "truthy" : "falsy"
        }${_}`;
      }),
      f = R(() => (c.value === !0 ? e.checkedIcon : e.uncheckedIcon) || null),
      p = R(() => (e.disable === !0 ? -1 : e.tabindex || 0)),
      y = R(() => {
        const _ = { type: "radio" };
        return (
          e.name !== void 0 &&
            Object.assign(_, {
              ".checked": c.value === !0,
              "^checked": c.value === !0 ? "checked" : void 0,
              name: e.name,
              value: e.val,
            }),
          _
        );
      }),
      T = Ja(y);
    function q(_) {
      _ !== void 0 && (Ke(_), a(_)),
        e.disable !== !0 && c.value !== !0 && n("update:modelValue", e.val, _);
    }
    function M(_) {
      (_.keyCode === 13 || _.keyCode === 32) && Ke(_);
    }
    function m(_) {
      (_.keyCode === 13 || _.keyCode === 32) && q(_);
    }
    return (
      Object.assign(o, { set: q }),
      () => {
        const _ =
          f.value !== null
            ? [
                E(
                  "div",
                  {
                    key: "icon",
                    class:
                      "q-radio__icon-container absolute-full flex flex-center no-wrap",
                  },
                  [E(pt, { class: "q-radio__icon", name: f.value })]
                ),
              ]
            : [lm];
        e.disable !== !0 &&
          T(_, "unshift", " q-radio__native q-ma-none q-pa-none");
        const w = [
          E(
            "div",
            { class: d.value, style: i.value, "aria-hidden": "true" },
            _
          ),
        ];
        l.value !== null && w.push(l.value);
        const F = e.label !== void 0 ? It(t.default, [e.label]) : tt(t.default);
        return (
          F !== void 0 &&
            w.push(E("div", { class: "q-radio__label q-anchor--skip" }, F)),
          E(
            "div",
            {
              ref: s,
              class: u.value,
              tabindex: p.value,
              role: "radio",
              "aria-label": e.label,
              "aria-checked": c.value === !0 ? "true" : "false",
              "aria-disabled": e.disable === !0 ? "true" : void 0,
              onClick: q,
              onKeydown: M,
              onKeyup: m,
            },
            w
          )
        );
      }
    );
  },
});
const eu = {
    ...Wt,
    ...Yn,
    ...pi,
    modelValue: { required: !0, default: null },
    val: {},
    trueValue: { default: !0 },
    falseValue: { default: !1 },
    indeterminateValue: { default: null },
    checkedIcon: String,
    uncheckedIcon: String,
    indeterminateIcon: String,
    toggleOrder: { type: String, validator: (e) => e === "tf" || e === "ft" },
    toggleIndeterminate: Boolean,
    label: String,
    leftLabel: Boolean,
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    disable: Boolean,
    tabindex: [String, Number],
  },
  tu = ["update:modelValue"];
function nu(e, t) {
  const { props: n, slots: o, emit: r, proxy: i } = ke(),
    { $q: s } = i,
    l = Qt(n, s),
    a = he(null),
    { refocusTargetEl: c, refocusTarget: u } = Xa(n, a),
    d = Zn(n, Ga),
    f = R(() => n.val !== void 0 && Array.isArray(n.modelValue)),
    p = R(() => {
      const v = ie(n.val);
      return f.value === !0 ? n.modelValue.findIndex((H) => ie(H) === v) : -1;
    }),
    y = R(() =>
      f.value === !0 ? p.value > -1 : ie(n.modelValue) === ie(n.trueValue)
    ),
    T = R(() =>
      f.value === !0 ? p.value === -1 : ie(n.modelValue) === ie(n.falseValue)
    ),
    q = R(() => y.value === !1 && T.value === !1),
    M = R(() => (n.disable === !0 ? -1 : n.tabindex || 0)),
    m = R(
      () =>
        `q-${e} cursor-pointer no-outline row inline no-wrap items-center` +
        (n.disable === !0 ? " disabled" : "") +
        (l.value === !0 ? ` q-${e}--dark` : "") +
        (n.dense === !0 ? ` q-${e}--dense` : "") +
        (n.leftLabel === !0 ? " reverse" : "")
    ),
    _ = R(() => {
      const v = y.value === !0 ? "truthy" : T.value === !0 ? "falsy" : "indet",
        H =
          n.color !== void 0 &&
          (n.keepColor === !0 ||
            (e === "toggle" ? y.value === !0 : T.value !== !0))
            ? ` text-${n.color}`
            : "";
      return `q-${e}__inner relative-position non-selectable q-${e}__inner--${v}${H}`;
    }),
    w = R(() => {
      const v = { type: "checkbox" };
      return (
        n.name !== void 0 &&
          Object.assign(v, {
            ".checked": y.value,
            "^checked": y.value === !0 ? "checked" : void 0,
            name: n.name,
            value: f.value === !0 ? n.val : n.trueValue,
          }),
        v
      );
    }),
    F = Ja(w),
    j = R(() => {
      const v = {
        tabindex: M.value,
        role: e === "toggle" ? "switch" : "checkbox",
        "aria-label": n.label,
        "aria-checked":
          q.value === !0 ? "mixed" : y.value === !0 ? "true" : "false",
      };
      return n.disable === !0 && (v["aria-disabled"] = "true"), v;
    });
  function V(v) {
    v !== void 0 && (Ke(v), u(v)),
      n.disable !== !0 && r("update:modelValue", N(), v);
  }
  function N() {
    if (f.value === !0) {
      if (y.value === !0) {
        const v = n.modelValue.slice();
        return v.splice(p.value, 1), v;
      }
      return n.modelValue.concat([n.val]);
    }
    if (y.value === !0) {
      if (n.toggleOrder !== "ft" || n.toggleIndeterminate === !1)
        return n.falseValue;
    } else if (T.value === !0) {
      if (n.toggleOrder === "ft" || n.toggleIndeterminate === !1)
        return n.trueValue;
    } else return n.toggleOrder !== "ft" ? n.trueValue : n.falseValue;
    return n.indeterminateValue;
  }
  function C(v) {
    (v.keyCode === 13 || v.keyCode === 32) && Ke(v);
  }
  function x(v) {
    (v.keyCode === 13 || v.keyCode === 32) && V(v);
  }
  const $ = t(y, q);
  return (
    Object.assign(i, { toggle: V }),
    () => {
      const v = $();
      n.disable !== !0 &&
        F(v, "unshift", ` q-${e}__native absolute q-ma-none q-pa-none`);
      const H = [
        E("div", { class: _.value, style: d.value, "aria-hidden": "true" }, v),
      ];
      c.value !== null && H.push(c.value);
      const k = n.label !== void 0 ? It(o.default, [n.label]) : tt(o.default);
      return (
        k !== void 0 &&
          H.push(E("div", { class: `q-${e}__label q-anchor--skip` }, k)),
        E(
          "div",
          {
            ref: a,
            class: m.value,
            ...j.value,
            onClick: V,
            onKeydown: C,
            onKeyup: x,
          },
          H
        )
      );
    }
  );
}
const um = E("div", { key: "svg", class: "q-checkbox__bg absolute" }, [
  E(
    "svg",
    { class: "q-checkbox__svg fit absolute-full", viewBox: "0 0 24 24" },
    [
      E("path", {
        class: "q-checkbox__truthy",
        fill: "none",
        d: "M1.73,12.91 8.1,19.28 22.79,4.59",
      }),
      E("path", { class: "q-checkbox__indet", d: "M4,14H20V10H4" }),
    ]
  ),
]);
var cm = $e({
    name: "QCheckbox",
    props: eu,
    emits: tu,
    setup(e) {
      function t(n, o) {
        const r = R(
          () =>
            (n.value === !0
              ? e.checkedIcon
              : o.value === !0
              ? e.indeterminateIcon
              : e.uncheckedIcon) || null
        );
        return () =>
          r.value !== null
            ? [
                E(
                  "div",
                  {
                    key: "icon",
                    class:
                      "q-checkbox__icon-container absolute-full flex flex-center no-wrap",
                  },
                  [E(pt, { class: "q-checkbox__icon", name: r.value })]
                ),
              ]
            : [um];
      }
      return nu("checkbox", t);
    },
  }),
  fm = $e({
    name: "QToggle",
    props: { ...eu, icon: String, iconColor: String },
    emits: tu,
    setup(e) {
      function t(n, o) {
        const r = R(
            () =>
              (n.value === !0
                ? e.checkedIcon
                : o.value === !0
                ? e.indeterminateIcon
                : e.uncheckedIcon) || e.icon
          ),
          i = R(() => (n.value === !0 ? e.iconColor : null));
        return () => [
          E("div", { class: "q-toggle__track" }),
          E(
            "div",
            { class: "q-toggle__thumb absolute flex flex-center no-wrap" },
            r.value !== void 0
              ? [E(pt, { name: r.value, color: i.value })]
              : void 0
          ),
        ];
      }
      return nu("toggle", t);
    },
  });
const ou = { radio: am, checkbox: cm, toggle: fm },
  dm = Object.keys(ou);
var hm = $e({
    name: "QOptionGroup",
    props: {
      ...Wt,
      modelValue: { required: !0 },
      options: {
        type: Array,
        validator: (e) => e.every((t) => "value" in t && "label" in t),
      },
      name: String,
      type: { default: "radio", validator: (e) => dm.includes(e) },
      color: String,
      keepColor: Boolean,
      dense: Boolean,
      size: String,
      leftLabel: Boolean,
      inline: Boolean,
      disable: Boolean,
    },
    emits: ["update:modelValue"],
    setup(e, { emit: t, slots: n }) {
      const {
          proxy: { $q: o },
        } = ke(),
        r = Array.isArray(e.modelValue);
      e.type === "radio"
        ? r === !0 && console.error("q-option-group: model should not be array")
        : r === !1 &&
          console.error("q-option-group: model should be array in your case");
      const i = Qt(e, o),
        s = R(() => ou[e.type]),
        l = R(
          () =>
            "q-option-group q-gutter-x-sm" +
            (e.inline === !0 ? " q-option-group--inline" : "")
        ),
        a = R(() => {
          const u = { role: "group" };
          return (
            e.type === "radio" &&
              ((u.role = "radiogroup"),
              e.disable === !0 && (u["aria-disabled"] = "true")),
            u
          );
        });
      function c(u) {
        t("update:modelValue", u);
      }
      return () =>
        E(
          "div",
          { class: l.value, ...a.value },
          e.options.map((u, d) => {
            const f =
              n["label-" + d] !== void 0
                ? () => n["label-" + d](u)
                : n.label !== void 0
                ? () => n.label(u)
                : void 0;
            return E("div", [
              E(
                s.value,
                {
                  modelValue: e.modelValue,
                  val: u.value,
                  name: u.name === void 0 ? e.name : u.name,
                  disable: e.disable || u.disable,
                  label: f === void 0 ? u.label : null,
                  leftLabel: u.leftLabel === void 0 ? e.leftLabel : u.leftLabel,
                  color: u.color === void 0 ? e.color : u.color,
                  checkedIcon: u.checkedIcon,
                  uncheckedIcon: u.uncheckedIcon,
                  dark: u.dark || i.value,
                  size: u.size === void 0 ? e.size : u.size,
                  dense: e.dense,
                  keepColor: u.keepColor === void 0 ? e.keepColor : u.keepColor,
                  "onUpdate:modelValue": c,
                },
                f
              ),
            ]);
          })
        );
    },
  }),
  gm = $e({
    name: "DialogPlugin",
    props: {
      ...Wt,
      title: String,
      message: String,
      prompt: Object,
      options: Object,
      progress: [Boolean, Object],
      html: Boolean,
      ok: { type: [String, Object, Boolean], default: !0 },
      cancel: [String, Object, Boolean],
      focus: {
        type: String,
        default: "ok",
        validator: (e) => ["ok", "cancel", "none"].includes(e),
      },
      stackButtons: Boolean,
      color: String,
      cardClass: [String, Array, Object],
      cardStyle: [String, Array, Object],
    },
    emits: ["ok", "hide"],
    setup(e, { emit: t }) {
      const { proxy: n } = ke(),
        { $q: o } = n,
        r = Qt(e, o),
        i = he(null),
        s = he(
          e.prompt !== void 0
            ? e.prompt.model
            : e.options !== void 0
            ? e.options.model
            : void 0
        ),
        l = R(
          () =>
            "q-dialog-plugin" +
            (r.value === !0 ? " q-dialog-plugin--dark q-dark" : "") +
            (e.progress !== !1 ? " q-dialog-plugin--progress" : "")
        ),
        a = R(() => e.color || (r.value === !0 ? "amber" : "primary")),
        c = R(() =>
          e.progress === !1
            ? null
            : at(e.progress) === !0
            ? {
                component: e.progress.spinner || Un,
                props: { color: e.progress.color || a.value },
              }
            : { component: Un, props: { color: a.value } }
        ),
        u = R(() => e.prompt !== void 0 || e.options !== void 0),
        d = R(() => {
          if (u.value !== !0) return {};
          const {
            model: k,
            isValid: Z,
            items: Y,
            ...A
          } = e.prompt !== void 0 ? e.prompt : e.options;
          return A;
        }),
        f = R(() => (at(e.ok) === !0 || e.ok === !0 ? o.lang.label.ok : e.ok)),
        p = R(() =>
          at(e.cancel) === !0 || e.cancel === !0
            ? o.lang.label.cancel
            : e.cancel
        ),
        y = R(() =>
          e.prompt !== void 0
            ? e.prompt.isValid !== void 0 && e.prompt.isValid(s.value) !== !0
            : e.options !== void 0
            ? e.options.isValid !== void 0 && e.options.isValid(s.value) !== !0
            : !1
        ),
        T = R(() => ({
          color: a.value,
          label: f.value,
          ripple: !1,
          disable: y.value,
          ...(at(e.ok) === !0 ? e.ok : { flat: !0 }),
          "data-autofocus": (e.focus === "ok" && u.value !== !0) || void 0,
          onClick: _,
        })),
        q = R(() => ({
          color: a.value,
          label: p.value,
          ripple: !1,
          ...(at(e.cancel) === !0 ? e.cancel : { flat: !0 }),
          "data-autofocus": (e.focus === "cancel" && u.value !== !0) || void 0,
          onClick: w,
        }));
      be(() => e.prompt && e.prompt.model, j),
        be(() => e.options && e.options.model, j);
      function M() {
        i.value.show();
      }
      function m() {
        i.value.hide();
      }
      function _() {
        t("ok", ie(s.value)), m();
      }
      function w() {
        m();
      }
      function F() {
        t("hide");
      }
      function j(k) {
        s.value = k;
      }
      function V(k) {
        y.value !== !0 &&
          e.prompt.type !== "textarea" &&
          zn(k, 13) === !0 &&
          _();
      }
      function N(k, Z) {
        return e.html === !0
          ? E(En, { class: k, innerHTML: Z })
          : E(En, { class: k }, () => Z);
      }
      function C() {
        return [
          E(sm, {
            color: a.value,
            dense: !0,
            autofocus: !0,
            dark: r.value,
            ...d.value,
            modelValue: s.value,
            "onUpdate:modelValue": j,
            onKeyup: V,
          }),
        ];
      }
      function x() {
        return [
          E(hm, {
            color: a.value,
            options: e.options.items,
            dark: r.value,
            ...d.value,
            modelValue: s.value,
            "onUpdate:modelValue": j,
          }),
        ];
      }
      function $() {
        const k = [];
        return (
          e.cancel && k.push(E(Br, q.value)),
          e.ok && k.push(E(Br, T.value)),
          E(
            Fg,
            {
              class: e.stackButtons === !0 ? "items-end" : "",
              vertical: e.stackButtons,
              align: "right",
            },
            () => k
          )
        );
      }
      function v() {
        const k = [];
        return (
          e.title && k.push(N("q-dialog__title", e.title)),
          e.progress !== !1 &&
            k.push(
              E(En, { class: "q-dialog__progress" }, () =>
                E(c.value.component, c.value.props)
              )
            ),
          e.message && k.push(N("q-dialog__message", e.message)),
          e.prompt !== void 0
            ? k.push(E(En, { class: "scroll q-dialog-plugin__form" }, C))
            : e.options !== void 0 &&
              k.push(
                E(Ks, { dark: r.value }),
                E(En, { class: "scroll q-dialog-plugin__form" }, x),
                E(Ks, { dark: r.value })
              ),
          (e.ok || e.cancel) && k.push($()),
          k
        );
      }
      function H() {
        return [
          E(
            Bg,
            {
              class: [l.value, e.cardClass],
              style: e.cardStyle,
              dark: r.value,
            },
            v
          ),
        ];
      }
      return (
        Object.assign(n, { show: M, hide: m }),
        () => E(Lg, { ref: i, onHide: F }, H)
      );
    },
  });
function ru(e, t) {
  for (const n in t)
    n !== "spinner" && Object(t[n]) === t[n]
      ? ((e[n] = Object(e[n]) !== e[n] ? {} : { ...e[n] }), ru(e[n], t[n]))
      : (e[n] = t[n]);
}
function mm(e, t, n) {
  return (o) => {
    let r, i;
    const s = t === !0 && o.component !== void 0;
    if (s === !0) {
      const { component: m, componentProps: _ } = o;
      (r = typeof m == "string" ? n.component(m) : m), (i = _ || {});
    } else {
      const { class: m, style: _, ...w } = o;
      (r = e),
        (i = w),
        m !== void 0 && (w.cardClass = m),
        _ !== void 0 && (w.cardStyle = _);
    }
    let l,
      a = !1;
    const c = he(null),
      u = hi(!1, "dialog"),
      d = (m) => {
        if (c.value !== null && c.value[m] !== void 0) {
          c.value[m]();
          return;
        }
        const _ = l.$.subTree;
        if (_ && _.component) {
          if (_.component.proxy && _.component.proxy[m]) {
            _.component.proxy[m]();
            return;
          }
          if (
            _.component.subTree &&
            _.component.subTree.component &&
            _.component.subTree.component.proxy &&
            _.component.subTree.component.proxy[m]
          ) {
            _.component.subTree.component.proxy[m]();
            return;
          }
        }
        console.error("[Quasar] Incorrectly defined Dialog component");
      },
      f = [],
      p = [],
      y = {
        onOk(m) {
          return f.push(m), y;
        },
        onCancel(m) {
          return p.push(m), y;
        },
        onDismiss(m) {
          return f.push(m), p.push(m), y;
        },
        hide() {
          return d("hide"), y;
        },
        update(m) {
          if (l !== null) {
            if (s === !0) Object.assign(i, m);
            else {
              const { class: _, style: w, ...F } = m;
              _ !== void 0 && (F.cardClass = _),
                w !== void 0 && (F.cardStyle = w),
                ru(i, F);
            }
            l.$forceUpdate();
          }
          return y;
        },
      },
      T = (m) => {
        (a = !0),
          f.forEach((_) => {
            _(m);
          });
      },
      q = () => {
        M.unmount(u),
          Fa(u),
          (M = null),
          (l = null),
          a !== !0 &&
            p.forEach((m) => {
              m();
            });
      };
    let M = ma(
      {
        name: "QGlobalDialog",
        setup: () => () =>
          E(r, {
            ...i,
            ref: c,
            onOk: T,
            onHide: q,
            onVnodeMounted(...m) {
              typeof i.onVnodeMounted == "function" && i.onVnodeMounted(...m),
                je(() => d("show"));
            },
          }),
      },
      n
    );
    return (l = M.mount(u)), y;
  };
}
var pm = {
    install({ $q: e, parentApp: t }) {
      (e.dialog = mm(gm, !0, t)),
        this.__installed !== !0 && (this.create = e.dialog);
    },
  },
  vm = {
    config: { staticPath: "" },
    plugins: { Notify: ig, LocalStorage: Da, Dialog: pm },
  };
async function bm({ app: e, router: t }) {
  e.use(t), e.mount("#q-app");
}
Ch(la, vm).then(bm);
export {
  zn as $,
  Km as A,
  pn as B,
  ii as C,
  It as D,
  Lo as E,
  xc as F,
  Wl as G,
  Yl as H,
  sc as I,
  Fe as J,
  kh as K,
  we as L,
  Pt as M,
  Rm as N,
  Kf as O,
  Tr as P,
  Pm as Q,
  Et as R,
  ko as S,
  Hf as T,
  Uf as U,
  Ke as V,
  Vm as W,
  Be as X,
  za as Y,
  Ka as Z,
  dd as _,
  Wt as a,
  cm as a$,
  vo as a0,
  pg as a1,
  dg as a2,
  vg as a3,
  xg as a4,
  cn as a5,
  Yn as a6,
  Zn as a7,
  pt as a8,
  Eh as a9,
  jm as aA,
  rd as aB,
  Am as aC,
  da as aD,
  nr as aE,
  Ug as aF,
  Wg as aG,
  Yg as aH,
  Qg as aI,
  pi as aJ,
  Gg as aK,
  jr as aL,
  Fl as aM,
  ri as aN,
  im as aO,
  Lg as aP,
  _m as aQ,
  Cm as aR,
  Oh as aS,
  Jl as aT,
  ym as aU,
  Qc as aV,
  Xe as aW,
  En as aX,
  Ks as aY,
  km as aZ,
  sm as a_,
  Nh as aa,
  ua as ab,
  vc as ac,
  Fo as ad,
  Ll as ae,
  $h as af,
  Lh as ag,
  Un as ah,
  zh as ai,
  Kh as aj,
  $m as ak,
  Og as al,
  Hs as am,
  Ds as an,
  _g as ao,
  Mg as ap,
  mi as aq,
  Fh as ar,
  Zh as as,
  Kg as at,
  Im as au,
  Br as av,
  Aa as aw,
  Ma as ax,
  Fm as ay,
  Nm as az,
  gg as b,
  Em as b0,
  wm as b1,
  Bg as b2,
  zm as b3,
  Hm as b4,
  La as b5,
  id as b6,
  Fg as b7,
  hm as b8,
  Dm as b9,
  Bm as ba,
  xm as bb,
  ml as bc,
  Sm as bd,
  $a as be,
  qr as bf,
  Om as bg,
  Wr as bh,
  Ur as bi,
  Vt as bj,
  $e as c,
  Qt as d,
  fg as e,
  Mm as f,
  R as g,
  mg as h,
  ut as i,
  cg as j,
  We as k,
  Tm as l,
  Al as m,
  je as n,
  Ut as o,
  E as p,
  Lm as q,
  he as r,
  tt as s,
  ke as t,
  hg as u,
  Pg as v,
  be as w,
  fo as x,
  qm as y,
  qt as z,
};
