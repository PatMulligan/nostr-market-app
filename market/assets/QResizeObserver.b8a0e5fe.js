import {
  P as _,
  K as F,
  L as m,
  M as S,
  N as Y,
  O as h,
  Q as b,
  R as P,
  S as y,
  T as w,
  U as C,
  V as B,
  c as k,
  w as M,
  o as g,
  k as z,
  W as j,
  t as N,
  X as T,
  Y as Q,
  Z as V,
  r as $,
  z as H,
  n as L,
  p as U,
} from "./index.d0f96b53.js";
const q = {
    left: !0,
    right: !0,
    up: !0,
    down: !0,
    horizontal: !0,
    vertical: !0,
  },
  I = Object.keys(q);
q.all = !0;
function R(o) {
  const t = {};
  for (const i of I) o[i] === !0 && (t[i] = !0);
  return Object.keys(t).length === 0
    ? q
    : (t.horizontal === !0
        ? (t.left = t.right = !0)
        : t.left === !0 && t.right === !0 && (t.horizontal = !0),
      t.vertical === !0
        ? (t.up = t.down = !0)
        : t.up === !0 && t.down === !0 && (t.vertical = !0),
      t.horizontal === !0 && t.vertical === !0 && (t.all = !0),
      t);
}
const K = ["INPUT", "TEXTAREA"];
function x(o, t) {
  return (
    t.event === void 0 &&
    o.target !== void 0 &&
    o.target.draggable !== !0 &&
    typeof t.handler == "function" &&
    K.includes(o.target.nodeName.toUpperCase()) === !1 &&
    (o.qClonedBy === void 0 || o.qClonedBy.indexOf(t.uid) === -1)
  );
}
function W() {
  if (window.getSelection !== void 0) {
    const o = window.getSelection();
    o.empty !== void 0
      ? o.empty()
      : o.removeAllRanges !== void 0 &&
        (o.removeAllRanges(),
        _.is.mobile !== !0 && o.addRange(document.createRange()));
  } else document.selection !== void 0 && document.selection.empty();
}
function E(o, t, i) {
  const u = w(o);
  let e,
    n = u.left - t.event.x,
    s = u.top - t.event.y,
    a = Math.abs(n),
    l = Math.abs(s);
  const r = t.direction;
  r.horizontal === !0 && r.vertical !== !0
    ? (e = n < 0 ? "left" : "right")
    : r.horizontal !== !0 && r.vertical === !0
    ? (e = s < 0 ? "up" : "down")
    : r.up === !0 && s < 0
    ? ((e = "up"),
      a > l &&
        (r.left === !0 && n < 0
          ? (e = "left")
          : r.right === !0 && n > 0 && (e = "right")))
    : r.down === !0 && s > 0
    ? ((e = "down"),
      a > l &&
        (r.left === !0 && n < 0
          ? (e = "left")
          : r.right === !0 && n > 0 && (e = "right")))
    : r.left === !0 && n < 0
    ? ((e = "left"),
      a < l &&
        (r.up === !0 && s < 0
          ? (e = "up")
          : r.down === !0 && s > 0 && (e = "down")))
    : r.right === !0 &&
      n > 0 &&
      ((e = "right"),
      a < l &&
        (r.up === !0 && s < 0
          ? (e = "up")
          : r.down === !0 && s > 0 && (e = "down")));
  let f = !1;
  if (e === void 0 && i === !1) {
    if (t.event.isFirst === !0 || t.event.lastDir === void 0) return {};
    (e = t.event.lastDir),
      (f = !0),
      e === "left" || e === "right"
        ? ((u.left -= n), (a = 0), (n = 0))
        : ((u.top -= s), (l = 0), (s = 0));
  }
  return {
    synthetic: f,
    payload: {
      evt: o,
      touch: t.event.mouse !== !0,
      mouse: t.event.mouse === !0,
      position: u,
      direction: e,
      isFirst: t.event.isFirst,
      isFinal: i === !0,
      duration: Date.now() - t.event.time,
      distance: { x: a, y: l },
      offset: { x: n, y: s },
      delta: { x: u.left - t.event.lastX, y: u.top - t.event.lastY },
    },
  };
}
let Z = 0;
var te = F({
  name: "touch-pan",
  beforeMount(o, { value: t, modifiers: i }) {
    if (i.mouse !== !0 && m.has.touch !== !0) return;
    function u(n, s) {
      i.mouse === !0 && s === !0
        ? B(n)
        : (i.stop === !0 && y(n), i.prevent === !0 && P(n));
    }
    const e = {
      uid: "qvtp_" + Z++,
      handler: t,
      modifiers: i,
      direction: R(i),
      noop: S,
      mouseStart(n) {
        x(n, e) &&
          Y(n) &&
          (h(e, "temp", [
            [document, "mousemove", "move", "notPassiveCapture"],
            [document, "mouseup", "end", "passiveCapture"],
          ]),
          e.start(n, !0));
      },
      touchStart(n) {
        if (x(n, e)) {
          const s = n.target;
          h(e, "temp", [
            [s, "touchmove", "move", "notPassiveCapture"],
            [s, "touchcancel", "end", "passiveCapture"],
            [s, "touchend", "end", "passiveCapture"],
          ]),
            e.start(n);
        }
      },
      start(n, s) {
        if (
          (m.is.firefox === !0 && b(o, !0),
          (e.lastEvt = n),
          s === !0 || i.stop === !0)
        ) {
          if (
            e.direction.all !== !0 &&
            (s !== !0 ||
              (e.modifiers.mouseAllDir !== !0 &&
                e.modifiers.mousealldir !== !0))
          ) {
            const r =
              n.type.indexOf("mouse") > -1
                ? new MouseEvent(n.type, n)
                : new TouchEvent(n.type, n);
            n.defaultPrevented === !0 && P(r),
              n.cancelBubble === !0 && y(r),
              Object.assign(r, {
                qKeyEvent: n.qKeyEvent,
                qClickOutside: n.qClickOutside,
                qAnchorHandled: n.qAnchorHandled,
                qClonedBy:
                  n.qClonedBy === void 0 ? [e.uid] : n.qClonedBy.concat(e.uid),
              }),
              (e.initialEvent = { target: n.target, event: r });
          }
          y(n);
        }
        const { left: a, top: l } = w(n);
        e.event = {
          x: a,
          y: l,
          time: Date.now(),
          mouse: s === !0,
          detected: !1,
          isFirst: !0,
          isFinal: !1,
          lastX: a,
          lastY: l,
        };
      },
      move(n) {
        if (e.event === void 0) return;
        const s = w(n),
          a = s.left - e.event.x,
          l = s.top - e.event.y;
        if (a === 0 && l === 0) return;
        e.lastEvt = n;
        const r = e.event.mouse === !0,
          f = () => {
            u(n, r);
            let c;
            i.preserveCursor !== !0 &&
              i.preservecursor !== !0 &&
              ((c = document.documentElement.style.cursor || ""),
              (document.documentElement.style.cursor = "grabbing")),
              r === !0 &&
                document.body.classList.add("no-pointer-events--children"),
              document.body.classList.add("non-selectable"),
              W(),
              (e.styleCleanup = (p) => {
                if (
                  ((e.styleCleanup = void 0),
                  c !== void 0 && (document.documentElement.style.cursor = c),
                  document.body.classList.remove("non-selectable"),
                  r === !0)
                ) {
                  const O = () => {
                    document.body.classList.remove(
                      "no-pointer-events--children"
                    );
                  };
                  p !== void 0
                    ? setTimeout(() => {
                        O(), p();
                      }, 50)
                    : O();
                } else p !== void 0 && p();
              });
          };
        if (e.event.detected === !0) {
          e.event.isFirst !== !0 && u(n, e.event.mouse);
          const { payload: c, synthetic: p } = E(n, e, !1);
          c !== void 0 &&
            (e.handler(c) === !1
              ? e.end(n)
              : (e.styleCleanup === void 0 && e.event.isFirst === !0 && f(),
                (e.event.lastX = c.position.left),
                (e.event.lastY = c.position.top),
                (e.event.lastDir = p === !0 ? void 0 : c.direction),
                (e.event.isFirst = !1)));
          return;
        }
        if (
          e.direction.all === !0 ||
          (r === !0 &&
            (e.modifiers.mouseAllDir === !0 || e.modifiers.mousealldir === !0))
        ) {
          f(), (e.event.detected = !0), e.move(n);
          return;
        }
        const d = Math.abs(a),
          v = Math.abs(l);
        d !== v &&
          ((e.direction.horizontal === !0 && d > v) ||
          (e.direction.vertical === !0 && d < v) ||
          (e.direction.up === !0 && d < v && l < 0) ||
          (e.direction.down === !0 && d < v && l > 0) ||
          (e.direction.left === !0 && d > v && a < 0) ||
          (e.direction.right === !0 && d > v && a > 0)
            ? ((e.event.detected = !0), e.move(n))
            : e.end(n, !0));
      },
      end(n, s) {
        if (e.event !== void 0) {
          if ((C(e, "temp"), m.is.firefox === !0 && b(o, !1), s === !0))
            e.styleCleanup !== void 0 && e.styleCleanup(),
              e.event.detected !== !0 &&
                e.initialEvent !== void 0 &&
                e.initialEvent.target.dispatchEvent(e.initialEvent.event);
          else if (e.event.detected === !0) {
            e.event.isFirst === !0 &&
              e.handler(E(n === void 0 ? e.lastEvt : n, e).payload);
            const { payload: a } = E(n === void 0 ? e.lastEvt : n, e, !0),
              l = () => {
                e.handler(a);
              };
            e.styleCleanup !== void 0 ? e.styleCleanup(l) : l();
          }
          (e.event = void 0), (e.initialEvent = void 0), (e.lastEvt = void 0);
        }
      },
    };
    if (((o.__qtouchpan = e), i.mouse === !0)) {
      const n = i.mouseCapture === !0 || i.mousecapture === !0 ? "Capture" : "";
      h(e, "main", [[o, "mousedown", "mouseStart", `passive${n}`]]);
    }
    m.has.touch === !0 &&
      h(e, "main", [
        [
          o,
          "touchstart",
          "touchStart",
          `passive${i.capture === !0 ? "Capture" : ""}`,
        ],
        [o, "touchmove", "noop", "notPassiveCapture"],
      ]);
  },
  updated(o, t) {
    const i = o.__qtouchpan;
    i !== void 0 &&
      (t.oldValue !== t.value &&
        (typeof value != "function" && i.end(), (i.handler = t.value)),
      (i.direction = R(t.modifiers)));
  },
  beforeUnmount(o) {
    const t = o.__qtouchpan;
    t !== void 0 &&
      (t.event !== void 0 && t.end(),
      C(t, "main"),
      C(t, "temp"),
      m.is.firefox === !0 && b(o, !1),
      t.styleCleanup !== void 0 && t.styleCleanup(),
      delete o.__qtouchpan);
  },
});
function ne(o, t, i) {
  return i <= t ? t : Math.min(i, Math.max(t, o));
}
function ie(o, t, i) {
  if (i <= t) return t;
  const u = i - t + 1;
  let e = t + ((o - t) % u);
  return e < t && (e = u + e), e === 0 ? 0 : e;
}
const { passive: A } = T,
  G = ["both", "horizontal", "vertical"];
