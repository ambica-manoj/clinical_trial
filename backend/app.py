from flask import Flask, request, jsonify # type: ignore
import pandas as pd # type: ignore
import joblib # type: ignore
from flask_cors import CORS # type: ignore
import sqlite3 
import bcrypt # type: ignore
import os

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://hybrid-models.netlify.app",
            "http://localhost:3000",
            "http://127.0.0.1:3000"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# ---------------- DATABASE SETUP ----------------

def create_db():
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    # USERS TABLE
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
    """)

    # PATIENTS TABLE (ONLY ELIGIBLE STORED)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS patients(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        haematrocrit REAL,
        haemoglobins REAL,
        erythrocyte REAL,
        leucocyte REAL,
        thrombocyte REAL,
        mch REAL,
        mchc REAL,
        mcv REAL,
        age INTEGER,
        sex TEXT,
        eligible_count INTEGER DEFAULT 1
    )
    """)

    conn.commit()
    conn.close()

create_db()

# ---------------- LOAD MODELS ----------------

rf_model = joblib.load("model2/RandomForestClassifier.pkl")
dt_model = joblib.load("model2/DecisionTreeClassifier.pkl")
lr_model = joblib.load("model2/LogisticRegression.pkl")
nb_model = joblib.load("model2/NaiveBayes.pkl")
svm_model = joblib.load("model2/SVM.pkl")

# ---------------- REGISTER ----------------

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data["username"]
    password = data["password"]

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        conn = sqlite3.connect("users.db")
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO users(username,password) VALUES (?,?)",
            (username, hashed_password)
        )

        conn.commit()
        conn.close()

        return jsonify({"message": "Registration successful"})
    except:
        return jsonify({"message": "User already exists"}), 400

# ---------------- LOGIN ----------------

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data["username"]
    password = data["password"]

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("SELECT password FROM users WHERE username=?", (username,))
    user = cursor.fetchone()
    conn.close()

    if user and bcrypt.checkpw(password.encode('utf-8'), user[0]):
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"message": "Invalid username or password"}), 401

# ---------------- PREDICT ----------------

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json
    name = data["NAME"]

    SEX = 1 if data["SEX"] == "M" else 0

    columns = [
        "HAEMATOCRIT","HAEMOGLOBINS","ERYTHROCYTE",
        "LEUCOCYTE","THROMBOCYTE","MCH","MCHC",
        "MCV","AGE","SEX"
    ]

    df = pd.DataFrame([[ 
        float(data["HAEMATOCRIT"]),
        float(data["HAEMOGLOBINS"]),
        float(data["ERYTHROCYTE"]),
        float(data["LEUCOCYTE"]),
        float(data["THROMBOCYTE"]),
        float(data["MCH"]),
        float(data["MCHC"]),
        float(data["MCV"]),
        float(data["AGE"]),
        SEX
    ]], columns=columns)

    print(os.listdir())
    print(os.listdir("model2"))

    # MODEL PREDICTIONS
    preds = {
        "RandomForest": rf_model.predict(df)[0],
        "DecisionTree": dt_model.predict(df)[0],
        "LogisticRegression": lr_model.predict(df)[0],
        "NaiveBayes": nb_model.predict(df)[0],
        "SVM": svm_model.predict(df)[0]
    }

    readable_preds = {
        model: "Eligible" if pred == 0 else "Not Eligible"
        for model, pred in preds.items()
    }

    # WEIGHTED VOTING
    weights = {
        "RandomForest": 0.9475,
        "DecisionTree": 0.72875,
        "LogisticRegression": 0.714375,
        "NaiveBayes": 0.674375,
        "SVM": 0.715
    }

    weighted_score = sum(preds[m]*weights[m] for m in preds)
    total_weight = sum(weights.values())

    final_pred = 1 if weighted_score > (total_weight/2) else 0
    final_result = "Eligible" if final_pred == 0 else "Not Eligible"

    # ---------------- SAVE ONLY IF ELIGIBLE ----------------

    if final_result == "Eligible":

        conn = sqlite3.connect("users.db")
        cursor = conn.cursor()

        cursor.execute("SELECT eligible_count FROM patients WHERE name=?", (name,))
        existing = cursor.fetchone()

        if existing:
            count = existing[0] + 1

            cursor.execute("""
            UPDATE patients SET
                haematrocrit=?, haemoglobins=?, erythrocyte=?,
                leucocyte=?, thrombocyte=?, mch=?, mchc=?,
                mcv=?, age=?, sex=?, eligible_count=?
            WHERE name=?
            """, (
                data["HAEMATOCRIT"], data["HAEMOGLOBINS"],
                data["ERYTHROCYTE"], data["LEUCOCYTE"],
                data["THROMBOCYTE"], data["MCH"],
                data["MCHC"], data["MCV"],
                data["AGE"], data["SEX"],
                count, name
            ))

        else:
            cursor.execute("""
            INSERT INTO patients(
                name, haematrocrit, haemoglobins, erythrocyte,
                leucocyte, thrombocyte, mch, mchc,
                mcv, age, sex, eligible_count
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,1)
            """, (
                name,
                data["HAEMATOCRIT"], data["HAEMOGLOBINS"],
                data["ERYTHROCYTE"], data["LEUCOCYTE"],
                data["THROMBOCYTE"], data["MCH"],
                data["MCHC"], data["MCV"],
                data["AGE"], data["SEX"]
            ))
        
           

        conn.commit()
        conn.close()

    return jsonify({
        "model_predictions": readable_preds,
        "final_prediction": final_result
    })

# ---------------- GET ELIGIBLE PATIENTS ----------------

@app.route("/eligible-patients", methods=["GET"])
def get_eligible_patients():

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, name, age, sex, eligible_count
        FROM patients
        ORDER BY eligible_count DESC
    """)

    rows = cursor.fetchall()
    conn.close()

    return jsonify([
        {
            "id": r[0],
            "name": r[1],
            "age": r[2],
            "sex": r[3],
            "eligible_count": r[4]
        }
        for r in rows
    ])

# ---------------- RUN ----------------

if __name__ == "__main__":
    app.run(debug=True)