from flask import Flask
from server.extensions import db, jwt, migrate
from flask_restful import Api
from server.config import Config
from server.routes.company_routes import CompanyListResource, CompanyResource
from server.routes.store_routes import StoreListResource, StoreResource
from server.routes.user_auth_routes import Register, Login
from server.routes.user_admin_routes import AssignRole, ListUsers, GetSingleUser,DeleteUser
from server.routes.product_routes import ProductListResource, ProductResource
from server.routes.product_writeoff_routes import ProductWriteOffListResource, ProductWriteOffResource
from server.routes.product_conversion_routes import ProductConversionListResource,ProductConversionResource
from server.routes.product_transfer_routes import ProductTransferListResource,ProductTransferResource
from server.routes.supplier_routes import SupplierListResource,SupplierResource
from server.routes.payment_routes import MyPaymentsResource,PaymentListResource
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # Set up API
    api = Api(app)
    #login and register
    api.add_resource(Register, "/auth/register")
    api.add_resource(Login, "/auth/login")
    api.add_resource(AssignRole, "/users/<int:user_id>/role")
    api.add_resource(ListUsers, "/users") 
    api.add_resource(GetSingleUser, "/users/<int:user_id>")
    api.add_resource(DeleteUser, "/users/<int:user_id>/delete")
    # Company routes
    api.add_resource(CompanyListResource, '/admin/companies')
    api.add_resource(CompanyResource, '/admin/companies/<int:company_id>')

    # Store routes
    api.add_resource(StoreListResource, "/admin/stores")
    api.add_resource(StoreResource, "/admin/stores/<int:store_id>")
    #product routes
    api.add_resource(ProductListResource, "/products")
    api.add_resource(ProductResource, "/products/<int:product_id>")
    #write off routes
    api.add_resource(ProductWriteOffListResource, '/writeoffs')
    api.add_resource(ProductWriteOffResource, '/writeoffs/<int:writeoff_id>')
    #product conversion
    api.add_resource(ProductTransferListResource, '/transfers')
    api.add_resource(ProductTransferResource, '/transfers/<int:transfer_id>')
    #product transfer
    api.add_resource(ProductConversionListResource, '/conversions')
    api.add_resource(ProductConversionResource, '/conversions/<int:conversion_id>')
    #supplier 
    api.add_resource(SupplierListResource, "/suppliers")
    api.add_resource(SupplierResource, "/suppliers/<int:supplier_id>")
    #payment
    api.add_resource(PaymentListResource, "/payments")
    api.add_resource(MyPaymentsResource, "/my-payments")
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
