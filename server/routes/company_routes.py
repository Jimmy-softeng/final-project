from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from server.models.company import Company
from server.extensions import db
from server.routes.user_admin_routes import role_required

class CompanyListResource(Resource):
   @jwt_required()
   @role_required("SuperAdmin")
   def get(self):
        companies = Company.query.all()
        return [company.to_dict() for company in companies], 200


   @jwt_required()
   @role_required("SuperAdmin")
   def post(self):
    try:
        data = request.get_json()
        print("Received JSON:", data)

        if not data or not data.get('name'):
            return {"error": "Company name is required"}, 400

        if Company.query.filter_by(name=data['name']).first():
            return {"error": "Company already exists"}, 400

        company = Company(
            name=data.get('name'),
            email=data.get('email'),
            phone=data.get('phone'),
            address=data.get('address'),
            county=data.get('county'),
            sub_county=data.get('sub_county'),
            city=data.get('city'),
            zip_code=data.get('zip_code')
        )

        db.session.add(company)
        db.session.commit()

        return {
            "message": "Company added successfully",
            "company": company.to_dict()
        }, 201
    except Exception as e:
        print("Error in POST /admin/companies:", e)
        return {"error": "Invalid request"}, 400


class CompanyResource(Resource):
    @jwt_required()
    @role_required("SuperAdmin")
    def get(self, company_id):
        company = Company.query.get_or_404(company_id)
        return company.to_dict(), 200
    

    @jwt_required()
    @role_required("SuperAdmin")
    def patch(self, company_id):
        company = Company.query.get_or_404(company_id)
        data = request.get_json()

        allowed_fields = {
            "name", "email", "phone", "address",
            "county", "sub_county", "city", "zip_code"
        }

        updated_fields = []
        for key, value in data.items():
            if key in allowed_fields and value is not None:
                setattr(company, key, value)
                updated_fields.append(key)

        if not updated_fields:
            return {"error": "No valid fields provided to update"}, 400

        db.session.commit()

        return {
            "message": "Company updated successfully",
            "updated_fields": updated_fields,
            "company": company.to_dict()
        }, 200

    @jwt_required()
    @role_required("SuperAdmin")
    def delete(self, company_id):
        company = Company.query.get_or_404(company_id)
        db.session.delete(company)
        db.session.commit()
        return {"message": "Company deleted"}, 204
