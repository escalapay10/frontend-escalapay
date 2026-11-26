# Tareas Frontend — Escala Pay
### Reparto entre Caro (Front 1) y Seba (Front 2), dividido por sprint

**Stack:** React + Vite + TypeScript + Tailwind CSS + axios
**Despliegue:** Vercel (frontend) · Railway (backend)
**Divisiones de sprint según:** Planilla_PP_PF_Full_Stack_FINAL_v2 → *Plan de sprints*
**Regla de oro:** nadie trabaja directo sobre `main` → branch por feature (`feat/auth`, `feat/wallet`, …) + PR con revisión cruzada.

---

## Asignación general

| Código | Tarea | Sprint | Responsable |
|--------|-------|--------|-------------|
| FE-1 | Base compartida (setup, router, lib, ui, layout, types) | Sprint 1 | **Caro** |
| FE-2 | Registro, login y rutas protegidas | Sprint 1 | **Caro** |
| FE-3 | Dashboard de balances (básico) | Sprint 1 | **Seba** |
| FE-4 | Cotizador + operaciones (BUY/SELL/EXCHANGE, 60s) | Sprint 2 | **Seba** |
| FE-5 | Historial de transacciones (filtros + paginación) | Sprint 2 | **Caro** |
| FE-6 | Gráfico de historial de tasas | Sprint 2 | **Caro** |
| FE-7 | Chatbot con IA | Sprint 2 | **Seba** |
| FE-8 | Integración, pruebas y despliegue completo | Sprint 2 | **Ambos** |

```
Sprint 1:  Caro: FE-1 → FE-2          Seba: colabora en FE-1 → FE-3
Sprint 2:  Seba: FE-4 → FE-7          Caro: FE-5 → FE-6          Final: FE-8 (juntos)
```

---

