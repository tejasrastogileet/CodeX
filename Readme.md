🍲 Aahar Mitra

Smart Nutrition Platform for Anganwadi & Mid-Day Meal Programs

Aahar Mitra is a social-impact web platform designed to improve nutrition planning for children in Anganwadi centres and Mid-Day Meal schemes.
Instead of building a generic food app, our goal is to help workers make data-driven meal decisions using RecipeDB and FlavorDB APIs.

---

🌍 Problem Statement

Many government nutrition programs provide food, but:

- Child BMI and health tracking is mostly manual
- Meals are often repetitive and nutritionally imbalanced
- Workers lack tools to analyze nutrition scientifically
- Healthy food is sometimes rejected due to poor taste planning

This leads to gaps in early malnutrition detection and smart meal planning.

---

💡 Our Solution

Aahar Mitra provides a simple dashboard where workers can:

- Calculate BMI of children using local logic
- Analyze nutrition using RecipeDB endpoints
- Discover healthier meal options
- Use FlavorDB to suggest better ingredient pairings

The platform focuses on practical usability, minimal tech complexity, and maximum API utilization.

---

✨ Key Features

- 🧮 BMI Calculator (Logic Based)
- 🍲 Smart Meal Recommendation using RecipeDB filters
- 🥗 Nutrition Dashboard (Calories, Protein, Energy insights)
- 🧪 Ingredient Pairing Suggestions via FlavorDB
- 📋 Cooking Instructions Viewer for workers
- ⚡ Lazy API Calling + Backend Caching to reduce API usage

---

🔌 API Usage

This project deeply integrates hackathon-provided APIs.

RecipeDB Endpoints Used

- Get Recipe by Calories
- Get Recipe by Protein Range
- Get Recipe Nutrition Info
- Get Recipe Instructions
- Get Recipe by Ingredients
- Get Recipe by Category / Cuisine

FlavorDB Usage

- Ingredient pairing suggestions
- Taste compatibility insights

---

🧠 How It Works

1. Worker enters child height & weight
2. System calculates BMI locally (no API usage)
3. Based on BMI category:
   - Underweight → High protein recipes
   - Overweight → Low calorie meals
4. Nutrition data fetched from RecipeDB
5. FlavorDB improves taste planning

---

🛠️ Tech Stack

- Backend: Flask (Python)
- Frontend: HTML, CSS, Basic JavaScript
- Logic: Rule-based nutrition engine
- APIs: RecipeDB & FlavorDB
- Database: Lightweight local storage / JSON

---

⚙️ Installation & Setup

git clone https://github.com/your-repo/aahar-mitra.git
cd aahar-mitra
pip install -r requirements.txt
python app.py

Open in browser:

http://127.0.0.1:5000

---

“Better meals, smarter decisions, healthier futures.”