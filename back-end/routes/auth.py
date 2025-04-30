from flask import Blueprint, request, jsonify
from models.user import db, User
import jwt, datetime
from flask_cors import cross_origin

auth = Blueprint("auth", __name__)
SECRET_KEY = "supersecret"

@auth.route("/auth/register", methods=["POST"])
@cross_origin()
def register():
    data = request.json
    if not data.get("email") or not data.get("password"):
        return jsonify({"message": "Missing fields"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "Email already in use"}), 400

    user = User(
        name=data.get("name", ""),
        email=data["email"],
        provider="email"
    )
    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered", "user": user.to_dict()}), 201

@auth.route("/auth/login", methods=["POST"])
@cross_origin()
def login():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()

    if not user or not user.check_password(data["password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    token = jwt.encode({
        "user_id": user.id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, SECRET_KEY, algorithm="HS256")

    return jsonify({"token": token, "user": user.to_dict()})

@auth.route("/auth/social-login", methods=["POST"])
@cross_origin()
def social_login():
    data = request.json
    email = data.get("email")
    provider = data.get("provider")

    if not email or not provider:
        return jsonify({"message": "Missing email or provider"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(
            email=email,
            name=data.get("name", ""),
            provider=provider
        )
        db.session.add(user)
        db.session.commit()

    token = jwt.encode({
        "user_id": user.id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, SECRET_KEY, algorithm="HS256")

    return jsonify({"token": token, "user": user.to_dict()})
