from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request
from functools import wraps
from server.models.user import User
from server.extensions import db

ALLOWED_ROLES = {"Customer", "Storekeeper", "Manager", "SuperAdmin"}

def role_required(*roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            user_id = get_jwt_identity()
            try:
                user = User.query.get(int(user_id))
            except:
                return {"msg": "Invalid token"}, 401

            if not user:
                return {"msg": "User not found or token invalid"}, 401
            if user.role not in roles:
                return {"msg": f"Access denied for role '{user.role}'"}, 403

            return fn(*args, **kwargs)
        return decorator
    return wrapper
role_parser = reqparse.RequestParser()
role_parser.add_argument("role", required=True)

class AssignRole(Resource):
    @jwt_required()
    @role_required("SuperAdmin")
    def put(self, user_id):
        data = role_parser.parse_args()
        new_role = data["role"]

        if new_role not in ALLOWED_ROLES:
            return {"msg": "Invalid role"}, 400

        user = User.query.get(user_id)
        if not user:
            return {"msg": "User not found"}, 404

        user.role = new_role
        db.session.commit()
        return {"msg": f"{user.username}'s role changed to {new_role}"}, 200

class ListUsers(Resource):
    @jwt_required()
    @role_required("SuperAdmin")
    def get(self):
        role = request.args.get("role")
        query = User.query
        if role:
            query = query.filter_by(role=role)
        users = query.all()
        return {"users": [user.to_dict() for user in users]}, 200

class GetSingleUser(Resource):
    @jwt_required()
    @role_required("SuperAdmin")
    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {"msg": "User not found"}, 404
        return {"user": user.to_dict()}, 200
class DeleteUser(Resource):
    @jwt_required()
    @role_required("SuperAdmin")
    def delete(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {"msg": "User not found"}, 404

        db.session.delete(user)
        db.session.commit()
        return {"msg": "User deleted"}, 200