## 1. Estructura final del proyecto

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── app/                          ← Caro (FE-1)
│   │   ├── App.tsx
│   │   ├── router.tsx                ← TODAS las rutas desde el Sprint 1
│   │   │                                 (Sprint 2 con placeholder: /operations, /transactions, /rates)
│   │   └── providers.tsx
│   │
│   ├── features/
│   │   ├── auth/                     ← Caro (FE-2, Sprint 1)
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   └── RegisterPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── mocks/
│   │   │   │   └── auth.mock.ts
│   │   │   ├── AuthContext.tsx
│   │   │   ├── useAuth.ts
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── auth.api.ts
│   │   │
│   │   ├── wallet/                   ← Seba (FE-3, Sprint 1)
│   │   │   ├── pages/
│   │   │   │   └── DashboardPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── BalanceCard.tsx       ← tarjeta de saldo (USD, EUR, ARS)
│   │   │   │   └── RateCard.tsx          ← tasa actual
│   │   │   ├── mocks/
│   │   │   │   └── balances.mock.ts
│   │   │   ├── wallet.api.ts
│   │   │   └── wallet.hooks.ts           ← useBalances, useRate
│   │   │
│   │   ├── operations/               ← Seba (FE-4, Sprint 2)  ⚠️ módulo más complejo
│   │   │   ├── pages/
│   │   │   │   └── OperationsPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── OperationSelector.tsx     ← BUY / SELL / EXCHANGE
│   │   │   │   ├── QuoteCard.tsx             ← tasa + proveedor + fecha + countdown 60s
│   │   │   │   └── OperationConfirm.tsx
│   │   │   ├── mocks/
│   │   │   │   └── operations.mock.ts
│   │   │   ├── operations.api.ts
│   │   │   └── operations.hooks.ts
│   │   │
│   │   ├── transactions/             ← Caro (FE-5, Sprint 2)
│   │   │   ├── pages/
│   │   │   │   └── TransactionsPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── TransactionTable.tsx
│   │   │   │   ├── TransactionFilters.tsx   ← tipo, moneda, fecha
│   │   │   │   └── Pagination.tsx
│   │   │   ├── mocks/
│   │   │   │   └── transactions.mock.ts
│   │   │   ├── transactions.api.ts
│   │   │   └── transactions.hooks.ts
│   │   │
│   │   ├── rates/                    ← Caro (FE-6, Sprint 2)
│   │   │   ├── pages/
│   │   │   │   └── RatesPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── RatesChart.tsx           ← gráfico de evolución (Recharts)
│   │   │   │   └── PairSelector.tsx         ← par de monedas + rango de fechas
│   │   │   ├── mocks/
│   │   │   │   └── rates.mock.ts
│   │   │   ├── rates.api.ts
│   │   │   └── rates.hooks.ts
│   │   │
│   │   └── chatbot/                  ← Seba (FE-7, Sprint 2)
│   │       ├── components/
│   │       │   ├── ChatbotWidget.tsx        ← burbuja flotante (slot en AppLayout)
│   │       │   ├── MessageList.tsx
│   │       │   └── FaqList.tsx              ← fallback de 10–15 preguntas
│   │       ├── mocks/
│   │       │   └── chatbot.mock.ts
│   │       ├── chatbot.api.ts
│   │       └── chatbot.hooks.ts
│   │
│   ├── components/                   ← Caro (FE-1), compartido
│   │   ├── ui/
│   │   │   ├── Button.tsx            ← Sprint 1
│   │   │   ├── Input.tsx             ← Sprint 1
│   │   │   ├── Select.tsx            ← Sprint 1
│   │   │   ├── Spinner.tsx           ← Sprint 1
│   │   │   ├── ErrorMessage.tsx      ← Sprint 1
│   │   │   ├── Modal.tsx             ← Sprint 2 (FE-4, lo reutiliza el chatbot)
│   │   │   ├── Badge.tsx             ← Sprint 2 (FE-5, estados de transacción)
│   │   │   └── EmptyState.tsx        ← Sprint 2
│   │   └── layout/
│   │       ├── AppLayout.tsx         ← Sprint 1, con slot ya previsto para el chatbot
│   │       └── Navbar.tsx
│   │
│   ├── lib/                          ← Caro (FE-1)
│   │   ├── apiClient.ts              ← axios instance + interceptor de token + 401
│   │   ├── env.ts                    ← lee VITE_API_URL + flag USE_MOCKS
│   │   └── format.ts                 ← formatMoney / formatDate (compartido)
│   │
│   ├── types/
│   │   └── index.ts                  ← User, Balance, Quote, Transaction, Rate, Paginated<T>
│   │
│   ├── styles/index.css              ← Tailwind + tokens
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .env.example                      ← VITE_API_URL=
├── .gitignore                        ← .env, .env.local, .env.*.local
├── .prettierrc
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── vite.config.ts                    ← + config de Vitest
├── vercel.json                       ← rewrites SPA: /(.*) → /index.html
└── README.md
```

**Convención de imports (sin alias `@/`):**
- Misma feature → `./` y `../`
- Hacia compartidos → relativo hasta `src` (`../../components/ui/Button`, `../../lib/format`)
- Si un import supera 3 niveles, avisar al otro antes de resolverlo a tu manera

**Tests:** colocados junto al archivo (`LoginForm.test.tsx`, `QuoteCard.test.tsx`), Vitest + React Testing Library.

---

# SPRINT 1 — Fundamentos

## 🚩 SPRINT 1 · Tareas de CARO (Front 1)

### FE-1 — Base compartida (prioridad máxima: bloquea a Seba)
- [ ] Proyecto Vite + React + TypeScript + Tailwind (tokens en `styles/index.css`), ESLint + Prettier
- [ ] Archivos raíz: `.env.example`, `.gitignore` completo, `vercel.json` con rewrites SPA, `README.md` base
- [ ] `src/main.tsx`, `src/vite-env.d.ts`, `app/App.tsx`, `app/providers.tsx`
- [ ] `app/router.tsx` con **todas** las rutas:
  - Sprint 1 reales: `/login`, `/register`, `/dashboard`
  - Sprint 2 con placeholder: `/operations`, `/transactions`, `/rates`
  - Todas protegidas por `ProtectedRoute` excepto login/register
- [ ] `lib/env.ts` (`VITE_API_URL` + flag `USE_MOCKS`) y `lib/apiClient.ts` (axios: baseURL, header de token, 401 → `/login`)
- [ ] `lib/format.ts` → `formatMoney()` con `Intl.NumberFormat` (USD/EUR/ARS) + `formatDate()`
- [ ] `types/index.ts` con todos los tipos del contrato con el backend
- [ ] `components/ui` mínimo: Button, Input, Select, Spinner, ErrorMessage
- [ ] `components/layout`: AppLayout (**con slot para el chatbot ya previsto**) + Navbar
- [ ] Vitest funcionando con un test de ejemplo
- [ ] Deploy inicial en Vercel

### FE-2 — Registro, login y rutas protegidas
- [ ] `AuthContext.tsx` + `useAuth.ts` (token, usuario, logout, expiración)
- [ ] `ProtectedRoute.tsx` (sin sesión → `/login`; sesión en `/login` → `/dashboard`)
- [ ] `LoginPage.tsx` + `LoginForm.tsx` con validación y errores del backend
- [ ] `RegisterPage.tsx` + `RegisterForm.tsx` con validación y errores (usuario existente, etc.)
- [ ] `auth.api.ts` + `auth.mock.ts` (mock activable con `USE_MOCKS`)
- [ ] Estados: loading, error, éxito; persistencia de sesión al refrescar
- [ ] Tests: validación de formularios + comportamiento de `ProtectedRoute`

## 🚩 SPRINT 1 · Tareas de SEBA (Front 2)

### FE-3 — Dashboard de balances (básico, como pide la planilla para el Sprint 1)
- [ ] Estructura de `features/wallet/` (puede arrancar con mocks mientras Caro termina FE-1)
- [ ] `DashboardPage.tsx` con saldos por moneda (USD, EUR, ARS)
- [ ] `BalanceCard.tsx` usando `lib/format.ts` (no duplicar la función) y `RateCard.tsx` con la tasa actual
- [ ] Estados: loading, error (con reintento) y vacío
- [ ] Accesos rápidos a `/operations` (placeholder en este sprint)
- [ ] Conexión al `AppLayout`/`Navbar` de Caro al final del sprint
- [ ] Responsive: usable desde celular
- [ ] `wallet.api.ts` + `wallet.mock.ts` + `wallet.hooks.ts`
- [ ] Tests: render de balances con datos mockeados

**✅ Cierre del Sprint 1 (frontend):** registro → login → dashboard básico funcionando en Vercel con pruebas iniciales. *(El backend debe tener auth + conexión a BD + job de tasas en Railway, según la planilla.)*

---

# SPRINT 2 — Funcionalidad core

## 🚩 SPRINT 2 · Tareas de SEBA (Front 2)

### FE-4 — Cotizador + operaciones (BUY / SELL / EXCHANGE) ⚠️ crítico
- [ ] `OperationsPage.tsx` + `OperationSelector.tsx` con las reglas de cada operación:
  - **BUY**: elige moneda a recibir + monto a recibir; paga con otra moneda
  - **SELL**: elige moneda a vender + monto a entregar; recibe otra moneda
  - **EXCHANGE**: conversión entre balances de la misma cuenta
- [ ] `QuoteCard.tsx`: tasa + proveedor (Frankfurter/ExchangeRate-API) + fecha/hora de consulta
- [ ] **Vigencia de 60 segundos**: countdown visible; al confirmar fuera de plazo → re-consulta y, si la tasa cambió, pedir confirmación nuevamente
- [ ] Validación de saldo insuficiente → botón deshabilitado
- [ ] Mensajes de error textuales de la planilla:
  - *"No pudimos obtener una tasa de cambio confiable en este momento. Tu saldo no fue modificado, intentá nuevamente en unos minutos."*
  - Tasa desactualizada → marcar con fecha y **deshabilitar la confirmación**
- [ ] `OperationConfirm.tsx`: resumen final (montos, tasa, proveedor, fecha) → éxito → refresco de balances + aviso de email de confirmación (SES)
- [ ] **`components/ui/Modal.tsx`** → sube a compartido (lo reutiliza el chatbot); avisar a Caro antes de modificar
- [ ] `operations.api.ts` + `operations.mock.ts` + `operations.hooks.ts`
- [ ] Tests con fake timers: countdown de 60s, saldo insuficiente, mensajes de error

### FE-7 — Chatbot con IA
- [ ] `ChatbotWidget.tsx`: burbuja flotante montada en el **slot que dejó Caro en `AppLayout`** (no tocar el layout)
- [ ] `MessageList.tsx`: historial, input con validación de longitud, loading claro (el backend tarda hasta ~15s)
- [ ] **Límite de mensajes por minuto**: informar al usuario y ofrecer las FAQ
- [ ] `FaqList.tsx`: fallback con las 10–15 preguntas del backend (nunca pantalla rota)
- [ ] Explícito en la UI: asistente **solo lectura** (no ejecuta transacciones)
- [ ] Escapar/validar respuestas (sin renderizar HTML crudo)
- [ ] `chatbot.api.ts` + `chatbot.mock.ts` + `chatbot.hooks.ts`
- [ ] Tests: envío, límite por minuto y fallback a FAQ

## 🚩 SPRINT 2 · Tareas de CARO (Front 2 → Front 1)

### FE-5 — Historial de transacciones ("pantalla de movimientos" de la planilla)
- [ ] `TransactionsPage.tsx` con `GET /transactions`
- [ ] `TransactionFilters.tsx`: tipo (BUY/SELL/EXCHANGE/DEPOSIT), moneda y rango de fechas
- [ ] `Pagination.tsx` (formato acordado con el backend: page/limit o cursor)
- [ ] `TransactionTable.tsx`: montos, tasa aplicada, proveedor, fecha, estado (PENDING/COMPLETED/FAILED)
- [ ] **`components/ui/Badge.tsx`** → sube a compartido (avisar a Seba)
- [ ] Estados: loading, error, vacío ("sin movimientos con estos filtros")
- [ ] `transactions.api.ts` + `transactions.mock.ts` + `transactions.hooks.ts`
- [ ] Tests: filtros y paginación

### FE-6 — Gráfico de historial de tasas (la "evolución de tasas" de la planilla)
- [ ] `RatesPage.tsx` con `GET /rates/history`
- [ ] `PairSelector.tsx`: par de monedas (USD/ARS, EUR/USD, …) + rango de fechas
- [ ] `RatesChart.tsx` con **Recharts** (dependencia nueva: instalar al arrancar el bloque)
- [ ] Tooltip con fecha/tasa/proveedor; estados: carga, sin datos, tasa desactualizada
- [ ] `rates.api.ts` + `rates.mock.ts` + `rates.hooks.ts`
- [ ] Tests: render con datos mockeados y caso sin datos

## 🚩 SPRINT 2 · FE-8 — Integración final (ambos)

- [ ] **Apagar mocks → backend real** (flag `USE_MOCKS`): probar cada feature contra Railway
- [ ] QA cruzado: cada uno prueba a fondo la feature del otro
- [ ] Flujo end-to-end: registro → login → dashboard → operación → historial → tasas → chatbot
- [ ] Pruebas funcionales de la planilla: operaciones, balances, transacciones, fallbacks (tasas y chatbot), consulta en vivo sin caché, historial y caídas de servicios externos
- [ ] Manejo global de errores de red (backend caído / timeout)
- [ ] Revisión responsive + seguridad (solo `VITE_*`, sin secretos, chatbot solo lectura)
- [ ] README final: instalación, variables de entorno, scripts, despliegue
- [ ] Deploy completo en Vercel + verificación en Railway

**✅ Cierre del Sprint 2:** aplicación completa desplegada, probada contra backend real y lista para la demo.

---

## Orden de trabajo y dependencias con el backend

```
Sprint 1:  Caro: FE-1 → FE-2          Seba: (estructura + mocks en paralelo) → FE-3
Sprint 2:  Seba: FE-4 → FE-7          Caro: FE-5 → FE-6          Final: FE-8 (juntos)
```

**Endpoints a pedir al backend (Matias y Yeiny) en orden:**
1. Auth → 2. Balances → 3. Operaciones + cotizador → 4. `GET /transactions` → 5. `GET /rates/history` + job horario (ya en Sprint 1 según la planilla) → 6. Chat

Hasta que llegue cada endpoint: **mocks activables con `USE_MOCKS`** para que nadie se frene.

---

## Reglas de convivencia

1. **Contrato de API primero**: documentar endpoints/payloads/errores con el backend antes de cada feature. `src/types/index.ts` = única fuente de verdad.
2. **Git**: branch por feature → PR → revisión del otro. Nunca `main` directo.
3. **Compartidos** (`components/ui`, `components/layout`, `lib/`, `types/`, `app/`): los crea y modifica **Caro (FE-1)**; Si Seba necesita uno nuevo o un cambio, lo propone antes de usarlo.
4. **No duplicar utilidades**: monedas/fechas siempre con `lib/format.ts`; si falta algo, agregarlo ahí en un PR propio.
5. **Mocks por feature**: cada quien mockea el suyo; no tocar los mocks del otro.
6. **Tailwind**: usar los tokens de `styles/index.css`. Estilo repetido en 3 lugares → subirlo a `components/ui`.
7. **Mensajes de error textuales** según la planilla (cotizador, tasa desactualizada, límite del chatbot).
8. **Seguridad**: solo variables `VITE_*` en Vercel; sin claves en el frontend; chatbot solo lectura.
9. **Sincronización corta** (5–10 min) al arrancar y cerrar cada tarea.

---

## Checklist final (ambos)

- [ ] QA cruzado: cada uno prueba a fondo la feature del otro
- [ ] Flucho completo: registro → login → dashboard → operación → historial → tasas → chatbot
- [ ] Estados de red: backend caído / timeout manejados en todas las pantallas
- [ ] Responsive y accesibilidad básica (focus, labels, contraste)
- [ ] Sin secretos en el repo (revisar `.gitignore` y build)
- [ ] README: instalación, variables de entorno, scripts, despliegue
- [ ] Demo lista en Vercel
