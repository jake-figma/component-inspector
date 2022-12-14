/**
 * My own version of prettier's html parser that removes the tag recognition
 * Ensuring "Button" does not turn into "button"
 * Ideally this would be an option, but it isn't.
 * Official XML parser doesn't work for this for different reasons...
 */

// @ts-nocheck
"use strict";
var T = (e, r) => () => (r || e((r = { exports: {} }).exports, r), r.exports);
var X = T(($D, Vr) => {
  var Oe = function (e) {
    return e && e.Math == Math && e;
  };
  Vr.exports =
    Oe(typeof globalThis == "object" && globalThis) ||
    Oe(typeof window == "object" && window) ||
    Oe(typeof self == "object" && self) ||
    Oe(typeof global == "object" && global) ||
    (function () {
      return this;
    })() ||
    Function("return this")();
});
var ae = T((UD, Xr) => {
  Xr.exports = function (e) {
    try {
      return !!e();
    } catch {
      return !0;
    }
  };
});
var De = T((GD, Hr) => {
  var ms = ae();
  Hr.exports = !ms(function () {
    return (
      Object.defineProperty({}, 1, {
        get: function () {
          return 7;
        },
      })[1] != 7
    );
  });
});
var qe = T((VD, zr) => {
  var gs = ae();
  zr.exports = !gs(function () {
    var e = function () {}.bind();
    return typeof e != "function" || e.hasOwnProperty("prototype");
  });
});
var le = T((XD, Wr) => {
  var Fs = qe(),
    Ie = Function.prototype.call;
  Wr.exports = Fs
    ? Ie.bind(Ie)
    : function () {
        return Ie.apply(Ie, arguments);
      };
});
var Jr = T((Kr) => {
  "use strict";
  var Yr = {}.propertyIsEnumerable,
    Qr = Object.getOwnPropertyDescriptor,
    As = Qr && !Yr.call({ 1: 2 }, 1);
  Kr.f = As
    ? function (r) {
        var t = Qr(this, r);
        return !!t && t.enumerable;
      }
    : Yr;
});
var Re = T((zD, Zr) => {
  Zr.exports = function (e, r) {
    return {
      enumerable: !(e & 1),
      configurable: !(e & 2),
      writable: !(e & 4),
      value: r,
    };
  };
});
var te = T((WD, tt) => {
  var et = qe(),
    rt = Function.prototype,
    vs = rt.bind,
    rr = rt.call,
    _s = et && vs.bind(rr, rr);
  tt.exports = et
    ? function (e) {
        return e && _s(e);
      }
    : function (e) {
        return (
          e &&
          function () {
            return rr.apply(e, arguments);
          }
        );
      };
});
var xe = T((YD, nt) => {
  var ut = te(),
    Ss = ut({}.toString),
    ys = ut("".slice);
  nt.exports = function (e) {
    return ys(Ss(e), 8, -1);
  };
});
var at = T((QD, st) => {
  var Ts = X(),
    Bs = te(),
    bs = ae(),
    ws = xe(),
    tr = Ts.Object,
    Ns = Bs("".split);
  st.exports = bs(function () {
    return !tr("z").propertyIsEnumerable(0);
  })
    ? function (e) {
        return ws(e) == "String" ? Ns(e, "") : tr(e);
      }
    : tr;
});
var ur = T((KD, it) => {
  var Os = X(),
    qs = Os.TypeError;
  it.exports = function (e) {
    if (e == null) throw qs("Can't call method on " + e);
    return e;
  };
});
var Pe = T((JD, ot) => {
  var Is = at(),
    Rs = ur();
  ot.exports = function (e) {
    return Is(Rs(e));
  };
});
var ue = T((ZD, ct) => {
  ct.exports = function (e) {
    return typeof e == "function";
  };
});
var he = T((el, Dt) => {
  var xs = ue();
  Dt.exports = function (e) {
    return typeof e == "object" ? e !== null : xs(e);
  };
});
var ve = T((rl, lt) => {
  var nr = X(),
    Ps = ue(),
    ks = function (e) {
      return Ps(e) ? e : void 0;
    };
  lt.exports = function (e, r) {
    return arguments.length < 2 ? ks(nr[e]) : nr[e] && nr[e][r];
  };
});
var sr = T((tl, ht) => {
  var Ls = te();
  ht.exports = Ls({}.isPrototypeOf);
});
var ft = T((ul, pt) => {
  var Ms = ve();
  pt.exports = Ms("navigator", "userAgent") || "";
});
var At = T((nl, Ft) => {
  var gt = X(),
    ar = ft(),
    dt = gt.process,
    Et = gt.Deno,
    Ct = (dt && dt.versions) || (Et && Et.version),
    mt = Ct && Ct.v8,
    ne,
    ke;
  mt &&
    ((ne = mt.split(".")),
    (ke = ne[0] > 0 && ne[0] < 4 ? 1 : +(ne[0] + ne[1])));
  !ke &&
    ar &&
    ((ne = ar.match(/Edge\/(\d+)/)),
    (!ne || ne[1] >= 74) &&
      ((ne = ar.match(/Chrome\/(\d+)/)), ne && (ke = +ne[1])));
  Ft.exports = ke;
});
var ir = T((sl, _t) => {
  var vt = At(),
    js = ae();
  _t.exports =
    !!Object.getOwnPropertySymbols &&
    !js(function () {
      var e = Symbol();
      return (
        !String(e) ||
        !(Object(e) instanceof Symbol) ||
        (!Symbol.sham && vt && vt < 41)
      );
    });
});
var or = T((al, St) => {
  var $s = ir();
  St.exports = $s && !Symbol.sham && typeof Symbol.iterator == "symbol";
});
var cr = T((il, yt) => {
  var Us = X(),
    Gs = ve(),
    Vs = ue(),
    Xs = sr(),
    Hs = or(),
    zs = Us.Object;
  yt.exports = Hs
    ? function (e) {
        return typeof e == "symbol";
      }
    : function (e) {
        var r = Gs("Symbol");
        return Vs(r) && Xs(r.prototype, zs(e));
      };
});
var Le = T((ol, Tt) => {
  var Ws = X(),
    Ys = Ws.String;
  Tt.exports = function (e) {
    try {
      return Ys(e);
    } catch {
      return "Object";
    }
  };
});
var _e = T((cl, Bt) => {
  var Qs = X(),
    Ks = ue(),
    Js = Le(),
    Zs = Qs.TypeError;
  Bt.exports = function (e) {
    if (Ks(e)) return e;
    throw Zs(Js(e) + " is not a function");
  };
});
var Me = T((Dl, bt) => {
  var ea = _e();
  bt.exports = function (e, r) {
    var t = e[r];
    return t == null ? void 0 : ea(t);
  };
});
var Nt = T((ll, wt) => {
  var ra = X(),
    Dr = le(),
    lr = ue(),
    hr = he(),
    ta = ra.TypeError;
  wt.exports = function (e, r) {
    var t, s;
    if (
      (r === "string" && lr((t = e.toString)) && !hr((s = Dr(t, e)))) ||
      (lr((t = e.valueOf)) && !hr((s = Dr(t, e)))) ||
      (r !== "string" && lr((t = e.toString)) && !hr((s = Dr(t, e))))
    )
      return s;
    throw ta("Can't convert object to primitive value");
  };
});
var qt = T((hl, Ot) => {
  Ot.exports = !1;
});
var je = T((pl, Rt) => {
  var It = X(),
    ua = Object.defineProperty;
  Rt.exports = function (e, r) {
    try {
      ua(It, e, { value: r, configurable: !0, writable: !0 });
    } catch {
      It[e] = r;
    }
    return r;
  };
});
var $e = T((fl, Pt) => {
  var na = X(),
    sa = je(),
    xt = "__core-js_shared__",
    aa = na[xt] || sa(xt, {});
  Pt.exports = aa;
});
var pr = T((dl, Lt) => {
  var ia = qt(),
    kt = $e();
  (Lt.exports = function (e, r) {
    return kt[e] || (kt[e] = r !== void 0 ? r : {});
  })("versions", []).push({
    version: "3.22.2",
    mode: ia ? "pure" : "global",
    copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)",
    license: "https://github.com/zloirock/core-js/blob/v3.22.2/LICENSE",
    source: "https://github.com/zloirock/core-js",
  });
});
var fr = T((El, Mt) => {
  var oa = X(),
    ca = ur(),
    Da = oa.Object;
  Mt.exports = function (e) {
    return Da(ca(e));
  };
});
var oe = T((Cl, jt) => {
  var la = te(),
    ha = fr(),
    pa = la({}.hasOwnProperty);
  jt.exports =
    Object.hasOwn ||
    function (r, t) {
      return pa(ha(r), t);
    };
});
var dr = T((ml, $t) => {
  var fa = te(),
    da = 0,
    Ea = Math.random(),
    Ca = fa((1).toString);
  $t.exports = function (e) {
    return "Symbol(" + (e === void 0 ? "" : e) + ")_" + Ca(++da + Ea, 36);
  };
});
var fe = T((gl, Ht) => {
  var ma = X(),
    ga = pr(),
    Ut = oe(),
    Fa = dr(),
    Gt = ir(),
    Xt = or(),
    Ce = ga("wks"),
    pe = ma.Symbol,
    Vt = pe && pe.for,
    Aa = Xt ? pe : (pe && pe.withoutSetter) || Fa;
  Ht.exports = function (e) {
    if (!Ut(Ce, e) || !(Gt || typeof Ce[e] == "string")) {
      var r = "Symbol." + e;
      Gt && Ut(pe, e)
        ? (Ce[e] = pe[e])
        : Xt && Vt
        ? (Ce[e] = Vt(r))
        : (Ce[e] = Aa(r));
    }
    return Ce[e];
  };
});
var Qt = T((Fl, Yt) => {
  var va = X(),
    _a = le(),
    zt = he(),
    Wt = cr(),
    Sa = Me(),
    ya = Nt(),
    Ta = fe(),
    Ba = va.TypeError,
    ba = Ta("toPrimitive");
  Yt.exports = function (e, r) {
    if (!zt(e) || Wt(e)) return e;
    var t = Sa(e, ba),
      s;
    if (t) {
      if ((r === void 0 && (r = "default"), (s = _a(t, e, r)), !zt(s) || Wt(s)))
        return s;
      throw Ba("Can't convert object to primitive value");
    }
    return r === void 0 && (r = "number"), ya(e, r);
  };
});
var Ue = T((Al, Kt) => {
  var wa = Qt(),
    Na = cr();
  Kt.exports = function (e) {
    var r = wa(e, "string");
    return Na(r) ? r : r + "";
  };
});
var eu = T((vl, Zt) => {
  var Oa = X(),
    Jt = he(),
    Er = Oa.document,
    qa = Jt(Er) && Jt(Er.createElement);
  Zt.exports = function (e) {
    return qa ? Er.createElement(e) : {};
  };
});
var Cr = T((_l, ru) => {
  var Ia = De(),
    Ra = ae(),
    xa = eu();
  ru.exports =
    !Ia &&
    !Ra(function () {
      return (
        Object.defineProperty(xa("div"), "a", {
          get: function () {
            return 7;
          },
        }).a != 7
      );
    });
});
var mr = T((uu) => {
  var Pa = De(),
    ka = le(),
    La = Jr(),
    Ma = Re(),
    ja = Pe(),
    $a = Ue(),
    Ua = oe(),
    Ga = Cr(),
    tu = Object.getOwnPropertyDescriptor;
  uu.f = Pa
    ? tu
    : function (r, t) {
        if (((r = ja(r)), (t = $a(t)), Ga))
          try {
            return tu(r, t);
          } catch {}
        if (Ua(r, t)) return Ma(!ka(La.f, r, t), r[t]);
      };
});
var su = T((yl, nu) => {
  var Va = De(),
    Xa = ae();
  nu.exports =
    Va &&
    Xa(function () {
      return (
        Object.defineProperty(function () {}, "prototype", {
          value: 42,
          writable: !1,
        }).prototype != 42
      );
    });
});
var me = T((Tl, iu) => {
  var au = X(),
    Ha = he(),
    za = au.String,
    Wa = au.TypeError;
  iu.exports = function (e) {
    if (Ha(e)) return e;
    throw Wa(za(e) + " is not an object");
  };
});
var Ve = T((cu) => {
  var Ya = X(),
    Qa = De(),
    Ka = Cr(),
    Ja = su(),
    Ge = me(),
    ou = Ue(),
    Za = Ya.TypeError,
    gr = Object.defineProperty,
    ei = Object.getOwnPropertyDescriptor,
    Fr = "enumerable",
    Ar = "configurable",
    vr = "writable";
  cu.f = Qa
    ? Ja
      ? function (r, t, s) {
          if (
            (Ge(r),
            (t = ou(t)),
            Ge(s),
            typeof r == "function" &&
              t === "prototype" &&
              "value" in s &&
              vr in s &&
              !s[vr])
          ) {
            var c = ei(r, t);
            c &&
              c[vr] &&
              ((r[t] = s.value),
              (s = {
                configurable: Ar in s ? s[Ar] : c[Ar],
                enumerable: Fr in s ? s[Fr] : c[Fr],
                writable: !1,
              }));
          }
          return gr(r, t, s);
        }
      : gr
    : function (r, t, s) {
        if ((Ge(r), (t = ou(t)), Ge(s), Ka))
          try {
            return gr(r, t, s);
          } catch {}
        if ("get" in s || "set" in s) throw Za("Accessors not supported");
        return "value" in s && (r[t] = s.value), r;
      };
});
var Xe = T((bl, Du) => {
  var ri = De(),
    ti = Ve(),
    ui = Re();
  Du.exports = ri
    ? function (e, r, t) {
        return ti.f(e, r, ui(1, t));
      }
    : function (e, r, t) {
        return (e[r] = t), e;
      };
});
var He = T((wl, lu) => {
  var ni = te(),
    si = ue(),
    _r = $e(),
    ai = ni(Function.toString);
  si(_r.inspectSource) ||
    (_r.inspectSource = function (e) {
      return ai(e);
    });
  lu.exports = _r.inspectSource;
});
var fu = T((Nl, pu) => {
  var ii = X(),
    oi = ue(),
    ci = He(),
    hu = ii.WeakMap;
  pu.exports = oi(hu) && /native code/.test(ci(hu));
});
var Cu = T((Ol, Eu) => {
  var Di = pr(),
    li = dr(),
    du = Di("keys");
  Eu.exports = function (e) {
    return du[e] || (du[e] = li(e));
  };
});
var Sr = T((ql, mu) => {
  mu.exports = {};
});
var Su = T((Il, _u) => {
  var hi = fu(),
    vu = X(),
    yr = te(),
    pi = he(),
    fi = Xe(),
    Tr = oe(),
    Br = $e(),
    di = Cu(),
    Ei = Sr(),
    gu = "Object already initialized",
    wr = vu.TypeError,
    Ci = vu.WeakMap,
    ze,
    Se,
    We,
    mi = function (e) {
      return We(e) ? Se(e) : ze(e, {});
    },
    gi = function (e) {
      return function (r) {
        var t;
        if (!pi(r) || (t = Se(r)).type !== e)
          throw wr("Incompatible receiver, " + e + " required");
        return t;
      };
    };
  hi || Br.state
    ? ((ce = Br.state || (Br.state = new Ci())),
      (Fu = yr(ce.get)),
      (br = yr(ce.has)),
      (Au = yr(ce.set)),
      (ze = function (e, r) {
        if (br(ce, e)) throw new wr(gu);
        return (r.facade = e), Au(ce, e, r), r;
      }),
      (Se = function (e) {
        return Fu(ce, e) || {};
      }),
      (We = function (e) {
        return br(ce, e);
      }))
    : ((de = di("state")),
      (Ei[de] = !0),
      (ze = function (e, r) {
        if (Tr(e, de)) throw new wr(gu);
        return (r.facade = e), fi(e, de, r), r;
      }),
      (Se = function (e) {
        return Tr(e, de) ? e[de] : {};
      }),
      (We = function (e) {
        return Tr(e, de);
      }));
  var ce, Fu, br, Au, de;
  _u.exports = { set: ze, get: Se, has: We, enforce: mi, getterFor: gi };
});
var Bu = T((Rl, Tu) => {
  var Nr = De(),
    Fi = oe(),
    yu = Function.prototype,
    Ai = Nr && Object.getOwnPropertyDescriptor,
    Or = Fi(yu, "name"),
    vi = Or && function () {}.name === "something",
    _i = Or && (!Nr || (Nr && Ai(yu, "name").configurable));
  Tu.exports = { EXISTS: Or, PROPER: vi, CONFIGURABLE: _i };
});
var qu = T((xl, Ou) => {
  var Si = X(),
    bu = ue(),
    yi = oe(),
    wu = Xe(),
    Ti = je(),
    Bi = He(),
    Nu = Su(),
    bi = Bu().CONFIGURABLE,
    wi = Nu.get,
    Ni = Nu.enforce,
    Oi = String(String).split("String");
  (Ou.exports = function (e, r, t, s) {
    var c = s ? !!s.unsafe : !1,
      n = s ? !!s.enumerable : !1,
      a = s ? !!s.noTargetGet : !1,
      f = s && s.name !== void 0 ? s.name : r,
      D;
    if (
      (bu(t) &&
        (String(f).slice(0, 7) === "Symbol(" &&
          (f = "[" + String(f).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
        (!yi(t, "name") || (bi && t.name !== f)) && wu(t, "name", f),
        (D = Ni(t)),
        D.source || (D.source = Oi.join(typeof f == "string" ? f : ""))),
      e === Si)
    ) {
      n ? (e[r] = t) : Ti(r, t);
      return;
    } else c ? !a && e[r] && (n = !0) : delete e[r];
    n ? (e[r] = t) : wu(e, r, t);
  })(Function.prototype, "toString", function () {
    return (bu(this) && wi(this).source) || Bi(this);
  });
});
var qr = T((Pl, Iu) => {
  var qi = Math.ceil,
    Ii = Math.floor;
  Iu.exports = function (e) {
    var r = +e;
    return r !== r || r === 0 ? 0 : (r > 0 ? Ii : qi)(r);
  };
});
var xu = T((kl, Ru) => {
  var Ri = qr(),
    xi = Math.max,
    Pi = Math.min;
  Ru.exports = function (e, r) {
    var t = Ri(e);
    return t < 0 ? xi(t + r, 0) : Pi(t, r);
  };
});
var ku = T((Ll, Pu) => {
  var ki = qr(),
    Li = Math.min;
  Pu.exports = function (e) {
    return e > 0 ? Li(ki(e), 9007199254740991) : 0;
  };
});
var ye = T((Ml, Lu) => {
  var Mi = ku();
  Lu.exports = function (e) {
    return Mi(e.length);
  };
});
var $u = T((jl, ju) => {
  var ji = Pe(),
    $i = xu(),
    Ui = ye(),
    Mu = function (e) {
      return function (r, t, s) {
        var c = ji(r),
          n = Ui(c),
          a = $i(s, n),
          f;
        if (e && t != t) {
          for (; n > a; ) if (((f = c[a++]), f != f)) return !0;
        } else
          for (; n > a; a++)
            if ((e || a in c) && c[a] === t) return e || a || 0;
        return !e && -1;
      };
    };
  ju.exports = { includes: Mu(!0), indexOf: Mu(!1) };
});
var Vu = T(($l, Gu) => {
  var Gi = te(),
    Ir = oe(),
    Vi = Pe(),
    Xi = $u().indexOf,
    Hi = Sr(),
    Uu = Gi([].push);
  Gu.exports = function (e, r) {
    var t = Vi(e),
      s = 0,
      c = [],
      n;
    for (n in t) !Ir(Hi, n) && Ir(t, n) && Uu(c, n);
    for (; r.length > s; ) Ir(t, (n = r[s++])) && (~Xi(c, n) || Uu(c, n));
    return c;
  };
});
var Hu = T((Ul, Xu) => {
  Xu.exports = [
    "constructor",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toLocaleString",
    "toString",
    "valueOf",
  ];
});
var Wu = T((zu) => {
  var zi = Vu(),
    Wi = Hu(),
    Yi = Wi.concat("length", "prototype");
  zu.f =
    Object.getOwnPropertyNames ||
    function (r) {
      return zi(r, Yi);
    };
});
var Qu = T((Yu) => {
  Yu.f = Object.getOwnPropertySymbols;
});
var Ju = T((Xl, Ku) => {
  var Qi = ve(),
    Ki = te(),
    Ji = Wu(),
    Zi = Qu(),
    eo = me(),
    ro = Ki([].concat);
  Ku.exports =
    Qi("Reflect", "ownKeys") ||
    function (r) {
      var t = Ji.f(eo(r)),
        s = Zi.f;
      return s ? ro(t, s(r)) : t;
    };
});
var rn = T((Hl, en) => {
  var Zu = oe(),
    to = Ju(),
    uo = mr(),
    no = Ve();
  en.exports = function (e, r, t) {
    for (var s = to(r), c = no.f, n = uo.f, a = 0; a < s.length; a++) {
      var f = s[a];
      !Zu(e, f) && !(t && Zu(t, f)) && c(e, f, n(r, f));
    }
  };
});
var un = T((zl, tn) => {
  var so = ae(),
    ao = ue(),
    io = /#|\.prototype\./,
    Te = function (e, r) {
      var t = co[oo(e)];
      return t == lo ? !0 : t == Do ? !1 : ao(r) ? so(r) : !!r;
    },
    oo = (Te.normalize = function (e) {
      return String(e).replace(io, ".").toLowerCase();
    }),
    co = (Te.data = {}),
    Do = (Te.NATIVE = "N"),
    lo = (Te.POLYFILL = "P");
  tn.exports = Te;
});
var Ye = T((Wl, nn) => {
  var Rr = X(),
    ho = mr().f,
    po = Xe(),
    fo = qu(),
    Eo = je(),
    Co = rn(),
    mo = un();
  nn.exports = function (e, r) {
    var t = e.target,
      s = e.global,
      c = e.stat,
      n,
      a,
      f,
      D,
      v,
      i;
    if (
      (s
        ? (a = Rr)
        : c
        ? (a = Rr[t] || Eo(t, {}))
        : (a = (Rr[t] || {}).prototype),
      a)
    )
      for (f in r) {
        if (
          ((v = r[f]),
          e.noTargetGet ? ((i = ho(a, f)), (D = i && i.value)) : (D = a[f]),
          (n = mo(s ? f : t + (c ? "." : "#") + f, e.forced)),
          !n && D !== void 0)
        ) {
          if (typeof v == typeof D) continue;
          Co(v, D);
        }
        (e.sham || (D && D.sham)) && po(v, "sham", !0), fo(a, f, v, e);
      }
  };
});
var sn = T(() => {
  var go = Ye(),
    Fo = X();
  go({ global: !0 }, { globalThis: Fo });
});
var xr = T((Kl, an) => {
  var Ao = xe();
  an.exports =
    Array.isArray ||
    function (r) {
      return Ao(r) == "Array";
    };
});
var Pr = T((Jl, cn) => {
  var on = te(),
    vo = _e(),
    _o = qe(),
    So = on(on.bind);
  cn.exports = function (e, r) {
    return (
      vo(e),
      r === void 0
        ? e
        : _o
        ? So(e, r)
        : function () {
            return e.apply(r, arguments);
          }
    );
  };
});
var hn = T((Zl, ln) => {
  "use strict";
  var yo = X(),
    To = xr(),
    Bo = ye(),
    bo = Pr(),
    wo = yo.TypeError,
    Dn = function (e, r, t, s, c, n, a, f) {
      for (var D = c, v = 0, i = a ? bo(a, f) : !1, l, p; v < s; ) {
        if (v in t) {
          if (((l = i ? i(t[v], v, r) : t[v]), n > 0 && To(l)))
            (p = Bo(l)), (D = Dn(e, r, l, p, D, n - 1) - 1);
          else {
            if (D >= 9007199254740991)
              throw wo("Exceed the acceptable array length");
            e[D] = l;
          }
          D++;
        }
        v++;
      }
      return D;
    };
  ln.exports = Dn;
});
var dn = T((e2, fn) => {
  var No = fe(),
    Oo = No("toStringTag"),
    pn = {};
  pn[Oo] = "z";
  fn.exports = String(pn) === "[object z]";
});
var kr = T((r2, En) => {
  var qo = X(),
    Io = dn(),
    Ro = ue(),
    Qe = xe(),
    xo = fe(),
    Po = xo("toStringTag"),
    ko = qo.Object,
    Lo =
      Qe(
        (function () {
          return arguments;
        })()
      ) == "Arguments",
    Mo = function (e, r) {
      try {
        return e[r];
      } catch {}
    };
  En.exports = Io
    ? Qe
    : function (e) {
        var r, t, s;
        return e === void 0
          ? "Undefined"
          : e === null
          ? "Null"
          : typeof (t = Mo((r = ko(e)), Po)) == "string"
          ? t
          : Lo
          ? Qe(r)
          : (s = Qe(r)) == "Object" && Ro(r.callee)
          ? "Arguments"
          : s;
      };
});
var vn = T((t2, An) => {
  var jo = te(),
    $o = ae(),
    Cn = ue(),
    Uo = kr(),
    Go = ve(),
    Vo = He(),
    mn = function () {},
    Xo = [],
    gn = Go("Reflect", "construct"),
    Lr = /^\s*(?:class|function)\b/,
    Ho = jo(Lr.exec),
    zo = !Lr.exec(mn),
    Be = function (r) {
      if (!Cn(r)) return !1;
      try {
        return gn(mn, Xo, r), !0;
      } catch {
        return !1;
      }
    },
    Fn = function (r) {
      if (!Cn(r)) return !1;
      switch (Uo(r)) {
        case "AsyncFunction":
        case "GeneratorFunction":
        case "AsyncGeneratorFunction":
          return !1;
      }
      try {
        return zo || !!Ho(Lr, Vo(r));
      } catch {
        return !0;
      }
    };
  Fn.sham = !0;
  An.exports =
    !gn ||
    $o(function () {
      var e;
      return (
        Be(Be.call) ||
        !Be(Object) ||
        !Be(function () {
          e = !0;
        }) ||
        e
      );
    })
      ? Fn
      : Be;
});
var Tn = T((u2, yn) => {
  var Wo = X(),
    _n = xr(),
    Yo = vn(),
    Qo = he(),
    Ko = fe(),
    Jo = Ko("species"),
    Sn = Wo.Array;
  yn.exports = function (e) {
    var r;
    return (
      _n(e) &&
        ((r = e.constructor),
        Yo(r) && (r === Sn || _n(r.prototype))
          ? (r = void 0)
          : Qo(r) && ((r = r[Jo]), r === null && (r = void 0))),
      r === void 0 ? Sn : r
    );
  };
});
var bn = T((n2, Bn) => {
  var Zo = Tn();
  Bn.exports = function (e, r) {
    return new (Zo(e))(r === 0 ? 0 : r);
  };
});
var Mr = T((s2, wn) => {
  wn.exports = {};
});
var On = T((a2, Nn) => {
  var ac = fe(),
    ic = Mr(),
    oc = ac("iterator"),
    cc = Array.prototype;
  Nn.exports = function (e) {
    return e !== void 0 && (ic.Array === e || cc[oc] === e);
  };
});
var jr = T((i2, In) => {
  var Dc = kr(),
    qn = Me(),
    lc = Mr(),
    hc = fe(),
    pc = hc("iterator");
  In.exports = function (e) {
    if (e != null) return qn(e, pc) || qn(e, "@@iterator") || lc[Dc(e)];
  };
});
var xn = T((o2, Rn) => {
  var fc = X(),
    dc = le(),
    Ec = _e(),
    Cc = me(),
    mc = Le(),
    gc = jr(),
    Fc = fc.TypeError;
  Rn.exports = function (e, r) {
    var t = arguments.length < 2 ? gc(e) : r;
    if (Ec(t)) return Cc(dc(t, e));
    throw Fc(mc(e) + " is not iterable");
  };
});
var Ln = T((c2, kn) => {
  var Ac = le(),
    Pn = me(),
    vc = Me();
  kn.exports = function (e, r, t) {
    var s, c;
    Pn(e);
    try {
      if (((s = vc(e, "return")), !s)) {
        if (r === "throw") throw t;
        return t;
      }
      s = Ac(s, e);
    } catch (n) {
      (c = !0), (s = n);
    }
    if (r === "throw") throw t;
    if (c) throw s;
    return Pn(s), t;
  };
});
var Gn = T((D2, Un) => {
  var _c = X(),
    Sc = Pr(),
    yc = le(),
    Tc = me(),
    Bc = Le(),
    bc = On(),
    wc = ye(),
    Mn = sr(),
    Nc = xn(),
    Oc = jr(),
    jn = Ln(),
    qc = _c.TypeError,
    Ke = function (e, r) {
      (this.stopped = e), (this.result = r);
    },
    $n = Ke.prototype;
  Un.exports = function (e, r, t) {
    var s = t && t.that,
      c = !!(t && t.AS_ENTRIES),
      n = !!(t && t.IS_ITERATOR),
      a = !!(t && t.INTERRUPTED),
      f = Sc(r, s),
      D,
      v,
      i,
      l,
      p,
      g,
      C,
      m = function (w) {
        return D && jn(D, "normal", w), new Ke(!0, w);
      },
      B = function (w) {
        return c
          ? (Tc(w), a ? f(w[0], w[1], m) : f(w[0], w[1]))
          : a
          ? f(w, m)
          : f(w);
      };
    if (n) D = e;
    else {
      if (((v = Oc(e)), !v)) throw qc(Bc(e) + " is not iterable");
      if (bc(v)) {
        for (i = 0, l = wc(e); l > i; i++)
          if (((p = B(e[i])), p && Mn($n, p))) return p;
        return new Ke(!1);
      }
      D = Nc(e, v);
    }
    for (g = D.next; !(C = yc(g, D)).done; ) {
      try {
        p = B(C.value);
      } catch (w) {
        jn(D, "throw", w);
      }
      if (typeof p == "object" && p && Mn($n, p)) return p;
    }
    return new Ke(!1);
  };
});
var Xn = T((l2, Vn) => {
  "use strict";
  var Ic = Ue(),
    Rc = Ve(),
    xc = Re();
  Vn.exports = function (e, r, t) {
    var s = Ic(r);
    s in e ? Rc.f(e, s, xc(0, t)) : (e[s] = t);
  };
});
sn();
var ec = Ye(),
  rc = hn(),
  tc = _e(),
  uc = fr(),
  nc = ye(),
  sc = bn();
ec(
  { target: "Array", proto: !0 },
  {
    flatMap: function (r) {
      var t = uc(this),
        s = nc(t),
        c;
      return (
        tc(r),
        (c = sc(t, 0)),
        (c.length = rc(
          c,
          t,
          t,
          s,
          0,
          1,
          r,
          arguments.length > 1 ? arguments[1] : void 0
        )),
        c
      );
    },
  }
);
var Pc = Ye(),
  kc = Gn(),
  Lc = Xn();
Pc(
  { target: "Object", stat: !0 },
  {
    fromEntries: function (r) {
      var t = {};
      return (
        kc(
          r,
          function (s, c) {
            Lc(t, s, c);
          },
          { AS_ENTRIES: !0 }
        ),
        t
      );
    },
  }
);
var Mc = ["cliName", "cliCategory", "cliDescription"],
  Hn,
  zn,
  Wn,
  Yn,
  Qn,
  Kn;
function jc(e, r) {
  if (e == null) return {};
  var t = $c(e, r),
    s,
    c;
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (c = 0; c < n.length; c++)
      (s = n[c]),
        !(r.indexOf(s) >= 0) &&
          (!Object.prototype.propertyIsEnumerable.call(e, s) || (t[s] = e[s]));
  }
  return t;
}
function $c(e, r) {
  if (e == null) return {};
  var t = {},
    s = Object.keys(e),
    c,
    n;
  for (n = 0; n < s.length; n++)
    (c = s[n]), !(r.indexOf(c) >= 0) && (t[c] = e[c]);
  return t;
}
function ge(e, r) {
  return (
    r || (r = e.slice(0)),
    Object.freeze(
      Object.defineProperties(e, { raw: { value: Object.freeze(r) } })
    )
  );
}
var Uc = Object.create,
  Je = Object.defineProperty,
  Gc = Object.getOwnPropertyDescriptor,
  $r = Object.getOwnPropertyNames,
  Vc = Object.getPrototypeOf,
  Xc = Object.prototype.hasOwnProperty,
  Fe = (e, r) =>
    function () {
      return e && (r = (0, e[$r(e)[0]])((e = 0))), r;
    },
  I = (e, r) =>
    function () {
      return r || (0, e[$r(e)[0]])((r = { exports: {} }).exports, r), r.exports;
    },
  ts = (e, r) => {
    for (var t in r) Je(e, t, { get: r[t], enumerable: !0 });
  },
  us = (e, r, t, s) => {
    if ((r && typeof r == "object") || typeof r == "function")
      for (let c of $r(r))
        !Xc.call(e, c) &&
          c !== t &&
          Je(e, c, {
            get: () => r[c],
            enumerable: !(s = Gc(r, c)) || s.enumerable,
          });
    return e;
  },
  Hc = (e, r, t) => (
    (t = e != null ? Uc(Vc(e)) : {}),
    us(
      r || !e || !e.__esModule
        ? Je(t, "default", { value: e, enumerable: !0 })
        : t,
      e
    )
  ),
  ns = (e) => us(Je({}, "__esModule", { value: !0 }), e),
  Jn,
  Zn,
  be,
  O = Fe({
    "<define:process>"() {
      (Jn = {}), (Zn = []), (be = { env: Jn, argv: Zn });
    },
  }),
  ss = I({
    "node_modules/angular-html-parser/lib/compiler/src/chars.js"(e) {
      "use strict";
      O(),
        Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.$EOF = 0),
        (e.$BSPACE = 8),
        (e.$TAB = 9),
        (e.$LF = 10),
        (e.$VTAB = 11),
        (e.$FF = 12),
        (e.$CR = 13),
        (e.$SPACE = 32),
        (e.$BANG = 33),
        (e.$DQ = 34),
        (e.$HASH = 35),
        (e.$$ = 36),
        (e.$PERCENT = 37),
        (e.$AMPERSAND = 38),
        (e.$SQ = 39),
        (e.$LPAREN = 40),
        (e.$RPAREN = 41),
        (e.$STAR = 42),
        (e.$PLUS = 43),
        (e.$COMMA = 44),
        (e.$MINUS = 45),
        (e.$PERIOD = 46),
        (e.$SLASH = 47),
        (e.$COLON = 58),
        (e.$SEMICOLON = 59),
        (e.$LT = 60),
        (e.$EQ = 61),
        (e.$GT = 62),
        (e.$QUESTION = 63),
        (e.$0 = 48),
        (e.$7 = 55),
        (e.$9 = 57),
        (e.$A = 65),
        (e.$E = 69),
        (e.$F = 70),
        (e.$X = 88),
        (e.$Z = 90),
        (e.$LBRACKET = 91),
        (e.$BACKSLASH = 92),
        (e.$RBRACKET = 93),
        (e.$CARET = 94),
        (e.$_ = 95),
        (e.$a = 97),
        (e.$b = 98),
        (e.$e = 101),
        (e.$f = 102),
        (e.$n = 110),
        (e.$r = 114),
        (e.$t = 116),
        (e.$u = 117),
        (e.$v = 118),
        (e.$x = 120),
        (e.$z = 122),
        (e.$LBRACE = 123),
        (e.$BAR = 124),
        (e.$RBRACE = 125),
        (e.$NBSP = 160),
        (e.$PIPE = 124),
        (e.$TILDA = 126),
        (e.$AT = 64),
        (e.$BT = 96);
      function r(f) {
        return (f >= e.$TAB && f <= e.$SPACE) || f == e.$NBSP;
      }
      e.isWhitespace = r;
      function t(f) {
        return e.$0 <= f && f <= e.$9;
      }
      e.isDigit = t;
      function s(f) {
        return (f >= e.$a && f <= e.$z) || (f >= e.$A && f <= e.$Z);
      }
      e.isAsciiLetter = s;
      function c(f) {
        return (f >= e.$a && f <= e.$f) || (f >= e.$A && f <= e.$F) || t(f);
      }
      e.isAsciiHexDigit = c;
      function n(f) {
        return f === e.$LF || f === e.$CR;
      }
      e.isNewLine = n;
      function a(f) {
        return e.$0 <= f && f <= e.$7;
      }
      e.isOctalDigit = a;
    },
  }),
  zc = I({
    "node_modules/angular-html-parser/lib/compiler/src/aot/static_symbol.js"(
      e
    ) {
      "use strict";
      O(), Object.defineProperty(e, "__esModule", { value: !0 });
      var r = class {
        constructor(s, c, n) {
          (this.filePath = s), (this.name = c), (this.members = n);
        }
        assertNoMembers() {
          if (this.members.length)
            throw new Error(
              "Illegal state: symbol without members expected, but got ".concat(
                JSON.stringify(this),
                "."
              )
            );
        }
      };
      e.StaticSymbol = r;
      var t = class {
        constructor() {
          this.cache = new Map();
        }
        get(s, c, n) {
          n = n || [];
          let a = n.length ? ".".concat(n.join(".")) : "",
            f = '"'.concat(s, '".').concat(c).concat(a),
            D = this.cache.get(f);
          return D || ((D = new r(s, c, n)), this.cache.set(f, D)), D;
        }
      };
      e.StaticSymbolCache = t;
    },
  }),
  Wc = I({
    "node_modules/angular-html-parser/lib/compiler/src/util.js"(e) {
      "use strict";
      O(), Object.defineProperty(e, "__esModule", { value: !0 });
      var r = /-+([a-z0-9])/g;
      function t(o) {
        return o.replace(r, function () {
          for (var d = arguments.length, h = new Array(d), F = 0; F < d; F++)
            h[F] = arguments[F];
          return h[1].toUpperCase();
        });
      }
      e.dashCaseToCamelCase = t;
      function s(o, d) {
        return n(o, ":", d);
      }
      e.splitAtColon = s;
      function c(o, d) {
        return n(o, ".", d);
      }
      e.splitAtPeriod = c;
      function n(o, d, h) {
        let F = o.indexOf(d);
        return F == -1 ? h : [o.slice(0, F).trim(), o.slice(F + 1).trim()];
      }
      function a(o, d, h) {
        return Array.isArray(o)
          ? d.visitArray(o, h)
          : S(o)
          ? d.visitStringMap(o, h)
          : o == null ||
            typeof o == "string" ||
            typeof o == "number" ||
            typeof o == "boolean"
          ? d.visitPrimitive(o, h)
          : d.visitOther(o, h);
      }
      e.visitValue = a;
      function f(o) {
        return o != null;
      }
      e.isDefined = f;
      function D(o) {
        return o === void 0 ? null : o;
      }
      e.noUndefined = D;
      var v = class {
        visitArray(o, d) {
          return o.map((h) => a(h, this, d));
        }
        visitStringMap(o, d) {
          let h = {};
          return (
            Object.keys(o).forEach((F) => {
              h[F] = a(o[F], this, d);
            }),
            h
          );
        }
        visitPrimitive(o, d) {
          return o;
        }
        visitOther(o, d) {
          return o;
        }
      };
      (e.ValueTransformer = v),
        (e.SyncAsync = {
          assertSync: (o) => {
            if (R(o))
              throw new Error("Illegal state: value cannot be a promise");
            return o;
          },
          then: (o, d) => (R(o) ? o.then(d) : d(o)),
          all: (o) => (o.some(R) ? Promise.all(o) : o),
        });
      function i(o) {
        throw new Error("Internal Error: ".concat(o));
      }
      e.error = i;
      function l(o, d) {
        let h = Error(o);
        return (h[p] = !0), d && (h[g] = d), h;
      }
      e.syntaxError = l;
      var p = "ngSyntaxError",
        g = "ngParseErrors";
      function C(o) {
        return o[p];
      }
      e.isSyntaxError = C;
      function m(o) {
        return o[g] || [];
      }
      e.getParseErrors = m;
      function B(o) {
        return o.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
      }
      e.escapeRegExp = B;
      var w = Object.getPrototypeOf({});
      function S(o) {
        return (
          typeof o == "object" && o !== null && Object.getPrototypeOf(o) === w
        );
      }
      function N(o) {
        let d = "";
        for (let h = 0; h < o.length; h++) {
          let F = o.charCodeAt(h);
          if (F >= 55296 && F <= 56319 && o.length > h + 1) {
            let q = o.charCodeAt(h + 1);
            q >= 56320 &&
              q <= 57343 &&
              (h++, (F = ((F - 55296) << 10) + q - 56320 + 65536));
          }
          F <= 127
            ? (d += String.fromCharCode(F))
            : F <= 2047
            ? (d += String.fromCharCode(((F >> 6) & 31) | 192, (F & 63) | 128))
            : F <= 65535
            ? (d += String.fromCharCode(
                (F >> 12) | 224,
                ((F >> 6) & 63) | 128,
                (F & 63) | 128
              ))
            : F <= 2097151 &&
              (d += String.fromCharCode(
                ((F >> 18) & 7) | 240,
                ((F >> 12) & 63) | 128,
                ((F >> 6) & 63) | 128,
                (F & 63) | 128
              ));
        }
        return d;
      }
      e.utf8Encode = N;
      function b(o) {
        if (typeof o == "string") return o;
        if (o instanceof Array) return "[" + o.map(b).join(", ") + "]";
        if (o == null) return "" + o;
        if (o.overriddenName) return "".concat(o.overriddenName);
        if (o.name) return "".concat(o.name);
        if (!o.toString) return "object";
        let d = o.toString();
        if (d == null) return "" + d;
        let h = d.indexOf(`
`);
        return h === -1 ? d : d.substring(0, h);
      }
      e.stringify = b;
      function j(o) {
        return typeof o == "function" && o.hasOwnProperty("__forward_ref__")
          ? o()
          : o;
      }
      e.resolveForwardRef = j;
      function R(o) {
        return !!o && typeof o.then == "function";
      }
      e.isPromise = R;
      var U = class {
        constructor(o) {
          this.full = o;
          let d = o.split(".");
          (this.major = d[0]),
            (this.minor = d[1]),
            (this.patch = d.slice(2).join("."));
        }
      };
      e.Version = U;
      var k = typeof window < "u" && window,
        $ =
          typeof self < "u" &&
          typeof WorkerGlobalScope < "u" &&
          self instanceof WorkerGlobalScope &&
          self,
        L = typeof globalThis < "u" && globalThis,
        u = L || k || $;
      e.global = u;
    },
  }),
  Yc = I({
    "node_modules/angular-html-parser/lib/compiler/src/compile_metadata.js"(e) {
      "use strict";
      O(), Object.defineProperty(e, "__esModule", { value: !0 });
      var r = zc(),
        t = Wc(),
        s = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))|(\@[-\w]+)$/;
      function c(h) {
        return h.replace(/\W/g, "_");
      }
      e.sanitizeIdentifier = c;
      var n = 0;
      function a(h) {
        if (!h || !h.reference) return null;
        let F = h.reference;
        if (F instanceof r.StaticSymbol) return F.name;
        if (F.__anonymousType) return F.__anonymousType;
        let q = t.stringify(F);
        return (
          q.indexOf("(") >= 0
            ? ((q = "anonymous_".concat(n++)), (F.__anonymousType = q))
            : (q = c(q)),
          q
        );
      }
      e.identifierName = a;
      function f(h) {
        let F = h.reference;
        return F instanceof r.StaticSymbol
          ? F.filePath
          : "./".concat(t.stringify(F));
      }
      e.identifierModuleUrl = f;
      function D(h, F) {
        return "View_".concat(a({ reference: h }), "_").concat(F);
      }
      e.viewClassName = D;
      function v(h) {
        return "RenderType_".concat(a({ reference: h }));
      }
      e.rendererTypeName = v;
      function i(h) {
        return "HostView_".concat(a({ reference: h }));
      }
      e.hostViewClassName = i;
      function l(h) {
        return "".concat(a({ reference: h }), "NgFactory");
      }
      e.componentFactoryName = l;
      var p;
      (function (h) {
        (h[(h.Pipe = 0)] = "Pipe"),
          (h[(h.Directive = 1)] = "Directive"),
          (h[(h.NgModule = 2)] = "NgModule"),
          (h[(h.Injectable = 3)] = "Injectable");
      })((p = e.CompileSummaryKind || (e.CompileSummaryKind = {})));
      function g(h) {
        return h.value != null ? c(h.value) : a(h.identifier);
      }
      e.tokenName = g;
      function C(h) {
        return h.identifier != null ? h.identifier.reference : h.value;
      }
      e.tokenReference = C;
      var m = class {
        constructor() {
          let {
            moduleUrl: h,
            styles: F,
            styleUrls: q,
          } = arguments.length > 0 && arguments[0] !== void 0
            ? arguments[0]
            : {};
          (this.moduleUrl = h || null),
            (this.styles = R(F)),
            (this.styleUrls = R(q));
        }
      };
      e.CompileStylesheetMetadata = m;
      var B = class {
        constructor(h) {
          let {
            encapsulation: F,
            template: q,
            templateUrl: P,
            htmlAst: G,
            styles: H,
            styleUrls: K,
            externalStylesheets: z,
            animations: Y,
            ngContentSelectors: J,
            interpolation: Z,
            isInline: _,
            preserveWhitespaces: E,
          } = h;
          if (
            ((this.encapsulation = F),
            (this.template = q),
            (this.templateUrl = P),
            (this.htmlAst = G),
            (this.styles = R(H)),
            (this.styleUrls = R(K)),
            (this.externalStylesheets = R(z)),
            (this.animations = Y ? k(Y) : []),
            (this.ngContentSelectors = J || []),
            Z && Z.length != 2)
          )
            throw new Error(
              "'interpolation' should have a start and an end symbol."
            );
          (this.interpolation = Z),
            (this.isInline = _),
            (this.preserveWhitespaces = E);
        }
        toSummary() {
          return {
            ngContentSelectors: this.ngContentSelectors,
            encapsulation: this.encapsulation,
            styles: this.styles,
            animations: this.animations,
          };
        }
      };
      e.CompileTemplateMetadata = B;
      var w = class {
        static create(h) {
          let {
              isHost: F,
              type: q,
              isComponent: P,
              selector: G,
              exportAs: H,
              changeDetection: K,
              inputs: z,
              outputs: Y,
              host: J,
              providers: Z,
              viewProviders: _,
              queries: E,
              guards: A,
              viewQueries: y,
              entryComponents: x,
              template: M,
              componentViewType: V,
              rendererType: W,
              componentFactory: Q,
            } = h,
            se = {},
            Ee = {},
            er = {};
          J != null &&
            Object.keys(J).forEach((ee) => {
              let re = J[ee],
                ie = ee.match(s);
              ie === null
                ? (er[ee] = re)
                : ie[1] != null
                ? (Ee[ie[1]] = re)
                : ie[2] != null && (se[ie[2]] = re);
            });
          let Ae = {};
          z != null &&
            z.forEach((ee) => {
              let re = t.splitAtColon(ee, [ee, ee]);
              Ae[re[0]] = re[1];
            });
          let Ne = {};
          return (
            Y != null &&
              Y.forEach((ee) => {
                let re = t.splitAtColon(ee, [ee, ee]);
                Ne[re[0]] = re[1];
              }),
            new w({
              isHost: F,
              type: q,
              isComponent: !!P,
              selector: G,
              exportAs: H,
              changeDetection: K,
              inputs: Ae,
              outputs: Ne,
              hostListeners: se,
              hostProperties: Ee,
              hostAttributes: er,
              providers: Z,
              viewProviders: _,
              queries: E,
              guards: A,
              viewQueries: y,
              entryComponents: x,
              template: M,
              componentViewType: V,
              rendererType: W,
              componentFactory: Q,
            })
          );
        }
        constructor(h) {
          let {
            isHost: F,
            type: q,
            isComponent: P,
            selector: G,
            exportAs: H,
            changeDetection: K,
            inputs: z,
            outputs: Y,
            hostListeners: J,
            hostProperties: Z,
            hostAttributes: _,
            providers: E,
            viewProviders: A,
            queries: y,
            guards: x,
            viewQueries: M,
            entryComponents: V,
            template: W,
            componentViewType: Q,
            rendererType: se,
            componentFactory: Ee,
          } = h;
          (this.isHost = !!F),
            (this.type = q),
            (this.isComponent = P),
            (this.selector = G),
            (this.exportAs = H),
            (this.changeDetection = K),
            (this.inputs = z),
            (this.outputs = Y),
            (this.hostListeners = J),
            (this.hostProperties = Z),
            (this.hostAttributes = _),
            (this.providers = R(E)),
            (this.viewProviders = R(A)),
            (this.queries = R(y)),
            (this.guards = x),
            (this.viewQueries = R(M)),
            (this.entryComponents = R(V)),
            (this.template = W),
            (this.componentViewType = Q),
            (this.rendererType = se),
            (this.componentFactory = Ee);
        }
        toSummary() {
          return {
            summaryKind: p.Directive,
            type: this.type,
            isComponent: this.isComponent,
            selector: this.selector,
            exportAs: this.exportAs,
            inputs: this.inputs,
            outputs: this.outputs,
            hostListeners: this.hostListeners,
            hostProperties: this.hostProperties,
            hostAttributes: this.hostAttributes,
            providers: this.providers,
            viewProviders: this.viewProviders,
            queries: this.queries,
            guards: this.guards,
            viewQueries: this.viewQueries,
            entryComponents: this.entryComponents,
            changeDetection: this.changeDetection,
            template: this.template && this.template.toSummary(),
            componentViewType: this.componentViewType,
            rendererType: this.rendererType,
            componentFactory: this.componentFactory,
          };
        }
      };
      e.CompileDirectiveMetadata = w;
      var S = class {
        constructor(h) {
          let { type: F, name: q, pure: P } = h;
          (this.type = F), (this.name = q), (this.pure = !!P);
        }
        toSummary() {
          return {
            summaryKind: p.Pipe,
            type: this.type,
            name: this.name,
            pure: this.pure,
          };
        }
      };
      e.CompilePipeMetadata = S;
      var N = class {};
      e.CompileShallowModuleMetadata = N;
      var b = class {
        constructor(h) {
          let {
            type: F,
            providers: q,
            declaredDirectives: P,
            exportedDirectives: G,
            declaredPipes: H,
            exportedPipes: K,
            entryComponents: z,
            bootstrapComponents: Y,
            importedModules: J,
            exportedModules: Z,
            schemas: _,
            transitiveModule: E,
            id: A,
          } = h;
          (this.type = F || null),
            (this.declaredDirectives = R(P)),
            (this.exportedDirectives = R(G)),
            (this.declaredPipes = R(H)),
            (this.exportedPipes = R(K)),
            (this.providers = R(q)),
            (this.entryComponents = R(z)),
            (this.bootstrapComponents = R(Y)),
            (this.importedModules = R(J)),
            (this.exportedModules = R(Z)),
            (this.schemas = R(_)),
            (this.id = A || null),
            (this.transitiveModule = E || null);
        }
        toSummary() {
          let h = this.transitiveModule;
          return {
            summaryKind: p.NgModule,
            type: this.type,
            entryComponents: h.entryComponents,
            providers: h.providers,
            modules: h.modules,
            exportedDirectives: h.exportedDirectives,
            exportedPipes: h.exportedPipes,
          };
        }
      };
      e.CompileNgModuleMetadata = b;
      var j = class {
        constructor() {
          (this.directivesSet = new Set()),
            (this.directives = []),
            (this.exportedDirectivesSet = new Set()),
            (this.exportedDirectives = []),
            (this.pipesSet = new Set()),
            (this.pipes = []),
            (this.exportedPipesSet = new Set()),
            (this.exportedPipes = []),
            (this.modulesSet = new Set()),
            (this.modules = []),
            (this.entryComponentsSet = new Set()),
            (this.entryComponents = []),
            (this.providers = []);
        }
        addProvider(h, F) {
          this.providers.push({ provider: h, module: F });
        }
        addDirective(h) {
          this.directivesSet.has(h.reference) ||
            (this.directivesSet.add(h.reference), this.directives.push(h));
        }
        addExportedDirective(h) {
          this.exportedDirectivesSet.has(h.reference) ||
            (this.exportedDirectivesSet.add(h.reference),
            this.exportedDirectives.push(h));
        }
        addPipe(h) {
          this.pipesSet.has(h.reference) ||
            (this.pipesSet.add(h.reference), this.pipes.push(h));
        }
        addExportedPipe(h) {
          this.exportedPipesSet.has(h.reference) ||
            (this.exportedPipesSet.add(h.reference),
            this.exportedPipes.push(h));
        }
        addModule(h) {
          this.modulesSet.has(h.reference) ||
            (this.modulesSet.add(h.reference), this.modules.push(h));
        }
        addEntryComponent(h) {
          this.entryComponentsSet.has(h.componentType) ||
            (this.entryComponentsSet.add(h.componentType),
            this.entryComponents.push(h));
        }
      };
      e.TransitiveCompileNgModuleMetadata = j;
      function R(h) {
        return h || [];
      }
      var U = class {
        constructor(h, F) {
          let {
            useClass: q,
            useValue: P,
            useExisting: G,
            useFactory: H,
            deps: K,
            multi: z,
          } = F;
          (this.token = h),
            (this.useClass = q || null),
            (this.useValue = P),
            (this.useExisting = G),
            (this.useFactory = H || null),
            (this.dependencies = K || null),
            (this.multi = !!z);
        }
      };
      e.ProviderMeta = U;
      function k(h) {
        return h.reduce((F, q) => {
          let P = Array.isArray(q) ? k(q) : q;
          return F.concat(P);
        }, []);
      }
      e.flatten = k;
      function $(h) {
        return h.replace(/(\w+:\/\/[\w:-]+)?(\/+)?/, "ng:///");
      }
      function L(h, F, q) {
        let P;
        return (
          q.isInline
            ? F.type.reference instanceof r.StaticSymbol
              ? (P = ""
                  .concat(F.type.reference.filePath, ".")
                  .concat(F.type.reference.name, ".html"))
              : (P = "".concat(a(h), "/").concat(a(F.type), ".html"))
            : (P = q.templateUrl),
          F.type.reference instanceof r.StaticSymbol ? P : $(P)
        );
      }
      e.templateSourceUrl = L;
      function u(h, F) {
        let q = h.moduleUrl.split(/\/\\/g),
          P = q[q.length - 1];
        return $("css/".concat(F).concat(P, ".ngstyle.js"));
      }
      e.sharedStylesheetJitUrl = u;
      function o(h) {
        return $("".concat(a(h.type), "/module.ngfactory.js"));
      }
      e.ngModuleJitUrl = o;
      function d(h, F) {
        return $("".concat(a(h), "/").concat(a(F.type), ".ngfactory.js"));
      }
      e.templateJitUrl = d;
    },
  }),
  we = I({
    "node_modules/angular-html-parser/lib/compiler/src/parse_util.js"(e) {
      "use strict";
      O(), Object.defineProperty(e, "__esModule", { value: !0 });
      var r = ss(),
        t = Yc(),
        s = class {
          constructor(i, l, p, g) {
            (this.file = i), (this.offset = l), (this.line = p), (this.col = g);
          }
          toString() {
            return this.offset != null
              ? ""
                  .concat(this.file.url, "@")
                  .concat(this.line, ":")
                  .concat(this.col)
              : this.file.url;
          }
          moveBy(i) {
            let l = this.file.content,
              p = l.length,
              g = this.offset,
              C = this.line,
              m = this.col;
            for (; g > 0 && i < 0; )
              if ((g--, i++, l.charCodeAt(g) == r.$LF)) {
                C--;
                let w = l
                  .substr(0, g - 1)
                  .lastIndexOf(String.fromCharCode(r.$LF));
                m = w > 0 ? g - w : g;
              } else m--;
            for (; g < p && i > 0; ) {
              let B = l.charCodeAt(g);
              g++, i--, B == r.$LF ? (C++, (m = 0)) : m++;
            }
            return new s(this.file, g, C, m);
          }
          getContext(i, l) {
            let p = this.file.content,
              g = this.offset;
            if (g != null) {
              g > p.length - 1 && (g = p.length - 1);
              let C = g,
                m = 0,
                B = 0;
              for (
                ;
                m < i &&
                g > 0 &&
                (g--,
                m++,
                !(
                  p[g] ==
                    `
` && ++B == l
                ));

              );
              for (
                m = 0, B = 0;
                m < i &&
                C < p.length - 1 &&
                (C++,
                m++,
                !(
                  p[C] ==
                    `
` && ++B == l
                ));

              );
              return {
                before: p.substring(g, this.offset),
                after: p.substring(this.offset, C + 1),
              };
            }
            return null;
          }
        };
      e.ParseLocation = s;
      var c = class {
        constructor(i, l) {
          (this.content = i), (this.url = l);
        }
      };
      e.ParseSourceFile = c;
      var n = class {
        constructor(i, l) {
          let p =
            arguments.length > 2 && arguments[2] !== void 0
              ? arguments[2]
              : null;
          (this.start = i), (this.end = l), (this.details = p);
        }
        toString() {
          return this.start.file.content.substring(
            this.start.offset,
            this.end.offset
          );
        }
      };
      (e.ParseSourceSpan = n),
        (e.EMPTY_PARSE_LOCATION = new s(new c("", ""), 0, 0, 0)),
        (e.EMPTY_SOURCE_SPAN = new n(
          e.EMPTY_PARSE_LOCATION,
          e.EMPTY_PARSE_LOCATION
        ));
      var a;
      (function (i) {
        (i[(i.WARNING = 0)] = "WARNING"), (i[(i.ERROR = 1)] = "ERROR");
      })((a = e.ParseErrorLevel || (e.ParseErrorLevel = {})));
      var f = class {
        constructor(i, l) {
          let p =
            arguments.length > 2 && arguments[2] !== void 0
              ? arguments[2]
              : a.ERROR;
          (this.span = i), (this.msg = l), (this.level = p);
        }
        contextualMessage() {
          let i = this.span.start.getContext(100, 3);
          return i
            ? ""
                .concat(this.msg, ' ("')
                .concat(i.before, "[")
                .concat(a[this.level], " ->]")
                .concat(i.after, '")')
            : this.msg;
        }
        toString() {
          let i = this.span.details ? ", ".concat(this.span.details) : "";
          return ""
            .concat(this.contextualMessage(), ": ")
            .concat(this.span.start)
            .concat(i);
        }
      };
      e.ParseError = f;
      function D(i, l) {
        let p = t.identifierModuleUrl(l),
          g =
            p != null
              ? "in "
                  .concat(i, " ")
                  .concat(t.identifierName(l), " in ")
                  .concat(p)
              : "in ".concat(i, " ").concat(t.identifierName(l)),
          C = new c("", g);
        return new n(new s(C, -1, -1, -1), new s(C, -1, -1, -1));
      }
      e.typeSourceSpan = D;
      function v(i, l, p) {
        let g = "in ".concat(i, " ").concat(l, " in ").concat(p),
          C = new c("", g);
        return new n(new s(C, -1, -1, -1), new s(C, -1, -1, -1));
      }
      e.r3JitTypeSourceSpan = v;
    },
  }),
  Qc = I({
    "src/utils/front-matter/parse.js"(e, r) {
      "use strict";
      O();
      var t = new RegExp(
        "^(?<startDelimiter>-{3}|\\+{3})(?<language>[^\\n]*)\\n(?:|(?<value>.*?)\\n)(?<endDelimiter>\\k<startDelimiter>|\\.{3})[^\\S\\n]*(?:\\n|$)",
        "s"
      );
      function s(c) {
        let n = c.match(t);
        if (!n) return { content: c };
        let {
            startDelimiter: a,
            language: f,
            value: D = "",
            endDelimiter: v,
          } = n.groups,
          i = f.trim() || "yaml";
        if ((a === "+++" && (i = "toml"), i !== "yaml" && a !== v))
          return { content: c };
        let [l] = n;
        return {
          frontMatter: {
            type: "front-matter",
            lang: i,
            value: D,
            startDelimiter: a,
            endDelimiter: v,
            raw: l.replace(/\n$/, ""),
          },
          content: l.replace(/[^\n]/g, " ") + c.slice(l.length),
        };
      }
      r.exports = s;
    },
  }),
  as = I({
    "src/utils/get-last.js"(e, r) {
      "use strict";
      O();
      var t = (s) => s[s.length - 1];
      r.exports = t;
    },
  }),
  Kc = I({
    "src/common/parser-create-error.js"(e, r) {
      "use strict";
      O();
      function t(s, c) {
        let n = new SyntaxError(
          s + " (" + c.start.line + ":" + c.start.column + ")"
        );
        return (n.loc = c), n;
      }
      r.exports = t;
    },
  }),
  is = {};
