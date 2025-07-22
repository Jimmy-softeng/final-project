from flask import request
from flask_restful import Resource,reqparse
from server.models.user import User
from server.extensions import db
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
from functools import wraps
import datetime

# Register Parser

register_parser = reqparse.RequestParser()
register_parser.add_argument("username", required=True)
register_parser.add_argument("email", required=True)
register_parser.add_argument("password", required=True)

# Login Parser

login_parser = reqparse.RequestParser()
login_parser.add_argument("email", required=True)
login_parser.add_argument("password", required=True)

# Role Update Parser

role_parser = reqparse.RequestParser()
role_parser.add_argument("role", required=True, help="New role is required")

# REGISTER Endpoint
class Register(Resource):
    def post(self):
        data = register_parser.parse_args()

        if User.query.filter_by(email=data["email"]).first():
            return {"msg": "Email already exists"}, 400

        user = User(
            username=data["username"],
            email=data["email"],
            role="Customer"  # 👈 Always default to Customer
        )
        user.set_password(data["password"])
        db.session.add(user)
        db.session.commit()

        return {"msg": "User registered", "user": user.to_dict()}, 201

# LOGIN Endpoint

class Login(Resource):
    def post(self):
        data = login_parser.parse_args()
        user = User.query.filter_by(email=data["email"]).first()

        if not user or not user.check_password(data["password"]):
            return {"msg": "Invalid email or password"}, 401

        token = create_access_token(identity=str(user.id))
        return {"access_token": token}, 200

