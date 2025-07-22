from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from server.extensions import db
from server.routes.user_admin_routes import role_required
from server.models.product_writeoff import ProductWriteoff
from server.models.product import Product
from datetime import datetime

def parse_date(date_str):
    for fmt in ("%Y-%m-%d", "%Y-%m-%dT%H:%M:%S"):
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            continue
    raise ValueError("Invalid date format")

class ProductWriteOffListResource(Resource):
    @jwt_required()
    @role_required("Storekeeper")
    def get(self):
        writeoffs = ProductWriteoff.query.all()
        return [w.to_dict() for w in writeoffs], 200

    @jwt_required()
    @role_required("Storekeeper")
    def post(self):
        data = request.get_json()
        required_fields = ["quantity", "reason", "expiry_date", "buying_price", "product_id"]
        if not all(field in data for field in required_fields):
            return {"error": "Missing required fields"}, 400

        product = Product.query.get(data["product_id"])
        if not product:
            return {"error": "Product not found"}, 404

        try:
            expiry_date = parse_date(data["expiry_date"])
        except ValueError:
            return {"error": "Invalid expiry_date format. Use YYYY-MM-DD or ISO 8601."}, 400

        writeoff = ProductWriteoff(
            quantity=data["quantity"],
            reason=data["reason"],
            expiry_date=expiry_date,
            buying_price=data["buying_price"],
            product_id=data["product_id"]
        )

        db.session.add(writeoff)
        db.session.commit()

        return {
            "message": "Product write-off created",
            "writeoff": writeoff.to_dict()
        }, 201

class ProductWriteOffResource(Resource):
    @jwt_required()
    @role_required("Storekeeper")
    def get(self, writeoff_id):
        writeoff = ProductWriteoff.query.get_or_404(writeoff_id)
        return writeoff.to_dict(), 200

    @jwt_required()
    @role_required("Storekeeper")
    def patch(self, writeoff_id):
        writeoff = ProductWriteoff.query.get_or_404(writeoff_id)
        data = request.get_json()

        if "expiry_date" in data:
            try:
                writeoff.expiry_date = parse_date(data["expiry_date"])
            except ValueError:
                return {"error": "Invalid expiry_date format. Use YYYY-MM-DD or ISO 8601."}, 400

        for field in ["quantity", "reason", "buying_price"]:
            if field in data:
                setattr(writeoff, field, data[field])

        db.session.commit()
        return {
            "message": "Write-off updated",
            "writeoff": writeoff.to_dict()
        }, 200

    @jwt_required()
    @role_required("Storekeeper")
    def delete(self, writeoff_id):
        writeoff = ProductWriteoff.query.get_or_404(writeoff_id)
        db.session.delete(writeoff)
        db.session.commit()
        return {"message": "Write-off deleted"}, 204
