from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from server.extensions import db
from server.routes.user_admin_routes import role_required
from server.models.supplier import Supplier

class SupplierListResource(Resource):
    @jwt_required()
    @role_required("Manager")
    def get(self):
        suppliers = Supplier.query.all()
        return [supplier.to_dict() for supplier in suppliers], 200

    @jwt_required()
    @role_required("Manager")
    def post(self):
        data = request.get_json()
        supplier = Supplier(
            name=data.get("name"),
            email=data.get("email"),
            phone=data.get("phone"),
            address=data.get("address"),
            contact_person=data.get("contact_person"),
            contact_number=data.get("contact_number"),
            product_name=data.get("product_name"),
            balance=data.get("balance", 0.0),
            package_mode=data.get("package_mode"),
            notes=data.get("notes"),
            apply_vat=data.get("apply_vat", False),
        )
        db.session.add(supplier)
        db.session.commit()

        return {
            "message": "Supplier created successfully",
            "supplier": supplier.to_dict()
        }, 201

class SupplierResource(Resource):
    @jwt_required()
    @role_required("Manager")
    def get(self, supplier_id):
        supplier = Supplier.query.get_or_404(supplier_id)
        return supplier.to_dict(), 200

    @jwt_required()
    @role_required("Manager")
    def patch(self, supplier_id):
        supplier = Supplier.query.get_or_404(supplier_id)
        data = request.get_json()

        for key, value in data.items():
            if hasattr(supplier, key):
                setattr(supplier, key, value)

        db.session.commit()
        return {
            "message": "Supplier updated successfully",
            "supplier": supplier.to_dict()
        }, 200

    @jwt_required()
    @role_required("Manager")
    def delete(self, supplier_id):
        supplier = Supplier.query.get_or_404(supplier_id)
        db.session.delete(supplier)
        db.session.commit()
        return {"message": "Supplier deleted successfully"}, 200