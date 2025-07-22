from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from server.models.store import Store
from server.models.company import Company
from server.extensions import db
from server.routes.user_admin_routes import role_required

class StoreListResource(Resource):
    @jwt_required()
    @role_required("SuperAdmin")
    def get(self):
        stores = Store.query.all()
        return [store.to_dict() for store in stores], 200

    @jwt_required()
    @role_required("SuperAdmin")
    def post(self):
        data = request.get_json()

        name = data.get("name")
        shelf_name = data.get("shelf_name")
        product_category = data.get("product_category")
        product_subcategory = data.get("product_subcategory")
        vat = data.get("vat")
        company_id = data.get("company_id")

        if not name or not company_id:
            return {"error": "Store name and company_id are required"}, 400

        company = Company.query.get(company_id)
        if not company:
            return {"error": "Company not found"}, 404

        store = Store(
            name=name,
            shelf_name=shelf_name,
            product_category=product_category,
            product_subcategory=product_subcategory,
            vat=vat,
            company_id=company_id
        )

        db.session.add(store)
        db.session.commit()

        return {
            "message": "Store added successfully",
            "store": store.to_dict()
        }, 201
    
    
class StoreResource(Resource):
    @jwt_required()
    @role_required("SuperAdmin")
    def get(self, store_id):
        store = Store.query.get_or_404(store_id)
        return store.to_dict(), 200

    @jwt_required()
    @role_required("SuperAdmin")
    def patch(self, store_id):
        store = Store.query.get_or_404(store_id)
        data = request.get_json()

        for key, value in data.items():
            if hasattr(store, key):
                setattr(store, key, value)

        db.session.commit()
        return store.to_dict(), 200

    @jwt_required()
    @role_required("SuperAdmin")
    def delete(self, store_id):
        store = Store.query.get_or_404(store_id)
        db.session.delete(store)
        db.session.commit()
        return {"message": "Store deleted"}, 204