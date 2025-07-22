from flask import request
from flask_restful import Resource
from flask_restful import Resource,reqparse
from flask_jwt_extended import jwt_required,get_jwt_identity
from server.extensions import db
from server.routes.user_admin_routes import role_required
from server.models.payment import Payment
from server.models.user import User

# Parser for creating a payment
payment_parser = reqparse.RequestParser()
payment_parser.add_argument("amount", type=float, required=True, help="Amount is required")
payment_parser.add_argument("payment_method", type=str, required=True)
payment_parser.add_argument("reference", type=str, required=True)

class PaymentListResource(Resource):
    @jwt_required()
    @role_required("SuperAdmin", "Manager","Customer")
    def get(self):
        payments = Payment.query.all()
        return [p.to_dict() for p in payments], 200

    @jwt_required()
    @role_required("Customer")
    def post(self):
        args = payment_parser.parse_args()
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        payment = Payment(
            amount=args["amount"],
            payment_method=args["payment_method"],
            reference=args["reference"],
            user=user
        )
        db.session.add(payment)
        db.session.commit()

        return {
            "message": "Payment submitted",
            "payment": payment.to_dict()
        }, 201

class MyPaymentsResource(Resource):
    @jwt_required()
    @role_required("Customer")
    def get(self):
        user_id = get_jwt_identity()
        payments = Payment.query.filter_by(user_id=user_id).all()
        return [p.to_dict() for p in payments], 200

