from server.extensions import db
from sqlalchemy_serializer import SerializerMixin

class ProductConversion(db.Model, SerializerMixin):
    __tablename__ = 'product_conversions'
    

    id = db.Column(db.Integer, primary_key=True)
    from_unit = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    to_unit = db.Column(db.String(50), nullable=False)
    result_quantity = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())
    product_id=db.Column(db.Integer,db.ForeignKey('products.id'), nullable=False)

    #relationship mapping
    product=db.relationship('Product',back_populates='product_conversion')
    
    def to_dict(self):
        return {
            "id": self.id,
            "from_unit": self.from_unit,
            "quantity": self.quantity,
            "to_unit": self.to_unit,
            "result_quantity": self.result_quantity,
            "timestamp": self.timestamp.isoformat() if self.timestamp else None,
            #"product_id": self.product_id,
            "product_name": self.product.name if self.product else None
        }
    def __repr__(self):
        return (
            f"<Conversion {self.quantity} {self.from_unit} → "
            f"{self.result_quantity} {self.to_unit}>"
        )