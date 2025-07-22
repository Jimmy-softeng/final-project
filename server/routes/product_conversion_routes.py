from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from server.extensions import db
from server.routes.user_admin_routes import role_required
from server.models.prodconver import ProductConversion
from server.models.product import Product

class ProductConversionListResource(Resource):
    @jwt_required()
    @role_required("Storekeeper")
    def get(self):
        conversions = ProductConversion.query.all()
        return [c.to_dict() for c in conversions], 200

    @jwt_required()
    @role_required("Storekeeper")
    def post(self):
        data = request.get_json()
        required_fields = ["from_unit", "quantity", "to_unit", "result_quantity", "product_id"]
        if not all(field in data for field in required_fields):
            return {"error": "Missing required fields"}, 400

        product = Product.query.get(data["product_id"])
        if not product:
            return {"error": "Product not found"}, 404

        conversion = ProductConversion(
            from_unit=data["from_unit"],
            quantity=data["quantity"],
            to_unit=data["to_unit"],
            result_quantity=data["result_quantity"],
            product_id=data["product_id"]
        )

        db.session.add(conversion)
        db.session.commit()

        return {
            "message": "Product conversion created",
            "conversion": conversion.to_dict()
        }, 201


class ProductConversionResource(Resource):
    @jwt_required()
    @role_required("Storekeeper")
    def get(self, conversion_id):
        conversion = ProductConversion.query.get_or_404(conversion_id)
        return conversion.to_dict(), 200

    @jwt_required()
    @role_required("Storekeeper")
    def patch(self, conversion_id):
        conversion = ProductConversion.query.get_or_404(conversion_id)
        data = request.get_json()

        for field in ["from_unit", "quantity", "to_unit", "result_quantity"]:
            if field in data:
                setattr(conversion, field, data[field])

        db.session.commit()
        return {
            "message": "Product conversion updated",
            "conversion": conversion.to_dict()
        }, 200

    @jwt_required()
    @role_required("Storekeeper")
    def delete(self, conversion_id):
        conversion = ProductConversion.query.get_or_404(conversion_id)
        db.session.delete(conversion)
        db.session.commit()
        return {"message": "Conversion deleted"}, 204