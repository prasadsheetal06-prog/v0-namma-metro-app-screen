# 🚇 Namma Metro — Smart Journey Planner

> **Product Analyst Intern Assignment** · Prasad Sheetal · April 2026

A proposed feature for the **Namma Metro** app that transforms it from a ticket-booking tool into a complete **door-to-door journey assistant** for Bengaluru commuters.

---

## 🔗 Live Links

| Resource | Link |
|---|---|
| 🟣 **Live Prototype** | [v0-namma-metro-app-screen.vercel.app](https://v0-namma-metro-app-screen.vercel.app) |
| 📊 **Research Dashboard** | [prasadsheetal06-prog.github.io/v0-namma-metro-app-screen/dashboard.html](https://prasadsheetal06-prog.github.io/v0-namma-metro-app-screen/dashboard.html) |
| 📋 **Survey Form** | [View Survey](https://docs.google.com/forms/d/e/1FAIpQLSdnsoDw4zX2Uq-BmcJj6fyHO6b5KeLQkyqI3NmTcx6WfdaWIA/viewform) |
| 💻 **GitHub Repository** | [github.com/prasadsheetal06-prog/v0-namma-metro-app-screen](https://github.com/prasadsheetal06-prog/v0-namma-metro-app-screen) |

---

## 🎯 The Problem

The Namma Metro app today has **7 features** — none of which answer a commuter's core question:

> *"How do I actually get from my door to my destination?"*

| What the app does | What is missing |
|---|---|
| Ticket booking (QR) | Walk guidance to the station |
| Fare calculator | Platform and train frequency info |
| Static metro map | Interchange navigation |
| Timetable | Exit recommendation |
| Card top-up | Last mile options |

**Research findings (n=47):**
- **66%** open Google Maps alongside the Namma Metro app
- **86%** have faced wrong platform or wrong exit at least once
- **4.2 min** lost per trip on average = **17 hours wasted per year** per commuter
- **66%** would stop using Google Maps if Smart Journey Planner existed

---

## ✨ The Feature — Smart Journey Planner

A new **8th tile** on the home screen. One tap. Six guided steps.

```
Step 1  Walk to Station
        Gate number, distance, estimated walk time
        Open in Google Maps CTA for walking directions

Step 2  Board Metro (Purple Line)
        Platform number, train frequency, next arrival time
        Metro fare shown inline

Step 3  Interchange at Silk Board
        Step-by-step interchange navigation
        Visual cues, no compass directions
        Show me the way Google Maps CTA

Step 4  Board Metro (Yellow Line)
        Platform, stop count, next train timing

Step 5  Exit Recommendation
        Optimal exit gate, walking distance to destination
        Time saved vs other exits

Step 6  Last Mile Options (Namma Yatri)
        Bike, Auto, Walk with live fare estimates via ONDC
```

---

## 🔑 Key Product Decisions

| Decision | Problem | Solution |
|---|---|---|
| Namma Yatri over Ola/Rapido | No public fare API available for Ola or Rapido | Namma Yatri uses ONDC open protocol — fare data publicly accessible |
| Train frequency over coach crowd data | Coach occupancy needs hardware not installed in metro trains | Published timetable data used for next train time and interval |
| Total cost over cab comparison | Showing Ola fare encourages cab usage — counterproductive | Metro ₹57 + Last mile ₹35 = ₹92 total trip cost shown |
| Google Maps CTA for walking | Walking precision needs GPS infrastructure metro cannot replicate | One-tap deeplink opens Google Maps with gate pre-filled |

---

## 📊 Research and Validation

### Statistical Tests (Kaggle Notebook)

| Test | Result | p-value | Conclusion |
|---|---|---|---|
| One-sample t-test | Significant | 4.21e-11 | Time loss is real, not noise |
| Chi-square test | Trend visible | 0.6763 | Pain affects all user types equally |
| One-way ANOVA | Significant | 0.0002 | Feature demand scores differ significantly |

### Feature Demand Ranking

```
Train Frequency Guide   4.14 / 5
Last Mile (Namma Yatri) 4.06 / 5
Exit Recommendation     4.04 / 5
Interchange Navigation  3.48 / 5
Walk Guidance           3.32 / 5
```

---

## 📏 Success Metrics (SMART)

| KPI | Target | Timeframe |
|---|---|---|
| Google Maps Fallback Rate | Drop from 66% to below 25% | 60 days post-launch |
| Journey Completion Rate | 70%+ book ticket after planning | 4 weeks post-launch |
| Navigation Error Rate | Drop from 86% to below 30% | 90 days post-launch |
| 7-Day Return Rate | 60%+ (vs 10% current WAU) | 90 days post-launch |
| Session Length on Planner | 45 to 90 seconds | Baseline from week 1 |
| Feature Adoption Rate | 40% of MAU try it | 30 days post-launch |

---

## 🛠️ Built With

| Tool | Purpose |
|---|---|
| v0.dev | Prototype UI in React and Next.js |
| Vercel | Live deployment and auto-deploy from GitHub |
| Chart.js | Research dashboard interactive charts |
| Kaggle | Python stats analysis — t-test, chi-square, ANOVA |
| GitHub Pages | Research dashboard hosting |
| openpyxl | Feature gap analysis spreadsheet |

---

## 📁 Project Structure

```
v0-namma-metro-app-screen/
├── app/
│   └── page.tsx          ← Main prototype (all 6 journey steps)
├── components/           ← UI components
├── dashboard.html        ← Interactive research dashboard
└── README.md
```

---

## 🚀 Run Locally

```bash
git clone https://github.com/prasadsheetal06-prog/v0-namma-metro-app-screen
cd v0-namma-metro-app-screen
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📐 Assignment Checklist

- [x] Product identified with personal relationship
- [x] Problem grounded in real user behaviour and data
- [x] Feature solution with clear 6-step user flow
- [x] 6 SMART success metrics defined
- [x] Interactive prototype built and deployed on Vercel
- [x] Research dashboard with 4 charts and 3 statistical tests
- [x] Survey form created for primary research validation
- [x] Feature gap analysis spreadsheet
- [x] Single-page methodology document
- [x] Loom video walkthrough

---

<div align="center">

**Prasad Sheetal** · Product Analyst Intern Assignment · April 2026

[Live Prototype](https://v0-namma-metro-app-screen.vercel.app) · [Research Dashboard](https://prasadsheetal06-prog.github.io/v0-namma-metro-app-screen/dashboard.html) · [Survey](https://docs.google.com/forms/d/e/1FAIpQLSdnsoDw4zX2Uq-BmcJj6fyHO6b5KeLQkyqI3NmTcx6WfdaWIA/viewform) · [GitHub](https://github.com/prasadsheetal06-prog/v0-namma-metro-app-screen)

</div>
