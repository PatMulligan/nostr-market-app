import {
  c as te,
  u as _e,
  a as Pe,
  b as Me,
  d as We,
  e as Oe,
  i as he,
  f as D,
  l as ae,
  r as b,
  g as o,
  h as De,
  j as Re,
  w as d,
  o as He,
  n as ue,
  k as Qe,
  m as Ae,
  p as w,
  q as se,
  s as me,
  t as le,
  v as Fe,
  x as ye,
  y as Ie,
  z as Ve,
  A as Z,
  B as V,
  C as Ee,
  D as Ne,
  _ as je,
  E as Ue,
  F as Ke,
  G as Ge,
  H as Je,
  I as ce,
  J as E,
} from "./index.d0f96b53.js";
import {
  T as ee,
  b as N,
  Q as Xe,
  a as de,
} from "./QResizeObserver.b8a0e5fe.js";
const ve = 150;
var fe = te({
    name: "QDrawer",
    inheritAttrs: !1,
    props: {
      ..._e,
      ...Pe,
      side: {
        type: String,
        default: "left",
        validator: (e) => ["left", "right"].includes(e),
      },
      width: { type: Number, default: 300 },
      mini: Boolean,
      miniToOverlay: Boolean,
      miniWidth: { type: Number, default: 57 },
      noMiniAnimation: Boolean,
      breakpoint: { type: Number, default: 1023 },
      showIfAbove: Boolean,
      behavior: {
        type: String,
        validator: (e) => ["default", "desktop", "mobile"].includes(e),
        default: "default",
      },
      bordered: Boolean,
      elevated: Boolean,
      overlay: Boolean,
      persistent: Boolean,
      noSwipeOpen: Boolean,
      noSwipeClose: Boolean,
      noSwipeBackdrop: Boolean,
    },
    emits: [...Me, "onLayout", "miniState"],
    setup(e, { slots: $, emit: v, attrs: r }) {
      const f = le(),
        {
          proxy: { $q: u },
        } = f,
        T = We(e, u),
        { preventBodyScroll: M } = Fe(),
        { registerTimeout: z, removeTimeout: x } = Oe(),
        a = he(ae, D);
      if (a === D)
        return console.error("QDrawer needs to be child of QLayout"), D;
      let R,
        S = null,
        B;
      const c = b(
          e.behavior === "mobile" ||
            (e.behavior !== "desktop" && a.totalWidth.value <= e.breakpoint)
        ),
        L = o(() => e.mini === !0 && c.value !== !0),
        h = o(() => (L.value === !0 ? e.miniWidth : e.width)),
        i = b(
          e.showIfAbove === !0 && c.value === !1 ? !0 : e.modelValue === !0
        ),
        p = o(() => e.persistent !== !0 && (c.value === !0 || ge.value === !0));
      function H(t, l) {
        if ((_(), t !== !1 && a.animate(), g(0), c.value === !0)) {
          const m = a.instances[F.value];
          m !== void 0 && m.belowBreakpoint === !0 && m.hide(!1),
            k(1),
            a.isContainer.value !== !0 && M(!0);
        } else k(0), t !== !1 && J(!1);
        z(() => {
          t !== !1 && J(!0), l !== !0 && v("show", t);
        }, ve);
      }
      function n(t, l) {
        Q(),
          t !== !1 && a.animate(),
          k(0),
          g(W.value * h.value),
          X(),
          l !== !0
            ? z(() => {
                v("hide", t);
              }, ve)
            : x();
      }
      const { show: s, hide: y } = De({
          showing: i,
          hideOnRouteChange: p,
          handleShow: H,
          handleHide: n,
        }),
        { addToHistory: _, removeFromHistory: Q } = Re(i, y, p),
        P = { belowBreakpoint: c, hide: y },
        C = o(() => e.side === "right"),
        W = o(() => (u.lang.rtl === !0 ? -1 : 1) * (C.value === !0 ? 1 : -1)),
        ne = b(0),
        O = b(!1),
        j = b(!1),
        oe = b(h.value * W.value),
        F = o(() => (C.value === !0 ? "left" : "right")),
        U = o(() =>
          i.value === !0 && c.value === !1 && e.overlay === !1
            ? e.miniToOverlay === !0
              ? e.miniWidth
              : h.value
            : 0
        ),
        K = o(
          () =>
            e.overlay === !0 ||
            e.miniToOverlay === !0 ||
            a.view.value.indexOf(C.value ? "R" : "L") > -1 ||
            (u.platform.is.ios === !0 && a.isContainer.value === !0)
        ),
        A = o(() => e.overlay === !1 && i.value === !0 && c.value === !1),
        ge = o(() => e.overlay === !0 && i.value === !0 && c.value === !1),
        we = o(
          () =>
            "fullscreen q-drawer__backdrop" +
            (i.value === !1 && O.value === !1 ? " hidden" : "")
        ),
        be = o(() => ({ backgroundColor: `rgba(0,0,0,${ne.value * 0.4})` })),
        ie = o(() =>
          C.value === !0
            ? a.rows.value.top[2] === "r"
            : a.rows.value.top[0] === "l"
        ),
        xe = o(() =>
          C.value === !0
            ? a.rows.value.bottom[2] === "r"
            : a.rows.value.bottom[0] === "l"
        ),
        Se = o(() => {
          const t = {};
          return (
            a.header.space === !0 &&
              ie.value === !1 &&
              (K.value === !0
                ? (t.top = `${a.header.offset}px`)
                : a.header.space === !0 && (t.top = `${a.header.size}px`)),
            a.footer.space === !0 &&
              xe.value === !1 &&
              (K.value === !0
                ? (t.bottom = `${a.footer.offset}px`)
                : a.footer.space === !0 && (t.bottom = `${a.footer.size}px`)),
            t
          );
        }),
        Ce = o(() => {
          const t = {
            width: `${h.value}px`,
            transform: `translateX(${oe.value}px)`,
          };
          return c.value === !0 ? t : Object.assign(t, Se.value);
        }),
        $e = o(
          () =>
            "q-drawer__content fit " +
            (a.isContainer.value !== !0 ? "scroll" : "overflow-auto")
        ),
        ke = o(
          () =>
            `q-drawer q-drawer--${e.side}` +
            (j.value === !0 ? " q-drawer--mini-animate" : "") +
            (e.bordered === !0 ? " q-drawer--bordered" : "") +
            (T.value === !0 ? " q-drawer--dark q-dark" : "") +
            (O.value === !0
              ? " no-transition"
              : i.value === !0
              ? ""
              : " q-layout--prevent-focus") +
            (c.value === !0
              ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding"
              : ` q-drawer--${L.value === !0 ? "mini" : "standard"}` +
                (K.value === !0 || A.value !== !0 ? " fixed" : "") +
                (e.overlay === !0 || e.miniToOverlay === !0
                  ? " q-drawer--on-top"
                  : "") +
                (ie.value === !0 ? " q-drawer--top-padding" : ""))
        ),
        qe = o(() => {
          const t = u.lang.rtl === !0 ? e.side : F.value;
          return [[ee, Le, void 0, { [t]: !0, mouse: !0 }]];
        }),
        Te = o(() => {
          const t = u.lang.rtl === !0 ? F.value : e.side;
          return [[ee, re, void 0, { [t]: !0, mouse: !0 }]];
        }),
        ze = o(() => {
          const t = u.lang.rtl === !0 ? F.value : e.side;
          return [[ee, re, void 0, { [t]: !0, mouse: !0, mouseAllDir: !0 }]];
        });
      function G() {
        pe(
          c,
          e.behavior === "mobile" ||
            (e.behavior !== "desktop" && a.totalWidth.value <= e.breakpoint)
        );
      }
      d(c, (t) => {
        t === !0
          ? ((R = i.value), i.value === !0 && y(!1))
          : e.overlay === !1 &&
            e.behavior !== "mobile" &&
            R !== !1 &&
            (i.value === !0 ? (g(0), k(0), X()) : s(!1));
      }),
        d(
          () => e.side,
          (t, l) => {
            a.instances[l] === P &&
              ((a.instances[l] = void 0), (a[l].space = !1), (a[l].offset = 0)),
              (a.instances[t] = P),
              (a[t].size = h.value),
              (a[t].space = A.value),
              (a[t].offset = U.value);
          }
        ),
        d(a.totalWidth, () => {
          (a.isContainer.value === !0 || document.qScrollPrevented !== !0) &&
            G();
        }),
        d(() => e.behavior + e.breakpoint, G),
        d(a.isContainer, (t) => {
          i.value === !0 && M(t !== !0), t === !0 && G();
        }),
        d(a.scrollbarWidth, () => {
          g(i.value === !0 ? 0 : void 0);
        }),
        d(U, (t) => {
          q("offset", t);
        }),
        d(A, (t) => {
          v("onLayout", t), q("space", t);
        }),
        d(C, () => {
          g();
        }),
        d(h, (t) => {
          g(), Y(e.miniToOverlay, t);
        }),
        d(
          () => e.miniToOverlay,
          (t) => {
            Y(t, h.value);
          }
        ),
        d(
          () => u.lang.rtl,
          () => {
            g();
          }
        ),
        d(
          () => e.mini,
          () => {
            e.noMiniAnimation || (e.modelValue === !0 && (Be(), a.animate()));
          }
        ),
        d(L, (t) => {
          v("miniState", t);
        });
      function g(t) {
        t === void 0
          ? ue(() => {
              (t = i.value === !0 ? 0 : h.value), g(W.value * t);
            })
          : (a.isContainer.value === !0 &&
              C.value === !0 &&
              (c.value === !0 || Math.abs(t) === h.value) &&
              (t += W.value * a.scrollbarWidth.value),
            (oe.value = t));
      }
      function k(t) {
        ne.value = t;
      }
      function J(t) {
        const l = t === !0 ? "remove" : a.isContainer.value !== !0 ? "add" : "";
        l !== "" && document.body.classList[l]("q-body--drawer-toggle");
      }
      function Be() {
        S !== null && clearTimeout(S),
          f.proxy &&
            f.proxy.$el &&
            f.proxy.$el.classList.add("q-drawer--mini-animate"),
          (j.value = !0),
          (S = setTimeout(() => {
            (S = null),
              (j.value = !1),
              f &&
                f.proxy &&
                f.proxy.$el &&
                f.proxy.$el.classList.remove("q-drawer--mini-animate");
          }, 150));
      }
      function Le(t) {
        if (i.value !== !1) return;
        const l = h.value,
          m = N(t.distance.x, 0, l);
        if (t.isFinal === !0) {
          m >= Math.min(75, l) === !0
            ? s()
            : (a.animate(), k(0), g(W.value * l)),
            (O.value = !1);
          return;
        }
        g(
          (u.lang.rtl === !0 ? C.value !== !0 : C.value)
            ? Math.max(l - m, 0)
            : Math.min(0, m - l)
        ),
          k(N(m / l, 0, 1)),
          t.isFirst === !0 && (O.value = !0);
      }
      function re(t) {
        if (i.value !== !0) return;
        const l = h.value,
          m = t.direction === e.side,
          I = (u.lang.rtl === !0 ? m !== !0 : m) ? N(t.distance.x, 0, l) : 0;
        if (t.isFinal === !0) {
          Math.abs(I) < Math.min(75, l) === !0
            ? (a.animate(), k(1), g(0))
            : y(),
            (O.value = !1);
          return;
        }
        g(W.value * I),
          k(N(1 - I / l, 0, 1)),
          t.isFirst === !0 && (O.value = !0);
      }
      function X() {
        M(!1), J(!0);
      }
      function q(t, l) {
        a.update(e.side, t, l);
      }
      function pe(t, l) {
        t.value !== l && (t.value = l);
      }
      function Y(t, l) {
        q("size", t === !0 ? e.miniWidth : l);
      }
      return (
        (a.instances[e.side] = P),
        Y(e.miniToOverlay, h.value),
        q("space", A.value),
        q("offset", U.value),
        e.showIfAbove === !0 &&
          e.modelValue !== !0 &&
          i.value === !0 &&
          e["onUpdate:modelValue"] !== void 0 &&
          v("update:modelValue", !0),
        He(() => {
          v("onLayout", A.value),
            v("miniState", L.value),
            (R = e.showIfAbove === !0);
          const t = () => {
            (i.value === !0 ? H : n)(!1, !0);
          };
          if (a.totalWidth.value !== 0) {
            ue(t);
            return;
          }
          B = d(a.totalWidth, () => {
            B(),
              (B = void 0),
              i.value === !1 && e.showIfAbove === !0 && c.value === !1
                ? s(!1)
                : t();
          });
        }),
        Qe(() => {
          B !== void 0 && B(),
            S !== null && (clearTimeout(S), (S = null)),
            i.value === !0 && X(),
            a.instances[e.side] === P &&
              ((a.instances[e.side] = void 0),
              q("size", 0),
              q("offset", 0),
              q("space", !1));
        }),
        () => {
          const t = [];
          c.value === !0 &&
            (e.noSwipeOpen === !1 &&
              t.push(
                Ae(
                  w("div", {
                    key: "open",
                    class: `q-drawer__opener fixed-${e.side}`,
                    "aria-hidden": "true",
                  }),
                  qe.value
                )
              ),
            t.push(
              se(
                "div",
                {
                  ref: "backdrop",
                  class: we.value,
                  style: be.value,
                  "aria-hidden": "true",
                  onClick: y,
                },
                void 0,
                "backdrop",
                e.noSwipeBackdrop !== !0 && i.value === !0,
                () => ze.value
              )
            ));
          const l = L.value === !0 && $.mini !== void 0,
            m = [
              w(
                "div",
                { ...r, key: "" + l, class: [$e.value, r.class] },
                l === !0 ? $.mini() : me($.default)
              ),
            ];
          return (
            e.elevated === !0 &&
              i.value === !0 &&
              m.push(
                w("div", {
                  class:
                    "q-layout__shadow absolute-full overflow-hidden no-pointer-events",
                })
              ),
            t.push(
              se(
                "aside",
                { ref: "content", class: ke.value, style: Ce.value },
                m,
                "contentclose",
                e.noSwipeClose !== !0 && c.value === !0,
                () => Te.value
              )
            ),
            w("div", { class: "q-drawer-container" }, t)
          );
        }
      );
    },
  }),
  Ye = te({
    name: "QPageContainer",
    setup(e, { slots: $ }) {
      const {
          proxy: { $q: v },
        } = le(),
        r = he(ae, D);
      if (r === D)
        return console.error("QPageContainer needs to be child of QLayout"), D;
      ye(Ie, !0);
      const f = o(() => {
        const u = {};
        return (
          r.header.space === !0 && (u.paddingTop = `${r.header.size}px`),
          r.right.space === !0 &&
            (u[
              `padding${v.lang.rtl === !0 ? "Left" : "Right"}`
            ] = `${r.right.size}px`),
          r.footer.space === !0 && (u.paddingBottom = `${r.footer.size}px`),
          r.left.space === !0 &&
            (u[
              `padding${v.lang.rtl === !0 ? "Right" : "Left"}`
            ] = `${r.left.size}px`),
          u
        );
      });
      return () =>
        w("div", { class: "q-page-container", style: f.value }, me($.default));
    },
  }),
  Ze = te({
    name: "QLayout",
    props: {
      container: Boolean,
      view: {
        type: String,
        default: "hhh lpr fff",
        validator: (e) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase()),
      },
      onScroll: Function,
      onScrollHeight: Function,
      onResize: Function,
    },
    setup(e, { slots: $, emit: v }) {
      const {
          proxy: { $q: r },
        } = le(),
        f = b(null),
        u = b(r.screen.height),
        T = b(e.container === !0 ? 0 : r.screen.width),
        M = b({ position: 0, direction: "down", inflectionPoint: 0 }),
        z = b(0),
        x = b(Ve.value === !0 ? 0 : Z()),
        a = o(
          () =>
            "q-layout q-layout--" +
            (e.container === !0 ? "containerized" : "standard")
        ),
        R = o(() =>
          e.container === !1 ? { minHeight: r.screen.height + "px" } : null
        ),
        S = o(() =>
          x.value !== 0
            ? { [r.lang.rtl === !0 ? "left" : "right"]: `${x.value}px` }
            : null
        ),
        B = o(() =>
          x.value !== 0
            ? {
                [r.lang.rtl === !0 ? "right" : "left"]: 0,
                [r.lang.rtl === !0 ? "left" : "right"]: `-${x.value}px`,
                width: `calc(100% + ${x.value}px)`,
              }
            : null
        );
      function c(n) {
        if (e.container === !0 || document.qScrollPrevented !== !0) {
          const s = {
            position: n.position.top,
            direction: n.direction,
            directionChanged: n.directionChanged,
            inflectionPoint: n.inflectionPoint.top,
            delta: n.delta.top,
          };
          (M.value = s), e.onScroll !== void 0 && v("scroll", s);
        }
      }
      function L(n) {
        const { height: s, width: y } = n;
        let _ = !1;
        u.value !== s &&
          ((_ = !0),
          (u.value = s),
          e.onScrollHeight !== void 0 && v("scrollHeight", s),
          i()),
          T.value !== y && ((_ = !0), (T.value = y)),
          _ === !0 && e.onResize !== void 0 && v("resize", n);
      }
      function h({ height: n }) {
        z.value !== n && ((z.value = n), i());
      }
      function i() {
        if (e.container === !0) {
          const n = u.value > z.value ? Z() : 0;
          x.value !== n && (x.value = n);
        }
      }
      let p = null;
      const H = {
        instances: {},
        view: o(() => e.view),
        isContainer: o(() => e.container),
        rootRef: f,
        height: u,
        containerHeight: z,
        scrollbarWidth: x,
        totalWidth: o(() => T.value + x.value),
        rows: o(() => {
          const n = e.view.toLowerCase().split(" ");
          return {
            top: n[0].split(""),
            middle: n[1].split(""),
            bottom: n[2].split(""),
          };
        }),
        header: V({ size: 0, offset: 0, space: !1 }),
        right: V({ size: 300, offset: 0, space: !1 }),
        footer: V({ size: 0, offset: 0, space: !1 }),
        left: V({ size: 300, offset: 0, space: !1 }),
        scroll: M,
        animate() {
          p !== null
            ? clearTimeout(p)
            : document.body.classList.add("q-body--layout-animate"),
            (p = setTimeout(() => {
              (p = null),
                document.body.classList.remove("q-body--layout-animate");
            }, 155));
        },
        update(n, s, y) {
          H[n][s] = y;
        },
      };
      if ((ye(ae, H), Z() > 0)) {
        let y = function () {
            (n = null), s.classList.remove("hide-scrollbar");
          },
          _ = function () {
            if (n === null) {
              if (s.scrollHeight > r.screen.height) return;
              s.classList.add("hide-scrollbar");
            } else clearTimeout(n);
            n = setTimeout(y, 300);
          },
          Q = function (P) {
            n !== null && P === "remove" && (clearTimeout(n), y()),
              window[`${P}EventListener`]("resize", _);
          },
          n = null;
        const s = document.body;
        d(() => (e.container !== !0 ? "add" : "remove"), Q),
          e.container !== !0 && Q("add"),
          Ee(() => {
            Q("remove");
          });
      }
      return () => {
        const n = Ne($.default, [
            w(Xe, { onScroll: c }),
            w(de, { onResize: L }),
          ]),
          s = w(
            "div",
            {
              class: a.value,
              style: R.value,
              ref: e.container === !0 ? void 0 : f,
              tabindex: -1,
            },
            n
          );
        return e.container === !0
          ? w("div", { class: "q-layout-container overflow-hidden", ref: f }, [
              w(de, { onResize: h }),
              w("div", { class: "absolute-full", style: S.value }, [
                w("div", { class: "scroll", style: B.value }, [s]),
              ]),
            ])
          : s;
      };
    },
  });
const et = Ue({
  name: "MainLayout",
  setup() {
    return {};
  },
});
function tt(e, $, v, r, f, u) {
  const T = Ke("router-view");
  return (
    Ge(),
    Je(
      Ze,
      { view: "hHh lpR fFf" },
      {
        default: ce(() => [
          E(fe, { "show-if-above": "", side: "left" }),
          E(fe, { "show-if-above": "", side: "right" }),
          E(Ye, null, { default: ce(() => [E(T)]), _: 1 }),
        ]),
        _: 1,
      }
    )
  );
}
var ot = je(et, [["render", tt]]);
export { ot as default };
