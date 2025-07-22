from functools import wraps
from flask_jwt_extended import get_jwt_identity
from server.models.user import User

def role_required(*roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            user_id = get_jwt_identity()
            user = User.query.get(user_id)

            if not user:
                return {"msg": "User not found or token invalid"}, 401

            if user.role not in roles:
                return {"msg": f"Access denied for role '{user.role}'"}, 403

            return fn(*args, **kwargs)
        return decorator
    return wrapper