var oe = k({
  name: "QScrollObserver",
  props: {
    axis: {
      type: String,
      validator: (o) => G.includes(o),
      default: "vertical",
    },
    debounce: [String, Number],
    scrollTarget: { default: void 0 },
  },
  emits: ["scroll"],
  setup(o, { emit: t }) {
    const i = {
      position: { top: 0, left: 0 },
      direction: "down",
      directionChanged: !1,
      delta: { top: 0, left: 0 },
      inflectionPoint: { top: 0, left: 0 },
    };
    let u = null,
      e,
      n;
    M(
      () => o.scrollTarget,
      () => {
        l(), a();
      }
    );
    function s() {
      u !== null && u();
      const d = Math.max(0, Q(e)),
        v = V(e),
        c = { top: d - i.position.top, left: v - i.position.left };
      if (
        (o.axis === "vertical" && c.top === 0) ||
        (o.axis === "horizontal" && c.left === 0)
      )
        return;
      const p =
        Math.abs(c.top) >= Math.abs(c.left)
          ? c.top < 0
            ? "up"
            : "down"
          : c.left < 0
          ? "left"
          : "right";
      (i.position = { top: d, left: v }),
        (i.directionChanged = i.direction !== p),
        (i.delta = c),
        i.directionChanged === !0 &&
          ((i.direction = p), (i.inflectionPoint = i.position)),
        t("scroll", { ...i });
    }
    function a() {
      (e = j(n, o.scrollTarget)), e.addEventListener("scroll", r, A), r(!0);
    }
    function l() {
      e !== void 0 && (e.removeEventListener("scroll", r, A), (e = void 0));
    }
    function r(d) {
      if (d === !0 || o.debounce === 0 || o.debounce === "0") s();
      else if (u === null) {
        const [v, c] = o.debounce
          ? [setTimeout(s, o.debounce), clearTimeout]
          : [requestAnimationFrame(s), cancelAnimationFrame];
        u = () => {
          c(v), (u = null);
        };
      }
    }
    const { proxy: f } = N();
    return (
      M(() => f.$q.lang.rtl, s),
      g(() => {
        (n = f.$el.parentNode), a();
      }),
      z(() => {
        u !== null && u(), l();
      }),
      Object.assign(f, { trigger: r, getPosition: () => i }),
      S
    );
  },
});
function J() {
  const o = $(!H.value);
  return (
    o.value === !1 &&
      g(() => {
        o.value = !0;
      }),
    o
  );
}
const X = typeof ResizeObserver != "undefined",
  D =
    X === !0
      ? {}
      : {
          style:
            "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
          url: "about:blank",
        };
