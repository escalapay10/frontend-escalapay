# Fases Frontend — Escala Pay
### Organizadas según los sprints de la Planilla_PP_PF_Full_Stack

**Equipo frontend:** Caro (Carolina Betlienski – Front 1) · Seba (Sebastian Machello – Front 2)
**Stack:** React + Vite + TypeScript + Tailwind CSS + axios → despliegue en Vercel
**Fuente de la división:** Planilla_PP_PF_Full_Stack_FINAL_v2 → *Plan de sprints (tentativo)*

---

## Mapa de sprints (según la planilla)

| Sprint | Alcance en la planilla | Frontend |
|--------|------------------------|----------|
| **Sprint 1 – Fundamentos** | Repo con estructura organizada, BD en Railway, auth en backend, **frontend con registro, inicio de sesión y dashboard básico**, despliegues iniciales (Railway/Vercel), pruebas iniciales, servicio de tasas + job programado | **Fases 0, 1 y 2** |
| **Sprint 2 – Funcionalidad core** | API REST completa, operaciones con tasas en vivo, ledger, SES, chatbot con Gemini/OpenRouter, **finalización del frontend (gráfico de historial de tasas y pantalla de movimientos)**, integración con backend, README y despliegue completo, pruebas funcionales e integración | **Fases 3, 4, 5, 6 y 7** |

---

## Resumen de fases

| Fase | Sprint | Módulo | Responsable |
|------|--------|--------|-------------|
| 0 | Sprint 1 | Base compartida (setup, router, design system, axios, tipos) | **Caro** (Seba colabora) |
| 1 | Sprint 1 | Registro, login y rutas protegidas | **Caro** |
| 2 | Sprint 1 | Dashboard de balances (básico) | **Seba** |
| 3 | Sprint 2 | Cotizador + operaciones (BUY/SELL/EXCHANGE, vigencia 60s) | **Seba** |
| 4 | Sprint 2 | Historial de transacciones (filtros + paginación) | **Caro** |
| 5 | Sprint 2 | Gráfico de historial de tasas | **Caro** |
| 6 | Sprint 2 | Chatbot con IA | **Seba** |
| 7 | Sprint 2 | Integración, pruebas y despliegue completo | **Ambos** |

**Secuencia paralela:**
- **Caro:** Fase 0 → 1 → 4 → 5 → 7
- **Seba:** *(colabora en 0)* → 2 → 3 → 6 → 7

---

# SPRINT 1 — Fundamentos

## Fase 0 — Base compartida (Caro, con Seba en los primeros días)

Objetivo: que al terminar esta fase Seba pueda arrancar el dashboard sin bloquearse.

- [ ] Setup del proyecto: Vite + React + TypeScript + Tailwind (tokens en `styles/index.css`), ESLint, Prettier, Vitest + React Testing Library
- [ ] Archivos raíz: `.env.example` (`VITE_API_URL=`), `.gitignore` (`.env`, `.env.local`, `.env.*.local`), `vercel.json` con rewrites SPA, `README.md` base
- [ ] `app/App.tsx`, `app/providers.tsx` y **`app/router.tsx` con TODAS las rutas del proyecto** (las del Sprint 2 con placeholder, para no tocar el router después)
- [ ] `lib/env.ts` (lee `VITE_API_URL`) y `lib/apiClient.ts` (**axios**: baseURL, header de token, 401 → redirect a `/login`)
- [ ] `lib/format.ts` → `formatMoney()` con `Intl.NumberFormat` (USD/EUR/ARS) y `formatDate()`
- [ ] `types/index.ts` con los tipos compartidos según el contrato con el backend: `User`, `Balance`, `Quote`, `Transaction`, `Rate`, `Paginated<T>`
- [ ] `components/ui` mínimo: Button, Input, Select, Spinner, ErrorMessage
- [ ] `components/layout`: `AppLayout` (**con slot ya previsto para el widget del chatbot**) y `Navbar`
- [ ] Convención de imports relativos (sin alias `@/`, máximo 3 niveles; si excede, avisar al otro)
- [ ] Deploy inicial en Vercel + un test de ejemplo pasando

**Entregable:** app desplegada, router completo con placeholders, apiClient y UI base disponibles para ambos.

## Fase 1 — Registro, Login y rutas protegidas (Caro)

- [ ] `AuthContext.tsx` + `useAuth.ts`: guardar/recuperar token y usuario, logout, expiración
- [ ] `ProtectedRoute.tsx`: sin sesión → `/login`; sesión activa en `/login` → `/dashboard`
- [ ] `LoginPage.tsx` + `LoginForm.tsx` y `RegisterPage.tsx` + `RegisterForm.tsx`: validación en cliente, errores del backend (credenciales inválidas, usuario existente, servicio caído)
- [ ] `auth.api.ts` + `auth.mock.ts` (mock activable mientras el backend de auth no esté listo)
- [ ] Tests: validación de formularios y comportamiento del guard de rutas

*Nota de la planilla:* el saldo inicial ficticio (DEPOSIT) lo registra el backend al registrarse; el frontend solo lo mostrará después en el dashboard.

