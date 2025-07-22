from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from server.extensions import db
from server.routes.user_admin_routes import role_required
from server.models.product_transfer import ProductTransfer
from server.models.product import Product

class ProductTransferListResource(Resource):
    @jwt_required()
    @role_required("Storekeeper")
    def get(self):
        transfers = ProductTransfer.query.all()
        return [t.to_dict() for t in transfers], 200

    @jwt_required()
    @role_required("Storekeeper")
    def post(self):
        data = request.get_json()
        required_fields = ["quantity", "from_location", "to_location", "product_id"]

        if not all(field in data for field in required_fields):
            return {"error": "Missing required fields"}, 400

        product = Product.query.get(data["product_id"])
        if not product:
            return {"error": "Product not found"}, 404

        transfer = ProductTransfer(
            quantity=data["quantity"],
            from_location=data["from_location"],
            to_location=data["to_location"],
            remarks=data.get("remarks"),
            product_id=data["product_id"]
        )

        db.session.add(transfer)
        db.session.commit()

        return {
            "message": "Product transfer created",
            "transfer": transfer.to_dict()
        }, 201


class ProductTransferResource(Resource):
    @jwt_required()
    @role_required("Storekeeper")
    def get(self, transfer_id):
        transfer = ProductTransfer.query.get_or_404(transfer_id)
        return transfer.to_dict(), 200

    @jwt_required()
    @role_required("Storekeeper")
    def patch(self, transfer_id):
        transfer = ProductTransfer.query.get_or_404(transfer_id)
        data = request.get_json()

        for field in ["quantity", "from_location", "to_location", "remarks"]:
            if field in data:
                setattr(transfer, field, data[field])

        db.session.commit()
        return {
            "message": "Product transfer updated",
            "transfer": transfer.to_dict()
        }, 200

    @jwt_required()
    @role_required("Storekeeper")
    def delete(self, transfer_id):
        transfer = ProductTransfer.query.get_or_404(transfer_id)
        db.session.delete(transfer)
        db.session.commit()
        return {"message": "Transfer deleted"}, 204