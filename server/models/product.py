from server.extensions import db
from sqlalchemy_serializer import SerializerMixin


class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    barcode = db.Column(db.String(50), unique=True)
    buying_price = db.Column(db.Float)
    wholesale_price = db.Column(db.Float)
    retail_price = db.Column(db.Float)
    shop_quantity = db.Column(db.Integer, default=0)
    store_quantity = db.Column(db.Integer, default=0)
    apply_vat = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    # one to one Relationships
    product_conversion=db.relationship('ProductConversion',uselist=False,back_populates='product')
    #one to many relationships
    product_transfers=db.relationship('ProductTransfer',back_populates='product',cascade='all, delete-orphan')
    #one to many relationships
    product_writeoffs=db.relationship('ProductWriteoff',back_populates='product',cascade='all, delete-orphan', lazy='dynamic')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "barcode": self.barcode,
            "buying_price": self.buying_price,
            "wholesale_price": self.wholesale_price,
            "retail_price": self.retail_price,
            "shop_quantity": self.shop_quantity,
            "store_quantity": self.store_quantity,
            "apply_vat": self.apply_vat,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,

            #"product_conversion": self.product_conversion.to_dict() if self.product_conversion else None
        }
    
    def __repr__(self):
        return f"<Product {self.name}>"