**Entregable:** flujo de auth completo y desplegado → **criterio de cierre del Sprint 1 junto con la Fase 2**.

## Fase 2 — Dashboard de balances básico (Seba)

- [ ] `DashboardPage.tsx` con saldos por moneda (USD, EUR, ARS) mediante `wallet.hooks.ts`
- [ ] `BalanceCard.tsx` (formateado con `lib/format.ts`, sin duplicar funciones) y `RateCard.tsx` con la tasa actual
- [ ] `wallet.api.ts` + `wallet.mock.ts`; estados loading, error (con reintento) y vacío
- [ ] Accesos rápidos hacia `/operations` (por ahora con placeholder)
- [ ] Conexión al `AppLayout`/`Navbar` de Caro y responsive (usable desde celular)
- [ ] Tests: render de balances con datos mockeados

**Criterio de cierre del Sprint 1 (frontend):** registro → login → dashboard básico funcionando en Vercel, con pruebas iniciales. *(El backend debe tener auth + conexiones + job de tasas corriendo en Railway, según la planilla.)*

---

# SPRINT 2 — Funcionalidad core

*No se toca la base: todo se apoya en el scaffolding del Sprint 1. Dependencias nuevas únicamente: `recharts`, `components/ui/Modal` y `components/ui/Badge`.*

## Fase 3 — Cotizador + operaciones: compra, venta e intercambio (Seba) ⚠️ módulo más complejo

- [ ] `OperationsPage.tsx` + `OperationSelector.tsx` con las reglas de cada tipo:
  - **BUY (compra):** elige moneda a recibir + monto a recibir; paga con saldo de otra moneda
  - **SELL (venta):** elige moneda a vender + monto a entregar; recibe otra moneda
  - **EXCHANGE (intercambio):** conversión entre balances de la misma cuenta
- [ ] `QuoteCard.tsx`: tasa + proveedor (Frankfurter / ExchangeRate-API) + fecha/hora de consulta
- [ ] **Vigencia de 60 segundos:** countdown visible; al confirmar fuera de plazo → re-consulta al proveedor y, si la tasa cambió, pedir confirmación nuevamente
- [ ] Validación de saldo insuficiente → confirmación deshabilitada
- [ ] Estados de error textuales de la planilla:
  - *"No pudimos obtener una tasa de cambio confiable en este momento. Tu saldo no fue modificado, intentá nuevamente en unos minutos."*
  - Tasa desactualizada → marcar con fecha/hora y **deshabilitar el botón de confirmar**
- [ ] `OperationConfirm.tsx`: resumen (montos, tasa aplicada, proveedor, fecha) → éxito → refresco de balances + aviso de email de confirmación (SES lo envía el backend)
- [ ] **`components/ui/Modal.tsx`** (sube a compartido, lo reutiliza el chatbot)
- [ ] `operations.api.ts` + `operations.mock.ts` + hooks
- [ ] Tests con fake timers: countdown de 60s, saldo insuficiente, mensajes de error

**Entregable:** flujo completo de operaciones de punta a punta.

## Fase 4 — Historial de transacciones (Caro) — *la "pantalla de movimientos" del Sprint 2*

- [ ] `TransactionsPage.tsx` con `GET /transactions`
- [ ] `TransactionFilters.tsx`: tipo (BUY/SELL/EXCHANGE/DEPOSIT), moneda y rango de fechas
- [ ] `Pagination.tsx` (formato acordado con el backend: page/limit o cursor)
- [ ] `TransactionTable.tsx`: montos, tasa aplicada, proveedor, fecha/hora, estado (PENDING/COMPLETED/FAILED)
- [ ] **`components/ui/Badge.tsx`** (sube a compartido para los estados)
- [ ] Estados vacíos ("sin movimientos con estos filtros") y de error
- [ ] `transactions.api.ts` + `transactions.mock.ts` + hooks
- [ ] Tests: filtros y paginación

**Entregable:** historial completo con filtros funcionando.

## Fase 5 — Gráfico de historial de tasas (Caro) — *el "gráfico de evolución" del Sprint 2*

- [ ] `RatesPage.tsx` con `GET /rates/history`
- [ ] `PairSelector.tsx`: par de monedas (USD/ARS, EUR/USD, …) + rango de fechas
- [ ] `RatesChart.tsx` con **Recharts** (dependencia nueva): evolución de la tasa, tooltip con fecha/tasa/proveedor
- [ ] Estados: carga, sin datos (requiere el **job horario de tasas activo en Railway**, ya previsto en el Sprint 1) y tasa desactualizada
- [ ] `rates.api.ts` + `rates.mock.ts` + hooks
- [ ] Tests: render con datos mockeados y caso sin datos

**Entregable:** pantalla de historial de tasas con gráfico funcionando.

## Fase 6 — Chatbot con IA (Seba)