var re = k({
  name: "QResizeObserver",
  props: { debounce: { type: [String, Number], default: 100 } },
  emits: ["resize"],
  setup(o, { emit: t }) {
    let i = null,
      u,
      e = { width: -1, height: -1 };
    function n(l) {
      l === !0 || o.debounce === 0 || o.debounce === "0"
        ? s()
        : i === null && (i = setTimeout(s, o.debounce));
    }
    function s() {
      if ((i !== null && (clearTimeout(i), (i = null)), u)) {
        const { offsetWidth: l, offsetHeight: r } = u;
        (l !== e.width || r !== e.height) &&
          ((e = { width: l, height: r }), t("resize", e));
      }
    }
    const { proxy: a } = N();
    if (X === !0) {
      let l;
      const r = (f) => {
        (u = a.$el.parentNode),
          u
            ? ((l = new ResizeObserver(n)), l.observe(u), s())
            : f !== !0 &&
              L(() => {
                r(!0);
              });
      };
      return (
        g(() => {
          r();
        }),
        z(() => {
          i !== null && clearTimeout(i),
            l !== void 0 &&
              (l.disconnect !== void 0 ? l.disconnect() : u && l.unobserve(u));
        }),
        S
      );
    } else {
      let f = function () {
          i !== null && (clearTimeout(i), (i = null)),
            r !== void 0 &&
              (r.removeEventListener !== void 0 &&
                r.removeEventListener("resize", n, T.passive),
              (r = void 0));
        },
        d = function () {
          f(),
            u &&
              u.contentDocument &&
              ((r = u.contentDocument.defaultView),
              r.addEventListener("resize", n, T.passive),
              s());
        };
      const l = J();
      let r;
      return (
        g(() => {
          L(() => {
            (u = a.$el), u && d();
          });
        }),
        z(f),
        (a.trigger = n),
        () => {
          if (l.value === !0)
            return U("object", {
              style: D.style,
              tabindex: -1,
              type: "text/html",
              data: D.url,
              "aria-hidden": "true",
              onLoad: d,
            });
        }
      );
    }
  },
});
export { oe as Q, te as T, re as a, ne as b, W as c, R as g, ie as n, x as s };
