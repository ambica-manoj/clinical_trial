from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS
from collections import Counter
import sqlite3
import bcrypt
import os

app = Flask(__name__)
CORS(app)

# ---------------- DATABASE SETUP ----------------

def create_db():
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
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


# ---------------- LOGIN 

@app.route("/login", methods=["POST"])
def login():

    data = request.json
    username = data["username"]
    password = data["password"]

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        "SELECT password FROM users WHERE username=?",
        (username,)
    )

    user = cursor.fetchone()
    conn.close()

    if user and bcrypt.checkpw(password.encode('utf-8'), user[0]):
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"message": "Invalid username or password"}), 401


# ---------------- PREDICTION ----------------

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json
    name = data["NAME"]

    SEX = 1 if data["SEX"] == "M" else 0

    columns = [
        "HAEMATOCRIT",
        "HAEMOGLOBINS",
        "ERYTHROCYTE",
        "LEUCOCYTE",
        "THROMBOCYTE",
        "MCH",
        "MCHC",
        "MCV",
        "AGE",
        "SEX"
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

    # -------- MODEL PREDICTIONS --------

    rf_pred = rf_model.predict(df)[0]
    dt_pred = dt_model.predict(df)[0]
    lr_pred = lr_model.predict(df)[0]
    nb_pred = nb_model.predict(df)[0]
    svm_pred = svm_model.predict(df)[0]

    preds = {
        "RandomForest": rf_pred,
        "DecisionTree": dt_pred,
        "LogisticRegression": lr_pred,
        "NaiveBayes": nb_pred,
        "SVM": svm_pred
    }

    # -------- HUMAN READABLE OUTPUT --------

    readable_preds = {}
    for model, pred in preds.items():
        readable_preds[model] = "Eligible" if pred == 0 else "Not Eligible"

    # -------- WEIGHTED ENSEMBLE VOTING --------

    weights = {
        "RandomForest": 0.9475,
        "DecisionTree": 0.72875,
        "LogisticRegression": 0.714375,
        "NaiveBayes": 0.674375,
        "SVM": 0.715
    }

    weighted_score = 0
    total_weight = sum(weights.values())

    for model, pred in preds.items():
        weighted_score += pred * weights[model]

    final_pred = 1 if weighted_score > (total_weight / 2) else 0
    final_result = "Eligible" if final_pred == 0 else "Not Eligible"

    # -------- SAVE ELIGIBLE PATIENT --------

    if final_result == "Eligible":

        patient_record = {
            "NAME": name,
            "HAEMATOCRIT": data["HAEMATOCRIT"],
            "HAEMOGLOBINS": data["HAEMOGLOBINS"],
            "ERYTHROCYTE": data["ERYTHROCYTE"],
            "LEUCOCYTE": data["LEUCOCYTE"],
            "THROMBOCYTE": data["THROMBOCYTE"],
            "MCH": data["MCH"],
            "MCHC": data["MCHC"],
            "MCV": data["MCV"],
            "AGE": data["AGE"],
            "SEX": data["SEX"]
        }

        df_patient = pd.DataFrame([patient_record])

        file_path = "eligible_patients.csv"

        if not os.path.exists(file_path):
            df_patient.to_csv(file_path, index=False)
        else:
            df_patient.to_csv(file_path, mode="a", header=False, index=False)

    return jsonify({
        "model_predictions": readable_preds,
        "final_prediction": final_result
    })

# ---------------- RUN SERVER ----------------

if __name__ == "__main__":
    app.run(debug=True)