- [ ] `ChatbotWidget.tsx`: burbuja flotante montada en el **slot que dejó Caro en `AppLayout`** (no se modifica el layout)
- [ ] `MessageList.tsx`: historial, input con validación de longitud, loading claro (el backend puede tardar hasta ~15s en el peor caso)
- [ ] **Límite de mensajes por minuto:** informar al usuario y ofrecer las **FAQ de respaldo** (10–15 preguntas del backend)
- [ ] `FaqList.tsx`: cuando fallan Gemini y OpenRouter → FAQ, nunca pantalla rota
- [ ] Dejar explícito en la UI que es un asistente **solo lectura** (no ejecuta transacciones ni modifica saldos)
- [ ] Escapar/validar respuestas (sin renderizar HTML crudo)
- [ ] `chatbot.api.ts` + `chatbot.mock.ts` + hooks
- [ ] Tests: envío de mensajes, límite por minuto y fallback a FAQ

**Entregable:** chatbot funcional con todos sus estados cubiertos.

## Fase 7 — Integración, pruebas y despliegue completo (ambos)

- [ ] **Apagar mocks → backend real** (flag `USE_MOCKS` en `lib/env.ts`): probar cada feature contra los endpoints de Railway
- [ ] QA cruzado: cada uno prueba a fondo la feature del otro
- [ ] Flujo end-to-end: registro → login → dashboard → operación → historial de movimientos → gráfico de tasas → chatbot
- [ ] Pruebas funcionales de integración según la planilla: operaciones, actualización de balances, registro de transacciones, fallbacks de tasas y chatbot, consulta en vivo sin caché, historial y comportamiento ante caídas de servicios externos
- [ ] Manejo global de errores de red (backend caído / timeout)
- [ ] Revisión responsive, accesibilidad básica y seguridad (solo `VITE_*`, sin secretos, chatbot solo lectura)
- [ ] README final con instalación, variables de entorno, scripts y despliegue
- [ ] Deploy completo en **Vercel** (frontend) + verificación del despliegue en **Railway** (backend)

**Criterio de cierre del Sprint 2:** aplicación completa desplegada, probada contra backend real y lista para la demo.

---

# Consideraciones generales

### 1. Coordinación con el backend (Matias y Yeiny)
- **Contrato de API antes de codificar cada feature**: endpoints, payloads, códigos de error y paginación en un documento compartido. Los tipos de `src/types/index.ts` son la única fuente de verdad.
- Endpoints por orden de necesidad: **auth (S1) → balances (S1) → operaciones + cotizador (S2) → GET /transactions (S2) → GET /rates/history + job horario (S2) → chat (S2)**.
- Mientras no existan: **mocks activables por flag** (`USE_MOCKS`) en la capa api de cada feature → al llegar el backend real, solo se cambia la implementación.
- La planilla ya ubica el servicio de tasas + job programado en el **Sprint 1** → el gráfico de la Fase 5 tendrá datos desde el primer día del Sprint 2.

### 2. Evitar conflictos de Git
- Cada feature en su carpeta: `auth`, `transactions`, `rates` (Caro) · `wallet`, `operations`, `chatbot` (Seba).
- Compartidos (`components/ui`, `components/layout`, `lib/`, `types/`, `app/`): **los crea y modifica Caro (Fase 0)**; si Seba necesita uno nuevo o un cambio, lo propone antes de usarlo.
- Branch por feature (`feat/auth`, `feat/operations`, …) + PR con revisión cruzada. Nunca trabajar directo sobre `main`.

### 3. Consistencia visual y de datos
- Design tokens definidos en la Fase 0: no reestilizar componentes ajenos sin acordarlo.
- Monedas y fechas siempre con `lib/format.ts` (`Intl.NumberFormat` / `Intl.DateTimeFormat`).
- Mensajes de error textuales según la planilla (tasa no confiable, tasa desactualizada, límite del chatbot) para que la demo sea coherente con la propuesta.

### 4. Seguridad
- Ninguna API key en el frontend: solo variables `VITE_*` en Vercel (Frankfurter, ExchangeRate-API, Gemini y OpenRouter viven en el backend).
- El chatbot es de solo lectura: la UI no ofrece acciones que ejecuten transacciones.
- Validar y escapar las respuestas del chatbot antes de renderizarlas.

### 5. Casos críticos a no subestimar
- **Vigencia de 60s del cotizador** (Fase 3): el caso más delicado de la app → testear con fake timers.
- **Tasa desactualizada**: debe deshabilitar la confirmación, no solo mostrar un aviso.
- **Tiempo de respuesta del chatbot** (hasta 15s): loading claro para que el usuario no crea que se colgó.
- **Router completo desde el Sprint 1**: evita renombrar rutas y romper links a mitad del Sprint 2.

### 6. Proceso
- **Integrador único** (sugiero Caro): hace los merges finales y resuelve conflictos.
- **QA cruzado** en la Fase 7: cada uno prueba la feature del otro.
- **Antigravity** para desarrollo asistido es bienvenido, pero revisar siempre el código generado (tipos, manejo de errores y seguridad).
- Sincronización corta (5–10 min) al arrancar y cerrar cada fase para actualizar el contrato si algo cambió.
