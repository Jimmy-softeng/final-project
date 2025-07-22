from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from server.extensions import db
from server.routes.user_admin_routes import role_required
from server.models.product import Product


class ProductListResource(Resource):
    @jwt_required()
    @role_required("Storekeeper", "Customer")
    def get(self):
        products = Product.query.all()
        return [product.to_dict() for product in products], 200

    @jwt_required()
    @role_required("Storekeeper")
    def post(self):
        data = request.get_json()

        name = data.get("name")
        description = data.get("description")
        barcode = data.get("barcode")
        buying_price = data.get("buying_price")
        wholesale_price = data.get("wholesale_price")
        retail_price = data.get("retail_price")
        shop_quantity = data.get("shop_quantity", 0)
        store_quantity = data.get("store_quantity", 0)
        apply_vat = data.get("apply_vat", False)

        if not name or not barcode:
            return {"error": "Product name and barcode are required"}, 400

        if Product.query.filter_by(barcode=barcode).first():
            return {"error": "Product with this barcode already exists"}, 400

        product = Product(
            name=name,
            description=description,
            barcode=barcode,
            buying_price=buying_price,
            wholesale_price=wholesale_price,
            retail_price=retail_price,
            shop_quantity=shop_quantity,
            store_quantity=store_quantity,
            apply_vat=apply_vat
        )

        db.session.add(product)
        db.session.commit()

        return {
            "message": "Product added successfully",
            "product": product.to_dict()
        }, 201


class ProductResource(Resource):
    @jwt_required()
    @role_required("Storekeeper", "Customer")
    def get(self, product_id):
        product = Product.query.get_or_404(product_id)
        return product.to_dict(), 200

    @jwt_required()
    @role_required("Storekeeper")
    def patch(self, product_id):
        product = Product.query.get_or_404(product_id)
        data = request.get_json()

        for key, value in data.items():
            if hasattr(product, key):
                setattr(product, key, value)

        db.session.commit()
        return {
            "message": "Product updated successfully",
            "product": product.to_dict()
        }, 200

    @jwt_required()
    @role_required("SuperAdmin")
    def delete(self, product_id):
        product = Product.query.get_or_404(product_id)
        db.session.delete(product)
        db.session.commit()
        return {"message": "Product deleted successfully"}, 204