ts(is, { default: () => Jc });
function Jc(e) {
  if (typeof e != "string") throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var Zc = Fe({
    "node_modules/escape-string-regexp/index.js"() {
      O();
    },
  }),
  os = I({
    "node_modules/semver/internal/debug.js"(e, r) {
      O();
      var t =
        typeof be == "object" &&
        be.env &&
        be.env.NODE_DEBUG &&
        /\bsemver\b/i.test(be.env.NODE_DEBUG)
          ? function () {
              for (
                var s = arguments.length, c = new Array(s), n = 0;
                n < s;
                n++
              )
                c[n] = arguments[n];
              return console.error("SEMVER", ...c);
            }
          : () => {};
      r.exports = t;
    },
  }),
  cs = I({
    "node_modules/semver/internal/constants.js"(e, r) {
      O();
      var t = "2.0.0",
        s = 256,
        c = Number.MAX_SAFE_INTEGER || 9007199254740991,
        n = 16;
      r.exports = {
        SEMVER_SPEC_VERSION: t,
        MAX_LENGTH: s,
        MAX_SAFE_INTEGER: c,
        MAX_SAFE_COMPONENT_LENGTH: n,
      };
    },
  }),
  eD = I({
    "node_modules/semver/internal/re.js"(e, r) {
      O();
      var { MAX_SAFE_COMPONENT_LENGTH: t } = cs(),
        s = os();
      e = r.exports = {};
      var c = (e.re = []),
        n = (e.src = []),
        a = (e.t = {}),
        f = 0,
        D = (v, i, l) => {
          let p = f++;
          s(v, p, i),
            (a[v] = p),
            (n[p] = i),
            (c[p] = new RegExp(i, l ? "g" : void 0));
        };
      D("NUMERICIDENTIFIER", "0|[1-9]\\d*"),
        D("NUMERICIDENTIFIERLOOSE", "[0-9]+"),
        D("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*"),
        D(
          "MAINVERSION",
          "("
            .concat(n[a.NUMERICIDENTIFIER], ")\\.(")
            .concat(n[a.NUMERICIDENTIFIER], ")\\.(")
            .concat(n[a.NUMERICIDENTIFIER], ")")
        ),
        D(
          "MAINVERSIONLOOSE",
          "("
            .concat(n[a.NUMERICIDENTIFIERLOOSE], ")\\.(")
            .concat(n[a.NUMERICIDENTIFIERLOOSE], ")\\.(")
            .concat(n[a.NUMERICIDENTIFIERLOOSE], ")")
        ),
        D(
          "PRERELEASEIDENTIFIER",
          "(?:"
            .concat(n[a.NUMERICIDENTIFIER], "|")
            .concat(n[a.NONNUMERICIDENTIFIER], ")")
        ),
        D(
          "PRERELEASEIDENTIFIERLOOSE",
          "(?:"
            .concat(n[a.NUMERICIDENTIFIERLOOSE], "|")
            .concat(n[a.NONNUMERICIDENTIFIER], ")")
        ),
        D(
          "PRERELEASE",
          "(?:-("
            .concat(n[a.PRERELEASEIDENTIFIER], "(?:\\.")
            .concat(n[a.PRERELEASEIDENTIFIER], ")*))")
        ),
        D(
          "PRERELEASELOOSE",
          "(?:-?("
            .concat(n[a.PRERELEASEIDENTIFIERLOOSE], "(?:\\.")
            .concat(n[a.PRERELEASEIDENTIFIERLOOSE], ")*))")
        ),
        D("BUILDIDENTIFIER", "[0-9A-Za-z-]+"),
        D(
          "BUILD",
          "(?:\\+("
            .concat(n[a.BUILDIDENTIFIER], "(?:\\.")
            .concat(n[a.BUILDIDENTIFIER], ")*))")
        ),
        D(
          "FULLPLAIN",
          "v?"
            .concat(n[a.MAINVERSION])
            .concat(n[a.PRERELEASE], "?")
            .concat(n[a.BUILD], "?")
        ),
        D("FULL", "^".concat(n[a.FULLPLAIN], "$")),
        D(
          "LOOSEPLAIN",
          "[v=\\s]*"
            .concat(n[a.MAINVERSIONLOOSE])
            .concat(n[a.PRERELEASELOOSE], "?")
            .concat(n[a.BUILD], "?")
        ),
        D("LOOSE", "^".concat(n[a.LOOSEPLAIN], "$")),
        D("GTLT", "((?:<|>)?=?)"),
        D(
          "XRANGEIDENTIFIERLOOSE",
          "".concat(n[a.NUMERICIDENTIFIERLOOSE], "|x|X|\\*")
        ),
        D("XRANGEIDENTIFIER", "".concat(n[a.NUMERICIDENTIFIER], "|x|X|\\*")),
        D(
          "XRANGEPLAIN",
          "[v=\\s]*("
            .concat(n[a.XRANGEIDENTIFIER], ")(?:\\.(")
            .concat(n[a.XRANGEIDENTIFIER], ")(?:\\.(")
            .concat(n[a.XRANGEIDENTIFIER], ")(?:")
            .concat(n[a.PRERELEASE], ")?")
            .concat(n[a.BUILD], "?)?)?")
        ),
        D(
          "XRANGEPLAINLOOSE",
          "[v=\\s]*("
            .concat(n[a.XRANGEIDENTIFIERLOOSE], ")(?:\\.(")
            .concat(n[a.XRANGEIDENTIFIERLOOSE], ")(?:\\.(")
            .concat(n[a.XRANGEIDENTIFIERLOOSE], ")(?:")
            .concat(n[a.PRERELEASELOOSE], ")?")
            .concat(n[a.BUILD], "?)?)?")
        ),
        D(
          "XRANGE",
          "^".concat(n[a.GTLT], "\\s*").concat(n[a.XRANGEPLAIN], "$")
        ),
        D(
          "XRANGELOOSE",
          "^".concat(n[a.GTLT], "\\s*").concat(n[a.XRANGEPLAINLOOSE], "$")
        ),
        D(
          "COERCE",
          "(^|[^\\d])(\\d{1,"
            .concat(t, "})(?:\\.(\\d{1,")
            .concat(t, "}))?(?:\\.(\\d{1,")
            .concat(t, "}))?(?:$|[^\\d])")
        ),
        D("COERCERTL", n[a.COERCE], !0),
        D("LONETILDE", "(?:~>?)"),
        D("TILDETRIM", "(\\s*)".concat(n[a.LONETILDE], "\\s+"), !0),
        (e.tildeTrimReplace = "$1~"),
        D("TILDE", "^".concat(n[a.LONETILDE]).concat(n[a.XRANGEPLAIN], "$")),
        D(
          "TILDELOOSE",
          "^".concat(n[a.LONETILDE]).concat(n[a.XRANGEPLAINLOOSE], "$")
        ),
        D("LONECARET", "(?:\\^)"),
        D("CARETTRIM", "(\\s*)".concat(n[a.LONECARET], "\\s+"), !0),
        (e.caretTrimReplace = "$1^"),
        D("CARET", "^".concat(n[a.LONECARET]).concat(n[a.XRANGEPLAIN], "$")),
        D(
          "CARETLOOSE",
          "^".concat(n[a.LONECARET]).concat(n[a.XRANGEPLAINLOOSE], "$")
        ),
        D(
          "COMPARATORLOOSE",
          "^".concat(n[a.GTLT], "\\s*(").concat(n[a.LOOSEPLAIN], ")$|^$")
        ),
        D(
          "COMPARATOR",
          "^".concat(n[a.GTLT], "\\s*(").concat(n[a.FULLPLAIN], ")$|^$")
        ),
        D(
          "COMPARATORTRIM",
          "(\\s*)"
            .concat(n[a.GTLT], "\\s*(")
            .concat(n[a.LOOSEPLAIN], "|")
            .concat(n[a.XRANGEPLAIN], ")"),
          !0
        ),
        (e.comparatorTrimReplace = "$1$2$3"),
        D(
          "HYPHENRANGE",
          "^\\s*("
            .concat(n[a.XRANGEPLAIN], ")\\s+-\\s+(")
            .concat(n[a.XRANGEPLAIN], ")\\s*$")
        ),
        D(
          "HYPHENRANGELOOSE",
          "^\\s*("
            .concat(n[a.XRANGEPLAINLOOSE], ")\\s+-\\s+(")
            .concat(n[a.XRANGEPLAINLOOSE], ")\\s*$")
        ),
        D("STAR", "(<|>)?=?\\s*\\*"),
        D("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"),
        D("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
    },
  }),
  rD = I({
    "node_modules/semver/internal/parse-options.js"(e, r) {
      O();
      var t = ["includePrerelease", "loose", "rtl"],
        s = (c) =>
          c
            ? typeof c != "object"
              ? { loose: !0 }
              : t.filter((n) => c[n]).reduce((n, a) => ((n[a] = !0), n), {})
            : {};
      r.exports = s;
    },
  }),
  tD = I({
    "node_modules/semver/internal/identifiers.js"(e, r) {
      O();
      var t = /^[0-9]+$/,
        s = (n, a) => {
          let f = t.test(n),
            D = t.test(a);
          return (
            f && D && ((n = +n), (a = +a)),
            n === a ? 0 : f && !D ? -1 : D && !f ? 1 : n < a ? -1 : 1
          );
        },
        c = (n, a) => s(a, n);
      r.exports = { compareIdentifiers: s, rcompareIdentifiers: c };
    },
  }),
  uD = I({
    "node_modules/semver/classes/semver.js"(e, r) {
      O();
      var t = os(),
        { MAX_LENGTH: s, MAX_SAFE_INTEGER: c } = cs(),
        { re: n, t: a } = eD(),
        f = rD(),
        { compareIdentifiers: D } = tD(),
        v = class {
          constructor(i, l) {
            if (((l = f(l)), i instanceof v)) {
              if (
                i.loose === !!l.loose &&
                i.includePrerelease === !!l.includePrerelease
              )
                return i;
              i = i.version;
            } else if (typeof i != "string")
              throw new TypeError("Invalid Version: ".concat(i));
            if (i.length > s)
              throw new TypeError(
                "version is longer than ".concat(s, " characters")
              );
            t("SemVer", i, l),
              (this.options = l),
              (this.loose = !!l.loose),
              (this.includePrerelease = !!l.includePrerelease);
            let p = i.trim().match(l.loose ? n[a.LOOSE] : n[a.FULL]);
            if (!p) throw new TypeError("Invalid Version: ".concat(i));
            if (
              ((this.raw = i),
              (this.major = +p[1]),
              (this.minor = +p[2]),
              (this.patch = +p[3]),
              this.major > c || this.major < 0)
            )
              throw new TypeError("Invalid major version");
            if (this.minor > c || this.minor < 0)
              throw new TypeError("Invalid minor version");
            if (this.patch > c || this.patch < 0)
              throw new TypeError("Invalid patch version");
            p[4]
              ? (this.prerelease = p[4].split(".").map((g) => {
                  if (/^[0-9]+$/.test(g)) {
                    let C = +g;
                    if (C >= 0 && C < c) return C;
                  }
                  return g;
                }))
              : (this.prerelease = []),
              (this.build = p[5] ? p[5].split(".") : []),
              this.format();
          }
          format() {
            return (
              (this.version = ""
                .concat(this.major, ".")
                .concat(this.minor, ".")
                .concat(this.patch)),
              this.prerelease.length &&
                (this.version += "-".concat(this.prerelease.join("."))),
              this.version
            );
          }
          toString() {
            return this.version;
          }
          compare(i) {
            if (
              (t("SemVer.compare", this.version, this.options, i),
              !(i instanceof v))
            ) {
              if (typeof i == "string" && i === this.version) return 0;
              i = new v(i, this.options);
            }
            return i.version === this.version
              ? 0
              : this.compareMain(i) || this.comparePre(i);
          }
          compareMain(i) {
            return (
              i instanceof v || (i = new v(i, this.options)),
              D(this.major, i.major) ||
                D(this.minor, i.minor) ||
                D(this.patch, i.patch)
            );
          }
          comparePre(i) {
            if (
              (i instanceof v || (i = new v(i, this.options)),
              this.prerelease.length && !i.prerelease.length)
            )
              return -1;
            if (!this.prerelease.length && i.prerelease.length) return 1;
            if (!this.prerelease.length && !i.prerelease.length) return 0;
            let l = 0;
            do {
              let p = this.prerelease[l],
                g = i.prerelease[l];
              if (
                (t("prerelease compare", l, p, g), p === void 0 && g === void 0)
              )
                return 0;
              if (g === void 0) return 1;
              if (p === void 0) return -1;
              if (p === g) continue;
              return D(p, g);
            } while (++l);
          }
          compareBuild(i) {
            i instanceof v || (i = new v(i, this.options));
            let l = 0;
            do {
              let p = this.build[l],
                g = i.build[l];
              if (
                (t("prerelease compare", l, p, g), p === void 0 && g === void 0)
              )
                return 0;
              if (g === void 0) return 1;
              if (p === void 0) return -1;
              if (p === g) continue;
              return D(p, g);
            } while (++l);
          }
          inc(i, l) {
            switch (i) {
              case "premajor":
                (this.prerelease.length = 0),
                  (this.patch = 0),
                  (this.minor = 0),
                  this.major++,
                  this.inc("pre", l);
                break;
              case "preminor":
                (this.prerelease.length = 0),
                  (this.patch = 0),
                  this.minor++,
                  this.inc("pre", l);
                break;
              case "prepatch":
                (this.prerelease.length = 0),
                  this.inc("patch", l),
                  this.inc("pre", l);
                break;
              case "prerelease":
                this.prerelease.length === 0 && this.inc("patch", l),
                  this.inc("pre", l);
                break;
              case "major":
                (this.minor !== 0 ||
                  this.patch !== 0 ||
                  this.prerelease.length === 0) &&
                  this.major++,
                  (this.minor = 0),
                  (this.patch = 0),
                  (this.prerelease = []);
                break;
              case "minor":
                (this.patch !== 0 || this.prerelease.length === 0) &&
                  this.minor++,
                  (this.patch = 0),
                  (this.prerelease = []);
                break;
              case "patch":
                this.prerelease.length === 0 && this.patch++,
                  (this.prerelease = []);
                break;
              case "pre":
                if (this.prerelease.length === 0) this.prerelease = [0];
                else {
                  let p = this.prerelease.length;
                  for (; --p >= 0; )
                    typeof this.prerelease[p] == "number" &&
                      (this.prerelease[p]++, (p = -2));
                  p === -1 && this.prerelease.push(0);
                }
                l &&
                  (D(this.prerelease[0], l) === 0
                    ? isNaN(this.prerelease[1]) && (this.prerelease = [l, 0])
                    : (this.prerelease = [l, 0]));
                break;
              default:
                throw new Error("invalid increment argument: ".concat(i));
            }
            return this.format(), (this.raw = this.version), this;
          }
        };
      r.exports = v;
    },
  }),
  Ur = I({
    "node_modules/semver/functions/compare.js"(e, r) {
      O();
      var t = uD(),
        s = (c, n, a) => new t(c, a).compare(new t(n, a));
      r.exports = s;
    },
  }),
  nD = I({
    "node_modules/semver/functions/lt.js"(e, r) {
      O();
      var t = Ur(),
        s = (c, n, a) => t(c, n, a) < 0;
      r.exports = s;
    },
  }),
  sD = I({
    "node_modules/semver/functions/gte.js"(e, r) {
      O();
      var t = Ur(),
        s = (c, n, a) => t(c, n, a) >= 0;
      r.exports = s;
    },
  }),
  aD = I({
    "src/utils/arrayify.js"(e, r) {
      "use strict";
      O(),
        (r.exports = (t, s) =>
          Object.entries(t).map((c) => {
            let [n, a] = c;
            return Object.assign({ [s]: n }, a);
          }));
    },
  }),
  iD = I({
    "package.json"(e, r) {
      r.exports = { version: "2.7.1" };
    },
  }),
  oD = I({
    "node_modules/outdent/lib/index.js"(e, r) {
      "use strict";
      O(),
        Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.outdent = void 0);
      function t() {
        for (var S = [], N = 0; N < arguments.length; N++) S[N] = arguments[N];
      }
      function s() {
        return typeof WeakMap < "u" ? new WeakMap() : c();
      }
      function c() {
        return {
          add: t,
          delete: t,
          get: t,
          set: t,
          has: function (S) {
            return !1;
          },
        };
      }
      var n = Object.prototype.hasOwnProperty,
        a = function (S, N) {
          return n.call(S, N);
        };
      function f(S, N) {
        for (var b in N) a(N, b) && (S[b] = N[b]);
        return S;
      }
      var D = /^[ \t]*(?:\r\n|\r|\n)/,
        v = /(?:\r\n|\r|\n)[ \t]*$/,
        i = /^(?:[\r\n]|$)/,
        l = /(?:\r\n|\r|\n)([ \t]*)(?:[^ \t\r\n]|$)/,
        p = /^[ \t]*[\r\n][ \t\r\n]*$/;
      function g(S, N, b) {
        var j = 0,
          R = S[0].match(l);
        R && (j = R[1].length);
        var U = "(\\r\\n|\\r|\\n).{0," + j + "}",
          k = new RegExp(U, "g");
        N && (S = S.slice(1));
        var $ = b.newline,
          L = b.trimLeadingNewline,
          u = b.trimTrailingNewline,
          o = typeof $ == "string",
          d = S.length,
          h = S.map(function (F, q) {
            return (
              (F = F.replace(k, "$1")),
              q === 0 && L && (F = F.replace(D, "")),
              q === d - 1 && u && (F = F.replace(v, "")),
              o &&
                (F = F.replace(/\r\n|\n|\r/g, function (P) {
                  return $;
                })),
              F
            );
          });
        return h;
      }
      function C(S, N) {
        for (var b = "", j = 0, R = S.length; j < R; j++)
          (b += S[j]), j < R - 1 && (b += N[j]);
        return b;
      }
      function m(S) {
        return a(S, "raw") && a(S, "length");
      }
      function B(S) {
        var N = s(),
          b = s();
        function j(U) {
          for (var k = [], $ = 1; $ < arguments.length; $++)
            k[$ - 1] = arguments[$];
          if (m(U)) {
            var L = U,
              u = (k[0] === j || k[0] === w) && p.test(L[0]) && i.test(L[1]),
              o = u ? b : N,
              d = o.get(L);
            if ((d || ((d = g(L, u, S)), o.set(L, d)), k.length === 0))
              return d[0];
            var h = C(d, u ? k.slice(1) : k);
            return h;
          } else return B(f(f({}, S), U || {}));
        }
        var R = f(j, {
          string: function (U) {
            return g([U], !1, S)[0];
          },
        });
        return R;
      }
      var w = B({ trimLeadingNewline: !0, trimTrailingNewline: !0 });
      if (((e.outdent = w), (e.default = w), typeof r < "u"))
        try {
          (r.exports = w),
            Object.defineProperty(w, "__esModule", { value: !0 }),
            (w.default = w),
            (w.outdent = w);
        } catch {}
    },
  }),
  cD = I({
    "src/main/core-options.js"(e, r) {
      "use strict";
      O();
      var { outdent: t } = oD(),
        s = "Config",
        c = "Editor",
        n = "Format",
        a = "Other",
        f = "Output",
        D = "Global",
        v = "Special",
        i = {
          cursorOffset: {
            since: "1.4.0",
            category: v,
            type: "int",
            default: -1,
            range: { start: -1, end: Number.POSITIVE_INFINITY, step: 1 },
            description: t(
              Hn ||
                (Hn = ge([
                  `
      Print (to stderr) where a cursor at the given position would move to after formatting.
      This option cannot be used with --range-start and --range-end.
    `,
                ]))
            ),
            cliCategory: c,
          },
          endOfLine: {
            since: "1.15.0",
            category: D,
            type: "choice",
            default: [
              { since: "1.15.0", value: "auto" },
              { since: "2.0.0", value: "lf" },
            ],
            description: "Which end of line characters to apply.",
            choices: [
              {
                value: "lf",
                description:
                  "Line Feed only (\\n), common on Linux and macOS as well as inside git repos",
              },
              {
                value: "crlf",
                description:
                  "Carriage Return + Line Feed characters (\\r\\n), common on Windows",
              },
              {
                value: "cr",
                description:
                  "Carriage Return character only (\\r), used very rarely",
              },
              {
                value: "auto",
                description: t(
                  zn ||
                    (zn = ge([
                      `
          Maintain existing
          (mixed values within one file are normalised by looking at what's used after the first line)
        `,
                    ]))
                ),
              },
            ],
          },
          filepath: {
            since: "1.4.0",
            category: v,
            type: "path",
            description:
              "Specify the input filepath. This will be used to do parser inference.",
            cliName: "stdin-filepath",
            cliCategory: a,
            cliDescription:
              "Path to the file to pretend that stdin comes from.",
          },
          insertPragma: {
            since: "1.8.0",
            category: v,
            type: "boolean",
            default: !1,
            description:
              "Insert @format pragma into file's first docblock comment.",
            cliCategory: a,
          },
          parser: {
            since: "0.0.10",
            category: D,
            type: "choice",
            default: [
              { since: "0.0.10", value: "babylon" },
              { since: "1.13.0", value: void 0 },
            ],
            description: "Which parser to use.",
            exception: (l) => typeof l == "string" || typeof l == "function",
            choices: [
              { value: "flow", description: "Flow" },
              { value: "babel", since: "1.16.0", description: "JavaScript" },
              { value: "babel-flow", since: "1.16.0", description: "Flow" },
              { value: "babel-ts", since: "2.0.0", description: "TypeScript" },
              {
                value: "typescript",
                since: "1.4.0",
                description: "TypeScript",
              },
              { value: "acorn", since: "2.6.0", description: "JavaScript" },
              { value: "espree", since: "2.2.0", description: "JavaScript" },
              { value: "meriyah", since: "2.2.0", description: "JavaScript" },
              { value: "css", since: "1.7.1", description: "CSS" },
              { value: "less", since: "1.7.1", description: "Less" },
              { value: "scss", since: "1.7.1", description: "SCSS" },
              { value: "json", since: "1.5.0", description: "JSON" },
              { value: "json5", since: "1.13.0", description: "JSON5" },
              {
                value: "json-stringify",
                since: "1.13.0",
                description: "JSON.stringify",
              },
              { value: "graphql", since: "1.5.0", description: "GraphQL" },
              { value: "markdown", since: "1.8.0", description: "Markdown" },
              { value: "mdx", since: "1.15.0", description: "MDX" },
              { value: "vue", since: "1.10.0", description: "Vue" },
              { value: "yaml", since: "1.14.0", description: "YAML" },
              {
                value: "glimmer",
                since: "2.3.0",
                description: "Ember / Handlebars",
              },
              { value: "html", since: "1.15.0", description: "HTML" },
              { value: "angular", since: "1.15.0", description: "Angular" },
              {
                value: "lwc",
                since: "1.17.0",
                description: "Lightning Web Components",
              },
            ],
          },
          plugins: {
            since: "1.10.0",
            type: "path",
            array: !0,
            default: [{ value: [] }],
            category: D,
            description:
              "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.",
            exception: (l) => typeof l == "string" || typeof l == "object",
            cliName: "plugin",
            cliCategory: s,
          },
          pluginSearchDirs: {
            since: "1.13.0",
            type: "path",
            array: !0,
            default: [{ value: [] }],
            category: D,
            description: t(
              Wn ||
                (Wn = ge([
                  `
      Custom directory that contains prettier plugins in node_modules subdirectory.
      Overrides default behavior when plugins are searched relatively to the location of Prettier.
      Multiple values are accepted.
    `,
                ]))
            ),
            exception: (l) => typeof l == "string" || typeof l == "object",
            cliName: "plugin-search-dir",
            cliCategory: s,
          },
          printWidth: {
            since: "0.0.0",
            category: D,
            type: "int",
            default: 80,
            description: "The line length where Prettier will try wrap.",
            range: { start: 0, end: Number.POSITIVE_INFINITY, step: 1 },
          },
          rangeEnd: {
            since: "1.4.0",
            category: v,
            type: "int",
            default: Number.POSITIVE_INFINITY,
            range: { start: 0, end: Number.POSITIVE_INFINITY, step: 1 },
            description: t(
              Yn ||
                (Yn = ge([
                  `
      Format code ending at a given character offset (exclusive).
      The range will extend forwards to the end of the selected statement.
      This option cannot be used with --cursor-offset.
    `,
                ]))
            ),
            cliCategory: c,
          },
          rangeStart: {
            since: "1.4.0",
            category: v,
            type: "int",
            default: 0,
            range: { start: 0, end: Number.POSITIVE_INFINITY, step: 1 },
            description: t(
              Qn ||
                (Qn = ge([
                  `
      Format code starting at a given character offset.
      The range will extend backwards to the start of the first line containing the selected statement.
      This option cannot be used with --cursor-offset.
    `,
                ]))
            ),
            cliCategory: c,
          },
          requirePragma: {
            since: "1.7.0",
            category: v,
            type: "boolean",
            default: !1,
            description: t(
              Kn ||
                (Kn = ge([
                  `
      Require either '@prettier' or '@format' to be present in the file's first docblock comment
      in order for it to be formatted.
    `,
                ]))
            ),
            cliCategory: a,
          },
          tabWidth: {
            type: "int",
            category: D,
            default: 2,
            description: "Number of spaces per indentation level.",
            range: { start: 0, end: Number.POSITIVE_INFINITY, step: 1 },
          },
          useTabs: {
            since: "1.0.0",
            category: D,
            type: "boolean",
            default: !1,
            description: "Indent with tabs instead of spaces.",
          },
          embeddedLanguageFormatting: {
            since: "2.1.0",
            category: D,
            type: "choice",
            default: [{ since: "2.1.0", value: "auto" }],
            description:
              "Control how Prettier formats quoted code embedded in the file.",
            choices: [
              {
                value: "auto",
                description:
                  "Format embedded code if Prettier can automatically identify it.",
              },
              {
                value: "off",
                description: "Never automatically format embedded code.",
              },
            ],
          },
        };
      r.exports = {
        CATEGORY_CONFIG: s,
        CATEGORY_EDITOR: c,
        CATEGORY_FORMAT: n,
        CATEGORY_OTHER: a,
        CATEGORY_OUTPUT: f,
        CATEGORY_GLOBAL: D,
        CATEGORY_SPECIAL: v,
        options: i,
      };
    },
  }),
  DD = I({
    "src/main/support.js"(e, r) {
      "use strict";
      O();
      var t = { compare: Ur(), lt: nD(), gte: sD() },
        s = aD(),
        c = iD().version,
        n = cD().options;
      function a() {
        let {
            plugins: D = [],
            showUnreleased: v = !1,
            showDeprecated: i = !1,
            showInternal: l = !1,
          } = arguments.length > 0 && arguments[0] !== void 0
            ? arguments[0]
            : {},
          p = c.split("-", 1)[0],
          g = D.flatMap((S) => S.languages || []).filter(m),
          C = s(
            Object.assign(
              {},
              ...D.map((S) => {
                let { options: N } = S;
                return N;
              }),
              n
            ),
            "name"
          )
            .filter((S) => m(S) && B(S))
            .sort((S, N) => (S.name === N.name ? 0 : S.name < N.name ? -1 : 1))
            .map(w)
            .map((S) => {
              (S = Object.assign({}, S)),
                Array.isArray(S.default) &&
                  (S.default =
                    S.default.length === 1
                      ? S.default[0].value
                      : S.default
                          .filter(m)
                          .sort((b, j) => t.compare(j.since, b.since))[0]
                          .value),
                Array.isArray(S.choices) &&
                  ((S.choices = S.choices.filter((b) => m(b) && B(b))),
                  S.name === "parser" && f(S, g, D));
              let N = Object.fromEntries(
                D.filter(
                  (b) => b.defaultOptions && b.defaultOptions[S.name] !== void 0
                ).map((b) => [b.name, b.defaultOptions[S.name]])
              );
              return Object.assign(
                Object.assign({}, S),
                {},
                { pluginDefaults: N }
              );
            });
        return { languages: g, options: C };
        function m(S) {
          return v || !("since" in S) || (S.since && t.gte(p, S.since));
        }
        function B(S) {
          return (
            i || !("deprecated" in S) || (S.deprecated && t.lt(p, S.deprecated))
          );
        }
        function w(S) {
          if (l) return S;
          let { cliName: N, cliCategory: b, cliDescription: j } = S;
          return jc(S, Mc);
        }
      }
      function f(D, v, i) {
        let l = new Set(D.choices.map((p) => p.value));
        for (let p of v)
          if (p.parsers) {
            for (let g of p.parsers)
              if (!l.has(g)) {
                l.add(g);
                let C = i.find((B) => B.parsers && B.parsers[g]),
                  m = p.name;
                C && C.name && (m += " (plugin: ".concat(C.name, ")")),
                  D.choices.push({ value: g, description: m });
              }
          }
      }
      r.exports = { getSupportInfo: a };
    },
  }),
  lD = I({
    "src/utils/is-non-empty-array.js"(e, r) {
      "use strict";
      O();
      function t(s) {
        return Array.isArray(s) && s.length > 0;
      }
      r.exports = t;
    },
  });
function hD() {
  let { onlyFirst: e = !1 } =
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
    r = [
      "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
      "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
    ].join("|");
  return new RegExp(r, e ? void 0 : "g");
}
var pD = Fe({
  "node_modules/strip-ansi/node_modules/ansi-regex/index.js"() {
    O();
  },
});
function fD(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a `string`, got `".concat(typeof e, "`"));
  return e.replace(hD(), "");
}
var dD = Fe({
  "node_modules/strip-ansi/index.js"() {
    O(), pD();
  },
});
function ED(e) {
  return Number.isInteger(e)
    ? e >= 4352 &&
        (e <= 4447 ||
          e === 9001 ||
          e === 9002 ||
          (11904 <= e && e <= 12871 && e !== 12351) ||
          (12880 <= e && e <= 19903) ||
          (19968 <= e && e <= 42182) ||
          (43360 <= e && e <= 43388) ||
          (44032 <= e && e <= 55203) ||
          (63744 <= e && e <= 64255) ||
          (65040 <= e && e <= 65049) ||
          (65072 <= e && e <= 65131) ||
          (65281 <= e && e <= 65376) ||
          (65504 <= e && e <= 65510) ||
          (110592 <= e && e <= 110593) ||
          (127488 <= e && e <= 127569) ||
          (131072 <= e && e <= 262141))
    : !1;
}
var CD = Fe({
    "node_modules/is-fullwidth-code-point/index.js"() {
      O();
    },
  }),
  mD = I({
    "node_modules/emoji-regex/index.js"(e, r) {
      "use strict";
      O(),
        (r.exports = function () {
          return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
        });
    },
  }),
  Ds = {};
ts(Ds, { default: () => gD });
function gD(e) {
  if (typeof e != "string" || e.length === 0 || ((e = fD(e)), e.length === 0))
    return 0;
  e = e.replace((0, ls.default)(), "  ");
  let r = 0;
  for (let t = 0; t < e.length; t++) {
    let s = e.codePointAt(t);
    s <= 31 ||
      (s >= 127 && s <= 159) ||
      (s >= 768 && s <= 879) ||
      (s > 65535 && t++, (r += ED(s) ? 2 : 1));
  }
  return r;
}
var ls,
  FD = Fe({
    "node_modules/string-width/index.js"() {
      O(), dD(), CD(), (ls = Hc(mD()));
    },
  }),
  AD = I({
    "src/utils/get-string-width.js"(e, r) {
      "use strict";
      O();
      var t = (FD(), ns(Ds)).default,
        s = /[^\x20-\x7F]/;
      function c(n) {
        return n ? (s.test(n) ? t(n) : n.length) : 0;
      }
      r.exports = c;
    },
  }),
  Gr = I({
    "src/utils/text/skip.js"(e, r) {
      "use strict";
      O();
      function t(f) {
        return (D, v, i) => {
          let l = i && i.backwards;
          if (v === !1) return !1;
          let { length: p } = D,
            g = v;
          for (; g >= 0 && g < p; ) {
            let C = D.charAt(g);
            if (f instanceof RegExp) {
              if (!f.test(C)) return g;
            } else if (!f.includes(C)) return g;
            l ? g-- : g++;
          }
          return g === -1 || g === p ? g : !1;
        };
      }
      var s = t(/\s/),
        c = t(" 	"),
        n = t(",; 	"),
        a = t(/[^\n\r]/);
      r.exports = {
        skipWhitespace: s,
        skipSpaces: c,
        skipToLineEnd: n,
        skipEverythingButNewLine: a,
      };
    },
  }),
  hs = I({
    "src/utils/text/skip-inline-comment.js"(e, r) {
      "use strict";
      O();
      function t(s, c) {
        if (c === !1) return !1;
        if (s.charAt(c) === "/" && s.charAt(c + 1) === "*") {
          for (let n = c + 2; n < s.length; ++n)
            if (s.charAt(n) === "*" && s.charAt(n + 1) === "/") return n + 2;
        }
        return c;
      }
      r.exports = t;
    },
  }),
  ps = I({
    "src/utils/text/skip-trailing-comment.js"(e, r) {
      "use strict";
      O();
      var { skipEverythingButNewLine: t } = Gr();
      function s(c, n) {
        return n === !1
          ? !1
          : c.charAt(n) === "/" && c.charAt(n + 1) === "/"
          ? t(c, n)
          : n;
      }
      r.exports = s;
    },
  }),
  fs = I({
    "src/utils/text/skip-newline.js"(e, r) {
      "use strict";
      O();
      function t(s, c, n) {
        let a = n && n.backwards;
        if (c === !1) return !1;
        let f = s.charAt(c);
        if (a) {
          if (
            s.charAt(c - 1) === "\r" &&
            f ===
              `
`
          )
            return c - 2;
          if (
            f ===
              `
` ||
            f === "\r" ||
            f === "\u2028" ||
            f === "\u2029"
          )
            return c - 1;
        } else {
          if (
            f === "\r" &&
            s.charAt(c + 1) ===
              `
`
          )
            return c + 2;
          if (
            f ===
              `
` ||
            f === "\r" ||
            f === "\u2028" ||
            f === "\u2029"
          )
            return c + 1;
        }
        return c;
      }
      r.exports = t;
    },
  }),
  vD = I({
    "src/utils/text/get-next-non-space-non-comment-character-index-with-start-index.js"(
      e,
      r
    ) {
      "use strict";
      O();
      var t = hs(),
        s = fs(),
        c = ps(),
        { skipSpaces: n } = Gr();
      function a(f, D) {
        let v = null,
          i = D;
        for (; i !== v; )
          (v = i), (i = n(f, i)), (i = t(f, i)), (i = c(f, i)), (i = s(f, i));
        return i;
      }
      r.exports = a;
    },
  }),
  _D = I({
    "src/common/util.js"(e, r) {
      "use strict";
      O();
      var { default: t } = (Zc(), ns(is)),
        s = as(),
        { getSupportInfo: c } = DD(),
        n = lD(),
        a = AD(),
        {
          skipWhitespace: f,
          skipSpaces: D,
          skipToLineEnd: v,
          skipEverythingButNewLine: i,
        } = Gr(),
        l = hs(),
        p = ps(),
        g = fs(),
        C = vD(),
        m = (_) => _[_.length - 2];
      function B(_) {
        return (E, A, y) => {
          let x = y && y.backwards;
          if (A === !1) return !1;
          let { length: M } = E,
            V = A;
          for (; V >= 0 && V < M; ) {
            let W = E.charAt(V);
            if (_ instanceof RegExp) {
              if (!_.test(W)) return V;
            } else if (!_.includes(W)) return V;
            x ? V-- : V++;
          }
          return V === -1 || V === M ? V : !1;
        };
      }
      function w(_, E) {
        let A =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
          y = D(_, A.backwards ? E - 1 : E, A),
          x = g(_, y, A);
        return y !== x;
      }
      function S(_, E, A) {
        for (let y = E; y < A; ++y)
          if (
            _.charAt(y) ===
            `
`
          )
            return !0;
        return !1;
      }
      function N(_, E, A) {
        let y = A(E) - 1;
        (y = D(_, y, { backwards: !0 })),
          (y = g(_, y, { backwards: !0 })),
          (y = D(_, y, { backwards: !0 }));
        let x = g(_, y, { backwards: !0 });
        return y !== x;
      }
      function b(_, E) {
        let A = null,
          y = E;
        for (; y !== A; ) (A = y), (y = v(_, y)), (y = l(_, y)), (y = D(_, y));
        return (y = p(_, y)), (y = g(_, y)), y !== !1 && w(_, y);
      }
      function j(_, E, A) {
        return b(_, A(E));
      }
      function R(_, E, A) {
        return C(_, A(E));
      }
      function U(_, E, A) {
        return _.charAt(R(_, E, A));
      }
      function k(_, E) {
        let A =
          arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return D(_, A.backwards ? E - 1 : E, A) !== E;
      }
      function $(_, E) {
        let A =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
          y = 0;
        for (let x = A; x < _.length; ++x)
          _[x] === "	" ? (y = y + E - (y % E)) : y++;
        return y;
      }
      function L(_, E) {
        let A = _.lastIndexOf(`
`);
        return A === -1 ? 0 : $(_.slice(A + 1).match(/^[\t ]*/)[0], E);
      }
      function u(_, E) {
        let A = { quote: '"', regex: /"/g, escaped: "&quot;" },
          y = { quote: "'", regex: /'/g, escaped: "&apos;" },
          x = E === "'" ? y : A,
          M = x === y ? A : y,
          V = x;
        if (_.includes(x.quote) || _.includes(M.quote)) {
          let W = (_.match(x.regex) || []).length,
            Q = (_.match(M.regex) || []).length;
          V = W > Q ? M : x;
        }
        return V;
      }
      function o(_, E) {
        let A = _.slice(1, -1),
          y =
            E.parser === "json" ||
            (E.parser === "json5" &&
              E.quoteProps === "preserve" &&
              !E.singleQuote)
              ? '"'
              : E.__isInHtmlAttribute
              ? "'"
              : u(A, E.singleQuote ? "'" : '"').quote;
        return d(
          A,
          y,
          !(
            E.parser === "css" ||
            E.parser === "less" ||
            E.parser === "scss" ||
            E.__embeddedInHtml
          )
        );
      }
      function d(_, E, A) {
        let y = E === '"' ? "'" : '"',
          x = /\\(.)|(["'])/gs,
          M = _.replace(x, (V, W, Q) =>
            W === y
              ? W
              : Q === E
              ? "\\" + Q
              : Q ||
                (A && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(W)
                  ? W
                  : "\\" + W)
          );
        return E + M + E;
      }
      function h(_) {
        return _.toLowerCase()
          .replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(\d)/, "$1$2$3")
          .replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1")
          .replace(/^([+-])?\./, "$10.")
          .replace(/(\.\d+?)0+(?=e|$)/, "$1")
          .replace(/\.(?=e|$)/, "");
      }
      function F(_, E) {
        let A = _.match(new RegExp("(".concat(t(E), ")+"), "g"));
        return A === null
          ? 0
          : A.reduce((y, x) => Math.max(y, x.length / E.length), 0);
      }
      function q(_, E) {
        let A = _.match(new RegExp("(".concat(t(E), ")+"), "g"));
        if (A === null) return 0;
        let y = new Map(),
          x = 0;
        for (let M of A) {
          let V = M.length / E.length;
          y.set(V, !0), V > x && (x = V);
        }
        for (let M = 1; M < x; M++) if (!y.get(M)) return M;
        return x + 1;
      }
      function P(_, E) {
        (_.comments || (_.comments = [])).push(E),
          (E.printed = !1),
          (E.nodeDescription = Z(_));
      }
      function G(_, E) {
        (E.leading = !0), (E.trailing = !1), P(_, E);
      }
      function H(_, E, A) {
        (E.leading = !1), (E.trailing = !1), A && (E.marker = A), P(_, E);
      }
      function K(_, E) {
        (E.leading = !1), (E.trailing = !0), P(_, E);
      }
      function z(_, E) {
        let { languages: A } = c({ plugins: E.plugins }),
          y =
            A.find((x) => {
              let { name: M } = x;
              return M.toLowerCase() === _;
            }) ||
            A.find((x) => {
              let { aliases: M } = x;
              return Array.isArray(M) && M.includes(_);
            }) ||
            A.find((x) => {
              let { extensions: M } = x;
              return Array.isArray(M) && M.includes(".".concat(_));
            });
        return y && y.parsers[0];
      }
      function Y(_) {
        return _ && _.type === "front-matter";
      }
      function J(_) {
        let E = new WeakMap();
        return function (A) {
          return E.has(A) || E.set(A, Symbol(_)), E.get(A);
        };
      }
      function Z(_) {
        let E = _.type || _.kind || "(unknown type)",
          A = String(
            _.name ||
              (_.id && (typeof _.id == "object" ? _.id.name : _.id)) ||
              (_.key && (typeof _.key == "object" ? _.key.name : _.key)) ||
              (_.value &&
                (typeof _.value == "object" ? "" : String(_.value))) ||
              _.operator ||
              ""
          );
        return (
          A.length > 20 && (A = A.slice(0, 19) + "\u2026"),
          E + (A ? " " + A : "")
        );
      }
      r.exports = {
        inferParserByLanguage: z,
        getStringWidth: a,
        getMaxContinuousCount: F,
        getMinNotPresentContinuousCount: q,
        getPenultimate: m,
        getLast: s,
        getNextNonSpaceNonCommentCharacterIndexWithStartIndex: C,
        getNextNonSpaceNonCommentCharacterIndex: R,
        getNextNonSpaceNonCommentCharacter: U,
        skip: B,
        skipWhitespace: f,
        skipSpaces: D,
        skipToLineEnd: v,
        skipEverythingButNewLine: i,
        skipInlineComment: l,
        skipTrailingComment: p,
        skipNewline: g,
        isNextLineEmptyAfterIndex: b,
        isNextLineEmpty: j,
        isPreviousLineEmpty: N,
        hasNewline: w,
        hasNewlineInRange: S,
        hasSpaces: k,
        getAlignmentSize: $,
        getIndentSize: L,
        getPreferredQuote: u,
        printString: o,
        printNumber: h,
        makeString: d,
        addLeadingComment: G,
        addDanglingComment: H,
        addTrailingComment: K,
        isFrontMatterNode: Y,
        isNonEmptyArray: n,
        createGroupIdMapper: J,
      };
    },
  }),
  SD = I({
    "vendors/html-tag-names.json"(e, r) {
      r.exports = {
        htmlTagNames: [
          // "a",
          // "abbr",
          // "acronym",
          // "address",
          // "applet",
          // "area",
          // "article",
          // "aside",
          // "audio",
          // "b",
          // "base",
          // "basefont",
          // "bdi",
          // "bdo",
          // "bgsound",
          // "big",
          // "blink",
          // "blockquote",
          // "body",
          // "br",
          // "button",
          // "canvas",
          // "caption",
          // "center",
          // "cite",
          // "code",
          // "col",
          // "colgroup",
          // "command",
          // "content",
          // "data",
          // "datalist",
          // "dd",
          // "del",
          // "details",
          // "dfn",
          // "dialog",
          // "dir",
          // "div",
          // "dl",
          // "dt",
          // "element",
          // "em",
          // "embed",
          // "fieldset",
          // "figcaption",
          // "figure",
          // "font",
          // "footer",
          // "form",
          // "frame",
          // "frameset",
          // "h1",
          // "h2",
          // "h3",
          // "h4",
          // "h5",
          // "h6",
          // "head",
          // "header",
          // "hgroup",
          // "hr",
          // "html",
          // "i",
          // "iframe",
          // "image",
          // "img",
          // "input",
          // "ins",
          // "isindex",
          // "kbd",
          // "keygen",
          // "label",
          // "legend",
          // "li",
          // "link",
          // "listing",
          // "main",
          // "map",
          // "mark",
          // "marquee",
          // "math",
          // "menu",
          // "menuitem",
          // "meta",
          // "meter",
          // "multicol",
          // "nav",
          // "nextid",
          // "nobr",
          // "noembed",
          // "noframes",
          // "noscript",
          // "object",
          // "ol",
          // "optgroup",
          // "option",
          // "output",
          // "p",
          // "param",
          // "picture",
          // "plaintext",
          // "pre",
          // "progress",
          // "q",
          // "rb",
          // "rbc",
          // "rp",
          // "rt",
          // "rtc",
          // "ruby",
          // "s",
          // "samp",
          // "script",
          // "section",
          // "select",
          // "shadow",
          // "slot",
          // "small",
          // "source",
          // "spacer",
          // "span",
          // "strike",
          // "strong",
          // "style",
          // "sub",
          // "summary",
          // "sup",
          // "svg",
          // "table",
          // "tbody",
          // "td",
          // "template",
          // "textarea",
          // "tfoot",
          // "th",
          // "thead",
          // "time",
          // "title",
          // "tr",
          // "track",
          // "tt",
          // "u",
          // "ul",
          // "var",
          // "video",
          // "wbr",
          // "xmp",
        ],
      };
    },
  }),
  ds = I({
    "src/language-html/utils/array-to-map.js"(e, r) {
      "use strict";
      O();
      function t(s) {
        let c = Object.create(null);
        for (let n of s) c[n] = !0;
        return c;
      }
      r.exports = t;
    },
  }),
  yD = I({
    "src/language-html/utils/html-tag-names.js"(e, r) {
      "use strict";
      O();
      var { htmlTagNames: t } = SD(),
        s = ds(),
        c = s(t);
      r.exports = c;
    },
  }),
  TD = I({
    "vendors/html-element-attributes.json"(e, r) {
      r.exports = {
        htmlElementAttributes: {
          "*": [
            "accesskey",
            "autocapitalize",
            "autofocus",
            "class",
            "contenteditable",
            "dir",
            "draggable",
            "enterkeyhint",
            "hidden",
            "id",
            "inputmode",
            "is",
            "itemid",
            "itemprop",
            "itemref",
            "itemscope",
            "itemtype",
            "lang",
            "nonce",
            "slot",
            "spellcheck",
            "style",
            "tabindex",
            "title",
            "translate",
          ],
          a: [
            "charset",
            "coords",
            "download",
            "href",
            "hreflang",
            "name",
            "ping",
            "referrerpolicy",
            "rel",
            "rev",
            "shape",
            "target",
            "type",
          ],
          applet: [
            "align",
            "alt",
            "archive",
            "code",
            "codebase",
            "height",
            "hspace",
            "name",
            "object",
            "vspace",
            "width",
          ],
          area: [
            "alt",
            "coords",
            "download",
            "href",
            "hreflang",
            "nohref",
            "ping",
            "referrerpolicy",
            "rel",
            "shape",
            "target",
            "type",
          ],
          audio: [
            "autoplay",
            "controls",
            "crossorigin",
            "loop",
            "muted",
            "preload",
            "src",
          ],
          base: ["href", "target"],
          basefont: ["color", "face", "size"],
          blockquote: ["cite"],
          body: ["alink", "background", "bgcolor", "link", "text", "vlink"],
          br: ["clear"],
          button: [
            "disabled",
            "form",
            "formaction",
            "formenctype",
            "formmethod",
            "formnovalidate",
            "formtarget",
            "name",
            "type",
            "value",
          ],
          canvas: ["height", "width"],
          caption: ["align"],
          col: ["align", "char", "charoff", "span", "valign", "width"],
          colgroup: ["align", "char", "charoff", "span", "valign", "width"],
          data: ["value"],
          del: ["cite", "datetime"],
          details: ["open"],
          dialog: ["open"],
          dir: ["compact"],
          div: ["align"],
          dl: ["compact"],
          embed: ["height", "src", "type", "width"],
          fieldset: ["disabled", "form", "name"],
          font: ["color", "face", "size"],
          form: [
            "accept",
            "accept-charset",
            "action",
            "autocomplete",
            "enctype",
            "method",
            "name",
            "novalidate",
            "target",
          ],
          frame: [
            "frameborder",
            "longdesc",
            "marginheight",
            "marginwidth",
            "name",
            "noresize",
            "scrolling",
            "src",
          ],
          frameset: ["cols", "rows"],
          h1: ["align"],
          h2: ["align"],
          h3: ["align"],
          h4: ["align"],
          h5: ["align"],
          h6: ["align"],
          head: ["profile"],
          hr: ["align", "noshade", "size", "width"],
          html: ["manifest", "version"],
          iframe: [
            "align",
            "allow",
            "allowfullscreen",
            "allowpaymentrequest",
            "allowusermedia",
            "frameborder",
            "height",
            "loading",
            "longdesc",
            "marginheight",
            "marginwidth",
            "name",
            "referrerpolicy",
            "sandbox",
            "scrolling",
            "src",
            "srcdoc",
            "width",
          ],
          img: [
            "align",
            "alt",
            "border",
            "crossorigin",
            "decoding",
            "height",
            "hspace",
            "ismap",
            "loading",
            "longdesc",
            "name",
            "referrerpolicy",
            "sizes",
            "src",
            "srcset",
            "usemap",
            "vspace",
            "width",
          ],
          input: [
            "accept",
            "align",
            "alt",
            "autocomplete",
            "checked",
            "dirname",
            "disabled",
            "form",
            "formaction",
            "formenctype",
            "formmethod",
            "formnovalidate",
            "formtarget",
            "height",
            "ismap",
            "list",
            "max",
            "maxlength",
            "min",
            "minlength",
            "multiple",
            "name",
            "pattern",
            "placeholder",
            "readonly",
            "required",
            "size",
            "src",
            "step",
            "type",
            "usemap",
            "value",
            "width",
          ],
          ins: ["cite", "datetime"],
          isindex: ["prompt"],
          label: ["for", "form"],
          legend: ["align"],
          li: ["type", "value"],
          link: [
            "as",
            "charset",
            "color",
            "crossorigin",
            "disabled",
            "href",
            "hreflang",
            "imagesizes",
            "imagesrcset",
            "integrity",
            "media",
            "referrerpolicy",
            "rel",
            "rev",
            "sizes",
            "target",
            "type",
          ],
          map: ["name"],
          menu: ["compact"],
          meta: ["charset", "content", "http-equiv", "media", "name", "scheme"],
          meter: ["high", "low", "max", "min", "optimum", "value"],
          object: [
            "align",
            "archive",
            "border",
            "classid",
            "codebase",
            "codetype",
            "data",
            "declare",
            "form",
            "height",
            "hspace",
            "name",
            "standby",
            "type",
            "typemustmatch",
            "usemap",
            "vspace",
            "width",
          ],
          ol: ["compact", "reversed", "start", "type"],
          optgroup: ["disabled", "label"],
          option: ["disabled", "label", "selected", "value"],
          output: ["for", "form", "name"],
          p: ["align"],
          param: ["name", "type", "value", "valuetype"],
          pre: ["width"],
          progress: ["max", "value"],
          q: ["cite"],
          script: [
            "async",
            "charset",
            "crossorigin",
            "defer",
            "integrity",
            "language",
            "nomodule",
            "referrerpolicy",
            "src",
            "type",
          ],
          select: [
            "autocomplete",
            "disabled",
            "form",
            "multiple",
            "name",
            "required",
            "size",
          ],
          slot: ["name"],
          source: [
            "height",
            "media",
            "sizes",
            "src",
            "srcset",
            "type",
            "width",
          ],
          style: ["media", "type"],
          table: [
            "align",
            "bgcolor",
            "border",
            "cellpadding",
            "cellspacing",
            "frame",
            "rules",
            "summary",
            "width",
          ],
          tbody: ["align", "char", "charoff", "valign"],
          td: [
            "abbr",
            "align",
            "axis",
            "bgcolor",
            "char",
            "charoff",
            "colspan",
            "headers",
            "height",
            "nowrap",
            "rowspan",
            "scope",
            "valign",
            "width",
          ],
          textarea: [
            "autocomplete",
            "cols",
            "dirname",
            "disabled",
            "form",
            "maxlength",
            "minlength",
            "name",
            "placeholder",
            "readonly",
            "required",
            "rows",
            "wrap",
          ],
          tfoot: ["align", "char", "charoff", "valign"],
          th: [
            "abbr",
            "align",
            "axis",
            "bgcolor",
            "char",
            "charoff",
            "colspan",
            "headers",
            "height",
            "nowrap",
            "rowspan",
            "scope",
            "valign",
            "width",
          ],
          thead: ["align", "char", "charoff", "valign"],
          time: ["datetime"],
          tr: ["align", "bgcolor", "char", "charoff", "valign"],
          track: ["default", "kind", "label", "src", "srclang"],
          ul: ["compact", "type"],
          video: [
            "autoplay",
            "controls",
            "crossorigin",
            "height",
            "loop",
            "muted",
            "playsinline",
            "poster",
            "preload",
            "src",
            "width",
          ],
        },
      };
    },
  }),
  BD = I({
    "src/language-html/utils/map-object.js"(e, r) {
      "use strict";
      O();
      function t(s, c) {
        let n = Object.create(null);
        for (let [a, f] of Object.entries(s)) n[a] = c(f, a);
        return n;
      }
      r.exports = t;
    },
  }),
  bD = I({
    "src/language-html/utils/html-elements-attributes.js"(e, r) {
      "use strict";
      O();
      var { htmlElementAttributes: t } = TD(),
        s = BD(),
        c = ds(),
        n = s(t, c);
      r.exports = n;
    },
  }),
  wD = I({
    "src/language-html/utils/is-unknown-namespace.js"(e, r) {
      "use strict";
      O();
      function t(s) {
        return (
          s.type === "element" &&
          !s.hasExplicitNamespace &&
          !["html", "svg"].includes(s.namespace)
        );
      }
      r.exports = t;
    },
  }),
  ND = I({
    "src/language-html/pragma.js"(e, r) {
      "use strict";
      O();
      function t(c) {
        return /^\s*<!--\s*@(?:format|prettier)\s*-->/.test(c);
      }
      function s(c) {
        return (
          `<!-- @format -->

` + c.replace(/^\s*\n/, "")
        );
      }
      r.exports = { hasPragma: t, insertPragma: s };
    },
  }),
  OD = I({
    "src/language-html/ast.js"(e, r) {
      "use strict";
      O();
      var t = { attrs: !0, children: !0 },
        s = new Set(["parent"]),
        c = class {
          constructor() {
            let a =
              arguments.length > 0 && arguments[0] !== void 0
                ? arguments[0]
                : {};
            for (let f of new Set([...s, ...Object.keys(a)]))
              this.setProperty(f, a[f]);
          }
          setProperty(a, f) {
            if (this[a] !== f) {
              if (
                (a in t && (f = f.map((D) => this.createChild(D))), !s.has(a))
              ) {
                this[a] = f;
                return;
              }
              Object.defineProperty(this, a, {
                value: f,
                enumerable: !1,
                configurable: !0,
              });
            }
          }
          map(a) {
            let f;
            for (let D in t) {
              let v = this[D];
              if (v) {
                let i = n(v, (l) => l.map(a));
                f !== v &&
                  (f || (f = new c({ parent: this.parent })),
                  f.setProperty(D, i));
              }
            }
            if (f) for (let D in this) D in t || (f[D] = this[D]);
            return a(f || this);
          }
          walk(a) {
            for (let f in t) {
              let D = this[f];
              if (D) for (let v = 0; v < D.length; v++) D[v].walk(a);
            }
            a(this);
          }
          createChild(a) {
            let f = a instanceof c ? a.clone() : new c(a);
            return f.setProperty("parent", this), f;
          }
          insertChildBefore(a, f) {
            this.children.splice(
              this.children.indexOf(a),
              0,
              this.createChild(f)
            );
          }
          removeChild(a) {
            this.children.splice(this.children.indexOf(a), 1);
          }
          replaceChild(a, f) {
            this.children[this.children.indexOf(a)] = this.createChild(f);
          }
          clone() {
            return new c(this);
          }
          get firstChild() {
            var a;
            return (a = this.children) === null || a === void 0 ? void 0 : a[0];
          }
          get lastChild() {
            var a;
            return (a = this.children) === null || a === void 0
              ? void 0
              : a[this.children.length - 1];
          }
          get prev() {
            var a;
            return (a = this.parent) === null || a === void 0
              ? void 0
              : a.children[this.parent.children.indexOf(this) - 1];
          }
          get next() {
            var a;
            return (a = this.parent) === null || a === void 0
              ? void 0
              : a.children[this.parent.children.indexOf(this) + 1];
          }
          get rawName() {
            return this.hasExplicitNamespace ? this.fullName : this.name;
          }
          get fullName() {
            return this.namespace
              ? this.namespace + ":" + this.name
              : this.name;
          }
          get attrMap() {
            return Object.fromEntries(
              this.attrs.map((a) => [a.fullName, a.value])
            );
          }
        };
      function n(a, f) {
        let D = a.map(f);
        return D.some((v, i) => v !== a[i]) ? D : a;
      }
      r.exports = { Node: c };
    },
  }),
  qD = I({
    "src/language-html/conditional-comment.js"(e, r) {
      "use strict";
      O();
      var { ParseSourceSpan: t } = we(),
        s = [
          { regex: /^(\[if([^\]]*)]>)(.*?)<!\s*\[endif]$/s, parse: n },
          { regex: /^\[if([^\]]*)]><!$/, parse: a },
          { regex: /^<!\s*\[endif]$/, parse: f },
        ];
      function c(D, v) {
        if (D.value)
          for (let { regex: i, parse: l } of s) {
            let p = D.value.match(i);
            if (p) return l(D, v, p);
          }
        return null;
      }
      function n(D, v, i) {
        let [, l, p, g] = i,
          C = 4 + l.length,
          m = D.sourceSpan.start.moveBy(C),
          B = m.moveBy(g.length),
          [w, S] = (() => {
            try {
              return [!0, v(g, m).children];
            } catch {
              let N = { type: "text", value: g, sourceSpan: new t(m, B) };
              return [!1, [N]];
            }
          })();
        return {
          type: "ieConditionalComment",
          complete: w,
          children: S,
          condition: p.trim().replace(/\s+/g, " "),
          sourceSpan: D.sourceSpan,
          startSourceSpan: new t(D.sourceSpan.start, m),
          endSourceSpan: new t(B, D.sourceSpan.end),
        };
      }
      function a(D, v, i) {
        let [, l] = i;
        return {
          type: "ieConditionalStartComment",
          condition: l.trim().replace(/\s+/g, " "),
          sourceSpan: D.sourceSpan,
        };
      }
      function f(D) {
        return { type: "ieConditionalEndComment", sourceSpan: D.sourceSpan };
      }
      r.exports = { parseIeConditionalComment: c };
    },
  }),
  ID = I({
    "src/language-html/loc.js"(e, r) {
      "use strict";
      O();
      function t(c) {
        return c.sourceSpan.start.offset;
      }
      function s(c) {
        return c.sourceSpan.end.offset;
      }
      r.exports = { locStart: t, locEnd: s };
    },
  }),
  Ze = I({
    "node_modules/angular-html-parser/lib/compiler/src/ml_parser/tags.js"(e) {
      "use strict";
      O(), Object.defineProperty(e, "__esModule", { value: !0 });
      var r;
      (function (D) {
        (D[(D.RAW_TEXT = 0)] = "RAW_TEXT"),
          (D[(D.ESCAPABLE_RAW_TEXT = 1)] = "ESCAPABLE_RAW_TEXT"),
          (D[(D.PARSABLE_DATA = 2)] = "PARSABLE_DATA");
      })((r = e.TagContentType || (e.TagContentType = {})));
      function t(D) {
        if (D[0] != ":") return [null, D];
        let v = D.indexOf(":", 1);
        if (v == -1)
          throw new Error(
            'Unsupported format "'.concat(D, '" expecting ":namespace:name"')
          );
        return [D.slice(1, v), D.slice(v + 1)];
      }
      e.splitNsName = t;
      function s(D) {
        return t(D)[1] === "ng-container";
      }
      e.isNgContainer = s;
      function c(D) {
        return t(D)[1] === "ng-content";
      }
      e.isNgContent = c;
      function n(D) {
        return t(D)[1] === "ng-template";
      }
      e.isNgTemplate = n;
      function a(D) {
        return D === null ? null : t(D)[0];
      }
      e.getNsPrefix = a;
      function f(D, v) {
        return D ? ":".concat(D, ":").concat(v) : v;
      }
      (e.mergeNsAndName = f),
        (e.NAMED_ENTITIES = {
          Aacute: "\xC1",
          aacute: "\xE1",
          Abreve: "\u0102",
          abreve: "\u0103",
          ac: "\u223E",
          acd: "\u223F",
          acE: "\u223E\u0333",
          Acirc: "\xC2",
          acirc: "\xE2",
          acute: "\xB4",
          Acy: "\u0410",
          acy: "\u0430",
          AElig: "\xC6",
          aelig: "\xE6",
          af: "\u2061",
          Afr: "\u{1D504}",
          afr: "\u{1D51E}",
          Agrave: "\xC0",
          agrave: "\xE0",
          alefsym: "\u2135",
          aleph: "\u2135",
          Alpha: "\u0391",
          alpha: "\u03B1",
          Amacr: "\u0100",
          amacr: "\u0101",
          amalg: "\u2A3F",
          AMP: "&",
          amp: "&",
          And: "\u2A53",
          and: "\u2227",
          andand: "\u2A55",
          andd: "\u2A5C",
          andslope: "\u2A58",
          andv: "\u2A5A",
          ang: "\u2220",
          ange: "\u29A4",
          angle: "\u2220",
          angmsd: "\u2221",
          angmsdaa: "\u29A8",
          angmsdab: "\u29A9",
          angmsdac: "\u29AA",
          angmsdad: "\u29AB",
          angmsdae: "\u29AC",
          angmsdaf: "\u29AD",
          angmsdag: "\u29AE",
          angmsdah: "\u29AF",
          angrt: "\u221F",
          angrtvb: "\u22BE",
          angrtvbd: "\u299D",
          angsph: "\u2222",
          angst: "\xC5",
          angzarr: "\u237C",
          Aogon: "\u0104",
          aogon: "\u0105",
          Aopf: "\u{1D538}",
          aopf: "\u{1D552}",
          ap: "\u2248",
          apacir: "\u2A6F",
          apE: "\u2A70",
          ape: "\u224A",
          apid: "\u224B",
          apos: "'",
          ApplyFunction: "\u2061",
          approx: "\u2248",
          approxeq: "\u224A",
          Aring: "\xC5",
          aring: "\xE5",
          Ascr: "\u{1D49C}",
          ascr: "\u{1D4B6}",
          Assign: "\u2254",
          ast: "*",
          asymp: "\u2248",
          asympeq: "\u224D",
          Atilde: "\xC3",
          atilde: "\xE3",
          Auml: "\xC4",
          auml: "\xE4",
          awconint: "\u2233",
          awint: "\u2A11",
          backcong: "\u224C",
          backepsilon: "\u03F6",
          backprime: "\u2035",
          backsim: "\u223D",
          backsimeq: "\u22CD",
          Backslash: "\u2216",
          Barv: "\u2AE7",
          barvee: "\u22BD",
          Barwed: "\u2306",
          barwed: "\u2305",
          barwedge: "\u2305",
          bbrk: "\u23B5",
          bbrktbrk: "\u23B6",
          bcong: "\u224C",
          Bcy: "\u0411",
          bcy: "\u0431",
          bdquo: "\u201E",
          becaus: "\u2235",
          Because: "\u2235",
          because: "\u2235",
          bemptyv: "\u29B0",
          bepsi: "\u03F6",
          bernou: "\u212C",
          Bernoullis: "\u212C",
          Beta: "\u0392",
          beta: "\u03B2",
          beth: "\u2136",
          between: "\u226C",
          Bfr: "\u{1D505}",
          bfr: "\u{1D51F}",
          bigcap: "\u22C2",
          bigcirc: "\u25EF",
          bigcup: "\u22C3",
          bigodot: "\u2A00",
          bigoplus: "\u2A01",
          bigotimes: "\u2A02",
          bigsqcup: "\u2A06",
          bigstar: "\u2605",
          bigtriangledown: "\u25BD",
          bigtriangleup: "\u25B3",
          biguplus: "\u2A04",
          bigvee: "\u22C1",
          bigwedge: "\u22C0",
          bkarow: "\u290D",
          blacklozenge: "\u29EB",
          blacksquare: "\u25AA",
          blacktriangle: "\u25B4",
          blacktriangledown: "\u25BE",
          blacktriangleleft: "\u25C2",
          blacktriangleright: "\u25B8",
          blank: "\u2423",
          blk12: "\u2592",
          blk14: "\u2591",
          blk34: "\u2593",
          block: "\u2588",
          bne: "=\u20E5",
          bnequiv: "\u2261\u20E5",
          bNot: "\u2AED",
          bnot: "\u2310",
          Bopf: "\u{1D539}",
          bopf: "\u{1D553}",
          bot: "\u22A5",
          bottom: "\u22A5",
          bowtie: "\u22C8",
          boxbox: "\u29C9",
          boxDL: "\u2557",
          boxDl: "\u2556",
          boxdL: "\u2555",
          boxdl: "\u2510",
          boxDR: "\u2554",
          boxDr: "\u2553",
          boxdR: "\u2552",
          boxdr: "\u250C",
          boxH: "\u2550",
          boxh: "\u2500",
          boxHD: "\u2566",
          boxHd: "\u2564",
          boxhD: "\u2565",
          boxhd: "\u252C",
          boxHU: "\u2569",
          boxHu: "\u2567",
          boxhU: "\u2568",
          boxhu: "\u2534",
          boxminus: "\u229F",
          boxplus: "\u229E",
          boxtimes: "\u22A0",
          boxUL: "\u255D",
          boxUl: "\u255C",
          boxuL: "\u255B",
          boxul: "\u2518",
          boxUR: "\u255A",
          boxUr: "\u2559",
          boxuR: "\u2558",
          boxur: "\u2514",
          boxV: "\u2551",
          boxv: "\u2502",
          boxVH: "\u256C",
          boxVh: "\u256B",
          boxvH: "\u256A",
          boxvh: "\u253C",
          boxVL: "\u2563",
          boxVl: "\u2562",
          boxvL: "\u2561",
          boxvl: "\u2524",
          boxVR: "\u2560",
          boxVr: "\u255F",
          boxvR: "\u255E",
          boxvr: "\u251C",
          bprime: "\u2035",
          Breve: "\u02D8",
          breve: "\u02D8",
          brvbar: "\xA6",
          Bscr: "\u212C",
          bscr: "\u{1D4B7}",
          bsemi: "\u204F",
          bsim: "\u223D",
          bsime: "\u22CD",
          bsol: "\\",
          bsolb: "\u29C5",
          bsolhsub: "\u27C8",
          bull: "\u2022",
          bullet: "\u2022",
          bump: "\u224E",
          bumpE: "\u2AAE",
          bumpe: "\u224F",
          Bumpeq: "\u224E",
          bumpeq: "\u224F",
          Cacute: "\u0106",
          cacute: "\u0107",
          Cap: "\u22D2",
          cap: "\u2229",
          capand: "\u2A44",
          capbrcup: "\u2A49",
          capcap: "\u2A4B",
          capcup: "\u2A47",
          capdot: "\u2A40",
          CapitalDifferentialD: "\u2145",
          caps: "\u2229\uFE00",
          caret: "\u2041",
          caron: "\u02C7",
          Cayleys: "\u212D",
          ccaps: "\u2A4D",
          Ccaron: "\u010C",
          ccaron: "\u010D",
          Ccedil: "\xC7",
          ccedil: "\xE7",
          Ccirc: "\u0108",
          ccirc: "\u0109",
          Cconint: "\u2230",
          ccups: "\u2A4C",
          ccupssm: "\u2A50",
          Cdot: "\u010A",
          cdot: "\u010B",
          cedil: "\xB8",
          Cedilla: "\xB8",
          cemptyv: "\u29B2",
          cent: "\xA2",
          CenterDot: "\xB7",
          centerdot: "\xB7",
          Cfr: "\u212D",
          cfr: "\u{1D520}",
          CHcy: "\u0427",
          chcy: "\u0447",
          check: "\u2713",
          checkmark: "\u2713",
          Chi: "\u03A7",
          chi: "\u03C7",
          cir: "\u25CB",
          circ: "\u02C6",
          circeq: "\u2257",
          circlearrowleft: "\u21BA",
          circlearrowright: "\u21BB",
          circledast: "\u229B",
          circledcirc: "\u229A",
          circleddash: "\u229D",
          CircleDot: "\u2299",
          circledR: "\xAE",
          circledS: "\u24C8",
          CircleMinus: "\u2296",
          CirclePlus: "\u2295",
          CircleTimes: "\u2297",
          cirE: "\u29C3",
          cire: "\u2257",
          cirfnint: "\u2A10",
          cirmid: "\u2AEF",
          cirscir: "\u29C2",
          ClockwiseContourIntegral: "\u2232",
          CloseCurlyDoubleQuote: "\u201D",
          CloseCurlyQuote: "\u2019",
          clubs: "\u2663",
          clubsuit: "\u2663",
          Colon: "\u2237",
          colon: ":",
          Colone: "\u2A74",
          colone: "\u2254",
          coloneq: "\u2254",
          comma: ",",
          commat: "@",
          comp: "\u2201",
          compfn: "\u2218",
          complement: "\u2201",
          complexes: "\u2102",
          cong: "\u2245",
          congdot: "\u2A6D",
          Congruent: "\u2261",
          Conint: "\u222F",
          conint: "\u222E",
          ContourIntegral: "\u222E",
          Copf: "\u2102",
          copf: "\u{1D554}",
          coprod: "\u2210",
          Coproduct: "\u2210",
          COPY: "\xA9",
          copy: "\xA9",
          copysr: "\u2117",
          CounterClockwiseContourIntegral: "\u2233",
          crarr: "\u21B5",
          Cross: "\u2A2F",
          cross: "\u2717",
          Cscr: "\u{1D49E}",
          cscr: "\u{1D4B8}",
          csub: "\u2ACF",
          csube: "\u2AD1",
          csup: "\u2AD0",
          csupe: "\u2AD2",
          ctdot: "\u22EF",
          cudarrl: "\u2938",
          cudarrr: "\u2935",
          cuepr: "\u22DE",
          cuesc: "\u22DF",
          cularr: "\u21B6",
          cularrp: "\u293D",
          Cup: "\u22D3",
          cup: "\u222A",
          cupbrcap: "\u2A48",
          CupCap: "\u224D",
          cupcap: "\u2A46",
          cupcup: "\u2A4A",
          cupdot: "\u228D",
          cupor: "\u2A45",
          cups: "\u222A\uFE00",
          curarr: "\u21B7",
          curarrm: "\u293C",
          curlyeqprec: "\u22DE",
          curlyeqsucc: "\u22DF",
          curlyvee: "\u22CE",
          curlywedge: "\u22CF",
          curren: "\xA4",
          curvearrowleft: "\u21B6",
          curvearrowright: "\u21B7",
          cuvee: "\u22CE",
          cuwed: "\u22CF",
          cwconint: "\u2232",
          cwint: "\u2231",
          cylcty: "\u232D",
          Dagger: "\u2021",
          dagger: "\u2020",
          daleth: "\u2138",
          Darr: "\u21A1",
          dArr: "\u21D3",
          darr: "\u2193",
          dash: "\u2010",
          Dashv: "\u2AE4",
          dashv: "\u22A3",
          dbkarow: "\u290F",
          dblac: "\u02DD",
          Dcaron: "\u010E",
          dcaron: "\u010F",
          Dcy: "\u0414",
          dcy: "\u0434",
          DD: "\u2145",
          dd: "\u2146",
          ddagger: "\u2021",
          ddarr: "\u21CA",
          DDotrahd: "\u2911",
          ddotseq: "\u2A77",
          deg: "\xB0",
          Del: "\u2207",
          Delta: "\u0394",
          delta: "\u03B4",
          demptyv: "\u29B1",
          dfisht: "\u297F",
          Dfr: "\u{1D507}",
          dfr: "\u{1D521}",
          dHar: "\u2965",
          dharl: "\u21C3",
          dharr: "\u21C2",
          DiacriticalAcute: "\xB4",
          DiacriticalDot: "\u02D9",
          DiacriticalDoubleAcute: "\u02DD",
          DiacriticalGrave: "`",
          DiacriticalTilde: "\u02DC",
          diam: "\u22C4",
          Diamond: "\u22C4",
          diamond: "\u22C4",
          diamondsuit: "\u2666",
          diams: "\u2666",
          die: "\xA8",
          DifferentialD: "\u2146",
          digamma: "\u03DD",
          disin: "\u22F2",
          div: "\xF7",
          divide: "\xF7",
          divideontimes: "\u22C7",
          divonx: "\u22C7",
          DJcy: "\u0402",
          djcy: "\u0452",
          dlcorn: "\u231E",
          dlcrop: "\u230D",
          dollar: "$",
          Dopf: "\u{1D53B}",
          dopf: "\u{1D555}",
          Dot: "\xA8",
          dot: "\u02D9",
          DotDot: "\u20DC",
          doteq: "\u2250",
          doteqdot: "\u2251",
          DotEqual: "\u2250",
          dotminus: "\u2238",
          dotplus: "\u2214",
          dotsquare: "\u22A1",
          doublebarwedge: "\u2306",
          DoubleContourIntegral: "\u222F",
          DoubleDot: "\xA8",
          DoubleDownArrow: "\u21D3",
          DoubleLeftArrow: "\u21D0",
          DoubleLeftRightArrow: "\u21D4",
          DoubleLeftTee: "\u2AE4",
          DoubleLongLeftArrow: "\u27F8",
          DoubleLongLeftRightArrow: "\u27FA",
          DoubleLongRightArrow: "\u27F9",
          DoubleRightArrow: "\u21D2",
          DoubleRightTee: "\u22A8",
          DoubleUpArrow: "\u21D1",
          DoubleUpDownArrow: "\u21D5",
          DoubleVerticalBar: "\u2225",
          DownArrow: "\u2193",
          Downarrow: "\u21D3",
          downarrow: "\u2193",
          DownArrowBar: "\u2913",
          DownArrowUpArrow: "\u21F5",
          DownBreve: "\u0311",
          downdownarrows: "\u21CA",
          downharpoonleft: "\u21C3",
          downharpoonright: "\u21C2",
          DownLeftRightVector: "\u2950",
          DownLeftTeeVector: "\u295E",
          DownLeftVector: "\u21BD",
          DownLeftVectorBar: "\u2956",
          DownRightTeeVector: "\u295F",
          DownRightVector: "\u21C1",
          DownRightVectorBar: "\u2957",
          DownTee: "\u22A4",
          DownTeeArrow: "\u21A7",
          drbkarow: "\u2910",
          drcorn: "\u231F",
          drcrop: "\u230C",
          Dscr: "\u{1D49F}",
          dscr: "\u{1D4B9}",
          DScy: "\u0405",
          dscy: "\u0455",
          dsol: "\u29F6",
          Dstrok: "\u0110",
          dstrok: "\u0111",
          dtdot: "\u22F1",
          dtri: "\u25BF",
          dtrif: "\u25BE",
          duarr: "\u21F5",
          duhar: "\u296F",
          dwangle: "\u29A6",
          DZcy: "\u040F",
          dzcy: "\u045F",
          dzigrarr: "\u27FF",
          Eacute: "\xC9",
          eacute: "\xE9",
          easter: "\u2A6E",
          Ecaron: "\u011A",
          ecaron: "\u011B",
          ecir: "\u2256",
          Ecirc: "\xCA",
          ecirc: "\xEA",
          ecolon: "\u2255",
          Ecy: "\u042D",
          ecy: "\u044D",
          eDDot: "\u2A77",
          Edot: "\u0116",
          eDot: "\u2251",
          edot: "\u0117",
          ee: "\u2147",
          efDot: "\u2252",
          Efr: "\u{1D508}",
          efr: "\u{1D522}",
          eg: "\u2A9A",
          Egrave: "\xC8",
          egrave: "\xE8",
          egs: "\u2A96",
          egsdot: "\u2A98",
          el: "\u2A99",
          Element: "\u2208",
          elinters: "\u23E7",
          ell: "\u2113",
          els: "\u2A95",
          elsdot: "\u2A97",
          Emacr: "\u0112",
          emacr: "\u0113",
          empty: "\u2205",
          emptyset: "\u2205",
          EmptySmallSquare: "\u25FB",
          emptyv: "\u2205",
          EmptyVerySmallSquare: "\u25AB",
          emsp: "\u2003",
          emsp13: "\u2004",
          emsp14: "\u2005",
          ENG: "\u014A",
          eng: "\u014B",
          ensp: "\u2002",
          Eogon: "\u0118",
          eogon: "\u0119",
          Eopf: "\u{1D53C}",
          eopf: "\u{1D556}",
          epar: "\u22D5",
          eparsl: "\u29E3",
          eplus: "\u2A71",
          epsi: "\u03B5",
          Epsilon: "\u0395",
          epsilon: "\u03B5",
          epsiv: "\u03F5",
          eqcirc: "\u2256",
          eqcolon: "\u2255",
          eqsim: "\u2242",
          eqslantgtr: "\u2A96",
          eqslantless: "\u2A95",
          Equal: "\u2A75",
          equals: "=",
          EqualTilde: "\u2242",
          equest: "\u225F",
          Equilibrium: "\u21CC",
          equiv: "\u2261",
          equivDD: "\u2A78",
          eqvparsl: "\u29E5",
          erarr: "\u2971",
          erDot: "\u2253",
          Escr: "\u2130",
          escr: "\u212F",
          esdot: "\u2250",
          Esim: "\u2A73",
          esim: "\u2242",
          Eta: "\u0397",
          eta: "\u03B7",
          ETH: "\xD0",
          eth: "\xF0",
          Euml: "\xCB",
          euml: "\xEB",
          euro: "\u20AC",
          excl: "!",
          exist: "\u2203",
          Exists: "\u2203",
          expectation: "\u2130",
          ExponentialE: "\u2147",
          exponentiale: "\u2147",
          fallingdotseq: "\u2252",
          Fcy: "\u0424",
          fcy: "\u0444",
          female: "\u2640",
          ffilig: "\uFB03",
          fflig: "\uFB00",
          ffllig: "\uFB04",
          Ffr: "\u{1D509}",
          ffr: "\u{1D523}",
          filig: "\uFB01",
          FilledSmallSquare: "\u25FC",
          FilledVerySmallSquare: "\u25AA",
          fjlig: "fj",
          flat: "\u266D",
          fllig: "\uFB02",
          fltns: "\u25B1",
          fnof: "\u0192",
          Fopf: "\u{1D53D}",
          fopf: "\u{1D557}",
          ForAll: "\u2200",
          forall: "\u2200",
          fork: "\u22D4",
          forkv: "\u2AD9",
          Fouriertrf: "\u2131",
          fpartint: "\u2A0D",
          frac12: "\xBD",
          frac13: "\u2153",
          frac14: "\xBC",
          frac15: "\u2155",
          frac16: "\u2159",
          frac18: "\u215B",
          frac23: "\u2154",
          frac25: "\u2156",
          frac34: "\xBE",
          frac35: "\u2157",
          frac38: "\u215C",
          frac45: "\u2158",
          frac56: "\u215A",
          frac58: "\u215D",
          frac78: "\u215E",
          frasl: "\u2044",
          frown: "\u2322",
          Fscr: "\u2131",
          fscr: "\u{1D4BB}",
          gacute: "\u01F5",
          Gamma: "\u0393",
          gamma: "\u03B3",
          Gammad: "\u03DC",
          gammad: "\u03DD",
          gap: "\u2A86",
          Gbreve: "\u011E",
          gbreve: "\u011F",
          Gcedil: "\u0122",
          Gcirc: "\u011C",
          gcirc: "\u011D",
          Gcy: "\u0413",
          gcy: "\u0433",
          Gdot: "\u0120",
          gdot: "\u0121",
          gE: "\u2267",
          ge: "\u2265",
          gEl: "\u2A8C",
          gel: "\u22DB",
          geq: "\u2265",
          geqq: "\u2267",
          geqslant: "\u2A7E",
          ges: "\u2A7E",
          gescc: "\u2AA9",
          gesdot: "\u2A80",
          gesdoto: "\u2A82",
          gesdotol: "\u2A84",
          gesl: "\u22DB\uFE00",
          gesles: "\u2A94",
          Gfr: "\u{1D50A}",
          gfr: "\u{1D524}",
          Gg: "\u22D9",
          gg: "\u226B",
          ggg: "\u22D9",
          gimel: "\u2137",
          GJcy: "\u0403",
          gjcy: "\u0453",
          gl: "\u2277",
          gla: "\u2AA5",
          glE: "\u2A92",
          glj: "\u2AA4",
          gnap: "\u2A8A",
          gnapprox: "\u2A8A",
          gnE: "\u2269",
          gne: "\u2A88",
          gneq: "\u2A88",
          gneqq: "\u2269",
          gnsim: "\u22E7",
          Gopf: "\u{1D53E}",
          gopf: "\u{1D558}",
          grave: "`",
          GreaterEqual: "\u2265",
          GreaterEqualLess: "\u22DB",
          GreaterFullEqual: "\u2267",
          GreaterGreater: "\u2AA2",
          GreaterLess: "\u2277",
          GreaterSlantEqual: "\u2A7E",
          GreaterTilde: "\u2273",
          Gscr: "\u{1D4A2}",
          gscr: "\u210A",
          gsim: "\u2273",
          gsime: "\u2A8E",
          gsiml: "\u2A90",
          GT: ">",
          Gt: "\u226B",
          gt: ">",
          gtcc: "\u2AA7",
          gtcir: "\u2A7A",
          gtdot: "\u22D7",
          gtlPar: "\u2995",
          gtquest: "\u2A7C",
          gtrapprox: "\u2A86",
          gtrarr: "\u2978",
          gtrdot: "\u22D7",
          gtreqless: "\u22DB",
          gtreqqless: "\u2A8C",
          gtrless: "\u2277",
          gtrsim: "\u2273",
          gvertneqq: "\u2269\uFE00",
          gvnE: "\u2269\uFE00",
          Hacek: "\u02C7",
          hairsp: "\u200A",
          half: "\xBD",
          hamilt: "\u210B",
          HARDcy: "\u042A",
          hardcy: "\u044A",
          hArr: "\u21D4",
          harr: "\u2194",
          harrcir: "\u2948",
          harrw: "\u21AD",
          Hat: "^",
          hbar: "\u210F",
          Hcirc: "\u0124",
          hcirc: "\u0125",
          hearts: "\u2665",
          heartsuit: "\u2665",
          hellip: "\u2026",
          hercon: "\u22B9",
          Hfr: "\u210C",
          hfr: "\u{1D525}",
          HilbertSpace: "\u210B",
          hksearow: "\u2925",
          hkswarow: "\u2926",
          hoarr: "\u21FF",
          homtht: "\u223B",
          hookleftarrow: "\u21A9",
          hookrightarrow: "\u21AA",
          Hopf: "\u210D",
          hopf: "\u{1D559}",
          horbar: "\u2015",
          HorizontalLine: "\u2500",
          Hscr: "\u210B",
          hscr: "\u{1D4BD}",
          hslash: "\u210F",
          Hstrok: "\u0126",
          hstrok: "\u0127",
          HumpDownHump: "\u224E",
          HumpEqual: "\u224F",
          hybull: "\u2043",
          hyphen: "\u2010",
          Iacute: "\xCD",
          iacute: "\xED",
          ic: "\u2063",
          Icirc: "\xCE",
          icirc: "\xEE",
          Icy: "\u0418",
          icy: "\u0438",
          Idot: "\u0130",
          IEcy: "\u0415",
          iecy: "\u0435",
          iexcl: "\xA1",
          iff: "\u21D4",
          Ifr: "\u2111",
          ifr: "\u{1D526}",
          Igrave: "\xCC",
          igrave: "\xEC",
          ii: "\u2148",
          iiiint: "\u2A0C",
          iiint: "\u222D",
          iinfin: "\u29DC",
          iiota: "\u2129",
          IJlig: "\u0132",
          ijlig: "\u0133",
          Im: "\u2111",
          Imacr: "\u012A",
          imacr: "\u012B",
          image: "\u2111",
          ImaginaryI: "\u2148",
          imagline: "\u2110",
          imagpart: "\u2111",
          imath: "\u0131",
          imof: "\u22B7",
          imped: "\u01B5",
          Implies: "\u21D2",
          in: "\u2208",
          incare: "\u2105",
          infin: "\u221E",
          infintie: "\u29DD",
          inodot: "\u0131",
          Int: "\u222C",
          int: "\u222B",
          intcal: "\u22BA",
          integers: "\u2124",
          Integral: "\u222B",
          intercal: "\u22BA",
          Intersection: "\u22C2",
          intlarhk: "\u2A17",
          intprod: "\u2A3C",
          InvisibleComma: "\u2063",
          InvisibleTimes: "\u2062",
          IOcy: "\u0401",
          iocy: "\u0451",
          Iogon: "\u012E",
          iogon: "\u012F",
          Iopf: "\u{1D540}",
          iopf: "\u{1D55A}",
          Iota: "\u0399",
          iota: "\u03B9",
          iprod: "\u2A3C",
          iquest: "\xBF",
          Iscr: "\u2110",
          iscr: "\u{1D4BE}",
          isin: "\u2208",
          isindot: "\u22F5",
          isinE: "\u22F9",
          isins: "\u22F4",
          isinsv: "\u22F3",
          isinv: "\u2208",
          it: "\u2062",
          Itilde: "\u0128",
          itilde: "\u0129",
          Iukcy: "\u0406",
          iukcy: "\u0456",
          Iuml: "\xCF",
          iuml: "\xEF",
          Jcirc: "\u0134",
          jcirc: "\u0135",
          Jcy: "\u0419",
          jcy: "\u0439",
          Jfr: "\u{1D50D}",
          jfr: "\u{1D527}",
          jmath: "\u0237",
          Jopf: "\u{1D541}",
          jopf: "\u{1D55B}",
          Jscr: "\u{1D4A5}",
          jscr: "\u{1D4BF}",
          Jsercy: "\u0408",
          jsercy: "\u0458",
          Jukcy: "\u0404",
          jukcy: "\u0454",
          Kappa: "\u039A",
          kappa: "\u03BA",
          kappav: "\u03F0",
          Kcedil: "\u0136",
          kcedil: "\u0137",
          Kcy: "\u041A",
          kcy: "\u043A",
          Kfr: "\u{1D50E}",
          kfr: "\u{1D528}",
          kgreen: "\u0138",
          KHcy: "\u0425",
          khcy: "\u0445",
          KJcy: "\u040C",
          kjcy: "\u045C",
          Kopf: "\u{1D542}",
          kopf: "\u{1D55C}",
          Kscr: "\u{1D4A6}",
          kscr: "\u{1D4C0}",
          lAarr: "\u21DA",
          Lacute: "\u0139",
          lacute: "\u013A",
          laemptyv: "\u29B4",
          lagran: "\u2112",
          Lambda: "\u039B",
          lambda: "\u03BB",
          Lang: "\u27EA",
          lang: "\u27E8",
          langd: "\u2991",
          langle: "\u27E8",
          lap: "\u2A85",
          Laplacetrf: "\u2112",
          laquo: "\xAB",
          Larr: "\u219E",
          lArr: "\u21D0",
          larr: "\u2190",
          larrb: "\u21E4",
          larrbfs: "\u291F",
          larrfs: "\u291D",
          larrhk: "\u21A9",
          larrlp: "\u21AB",
          larrpl: "\u2939",
          larrsim: "\u2973",
          larrtl: "\u21A2",
          lat: "\u2AAB",
          lAtail: "\u291B",
          latail: "\u2919",
          late: "\u2AAD",
          lates: "\u2AAD\uFE00",
          lBarr: "\u290E",
          lbarr: "\u290C",
          lbbrk: "\u2772",
          lbrace: "{",
          lbrack: "[",
          lbrke: "\u298B",
          lbrksld: "\u298F",
          lbrkslu: "\u298D",
          Lcaron: "\u013D",
          lcaron: "\u013E",
          Lcedil: "\u013B",
          lcedil: "\u013C",
          lceil: "\u2308",
          lcub: "{",
          Lcy: "\u041B",
          lcy: "\u043B",
          ldca: "\u2936",
          ldquo: "\u201C",
          ldquor: "\u201E",
          ldrdhar: "\u2967",
          ldrushar: "\u294B",
          ldsh: "\u21B2",
          lE: "\u2266",
          le: "\u2264",
          LeftAngleBracket: "\u27E8",
          LeftArrow: "\u2190",
          Leftarrow: "\u21D0",
          leftarrow: "\u2190",
          LeftArrowBar: "\u21E4",
          LeftArrowRightArrow: "\u21C6",
          leftarrowtail: "\u21A2",
          LeftCeiling: "\u2308",
          LeftDoubleBracket: "\u27E6",
          LeftDownTeeVector: "\u2961",
          LeftDownVector: "\u21C3",
          LeftDownVectorBar: "\u2959",
          LeftFloor: "\u230A",
          leftharpoondown: "\u21BD",
          leftharpoonup: "\u21BC",
          leftleftarrows: "\u21C7",
          LeftRightArrow: "\u2194",
          Leftrightarrow: "\u21D4",
          leftrightarrow: "\u2194",
          leftrightarrows: "\u21C6",
          leftrightharpoons: "\u21CB",
          leftrightsquigarrow: "\u21AD",
          LeftRightVector: "\u294E",
          LeftTee: "\u22A3",
          LeftTeeArrow: "\u21A4",
          LeftTeeVector: "\u295A",
          leftthreetimes: "\u22CB",
          LeftTriangle: "\u22B2",
          LeftTriangleBar: "\u29CF",
          LeftTriangleEqual: "\u22B4",
          LeftUpDownVector: "\u2951",
          LeftUpTeeVector: "\u2960",
          LeftUpVector: "\u21BF",
          LeftUpVectorBar: "\u2958",
          LeftVector: "\u21BC",
          LeftVectorBar: "\u2952",
          lEg: "\u2A8B",
          leg: "\u22DA",
          leq: "\u2264",
          leqq: "\u2266",
          leqslant: "\u2A7D",
          les: "\u2A7D",
          lescc: "\u2AA8",
          lesdot: "\u2A7F",
          lesdoto: "\u2A81",
          lesdotor: "\u2A83",
          lesg: "\u22DA\uFE00",
          lesges: "\u2A93",
          lessapprox: "\u2A85",
          lessdot: "\u22D6",
          lesseqgtr: "\u22DA",
          lesseqqgtr: "\u2A8B",
          LessEqualGreater: "\u22DA",
          LessFullEqual: "\u2266",
          LessGreater: "\u2276",
          lessgtr: "\u2276",
          LessLess: "\u2AA1",
          lesssim: "\u2272",
          LessSlantEqual: "\u2A7D",
          LessTilde: "\u2272",
          lfisht: "\u297C",
          lfloor: "\u230A",
          Lfr: "\u{1D50F}",
          lfr: "\u{1D529}",
          lg: "\u2276",
          lgE: "\u2A91",
          lHar: "\u2962",
          lhard: "\u21BD",
          lharu: "\u21BC",
          lharul: "\u296A",
          lhblk: "\u2584",
          LJcy: "\u0409",
          ljcy: "\u0459",
          Ll: "\u22D8",
          ll: "\u226A",
          llarr: "\u21C7",
          llcorner: "\u231E",
          Lleftarrow: "\u21DA",
          llhard: "\u296B",
          lltri: "\u25FA",
          Lmidot: "\u013F",
          lmidot: "\u0140",
          lmoust: "\u23B0",
          lmoustache: "\u23B0",
          lnap: "\u2A89",
          lnapprox: "\u2A89",
          lnE: "\u2268",
          lne: "\u2A87",
          lneq: "\u2A87",
          lneqq: "\u2268",
          lnsim: "\u22E6",
          loang: "\u27EC",
          loarr: "\u21FD",
          lobrk: "\u27E6",
          LongLeftArrow: "\u27F5",
          Longleftarrow: "\u27F8",
          longleftarrow: "\u27F5",
          LongLeftRightArrow: "\u27F7",
          Longleftrightarrow: "\u27FA",
          longleftrightarrow: "\u27F7",
          longmapsto: "\u27FC",
          LongRightArrow: "\u27F6",
          Longrightarrow: "\u27F9",
          longrightarrow: "\u27F6",
          looparrowleft: "\u21AB",
          looparrowright: "\u21AC",
          lopar: "\u2985",
          Lopf: "\u{1D543}",
          lopf: "\u{1D55D}",
          loplus: "\u2A2D",
          lotimes: "\u2A34",
          lowast: "\u2217",
          lowbar: "_",
          LowerLeftArrow: "\u2199",
          LowerRightArrow: "\u2198",
          loz: "\u25CA",
          lozenge: "\u25CA",
          lozf: "\u29EB",
          lpar: "(",
          lparlt: "\u2993",
          lrarr: "\u21C6",
          lrcorner: "\u231F",
          lrhar: "\u21CB",
          lrhard: "\u296D",
          lrm: "\u200E",
          lrtri: "\u22BF",
          lsaquo: "\u2039",
          Lscr: "\u2112",
          lscr: "\u{1D4C1}",
          Lsh: "\u21B0",
          lsh: "\u21B0",
          lsim: "\u2272",
          lsime: "\u2A8D",
          lsimg: "\u2A8F",
          lsqb: "[",
          lsquo: "\u2018",
          lsquor: "\u201A",
          Lstrok: "\u0141",
          lstrok: "\u0142",
          LT: "<",
          Lt: "\u226A",
          lt: "<",
          ltcc: "\u2AA6",
          ltcir: "\u2A79",
          ltdot: "\u22D6",
          lthree: "\u22CB",
          ltimes: "\u22C9",
          ltlarr: "\u2976",
          ltquest: "\u2A7B",
          ltri: "\u25C3",
          ltrie: "\u22B4",
          ltrif: "\u25C2",
          ltrPar: "\u2996",
          lurdshar: "\u294A",
          luruhar: "\u2966",
          lvertneqq: "\u2268\uFE00",
          lvnE: "\u2268\uFE00",
          macr: "\xAF",
          male: "\u2642",
          malt: "\u2720",
          maltese: "\u2720",
          Map: "\u2905",
          map: "\u21A6",
          mapsto: "\u21A6",
          mapstodown: "\u21A7",
          mapstoleft: "\u21A4",
          mapstoup: "\u21A5",
          marker: "\u25AE",
          mcomma: "\u2A29",
          Mcy: "\u041C",
          mcy: "\u043C",
          mdash: "\u2014",
          mDDot: "\u223A",
          measuredangle: "\u2221",
          MediumSpace: "\u205F",
          Mellintrf: "\u2133",
          Mfr: "\u{1D510}",
          mfr: "\u{1D52A}",
          mho: "\u2127",
          micro: "\xB5",
          mid: "\u2223",
          midast: "*",
          midcir: "\u2AF0",
          middot: "\xB7",
          minus: "\u2212",
          minusb: "\u229F",
          minusd: "\u2238",
          minusdu: "\u2A2A",
          MinusPlus: "\u2213",
          mlcp: "\u2ADB",
          mldr: "\u2026",
          mnplus: "\u2213",
          models: "\u22A7",
          Mopf: "\u{1D544}",
          mopf: "\u{1D55E}",
          mp: "\u2213",
          Mscr: "\u2133",
          mscr: "\u{1D4C2}",
          mstpos: "\u223E",
          Mu: "\u039C",
          mu: "\u03BC",
          multimap: "\u22B8",
          mumap: "\u22B8",
          nabla: "\u2207",
          Nacute: "\u0143",
          nacute: "\u0144",
          nang: "\u2220\u20D2",
          nap: "\u2249",
          napE: "\u2A70\u0338",
          napid: "\u224B\u0338",
          napos: "\u0149",
          napprox: "\u2249",
          natur: "\u266E",
          natural: "\u266E",
          naturals: "\u2115",
          nbsp: "\xA0",
          nbump: "\u224E\u0338",
          nbumpe: "\u224F\u0338",
          ncap: "\u2A43",
          Ncaron: "\u0147",
          ncaron: "\u0148",
          Ncedil: "\u0145",
          ncedil: "\u0146",
          ncong: "\u2247",
          ncongdot: "\u2A6D\u0338",
          ncup: "\u2A42",
          Ncy: "\u041D",
          ncy: "\u043D",
          ndash: "\u2013",
          ne: "\u2260",
          nearhk: "\u2924",
          neArr: "\u21D7",
          nearr: "\u2197",
          nearrow: "\u2197",
          nedot: "\u2250\u0338",
          NegativeMediumSpace: "\u200B",
          NegativeThickSpace: "\u200B",
          NegativeThinSpace: "\u200B",
          NegativeVeryThinSpace: "\u200B",
          nequiv: "\u2262",
          nesear: "\u2928",
          nesim: "\u2242\u0338",
          NestedGreaterGreater: "\u226B",
          NestedLessLess: "\u226A",
          NewLine: `
`,
          nexist: "\u2204",
          nexists: "\u2204",
          Nfr: "\u{1D511}",
          nfr: "\u{1D52B}",
          ngE: "\u2267\u0338",
          nge: "\u2271",
          ngeq: "\u2271",
          ngeqq: "\u2267\u0338",
          ngeqslant: "\u2A7E\u0338",
          nges: "\u2A7E\u0338",
          nGg: "\u22D9\u0338",
          ngsim: "\u2275",
          nGt: "\u226B\u20D2",
          ngt: "\u226F",
          ngtr: "\u226F",
          nGtv: "\u226B\u0338",
          nhArr: "\u21CE",
          nharr: "\u21AE",
          nhpar: "\u2AF2",
          ni: "\u220B",
          nis: "\u22FC",
          nisd: "\u22FA",
          niv: "\u220B",
          NJcy: "\u040A",
          njcy: "\u045A",
          nlArr: "\u21CD",
          nlarr: "\u219A",
          nldr: "\u2025",
          nlE: "\u2266\u0338",
          nle: "\u2270",
          nLeftarrow: "\u21CD",
          nleftarrow: "\u219A",
          nLeftrightarrow: "\u21CE",
          nleftrightarrow: "\u21AE",
          nleq: "\u2270",
          nleqq: "\u2266\u0338",
          nleqslant: "\u2A7D\u0338",
          nles: "\u2A7D\u0338",
          nless: "\u226E",
          nLl: "\u22D8\u0338",
          nlsim: "\u2274",
          nLt: "\u226A\u20D2",
          nlt: "\u226E",
          nltri: "\u22EA",
          nltrie: "\u22EC",
          nLtv: "\u226A\u0338",
          nmid: "\u2224",
          NoBreak: "\u2060",
          NonBreakingSpace: "\xA0",
          Nopf: "\u2115",
          nopf: "\u{1D55F}",
          Not: "\u2AEC",
          not: "\xAC",
          NotCongruent: "\u2262",
          NotCupCap: "\u226D",
          NotDoubleVerticalBar: "\u2226",
          NotElement: "\u2209",
          NotEqual: "\u2260",
          NotEqualTilde: "\u2242\u0338",
          NotExists: "\u2204",
          NotGreater: "\u226F",
          NotGreaterEqual: "\u2271",
          NotGreaterFullEqual: "\u2267\u0338",
          NotGreaterGreater: "\u226B\u0338",
          NotGreaterLess: "\u2279",
          NotGreaterSlantEqual: "\u2A7E\u0338",
          NotGreaterTilde: "\u2275",
          NotHumpDownHump: "\u224E\u0338",
          NotHumpEqual: "\u224F\u0338",
          notin: "\u2209",
          notindot: "\u22F5\u0338",
          notinE: "\u22F9\u0338",
          notinva: "\u2209",
          notinvb: "\u22F7",
          notinvc: "\u22F6",
          NotLeftTriangle: "\u22EA",
          NotLeftTriangleBar: "\u29CF\u0338",
          NotLeftTriangleEqual: "\u22EC",
          NotLess: "\u226E",
          NotLessEqual: "\u2270",
          NotLessGreater: "\u2278",
          NotLessLess: "\u226A\u0338",
          NotLessSlantEqual: "\u2A7D\u0338",
          NotLessTilde: "\u2274",
          NotNestedGreaterGreater: "\u2AA2\u0338",
          NotNestedLessLess: "\u2AA1\u0338",
          notni: "\u220C",
          notniva: "\u220C",
          notnivb: "\u22FE",
          notnivc: "\u22FD",
          NotPrecedes: "\u2280",
          NotPrecedesEqual: "\u2AAF\u0338",
          NotPrecedesSlantEqual: "\u22E0",
          NotReverseElement: "\u220C",
          NotRightTriangle: "\u22EB",
          NotRightTriangleBar: "\u29D0\u0338",
          NotRightTriangleEqual: "\u22ED",
          NotSquareSubset: "\u228F\u0338",
          NotSquareSubsetEqual: "\u22E2",
          NotSquareSuperset: "\u2290\u0338",
          NotSquareSupersetEqual: "\u22E3",
          NotSubset: "\u2282\u20D2",
          NotSubsetEqual: "\u2288",
          NotSucceeds: "\u2281",
          NotSucceedsEqual: "\u2AB0\u0338",
          NotSucceedsSlantEqual: "\u22E1",
          NotSucceedsTilde: "\u227F\u0338",
          NotSuperset: "\u2283\u20D2",
          NotSupersetEqual: "\u2289",
          NotTilde: "\u2241",
          NotTildeEqual: "\u2244",
          NotTildeFullEqual: "\u2247",
          NotTildeTilde: "\u2249",
          NotVerticalBar: "\u2224",
          npar: "\u2226",
          nparallel: "\u2226",
          nparsl: "\u2AFD\u20E5",
          npart: "\u2202\u0338",
          npolint: "\u2A14",
          npr: "\u2280",
          nprcue: "\u22E0",
          npre: "\u2AAF\u0338",
          nprec: "\u2280",
          npreceq: "\u2AAF\u0338",
          nrArr: "\u21CF",
          nrarr: "\u219B",
          nrarrc: "\u2933\u0338",
          nrarrw: "\u219D\u0338",
          nRightarrow: "\u21CF",
          nrightarrow: "\u219B",
          nrtri: "\u22EB",
          nrtrie: "\u22ED",
          nsc: "\u2281",
          nsccue: "\u22E1",
          nsce: "\u2AB0\u0338",
          Nscr: "\u{1D4A9}",
          nscr: "\u{1D4C3}",
          nshortmid: "\u2224",
          nshortparallel: "\u2226",
          nsim: "\u2241",
          nsime: "\u2244",
          nsimeq: "\u2244",
          nsmid: "\u2224",
          nspar: "\u2226",
          nsqsube: "\u22E2",
          nsqsupe: "\u22E3",
          nsub: "\u2284",
          nsubE: "\u2AC5\u0338",
          nsube: "\u2288",
          nsubset: "\u2282\u20D2",
          nsubseteq: "\u2288",
          nsubseteqq: "\u2AC5\u0338",
          nsucc: "\u2281",
          nsucceq: "\u2AB0\u0338",
          nsup: "\u2285",
          nsupE: "\u2AC6\u0338",
          nsupe: "\u2289",
          nsupset: "\u2283\u20D2",
          nsupseteq: "\u2289",
          nsupseteqq: "\u2AC6\u0338",
          ntgl: "\u2279",
          Ntilde: "\xD1",
          ntilde: "\xF1",
          ntlg: "\u2278",
          ntriangleleft: "\u22EA",
          ntrianglelefteq: "\u22EC",
          ntriangleright: "\u22EB",
          ntrianglerighteq: "\u22ED",
          Nu: "\u039D",
          nu: "\u03BD",
          num: "#",
          numero: "\u2116",
          numsp: "\u2007",
          nvap: "\u224D\u20D2",
          nVDash: "\u22AF",
          nVdash: "\u22AE",
          nvDash: "\u22AD",
          nvdash: "\u22AC",
          nvge: "\u2265\u20D2",
          nvgt: ">\u20D2",
          nvHarr: "\u2904",
          nvinfin: "\u29DE",
          nvlArr: "\u2902",
          nvle: "\u2264\u20D2",
          nvlt: "<\u20D2",
          nvltrie: "\u22B4\u20D2",
          nvrArr: "\u2903",
          nvrtrie: "\u22B5\u20D2",
          nvsim: "\u223C\u20D2",
          nwarhk: "\u2923",
          nwArr: "\u21D6",
          nwarr: "\u2196",
          nwarrow: "\u2196",
          nwnear: "\u2927",
          Oacute: "\xD3",
          oacute: "\xF3",
          oast: "\u229B",
          ocir: "\u229A",
          Ocirc: "\xD4",
          ocirc: "\xF4",
          Ocy: "\u041E",
          ocy: "\u043E",
          odash: "\u229D",
          Odblac: "\u0150",
          odblac: "\u0151",
          odiv: "\u2A38",
          odot: "\u2299",
          odsold: "\u29BC",
          OElig: "\u0152",
          oelig: "\u0153",
          ofcir: "\u29BF",
          Ofr: "\u{1D512}",
          ofr: "\u{1D52C}",
          ogon: "\u02DB",
          Ograve: "\xD2",
          ograve: "\xF2",
          ogt: "\u29C1",
          ohbar: "\u29B5",
          ohm: "\u03A9",
          oint: "\u222E",
          olarr: "\u21BA",
          olcir: "\u29BE",
          olcross: "\u29BB",
          oline: "\u203E",
          olt: "\u29C0",
          Omacr: "\u014C",
          omacr: "\u014D",
          Omega: "\u03A9",
          omega: "\u03C9",
          Omicron: "\u039F",
          omicron: "\u03BF",
          omid: "\u29B6",
          ominus: "\u2296",
          Oopf: "\u{1D546}",
          oopf: "\u{1D560}",
          opar: "\u29B7",
          OpenCurlyDoubleQuote: "\u201C",
          OpenCurlyQuote: "\u2018",
          operp: "\u29B9",
          oplus: "\u2295",
          Or: "\u2A54",
          or: "\u2228",
          orarr: "\u21BB",
          ord: "\u2A5D",
          order: "\u2134",
          orderof: "\u2134",
          ordf: "\xAA",
          ordm: "\xBA",
          origof: "\u22B6",
          oror: "\u2A56",
          orslope: "\u2A57",
          orv: "\u2A5B",
          oS: "\u24C8",
          Oscr: "\u{1D4AA}",
          oscr: "\u2134",
          Oslash: "\xD8",
          oslash: "\xF8",
          osol: "\u2298",
          Otilde: "\xD5",
          otilde: "\xF5",
          Otimes: "\u2A37",
          otimes: "\u2297",
          otimesas: "\u2A36",
          Ouml: "\xD6",
          ouml: "\xF6",
          ovbar: "\u233D",
          OverBar: "\u203E",
          OverBrace: "\u23DE",
          OverBracket: "\u23B4",
          OverParenthesis: "\u23DC",
          par: "\u2225",
          para: "\xB6",
          parallel: "\u2225",
          parsim: "\u2AF3",
          parsl: "\u2AFD",
          part: "\u2202",
          PartialD: "\u2202",
          Pcy: "\u041F",
          pcy: "\u043F",
          percnt: "%",
          period: ".",
          permil: "\u2030",
          perp: "\u22A5",
          pertenk: "\u2031",
          Pfr: "\u{1D513}",
          pfr: "\u{1D52D}",
          Phi: "\u03A6",
          phi: "\u03C6",
          phiv: "\u03D5",
          phmmat: "\u2133",
          phone: "\u260E",
          Pi: "\u03A0",
          pi: "\u03C0",
          pitchfork: "\u22D4",
          piv: "\u03D6",
          planck: "\u210F",
          planckh: "\u210E",
          plankv: "\u210F",
          plus: "+",
          plusacir: "\u2A23",
          plusb: "\u229E",
          pluscir: "\u2A22",
          plusdo: "\u2214",
          plusdu: "\u2A25",
          pluse: "\u2A72",
          PlusMinus: "\xB1",
          plusmn: "\xB1",
          plussim: "\u2A26",
          plustwo: "\u2A27",
          pm: "\xB1",
          Poincareplane: "\u210C",
          pointint: "\u2A15",
          Popf: "\u2119",
          popf: "\u{1D561}",
          pound: "\xA3",
          Pr: "\u2ABB",
          pr: "\u227A",
          prap: "\u2AB7",
          prcue: "\u227C",
          prE: "\u2AB3",
          pre: "\u2AAF",
          prec: "\u227A",
          precapprox: "\u2AB7",
          preccurlyeq: "\u227C",
          Precedes: "\u227A",
          PrecedesEqual: "\u2AAF",
          PrecedesSlantEqual: "\u227C",
          PrecedesTilde: "\u227E",
          preceq: "\u2AAF",
          precnapprox: "\u2AB9",
          precneqq: "\u2AB5",
          precnsim: "\u22E8",
          precsim: "\u227E",
          Prime: "\u2033",
          prime: "\u2032",
          primes: "\u2119",
          prnap: "\u2AB9",
          prnE: "\u2AB5",
          prnsim: "\u22E8",
          prod: "\u220F",
          Product: "\u220F",
          profalar: "\u232E",
          profline: "\u2312",
          profsurf: "\u2313",
          prop: "\u221D",
          Proportion: "\u2237",
          Proportional: "\u221D",
          propto: "\u221D",
          prsim: "\u227E",
          prurel: "\u22B0",
          Pscr: "\u{1D4AB}",
          pscr: "\u{1D4C5}",
          Psi: "\u03A8",
          psi: "\u03C8",
          puncsp: "\u2008",
          Qfr: "\u{1D514}",
          qfr: "\u{1D52E}",
          qint: "\u2A0C",
          Qopf: "\u211A",
          qopf: "\u{1D562}",
          qprime: "\u2057",
          Qscr: "\u{1D4AC}",
          qscr: "\u{1D4C6}",
          quaternions: "\u210D",
          quatint: "\u2A16",
          quest: "?",
          questeq: "\u225F",
          QUOT: '"',
          quot: '"',
          rAarr: "\u21DB",
          race: "\u223D\u0331",
          Racute: "\u0154",
          racute: "\u0155",
          radic: "\u221A",
          raemptyv: "\u29B3",
          Rang: "\u27EB",
          rang: "\u27E9",
          rangd: "\u2992",
          range: "\u29A5",
          rangle: "\u27E9",
          raquo: "\xBB",
          Rarr: "\u21A0",
          rArr: "\u21D2",
          rarr: "\u2192",
          rarrap: "\u2975",
          rarrb: "\u21E5",
          rarrbfs: "\u2920",
          rarrc: "\u2933",
          rarrfs: "\u291E",
          rarrhk: "\u21AA",
          rarrlp: "\u21AC",
          rarrpl: "\u2945",
          rarrsim: "\u2974",
          Rarrtl: "\u2916",
          rarrtl: "\u21A3",
          rarrw: "\u219D",
          rAtail: "\u291C",
          ratail: "\u291A",
          ratio: "\u2236",
          rationals: "\u211A",
          RBarr: "\u2910",
          rBarr: "\u290F",
          rbarr: "\u290D",
          rbbrk: "\u2773",
          rbrace: "}",
          rbrack: "]",
          rbrke: "\u298C",
          rbrksld: "\u298E",
          rbrkslu: "\u2990",
          Rcaron: "\u0158",
          rcaron: "\u0159",
          Rcedil: "\u0156",
          rcedil: "\u0157",
          rceil: "\u2309",
          rcub: "}",
          Rcy: "\u0420",
          rcy: "\u0440",
          rdca: "\u2937",
          rdldhar: "\u2969",
          rdquo: "\u201D",
          rdquor: "\u201D",
          rdsh: "\u21B3",
          Re: "\u211C",
          real: "\u211C",
          realine: "\u211B",
          realpart: "\u211C",
          reals: "\u211D",
          rect: "\u25AD",
          REG: "\xAE",
          reg: "\xAE",
          ReverseElement: "\u220B",
          ReverseEquilibrium: "\u21CB",
          ReverseUpEquilibrium: "\u296F",
          rfisht: "\u297D",
          rfloor: "\u230B",
          Rfr: "\u211C",
          rfr: "\u{1D52F}",
          rHar: "\u2964",
          rhard: "\u21C1",
          rharu: "\u21C0",
          rharul: "\u296C",
          Rho: "\u03A1",
          rho: "\u03C1",
          rhov: "\u03F1",
          RightAngleBracket: "\u27E9",
          RightArrow: "\u2192",
          Rightarrow: "\u21D2",
          rightarrow: "\u2192",
          RightArrowBar: "\u21E5",
          RightArrowLeftArrow: "\u21C4",
          rightarrowtail: "\u21A3",
          RightCeiling: "\u2309",
          RightDoubleBracket: "\u27E7",
          RightDownTeeVector: "\u295D",
          RightDownVector: "\u21C2",
          RightDownVectorBar: "\u2955",
          RightFloor: "\u230B",
          rightharpoondown: "\u21C1",
          rightharpoonup: "\u21C0",
          rightleftarrows: "\u21C4",
          rightleftharpoons: "\u21CC",
          rightrightarrows: "\u21C9",
          rightsquigarrow: "\u219D",
          RightTee: "\u22A2",
          RightTeeArrow: "\u21A6",
          RightTeeVector: "\u295B",
          rightthreetimes: "\u22CC",
          RightTriangle: "\u22B3",
          RightTriangleBar: "\u29D0",
          RightTriangleEqual: "\u22B5",
          RightUpDownVector: "\u294F",
          RightUpTeeVector: "\u295C",
          RightUpVector: "\u21BE",
          RightUpVectorBar: "\u2954",
          RightVector: "\u21C0",
          RightVectorBar: "\u2953",
          ring: "\u02DA",
          risingdotseq: "\u2253",
          rlarr: "\u21C4",
          rlhar: "\u21CC",
          rlm: "\u200F",
          rmoust: "\u23B1",
          rmoustache: "\u23B1",
          rnmid: "\u2AEE",
          roang: "\u27ED",
          roarr: "\u21FE",
          robrk: "\u27E7",
          ropar: "\u2986",
          Ropf: "\u211D",
          ropf: "\u{1D563}",
          roplus: "\u2A2E",
          rotimes: "\u2A35",
          RoundImplies: "\u2970",
          rpar: ")",
          rpargt: "\u2994",
          rppolint: "\u2A12",
          rrarr: "\u21C9",
          Rrightarrow: "\u21DB",
          rsaquo: "\u203A",
          Rscr: "\u211B",
          rscr: "\u{1D4C7}",
          Rsh: "\u21B1",
          rsh: "\u21B1",
          rsqb: "]",
          rsquo: "\u2019",
          rsquor: "\u2019",
          rthree: "\u22CC",
          rtimes: "\u22CA",
          rtri: "\u25B9",
          rtrie: "\u22B5",
          rtrif: "\u25B8",
          rtriltri: "\u29CE",
          RuleDelayed: "\u29F4",
          ruluhar: "\u2968",
          rx: "\u211E",
          Sacute: "\u015A",
          sacute: "\u015B",
          sbquo: "\u201A",
          Sc: "\u2ABC",
          sc: "\u227B",
          scap: "\u2AB8",
          Scaron: "\u0160",
          scaron: "\u0161",
          sccue: "\u227D",
          scE: "\u2AB4",
          sce: "\u2AB0",
          Scedil: "\u015E",
          scedil: "\u015F",
          Scirc: "\u015C",
          scirc: "\u015D",
          scnap: "\u2ABA",
          scnE: "\u2AB6",
          scnsim: "\u22E9",
          scpolint: "\u2A13",
          scsim: "\u227F",
          Scy: "\u0421",
          scy: "\u0441",
          sdot: "\u22C5",
          sdotb: "\u22A1",
          sdote: "\u2A66",
          searhk: "\u2925",
          seArr: "\u21D8",
          searr: "\u2198",
          searrow: "\u2198",
          sect: "\xA7",
          semi: ";",
          seswar: "\u2929",
          setminus: "\u2216",
          setmn: "\u2216",
          sext: "\u2736",
          Sfr: "\u{1D516}",
          sfr: "\u{1D530}",
          sfrown: "\u2322",
          sharp: "\u266F",
          SHCHcy: "\u0429",
          shchcy: "\u0449",
          SHcy: "\u0428",
          shcy: "\u0448",
          ShortDownArrow: "\u2193",
          ShortLeftArrow: "\u2190",
          shortmid: "\u2223",
          shortparallel: "\u2225",
          ShortRightArrow: "\u2192",
          ShortUpArrow: "\u2191",
          shy: "\xAD",
          Sigma: "\u03A3",
          sigma: "\u03C3",
          sigmaf: "\u03C2",
          sigmav: "\u03C2",
          sim: "\u223C",
          simdot: "\u2A6A",
          sime: "\u2243",
          simeq: "\u2243",
          simg: "\u2A9E",
          simgE: "\u2AA0",
          siml: "\u2A9D",
          simlE: "\u2A9F",
          simne: "\u2246",
          simplus: "\u2A24",
          simrarr: "\u2972",
          slarr: "\u2190",
          SmallCircle: "\u2218",
          smallsetminus: "\u2216",
          smashp: "\u2A33",
          smeparsl: "\u29E4",
          smid: "\u2223",
          smile: "\u2323",
          smt: "\u2AAA",
          smte: "\u2AAC",
          smtes: "\u2AAC\uFE00",
          SOFTcy: "\u042C",
          softcy: "\u044C",
          sol: "/",
          solb: "\u29C4",
          solbar: "\u233F",
          Sopf: "\u{1D54A}",
          sopf: "\u{1D564}",
          spades: "\u2660",
          spadesuit: "\u2660",
          spar: "\u2225",
          sqcap: "\u2293",
          sqcaps: "\u2293\uFE00",
          sqcup: "\u2294",
          sqcups: "\u2294\uFE00",
          Sqrt: "\u221A",
          sqsub: "\u228F",
          sqsube: "\u2291",
          sqsubset: "\u228F",
          sqsubseteq: "\u2291",
          sqsup: "\u2290",
          sqsupe: "\u2292",
          sqsupset: "\u2290",
          sqsupseteq: "\u2292",
          squ: "\u25A1",
          Square: "\u25A1",
          square: "\u25A1",
          SquareIntersection: "\u2293",
          SquareSubset: "\u228F",
          SquareSubsetEqual: "\u2291",
          SquareSuperset: "\u2290",
          SquareSupersetEqual: "\u2292",
          SquareUnion: "\u2294",
          squarf: "\u25AA",
          squf: "\u25AA",
          srarr: "\u2192",
          Sscr: "\u{1D4AE}",
          sscr: "\u{1D4C8}",
          ssetmn: "\u2216",
          ssmile: "\u2323",
          sstarf: "\u22C6",
          Star: "\u22C6",
          star: "\u2606",
          starf: "\u2605",
          straightepsilon: "\u03F5",
          straightphi: "\u03D5",
          strns: "\xAF",
          Sub: "\u22D0",
          sub: "\u2282",
          subdot: "\u2ABD",
          subE: "\u2AC5",
          sube: "\u2286",
          subedot: "\u2AC3",
          submult: "\u2AC1",
          subnE: "\u2ACB",
          subne: "\u228A",
          subplus: "\u2ABF",
          subrarr: "\u2979",
          Subset: "\u22D0",
          subset: "\u2282",
          subseteq: "\u2286",
          subseteqq: "\u2AC5",
          SubsetEqual: "\u2286",
          subsetneq: "\u228A",
          subsetneqq: "\u2ACB",
          subsim: "\u2AC7",
          subsub: "\u2AD5",
          subsup: "\u2AD3",
          succ: "\u227B",
          succapprox: "\u2AB8",
          succcurlyeq: "\u227D",
          Succeeds: "\u227B",
          SucceedsEqual: "\u2AB0",
          SucceedsSlantEqual: "\u227D",
          SucceedsTilde: "\u227F",
          succeq: "\u2AB0",
          succnapprox: "\u2ABA",
          succneqq: "\u2AB6",
          succnsim: "\u22E9",
          succsim: "\u227F",
          SuchThat: "\u220B",
          Sum: "\u2211",
          sum: "\u2211",
          sung: "\u266A",
          Sup: "\u22D1",
          sup: "\u2283",
          sup1: "\xB9",
          sup2: "\xB2",
          sup3: "\xB3",
          supdot: "\u2ABE",
          supdsub: "\u2AD8",
          supE: "\u2AC6",
          supe: "\u2287",
          supedot: "\u2AC4",
          Superset: "\u2283",
          SupersetEqual: "\u2287",
          suphsol: "\u27C9",
          suphsub: "\u2AD7",
          suplarr: "\u297B",
          supmult: "\u2AC2",
          supnE: "\u2ACC",
          supne: "\u228B",
          supplus: "\u2AC0",
          Supset: "\u22D1",
          supset: "\u2283",
          supseteq: "\u2287",
          supseteqq: "\u2AC6",
          supsetneq: "\u228B",
          supsetneqq: "\u2ACC",
          supsim: "\u2AC8",
          supsub: "\u2AD4",
          supsup: "\u2AD6",
          swarhk: "\u2926",
          swArr: "\u21D9",
          swarr: "\u2199",
          swarrow: "\u2199",
          swnwar: "\u292A",
          szlig: "\xDF",
          Tab: "	",
          target: "\u2316",
          Tau: "\u03A4",
          tau: "\u03C4",
          tbrk: "\u23B4",
          Tcaron: "\u0164",
          tcaron: "\u0165",
          Tcedil: "\u0162",
          tcedil: "\u0163",
          Tcy: "\u0422",
          tcy: "\u0442",
          tdot: "\u20DB",
          telrec: "\u2315",
          Tfr: "\u{1D517}",
          tfr: "\u{1D531}",
          there4: "\u2234",
          Therefore: "\u2234",
          therefore: "\u2234",
          Theta: "\u0398",
          theta: "\u03B8",
          thetasym: "\u03D1",
          thetav: "\u03D1",
          thickapprox: "\u2248",
          thicksim: "\u223C",
          ThickSpace: "\u205F\u200A",
          thinsp: "\u2009",
          ThinSpace: "\u2009",
          thkap: "\u2248",
          thksim: "\u223C",
          THORN: "\xDE",
          thorn: "\xFE",
          Tilde: "\u223C",
          tilde: "\u02DC",
          TildeEqual: "\u2243",
          TildeFullEqual: "\u2245",
          TildeTilde: "\u2248",
          times: "\xD7",
          timesb: "\u22A0",
          timesbar: "\u2A31",
          timesd: "\u2A30",
          tint: "\u222D",
          toea: "\u2928",
          top: "\u22A4",
          topbot: "\u2336",
          topcir: "\u2AF1",
          Topf: "\u{1D54B}",
          topf: "\u{1D565}",
          topfork: "\u2ADA",
          tosa: "\u2929",
          tprime: "\u2034",
          TRADE: "\u2122",
          trade: "\u2122",
          triangle: "\u25B5",
          triangledown: "\u25BF",
          triangleleft: "\u25C3",
          trianglelefteq: "\u22B4",
          triangleq: "\u225C",
          triangleright: "\u25B9",
          trianglerighteq: "\u22B5",
          tridot: "\u25EC",
          trie: "\u225C",
          triminus: "\u2A3A",
          TripleDot: "\u20DB",
          triplus: "\u2A39",
          trisb: "\u29CD",
          tritime: "\u2A3B",
          trpezium: "\u23E2",
          Tscr: "\u{1D4AF}",
          tscr: "\u{1D4C9}",
          TScy: "\u0426",
          tscy: "\u0446",
          TSHcy: "\u040B",
          tshcy: "\u045B",
          Tstrok: "\u0166",
          tstrok: "\u0167",
          twixt: "\u226C",
          twoheadleftarrow: "\u219E",
          twoheadrightarrow: "\u21A0",
          Uacute: "\xDA",
          uacute: "\xFA",
          Uarr: "\u219F",
          uArr: "\u21D1",
          uarr: "\u2191",
          Uarrocir: "\u2949",
          Ubrcy: "\u040E",
          ubrcy: "\u045E",
          Ubreve: "\u016C",
          ubreve: "\u016D",
          Ucirc: "\xDB",
          ucirc: "\xFB",
          Ucy: "\u0423",
          ucy: "\u0443",
          udarr: "\u21C5",
          Udblac: "\u0170",
          udblac: "\u0171",
          udhar: "\u296E",
          ufisht: "\u297E",
          Ufr: "\u{1D518}",
          ufr: "\u{1D532}",
          Ugrave: "\xD9",
          ugrave: "\xF9",
          uHar: "\u2963",
          uharl: "\u21BF",
          uharr: "\u21BE",
          uhblk: "\u2580",
          ulcorn: "\u231C",
          ulcorner: "\u231C",
          ulcrop: "\u230F",
          ultri: "\u25F8",
          Umacr: "\u016A",
          umacr: "\u016B",
          uml: "\xA8",
          UnderBar: "_",
          UnderBrace: "\u23DF",
          UnderBracket: "\u23B5",
          UnderParenthesis: "\u23DD",
          Union: "\u22C3",
          UnionPlus: "\u228E",
          Uogon: "\u0172",
          uogon: "\u0173",
          Uopf: "\u{1D54C}",
          uopf: "\u{1D566}",
          UpArrow: "\u2191",
          Uparrow: "\u21D1",
          uparrow: "\u2191",
          UpArrowBar: "\u2912",
          UpArrowDownArrow: "\u21C5",
          UpDownArrow: "\u2195",
          Updownarrow: "\u21D5",
          updownarrow: "\u2195",
          UpEquilibrium: "\u296E",
          upharpoonleft: "\u21BF",
          upharpoonright: "\u21BE",
          uplus: "\u228E",
          UpperLeftArrow: "\u2196",
          UpperRightArrow: "\u2197",
          Upsi: "\u03D2",
          upsi: "\u03C5",
          upsih: "\u03D2",
          Upsilon: "\u03A5",
          upsilon: "\u03C5",
          UpTee: "\u22A5",
          UpTeeArrow: "\u21A5",
          upuparrows: "\u21C8",
          urcorn: "\u231D",
          urcorner: "\u231D",
          urcrop: "\u230E",
          Uring: "\u016E",
          uring: "\u016F",
          urtri: "\u25F9",
          Uscr: "\u{1D4B0}",
          uscr: "\u{1D4CA}",
          utdot: "\u22F0",
          Utilde: "\u0168",
          utilde: "\u0169",
          utri: "\u25B5",
          utrif: "\u25B4",
          uuarr: "\u21C8",
          Uuml: "\xDC",
          uuml: "\xFC",
          uwangle: "\u29A7",
          vangrt: "\u299C",
          varepsilon: "\u03F5",
          varkappa: "\u03F0",
          varnothing: "\u2205",
          varphi: "\u03D5",
          varpi: "\u03D6",
          varpropto: "\u221D",
          vArr: "\u21D5",
          varr: "\u2195",
          varrho: "\u03F1",
          varsigma: "\u03C2",
          varsubsetneq: "\u228A\uFE00",
          varsubsetneqq: "\u2ACB\uFE00",
          varsupsetneq: "\u228B\uFE00",
          varsupsetneqq: "\u2ACC\uFE00",
          vartheta: "\u03D1",
          vartriangleleft: "\u22B2",
          vartriangleright: "\u22B3",
          Vbar: "\u2AEB",
          vBar: "\u2AE8",
          vBarv: "\u2AE9",
          Vcy: "\u0412",
          vcy: "\u0432",
          VDash: "\u22AB",
          Vdash: "\u22A9",
          vDash: "\u22A8",
          vdash: "\u22A2",
          Vdashl: "\u2AE6",
          Vee: "\u22C1",
          vee: "\u2228",
          veebar: "\u22BB",
          veeeq: "\u225A",
          vellip: "\u22EE",
          Verbar: "\u2016",
          verbar: "|",
          Vert: "\u2016",
          vert: "|",
          VerticalBar: "\u2223",
          VerticalLine: "|",
          VerticalSeparator: "\u2758",
          VerticalTilde: "\u2240",
          VeryThinSpace: "\u200A",
          Vfr: "\u{1D519}",
          vfr: "\u{1D533}",
          vltri: "\u22B2",
          vnsub: "\u2282\u20D2",
          vnsup: "\u2283\u20D2",
          Vopf: "\u{1D54D}",
          vopf: "\u{1D567}",
          vprop: "\u221D",
          vrtri: "\u22B3",
          Vscr: "\u{1D4B1}",
          vscr: "\u{1D4CB}",
          vsubnE: "\u2ACB\uFE00",
          vsubne: "\u228A\uFE00",
          vsupnE: "\u2ACC\uFE00",
          vsupne: "\u228B\uFE00",
          Vvdash: "\u22AA",
          vzigzag: "\u299A",
          Wcirc: "\u0174",
          wcirc: "\u0175",
          wedbar: "\u2A5F",
          Wedge: "\u22C0",
          wedge: "\u2227",
          wedgeq: "\u2259",
          weierp: "\u2118",
          Wfr: "\u{1D51A}",
          wfr: "\u{1D534}",
          Wopf: "\u{1D54E}",
          wopf: "\u{1D568}",
          wp: "\u2118",
          wr: "\u2240",
          wreath: "\u2240",
          Wscr: "\u{1D4B2}",
          wscr: "\u{1D4CC}",
          xcap: "\u22C2",
          xcirc: "\u25EF",
          xcup: "\u22C3",
          xdtri: "\u25BD",
          Xfr: "\u{1D51B}",
          xfr: "\u{1D535}",
          xhArr: "\u27FA",
          xharr: "\u27F7",
          Xi: "\u039E",
          xi: "\u03BE",
          xlArr: "\u27F8",
          xlarr: "\u27F5",
          xmap: "\u27FC",
          xnis: "\u22FB",
          xodot: "\u2A00",
          Xopf: "\u{1D54F}",
          xopf: "\u{1D569}",
          xoplus: "\u2A01",
          xotime: "\u2A02",
          xrArr: "\u27F9",
          xrarr: "\u27F6",
          Xscr: "\u{1D4B3}",
          xscr: "\u{1D4CD}",
          xsqcup: "\u2A06",
          xuplus: "\u2A04",
          xutri: "\u25B3",
          xvee: "\u22C1",
          xwedge: "\u22C0",
          Yacute: "\xDD",
          yacute: "\xFD",
          YAcy: "\u042F",
          yacy: "\u044F",
          Ycirc: "\u0176",
          ycirc: "\u0177",
          Ycy: "\u042B",
          ycy: "\u044B",
          yen: "\xA5",
          Yfr: "\u{1D51C}",
          yfr: "\u{1D536}",
          YIcy: "\u0407",
          yicy: "\u0457",
          Yopf: "\u{1D550}",
          yopf: "\u{1D56A}",
          Yscr: "\u{1D4B4}",
          yscr: "\u{1D4CE}",
          YUcy: "\u042E",
          yucy: "\u044E",
          Yuml: "\u0178",
          yuml: "\xFF",
          Zacute: "\u0179",
          zacute: "\u017A",
          Zcaron: "\u017D",
          zcaron: "\u017E",
          Zcy: "\u0417",
          zcy: "\u0437",
          Zdot: "\u017B",
          zdot: "\u017C",
          zeetrf: "\u2128",
          ZeroWidthSpace: "\u200B",
          Zeta: "\u0396",
          zeta: "\u03B6",
          Zfr: "\u2128",
          zfr: "\u{1D537}",
          ZHcy: "\u0416",
          zhcy: "\u0436",
          zigrarr: "\u21DD",
          Zopf: "\u2124",
          zopf: "\u{1D56B}",
          Zscr: "\u{1D4B5}",
          zscr: "\u{1D4CF}",
          zwj: "\u200D",
          zwnj: "\u200C",
        }),
        (e.NGSP_UNICODE = "\uE500"),
        (e.NAMED_ENTITIES.ngsp = e.NGSP_UNICODE);
    },
  }),
  Es = I({
    "node_modules/angular-html-parser/lib/compiler/src/ml_parser/html_tags.js"(
      e
    ) {
      "use strict";
      O(), Object.defineProperty(e, "__esModule", { value: !0 });
      var r = Ze(),
        t = class {
          constructor() {
            let {
              closedByChildren: a,
              implicitNamespacePrefix: f,
              contentType: D = r.TagContentType.PARSABLE_DATA,
              closedByParent: v = !1,
              isVoid: i = !1,
              ignoreFirstLf: l = !1,
            } = arguments.length > 0 && arguments[0] !== void 0
              ? arguments[0]
              : {};
            (this.closedByChildren = {}),
              (this.closedByParent = !1),
              (this.canSelfClose = !1),
              a &&
                a.length > 0 &&
                a.forEach((p) => (this.closedByChildren[p] = !0)),
              (this.isVoid = i),
              (this.closedByParent = v || i),
              (this.implicitNamespacePrefix = f || null),
              (this.contentType = D),
              (this.ignoreFirstLf = l);
          }
          isClosedByChild(a) {
            return this.isVoid || a.toLowerCase() in this.closedByChildren;
          }
        };
      e.HtmlTagDefinition = t;
      var s, c;
      function n(a) {
        return (
          c ||
            ((s = new t()),
            (c = {
              base: new t({ isVoid: !0 }),
              meta: new t({ isVoid: !0 }),
              area: new t({ isVoid: !0 }),
              embed: new t({ isVoid: !0 }),
              link: new t({ isVoid: !0 }),
              img: new t({ isVoid: !0 }),
              input: new t({ isVoid: !0 }),
              param: new t({ isVoid: !0 }),
              hr: new t({ isVoid: !0 }),
              br: new t({ isVoid: !0 }),
              source: new t({ isVoid: !0 }),
              track: new t({ isVoid: !0 }),
              wbr: new t({ isVoid: !0 }),
              p: new t({
                closedByChildren: [
                  "address",
                  "article",
                  "aside",
                  "blockquote",
                  "div",
                  "dl",
                  "fieldset",
                  "footer",
                  "form",
                  "h1",
                  "h2",
                  "h3",
                  "h4",
                  "h5",
                  "h6",
                  "header",
                  "hgroup",
                  "hr",
                  "main",
                  "nav",
                  "ol",
                  "p",
                  "pre",
                  "section",
                  "table",
                  "ul",
                ],
                closedByParent: !0,
              }),
              thead: new t({ closedByChildren: ["tbody", "tfoot"] }),
              tbody: new t({
                closedByChildren: ["tbody", "tfoot"],
                closedByParent: !0,
              }),
              tfoot: new t({ closedByChildren: ["tbody"], closedByParent: !0 }),
              tr: new t({ closedByChildren: ["tr"], closedByParent: !0 }),
              td: new t({ closedByChildren: ["td", "th"], closedByParent: !0 }),
              th: new t({ closedByChildren: ["td", "th"], closedByParent: !0 }),
              col: new t({ isVoid: !0 }),
              svg: new t({ implicitNamespacePrefix: "svg" }),
              math: new t({ implicitNamespacePrefix: "math" }),
              li: new t({ closedByChildren: ["li"], closedByParent: !0 }),
              dt: new t({ closedByChildren: ["dt", "dd"] }),
              dd: new t({ closedByChildren: ["dt", "dd"], closedByParent: !0 }),
              rb: new t({
                closedByChildren: ["rb", "rt", "rtc", "rp"],
                closedByParent: !0,
              }),
              rt: new t({
                closedByChildren: ["rb", "rt", "rtc", "rp"],
                closedByParent: !0,
              }),
              rtc: new t({
                closedByChildren: ["rb", "rtc", "rp"],
                closedByParent: !0,
              }),
              rp: new t({
                closedByChildren: ["rb", "rt", "rtc", "rp"],
                closedByParent: !0,
              }),
              optgroup: new t({
                closedByChildren: ["optgroup"],
                closedByParent: !0,
              }),
              option: new t({
                closedByChildren: ["option", "optgroup"],
                closedByParent: !0,
              }),
              pre: new t({ ignoreFirstLf: !0 }),
              listing: new t({ ignoreFirstLf: !0 }),
              style: new t({ contentType: r.TagContentType.RAW_TEXT }),
              script: new t({ contentType: r.TagContentType.RAW_TEXT }),
              title: new t({
                contentType: r.TagContentType.ESCAPABLE_RAW_TEXT,
              }),
              textarea: new t({
                contentType: r.TagContentType.ESCAPABLE_RAW_TEXT,
                ignoreFirstLf: !0,
              }),
            })),
          c[a] || s
        );
      }
      e.getHtmlTagDefinition = n;
    },
  }),
  RD = I({
    "node_modules/angular-html-parser/lib/compiler/src/ast_path.js"(e) {
      "use strict";
      O(), Object.defineProperty(e, "__esModule", { value: !0 });
      var r = class {
        constructor(t) {
          let s =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1;
          (this.path = t), (this.position = s);
        }
        get empty() {
          return !this.path || !this.path.length;
        }
        get head() {
          return this.path[0];
        }
        get tail() {
          return this.path[this.path.length - 1];
        }
        parentOf(t) {
          return t && this.path[this.path.indexOf(t) - 1];
        }
        childOf(t) {
          return this.path[this.path.indexOf(t) + 1];
        }
        first(t) {
          for (let s = this.path.length - 1; s >= 0; s--) {
            let c = this.path[s];
            if (c instanceof t) return c;
          }
        }
        push(t) {
          this.path.push(t);
        }
        pop() {
          return this.path.pop();
        }
      };
      e.AstPath = r;
    },
  }),
  Cs = I({
    "node_modules/angular-html-parser/lib/compiler/src/ml_parser/ast.js"(e) {
      "use strict";
      O(), Object.defineProperty(e, "__esModule", { value: !0 });
      var r = RD(),
        t = class {
          constructor(C, m, B) {
            (this.value = C),
              (this.sourceSpan = m),
              (this.i18n = B),
              (this.type = "text");
          }
          visit(C, m) {
            return C.visitText(this, m);
          }
        };
      e.Text = t;
      var s = class {
        constructor(C, m) {
          (this.value = C), (this.sourceSpan = m), (this.type = "cdata");
        }
        visit(C, m) {
          return C.visitCdata(this, m);
        }
      };
      e.CDATA = s;
      var c = class {
        constructor(C, m, B, w, S, N) {
          (this.switchValue = C),
            (this.type = m),
            (this.cases = B),
            (this.sourceSpan = w),
            (this.switchValueSourceSpan = S),
            (this.i18n = N);
        }
        visit(C, m) {
          return C.visitExpansion(this, m);
        }
      };
      e.Expansion = c;
      var n = class {
        constructor(C, m, B, w, S) {
          (this.value = C),
            (this.expression = m),
            (this.sourceSpan = B),
            (this.valueSourceSpan = w),
            (this.expSourceSpan = S);
        }
        visit(C, m) {
          return C.visitExpansionCase(this, m);
        }
      };
      e.ExpansionCase = n;
      var a = class {
        constructor(C, m, B) {
          let w =
              arguments.length > 3 && arguments[3] !== void 0
                ? arguments[3]
                : null,
            S =
              arguments.length > 4 && arguments[4] !== void 0
                ? arguments[4]
                : null,
            N =
              arguments.length > 5 && arguments[5] !== void 0
                ? arguments[5]
                : null;
          (this.name = C),
            (this.value = m),
            (this.sourceSpan = B),
            (this.valueSpan = w),
            (this.nameSpan = S),
            (this.i18n = N),
            (this.type = "attribute");
        }
        visit(C, m) {
          return C.visitAttribute(this, m);
        }
      };
      e.Attribute = a;
      var f = class {
        constructor(C, m, B, w) {
          let S =
              arguments.length > 4 && arguments[4] !== void 0
                ? arguments[4]
                : null,
            N =
              arguments.length > 5 && arguments[5] !== void 0
                ? arguments[5]
                : null,
            b =
              arguments.length > 6 && arguments[6] !== void 0
                ? arguments[6]
                : null,
            j =
              arguments.length > 7 && arguments[7] !== void 0
                ? arguments[7]
                : null;
          (this.name = C),
            (this.attrs = m),
            (this.children = B),
            (this.sourceSpan = w),
            (this.startSourceSpan = S),
            (this.endSourceSpan = N),
            (this.nameSpan = b),
            (this.i18n = j),
            (this.type = "element");
        }
        visit(C, m) {
          return C.visitElement(this, m);
        }
      };
      e.Element = f;
      var D = class {
        constructor(C, m) {
          (this.value = C), (this.sourceSpan = m), (this.type = "comment");
        }
        visit(C, m) {
          return C.visitComment(this, m);
        }
      };
      e.Comment = D;
      var v = class {
        constructor(C, m) {
          (this.value = C), (this.sourceSpan = m), (this.type = "docType");
        }
        visit(C, m) {
          return C.visitDocType(this, m);
        }
      };
      e.DocType = v;
      function i(C, m) {
        let B =
            arguments.length > 2 && arguments[2] !== void 0
              ? arguments[2]
              : null,
          w = [],
          S = C.visit
            ? (N) => C.visit(N, B) || N.visit(C, B)
            : (N) => N.visit(C, B);
        return (
          m.forEach((N) => {
            let b = S(N);
            b && w.push(b);
          }),
          w
        );
      }
      e.visitAll = i;
      var l = class {
        constructor() {}
        visitElement(C, m) {
          this.visitChildren(m, (B) => {
            B(C.attrs), B(C.children);
          });
        }
        visitAttribute(C, m) {}
        visitText(C, m) {}
        visitCdata(C, m) {}
        visitComment(C, m) {}
        visitDocType(C, m) {}
        visitExpansion(C, m) {
          return this.visitChildren(m, (B) => {
            B(C.cases);
          });
        }
        visitExpansionCase(C, m) {}
        visitChildren(C, m) {
          let B = [],
            w = this;
          function S(N) {
            N && B.push(i(w, N, C));
          }
          return m(S), Array.prototype.concat.apply([], B);
        }
      };
      e.RecursiveVisitor = l;
      function p(C) {
        let m = C.sourceSpan.start.offset,
          B = C.sourceSpan.end.offset;
        return (
          C instanceof f &&
            (C.endSourceSpan
              ? (B = C.endSourceSpan.end.offset)
              : C.children &&
                C.children.length &&
                (B = p(C.children[C.children.length - 1]).end)),
          { start: m, end: B }
        );
      }
      function g(C, m) {
        let B = [],
          w = new (class extends l {
            visit(S, N) {
              let b = p(S);
              if (b.start <= m && m < b.end) B.push(S);
              else return !0;
            }
          })();
        return i(w, C), new r.AstPath(B, m);
      }
      e.findNode = g;
    },
  }),
  xD = I({
    "node_modules/angular-html-parser/lib/compiler/src/assertions.js"(e) {
      "use strict";
      O(), Object.defineProperty(e, "__esModule", { value: !0 });
      function r(c, n) {
        if (n != null) {
          if (!Array.isArray(n))
            throw new Error(
              "Expected '".concat(c, "' to be an array of strings.")
            );
          for (let a = 0; a < n.length; a += 1)
            if (typeof n[a] != "string")
              throw new Error(
                "Expected '".concat(c, "' to be an array of strings.")
              );
        }
      }
      e.assertArrayOfStrings = r;
      var t = [/^\s*$/, /[<>]/, /^[{}]$/, /&(#|[a-z])/i, /^\/\//];
      function s(c, n) {
        if (n != null && !(Array.isArray(n) && n.length == 2))
          throw new Error(
            "Expected '".concat(c, "' to be an array, [start, end].")
          );
        if (n != null) {
          let a = n[0],
            f = n[1];
          t.forEach((D) => {
            if (D.test(a) || D.test(f))
              throw new Error(
                "['"
                  .concat(a, "', '")
                  .concat(f, "'] contains unusable interpolation symbol.")
              );
          });
        }
      }
      e.assertInterpolationSymbols = s;
    },
  }),
  PD = I({
    "node_modules/angular-html-parser/lib/compiler/src/ml_parser/interpolation_config.js"(
      e
    ) {
      "use strict";
      O(), Object.defineProperty(e, "__esModule", { value: !0 });
      var r = xD(),
        t = class {
          constructor(s, c) {
            (this.start = s), (this.end = c);
          }
          static fromArray(s) {
            return s
              ? (r.assertInterpolationSymbols("interpolation", s),
                new t(s[0], s[1]))
              : e.DEFAULT_INTERPOLATION_CONFIG;
          }
        };
      (e.InterpolationConfig = t),
        (e.DEFAULT_INTERPOLATION_CONFIG = new t("{{", "}}"));
    },
  }),
  kD = I({
    "node_modules/angular-html-parser/lib/compiler/src/ml_parser/lexer.js"(e) {
      "use strict";
      O(), Object.defineProperty(e, "__esModule", { value: !0 });
      var r = ss(),
        t = we(),
        s = PD(),
        c = Ze(),
        n;
      (function (u) {
        (u[(u.TAG_OPEN_START = 0)] = "TAG_OPEN_START"),
          (u[(u.TAG_OPEN_END = 1)] = "TAG_OPEN_END"),
          (u[(u.TAG_OPEN_END_VOID = 2)] = "TAG_OPEN_END_VOID"),
          (u[(u.TAG_CLOSE = 3)] = "TAG_CLOSE"),
          (u[(u.TEXT = 4)] = "TEXT"),
          (u[(u.ESCAPABLE_RAW_TEXT = 5)] = "ESCAPABLE_RAW_TEXT"),
          (u[(u.RAW_TEXT = 6)] = "RAW_TEXT"),
          (u[(u.COMMENT_START = 7)] = "COMMENT_START"),
          (u[(u.COMMENT_END = 8)] = "COMMENT_END"),
          (u[(u.CDATA_START = 9)] = "CDATA_START"),
          (u[(u.CDATA_END = 10)] = "CDATA_END"),
          (u[(u.ATTR_NAME = 11)] = "ATTR_NAME"),
          (u[(u.ATTR_QUOTE = 12)] = "ATTR_QUOTE"),
          (u[(u.ATTR_VALUE = 13)] = "ATTR_VALUE"),
          (u[(u.DOC_TYPE_START = 14)] = "DOC_TYPE_START"),
          (u[(u.DOC_TYPE_END = 15)] = "DOC_TYPE_END"),
          (u[(u.EXPANSION_FORM_START = 16)] = "EXPANSION_FORM_START"),
          (u[(u.EXPANSION_CASE_VALUE = 17)] = "EXPANSION_CASE_VALUE"),
          (u[(u.EXPANSION_CASE_EXP_START = 18)] = "EXPANSION_CASE_EXP_START"),
          (u[(u.EXPANSION_CASE_EXP_END = 19)] = "EXPANSION_CASE_EXP_END"),
          (u[(u.EXPANSION_FORM_END = 20)] = "EXPANSION_FORM_END"),
          (u[(u.EOF = 21)] = "EOF");
      })((n = e.TokenType || (e.TokenType = {})));
      var a = class {
        constructor(u, o, d) {
          (this.type = u), (this.parts = o), (this.sourceSpan = d);
        }
      };
      e.Token = a;
      var f = class extends t.ParseError {
        constructor(u, o, d) {
          super(d, u), (this.tokenType = o);
        }
      };
      e.TokenError = f;
      var D = class {
        constructor(u, o) {
          (this.tokens = u), (this.errors = o);
        }
      };
      e.TokenizeResult = D;
      function v(u, o, d) {
        let h =
          arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        return new C(new t.ParseSourceFile(u, o), d, h).tokenize();
      }
      e.tokenize = v;
      var i = /\r\n?/g;
      function l(u) {
        let o = u === r.$EOF ? "EOF" : String.fromCharCode(u);
        return 'Unexpected character "'.concat(o, '"');
      }
      function p(u) {
        return 'Unknown entity "'.concat(
          u,
          '" - use the "&#<decimal>;" or  "&#x<hex>;" syntax'
        );
      }
      var g = class {
          constructor(u) {
            this.error = u;
          }
        },
        C = class {
          constructor(u, o, d) {
            (this._getTagContentType = o),
              (this._currentTokenStart = null),
              (this._currentTokenType = null),
              (this._expansionCaseStack = []),
              (this._inInterpolation = !1),
              (this._fullNameStack = []),
              (this.tokens = []),
              (this.errors = []),
              (this._tokenizeIcu = d.tokenizeExpansionForms || !1),
              (this._interpolationConfig =
                d.interpolationConfig || s.DEFAULT_INTERPOLATION_CONFIG),
              (this._leadingTriviaCodePoints =
                d.leadingTriviaChars &&
                d.leadingTriviaChars.map((F) => F.codePointAt(0) || 0)),
              (this._canSelfClose = d.canSelfClose || !1),
              (this._allowHtmComponentClosingTags =
                d.allowHtmComponentClosingTags || !1);
            let h = d.range || {
              endPos: u.content.length,
              startPos: 0,
              startLine: 0,
              startCol: 0,
            };
            this._cursor = d.escapedString ? new $(u, h) : new k(u, h);
            try {
              this._cursor.init();
            } catch (F) {
              this.handleError(F);
            }
          }
          _processCarriageReturns(u) {
            return u.replace(
              i,
              `
`
            );
          }
          tokenize() {
            for (; this._cursor.peek() !== r.$EOF; ) {
              let u = this._cursor.clone();
              try {
                if (this._attemptCharCode(r.$LT))
                  if (this._attemptCharCode(r.$BANG))
                    this._attemptStr("[CDATA[")
                      ? this._consumeCdata(u)
                      : this._attemptStr("--")
                      ? this._consumeComment(u)
                      : this._attemptStrCaseInsensitive("doctype")
                      ? this._consumeDocType(u)
                      : this._consumeBogusComment(u);
                  else if (this._attemptCharCode(r.$SLASH))
                    this._consumeTagClose(u);
                  else {
                    let o = this._cursor.clone();
                    this._attemptCharCode(r.$QUESTION)
                      ? ((this._cursor = o), this._consumeBogusComment(u))
                      : this._consumeTagOpen(u);
                  }
                else
                  (this._tokenizeIcu && this._tokenizeExpansionForm()) ||
                    this._consumeText();
              } catch (o) {
                this.handleError(o);
              }
            }
            return (
              this._beginToken(n.EOF),
              this._endToken([]),
              new D(U(this.tokens), this.errors)
            );
          }
          _tokenizeExpansionForm() {
            if (this.isExpansionFormStart())
              return this._consumeExpansionFormStart(), !0;
            if (b(this._cursor.peek()) && this._isInExpansionForm())
              return this._consumeExpansionCaseStart(), !0;
            if (this._cursor.peek() === r.$RBRACE) {
              if (this._isInExpansionCase())
                return this._consumeExpansionCaseEnd(), !0;
              if (this._isInExpansionForm())
                return this._consumeExpansionFormEnd(), !0;
            }
            return !1;
          }
          _beginToken(u) {
            let o =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : this._cursor.clone();
            (this._currentTokenStart = o), (this._currentTokenType = u);
          }
          _endToken(u) {
            let o =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : this._cursor.clone();
            if (this._currentTokenStart === null)
              throw new f(
                "Programming error - attempted to end a token when there was no start to the token",
                this._currentTokenType,
                this._cursor.getSpan(o)
              );
            if (this._currentTokenType === null)
              throw new f(
                "Programming error - attempted to end a token which has no token type",
                null,
                this._cursor.getSpan(this._currentTokenStart)
              );
            let d = new a(
              this._currentTokenType,
              u,
              this._cursor.getSpan(
                this._currentTokenStart,
                this._leadingTriviaCodePoints
              )
            );
            return (
              this.tokens.push(d),
              (this._currentTokenStart = null),
              (this._currentTokenType = null),
              d
            );
          }
          _createError(u, o) {
            this._isInExpansionForm() &&
              (u += ` (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.)`);
            let d = new f(u, this._currentTokenType, o);
            return (
              (this._currentTokenStart = null),
              (this._currentTokenType = null),
              new g(d)
            );
          }
          handleError(u) {
            if (
              (u instanceof L &&
                (u = this._createError(u.msg, this._cursor.getSpan(u.cursor))),
              u instanceof g)
            )
              this.errors.push(u.error);
            else throw u;
          }
          _attemptCharCode(u) {
            return this._cursor.peek() === u
              ? (this._cursor.advance(), !0)
              : !1;
          }
          _attemptCharCodeCaseInsensitive(u) {
            return j(this._cursor.peek(), u)
              ? (this._cursor.advance(), !0)
              : !1;
          }
          _requireCharCode(u) {
            let o = this._cursor.clone();
            if (!this._attemptCharCode(u))
              throw this._createError(
                l(this._cursor.peek()),
                this._cursor.getSpan(o)
              );
          }
          _attemptStr(u) {
            let o = u.length;
            if (this._cursor.charsLeft() < o) return !1;
            let d = this._cursor.clone();
            for (let h = 0; h < o; h++)
              if (!this._attemptCharCode(u.charCodeAt(h)))
                return (this._cursor = d), !1;
            return !0;
          }
          _attemptStrCaseInsensitive(u) {
            for (let o = 0; o < u.length; o++)
              if (!this._attemptCharCodeCaseInsensitive(u.charCodeAt(o)))
                return !1;
            return !0;
          }
          _requireStr(u) {
            let o = this._cursor.clone();
            if (!this._attemptStr(u))
              throw this._createError(
                l(this._cursor.peek()),
                this._cursor.getSpan(o)
              );
          }
          _requireStrCaseInsensitive(u) {
            let o = this._cursor.clone();
            if (!this._attemptStrCaseInsensitive(u))
              throw this._createError(
                l(this._cursor.peek()),
                this._cursor.getSpan(o)
              );
          }
          _attemptCharCodeUntilFn(u) {
            for (; !u(this._cursor.peek()); ) this._cursor.advance();
          }
          _requireCharCodeUntilFn(u, o) {
            let d = this._cursor.clone();
            if (
              (this._attemptCharCodeUntilFn(u),
              this._cursor.clone().diff(d) < o)
            )
              throw this._createError(
                l(this._cursor.peek()),
                this._cursor.getSpan(d)
              );
          }
          _attemptUntilChar(u) {
            for (; this._cursor.peek() !== u; ) this._cursor.advance();
          }
          _readChar(u) {
            if (u && this._cursor.peek() === r.$AMPERSAND)
              return this._decodeEntity();
            {
              let o = String.fromCodePoint(this._cursor.peek());
              return this._cursor.advance(), o;
            }
          }
          _decodeEntity() {
            let u = this._cursor.clone();
            if ((this._cursor.advance(), this._attemptCharCode(r.$HASH))) {
              let o =
                  this._attemptCharCode(r.$x) || this._attemptCharCode(r.$X),
                d = this._cursor.clone();
              if (
                (this._attemptCharCodeUntilFn(S),
                this._cursor.peek() != r.$SEMICOLON)
              )
                throw this._createError(
                  l(this._cursor.peek()),
                  this._cursor.getSpan()
                );
              let h = this._cursor.getChars(d);
              this._cursor.advance();
              try {
                let F = parseInt(h, o ? 16 : 10);
                return String.fromCharCode(F);
              } catch {
                throw this._createError(
                  p(this._cursor.getChars(u)),
                  this._cursor.getSpan()
                );
              }
            } else {
              let o = this._cursor.clone();
              if (
                (this._attemptCharCodeUntilFn(N),
                this._cursor.peek() != r.$SEMICOLON)
              )
                return (this._cursor = o), "&";
              let d = this._cursor.getChars(o);
              this._cursor.advance();
              let h = c.NAMED_ENTITIES[d];
              if (!h) throw this._createError(p(d), this._cursor.getSpan(u));
              return h;
            }
          }
          _consumeRawText(u, o) {
            this._beginToken(u ? n.ESCAPABLE_RAW_TEXT : n.RAW_TEXT);
            let d = [];
            for (;;) {
              let h = this._cursor.clone(),
                F = o();
              if (((this._cursor = h), F)) break;
              d.push(this._readChar(u));
            }
            return this._endToken([this._processCarriageReturns(d.join(""))]);
          }
          _consumeComment(u) {
            this._beginToken(n.COMMENT_START, u),
              this._endToken([]),
              this._consumeRawText(!1, () => this._attemptStr("-->")),
              this._beginToken(n.COMMENT_END),
              this._requireStr("-->"),
              this._endToken([]);
          }
          _consumeBogusComment(u) {
            this._beginToken(n.COMMENT_START, u),
              this._endToken([]),
              this._consumeRawText(!1, () => this._cursor.peek() === r.$GT),
              this._beginToken(n.COMMENT_END),
              this._cursor.advance(),
              this._endToken([]);
          }
          _consumeCdata(u) {
            this._beginToken(n.CDATA_START, u),
              this._endToken([]),
              this._consumeRawText(!1, () => this._attemptStr("]]>")),
              this._beginToken(n.CDATA_END),
              this._requireStr("]]>"),
              this._endToken([]);
          }
          _consumeDocType(u) {
            this._beginToken(n.DOC_TYPE_START, u),
              this._endToken([]),
              this._consumeRawText(!1, () => this._cursor.peek() === r.$GT),
              this._beginToken(n.DOC_TYPE_END),
              this._cursor.advance(),
              this._endToken([]);
          }
          _consumePrefixAndName() {
            let u = this._cursor.clone(),
              o = "";
            for (
              ;
              this._cursor.peek() !== r.$COLON && !w(this._cursor.peek());

            )
              this._cursor.advance();
            let d;
            this._cursor.peek() === r.$COLON
              ? ((o = this._cursor.getChars(u)),
                this._cursor.advance(),
                (d = this._cursor.clone()))
              : (d = u),
              this._requireCharCodeUntilFn(B, o === "" ? 0 : 1);
            let h = this._cursor.getChars(d);
            return [o, h];
          }
          _consumeTagOpen(u) {
            let o,
              d,
              h,
              F = this.tokens.length,
              q = this._cursor.clone(),
              P = [];
            try {
              if (!r.isAsciiLetter(this._cursor.peek()))
                throw this._createError(
                  l(this._cursor.peek()),
                  this._cursor.getSpan(u)
                );
              for (
                h = this._consumeTagOpenStart(u),
                  d = h.parts[0],
                  o = h.parts[1],
                  this._attemptCharCodeUntilFn(m);
                this._cursor.peek() !== r.$SLASH &&
                this._cursor.peek() !== r.$GT;

              ) {
                let [H, K] = this._consumeAttributeName();
                if (
                  (this._attemptCharCodeUntilFn(m),
                  this._attemptCharCode(r.$EQ))
                ) {
                  this._attemptCharCodeUntilFn(m);
                  let z = this._consumeAttributeValue();
                  P.push({ prefix: H, name: K, value: z });
                } else P.push({ prefix: H, name: K });
                this._attemptCharCodeUntilFn(m);
              }
              this._consumeTagOpenEnd();
            } catch (H) {
              if (H instanceof g) {
                (this._cursor = q),
                  h && (this.tokens.length = F),
                  this._beginToken(n.TEXT, u),
                  this._endToken(["<"]);
                return;
              }
              throw H;
            }
            if (
              this._canSelfClose &&
              this.tokens[this.tokens.length - 1].type === n.TAG_OPEN_END_VOID
            )
              return;
            let G = this._getTagContentType(
              o,
              d,
              this._fullNameStack.length > 0,
              P
            );
            this._handleFullNameStackForTagOpen(d, o),
              G === c.TagContentType.RAW_TEXT
                ? this._consumeRawTextWithTagClose(d, o, !1)
                : G === c.TagContentType.ESCAPABLE_RAW_TEXT &&
                  this._consumeRawTextWithTagClose(d, o, !0);
          }
          _consumeRawTextWithTagClose(u, o, d) {
            let h = this._consumeRawText(d, () =>
              !this._attemptCharCode(r.$LT) ||
              !this._attemptCharCode(r.$SLASH) ||
              (this._attemptCharCodeUntilFn(m),
              !this._attemptStrCaseInsensitive(
                u ? "".concat(u, ":").concat(o) : o
              ))
                ? !1
                : (this._attemptCharCodeUntilFn(m),
                  this._attemptCharCode(r.$GT))
            );
            this._beginToken(n.TAG_CLOSE),
              this._requireCharCodeUntilFn((F) => F === r.$GT, 3),
              this._cursor.advance(),
              this._endToken([u, o]),
              this._handleFullNameStackForTagClose(u, o);
          }
          _consumeTagOpenStart(u) {
            this._beginToken(n.TAG_OPEN_START, u);
            let o = this._consumePrefixAndName();
            return this._endToken(o);
          }
          _consumeAttributeName() {
            let u = this._cursor.peek();
            if (u === r.$SQ || u === r.$DQ)
              throw this._createError(l(u), this._cursor.getSpan());
            this._beginToken(n.ATTR_NAME);
            let o = this._consumePrefixAndName();
            return this._endToken(o), o;
          }
          _consumeAttributeValue() {
            let u;
            if (
              this._cursor.peek() === r.$SQ ||
              this._cursor.peek() === r.$DQ
            ) {
              this._beginToken(n.ATTR_QUOTE);
              let o = this._cursor.peek();
              this._cursor.advance(),
                this._endToken([String.fromCodePoint(o)]),
                this._beginToken(n.ATTR_VALUE);
              let d = [];
              for (; this._cursor.peek() !== o; ) d.push(this._readChar(!0));
              (u = this._processCarriageReturns(d.join(""))),
                this._endToken([u]),
                this._beginToken(n.ATTR_QUOTE),
                this._cursor.advance(),
                this._endToken([String.fromCodePoint(o)]);
            } else {
              this._beginToken(n.ATTR_VALUE);
              let o = this._cursor.clone();
              this._requireCharCodeUntilFn(B, 1),
                (u = this._processCarriageReturns(this._cursor.getChars(o))),
                this._endToken([u]);
            }
            return u;
          }
          _consumeTagOpenEnd() {
            let u = this._attemptCharCode(r.$SLASH)
              ? n.TAG_OPEN_END_VOID
              : n.TAG_OPEN_END;
            this._beginToken(u),
              this._requireCharCode(r.$GT),
              this._endToken([]);
          }
          _consumeTagClose(u) {
            if (
              (this._beginToken(n.TAG_CLOSE, u),
              this._attemptCharCodeUntilFn(m),
              this._allowHtmComponentClosingTags &&
                this._attemptCharCode(r.$SLASH))
            )
              this._attemptCharCodeUntilFn(m),
                this._requireCharCode(r.$GT),
                this._endToken([]);
            else {
              let [o, d] = this._consumePrefixAndName();
              this._attemptCharCodeUntilFn(m),
                this._requireCharCode(r.$GT),
                this._endToken([o, d]),
                this._handleFullNameStackForTagClose(o, d);
            }
          }
          _consumeExpansionFormStart() {
            this._beginToken(n.EXPANSION_FORM_START),
              this._requireCharCode(r.$LBRACE),
              this._endToken([]),
              this._expansionCaseStack.push(n.EXPANSION_FORM_START),
              this._beginToken(n.RAW_TEXT);
            let u = this._readUntil(r.$COMMA);
            this._endToken([u]),
              this._requireCharCode(r.$COMMA),
              this._attemptCharCodeUntilFn(m),
              this._beginToken(n.RAW_TEXT);
            let o = this._readUntil(r.$COMMA);
            this._endToken([o]),
              this._requireCharCode(r.$COMMA),
              this._attemptCharCodeUntilFn(m);
          }
          _consumeExpansionCaseStart() {
            this._beginToken(n.EXPANSION_CASE_VALUE);
            let u = this._readUntil(r.$LBRACE).trim();
            this._endToken([u]),
              this._attemptCharCodeUntilFn(m),
              this._beginToken(n.EXPANSION_CASE_EXP_START),
              this._requireCharCode(r.$LBRACE),
              this._endToken([]),
              this._attemptCharCodeUntilFn(m),
              this._expansionCaseStack.push(n.EXPANSION_CASE_EXP_START);
          }
          _consumeExpansionCaseEnd() {
            this._beginToken(n.EXPANSION_CASE_EXP_END),
              this._requireCharCode(r.$RBRACE),
              this._endToken([]),
              this._attemptCharCodeUntilFn(m),
              this._expansionCaseStack.pop();
          }
          _consumeExpansionFormEnd() {
            this._beginToken(n.EXPANSION_FORM_END),
              this._requireCharCode(r.$RBRACE),
              this._endToken([]),
              this._expansionCaseStack.pop();
          }
          _consumeText() {
            let u = this._cursor.clone();
            this._beginToken(n.TEXT, u);
            let o = [];
            do
              this._interpolationConfig &&
              this._attemptStr(this._interpolationConfig.start)
                ? (o.push(this._interpolationConfig.start),
                  (this._inInterpolation = !0))
                : this._interpolationConfig &&
                  this._inInterpolation &&
                  this._attemptStr(this._interpolationConfig.end)
                ? (o.push(this._interpolationConfig.end),
                  (this._inInterpolation = !1))
                : o.push(this._readChar(!0));
            while (!this._isTextEnd());
            this._endToken([this._processCarriageReturns(o.join(""))]);
          }
          _isTextEnd() {
            return !!(
              this._cursor.peek() === r.$LT ||
              this._cursor.peek() === r.$EOF ||
              (this._tokenizeIcu &&
                !this._inInterpolation &&
                (this.isExpansionFormStart() ||
                  (this._cursor.peek() === r.$RBRACE &&
                    this._isInExpansionCase())))
            );
          }
          _readUntil(u) {
            let o = this._cursor.clone();
            return this._attemptUntilChar(u), this._cursor.getChars(o);
          }
          _isInExpansionCase() {
            return (
              this._expansionCaseStack.length > 0 &&
              this._expansionCaseStack[this._expansionCaseStack.length - 1] ===
                n.EXPANSION_CASE_EXP_START
            );
          }
          _isInExpansionForm() {
            return (
              this._expansionCaseStack.length > 0 &&
              this._expansionCaseStack[this._expansionCaseStack.length - 1] ===
                n.EXPANSION_FORM_START
            );
          }
          isExpansionFormStart() {
            if (this._cursor.peek() !== r.$LBRACE) return !1;
            if (this._interpolationConfig) {
              let u = this._cursor.clone(),
                o = this._attemptStr(this._interpolationConfig.start);
              return (this._cursor = u), !o;
            }
            return !0;
          }
          _handleFullNameStackForTagOpen(u, o) {
            let d = c.mergeNsAndName(u, o);
            (this._fullNameStack.length === 0 ||
              this._fullNameStack[this._fullNameStack.length - 1] === d) &&
              this._fullNameStack.push(d);
          }
          _handleFullNameStackForTagClose(u, o) {
            let d = c.mergeNsAndName(u, o);
            this._fullNameStack.length !== 0 &&
              this._fullNameStack[this._fullNameStack.length - 1] === d &&
              this._fullNameStack.pop();
          }
        };
      function m(u) {
        return !r.isWhitespace(u) || u === r.$EOF;
      }
      function B(u) {
        return (
          r.isWhitespace(u) ||
          u === r.$GT ||
          u === r.$SLASH ||
          u === r.$SQ ||
          u === r.$DQ ||
          u === r.$EQ
        );
      }
      function w(u) {
        return (
          (u < r.$a || r.$z < u) &&
          (u < r.$A || r.$Z < u) &&
          (u < r.$0 || u > r.$9)
        );
      }
      function S(u) {
        return u == r.$SEMICOLON || u == r.$EOF || !r.isAsciiHexDigit(u);
      }
      function N(u) {
        return u == r.$SEMICOLON || u == r.$EOF || !r.isAsciiLetter(u);
      }
      function b(u) {
        return u === r.$EQ || r.isAsciiLetter(u) || r.isDigit(u);
      }
      function j(u, o) {
        return R(u) == R(o);
      }
      function R(u) {
        return u >= r.$a && u <= r.$z ? u - r.$a + r.$A : u;
      }
      function U(u) {
        let o = [],
          d;
        for (let h = 0; h < u.length; h++) {
          let F = u[h];
          d && d.type == n.TEXT && F.type == n.TEXT
            ? ((d.parts[0] += F.parts[0]),
              (d.sourceSpan.end = F.sourceSpan.end))
            : ((d = F), o.push(d));
        }
        return o;
      }
      var k = class {
          constructor(u, o) {
            if (u instanceof k)
              (this.file = u.file),
                (this.input = u.input),
                (this.end = u.end),
                (this.state = Object.assign({}, u.state));
            else {
              if (!o)
                throw new Error(
                  "Programming error: the range argument must be provided with a file argument."
                );
              (this.file = u),
                (this.input = u.content),
                (this.end = o.endPos),
                (this.state = {
                  peek: -1,
                  offset: o.startPos,
                  line: o.startLine,
                  column: o.startCol,
                });
            }
          }
          clone() {
            return new k(this);
          }
          peek() {
            return this.state.peek;
          }
          charsLeft() {
            return this.end - this.state.offset;
          }
          diff(u) {
            return this.state.offset - u.state.offset;
          }
          advance() {
            this.advanceState(this.state);
          }
          init() {
            this.updatePeek(this.state);
          }
          getSpan(u, o) {
            if (((u = u || this), o))
              for (
                u = u.clone();
                this.diff(u) > 0 && o.indexOf(u.peek()) !== -1;

              )
                u.advance();
            return new t.ParseSourceSpan(
              new t.ParseLocation(
                u.file,
                u.state.offset,
                u.state.line,
                u.state.column
              ),
              new t.ParseLocation(
                this.file,
                this.state.offset,
                this.state.line,
                this.state.column
              )
            );
          }
          getChars(u) {
            return this.input.substring(u.state.offset, this.state.offset);
          }
          charAt(u) {
            return this.input.charCodeAt(u);
          }
          advanceState(u) {
            if (u.offset >= this.end)
              throw (
                ((this.state = u), new L('Unexpected character "EOF"', this))
              );
            let o = this.charAt(u.offset);
            o === r.$LF
              ? (u.line++, (u.column = 0))
              : r.isNewLine(o) || u.column++,
              u.offset++,
              this.updatePeek(u);
          }
          updatePeek(u) {
            u.peek = u.offset >= this.end ? r.$EOF : this.charAt(u.offset);
          }
        },
        $ = class extends k {
          constructor(u, o) {
            u instanceof $
              ? (super(u),
                (this.internalState = Object.assign({}, u.internalState)))
              : (super(u, o), (this.internalState = this.state));
          }
          advance() {
            (this.state = this.internalState),
              super.advance(),
              this.processEscapeSequence();
          }
          init() {
            super.init(), this.processEscapeSequence();
          }
          clone() {
            return new $(this);
          }
          getChars(u) {
            let o = u.clone(),
              d = "";
            for (; o.internalState.offset < this.internalState.offset; )
              (d += String.fromCodePoint(o.peek())), o.advance();
            return d;
          }
          processEscapeSequence() {
            let u = () => this.internalState.peek;
            if (u() === r.$BACKSLASH)
              if (
                ((this.internalState = Object.assign({}, this.state)),
                this.advanceState(this.internalState),
                u() === r.$n)
              )
                this.state.peek = r.$LF;
              else if (u() === r.$r) this.state.peek = r.$CR;
              else if (u() === r.$v) this.state.peek = r.$VTAB;
              else if (u() === r.$t) this.state.peek = r.$TAB;
              else if (u() === r.$b) this.state.peek = r.$BSPACE;
              else if (u() === r.$f) this.state.peek = r.$FF;
              else if (u() === r.$u)
                if (
                  (this.advanceState(this.internalState), u() === r.$LBRACE)
                ) {
                  this.advanceState(this.internalState);
                  let o = this.clone(),
                    d = 0;
                  for (; u() !== r.$RBRACE; )
                    this.advanceState(this.internalState), d++;
                  this.state.peek = this.decodeHexDigits(o, d);
                } else {
                  let o = this.clone();
                  this.advanceState(this.internalState),
                    this.advanceState(this.internalState),
                    this.advanceState(this.internalState),
                    (this.state.peek = this.decodeHexDigits(o, 4));
                }
              else if (u() === r.$x) {
                this.advanceState(this.internalState);
                let o = this.clone();
                this.advanceState(this.internalState),
                  (this.state.peek = this.decodeHexDigits(o, 2));
              } else if (r.isOctalDigit(u())) {
                let o = "",
                  d = 0,
                  h = this.clone();
                for (; r.isOctalDigit(u()) && d < 3; )
                  (h = this.clone()),
                    (o += String.fromCodePoint(u())),
                    this.advanceState(this.internalState),
                    d++;
                (this.state.peek = parseInt(o, 8)),
                  (this.internalState = h.internalState);
              } else
                r.isNewLine(this.internalState.peek)
                  ? (this.advanceState(this.internalState),
                    (this.state = this.internalState))
                  : (this.state.peek = this.internalState.peek);
          }
          decodeHexDigits(u, o) {
            let d = this.input.substr(u.internalState.offset, o),
              h = parseInt(d, 16);
            if (isNaN(h))
              throw (
                ((u.state = u.internalState),
                new L("Invalid hexadecimal escape sequence", u))
              );
            return h;
          }
        },
        L = class {
          constructor(u, o) {
            (this.msg = u), (this.cursor = o);
          }
        };
      e.CursorError = L;
    },
  }),
  es = I({
    "node_modules/angular-html-parser/lib/compiler/src/ml_parser/parser.js"(e) {
      "use strict";
      O(), Object.defineProperty(e, "__esModule", { value: !0 });
      var r = we(),
        t = Cs(),
        s = kD(),
        c = Ze(),
        n = class extends r.ParseError {
          constructor(i, l, p) {
            super(l, p), (this.elementName = i);
          }
          static create(i, l, p) {
            return new n(i, l, p);
          }
        };
      e.TreeError = n;
      var a = class {
        constructor(i, l) {
          (this.rootNodes = i), (this.errors = l);
        }
      };
      e.ParseTreeResult = a;
      var f = class {
        constructor(i) {
          this.getTagDefinition = i;
        }
        parse(i, l, p) {
          let g =
              arguments.length > 3 && arguments[3] !== void 0
                ? arguments[3]
                : !1,
            C = arguments.length > 4 ? arguments[4] : void 0,
            m = (k) =>
              function ($) {
                for (
                  var L = arguments.length,
                    u = new Array(L > 1 ? L - 1 : 0),
                    o = 1;
                  o < L;
                  o++
                )
                  u[o - 1] = arguments[o];
                return k($.toLowerCase(), ...u);
              },
            B = g ? this.getTagDefinition : m(this.getTagDefinition),
            w = (k) => B(k).contentType,
            S = g ? C : m(C),
            N = C
              ? (k, $, L, u) => {
                  let o = S(k, $, L, u);
                  return o !== void 0 ? o : w(k);
                }
              : w,
            b = s.tokenize(i, l, N, p),
            j = (p && p.canSelfClose) || !1,
            R = (p && p.allowHtmComponentClosingTags) || !1,
            U = new D(b.tokens, B, j, R, g).build();
          return new a(U.rootNodes, b.errors.concat(U.errors));
        }
      };
      e.Parser = f;
      var D = class {
        constructor(i, l, p, g, C) {
          (this.tokens = i),
            (this.getTagDefinition = l),
            (this.canSelfClose = p),
            (this.allowHtmComponentClosingTags = g),
            (this.isTagNameCaseSensitive = C),
            (this._index = -1),
            (this._rootNodes = []),
            (this._errors = []),
            (this._elementStack = []),
            this._advance();
        }
        build() {
          for (; this._peek.type !== s.TokenType.EOF; )
            this._peek.type === s.TokenType.TAG_OPEN_START
              ? this._consumeStartTag(this._advance())
              : this._peek.type === s.TokenType.TAG_CLOSE
              ? (this._closeVoidElement(), this._consumeEndTag(this._advance()))
              : this._peek.type === s.TokenType.CDATA_START
              ? (this._closeVoidElement(), this._consumeCdata(this._advance()))
              : this._peek.type === s.TokenType.COMMENT_START
              ? (this._closeVoidElement(),
                this._consumeComment(this._advance()))
              : this._peek.type === s.TokenType.TEXT ||
                this._peek.type === s.TokenType.RAW_TEXT ||
                this._peek.type === s.TokenType.ESCAPABLE_RAW_TEXT
              ? (this._closeVoidElement(), this._consumeText(this._advance()))
              : this._peek.type === s.TokenType.EXPANSION_FORM_START
              ? this._consumeExpansion(this._advance())
              : this._peek.type === s.TokenType.DOC_TYPE_START
              ? this._consumeDocType(this._advance())
              : this._advance();
          return new a(this._rootNodes, this._errors);
        }
        _advance() {
          let i = this._peek;
          return (
            this._index < this.tokens.length - 1 && this._index++,
            (this._peek = this.tokens[this._index]),
            i
          );
        }
        _advanceIf(i) {
          return this._peek.type === i ? this._advance() : null;
        }
        _consumeCdata(i) {
          let l = this._advance(),
            p = this._getText(l),
            g = this._advanceIf(s.TokenType.CDATA_END);
          this._addToParent(
            new t.CDATA(
              p,
              new r.ParseSourceSpan(i.sourceSpan.start, (g || l).sourceSpan.end)
            )
          );
        }
        _consumeComment(i) {
          let l = this._advanceIf(s.TokenType.RAW_TEXT),
            p = this._advanceIf(s.TokenType.COMMENT_END),
            g = l != null ? l.parts[0].trim() : null,
            C = new r.ParseSourceSpan(
              i.sourceSpan.start,
              (p || l || i).sourceSpan.end
            );
          this._addToParent(new t.Comment(g, C));
        }
        _consumeDocType(i) {
          let l = this._advanceIf(s.TokenType.RAW_TEXT),
            p = this._advanceIf(s.TokenType.DOC_TYPE_END),
            g = l != null ? l.parts[0].trim() : null,
            C = new r.ParseSourceSpan(
              i.sourceSpan.start,
              (p || l || i).sourceSpan.end
            );
          this._addToParent(new t.DocType(g, C));
        }
        _consumeExpansion(i) {
          let l = this._advance(),
            p = this._advance(),
            g = [];
          for (; this._peek.type === s.TokenType.EXPANSION_CASE_VALUE; ) {
            let m = this._parseExpansionCase();
            if (!m) return;
            g.push(m);
          }
          if (this._peek.type !== s.TokenType.EXPANSION_FORM_END) {
            this._errors.push(
              n.create(
                null,
                this._peek.sourceSpan,
                "Invalid ICU message. Missing '}'."
              )
            );
            return;
          }
          let C = new r.ParseSourceSpan(
            i.sourceSpan.start,
            this._peek.sourceSpan.end
          );
          this._addToParent(
            new t.Expansion(l.parts[0], p.parts[0], g, C, l.sourceSpan)
          ),
            this._advance();
        }
        _parseExpansionCase() {
          let i = this._advance();
          if (this._peek.type !== s.TokenType.EXPANSION_CASE_EXP_START)
            return (
              this._errors.push(
                n.create(
                  null,
                  this._peek.sourceSpan,
                  "Invalid ICU message. Missing '{'."
                )
              ),
              null
            );
          let l = this._advance(),
            p = this._collectExpansionExpTokens(l);
          if (!p) return null;
          let g = this._advance();
          p.push(new s.Token(s.TokenType.EOF, [], g.sourceSpan));
          let C = new D(
            p,
            this.getTagDefinition,
            this.canSelfClose,
            this.allowHtmComponentClosingTags,
            this.isTagNameCaseSensitive
          ).build();
          if (C.errors.length > 0)
            return (this._errors = this._errors.concat(C.errors)), null;
          let m = new r.ParseSourceSpan(i.sourceSpan.start, g.sourceSpan.end),
            B = new r.ParseSourceSpan(l.sourceSpan.start, g.sourceSpan.end);
          return new t.ExpansionCase(
            i.parts[0],
            C.rootNodes,
            m,
            i.sourceSpan,
            B
          );
        }
        _collectExpansionExpTokens(i) {
          let l = [],
            p = [s.TokenType.EXPANSION_CASE_EXP_START];
          for (;;) {
            if (
              ((this._peek.type === s.TokenType.EXPANSION_FORM_START ||
                this._peek.type === s.TokenType.EXPANSION_CASE_EXP_START) &&
                p.push(this._peek.type),
              this._peek.type === s.TokenType.EXPANSION_CASE_EXP_END)
            )
              if (v(p, s.TokenType.EXPANSION_CASE_EXP_START)) {
                if ((p.pop(), p.length == 0)) return l;
              } else
                return (
                  this._errors.push(
                    n.create(
                      null,
                      i.sourceSpan,
                      "Invalid ICU message. Missing '}'."
                    )
                  ),
                  null
                );
            if (this._peek.type === s.TokenType.EXPANSION_FORM_END)
              if (v(p, s.TokenType.EXPANSION_FORM_START)) p.pop();
              else
                return (
                  this._errors.push(
                    n.create(
                      null,
                      i.sourceSpan,
                      "Invalid ICU message. Missing '}'."
                    )
                  ),
                  null
                );
            if (this._peek.type === s.TokenType.EOF)
              return (
                this._errors.push(
                  n.create(
                    null,
                    i.sourceSpan,
                    "Invalid ICU message. Missing '}'."
                  )
                ),
                null
              );
            l.push(this._advance());
          }
        }
        _getText(i) {
          let l = i.parts[0];
          if (
            l.length > 0 &&
            l[0] ==
              `
`
          ) {
            let p = this._getParentElement();
            p != null &&
              p.children.length == 0 &&
              this.getTagDefinition(p.name).ignoreFirstLf &&
              (l = l.substring(1));
          }
          return l;
        }
        _consumeText(i) {
          let l = this._getText(i);
          l.length > 0 && this._addToParent(new t.Text(l, i.sourceSpan));
        }
        _closeVoidElement() {
          let i = this._getParentElement();
          i && this.getTagDefinition(i.name).isVoid && this._elementStack.pop();
        }
        _consumeStartTag(i) {
          let l = i.parts[0],
            p = i.parts[1],
            g = [];
          for (; this._peek.type === s.TokenType.ATTR_NAME; )
            g.push(this._consumeAttr(this._advance()));
          let C = this._getElementFullName(l, p, this._getParentElement()),
            m = !1;
          if (this._peek.type === s.TokenType.TAG_OPEN_END_VOID) {
            this._advance(), (m = !0);
            let b = this.getTagDefinition(C);
            this.canSelfClose ||
              b.canSelfClose ||
              c.getNsPrefix(C) !== null ||
              b.isVoid ||
              this._errors.push(
                n.create(
                  C,
                  i.sourceSpan,
                  'Only void and foreign elements can be self closed "'.concat(
                    i.parts[1],
                    '"'
                  )
                )
              );
          } else
            this._peek.type === s.TokenType.TAG_OPEN_END &&
              (this._advance(), (m = !1));
          let B = this._peek.sourceSpan.start,
            w = new r.ParseSourceSpan(i.sourceSpan.start, B),
            S = new r.ParseSourceSpan(
              i.sourceSpan.start.moveBy(1),
              i.sourceSpan.end
            ),
            N = new t.Element(C, g, [], w, w, void 0, S);
          this._pushElement(N),
            m && (this._popElement(C), (N.endSourceSpan = w));
        }
        _pushElement(i) {
          let l = this._getParentElement();
          l &&
            this.getTagDefinition(l.name).isClosedByChild(i.name) &&
            this._elementStack.pop(),
            this._addToParent(i),
            this._elementStack.push(i);
        }
        _consumeEndTag(i) {
          let l =
            this.allowHtmComponentClosingTags && i.parts.length === 0
              ? null
              : this._getElementFullName(
                  i.parts[0],
                  i.parts[1],
                  this._getParentElement()
                );
          if (
            (this._getParentElement() &&
              (this._getParentElement().endSourceSpan = i.sourceSpan),
            l && this.getTagDefinition(l).isVoid)
          )
            this._errors.push(
              n.create(
                l,
                i.sourceSpan,
                'Void elements do not have end tags "'.concat(i.parts[1], '"')
              )
            );
          else if (!this._popElement(l)) {
            let p = 'Unexpected closing tag "'.concat(
              l,
              '". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags'
            );
            this._errors.push(n.create(l, i.sourceSpan, p));
          }
        }
        _popElement(i) {
          for (let l = this._elementStack.length - 1; l >= 0; l--) {
            let p = this._elementStack[l];
            if (
              !i ||
              (c.getNsPrefix(p.name)
                ? p.name == i
                : p.name.toLowerCase() == i.toLowerCase())
            )
              return (
                this._elementStack.splice(l, this._elementStack.length - l), !0
              );
            if (!this.getTagDefinition(p.name).closedByParent) return !1;
          }
          return !1;
        }
        _consumeAttr(i) {
          let l = c.mergeNsAndName(i.parts[0], i.parts[1]),
            p = i.sourceSpan.end,
            g = "",
            C,
            m;
          if (
            (this._peek.type === s.TokenType.ATTR_QUOTE &&
              (m = this._advance().sourceSpan.start),
            this._peek.type === s.TokenType.ATTR_VALUE)
          ) {
            let B = this._advance();
            (g = B.parts[0]), (p = B.sourceSpan.end), (C = B.sourceSpan);
          }
          return (
            this._peek.type === s.TokenType.ATTR_QUOTE &&
              ((p = this._advance().sourceSpan.end),
              (C = new r.ParseSourceSpan(m, p))),
            new t.Attribute(
              l,
              g,
              new r.ParseSourceSpan(i.sourceSpan.start, p),
              C,
              i.sourceSpan
            )
          );
        }
        _getParentElement() {
          return this._elementStack.length > 0
            ? this._elementStack[this._elementStack.length - 1]
            : null;
        }
        _getParentElementSkippingContainers() {
          let i = null;
          for (let l = this._elementStack.length - 1; l >= 0; l--) {
            if (!c.isNgContainer(this._elementStack[l].name))
              return { parent: this._elementStack[l], container: i };
            i = this._elementStack[l];
          }
          return { parent: null, container: i };
        }
        _addToParent(i) {
          let l = this._getParentElement();
          l != null ? l.children.push(i) : this._rootNodes.push(i);
        }
        _insertBeforeContainer(i, l, p) {
          if (!l) this._addToParent(p), this._elementStack.push(p);
          else {
            if (i) {
              let g = i.children.indexOf(l);
              i.children[g] = p;
            } else this._rootNodes.push(p);
            p.children.push(l),
              this._elementStack.splice(this._elementStack.indexOf(l), 0, p);
          }
        }
        _getElementFullName(i, l, p) {
          return (
            i === "" &&
              ((i = this.getTagDefinition(l).implicitNamespacePrefix || ""),
              i === "" && p != null && (i = c.getNsPrefix(p.name))),
            c.mergeNsAndName(i, l)
          );
        }
      };
      function v(i, l) {
        return i.length > 0 && i[i.length - 1] === l;
      }
    },
  }),
  LD = I({
    "node_modules/angular-html-parser/lib/compiler/src/ml_parser/html_parser.js"(
      e
    ) {
      "use strict";
      O(), Object.defineProperty(e, "__esModule", { value: !0 });
      var r = Es(),
        t = es(),
        s = es();
      (e.ParseTreeResult = s.ParseTreeResult), (e.TreeError = s.TreeError);
      var c = class extends t.Parser {
        constructor() {
          super(r.getHtmlTagDefinition);
        }
        parse(n, a, f) {
          let D =
              arguments.length > 3 && arguments[3] !== void 0
                ? arguments[3]
                : !1,
            v = arguments.length > 4 ? arguments[4] : void 0;
          return super.parse(n, a, f, D, v);
        }
      };
      e.HtmlParser = c;
    },
  }),
  rs = I({
    "node_modules/angular-html-parser/lib/angular-html-parser/src/index.js"(e) {
      "use strict";
      O(), Object.defineProperty(e, "__esModule", { value: !0 });
      var r = LD(),
        t = Ze();
      e.TagContentType = t.TagContentType;
      var s = null,
        c = () => (s || (s = new r.HtmlParser()), s);
      function n(a) {
        let f =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
          {
            canSelfClose: D = !1,
            allowHtmComponentClosingTags: v = !1,
            isTagNameCaseSensitive: i = !1,
            getTagContentType: l,
          } = f;
        return c().parse(
          a,
          "angular-html-parser",
          {
            tokenizeExpansionForms: !1,
            interpolationConfig: void 0,
            canSelfClose: D,
            allowHtmComponentClosingTags: v,
          },
          i,
          l
        );
      }
      e.parse = n;
    },
  }),
  MD = I({
    "src/language-html/parser-html.js"(e, r) {
      O();
      var { ParseSourceSpan: t, ParseLocation: s, ParseSourceFile: c } = we(),
        n = Qc(),
        a = as(),
        f = Kc(),
        { inferParserByLanguage: D } = _D(),
        v = yD(),
        i = bD(),
        l = wD(),
        { hasPragma: p } = ND(),
        { Node: g } = OD(),
        { parseIeConditionalComment: C } = qD(),
        { locStart: m, locEnd: B } = ID();
      function w(b, j, R) {
        let {
            recognizeSelfClosing: U,
            normalizeTagName: k,
            normalizeAttributeName: $,
            allowHtmComponentClosingTags: L,
            isTagNameCaseSensitive: u,
            getTagContentType: o,
          } = j,
          d = rs(),
          { RecursiveVisitor: h, visitAll: F } = Cs(),
          { ParseSourceSpan: q } = we(),
          { getHtmlTagDefinition: P } = Es(),
          { rootNodes: G, errors: H } = d.parse(b, {
            canSelfClose: U,
            allowHtmComponentClosingTags: L,
            isTagNameCaseSensitive: u,
            getTagContentType: o,
          });
        if (R.parser === "vue")
          if (
            G.some(
              (A) =>
                (A.type === "docType" && A.value === "html") ||
                (A.type === "element" && A.name.toLowerCase() === "html")
            )
          ) {
            (U = !0), (k = !0), ($ = !0), (L = !0), (u = !1);
            let A = d.parse(b, {
              canSelfClose: U,
              allowHtmComponentClosingTags: L,
              isTagNameCaseSensitive: u,
            });
            (G = A.rootNodes), (H = A.errors);
          } else {
            let A = (y) => {
              if (!y || y.type !== "element" || y.name !== "template")
                return !1;
              let x = y.attrs.find((V) => V.name === "lang"),
                M = x && x.value;
              return !M || D(M, R) === "html";
            };
            if (G.some(A)) {
              let y,
                x = () =>
                  d.parse(b, {
                    canSelfClose: U,
                    allowHtmComponentClosingTags: L,
                    isTagNameCaseSensitive: u,
                  }),
                M = () => y || (y = x()),
                V = (W) =>
                  M().rootNodes.find((Q) => {
                    let { startSourceSpan: se } = Q;
                    return (
                      se && se.start.offset === W.startSourceSpan.start.offset
                    );
                  });
              for (let W = 0; W < G.length; W++) {
                let Q = G[W],
                  { endSourceSpan: se, startSourceSpan: Ee } = Q;
                if (se === null) (H = M().errors), (G[W] = V(Q) || Q);
                else if (A(Q)) {
                  let Ae = M(),
                    Ne = Ee.end.offset,
                    ee = se.start.offset;
                  for (let re of Ae.errors) {
                    let { offset: ie } = re.span.start;
                    if (Ne < ie && ie < ee) {
                      H = [re];
                      break;
                    }
                  }
                  G[W] = V(Q) || Q;
                }
              }
            }
          }
        if (H.length > 0) {
          let {
            msg: E,
            span: { start: A, end: y },
          } = H[0];
          throw f(E, {
            start: { line: A.line + 1, column: A.col + 1 },
            end: { line: y.line + 1, column: y.col + 1 },
          });
        }
        let K = (E) => {
            let A = E.name.startsWith(":")
                ? E.name.slice(1).split(":")[0]
                : null,
              y = E.nameSpan.toString(),
              x = A !== null && y.startsWith("".concat(A, ":")),
              M = x ? y.slice(A.length + 1) : y;
            (E.name = M), (E.namespace = A), (E.hasExplicitNamespace = x);
          },
          z = (E) => {
            switch (E.type) {
              case "element":
                K(E);
                for (let A of E.attrs)
                  K(A),
                    A.valueSpan
                      ? ((A.value = A.valueSpan.toString()),
                        /["']/.test(A.value[0]) &&
                          (A.value = A.value.slice(1, -1)))
                      : (A.value = null);
                break;
              case "comment":
                E.value = E.sourceSpan.toString().slice(4, -3);
                break;
              case "text":
                E.value = E.sourceSpan.toString();
                break;
            }
          },
          Y = (E, A) => {
            let y = E.toLowerCase();
            return A(y) ? y : E;
          },
          J = (E) => {
            if (
              E.type === "element" &&
              (k &&
                (!E.namespace ||
                  E.namespace === E.tagDefinition.implicitNamespacePrefix ||
                  l(E)) &&
                (E.name = Y(E.name, (A) => A in v)),
              $)
            ) {
              let A = i[E.name] || Object.create(null);
              for (let y of E.attrs)
                y.namespace ||
                  (y.name = Y(
                    y.name,
                    (x) => E.name in i && (x in i["*"] || x in A)
                  ));
            }
          },
          Z = (E) => {
            E.sourceSpan &&
              E.endSourceSpan &&
              (E.sourceSpan = new q(E.sourceSpan.start, E.endSourceSpan.end));
          },
          _ = (E) => {
            if (E.type === "element") {
              let A = P(u ? E.name : E.name.toLowerCase());
              !E.namespace || E.namespace === A.implicitNamespacePrefix || l(E)
                ? (E.tagDefinition = A)
                : (E.tagDefinition = P(""));
            }
          };
        return (
          F(
            new (class extends h {
              visit(E) {
                z(E), _(E), J(E), Z(E);
              }
            })(),
            G
          ),
          G
        );
      }
      function S(b, j, R) {
        let U =
            arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0,
          { frontMatter: k, content: $ } = U
            ? n(b)
            : { frontMatter: null, content: b },
          L = new c(b, j.filepath),
          u = new s(L, 0, 0, 0),
          o = u.moveBy(b.length),
          d = { type: "root", sourceSpan: new t(u, o), children: w($, R, j) };
        if (k) {
          let q = new s(L, 0, 0, 0),
            P = q.moveBy(k.raw.length);
          (k.sourceSpan = new t(q, P)), d.children.unshift(k);
        }
        let h = new g(d),
          F = (q, P) => {
            let { offset: G } = P,
              H = b.slice(0, G).replace(/[^\n\r]/g, " "),
              z = S(H + q, j, R, !1);
            z.sourceSpan = new t(P, a(z.children).sourceSpan.end);
            let Y = z.children[0];
            return (
              Y.length === G
                ? z.children.shift()
                : ((Y.sourceSpan = new t(
                    Y.sourceSpan.start.moveBy(G),
                    Y.sourceSpan.end
                  )),
                  (Y.value = Y.value.slice(G))),
              z
            );
          };
        return (
          h.walk((q) => {
            if (q.type === "comment") {
              let P = C(q, F);
              P && q.parent.replaceChild(q, P);
            }
          }),
          h
        );
      }
      function N() {
        let {
          name: b,
          recognizeSelfClosing: j = !1,
          normalizeTagName: R = !1,
          normalizeAttributeName: U = !1,
          allowHtmComponentClosingTags: k = !1,
          isTagNameCaseSensitive: $ = !1,
          getTagContentType: L,
        } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return {
          parse: (u, o, d) =>
            S(u, Object.assign({ parser: b }, d), {
              recognizeSelfClosing: j,
              normalizeTagName: R,
              normalizeAttributeName: U,
              allowHtmComponentClosingTags: k,
              isTagNameCaseSensitive: $,
              getTagContentType: L,
            }),
          hasPragma: p,
          astFormat: "html",
          locStart: m,
          locEnd: B,
        };
      }
      r.exports = {
        parsers: {
          html: N({
            name: "html",
            recognizeSelfClosing: !0,
            normalizeTagName: !0,
            normalizeAttributeName: !0,
            allowHtmComponentClosingTags: !0,
          }),
          angular: N({ name: "angular" }),
          vue: N({
            name: "vue",
            recognizeSelfClosing: !0,
            isTagNameCaseSensitive: !0,
            getTagContentType: (b, j, R, U) => {
              if (
                b.toLowerCase() !== "html" &&
                !R &&
                (b !== "template" ||
                  U.some((k) => {
                    let { name: $, value: L } = k;
                    return (
                      $ === "lang" && L !== "html" && L !== "" && L !== void 0
                    );
                  }))
              )
                return rs().TagContentType.RAW_TEXT;
            },
          }),
          lwc: N({ name: "lwc" }),
        },
      };
    },
  }),
  d2 = MD();
export { d2 as default };
